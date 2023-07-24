import Image from "next/image"
import notFound from '../public/brokenrobot_illustration.svg'

export default function NotFound(){
    return(
        <main>
            <div className="container">
                <div className="flex flex-col justify-center items-center min-h-screen">
                    <Image src={notFound} alt="not found" />
                </div>
            </div>
        </main>
    )
}