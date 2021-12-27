import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes, useQuery } from "blitz"
import Layout from "app/core/layouts/Layout"
import getOrderItemDetails from "app/order-item-details/queries/getOrderItemDetails"
import getUserById from "../../users/queries/getUserById"
import getOrderItem from "../../order-items/queries/getOrderItem"

const ITEMS_PER_PAGE = 100

export const OrderItemDetailsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ orderItemDetails, hasMore }] = usePaginatedQuery(getOrderItemDetails, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })
  // @ts-ignore
  const [user] = useQuery(getUserById, { id: orderItemDetails[0]?.userId })
  const [orderItem] = useQuery(getOrderItem, { id: orderItemDetails[0]?.id })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {orderItemDetails.map((orderItemDetail: any) => (
          <li key={orderItemDetail.id}>
            <Link href={Routes.ShowOrderItemDetailPage({ orderItemDetailId: orderItemDetail.id })}>
              <a>
                Orden: {orderItemDetail.orderItemId} |Order Item: {orderItem.description} |
                cantidad: {orderItemDetail.quantity} | usuario: {user.email}
              </a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const OrderItemDetailsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>OrderItemDetails</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewOrderItemDetailPage()}>
            <a>Create OrderItemDetail</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <OrderItemDetailsList />
        </Suspense>
      </div>
    </>
  )
}

OrderItemDetailsPage.authenticate = true
OrderItemDetailsPage.getLayout = (page) => <Layout>{page}</Layout>

export default OrderItemDetailsPage
