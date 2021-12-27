import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createFoodItem from "app/food-items/mutations/createFoodItem"
import { FoodItemForm, FORM_ERROR } from "app/food-items/components/FoodItemForm"

const NewFoodItemPage: BlitzPage = () => {
  const router = useRouter()
  const [createFoodItemMutation] = useMutation(createFoodItem)

  return (
    <div>
      <h1>Create New FoodItem</h1>

      <FoodItemForm
        submitText="Create FoodItem"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateFoodItem}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const foodItem = await createFoodItemMutation(values)
            router.push(Routes.ShowFoodItemPage({ foodItemId: foodItem.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.FoodItemsPage()}>
          <a>FoodItems</a>
        </Link>
      </p>
    </div>
  )
}

NewFoodItemPage.authenticate = true
NewFoodItemPage.getLayout = (page) => <Layout title={"Create New FoodItem"}>{page}</Layout>

export default NewFoodItemPage
