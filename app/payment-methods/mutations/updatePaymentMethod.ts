import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdatePaymentMethod = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdatePaymentMethod),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const paymentMethod = await db.paymentMethod.update({ where: { id }, data })

    return paymentMethod
  }
)
