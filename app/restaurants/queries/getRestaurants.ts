import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetRestaurantsInput
  extends Pick<Prisma.RestaurantFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetRestaurantsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: restaurants,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.restaurant.count({ where }),
      query: (paginateArgs) => db.restaurant.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      restaurants,
      nextPage,
      hasMore,
      count,
    }
  }
)
