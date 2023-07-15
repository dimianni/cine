import axios from "axios";
import { useState } from "react";
import { Heart } from "react-feather";

export default function LikeButton({
    id,
    liked:likedDefault = false,
}) {

    const [liked, setLiked] = useState(likedDefault);

    async function toggleLike() {
        const response = await axios.post('/api/like', {id})
        // Updating the heart
        if(response.data){
            setLiked(true)
        } else {
            setLiked(false)
        }
    }

    return (
        <button className={(liked ? 'fill-green ' : '') + "flex items-center absolute right-3 top-4"} onClick={toggleLike}>
            <Heart color="currentColor" fill="inherit" />
        </button>



    )
}