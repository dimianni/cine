import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    name: String, 
    email: String,
    image: String,
    likedMovies: [{ type: mongoose.Types.ObjectId, ref: 'Movie', default: [] }]
})

// Checking if there is already a "User" model. If not --> create one.
const User = models?.User || model("User", UserSchema);

export default User;