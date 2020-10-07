import { useParam, useQuery, useRouter } from "blitz"
import getServer from "app/servers/queries/getServer"

export const UseGetServer = () => {
  const id = useParam("id") as string
  const [Servers] = useQuery(getServer, {
    where: {
      id,
    },
  })
  return Servers
}
