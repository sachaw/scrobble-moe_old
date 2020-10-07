import React from "react"
import { useRouter, BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"
import { EditServerForm } from "app/servers/components/EditServerForm"
import { Box } from "@chakra-ui/core"

const EditServerPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <Box p={5} shadow="md" borderWidth="1px" flex="1" borderRadius="md">
      <EditServerForm onSuccess={() => router.push("/servers")} />
    </Box>
  )
}

EditServerPage.getLayout = (page) => <Layout title="New Server">{page}</Layout>

export default EditServerPage
