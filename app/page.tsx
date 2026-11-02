'use client'

import { SignIn, useAuth } from '@clerk/nextjs'
import Chat from '@/pages/chat-page'

const Page = () => {
  
  const { isLoaded, isSignedIn } = useAuth()

  if (!isLoaded) {
    return <p>Loading...</p>
  }

  if (!isSignedIn) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <SignIn routing="hash" />
      </main>
    )
  }

  return (
    <div>
      <Chat />
    </div>
  )
}

export default Page