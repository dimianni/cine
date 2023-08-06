import { signOut } from "next-auth/react"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { X, User, Heart } from "react-feather";
import { useSelector } from "react-redux";

export default function Modal({ isOpen, setIsOpen, onClose }) {

    const userInfo = useSelector(state => state.auth.user)
    const router = useRouter()

    function handleModalClose(){
        setIsOpen(true)
        onClose()
    }

    function handleSignOut(){
        signOut()
        router.push('/')
    }

    return (
        <div onClick={() => handleModalClose()} className={`modal-overlay bg-rgba-neutral-muted fixed top-0 left-0 right-0 bottom-0 z-[999] ${isOpen ? '' : 'hidden'}`}>
            <div className={`modal rounded-tl-xl rounded-bl-xl shadow-modal p-2 transition-transform absolute top-0 right-0 w-80 h-screen flex flex-col bg-gray-800 translate-x-full ${isOpen ? '!translate-x-0' : ''}`}>
                <div className="modal-header">
                    <div className="wrapper p-2 flex justify-between items-center">
                        <div className="user flex justify-start items-center pt-2 pb-2 pl-2">
                            <div className="avatar rounded-full overflow-hidden w-8 h-8">
                                <Image width="32" height="32" src={userInfo?.image} style={{"width": "100%", "height": "100%", "objectFit": "cover"}} alt="avatar" />
                            </div>
                            <div className="user text-sm font-medium text-white ml-2 !mr-auto">
                                <p>
                                    <span>{userInfo?.name}</span>
                                </p>
                                <p className="text-xs opacity-50">
                                    <span>{userInfo?.email}</span>
                                </p>
                            </div>
                        </div>
                        <div className="close-modal pointer rounded-md bg-transparent hover:bg-grey-300 transition-all text-grey-300 hover:text-white w-8 h-8 p-2">
                            <button onClick={() => handleModalClose()} className="w-full h-full flex justify-center items-center">
                                <X color="currentColor" fill="inherit" className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="sectionDivider w-full h-[1px] bg-white opacity-30 my-2"></div>
                <nav className="actionlist">
                    <ul>
                        <li className="hover:bg-grey-400 rounded-md">
                            <Link href="/liked" className="flex justify-start items-center p-2">
                                <Heart className="text-grey-300 w-4 h-4" />
                                <p className="ml-2">Saved movies</p>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="sectionDivider w-full h-[1px] bg-white opacity-30 my-2"></div>
                <div className="logout">
                    <p className="p-2">
                        <button onClick={handleSignOut}>Sign Out</button>
                    </p>
                </div>
            </div>
        </div>

    )
}