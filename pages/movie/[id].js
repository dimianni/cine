import { Heading, Spinner } from "@/UI";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import Image from "next/image";
import { useEffect, useState } from "react";
import notFound from '../../public/brokenrobot_illustration.svg'
import verifyImage from "@/utils/verifyImage";


export default function Movie({ movie }) {

    const [poster, setPoster] = useState(null)

    useEffect(() => {
        console.log(movie);
    }, [movie])

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

            <div className="">
                <div>
                    <div>
                        <div className="title">
                            <Heading num="1" size="lg" color="white">
                                {movie.title}
                            </Heading>
                        </div>
                        <div>
                            <div className="year"></div>
                            <div className="runtime"></div>
                        </div>
                    </div>

                    <div className="imdbRating"></div>
                </div>
                <div className="flex justify-between items-start">
                    <div className="w-1/3 poster-wrapper">
                        <figure className="poster-img w-full h-auto md:h-[365px] lg:h-[450px] xl:h-[550px] rounded-xl overflow-hidden relative">
                            <figcaption className="hidden">{movie.title}</figcaption>
                            {poster ? (
                                <Image width={320} height={450} style={{ width: "100%", height: "100%", objectFit: "cover" }} src={poster} alt={movie.title} />
                            ) : (
                                <p>Loading...</p>
                            )
                            }
                        </figure>
                    </div>

                    <div className="w-3/5 flex-7 ml-4 desrc">

                        <div className="directors">

                        </div>
                        <div className="genres">

                        </div>
                        <div className="cast">

                        </div>
                        <div className="plot">

                        </div>
                    </div>

                </div>
            </div>


        )
    }

    return (
        <section>
            <div className="container">
                {movieInfo}
            </div>
        </section>
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

        console.log(foundMovie);

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