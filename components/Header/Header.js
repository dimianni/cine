import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link";

export default function Header(){

    const { data: session } = useSession()

    return (
        <header className="header w-full py-3 h-16">
            <div className="container flex justify-between items-center">
                <Link href="/">
                    <h1 className="text-green text-2xl font-bold w-52 tracking-wider">mflix</h1>
                </Link>
                {session ? (
                    <p>
                        Hello, {session.user.name}!
                        {/* <button onClick={() => signOut()}>Sign out</button> */}
                    </p>
                ) : (
                    <p>
                        <button onClick={() => signIn()}>Sign in</button>
                    </p>
                )}
            </div>
        </header>
    )
}