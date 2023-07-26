import MovieContainer from "@/Layout/MovieContainer";
import MovieCard from "../MovieCard/MovieCard";
import { Heading, Spinner } from "@/UI";

export default function TopMovies({ movies }) {
    return (
        <section>
            <div className="container">
                <div className="section-header max-w-4/5 mx-auto">
                    <div className="section-content pt-20 pb-12">
                        <Heading num="3" size="sm" color="green">
                            According to metacritic
                        </Heading>
                        <Heading num="2" size="lg" color="white">
                            All-time Best
                        </Heading>
                        {/* <h3 className="uppercase text-xs font-medium text-green text-center">According to metacritic</h3>
                        <h2 className="text-5xl font-semibold text-center my-4">All-time Best</h2> */}
                    </div>
                </div>
                <div>
                    <MovieContainer>
                        {
                            movies ? (movies.map(movie => {
                                return (
                                    <li className="w-full" key={movie._id}>
                                        <MovieCard movie={movie} />
                                    </li>
                                )
                            })) : (
                                <div>
                                    <Spinner />
                                </div>
                            )
                        }
                    </MovieContainer>
                </div>
            </div>
        </section>
    )
}