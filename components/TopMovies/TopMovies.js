import MovieCard from "../MovieCard/MovieCard";

export default function TopMovies({movies}) {
    return (
        <section>
            <div className="section-header max-w-4/5 mx-auto">
                <div className="section-content pt-20 pb-12">
                    <h3 className="uppercase text-xs font-medium text-green text-center">According to metacritic</h3>
                    <h2 className="text-5xl font-semibold text-center my-4">All-time Best</h2>
                </div>
            </div>
            <ul className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {movies?.map(movie => {
                    return (
                        <li className="w-full" key={movie._id}>
                            <MovieCard movie={movie} />
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}