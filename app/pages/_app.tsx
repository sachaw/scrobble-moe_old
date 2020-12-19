import "app/app.css"

import { ChakraProvider } from "@chakra-ui/core"
import * as Sentry from "@sentry/node"
import { AppProps, ErrorComponent, Router } from "blitz"
import { useEffect } from "react"
import { ErrorBoundary, FallbackProps } from "react-error-boundary"
import { queryCache } from "react-query"

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    enabled: process.env.NODE_ENV === "production",
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  })
}

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <ErrorBoundary
      FallbackComponent={RootErrorFallback}
      onReset={() => {
        // This ensures the Blitz useQuery hooks will automatically refetch
        // data any time you reset the error boundary
        queryCache.resetErrorBoundaries()
      }}
    >
      <ChakraProvider>{getLayout(<Component {...pageProps} />)}</ChakraProvider>
    </ErrorBoundary>
  )
}

function RootErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  useEffect(() => {
    if (error?.name === "AuthenticationError") {
      Router.push("/login")
      resetErrorBoundary()
    }
  }, [error?.name])

  if (error?.name === "AuthorizationError") {
    return (
      <ErrorComponent
        statusCode={(error as any).statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent
        statusCode={(error as any)?.statusCode || 400}
        title={error?.message || error?.name}
      />
    )
  }
}
