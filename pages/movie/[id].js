import { Spinner } from "@/UI";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import Image from "next/image";
import { useRouter } from "next/router"
import { useEffect } from "react";
import notFound from '../../public/brokenrobot_illustration.svg'

export default function Movie({ movie }) {

    useEffect(() => {
        console.log(movie);
    }, [movie])

    let movieInfo;

    if(!movie){
        movieInfo = (
            <div className="flex justify-center items-center min-h-screen">
                <Spinner />
            </div>
        )
    } else if (JSON.stringify(movie) === '{}'){
        movieInfo = (
            <div className="flex justify-center items-center min-h-screen">
                <Image src={notFound} alt="not found" />
            </div>
        )
    } else {
        movieInfo = (
            <h1>{movie.title}</h1>
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
            .findOne({_id: new ObjectId(id)})

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