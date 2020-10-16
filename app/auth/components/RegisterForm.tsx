import {
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Stack,
  Tag,
} from "@chakra-ui/core"
import register from "app/auth/mutations/register"
import { Link as BlitzLink, useMutation } from "blitz"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { FaKey, FaLock, FaUnlock, FaUser } from "react-icons/fa"

type RegisterFormProps = {
  onSuccess?: () => void
}

export const RegisterForm = (props: RegisterFormProps) => {
  const [registerMutation] = useMutation(register)
  const { register: registerForm, handleSubmit, errors } = useForm({
    mode: "onChange",
  })
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const toggleShowPassword = () => setShowPassword(!showPassword)

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      await registerMutation({
        username: data.username,
        plexUsername: data.plexUsername,
        password: data.password,
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
            Register
          </Heading>
          <Flex>
            {serverError && (
              <Tag color={"crimson"} mx={2}>
                {serverError}
              </Tag>
            )}
            <Link as={BlitzLink} href="/login">
              <Button>Login</Button>
            </Link>
          </Flex>
        </Flex>

        <FormControl isInvalid={!!errors.username} isRequired>
          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<FaUser />} />
            <Input
              errorBorderColor="crimson"
              name="username"
              placeholder="Username"
              type="text"
              ref={registerForm({
                required: true,
                maxLength: 20,
                minLength: 3,
              })}
            />
          </InputGroup>
        </FormControl>

        <FormControl isInvalid={!!errors.plexUsername} isRequired>
          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<FaUser />} />
            <Input
              errorBorderColor="crimson"
              name="plexUsername"
              placeholder="Plex Username"
              type="text"
              ref={registerForm({
                required: true,
                maxLength: 20,
                minLength: 3,
              })}
            />
          </InputGroup>
        </FormControl>

        <FormControl isInvalid={!!errors.password} isRequired>
          <InputGroup>
            <InputLeftElement children={<FaKey />} />
            <Input
              errorBorderColor="crimson"
              name="password"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              ref={registerForm({
                required: true,
                maxLength: 20,
                minLength: 3,
              })}
            />
            <InputRightElement
              children={
                <Button onClick={toggleShowPassword} variant="ghost">
                  {showPassword ? <FaUnlock /> : <FaLock />}
                </Button>
              }
            />
          </InputGroup>
        </FormControl>
        <Button type="submit" isLoading={loading} loadingText="Loading">
          Submit
        </Button>
      </Stack>
    </form>
  )
}

export default RegisterForm
