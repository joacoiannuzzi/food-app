import React from "react"
import styles from "./OrderCardStyles.module.scss"

export const OrderCard = ({ restaurant, byUser, closesAt }) => {
  // TODO fix sixes of columns so they are aligned
  return (
    <div
      className={
        "bg-amber-300 text-white font-bold rounded-3xl border shadow-lg p-8 mt-2 mr-8 ml-8"
      }
    >
      <div className={"grid grid-flow-col auto-cols-max justify-around items-center"}>
        <div>
          <span className={"text-black text-3xl"}>{restaurant}</span>
        </div>
        <div>
          <span className={"text-red-400"}>by: </span>
          <span className={"text-gray-600"}>{byUser}</span>
        </div>
        <div className={"flex flex-row space-x-5"}>
          <span className={styles.dot} />
          <div className={""}>
            <span className={"text-red-400"}>Closes At: </span>
            <span className={"ml-3 text-gray-600"}>{closesAt}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
