import React from "react"
import { useRouter, BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"
import { NewServerForm } from "app/servers/components/NewServerForm"
import { Box } from "@chakra-ui/core"

const NewServerPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <Box p={5} shadow="md" borderWidth="1px" flex="1" borderRadius="md">
      <NewServerForm onSuccess={() => router.push("/servers")} />
    </Box>
  )
}

NewServerPage.getLayout = (page) => <Layout title="New Server">{page}</Layout>

export default NewServerPage
