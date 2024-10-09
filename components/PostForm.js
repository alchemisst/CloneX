import useUserInfo from '@/hooks/useUserInfo';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import Avatar from './Avatar';

export default function PostForm({onPost,compact,parent,placeholder="What's Happening!!!"}) {
    const {userInfo,userInfoStatus}= useUserInfo();

    const [text,setText] = useState();
    const router = useRouter();

    if(userInfoStatus === 'loading'){
        return 'Loading Info';
    }
    async function handleSubmit(e) {
        e.preventDefault();
        
        await axios.post('/api/post',{text,parent});


        setText('')

        if(onPost){
          onPost();
        }
   
        
    }

  return (
    <form action="" onSubmit={handleSubmit}>
     <div className={"flex mx-1" +(compact ? 'flex place-items-center pl-2 ': '')}>

   {/* Avatar */}
   <div className="">
   < Avatar src={userInfo?.image}/>
  </div>

    {/*Input Area*/}
    <div className="grow px-2">
      <textarea className={'w-full mt-1 bg-transparent text-appBorder p-1' + (compact ? 'h-12':'h-24')} placeholder={placeholder} value={text} onChange={e => setText(e.target.value)}>
      </textarea>
      {!compact && 
      (<div className="text-right border-t border-appBorder pt-1">
      <button className="bg-appBtn p-2 rounded-full w-20 text-white" >Post</button>
      </div>)
      }
      
    </div>
    {compact &&
    <div >
      <button className="bg-appBtn p-2 mx-2 my-2  rounded-full w-20 text-white" >Post</button>
    </div>
    }
   </div>

   </form>
  )
}
