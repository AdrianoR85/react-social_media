import { getDocs, collection } from "firebase/firestore"
import { db } from "../server/firebase"
import { useEffect, useState } from "react"
import { Post } from "../components/post"

export interface Post {
  id: string,
  title: string,
  userId: string,
  username: string,
  description: string
}

export function Home() {
  const [postList, setPostList] = useState<Post[] | null>(null)
  const postsRef = collection(db, 'posts')

  const getPosts = async () => {
    const data = await  getDocs(postsRef);
    setPostList(data.docs.map(doc => ({...doc.data(), id: doc.id})) as Post[]);
  }

  useEffect(() => {
    getPosts();
  }, [])

  return(
    <div className='container'>
      {
        postList?.map((post, index) => (
          <Post post={post} key={index}/>
        ))
      }
    </div>
  )
}