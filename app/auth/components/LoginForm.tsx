import { useState } from "react"
import { Link as BlitzLink, useMutation } from "blitz"
import login from "app/auth/mutations/login"
import { FaUser, FaKey, FaLock, FaUnlock } from "react-icons/fa"
import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Link,
  Tag,
} from "@chakra-ui/core"
import { useForm } from "react-hook-form"

type LoginFormProps = {
  onSuccess?: () => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)
  const { register, handleSubmit, errors } = useForm({
    mode: "onChange",
  })
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const toggleShowPassword = () => setShowPassword(!showPassword)

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      await loginMutation({
        username: data.username,
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
            Login
          </Heading>
          <Flex>
            {serverError && (
              <Tag color={"crimson"} mx={2}>
                {serverError}
              </Tag>
            )}
            <Link as={BlitzLink} href="/register">
              <Button>Register</Button>
            </Link>
          </Flex>
        </Flex>

        <FormControl isRequired>
          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<FaUser />} />
            <Input
              isInvalid={!!errors.username}
              errorBorderColor="crimson"
              name="username"
              placeholder="Username"
              type="text"
              ref={register({
                required: true,
                maxLength: 20,
                minLength: 3,
              })}
            />
          </InputGroup>
          {errors.username && <FormHelperText color="crimson">Invalid username</FormHelperText>}
        </FormControl>

        <FormControl isRequired>
          <InputGroup>
            <InputLeftElement children={<FaKey />} />
            <Input
              isInvalid={!!errors.password}
              errorBorderColor="crimson"
              name="password"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              ref={register({
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
          {errors.password && <FormHelperText color="crimson">Invalid password</FormHelperText>}
        </FormControl>
        <Button type="submit" isLoading={loading} loadingText="Loading">
          Submit
        </Button>
      </Stack>
    </form>
  )
}

export default LoginForm
