import mongoose, {model, models, Schema} from "mongoose";

const LikeSchema = new Schema({
    author: {type:mongoose.Types.ObjectId, ref: 'User'},
    movie: {type:mongoose.Types.ObjectId, ref: 'Movie'}
}, {
    timestamps: true
})

const Like = models?.Like || model("Like", LikeSchema);

export default Like;