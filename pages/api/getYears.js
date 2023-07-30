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
            // .aggregate([
            //     { $group: { _id: null, year: { $addToSet: "$year" } } },
            //     { $project: { _id: 0, year: 1 } }
            // ]).toArray();
            // const years = result[0].year

            const sortedYears = years.filter(year => !isNaN(year)).sort((a, b) => a - b);

            fs.writeFileSync(yearsFilePath, JSON.stringify(sortedYears))

            res.status(200).json({ years: sortedYears })
        }

    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve years" })
    }
}