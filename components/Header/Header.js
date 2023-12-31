import { signIn } from "next-auth/react"
import Image from "next/image";
import Link from "next/link";
import Modal from "../Modal/Modal";
import { useEffect, useState } from "react";
import { Heart, Search } from "react-feather";
import { useSelector } from "react-redux";
import { Button } from "@/UI";


export default function Header() {


    const user = useSelector(state => state.auth.user)
    const status = useSelector(state => state.auth.status)

    const [isOpen, setIsOpen] = useState(false);
    const [countLikedMovies, setCountLikedMovies] = useState(null);

    const handleModalOpen = () => setIsOpen(true);
    const handleModalClose = () => setIsOpen(false);

    useEffect(() => {
        setCountLikedMovies(user?.likedMovies.length)
    }, [user])

    let userData;

    if (status === "loading") {
        userData = <p>Loading...</p>
    } else if (status === "authenticated") {
        userData = (
            <div className="flex justify-center items-center">
                <Link href="/liked" className="w-7 h-7 relative flex justify-center items-end">
                    <div className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 w-4 h-4 rounded-full bg-green flex justify-center items-center">
                        <span className="text-xs text-grey-900">{user.likedMovies.length}</span>
                    </div>
                    <Heart className="w-6 h-6" />
                </Link>
                <div onClick={() => handleModalOpen()} className="rounded-full overflow-hidden w-8 h-8 ml-4 cursor-pointer">
                    <Image width="32" height="32" alt="avatar" src={user.image} style={{ "width": "100%", "height": "auto", "objectFit": "cover" }} />
                </div>
            </div>
        )
    } else {
        userData = <Button color="grey" onClick={() => signIn()}>Sign in</Button>
    }

    return (
        <header className="header sticky top-0 left-0 w-full bg-grey-600 z-[998] py-3 h-16">
            <div className="container h-full flex justify-between items-center">
                <Link href="/">
                    <h1 className="text-green text-2xl font-bold tracking-wider">cine</h1>
                </Link>
                <div className="flex justify-center items-center">
                    <Link href="/search?genre=all&year=all&title=&page=1" className="mt-1 mr-4">
                        <Search className="w-6 h-6" />
                    </Link>
                    {userData}
                </div>
            </div>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} onClose={handleModalClose} />
        </header>
    )
}