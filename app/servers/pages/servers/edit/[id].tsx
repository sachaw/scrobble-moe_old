import { Card } from "app/components/Card"
import Layout from "app/layouts/Layout"
import { EditServerForm } from "app/servers/components/EditServerForm"
import { BlitzPage, useRouter } from "blitz"
import React from "react"

const EditServerPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <Card>
      <EditServerForm onSuccess={() => router.push("/servers")} />
    </Card>
  )
}

EditServerPage.getLayout = (page) => <Layout title="Edit Server | Scrobble.moe">{page}</Layout>

export default EditServerPage
