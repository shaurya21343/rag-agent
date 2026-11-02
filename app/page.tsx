'use client'

import { ClerkProvider, SignIn, useAuth } from '@clerk/nextjs'
import Chat from '@/pages/chat-page'

const Page = () => {
  
  const { isLoaded, isSignedIn } = useAuth()

  if (!isLoaded) {
    return <p>Loading...</p>
  }

  if (!isSignedIn) {
    return (
      <ClerkProvider>
        <main className="flex min-h-screen items-center justify-center">
          <SignIn routing="hash" />
        </main>
      </ClerkProvider>
    )
  }

  return (
    <ClerkProvider>
    <div>
      <Chat />
    </div>
    </ClerkProvider>
  )
}

export default Page