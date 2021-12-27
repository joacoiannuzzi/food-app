import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getFoodItem from "app/food-items/queries/getFoodItem"
import updateFoodItem from "app/food-items/mutations/updateFoodItem"
import { FoodItemForm, FORM_ERROR } from "app/food-items/components/FoodItemForm"

export const EditFoodItem = () => {
  const router = useRouter()
  const foodItemId = useParam("foodItemId", "number")
  const [foodItem, { setQueryData }] = useQuery(
    getFoodItem,
    { id: foodItemId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateFoodItemMutation] = useMutation(updateFoodItem)

  return (
    <>
      <Head>
        <title>Edit FoodItem {foodItem.id}</title>
      </Head>

      <div>
        <h1>Edit FoodItem {foodItem.id}</h1>
        <pre>{JSON.stringify(foodItem, null, 2)}</pre>

        <FoodItemForm
          submitText="Update FoodItem"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateFoodItem}
          initialValues={foodItem}
          onSubmit={async (values) => {
            try {
              const updated = await updateFoodItemMutation({
                id: foodItem.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowFoodItemPage({ foodItemId: updated.id }))
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

const EditFoodItemPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditFoodItem />
      </Suspense>

      <p>
        <Link href={Routes.FoodItemsPage()}>
          <a>FoodItems</a>
        </Link>
      </p>
    </div>
  )
}

EditFoodItemPage.authenticate = true
EditFoodItemPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditFoodItemPage
