import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getOrderItemDetail from "app/order-item-details/queries/getOrderItemDetail"
import deleteOrderItemDetail from "app/order-item-details/mutations/deleteOrderItemDetail"

export const OrderItemDetail = () => {
  const router = useRouter()
  const orderItemDetailId = useParam("orderItemDetailId", "number")
  const [deleteOrderItemDetailMutation] = useMutation(deleteOrderItemDetail)
  const [orderItemDetail] = useQuery(getOrderItemDetail, { id: orderItemDetailId })

  return (
    <>
      <Head>
        <title>OrderItemDetail {orderItemDetail.id}</title>
      </Head>

      <div>
        <h1>OrderItemDetail {orderItemDetail.id}</h1>
        <pre>{JSON.stringify(orderItemDetail, null, 2)}</pre>

        <Link href={Routes.EditOrderItemDetailPage({ orderItemDetailId: orderItemDetail.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteOrderItemDetailMutation({ id: orderItemDetail.id })
              router.push(Routes.OrderItemDetailsPage())
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

const ShowOrderItemDetailPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.OrderItemDetailsPage()}>
          <a>OrderItemDetails</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <OrderItemDetail />
      </Suspense>
    </div>
  )
}

ShowOrderItemDetailPage.authenticate = true
ShowOrderItemDetailPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowOrderItemDetailPage
