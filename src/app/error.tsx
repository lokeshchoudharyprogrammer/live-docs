


"use client";

import { AlertTriangleIcon } from "lucide-react";
import { Button } from '@/components/ui/button';
import Link from "next/link";

interface Props{
    error:string,
    reset:()=>void
}

const ErrorPage=({
    error,
    reset
}:Props)=>{
    return (
        <div className="min-h-screen flex flex-col items-center justify-center space-y-6">
            <div className="text-center space-y-4">
                <div className="flex justify-center">
                    <div className="bg-rose-100 p-3 rounded-full">
                        <AlertTriangleIcon className="size-10 text-rose-600"/>
                    </div>

                </div>
                <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-gray-900">
                    Something wenr Wrong 
                        
                    </h2>

                    <p>
                        {/* @ts-ignore */}
                        {error.message}
                    </p>

                </div>
            </div>

            <div className="flex items-center gap-x-3">
                <Button onClick={reset} className="font-medium px-6">
                    Try Again
                </Button>

                <Button  asChild onClick={reset} variant={"ghost"} className="font-medium px-6">
                  <Link href={"/"}>
                   Go Back
                  </Link>
                </Button>

            </div>
        </div>
    )
}


export default ErrorPage