import { updateUser } from "@/redux/actions/authActions";
import { setPopup } from "@/redux/actions/popupActions";
import axios from "axios";
import { useEffect, useState } from "react";
import { Heart } from "react-feather";
import { useDispatch, useSelector } from "react-redux";

export default function LikeButton({ id, liked:likedDefault}) {

    const [liked, setLiked] = useState(likedDefault);
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user)

    // When you set the initial state of the "liked" variable using the "likedDefault" prop in the LikeButton component, 
    // the state value is only set once when the LikeButton component is first rendered. Subsequent updates to the 
    // "likedDefault" prop won't automatically update the state of "liked".
    // To fix this issue, you can use the useEffect hook in the LikeButton component to update the "liked" state whenever 
    // the "likedDefault" prop changes.This way, the "liked" state will always be in sync with the latest "likedDefault" prop value.
    useEffect(() => {
        setLiked(likedDefault);
    }, [likedDefault]);


    async function toggleLike() {

        if(!user){
            dispatch(setPopup({type: "LOGIN", isOpen: true}))   
            return
        }

        setLiked(true)
        const response = await axios.post('/api/like', {id})
        
        if (response.data.error) {
            dispatch(setPopup({ type: "ERROR", isOpen: true }))
            setLiked(false)
        } 
        if (response.data.updatedUser) {
            dispatch(updateUser(response.data.updatedUser))
        }
        if (!response.data.result) {
            setLiked(false)
        }
    }

    return (
        <button className={(liked ? 'fill-green ' : '') + "flex items-center w-full h-full"} onClick={toggleLike}>
            <Heart className="w-full h-full" color="currentColor" fill="inherit" />
        </button>
    )
}