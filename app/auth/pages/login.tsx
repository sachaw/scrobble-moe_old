import { Box } from "@chakra-ui/core"
import { LoginForm } from "app/auth/components/LoginForm"
import Layout from "app/layouts/Layout"
import { BlitzPage, useRouter } from "blitz"
import React from "react"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <Box p={5} shadow="md" borderWidth="1px" flex="1" borderRadius="md">
      <LoginForm onSuccess={() => router.push("/dashboard")} />
    </Box>
  )
}

LoginPage.getLayout = (page) => <Layout title="Log In">{page}</Layout>

export default LoginPage
