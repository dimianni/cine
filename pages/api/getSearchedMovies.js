import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {

    const client = await clientPromise;
    const db = client.db("sample_mflix");

    const { genre, year, title, page } = req.body;

    // Calculate the number of items to skip based on the page number
    const itemsPerPage = 12;
    const pageNumber = parseInt(page) || 1; // If page is not provided, default to page 1
    const skipItems = (pageNumber - 1) * itemsPerPage;

    const query = {};

    if (genre !== "all") {
        query.genres = genre;
    }
    if (year !== "all") {
        const yearInt = parseInt(year)
        query.year = yearInt
    }
    if (title !== "") {
        query.title = { $regex: title, $options: "i" }
    }

    // USE $search
    // https://www.mongodb.com/developer/products/atlas/atlas-search-vs-regex/?utm_campaign=search_activation_1&utm_source=email&utm_medium=iterable
    try {
        const movies = await db
            .collection("movies")
            .find(query)
            .skip(skipItems)
            .sort({ year: -1 })
            .limit(itemsPerPage)
            .toArray();
        
        // Calculate the total count of movies that match the search criteria
        const totalMoviesCount = await db.collection("movies").countDocuments(query);
        // Calculate the total number of pages based on the total count and items per page
        const totalPages = Math.ceil(totalMoviesCount / itemsPerPage);

        res.status(200).json({ movies, totalPages })
    } catch (error) {
        res.status(500).json({ error: "Could not complete request" })
    }
}