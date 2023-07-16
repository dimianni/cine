import useUserInfo from "@/hooks/useUserInfo";
import { signIn } from "next-auth/react"
import Image from "next/image";
import Link from "next/link";
import Modal from "../Modal/Modal";
import { useEffect, useState } from "react";
import { Heart } from "react-feather";


export default function Header() {

    const { userInfo, status } = useUserInfo();
    console.log(userInfo?.likedMovies);

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
        <header className="header w-full py-3 h-16">
            <div className="container h-full flex justify-between items-center">
                <Link href="/">
                    <h1 className="text-green text-2xl font-bold w-52 tracking-wider">cine</h1>
                </Link>
                {userInfo ? (
                    <div className="flex justify-center items-center">
                        <div className="w-7 h-7 relative flex justify-center items-end">
                            <div className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 w-4 h-4 rounded-full bg-green flex justify-center items-center">
                                <span className="text-xs">{countLikedMovies}</span>
                            </div>
                            <Heart className="w-6 h-6" />
                        </div>
                        <div onClick={() => handleModalOpen()} className="wrapper rounded-full overflow-hidden w-8 h-8 ml-4">
                            <Image width="32" height="32" src={userInfo.image} style={{ "width": "100%", "height": "auto", "objectFit": "cover" }} />
                        </div>
                    </div>
                ) : (
                    <p>
                        <button onClick={() => signIn()}>Sign in</button>
                    </p>
                )}
            </div>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} onClose={handleModalClose} />
        </header>
    )
}