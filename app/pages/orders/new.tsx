import { Link, useRouter, useMutation, BlitzPage, Routes, Head } from "blitz"
import Layout from "app/core/layouts/Layout"
import createOrder from "app/orders/mutations/createOrder"
import { OrderForm, FORM_ERROR } from "app/orders/components/OrderForm"
import { useCurrentUser } from "../../core/hooks/useCurrentUser"
import { Suspense } from "react"
import { OrdersList } from "./index"

const NewOrderPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Orders</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewOrderPage()}>
            <a>Create Order</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <NewOrder />
        </Suspense>
      </div>
    </>
  )
}

NewOrderPage.authenticate = true
NewOrderPage.getLayout = (page) => <Layout title={"Create New Order"}>{page}</Layout>

export default NewOrderPage

const NewOrder = () => {
  const router = useRouter()
  const [createOrderMutation] = useMutation(createOrder)
  const currentUser = useCurrentUser()

  return (
    <div>
      <h1>Create New Order</h1>

      <OrderForm
        submitText="Create Order"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateOrder}
        // initialValues={{}}
        onSubmit={async (values) => {
          if (!currentUser) return
          try {
            const order = await createOrderMutation({
              ...values,
              userId: currentUser.id,
              closesAt: new Date(values.closesAt),
            })
            router.push(Routes.ShowOrderPage({ orderId: order.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.OrdersPage()}>
          <a>Orders</a>
        </Link>
      </p>
    </div>
  )
}
