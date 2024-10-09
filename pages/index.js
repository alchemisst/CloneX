import Image from "next/image";
import { Inter } from "next/font/google";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import UsernameForm from "@/components/UsernameForm";
import useUserInfo from "@/hooks/useUserInfo";
import PostForm from "@/components/PostForm";
import axios from "axios";
import CastContent from "@/components/CastContent";
import { useRouter } from "next/router";

// DATE Module
import TimeAgo from "javascript-time-ago";
import en from 'javascript-time-ago/locale/en'
import Layout from "@/components/Layout";

TimeAgo.addDefaultLocale(en);

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  const { userInfo, setUserInfo, userInfoStatus } = useUserInfo();
  const [allPosts, setAllPosts] = useState([]);
  const [idsLikedByMe, setIdsLikedByMe] = useState([]);


  useEffect(() => {
    console.log("fetching posts")
    fetchHomePosts();
  }, [userInfo]);
 

  async function fetchHomePosts() {
    try {
      const res = await axios.get('/api/post');
      setAllPosts(res.data.post);
      setIdsLikedByMe(res.data.idsLikedByMe);
    } catch (error) {
      console.error("Failed to fetch posts", error);
    }
  }

  async function logout() {
    setUserInfo(null);
    await signOut();
  }

  if (sessionStatus === 'loading' || userInfoStatus === 'loading') {
    return 'Loading Info';
  }

  if (userInfo && !userInfo.username) {
    console.log(userInfo)
    return <UsernameForm />;
  }
   
  if(!userInfo && !session){

    router.push('/Login');
    return "No USER Info"
  }

  return (
    <Layout>
      <h1 className="text-3xl font-semibold p-4">Home</h1>
      <PostForm onPost={fetchHomePosts} />
      <div className="mt-2">
        {allPosts.length > 0 && allPosts.map((e) => (
          <CastContent key={e._id} {...e} likedByMe={idsLikedByMe.includes(e._id)} />
        ))}
      </div>
      <div className="p-5 text-center border-t border-appBorder">
        <button className="px-5 py-2 bg-appBtn text-white border-2 border-appBorder rounded-full" onClick={logout}>
          Logout
        </button>
      </div>
    </Layout>
  );
}
