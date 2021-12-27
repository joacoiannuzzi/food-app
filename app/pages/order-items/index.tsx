import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getOrderItems from "app/order-items/queries/getOrderItems"

const ITEMS_PER_PAGE = 100

export const OrderItemsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ orderItems, hasMore }] = usePaginatedQuery(getOrderItems, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {orderItems.map((orderItem) => (
          <li key={orderItem.id}>
            <Link href={Routes.ShowOrderItemPage({ orderItemId: orderItem.id })}>
              <a>{orderItem.description}</a>
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

const OrderItemsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>OrderItems</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewOrderItemPage()}>
            <a>Create OrderItem</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <OrderItemsList />
        </Suspense>
      </div>
    </>
  )
}

OrderItemsPage.authenticate = true
OrderItemsPage.getLayout = (page) => <Layout>{page}</Layout>

export default OrderItemsPage
