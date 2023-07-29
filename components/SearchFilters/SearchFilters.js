import { useState } from 'react';
import genres from '../../filterData/genres.json'
import years from '../../filterData/years.json'
import { useRouter } from 'next/router';
import { Button } from '@/UI';


export default function SearchFilters() {

    const router = useRouter()
    const [selectedGenre, setSelectedGenre] = useState("all");
    const [selectedYear, setSelectedYear] = useState("all");
    const [inputTitle, setInputTitle] = useState("");

    const handleGenreChange = (e) => setSelectedGenre(e.target.value);
    const handleYearChange = (e) => setSelectedYear(e.target.value);
    const handleTitleChange = (e) => setInputTitle(e.target.value);

    function handleClear() {
        setSelectedGenre("all")
        setSelectedYear("all")
        setInputTitle("")
    }

    function handleSearch() {
        router.push(`/search?genre=${selectedGenre}&year=${selectedYear}&title=${inputTitle}&page=1`)
    }

    return (
        <section>
            <div className='flex flex-col md:flex-row justify-between items-end mb-4 px-2'>
                <div className="filters flex flex-col w-full md:w-auto md:flex-row justify-between items-center md:items-start">
                    <div className="title w-full md:w-auto flex flex-col mb-3 md:mb-0 md:mr-3">
                        <label className='text-sm text-grey-300 mb-1' htmlFor="title">Filter by Name:</label>
                        <input id='title' placeholder='Search...' className='bg-grey-400 text-white py-2 px-3 leading-5 rounded-lg text-base' type="text" onChange={(e) => handleTitleChange(e)} value={inputTitle} />
                    </div>
                    <div className="genres w-full md:w-auto flex flex-col mb-3 md:mb-0 md:mr-3">
                        <label className='text-sm text-grey-300 mb-1' htmlFor="genre">Filter by Genre:</label>
                        <select id="genre" value={selectedGenre} onChange={(e) => handleGenreChange(e)} className='bg-grey-400 text-white py-2 px-3 leading-5 rounded-lg text-base'>
                            <option value="all">All</option>
                            {genres.map((genre) => (
                                <option key={genre} value={genre}>
                                    {genre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="years w-full md:w-auto flex flex-col mb-3 md:mb-0">
                        <label className='text-sm text-grey-300 mb-1' htmlFor="year">Filter by Year:</label>
                        <select id="year" value={selectedYear} onChange={(e) => handleYearChange(e)} className='bg-grey-400 text-white py-2 px-3 leading-5 rounded-lg text-base'>
                            <option value="all">All</option>
                            {years.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="btns w-full md:w-auto flex justify-between md:justify-end mt-4 md:mt-0">
                    <div className='mr-3'>
                        <Button color="green" onClick={handleSearch}>Search</Button>
                    </div>
                    <div>
                        <Button color="transparent" onClick={handleClear}>Clear</Button>
                    </div>
                </div>
            </div>
        </section>
    )
}