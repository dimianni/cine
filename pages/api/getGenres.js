/*
    'api/getYears.js' and 'api/getGenres.js' can be used as endpoints to retrieve values for the filter.
    However, since my db is not going to change, I will just put the json files generated into filterData folder and use them statically.
*/

import clientPromise from "@/lib/mongodb";
import fs from 'fs';
import path from 'path';

// File path to save the genres
const genresFilePath = path.resolve('./genres.json');
// Check if the genres file exists
const genresFileExists = fs.existsSync(genresFilePath);


export default async function handler(req, res) {

    try {
        // Check if the genres file exists
        if (genresFileExists) {
            // If the file exists, read the genres from the file
            const genresData = fs.readFileSync(genresFilePath, 'utf8');
            const genres = JSON.parse(genresData);

            res.status(200).json({ genres });
        } else {
            const client = await clientPromise;
            const db = client.db("sample_mflix")

            const result = await db
                .collection("movies")
                .aggregate([
                    { $unwind: "$genres" },
                    { $group: { _id: null, genres: { $addToSet: "$genres" } } },
                    { $project: { _id: 0, genres: 1 } }
                ]).toArray();

            const genres = result[0].genres;

            // Save the genres in a file
            fs.writeFileSync(genresFilePath, JSON.stringify(genres));

            res.status(200).json({ genres })
        }

    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve genres' })
    }
}