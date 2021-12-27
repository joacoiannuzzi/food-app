import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getFoodItem from "app/food-items/queries/getFoodItem"
import deleteFoodItem from "app/food-items/mutations/deleteFoodItem"

export const FoodItem = () => {
  const router = useRouter()
  const foodItemId = useParam("foodItemId", "number")
  const [deleteFoodItemMutation] = useMutation(deleteFoodItem)
  const [foodItem] = useQuery(getFoodItem, { id: foodItemId })

  return (
    <>
      <Head>
        <title>FoodItem {foodItem.id}</title>
      </Head>

      <div>
        <h1>FoodItem {foodItem.id}</h1>
        <pre>{JSON.stringify(foodItem, null, 2)}</pre>

        <Link href={Routes.EditFoodItemPage({ foodItemId: foodItem.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteFoodItemMutation({ id: foodItem.id })
              router.push(Routes.FoodItemsPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowFoodItemPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.FoodItemsPage()}>
          <a>FoodItems</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <FoodItem />
      </Suspense>
    </div>
  )
}

ShowFoodItemPage.authenticate = true
ShowFoodItemPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowFoodItemPage
