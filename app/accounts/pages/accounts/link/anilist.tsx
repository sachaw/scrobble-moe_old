import { Button } from "@chakra-ui/core"
import linkAnilistMutation from "app/accounts/mutations/linkAnilist"
import { BlitzPage, invoke, useMutation } from "blitz"
import { useRouterQuery } from "blitz"
const LinkAnilist: BlitzPage = () => {
  const query = useRouterQuery()

  //   const [linkAniList] = useMutation(linkAnilistMutation)
  //   linkAniList(query.code as string)
  return (
    <Button
      onClick={async () => {
        await invoke(linkAnilistMutation, {
          token: query.code as string,
        })
        window.close()
      }}
      variant="ghost"
    >
      Send
    </Button>
  )
}

export default LinkAnilist
