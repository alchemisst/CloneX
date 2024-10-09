
import React from 'react'
import { getProviders, signIn, useSession } from "next-auth/react"
import { useRouter } from 'next/router';

export default function Login({providers}) {
  const {data,status}= useSession();
 
  const router = useRouter();

  if(status == 'loading'){return ''}

  if(data){
    router.push('/')
  }

  return (
    <div className='flex items-center justify-center h-screen bg-appBG'>
      {Object.values(providers).map((provider)=>( 
        <div>
          <button onClick={async ()=>{await signIn(provider.id)}} className='bg-appBtn px-3 py-2 rounded-full font-semibold text-white flex items-center'>
            <img src="googleWhite.svg" alt="" className='h-6 mr-2'/>  
            Sign in with {provider.name}
          </button>
            

            
        </div>
      ))}

    </div>
  )
}

export async function getServerSideProps(){
  const providers = await getProviders();
  return {
    props:{providers}
  }
}
