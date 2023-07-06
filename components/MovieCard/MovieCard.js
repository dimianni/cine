import Image from "next/image";
import noImg from '../../public/no_img.jpg'
import { useState, useEffect } from "react";
import verifyImage from "@/utils/verifyImage";

export default function MovieCard({movie}) {

    const [poster, setPoster] = useState(null)

    useEffect(() => {
        // Verifying if the poster exisits
        verifyImage(movie.poster)
            .then(isValidImg => {
                if(isValidImg){
                    setPoster(movie.poster)
                } else {
                    setPoster(noImg)
                }
            })
    }, [])
    

    return(
        <article>
            <figure>
                <figcaption>{movie.title}</figcaption>
                {poster ? (
                    <Image width={200} height={300} src={poster} alt={movie.title} />
                ) : (
                    <p>Loading...</p>
                )
            }
            </figure>
        </article>
    )
}