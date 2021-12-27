import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getRestaurants from "app/restaurants/queries/getRestaurants"

const ITEMS_PER_PAGE = 100

export const RestaurantsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ restaurants, hasMore }] = usePaginatedQuery(getRestaurants, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant.id}>
            <Link href={Routes.ShowRestaurantPage({ restaurantId: restaurant.id })}>
              <a>{restaurant.name}</a>
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

const RestaurantsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Restaurants</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewRestaurantPage()}>
            <a>Create Restaurant</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <RestaurantsList />
        </Suspense>
      </div>
    </>
  )
}

RestaurantsPage.authenticate = true
RestaurantsPage.getLayout = (page) => <Layout>{page}</Layout>

export default RestaurantsPage
