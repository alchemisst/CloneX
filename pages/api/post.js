import { initMongoose } from '@/lib/mongoose'
import Post from '@/models/Post';
import { getServerSession } from 'next-auth';
import React from 'react'
import { authOptions } from './auth/[...nextauth]';
import Like from '@/models/Like';


export default async function handler(req,res) {
  await initMongoose();
  const session = await getServerSession(req,res,authOptions)
 
  if(req.method === 'POST'){
    const {text,parent} = req.body;

    const post =await Post.create({
        author:session.user.id,
        text,
        parent
    })
    res.json(post)
  }

  if(req.method === 'GET'){
    const { id } = req.query;
    if(id){
    const post = await  Post.findById(id).populate('author');
    const idsLikedByMe =[];

    res.json(post)
      
    }else{
    const post = await Post.find({parent:null})
    .populate('author')
    .sort({createdAt:-1})
    .limit(20)
    .exec()

    const postsLikedByMe = await Like.find({
      author:session.user.id,
      post:post.map( p => p._id )
    })

    const idsLikedByMe = postsLikedByMe.map(like => like.post);

    res.json({post,idsLikedByMe});

    }

  }
  

}
