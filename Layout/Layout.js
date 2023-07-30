import { Header, Footer } from "@/components"
import Popup from "@/components/Popup/Popup"

export default function Layout({children}){
    return (
        <div className="relative">
            <Header />
                {children}
                <Popup />
            <Footer />
        </div>
    )
}