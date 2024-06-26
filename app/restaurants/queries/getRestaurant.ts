import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetRestaurant = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetRestaurant), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const restaurant = await db.restaurant.findFirst({ where: { id } })

  if (!restaurant) throw new NotFoundError()

  return restaurant
})
