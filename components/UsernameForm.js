import useUserInfo from '@/hooks/useUserInfo';
import { useRouter } from 'next/router';

import React, { useEffect, useState } from 'react'

export default function UsernameForm() {

  const router = useRouter();

  const {userInfo,userInfoStatus}= useUserInfo();


  const [username,setUsername] = useState('')

  useEffect(()=>{
    if(userInfoStatus === 'loading'){
      return ;
    }

    if(username === ''){
      const defaultUsername = userInfo?.email?.split('@')[0];
      setUsername(defaultUsername.replace(/[^a-z]+/gi,''));
    }


  },[userInfoStatus])
  
  async function handleFormSubmit(e){
    e.preventDefault();


    await fetch('/api/users',{
      method:'PUT',
      headers: {
        'Content-Type': 'application/json', // Specify the content type as JSON
      },
      body:JSON.stringify({username})
    })
    
    router.reload();
    
  
  }

  if(userInfoStatus === 'loading'){
    return '';
  }

  return (
  <div className='flex h-screen items-center justify-center'>
      <form className='text-center' onSubmit={handleFormSubmit}>
      <h1 className='font-extrabold mb-2 '>Pick a username</h1>
        <input type='text' className='mb-2 bg-appBG border-2 border-appBtn px-2 py-1 rounded-full' placeholder={'username'} value={username} onChange={e => {setUsername(e.target.value)}}></input>
        <button className=' rounded-full py-1 block bg-appBtn w-full'  >Continue</button>
    </form>
  </div>
  
  )
}
