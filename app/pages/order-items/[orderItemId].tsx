import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getOrderItem from "app/order-items/queries/getOrderItem"
import deleteOrderItem from "app/order-items/mutations/deleteOrderItem"

export const OrderItem = () => {
  const router = useRouter()
  const orderItemId = useParam("orderItemId", "number")
  const [deleteOrderItemMutation] = useMutation(deleteOrderItem)
  const [orderItem] = useQuery(getOrderItem, { id: orderItemId })

  return (
    <>
      <Head>
        <title>OrderItem {orderItem.id}</title>
      </Head>

      <div>
        <h1>OrderItem {orderItem.id}</h1>
        <pre>{JSON.stringify(orderItem, null, 2)}</pre>

        <Link href={Routes.EditOrderItemPage({ orderItemId: orderItem.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteOrderItemMutation({ id: orderItem.id })
              router.push(Routes.OrderItemsPage())
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

const ShowOrderItemPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.OrderItemsPage()}>
          <a>OrderItems</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <OrderItem />
      </Suspense>
    </div>
  )
}

ShowOrderItemPage.authenticate = true
ShowOrderItemPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowOrderItemPage
