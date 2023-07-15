import useUserInfo from "@/hooks/useUserInfo";
import { signIn } from "next-auth/react"
import Image from "next/image";
import Link from "next/link";
import Modal from "../Modal/Modal";
import { useState } from "react";


export default function Header() {

    const { userInfo, status } = useUserInfo();
    // console.log(userInfo);


    // const { data: session, status } = useSession()
    // const [userInfo, setUserInfo] = useState(null)

    // function getUserInfo(){
    //     if (status === "authenticated"){
    //         fetch("/api/users?id=" + session.user.id)
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data);
    //             setUserInfo(data.user)
    //         })
    //     }
    // }

    // useEffect(() => {
    //   getUserInfo()
    // }, [status])

    const [isOpen, setIsOpen] = useState(false)

    const handleModalOpen = () => {
        setIsOpen(true);
    };

    const handleModalClose = () => {
        setIsOpen(false);
    };

    return (
        <header className="header w-full py-3 h-16">
            <div className="container h-full flex justify-between items-center">
                <Link href="/">
                    <h1 className="text-green text-2xl font-bold w-52 tracking-wider">cine</h1>
                </Link>
                {userInfo ? (
                    <div onClick={() => handleModalOpen()} className="wrapper rounded-full overflow-hidden w-8 h-8">
                        <Image width="32" height="32" src={userInfo.image} style={{ "width": "100%", "height": "auto", "objectFit": "cover" }} />
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