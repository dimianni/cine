import MovieCard from "@/components/MovieCard/MovieCard";
import SearchFilters from "@/components/SearchFilters/SearchFilters";
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
                    {searchedMovies ? (
                        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                            {
                                searchedMovies?.map(mov => {
                                    return (
                                        <MovieCard movie={mov} />
                                    )
                                })
                            }
                        </ul>
                    ) : (
                        <p>Loading...</p>
                    )}

                    { pagesCount > 1 && <Pagination numOfPages={pagesCount} currentPage={parseInt(page)} genre={genre} year={year} title={title} />}
                    
                </section>
            </main>
        </div>
    )
}