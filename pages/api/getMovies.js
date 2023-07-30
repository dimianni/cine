import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {

    let movieArr = req.body.arr;
    const objectIds = movieArr.map((id) => new ObjectId(id));

    try {
        const client = await clientPromise;
        const db = client.db("sample_mflix")

        const movies = await db
            .collection("movies")
            .find({ _id: { $in: objectIds } })
            .toArray()

        res.status(200).json({ movies })
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve movies' })
    }
}