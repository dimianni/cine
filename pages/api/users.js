import { initMongoose } from "@/lib/mongoose";
import User from "@/models/User";

export default async function handler(req, res){
    await initMongoose();

    // console.log(req.query.id);

    const id = req.query.id;
    const user = await User.findById(id)

    res.json({user})
}