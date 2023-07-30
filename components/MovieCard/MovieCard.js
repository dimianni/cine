import Image from "next/image";
import noImg from '../../public/no_img.jpg'
import { useState, useEffect } from "react";
import verifyImage from "@/utils/verifyImage";
import LikeButton from "../LikeButton/LikeButton";
import Link from "next/link";
import useUserInfo from "@/hooks/useUserInfo";

export default function MovieCard({ movie }) {

    const [poster, setPoster] = useState(null)
    const { userInfo } = useUserInfo()

    useEffect(() => {
        // Verifying if the poster exists
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
        <article className="w-full">
            <div className="poster-wrapper relative w-full rounded-2xl p-1 border-4 border-hsla-0-0-100-0 hover:border-grey-300">
                <Link href={`/movie/${movie._id}`} className="w-full">
                    <figure className="poster-img w-full h-[53vw] sm:h-[430px] md:h-[330px] lg:h-[330px] xl:h-[420px] rounded-xl overflow-hidden relative">
                        <div className="gradient absolute top-0 left-0 w-full h-full"></div>
                        <figcaption className="hidden">{movie.title}</figcaption>
                        {poster ? (
                            <Image width={320} height={450} style={{ width: "100%", minHeight: "100%", height: "auto", objectFit: "cover" }} src={poster} alt={movie.title} />
                        ) : (
                            <p>Loading...</p>
                        )
                        }
                    </figure>
                </Link>
                <p className="absolute bottom-4 left-4 text-sm xl:text-base font-medium uppercase text-white opacity-80">{movie.title}</p>

                {userInfo && <LikeButton id={movie._id} liked={userInfo.likedMovies.includes(movie._id)} />}
            </div>
        </article>
    )
}