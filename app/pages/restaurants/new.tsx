import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createRestaurant from "app/restaurants/mutations/createRestaurant"
import { RestaurantForm, FORM_ERROR } from "app/restaurants/components/RestaurantForm"

const NewRestaurantPage: BlitzPage = () => {
  const router = useRouter()
  const [createRestaurantMutation] = useMutation(createRestaurant)

  return (
    <div>
      <h1>Create New Restaurant</h1>

      <RestaurantForm
        submitText="Create Restaurant"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateRestaurant}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const restaurant = await createRestaurantMutation(values)
            router.push(Routes.ShowRestaurantPage({ restaurantId: restaurant.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.RestaurantsPage()}>
          <a>Restaurants</a>
        </Link>
      </p>
    </div>
  )
}

NewRestaurantPage.authenticate = true
NewRestaurantPage.getLayout = (page) => <Layout title={"Create New Restaurant"}>{page}</Layout>

export default NewRestaurantPage
