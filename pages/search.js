import MovieContainer from "@/Layout/MovieContainer";
import { MovieCard, SearchFilters } from "@/components";
import Pagination from "@/utils/Pagination";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import nothingFound from '../public/void_illustration.svg';
import { Spinner } from "@/UI";


export default function Search() {

    const router = useRouter();
    const { genre, year, title, page } = router.query;

    const [searchedMovies, setSearchedMovies] = useState(null);
    const [pagesCount, setPagesCount] = useState(null)

    async function getMovies(genre, year, title, page) {
        const response = await fetch('api/getSearchedMovies', {
            method: "POST",
            body: JSON.stringify({ genre, year, title, page }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const { movies, totalPages } = await response.json()
        setSearchedMovies(movies)
        setPagesCount(totalPages)
    }

    function clearSearch() {
        setSearchedMovies(null)
    }

    useEffect(() => {

        getMovies(genre, year, title, page)

        return () => {
            clearSearch()
        }
    }, [genre, year, title, page])

    let movieList;

    if (!searchedMovies) {
        movieList = (
            <div className="flex justify-center items-center">
                <Spinner />
            </div>
        )
    } else if (searchedMovies?.length === 0) {
        movieList = (
            <div className="flex flex-col justify-center items-center min-h-screen">
                <Image src={nothingFound} alt="nothing found" width="220" />
                <p className="text-5xl font-semibold text-center my-4">No results here</p>
            </div>
        )
    } else {
        movieList = (
            <div>
                <MovieContainer>
                    {
                        searchedMovies?.map(mov => {
                            return (
                                <MovieCard movie={mov} />
                            )
                        })
                    }
                </MovieContainer>
            </div>
        )
    }

    return (
        <div className="container">
            <main>
                <SearchFilters setSearchedMovies={setSearchedMovies} />

                <section>
                    <div className="container">
                        {movieList}

                        {pagesCount > 1 && <Pagination numOfPages={pagesCount} currentPage={parseInt(page)} genre={genre} year={year} title={title} />}
                    </div>
                </section>
            </main>
        </div>
    )
}