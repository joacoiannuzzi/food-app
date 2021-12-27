import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetOrderItemDetail = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(
  resolver.zod(GetOrderItemDetail),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const orderItemDetail = await db.orderItemDetail.findFirst({ where: { id } })

    if (!orderItemDetail) throw new NotFoundError()

    return orderItemDetail
  }
)
