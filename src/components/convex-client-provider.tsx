"use client";

import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient, Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { ReactNode } from "react";
import { ClerkProvider, useAuth, SignIn, SignedOut } from "@clerk/clerk-react";


const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (

    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!} >
      <ConvexProviderWithClerk
        useAuth={useAuth}

        client={convex}>
        <Authenticated>
          {children}
        </Authenticated>
        <Unauthenticated>
          <div className="flex flex-col items-center justify-center min-h-screen">
            <SignIn />
          </div>
        </Unauthenticated>



        <AuthLoading>
         
          <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-white to-gray-100">
            <div className="relative w-24 h-24 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-[6px] border-gray-200"></div>
            <div className="absolute inset-0 rounded-full border-[6px] border-t-blue-500 border-r-purple-500 animate-spin-slow shadow-xl shadow-blue-100"></div>
            <div className="absolute inset-4 rounded-full bg-white backdrop-blur-md bg-opacity-90 shadow-inner flex items-center justify-center">
            <img src="/logo.svg" alt="App Logo" className="w-10 h-10 object-contain" />
            </div>
            </div>
            <p className="mt-8 text-2xl font-semibold text-gray-800 tracking-tight">Please wait...</p>          
            <div className="mt-6 w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 animate-progress"></div>
            </div>
          </div>
        </AuthLoading>






      </ConvexProviderWithClerk>
    </ClerkProvider>
  )

}