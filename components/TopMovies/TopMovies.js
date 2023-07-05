export default function TopMovies({movies}) {

    console.log(movies);

    return (
        <section>
            <ul>
                {movies?.map(movie => {
                    return (
                        <li key={movie._id}>
                            <p>{movie.title}</p>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}