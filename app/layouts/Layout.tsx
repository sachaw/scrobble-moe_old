import { Container } from "@chakra-ui/core"
import { Header } from "app/components/Header"
import { Head } from "blitz"
import { ReactNode } from "react"

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
      <Container maxW="6xl" my="4">
        {children}
      </Container>
    </>
  )
}

export default Layout
