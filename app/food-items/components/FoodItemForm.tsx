import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function FoodItemForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="name" label="Name" placeholder="Name" />
      <LabeledTextField name="description" label="description" placeholder="description" />
      <LabeledTextField
        name="restaurantId"
        label="restaurantId"
        placeholder="restaurantId"
        type="number"
      />
    </Form>
  )
}
