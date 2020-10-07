import { useState } from "react"
import createServer from "app/servers/mutations/createServer"
import { FaUser, FaKey } from "react-icons/fa"
import {
  Button,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
} from "@chakra-ui/core"
import { useForm } from "react-hook-form"

type NewServerFormProps = {
  onSuccess?: () => void
}

export const NewServerForm = (props: NewServerFormProps) => {
  const { register, handleSubmit, errors } = useForm()

  const onSubmit = async (data) => {
    await createServer({
      ip: data.ip,
      name: data.name,
      uuid: data.uuid,
    })
    props.onSuccess && props.onSuccess()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <Heading as="h3" size="lg">
          New Server
        </Heading>

        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<FaUser />} />
          <Input name="ip" placeholder="Ip" type="text" ref={register} />
        </InputGroup>

        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<FaUser />} />
          <Input name="name" placeholder="Name" type="text" ref={register} />
        </InputGroup>

        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<FaUser />} />
          <Input name="uuid" placeholder="UUID" type="text" ref={register} />
        </InputGroup>
        {/* <Button type="submit" isLoading loadingText="Loading" variant="outline">
            Submit
          </Button> */}
        <Button type="submit" loadingText="Loading" variant="outline">
          Submit
        </Button>
      </Stack>
    </form>
  )
}

export default NewServerForm
