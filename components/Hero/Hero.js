import { Button } from "@/UI"
import Link from "next/link"

export default function Hero() {
    return(
        <section className="hero mb-4 relative w-full h-screen lg:h-[660px]">
            <div className="hero-bg absolute top-0 left-0 h-full w-full bg-cover -z-10"></div>
            <div className="container w-full h-full">
                <div className="w-full h-full flex flex-col items-center justify-center">
                    <h1 className="text-3xl lg:text-6xl font-semibold text-center my-4 text-white">Find and Save movies <br /> to your collection!</h1>
                    <Link href="/search?genre=all&year=all&title=&page=1">
                        <Button color="green">Get Started</Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}