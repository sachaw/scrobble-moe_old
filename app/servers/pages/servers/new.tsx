import { Card } from "app/components/Card"
import Layout from "app/layouts/Layout"
import { NewServerForm } from "app/servers/components/NewServerForm"
import { BlitzPage, useRouter } from "blitz"
import React from "react"

const NewServerPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <Card>
      <NewServerForm onSuccess={() => router.push("/servers")} />
    </Card>
  )
}

NewServerPage.getLayout = (page) => <Layout title="New Server | Scrobble.moe">{page}</Layout>

export default NewServerPage
