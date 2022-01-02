import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getPaymentMethod from "app/payment-methods/queries/getPaymentMethod"
import deletePaymentMethod from "app/payment-methods/mutations/deletePaymentMethod"

export const PaymentMethod = () => {
  const router = useRouter()
  const paymentMethodId = useParam("paymentMethodId", "number")
  const [deletePaymentMethodMutation] = useMutation(deletePaymentMethod)
  const [paymentMethod] = useQuery(getPaymentMethod, { id: paymentMethodId })

  return (
    <>
      <Head>
        <title>PaymentMethod {paymentMethod.id}</title>
      </Head>

      <div>
        <h1>PaymentMethod {paymentMethod.id}</h1>
        <pre>{JSON.stringify(paymentMethod, null, 2)}</pre>

        <Link href={Routes.EditPaymentMethodPage({ paymentMethodId: paymentMethod.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deletePaymentMethodMutation({ id: paymentMethod.id })
              router.push(Routes.PaymentMethodsPage())
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

const ShowPaymentMethodPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.PaymentMethodsPage()}>
          <a>PaymentMethods</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <PaymentMethod />
      </Suspense>
    </div>
  )
}

ShowPaymentMethodPage.authenticate = true
ShowPaymentMethodPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowPaymentMethodPage
