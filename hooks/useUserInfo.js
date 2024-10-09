import { useSession } from "next-auth/react";
import { useState,useEffect } from "react";

export default function useUserInfo() {
    
    const {data:session,status} = useSession();

    const [userInfo,setUserInfo] = useState(null);
    const [userInfoStatus,setUserInfoStatus] = useState(null);
  
  
    async function getUserInfo() {
      if(status === 'loading'){
        return;
      }
      
      if(!session){
        console.log(`Session ${session}`)
        setUserInfo(null);
        return;
      }
      if(!session?.user?.id){
        console.log('entered info page')
        
        setUserInfo('loading')
        return;
      }

      fetch('/api/users?id='+session.user.id)
      .then(res => res.json().then(json => {
        setUserInfo(json.user)
        setUserInfoStatus('authenticated')
      }))
     
  
    }
  
    useEffect(()=>{
      getUserInfo();
    },[status])
  
  return {userInfo,setUserInfo,userInfoStatus}
}
