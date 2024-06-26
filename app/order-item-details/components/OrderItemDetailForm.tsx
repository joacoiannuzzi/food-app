import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function OrderItemDetailForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="quantity" label="quantity" placeholder="quantity" type="number" />
      <LabeledTextField
        name="orderItemId"
        label="orderItemId"
        placeholder="orderItemId"
        type="number"
      />
      <LabeledTextField name="userId" label="userId" placeholder="userId" type="number" />
    </Form>
  )
}
