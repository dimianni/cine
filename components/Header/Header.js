import useUserInfo from "@/hooks/useUserInfo";
import { signIn } from "next-auth/react"
import Image from "next/image";
import Link from "next/link";
import Modal from "../Modal/Modal";
import { useEffect, useState } from "react";
import { Heart } from "react-feather";
import { useSelector } from "react-redux";
import { Button } from "@/UI";


export default function Header() {

    const { userInfo, status } = useUserInfo();
    // console.log(userInfo?.likedMovies);

    const user = useSelector(state => state.auth.user)
    // console.log(user);

    const [isOpen, setIsOpen] = useState(false);
    const [countLikedMovies, setCountLikedMovies] = useState(null);

    const handleModalOpen = () => {
        setIsOpen(true);
    };

    const handleModalClose = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        setCountLikedMovies(userInfo?.likedMovies.length)
    }, [userInfo])

    return (
        <header className="header sticky top-0 left-0 w-full bg-grey-600 z-[998] py-3 h-16">
            <div className="container h-full flex justify-between items-center">
                <Link href="/">
                    <h1 className="text-green text-2xl font-bold w-52 tracking-wider">cine</h1>
                </Link>
                {user ? (
                    <div className="flex justify-center items-center">
                        <Link href="liked" className="w-7 h-7 relative flex justify-center items-end">
                            <div className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 w-4 h-4 rounded-full bg-green flex justify-center items-center">
                                <span className="text-xs">{user.likedMovies.length}</span>
                            </div>
                            <Heart className="w-6 h-6" />
                        </Link>
                        <div onClick={() => handleModalOpen()} className="rounded-full overflow-hidden w-8 h-8 ml-4">
                            <Image width="32" height="32" src={user.image} style={{ "width": "100%", "height": "auto", "objectFit": "cover" }} />
                        </div>
                    </div>
                ) : (
                        <Button color="grey" onClick={() => signIn()}>Sign in</Button>
                )}
            </div>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} onClose={handleModalClose} />
        </header>
    )
}