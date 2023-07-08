const { initMongoose } = require("@/lib/mongoose");
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"
import Like from '@/models/Like';

export default async function handle(req, res) {
    await initMongoose();

    const session = await getServerSession(req, res, authOptions)

    console.log(session);

    if (!session) {
        res.status(401).json({ message: "You must be logged in." });
        return;
    }

    const movieId = req.body.id;
    const userId = session.user.id;

    // Like toggling functionality:
    // Checking if the movie is liked
    const existingLike = await Like.findOne({ author: userId, movie: movieId })

    // If movie is liked --> remove Like instance
    if (existingLike){
        await existingLike.remove()
        res.json(null)
    } 
    // If not --> create new Like instance. 
    else {
        const like = await Like.create({ author: userId, movie: movieId })
        res.json(like)
    }

}