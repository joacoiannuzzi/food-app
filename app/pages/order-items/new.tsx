import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createOrderItem from "app/order-items/mutations/createOrderItem"
import { OrderItemForm, FORM_ERROR } from "app/order-items/components/OrderItemForm"

const NewOrderItemPage: BlitzPage = () => {
  const router = useRouter()
  const [createOrderItemMutation] = useMutation(createOrderItem)

  return (
    <div>
      <h1>Create New OrderItem</h1>

      <OrderItemForm
        submitText="Create OrderItem"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateOrderItem}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const orderItem = await createOrderItemMutation(values)
            router.push(Routes.ShowOrderItemPage({ orderItemId: orderItem.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.OrderItemsPage()}>
          <a>OrderItems</a>
        </Link>
      </p>
    </div>
  )
}

NewOrderItemPage.authenticate = true
NewOrderItemPage.getLayout = (page) => <Layout title={"Create New OrderItem"}>{page}</Layout>

export default NewOrderItemPage
