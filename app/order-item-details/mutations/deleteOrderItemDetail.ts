import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteOrderItemDetail = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeleteOrderItemDetail),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const orderItemDetail = await db.orderItemDetail.deleteMany({ where: { id } })

    return orderItemDetail
  }
)
