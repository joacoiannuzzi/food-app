import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getPaymentMethod from "app/payment-methods/queries/getPaymentMethod"
import updatePaymentMethod from "app/payment-methods/mutations/updatePaymentMethod"
import { PaymentMethodForm, FORM_ERROR } from "app/payment-methods/components/PaymentMethodForm"

export const EditPaymentMethod = () => {
  const router = useRouter()
  const paymentMethodId = useParam("paymentMethodId", "number")
  const [paymentMethod, { setQueryData }] = useQuery(
    getPaymentMethod,
    { id: paymentMethodId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updatePaymentMethodMutation] = useMutation(updatePaymentMethod)

  return (
    <>
      <Head>
        <title>Edit PaymentMethod {paymentMethod.id}</title>
      </Head>

      <div>
        <h1>Edit PaymentMethod {paymentMethod.id}</h1>
        <pre>{JSON.stringify(paymentMethod, null, 2)}</pre>

        <PaymentMethodForm
          submitText="Update PaymentMethod"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdatePaymentMethod}
          initialValues={paymentMethod}
          onSubmit={async (values) => {
            try {
              const updated = await updatePaymentMethodMutation({
                id: paymentMethod.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowPaymentMethodPage({ paymentMethodId: updated.id }))
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

const EditPaymentMethodPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditPaymentMethod />
      </Suspense>

      <p>
        <Link href={Routes.PaymentMethodsPage()}>
          <a>PaymentMethods</a>
        </Link>
      </p>
    </div>
  )
}

EditPaymentMethodPage.authenticate = true
EditPaymentMethodPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditPaymentMethodPage
