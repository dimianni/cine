import { Heading, Spinner } from "@/UI"
import useUserInfo from "@/hooks/useUserInfo"
import { getProviders, signIn } from "next-auth/react"
import { useRouter } from "next/router"
import Google from "../public/google-icon.svg"
// import Cine from "../public/cine-login.jpg"
import Image from "next/image"
import Link from "next/link"


export default function LoginPage({ providers }) {

    const { userInfo, status } = useUserInfo()
    const router = useRouter()

    if (status === "loading") {
        return (
            <Spinner />
        )
    }
    if (userInfo) {
        router.push('/')
    }

    return (
        <main className="h-screen">
            <div className="flex h-full">
                <div className="left w-full md:w-1/3 h-full px-10 py-3">
                    <div className="relative w-full h-full flex flex-col justify-center items-center">
                        <div className="logo absolute top-0 left-0">
                            <Link href="/">
                                <h1 className="text-green text-2xl font-bold tracking-wider">cine</h1>
                            </Link>
                        </div>

                        <div className="mb-7">
                            <Heading num="1" size="lg" color="white">
                                Log in to your account
                            </Heading>
                        </div>
                        <div className="btn">
                            {
                                Object.values(providers).map(provider => {
                                    return (
                                        <button className="flex items-center bg-white py-3 px-16 rounded-lg" onClick={async () => { await signIn(provider.id) }}>
                                            <Image src={Google} alt="Google" width="42" height="42" />
                                            <p className="text-xl text-grey-300 ml-2">{provider.name}</p>
                                        </button>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="hidden md:block login-bg w-2/3 h-full"></div>
            </div>
        </main>
    )
}

export async function getServerSideProps() {

    const providers = await getProviders()

    return {
        props: { providers }
    }
}