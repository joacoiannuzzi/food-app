import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getOrderItem from "app/order-items/queries/getOrderItem"
import updateOrderItem from "app/order-items/mutations/updateOrderItem"
import { OrderItemForm, FORM_ERROR } from "app/order-items/components/OrderItemForm"

export const EditOrderItem = () => {
  const router = useRouter()
  const orderItemId = useParam("orderItemId", "number")
  const [orderItem, { setQueryData }] = useQuery(
    getOrderItem,
    { id: orderItemId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateOrderItemMutation] = useMutation(updateOrderItem)

  return (
    <>
      <Head>
        <title>Edit OrderItem {orderItem.id}</title>
      </Head>

      <div>
        <h1>Edit OrderItem {orderItem.id}</h1>
        <pre>{JSON.stringify(orderItem, null, 2)}</pre>

        <OrderItemForm
          submitText="Update OrderItem"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateOrderItem}
          initialValues={orderItem}
          onSubmit={async (values) => {
            try {
              const updated = await updateOrderItemMutation({
                id: orderItem.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowOrderItemPage({ orderItemId: updated.id }))
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

const EditOrderItemPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditOrderItem />
      </Suspense>

      <p>
        <Link href={Routes.OrderItemsPage()}>
          <a>OrderItems</a>
        </Link>
      </p>
    </div>
  )
}

EditOrderItemPage.authenticate = true
EditOrderItemPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditOrderItemPage
