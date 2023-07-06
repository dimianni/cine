import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { useRouter } from "next/router"

export default function Movie({ movie }) {



    return (
        <section>
            <h1>{movie?.title}</h1>
        </section>
    )
}

export const getServerSideProps = async (context) => {

    // let router = useRouter()
    // let { id } = router.query;


    try {

        let { id } = context.query;

        const client = await clientPromise;
        const db = client.db("sample_mflix");

        const movie = await db
            .collection("movies")
            .findOne({_id: new ObjectId(id)})

        const foundMovie = JSON.parse(JSON.stringify(movie))

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