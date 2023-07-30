/*
    'api/getYears.js' and 'api/getGenres.js' can be used as endpoints to retrieve values for the filter.
    However, since my db is not going to change, I will just put the json files generated into filterData folder and use them statically.
*/

import clientPromise from "@/lib/mongodb";
import fs from 'fs';
import path from 'path'

const yearsFilePath = path.resolve('./years.json')
const yearsFileExists = fs.existsSync(yearsFilePath)

export default async function handler(req, res) {

    const client = await clientPromise;
    const db = client.db("sample_mflix")

    try {

        if(yearsFileExists){

            const yearsData = fs.readFileSync(yearsFilePath, 'utf-8')
            const years = JSON.parse(yearsData)

            res.status(200).json({ years })
        } else {
            const years = await db
                .collection('movies')
                .distinct("year")

            const sortedYears = years.filter(year => !isNaN(year)).sort((a, b) => a - b);

            fs.writeFileSync(yearsFilePath, JSON.stringify(sortedYears))

            res.status(200).json({ years: sortedYears })
        }

    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve years" })
    }
}