import React from "react"
import { OrderCard } from "./OrderCard"

export const OrderCardList = () => {
  const mockedOrders: any = [
    {
      restaurant: "Imperial",
      byUser: "Rodrigo Marchese",
      closesAt: "14:50",
    },
    {
      restaurant: "Indy",
      byUser: "Joaquin Iannuzzi",
      closesAt: "13:30",
    },
    {
      restaurant: "Mc Donald's",
      byUser: "Cianca",
      closesAt: "12:50",
    },
  ]
  return (
    <div style={{ width: 1000 }}>
      <div className={"flex flex-col"}>
        {mockedOrders.map((order, key) => {
          return (
            <OrderCard
              key={key}
              restaurant={order.restaurant}
              byUser={order.byUser}
              closesAt={order.closesAt}
            />
          )
        })}
      </div>
    </div>
  )
}
