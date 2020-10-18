import { Flex, Spinner } from "@chakra-ui/core"
import linkAnilistMutation from "app/accounts/mutations/linkAnilist"
import { BlitzPage, invoke } from "blitz"
import { useRouterQuery } from "blitz"
import { useEffect } from "react"
const LinkAnilist: BlitzPage = () => {
  const query = useRouterQuery()
  useEffect(() => {
    invoke(linkAnilistMutation, {
      token: query.code as string,
    })
      .then(() => {
        window.opener.postMessage({ success: true }, "*")
        window.close()
      })
      .catch((error) => {
        console.log(error)
        window.opener.postMessage({ success: false, error: error }, "*")
      })
  }, [])

  return (
    <Flex h="100vh">
      <Spinner m={"auto"} size="xl" />
    </Flex>
  )
}

export default LinkAnilist
