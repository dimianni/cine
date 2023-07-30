import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {

    const client = await clientPromise;
    const db = client.db("sample_mflix");

    const { selectedGenre, selectedYear, inputTitle } = req.body;

    // console.log(selectedGenre, selectedYear, inputTitle);

    const query = {};

    if (selectedGenre !== "all") {
        query.genres = selectedGenre;
    }
    if (selectedYear !== "all") {
        const yearInt = parseInt(selectedYear)
        query.year = yearInt
    }
    if (inputTitle !== "") {
        query.title = { $regex: inputTitle, $options: "i" }
    }

    console.log(query);

    try {
        const movies = await db
            .collection("movies")
            .find(query)
            .limit(12)
            .toArray();

        res.status(200).json({ movies })
    } catch (error) {
        res.status(500).json({ error: "Could not complete request" })
    }
}