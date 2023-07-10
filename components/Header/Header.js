import useUserInfo from "@/hooks/useUserInfo";
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link";
import { useEffect, useState } from "react";

function getFirstName(fullName) {
    var names = fullName.split(' ');
    return names[0];
}


export default function Header(){

    const { userInfo, status } = useUserInfo();


    // const { data: session, status } = useSession()

    // const [userInfo, setUserInfo] = useState(null)

    // // console.log(session, status);

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
    

    return (
        <header className="header w-full py-3 h-16">
            <div className="container flex justify-between items-center">
                <Link href="/">
                    <h1 className="text-green text-2xl font-bold w-52 tracking-wider">cine</h1>
                </Link>
                {userInfo ? (
                    <Link href="profile">
                        <div className="flex justify-center items-center">
                            <p className="mr-2">{getFirstName(userInfo.name)}</p>
                            <button className="underline" onClick={() => signOut()}>Sign out</button>
                        </div>
                    </Link>
                ) : (
                    <p>
                        <button onClick={() => signIn()}>Sign in</button>
                    </p>
                )}
            </div>
        </header>
    )
}