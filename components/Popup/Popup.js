import { Button } from "@/UI"
import { setPopup } from "@/redux/actions/popupActions"
import { signIn } from "next-auth/react"
import { X } from "react-feather"
import { useDispatch, useSelector } from "react-redux"



export default function Popup() {

    const dispatch = useDispatch()
    const popupDetails = useSelector(state => state.popup)

    function handleClosePopup(){
        dispatch(setPopup({type: null, isOpen: false}))
    }

    let popupText;

    if (popupDetails.type === "LOGIN"){
        popupText = "Please sign in to start saving movies!"
    } else {
        popupText = "An error occured, please reload the page!"
    }

    return (
        <div className={`popup-overlay bg-rgba-neutral-muted fixed top-0 left-0 right-0 bottom-0 z-[999] ${popupDetails.isOpen ? "" : "hidden"}`} onClick={handleClosePopup}>
            <div className={`popup absolute w-[300px] bg-white rounded-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  ${popupDetails.isOpen ? "" : "hidden"}`}>
                <div className="wrapper relative px-16 py-8 text-grey-600">
                    <div className="closebtn absolute top-3 right-3 w-8 h-8 flex justify-center items-center cursor-pointer" onClick={handleClosePopup}>
                        <X className="text-grey-600 w-6 h-6" />
                    </div>
                    <div className="flex flex-col text-center justify-center items-center">
                        <p className="text-base mb-4">{popupText}</p>
                        {popupDetails.type === "LOGIN" && 
                            <Button onClick={() => signIn()} color="green">
                                Sign in
                            </Button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}