import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getPaymentMethods from "app/payment-methods/queries/getPaymentMethods"

const ITEMS_PER_PAGE = 100

export const PaymentMethodsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ paymentMethods, hasMore }] = usePaginatedQuery(getPaymentMethods, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {paymentMethods.map((paymentMethod) => (
          <li key={paymentMethod.id}>
            <Link href={Routes.ShowPaymentMethodPage({ paymentMethodId: paymentMethod.id })}>
              <a>{paymentMethod.name}</a>
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

const PaymentMethodsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>PaymentMethods</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewPaymentMethodPage()}>
            <a>Create PaymentMethod</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <PaymentMethodsList />
        </Suspense>
      </div>
    </>
  )
}

PaymentMethodsPage.authenticate = true
PaymentMethodsPage.getLayout = (page) => <Layout>{page}</Layout>

export default PaymentMethodsPage
