import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getRestaurant from "app/restaurants/queries/getRestaurant"
import deleteRestaurant from "app/restaurants/mutations/deleteRestaurant"

export const Restaurant = () => {
  const router = useRouter()
  const restaurantId = useParam("restaurantId", "number")
  const [deleteRestaurantMutation] = useMutation(deleteRestaurant)
  const [restaurant] = useQuery(getRestaurant, { id: restaurantId })

  return (
    <>
      <Head>
        <title>Restaurant {restaurant.id}</title>
      </Head>

      <div>
        <h1>Restaurant {restaurant.id}</h1>
        <pre>{JSON.stringify(restaurant, null, 2)}</pre>

        <Link href={Routes.EditRestaurantPage({ restaurantId: restaurant.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteRestaurantMutation({ id: restaurant.id })
              router.push(Routes.RestaurantsPage())
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

const ShowRestaurantPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.RestaurantsPage()}>
          <a>Restaurants</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Restaurant />
      </Suspense>
    </div>
  )
}

ShowRestaurantPage.authenticate = true
ShowRestaurantPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowRestaurantPage
