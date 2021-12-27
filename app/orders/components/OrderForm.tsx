import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { z } from "zod"
import { useEffect } from "react"
export { FORM_ERROR } from "app/core/components/Form"

export function OrderForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  let closesAtDate = new Date()
  // TODO sumarle 1 hora al closesAtDate de la hora actual

  return (
    <Form<S> {...props}>
      <LabeledTextField name="description" label="description" placeholder="description" />
      <LabeledTextField
        name="closesAt"
        label="closesAt"
        placeholder="closesAt"
        id="closesAt"
        type="datetime-local"
        value={closesAtDate.toISOString().split("Z")[0]}
      />
      <LabeledTextField
        name="restaurantId"
        label="restaurantId"
        placeholder="restaurantId"
        type="number"
      />
    </Form>
  )
}
