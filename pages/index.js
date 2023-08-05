import Head from 'next/head'
import clientPromise from '../lib/mongodb'
import { TopMovies, Hero } from '@/components'

export default function Home({ isConnected, movies }) {
  return (
    <>
      <Head>
        <title>Cine | Your movie collection</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Search and save movies you'd like to watch!" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Cine | Your movie collection" />
        <meta property="og:site_name" content="Cine | Your movie collection" />
        <meta property="og:image" content="/cine.png" />
        <meta property="og:description"
          content="Search and save movies you'd like to watch!" />
      </Head>

      <main className='relative'>
        <Hero />
        <TopMovies movies={movies} />
      </main>
    </>
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
      .limit(12)
      .toArray();


    // NOTE: "movies" object cannot be used yet since it has some fileds that are object type
    // ex.: _id field is an object: new ObjectId("573a1395f29313caabce1f51")
    // Need to convert them into strings

    // JSON.parse(JSON.stringify()) can be used to deep clone and stringify the movies array.

    // JSON.parse(): This function does the opposite of JSON.stringify(). 
    // It takes a JSON string as input and converts it back into the corresponding JavaScript object 
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
