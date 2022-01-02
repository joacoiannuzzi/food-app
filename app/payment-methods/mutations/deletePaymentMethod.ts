import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeletePaymentMethod = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeletePaymentMethod),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const paymentMethod = await db.paymentMethod.deleteMany({ where: { id } })

    return paymentMethod
  }
)
