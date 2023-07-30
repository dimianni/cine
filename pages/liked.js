import MovieContainer from "@/Layout/MovieContainer";
import { Spinner } from "@/UI";
import { MovieCard } from "@/components";
import Head from "next/head"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"


export default function Liked() {

    const [favMovies, setFavMovies] = useState(null);
    const user = useSelector(state => state.auth.user)

    async function getFavMovies(arr) {
        if (!arr) {
            return;
        }

        const response = await fetch('api/getLikedMovies', {
            method: "POST",
            body: JSON.stringify({ arr }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        let { movies } = await response.json()
        // console.log(movies);
        setFavMovies(movies)
    }

    useEffect(() => {
        getFavMovies(user?.likedMovies)
    }, [user])

    let favMoviesList;

    if (!favMovies){
        favMoviesList = (
            <div className=" w-full flex justify-center items-center">
                <Spinner />
            </div>
        )
    } else if (favMovies?.length === 0){
        favMoviesList = (
            <p>There are no movies in your collection :(</p>
        )
    } else {
        favMoviesList = (
            <MovieContainer>
                {
                    favMovies?.map(movie => {
                        return (
                            <li>
                                <MovieCard movie={movie} />
                            </li>
                        )
                    })
                }
            </MovieContainer>
        )
    }

    return (
        <div className="container">
            <Head>
                <title>Cine | Liked Movies</title>
            </Head>

            <main>
                <section>
                    <div className="container">
                        <div className="section-header">
                            <div className="section-content py-12">
                                <h2 className="text-5xl font-semibold my-4">Your Collection</h2>
                            </div>
                        </div>
                        <div>
                            {favMoviesList}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}