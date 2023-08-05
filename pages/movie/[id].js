import { Heading, Spinner } from "@/UI";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import Image from "next/image";
import { useEffect, useState } from "react";
import notFound from '../../public/brokenrobot_illustration.svg'
import verifyImage from "@/utils/verifyImage";
import { Star } from "react-feather";
import Link from "next/link";
import { LikeButton } from "@/components";
import { useSelector } from "react-redux";
import noImg from "../../public/no_img.jpg"
import Head from "next/head";


export default function Movie({ movie }) {

    const [poster, setPoster] = useState(null)
    const user = useSelector(state => state.auth.user)
    const [isLiked, setIsLiked] = useState(false)

    const onlyNames = (text) => text.split("(")[0]

    useEffect(() => {
        setIsLiked(user?.likedMovies.includes(movie._id))
    }, [user])

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

    let movieInfo;

    if (!movie) {
        movieInfo = (
            <div className="flex justify-center items-center min-h-screen">
                <Spinner />
            </div>
        )
    } else if (JSON.stringify(movie) === '{}') {
        movieInfo = (
            <div className="flex justify-center items-center min-h-screen">
                <Image src={notFound} alt="not found" />
            </div>
        )
    } else {
        movieInfo = (
            <div>
                <div className="flex justify-between items-center mt-4 mb-6">
                    <div className="flex flex-col">
                        <div className="title mb-1">
                            <Heading num="1" size="lg" color="white">
                                {movie.title}
                            </Heading>
                        </div>
                        <div className="flex justify-start items-center text-grey-300 text-sm">
                            <p className="year">
                                {
                                    typeof (movie.year) === "string" ? (
                                        <span>{movie.year.replace(/[^0-9.]/g, "")}</span>
                                    ) : (
                                        <span>{movie.year}</span>
                                    )
                                }
                            </p>
                            {
                                movie.runtime && (
                                    <p className="runtime before:content-[''] before:inline-block before:w-[2px] before:h-[2px] before:bg-grey-300 before:mx-2 before:rounded-full before:align-middle">
                                        {
                                            Math.floor(movie.runtime / 60) !== 0 && (
                                                <span>{Math.floor(movie.runtime / 60)}h </span>
                                            )
                                        }
                                        {
                                            movie.runtime % 60 !== 0 && (
                                                <span>{movie.runtime % 60}m</span>
                                            )
                                        }
                                    </p>
                                )
                            }
                        </div>
                    </div>

                    <div className="imdbRating flex flex-col text-grey-300 text-sm">
                        <p className="mb-2">IMDb <span className="uppercase">rating</span></p>
                        <div className="flex items-center">
                            <div className="mr-2">
                                <Star className="w-7 h-7 fill-green text-green" />
                            </div>
                            <div className="flex flex-col">
                                <p className="rating text-white text-lg leading-[.5rem]">
                                    {movie.imdb.rating} <span className="text-grey-300 text-sm">/ 10</span>
                                </p>
                                <p className="votes leading-4">
                                    {
                                        Math.floor(movie.imdb.votes / 1000) > 0 ? (
                                            <span>{Math.floor(movie.imdb.votes / 1000)}K</span>
                                        ) : (
                                            <span>{Math.floor(movie.imdb.votes % 1000)}</span>
                                        )
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-start">
                    <div className="w-full md:w-1/3 mb-5 md:mb-0 poster-wrapper">
                        <figure className="poster-img w-full h-auto md:h-[365px] lg:h-[450px] xl:h-[550px] rounded-xl overflow-hidden relative">
                            <figcaption className="hidden">{movie.title}</figcaption>
                            {
                                poster ? (
                                    <Image width={320} height={450} style={{ width: "100%", height: "100%", objectFit: "cover" }} src={poster} alt={movie.title} />
                                ) : (
                                    <p>Loading...</p>
                                )
                            }
                        </figure>
                    </div>

                    <div className="w-full md:w-3/5 flex-7 md:ml-4 desrc text-white">
                        <div className="genres">
                            <ul className="flex">
                                {movie.genres && movie.genres.map(genre => {
                                    return (
                                        <li key={genre} className="text-sm mr-2 last:mr-0">
                                            <Link href={`/search?genre=${genre}&year=all&title=&page=1`}>
                                                <span className="px-2 py-1 border border-grey-300 rounded-full hover:bg-rgba-neutral-muted">
                                                    {genre}
                                                </span>
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>

                        <p className="plot mt-5 mb-4">
                            {movie.plot && movie.plot}
                        </p>

                        <div className="directors flex items-start justify-start py-2 border-t-[1px] border-grey-300">
                            <p>Directors:&nbsp;&nbsp;</p>
                            <ul className="flex flex-wrap">
                                {
                                    movie.directors ? (movie.directors.map((director, i) => {
                                        return (
                                            <li key={director} className="flex">
                                                <p>{onlyNames(director)}</p>
                                                {i !== movie.directors.length - 1 && <span>,&nbsp;</span>}
                                            </li>
                                        )
                                    })) : (
                                        <p className="italic text-grey-300">No info</p>
                                    )
                                }
                            </ul>
                        </div>

                        <div className="writers flex items-start justify-start py-2 border-t-[1px] border-grey-300">
                            <p>Writers:&nbsp;&nbsp;</p>
                            <ul className="flex flex-wrap">
                                {
                                    movie.writers ? (movie.writers.map((writer, i) => {
                                        return (
                                            <li key={writer} className="flex">
                                                <p>{onlyNames(writer)}</p>
                                                {i !== movie.writers.length - 1 && <span>,&nbsp;</span>}
                                            </li>
                                        )
                                    })) : (
                                        <p className="italic text-grey-300">No info</p>
                                    )
                                }
                            </ul>
                        </div>

                        <div className="stars flex items-start justify-start py-2 border-t-[1px] border-grey-300">
                            <p>Stars:&nbsp;&nbsp;</p>
                            <ul className="flex flex-wrap">
                                {
                                    movie.cast ? (movie.cast.map((star, i) => {
                                        return (
                                            <li key={star} className="flex">
                                                <p>{onlyNames(star)}</p>
                                                {i !== movie.cast.length - 1 && <span>,&nbsp;</span>}
                                            </li>
                                        )
                                    })) : (
                                        <p className="italic text-grey-300">No info</p>
                                    )
                                }
                            </ul>
                        </div>

                        <div className="w-full h-8 relative mt-32 flex justify-between items-center">
                            <div className="metascore text-sm">
                                {movie.metacritic &&
                                    <p>
                                        <span className="border border-green p-[2px] text-grey-600 bg-green">{movie.metacritic}</span> Metascore
                                    </p>
                                }
                            </div>
                            <div className="text-green w-8 h-8">
                                <LikeButton id={movie._id} liked={isLiked} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <Head>
                <title>Cine | {movie.title}</title>
                <meta name="description" content={movie.plot} />
                <meta property="og:title" content={movie.title} />
                <meta property="og:site_name" content={movie.title} />
                <meta property="og:description" content={movie.plot} />
            </Head>
            <main className="min-h-screen">
                <div className="container">
                    {movieInfo}
                </div>
            </main>
        </>
    )
}

export const getServerSideProps = async (context) => {
    try {

        // getServerSideProps can use "context" instead of "router"
        let { id } = context.query;

        const client = await clientPromise;
        const db = client.db("sample_mflix");
        let foundMovie;

        const movie = await db
            .collection("movies")
            .findOne({ _id: new ObjectId(id) })

        if (movie) {
            foundMovie = JSON.parse(JSON.stringify(movie))
        } else {
            foundMovie = {}
        }

        // console.log(foundMovie);

        return {
            props: {
                movie: foundMovie
            }
        }

    } catch (error) {
        console.log(error);
        return {
            props: {
                movie: null
            }
        }
    }
}