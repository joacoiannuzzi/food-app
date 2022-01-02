import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createPaymentMethod from "app/payment-methods/mutations/createPaymentMethod"
import { PaymentMethodForm, FORM_ERROR } from "app/payment-methods/components/PaymentMethodForm"

const NewPaymentMethodPage: BlitzPage = () => {
  const router = useRouter()
  const [createPaymentMethodMutation] = useMutation(createPaymentMethod)

  return (
    <div>
      <h1>Create New PaymentMethod</h1>

      <PaymentMethodForm
        submitText="Create PaymentMethod"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreatePaymentMethod}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const paymentMethod = await createPaymentMethodMutation(values)
            router.push(Routes.ShowPaymentMethodPage({ paymentMethodId: paymentMethod.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.PaymentMethodsPage()}>
          <a>PaymentMethods</a>
        </Link>
      </p>
    </div>
  )
}

NewPaymentMethodPage.authenticate = true
NewPaymentMethodPage.getLayout = (page) => (
  <Layout title={"Create New PaymentMethod"}>{page}</Layout>
)

export default NewPaymentMethodPage
