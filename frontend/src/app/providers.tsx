import type { PropsWithChildren } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { queryClient } from '@/app/queryClient'
import { store } from '@/app/store'

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>{children}</HelmetProvider>
      </QueryClientProvider>
    </Provider>
  )
}

