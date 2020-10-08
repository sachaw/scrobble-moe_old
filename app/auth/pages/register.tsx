import { Box } from "@chakra-ui/core"
import { RegisterForm } from "app/auth/components/RegisterForm"
import Layout from "app/layouts/Layout"
import { BlitzPage, useRouter } from "blitz"
import React from "react"

const RegisterPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <Box p={5} shadow="md" borderWidth="1px" flex="1" borderRadius="md">
      <RegisterForm onSuccess={() => router.push("/dashboard")} />
    </Box>
  )
}

RegisterPage.getLayout = (page) => <Layout title="Register">{page}</Layout>

export default RegisterPage
