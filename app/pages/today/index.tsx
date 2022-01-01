import { Head, Link, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"

const TodayPage: BlitzPage = () => {
  return (
    <>
      <div className="bg-gray-100 h-screen">today</div>
    </>
  )
}

TodayPage.authenticate = true
TodayPage.getLayout = (page) => <Layout title="Today">{page}</Layout>

export default TodayPage
