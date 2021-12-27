import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getRestaurant from "app/restaurants/queries/getRestaurant"
import updateRestaurant from "app/restaurants/mutations/updateRestaurant"
import { RestaurantForm, FORM_ERROR } from "app/restaurants/components/RestaurantForm"

export const EditRestaurant = () => {
  const router = useRouter()
  const restaurantId = useParam("restaurantId", "number")
  const [restaurant, { setQueryData }] = useQuery(
    getRestaurant,
    { id: restaurantId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateRestaurantMutation] = useMutation(updateRestaurant)

  return (
    <>
      <Head>
        <title>Edit Restaurant {restaurant.id}</title>
      </Head>

      <div>
        <h1>Edit Restaurant {restaurant.id}</h1>
        <pre>{JSON.stringify(restaurant, null, 2)}</pre>

        <RestaurantForm
          submitText="Update Restaurant"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateRestaurant}
          initialValues={restaurant}
          onSubmit={async (values) => {
            try {
              const updated = await updateRestaurantMutation({
                id: restaurant.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowRestaurantPage({ restaurantId: updated.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditRestaurantPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditRestaurant />
      </Suspense>

      <p>
        <Link href={Routes.RestaurantsPage()}>
          <a>Restaurants</a>
        </Link>
      </p>
    </div>
  )
}

EditRestaurantPage.authenticate = true
EditRestaurantPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditRestaurantPage
