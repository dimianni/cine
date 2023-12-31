import { authOptions } from 'pages/api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"
import Like from '@/models/Like';
import { initMongoose } from '@/lib/mongoose';
import User from '@/models/User';

export default async function handle(req, res) {
    await initMongoose();

    const session = await getServerSession(req, res, authOptions)
    if (!session) {
        res.status(401).json({ message: "You must be logged in." });
        return;
    }

    const movieId = req.body.id;
    const userId = session.user.id;
    const user = await User.findById(userId);

    // Like toggling functionality:
    // Checking if the movie is liked
    const existingLike = await Like.findOne({ author: userId, movie: movieId })

    // Ensure that the likedMovies array is initialized
    if (!user.likedMovies) {
        user.likedMovies = [];
    }

    // If movie is liked --> remove Like instance
    if (existingLike){
        await Like.deleteOne({ _id: existingLike._id });

        try {
            const index = user.likedMovies.indexOf(movieId);
            if (index > -1) {
                user.likedMovies.splice(index, 1);
            }
            const updatedUser = await user.save();

            res.json({ result: null, updatedUser })
        } catch (error) {
            console.error('Error updating user (delete):', error);
            res.json({error})
        }

    } 
    // If not --> create new Like instance. 
    else {
        const like = await Like.create({ author: userId, movie: movieId })

        try {
            // throw new Error("Smth")
            user.likedMovies.push(movieId);

            const updatedUser = await user.save();
            // console.log('User updated (add):', updatedUser);
            res.json({ result: like, updatedUser })

        } catch (error) {
            console.error('Error updating user (add):', error);
            res.json({ error })
        }

    }
}