'use client'

import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"
type Prop = {
    children: ReactNode
}
export const NextAuthProvider = ({children}:Prop) => {
    return <SessionProvider>{children}</SessionProvider>
}