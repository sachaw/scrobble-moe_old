import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Stack,
  Tag,
} from "@chakra-ui/core"
import createServer from "app/servers/mutations/createServer"
import { Link as BlitzLink, useMutation } from "blitz"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { FaUser } from "react-icons/fa"

type NewServerFormProps = {
  onSuccess?: () => void
}

export const NewServerForm = (props: NewServerFormProps) => {
  const [createServerMutation] = useMutation(createServer)
  const { register, handleSubmit, errors } = useForm({
    mode: "onChange",
  })
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState("")

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      await createServerMutation({
        ip: data.ip,
        name: data.name,
        uuid: data.uuid,
      })
      props.onSuccess && props.onSuccess()
    } catch (error) {
      setLoading(false)
      setServerError(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <Flex justify={"space-between"}>
          <Heading as="h3" size="lg">
            New Server
          </Heading>
          <Flex>
            {serverError && (
              <Tag color={"crimson"} mx={2}>
                {serverError}
              </Tag>
            )}
            <Link as={BlitzLink} href="/servers">
              <Button>Back</Button>
            </Link>
          </Flex>
        </Flex>

        <FormControl isRequired>
          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<FaUser />} />
            <Input
              isInvalid={!!errors.ip}
              errorBorderColor="crimson"
              name="ip"
              placeholder="IP"
              type="text"
              ref={register({
                required: true,
              })}
            />
          </InputGroup>
          {errors.ip && <FormHelperText color="crimson">Invalid IP</FormHelperText>}
        </FormControl>

        <FormControl isRequired>
          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<FaUser />} />
            <Input
              isInvalid={!!errors.name}
              errorBorderColor="crimson"
              name="name"
              placeholder="Server Name"
              type="text"
              ref={register({
                required: true,
                maxLength: 40,
                minLength: 2,
              })}
            />
          </InputGroup>
          {errors.name && <FormHelperText color="crimson">Invalid name</FormHelperText>}
        </FormControl>

        <FormControl isRequired>
          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<FaUser />} />
            <Input
              isInvalid={!!errors.uuid}
              errorBorderColor="crimson"
              name="uuid"
              placeholder="UUID"
              type="text"
              ref={register({
                required: true,
                maxLength: 40,
                minLength: 25,
              })}
            />
          </InputGroup>
          {errors.uuid && <FormHelperText color="crimson">Invalid UUID</FormHelperText>}
        </FormControl>
        <Button type="submit" isLoading={loading} loadingText="Loading">
          Submit
        </Button>
      </Stack>
    </form>
  )
}

export default NewServerForm
