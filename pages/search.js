import MovieContainer from "@/Layout/MovieContainer";
import { MovieCard, SearchFilters } from "@/components";
import Pagination from "@/utils/Pagination";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Search(){

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

    function clearSearch(){
        setSearchedMovies(null)
    }

    useEffect(() => {
        
        getMovies(genre, year, title, page)

        return () => {
            clearSearch()
        }
    }, [genre, year, title, page])

    return (
        <div className="container">
            <main>
                <SearchFilters setSearchedMovies={setSearchedMovies} />

                <section>
                    <div className="container">
                        {searchedMovies ? (
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
                        ) : (
                            <p>Loading...</p>
                        )}

                        {pagesCount > 1 && <Pagination numOfPages={pagesCount} currentPage={parseInt(page)} genre={genre} year={year} title={title} />}
                    </div>
                </section>
            </main>
        </div>
    )
}