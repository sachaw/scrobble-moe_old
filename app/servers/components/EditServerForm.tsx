import { Suspense, useState } from "react"
import editServer from "app/servers/mutations/editServer"
import { FaUser, FaKey } from "react-icons/fa"
import { UseGetServer } from "app/servers/hooks/useGetServer"

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
import { useParam } from "blitz"

type EditServerFormProps = {
  onSuccess?: () => void
}

export const EditServerForm = (props: EditServerFormProps) => {
  const id = useParam("id") as string
  const { register, handleSubmit, errors } = useForm()

  const onSubmit = async (data) => {
    await editServer({
      id,
      ip: data.ip,
      name: data.name,
      uuid: data.uuid,
    })
    props.onSuccess && props.onSuccess()
  }

  const Form = () => {
    const server = UseGetServer()
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <Heading as="h3" size="lg">
            Edit Server
          </Heading>

          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<FaUser />} />
            <Input
              name="ip"
              defaultValue={server?.ip}
              placeholder="Ip"
              type="text"
              ref={register}
            />
          </InputGroup>

          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<FaUser />} />
            <Input
              name="name"
              defaultValue={server?.name}
              placeholder="Name"
              type="text"
              ref={register}
            />
          </InputGroup>

          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<FaUser />} />
            <Input
              name="uuid"
              defaultValue={server?.uuid}
              placeholder="UUID"
              type="text"
              ref={register}
            />
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

  return (
    <Suspense fallback={"Loading..."}>
      <Form />
    </Suspense>
  )
}

export default EditServerForm
