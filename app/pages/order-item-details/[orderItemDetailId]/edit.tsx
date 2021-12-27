import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getOrderItemDetail from "app/order-item-details/queries/getOrderItemDetail"
import updateOrderItemDetail from "app/order-item-details/mutations/updateOrderItemDetail"
import {
  OrderItemDetailForm,
  FORM_ERROR,
} from "app/order-item-details/components/OrderItemDetailForm"

export const EditOrderItemDetail = () => {
  const router = useRouter()
  const orderItemDetailId = useParam("orderItemDetailId", "number")
  const [orderItemDetail, { setQueryData }] = useQuery(
    getOrderItemDetail,
    { id: orderItemDetailId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateOrderItemDetailMutation] = useMutation(updateOrderItemDetail)

  return (
    <>
      <Head>
        <title>Edit OrderItemDetail {orderItemDetail.id}</title>
      </Head>

      <div>
        <h1>Edit OrderItemDetail {orderItemDetail.id}</h1>
        <pre>{JSON.stringify(orderItemDetail, null, 2)}</pre>

        <OrderItemDetailForm
          submitText="Update OrderItemDetail"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateOrderItemDetail}
          initialValues={orderItemDetail}
          onSubmit={async (values) => {
            try {
              const updated = await updateOrderItemDetailMutation({
                id: orderItemDetail.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowOrderItemDetailPage({ orderItemDetailId: updated.id }))
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

const EditOrderItemDetailPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditOrderItemDetail />
      </Suspense>

      <p>
        <Link href={Routes.OrderItemDetailsPage()}>
          <a>OrderItemDetails</a>
        </Link>
      </p>
    </div>
  )
}

EditOrderItemDetailPage.authenticate = true
EditOrderItemDetailPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditOrderItemDetailPage
