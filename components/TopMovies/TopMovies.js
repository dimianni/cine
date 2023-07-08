import Link from "next/link";
import MovieCard from "../MovieCard/MovieCard";

export default function TopMovies({movies}) {

    // console.log(movies);

    return (
        <section>
            <ul className="flex flex-wrap justify-between items-center">
                {movies?.map(movie => {
                    return (
                        <li key={movie._id}>
                            <MovieCard movie={movie} />
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}