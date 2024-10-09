import CastContent from '@/components/CastContent';
import Layout from '@/components/Layout';
import PostForm from '@/components/PostForm';
import useUserInfo from '@/hooks/useUserInfo';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export default function PostPage() {
    const router = useRouter();
    const {id} = router.query;
    const [post,setPost] = useState({});
    const[replies,setReplies] =useState([])
    const[repliesLikedByMe,setRepliesLikedByMe] = useState([])
    const {userInfo} = useUserInfo();



    useEffect(()=>{
        axios.get('/api/post?id='+id).then(res => setPost(res.data));
        axios.get('/api/post?parent='+id).then(res=>
          (
          setReplies(res.data.post),
          setRepliesLikedByMe(res.data.idsLikedByMe)
          )
      )
    },[id])

  return (
    <Layout>
    {post &&   
    <div className=''>
    <div className='flex' > 
    <Link className=' z-20 flex' href={'/'}> <div className='pt-1 pl-2 flex'><img src='/backArrow.svg' className='pr-2'/>Tweet</div> </Link>
    </div>
      <div className='pt-2'>
    {post && <CastContent {...post} likedByMe={ true ? true : false/*idsLikedByMe.includes(post._id)*/}/>}
    </div>
    {!!userInfo && (
    <div className='border-t border-appBorder py-3' >
    <PostForm onPost={()=>{}} compact parent={id} placeholder='What you thinking?'/>
    </div>
    )
  
    }
    <div className="replies">
      {replies.length > 0 && replies.map( reply => 
      <div className='border-t  border-appBG'>
        <CastContent {...reply}/>
      </div>
        )
        }
    </div>
    </div>
    }
    </Layout>
  )
}
