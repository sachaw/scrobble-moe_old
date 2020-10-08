import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
  Text,
  useColorMode,
} from "@chakra-ui/core"
import logout from "app/auth/mutations/logout"
import getCurrentUser from "app/users/queries/getCurrentUser"
import { Link as BlitzLink, useMutation, useQuery, useRouter } from "blitz"
import { Suspense, useState } from "react"
import { FaBars, FaChevronDown, FaMoon, FaSun, FaUser } from "react-icons/fa"

const MenuItems = ({ children, mr = 6 }) => (
  <Text mt={{ base: 4, md: 0 }} mr={mr} display="block">
    {children}
  </Text>
)

const AuthHeader = () => {
  const [logoutMutation] = useMutation(logout)
  const [showNav, setShowNav] = useState(false)
  const [showUser, setShowUser] = useState(false)
  const { colorMode, toggleColorMode } = useColorMode()
  const router = useRouter()
  const [currentUser] = useQuery(getCurrentUser, null)
  const handleToggleNav = () => {
    setShowUser(false)
    setShowNav(!showNav)
  }
  const handleToggleUser = () => {
    setShowNav(false)
    setShowUser(!showUser)
  }
  return currentUser ? (
    <>
      <Link as={BlitzLink} href={"/dashboard"}>
        <Button variant="ghost">
          <Heading letterSpacing={"-.1rem"} as="h1" size="lg">
            Scrobble.moe
          </Heading>
        </Button>
      </Link>
      <Box display={{ base: "block", md: "none" }}>
        <Flex>
          <Button mr={2} variant="ghost" onClick={toggleColorMode}>
            {colorMode === "light" ? <FaMoon /> : <FaSun />}
          </Button>
          <Button mr={2} variant="ghost" onClick={handleToggleUser}>
            <FaUser />
          </Button>
          <Button variant="ghost" onClick={handleToggleNav}>
            <FaBars />
          </Button>
        </Flex>
      </Box>
      <Box
        display={{ base: showNav ? "block" : "none", md: "none" }}
        width={"full"}
        alignItems="center"
        flexGrow={1}
      >
        <MenuItems mr={0}>
          <Link as={BlitzLink} href="/servers">
            <Button w="full" variant="outline">
              Servers
            </Button>
          </Link>
        </MenuItems>
        <MenuItems mr={0}>
          <Link as={BlitzLink} href="/accounts">
            <Button w="full" variant="outline">
              Account
            </Button>
          </Link>
        </MenuItems>
      </Box>
      <Box display={{ base: "none", md: "flex" }} width={"auto"} alignItems="center" flexGrow={1}>
        <MenuItems>
          <Link as={BlitzLink} href="/servers">
            <Button variant="ghost">Servers</Button>
          </Link>
        </MenuItems>
        <MenuItems>
          <Link as={BlitzLink} href="/accounts">
            <Button variant="ghost">Account</Button>
          </Link>
        </MenuItems>
      </Box>
      <Box
        display={{ base: showUser ? "block" : "none", md: "none" }}
        width={{ base: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
      >
        <MenuItems mr={0}>
          <Link as={BlitzLink} href="/account">
            <Button w="full" variant="outline">
              Account
            </Button>
          </Link>
        </MenuItems>
        <MenuItems mr={0}>
          <Button
            w="full"
            variant="outline"
            onClick={async () => {
              await logoutMutation()
              router.push("/")
            }}
          >
            Logout
          </Button>
        </MenuItems>
      </Box>

      <Box display={{ base: "none", md: "block" }} mt={{ base: 4, md: 0 }}>
        <Button mr={2} variant="ghost" onClick={toggleColorMode}>
          {colorMode === "light" ? <FaMoon /> : <FaSun />}
        </Button>

        <Menu>
          <MenuButton
            variant="ghost"
            as={Button}
            leftIcon={<FaUser />}
            rightIcon={<FaChevronDown />}
          >
            {currentUser.username}
          </MenuButton>
          <MenuList>
            <Link as={BlitzLink} href="/account">
              <MenuItem>Account</MenuItem>
            </Link>

            <MenuItem
              onClick={async () => {
                await logoutMutation()
                router.push("/")
              }}
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </>
  ) : (
    <>
      <Link as={BlitzLink} href={"/"}>
        <Button variant="ghost">
          <Heading letterSpacing={"-.1rem"} as="h1" size="lg">
            Scrobble.moe
          </Heading>
        </Button>
      </Link>
      <span>
        <Button mr={2} variant="ghost" onClick={toggleColorMode}>
          {colorMode === "light" ? <FaMoon /> : <FaSun />}
        </Button>
        <Link as={BlitzLink} href="/login">
          <Button>Login / Register</Button>
        </Link>
      </span>
    </>
  )
}

export function Header() {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      borderBottom="1px"
      borderColor="rgb(226, 232, 240)"
    >
      <Suspense
        fallback={
          <Flex justify={"space-between"} width={"full"} align="center">
            <Heading px={"1rem"} letterSpacing={"-.1rem"} as="h1" size="lg">
              Scrobble.moe
            </Heading>
            <Skeleton width={"full"} ml={8}>
              <div>Loading</div>
            </Skeleton>
          </Flex>
        }
      >
        <AuthHeader />
      </Suspense>
    </Flex>
  )
}
