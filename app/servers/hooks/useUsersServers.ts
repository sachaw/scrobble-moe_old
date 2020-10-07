import { useQuery } from "blitz"
import getUsersServers from "app/servers/queries/getUsersServers"

export const UseUsersServers = () => {
  const [Servers] = useQuery(getUsersServers, null)
  return Servers
}
