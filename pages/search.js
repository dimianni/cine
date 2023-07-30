import MovieCard from "@/components/MovieCard/MovieCard";
import SearchFilters from "@/components/SearchFilters/SearchFilters";
import { useEffect, useState } from "react";

export default function Search(){

    const [searchedMovies, setSearchedMovies] = useState(null);

    useEffect(() => {
        console.log(searchedMovies);
    }, [searchedMovies])

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
                    )
                        
                    }
                </section>
            </main>
        </div>
    )
}