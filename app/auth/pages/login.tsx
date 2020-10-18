import { Container } from "@chakra-ui/core"
import { LoginForm } from "app/auth/components/LoginForm"
import { Card } from "app/components/Card"
import Layout from "app/layouts/Layout"
import { BlitzPage, useRouter } from "blitz"
import React from "react"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <Container>
      <Card>
        <LoginForm onSuccess={() => router.push("/dashboard")} />
      </Card>
    </Container>
  )
}

LoginPage.getLayout = (page) => <Layout title="Log In | Scrobble.moe">{page}</Layout>

export default LoginPage
