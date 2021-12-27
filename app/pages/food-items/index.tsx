import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getFoodItems from "app/food-items/queries/getFoodItems"

const ITEMS_PER_PAGE = 100

export const FoodItemsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ foodItems, hasMore }] = usePaginatedQuery(getFoodItems, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {foodItems.map((foodItem) => (
          <li key={foodItem.id}>
            <Link href={Routes.ShowFoodItemPage({ foodItemId: foodItem.id })}>
              <a>{foodItem.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const FoodItemsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>FoodItems</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewFoodItemPage()}>
            <a>Create FoodItem</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <FoodItemsList />
        </Suspense>
      </div>
    </>
  )
}

FoodItemsPage.authenticate = true
FoodItemsPage.getLayout = (page) => <Layout>{page}</Layout>

export default FoodItemsPage
