import { updateUser } from "@/redux/actions/authActions";
import axios from "axios";
import { useState } from "react";
import { Heart } from "react-feather";
import { useDispatch } from "react-redux";

export default function LikeButton({
    id,
    liked:likedDefault = false,
}) {

    const [liked, setLiked] = useState(likedDefault);
    const dispatch = useDispatch();

    async function toggleLike() {
        const response = await axios.post('/api/like', {id})
        // Updating the heart
        // console.log(response.data.updatedUser);
        if(response.data.result){
            setLiked(true)
        } else {
            setLiked(false)
        }
        if (response.data.updatedUser) {
            dispatch(updateUser(response.data.updatedUser))
        }
    }

    return (
        <button className={(liked ? 'fill-green ' : '') + "flex items-center absolute right-3 top-4"} onClick={toggleLike}>
            <Heart color="currentColor" fill="inherit" />
        </button>
    )
}