import Link from "next/link";

export default function Pagination({ numOfPages, currentPage, genre, year, title }) {

    const range = 2; // number of pages to show before and after current page
    const currentPageIndex = currentPage - 1; // subtract 1 to get zero-based index
    const startIndex = Math.max(currentPageIndex - range, 0); // start at 0 if we're near the beginning
    const endIndex = Math.min(currentPageIndex + range, numOfPages - 1); // end at totalPages-1 if we're near the end
    const pages = Array.from({ length: endIndex - startIndex + 1 }, (_, i) => i + startIndex + 1);

    if (startIndex > 0) {
        pages.unshift("...");
        pages.unshift(1);
    }

    if (endIndex < numOfPages - 1) {
        pages.push("...");
        pages.push(numOfPages);
    }

    return (
        <ul className="flex flex-wrap justify-center items-center">
            {
                pages.map((page, i) => {
                    return (
                        <li key={i} className={`mx-1 ${currentPage === page ? "text-blue-500" : ""}`}>
                            <Link href={`/search?genre=${genre}&year=${year}&title=${title}&page=${page}`}>{page}</Link>
                        </li>
                    )
                })
            }
        </ul>
    )
}   