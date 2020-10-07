import { ReactNode } from "react"
import { Head } from "blitz"
import { Header } from "app/components/Header"
import { Container } from "@chakra-ui/core"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "Scrobble.moe"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Container my={4}>{children}</Container>
    </>
  )
}

export default Layout
