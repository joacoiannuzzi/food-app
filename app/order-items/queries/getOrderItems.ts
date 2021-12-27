import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetOrderItemsInput
  extends Pick<Prisma.OrderItemFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetOrderItemsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: orderItems,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.orderItem.count({ where }),
      query: (paginateArgs) => db.orderItem.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      orderItems,
      nextPage,
      hasMore,
      count,
    }
  }
)
