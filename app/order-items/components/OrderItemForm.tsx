import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function OrderItemForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField
        name="description"
        label="description"
        placeholder="description"
        type="text"
      />
      <LabeledTextField name="orderId" label="orderId" placeholder="orderId" type="number" />
      <LabeledTextField
        name="foodItemId"
        label="foodItemId"
        placeholder="foodItemId"
        type="number"
      />
    </Form>
  )
}
