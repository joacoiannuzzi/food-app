import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreatePaymentMethod = z.object({
  name: z.string(),
  orderItemDetailId: z.number(),
  orderId: z.number(),
  extraPaymentInfo: z.string(),
})

export default resolver.pipe(
  resolver.zod(CreatePaymentMethod),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const paymentMethod = await db.paymentMethod.create({ data: input })

    return paymentMethod
  }
)
