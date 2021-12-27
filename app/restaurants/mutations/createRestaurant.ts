import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateRestaurant = z.object({
  name: z.string(),
  address: z.string().optional(),
  phone: z.string(),
})

export default resolver.pipe(
  resolver.zod(CreateRestaurant),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const restaurant = await db.restaurant.create({ data: input })

    return restaurant
  }
)
