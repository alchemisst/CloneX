import React from 'react'
import Avatar from './Avatar'
import ReactTimeAgo from 'react-time-ago'
import Link from 'next/link'
import PostButtons from './PostButtons'


export default function CastContent({text,author,createdAt,_id,likesCount,likedByMe,big=false}) {
  return (
   <div>
     <div className='flex border-t border-appBorder p-2 pt-3'>
        <div>

        {author && <Avatar src={author?.image} />}
   

        </div>
        <div className='pl-2 grow'>
        <div>
        <span className='font-bold pr-1'>{author?.name}</span>
        {big && <br/>}
        <span className=' text-appLight'>@{author?.username}</span>
        {createdAt && !big &&  <span  className=' text-appLight text-xs'> <ReactTimeAgo date={createdAt} timeStyle="twitter"/></span>}
   
        </div>
       {!big && 
        (<div>
        <Link href={`${author?.name}/status/${_id}`}>
        <div className="w-full cursor-pointer">
        {text}
        </div>
        
        </Link>
        <PostButtons id={_id} likesCount={likesCount} likedByMe={likedByMe}/>
        </div>)
        }
 

        </div>

       
    </div>

    {big && 
    <div className='pl-4'>
    <div>
        {text}
    </div>
         {createdAt && 
        (<div className='text-appLight m-1 -ml-[0.5px]'>
          {
            new Date(createdAt)
            .toISOString()
            .replace('T', ' ')
            .slice(0, 16)
            .split(' ')
            .reverse()
            .join(" ")
            }
        </div>)
        }
        
        <PostButtons id={_id} likesCount={likesCount} likedByMe={likedByMe}/>

    </div>}
      
   </div>
  )
}
