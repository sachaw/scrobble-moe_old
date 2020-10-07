import React from "react"
import { useRouter, BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"
import { LoginForm } from "app/auth/components/LoginForm"
import { Box } from "@chakra-ui/core"

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
