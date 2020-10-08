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
import editServer from "app/servers/mutations/editServer"
import { Link as BlitzLink, useMutation, useParam, useQuery } from "blitz"
import { Suspense, useState } from "react"
import { useForm } from "react-hook-form"
import { FaUser } from "react-icons/fa"

import getServer from "../queries/getServer"

type EditServerFormProps = {
  onSuccess?: () => void
}

export const EditServerForm = (props: EditServerFormProps) => {
  const [editServerMutation] = useMutation(editServer)
  const id = useParam("id") as string
  const { register, handleSubmit, errors } = useForm({
    mode: "onChange",
  })
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState("")

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      await editServerMutation({
        id,
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

  const Form = () => {
    const id = useParam("id") as string
    const [server] = useQuery(getServer, {
      where: {
        id,
      },
    })
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <Flex justify={"space-between"}>
            <Heading as="h3" size="lg">
              Edit Server
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
                defaultValue={server?.ip}
                type="text"
                ref={register({
                  required: true,
                  maxLength: 18,
                  minLength: 7,
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
                defaultValue={server?.name}
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
                defaultValue={server?.uuid}
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

  return (
    <Suspense fallback={"Loading..."}>
      <Form />
    </Suspense>
  )
}

export default EditServerForm
