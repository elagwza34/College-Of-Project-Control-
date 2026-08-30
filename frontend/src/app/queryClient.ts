import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        const status = error instanceof Response ? error.status : 0
        return status >= 500 && failureCount < 2
      },
    },
  },
})

