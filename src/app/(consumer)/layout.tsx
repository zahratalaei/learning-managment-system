import Link from "next/link";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Suspense } from "react";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/services/clerk";
import { canAccessAdminPages } from "@/permissions/general";
export default function ConsumerLayout({children}:Readonly<{children:React.ReactNode;}>) {
 return( <>
    <Navbar/>
    {children}
  </>
 )
}

function Navbar(){
    return<header className="flex h-12 shadow bg-background z-10">
        <nav className="flex gap-4 container">
            <Link className="mr-auto text-lg hover:underline flex items-center px-2" href="/"> My LMS</Link>
            <Suspense>
            <SignedIn>
               <AdminLink />
                <Link className="hover:bg-accent/10 flex items-center px-2" href="/courses">My Courses</Link>
                <Link className="hover:bg-accent/10 flex items-center px-2" href="/courses">Purchase History</Link>
                <UserButton appearance={{
                    elements: {
                        userButtonAvatarBox : {width:"100%",height:"100%"},
                    }
                }} />
            </SignedIn>
            </Suspense>
            <Suspense>
                <SignedOut>
                    <Button className="self-center" asChild>
                        <SignInButton>
                            Sign In
                        </SignInButton>
                    </Button>
                </SignedOut>
            </Suspense>
        </nav>
        </header>
}

async function AdminLink(){
    const user = await getCurrentUser()
    if(!canAccessAdminPages(user)) return null
    return (
        <Link className="hover:bg-accent/10 flex items-center px-2" href="/admin">Admin</Link>
    )
}