import Head from 'next/head'
import clientPromise from '../lib/mongodb'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"

export default function Home({ isConnected, movies }) {

  const { data: session } = useSession()

  return (
    <div className="container">
      <Head>
        <title>Cine</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>

        <section>
          {session ? (
            <div>
              Signed in as {session.user.email} <br />
              <button onClick={() => signOut()}>Sign out</button>
            </div>
          ) : (
            <div>
              Not signed in <br />
              <button onClick={() => signIn()}>Sign in</button>
            </div>
          )}
        </section>

        <section>
          <ul>
            {movies?.map(movie => {
              return (
                <li>
                  <p>{movie.title}</p>
                </li>
              )
            })}
          </ul>
        </section>




        <Link href={`/movie/573a1390f29313caabcd42e8`}>Go to movie</Link>

      </main>
    </div>
  )
}

export const getStaticProps = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("sample_mflix");

    const movies = await db
      .collection("movies")
      .find({})
      .sort({ metacritic: -1 })
      .limit(10)
      .toArray();

    // ThaHeck?? --> JSON.parse(JSON.stringify())
    let topMovies = JSON.parse(JSON.stringify(movies));

    return {
      props: {
        isConnected: true,
        movies: topMovies
      },
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false },
    }
  }
}
