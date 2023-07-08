import axios from "axios";
import { useState } from "react";

export default function LikeButton({
    id,
    liked: likedDefault = false,
}) {

    const [liked, setLiked] = useState(likedDefault);

    async function toggleLike() {
        const response = await axios.post('/api/like', {id})
        console.log(response);
        // Updating the heart
        if(response.data){
            console.log("Modified");
            console.log(response.data.like);
            setLiked(true)
        } else {
            console.log("Modified v2");

            setLiked(false)
        }
    }

    return (
        <button className={(liked ? 'fill-green ' : '') + "flex items-center absolute right-1 top-1"} onClick={toggleLike}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 mr-1 fill-inherit">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
        </button>
    )
}