import { Button, Flex, Spinner } from "@chakra-ui/core"
import linkAnilistMutation from "app/accounts/mutations/linkAnilist"
import { BlitzPage, invoke } from "blitz"
import { useRouterQuery } from "blitz"
import { useEffect } from "react"
const LinkAnilist: BlitzPage = () => {
  const query = useRouterQuery()
  useEffect(() => {
    invoke(linkAnilistMutation, {
      token: query.code as string,
    }).then(() => {
      window.close()
    })
  }, [])

  return (
    <Flex h="100vh">
      <Spinner m={"auto"} size="xl" />
    </Flex>
  )
}

export default LinkAnilist
