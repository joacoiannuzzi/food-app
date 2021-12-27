import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createOrderItemDetail from "app/order-item-details/mutations/createOrderItemDetail"
import {
  OrderItemDetailForm,
  FORM_ERROR,
} from "app/order-item-details/components/OrderItemDetailForm"

const NewOrderItemDetailPage: BlitzPage = () => {
  const router = useRouter()
  const [createOrderItemDetailMutation] = useMutation(createOrderItemDetail)

  return (
    <div>
      <h1>Create New OrderItemDetail</h1>

      <OrderItemDetailForm
        submitText="Create OrderItemDetail"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateOrderItemDetail}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const orderItemDetail = await createOrderItemDetailMutation(values)
            router.push(Routes.ShowOrderItemDetailPage({ orderItemDetailId: orderItemDetail.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.OrderItemDetailsPage()}>
          <a>OrderItemDetails</a>
        </Link>
      </p>
    </div>
  )
}

NewOrderItemDetailPage.authenticate = true
NewOrderItemDetailPage.getLayout = (page) => (
  <Layout title={"Create New OrderItemDetail"}>{page}</Layout>
)

export default NewOrderItemDetailPage
