import Image from "next/image";
import noImg from '../../public/no_img.jpg'
import { useState, useEffect } from "react";
import verifyImage from "@/utils/verifyImage";
import LikeButton from "../LikeButton/LikeButton";
import Link from "next/link";
import { useSession } from "next-auth/react";


export default function MovieCard({ movie }) {

    const [poster, setPoster] = useState(null)

    const { data: session } = useSession()

    useEffect(() => {
        // Verifying if the poster exisits
        verifyImage(movie.poster)
            .then(isValidImg => {
                if (isValidImg) {
                    setPoster(movie.poster)
                } else {
                    setPoster(noImg)
                }
            })
    }, [])

    return (
        <article>

            <h1>{movie.title}</h1>

            <div className="relative">
                <Link href={`/movie/${movie._id}`}>
                    <figure>
                        <figcaption className="hidden">{movie.title}</figcaption>
                        {poster ? (
                            <Image width={200} height={300} src={poster} alt={movie.title} />
                        ) : (
                            <p>Loading...</p>
                        )
                        }
                    </figure>
                </Link>

                {session && <LikeButton id={movie._id} />}
            </div>


        </article>
    )
}