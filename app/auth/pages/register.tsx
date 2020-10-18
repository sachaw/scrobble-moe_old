import { Container } from "@chakra-ui/core"
import { RegisterForm } from "app/auth/components/RegisterForm"
import { Card } from "app/components/Card"
import Layout from "app/layouts/Layout"
import { BlitzPage, useRouter } from "blitz"
import React from "react"

const RegisterPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <Container>
      <Card>
        <RegisterForm onSuccess={() => router.push("/dashboard")} />
      </Card>
    </Container>
  )
}

RegisterPage.getLayout = (page) => <Layout title="Register | Scrobble.moe">{page}</Layout>

export default RegisterPage
