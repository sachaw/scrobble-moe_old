import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/core"
import { Card } from "app/components/Card"
import Layout from "app/layouts/Layout"
import { BlitzPage } from "blitz"
import { FaKey, FaPen, FaPlayCircle, FaRegPlayCircle, FaTrash, FaUser } from "react-icons/fa"

const Account: BlitzPage = () => {
  return (
    <Container>
      <Card>
        <form>
          <Stack spacing={4}>
            <Heading as="h3" size="lg">
              Account Settings
            </Heading>

            <FormControl>
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={<FaUser />} />
                <Input placeholder="Username" disabled type="text" />
              </InputGroup>
            </FormControl>

            <FormControl isRequired>
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={<FaPlayCircle />} />
                <Input
                  errorBorderColor="crimson"
                  name="plexUsername"
                  placeholder="Plex Username"
                  type="text"
                />
              </InputGroup>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Change Password</FormLabel>
              <InputGroup mb={4}>
                <InputLeftElement children={<FaKey />} />
                <Input errorBorderColor="crimson" name="password" placeholder="Password" />
              </InputGroup>
              <InputGroup>
                <InputLeftElement children={<FaKey />} />
                <Input
                  errorBorderColor="crimson"
                  name="passwordRepeat"
                  placeholder="Repeat Password"
                />
              </InputGroup>
            </FormControl>
          </Stack>
        </form>
      </Card>
    </Container>
  )
}

Account.getLayout = (page) => <Layout title="Account">{page}</Layout>

export default Account
