import { useState, useEffect } from 'react';
import genres from '../../filterData/genres.json'
import years from '../../filterData/years.json'


export default function SearchFilters({ setSearchedMovies }) {

    const [selectedGenre, setSelectedGenre] = useState("all");
    const [selectedYear, setSelectedYear] = useState("all");
    const [inputTitle, setInputTitle] = useState("");

    function handleGenreChange(e) {
        setSelectedGenre(e.target.value)
    }
    function handleYearChange(e) {
        setSelectedYear(e.target.value);
    }
    function handleTitleChange(e) {
        setInputTitle(e.target.value)
    }

    async function getMovies() {
        // Clear out previous search
        setSearchedMovies(null)

        const response = await fetch('api/getSearchedMovies', {
            method: "POST",
            body: JSON.stringify({ selectedGenre, selectedYear, inputTitle }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const { movies } = await response.json()
        setSearchedMovies(movies)
    }

    function clearfilters(){
        setSelectedGenre("all")
        setSelectedYear("all")
        setInputTitle("")
    }

    useEffect(() => {
        getMovies()
    }, [])


    return (
        <section>
            {/* <h1>Search</h1> */}
            <div className='flex justify-between items-center mb-4'>
                <div className="filters flex justify-between items-center">
                    <div className="title flex flex-col mr-3">
                        <label htmlFor="title">Filter by Genre:</label>
                        <input id='title' className='text-black' type="text" onChange={(e) => handleTitleChange(e)} value={inputTitle} />
                    </div>
                    <div className="genres flex flex-col mr-3">
                        <label htmlFor="genre">Filter by Genre:</label>
                        <select id="genre" value={selectedGenre} onChange={(e) => handleGenreChange(e)} className='bg-grey-400 text-white'>
                            <option value="all">All</option>
                            {genres.map((genre) => (
                                <option key={genre} value={genre}>
                                    {genre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="years flex flex-col">
                        <label htmlFor="year">Filter by Year:</label>
                        <select id="year" value={selectedYear} onChange={(e) => handleYearChange(e)} className='bg-grey-400 text-white'>
                            <option value="all">All</option>
                            {years.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="btns">
                    <button className='bg-green rounded-lg text-grey-400 px-3 py-2' onClick={() => getMovies()}>
                        Search
                    </button>
                    <button className='ml-3 bg-transparent rounded-lg border border-white px-3 py-2' onClick={clearfilters}>Clear</button>
                </div>
            </div>
        </section>
    )
}