import { Popup } from "@/UI"
import { Header, Footer } from "@/components"
import { useRouter } from "next/router"
import { useEffect } from "react"

export default function Layout({children}){

    const router = useRouter()

    useEffect(() => {
        console.log(router);
    }, [])

    return (
        <div className="relative">
            {router.pathname !== "/login" && <Header />} 
                {children}
                <Popup />
            {router.pathname !== "/login" && <Footer />} 
        </div>
    )
}