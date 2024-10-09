import { initMongoose } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import Like from "@/models/Like";
import Post from "@/models/Post";

async function updateLikes(postID) {
    const post = await Post.findById(postID);
    post.likesCount = await Like.countDocuments({post:postID})
    await post.save();
    
}

export default async function handle(req,res) {
    await initMongoose();

    const session = await getServerSession(req,res,authOptions)

    const postID = req.body.id;
    const userID = session.user.id

    const existingLike = await Like.findOne({author:userID,post:postID})

    if(req.method === 'POST'){
        
        if(existingLike){

    
            await existingLike.deleteOne()
            
    
            await updateLikes(postID) 
    
            res.json('Unliked')
        }else{
            
            const like = await Like.create({author:userID,post:postID})
            
            await updateLikes(postID) 
           
            res.json({like})
        }
    }


}
