import { Post as IPost } from '../pages/home'
import { auth, db } from '../server/firebase'
import { addDoc, getDocs, collection, query, where, deleteDoc, doc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect, useState } from 'react'

import '../style/post.css'

interface Props {
  post: IPost
}

interface Like {
  userId: string,
  likeId: string
}

export function Post(props: Props) {
  const { post } = props;
  const [user] = useAuthState(auth);
  
  const [likes, setLikes] = useState<Like[] | null>(null)

  const likesRef = collection(db, 'likes');

  const likesDoc = query(likesRef, where('postId', '==', post.id));

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(data.docs.map(doc => ({userId: doc.data().userId, likeId: doc.id,})));
  }
  
  const addLike = async () => {
    try{
      const newDoc = await addDoc(likesRef, { userId: user?.uid, postId: post.id });
      if(user) {
        setLikes((prev) => 
        prev ? [...prev, { userId: user.uid, likeId: newDoc.id}] : [{userId: user.uid, likeId: newDoc.id}]
        )
      }
    } catch (err) {
      console.log(err)
    }
  }

  const removeLike = async () => {
    try{

      const likeToDeleteQuery = query(likesRef, 
        where('postId', '==', post.id), 
        where('userId', '==', user?.uid));

      const likeToDeleteData = await getDocs(likeToDeleteQuery);
      const likeId = likeToDeleteData.docs[0].id;
      const likeToDelete = doc(db, 'likes', likeId)
      await deleteDoc(likeToDelete);
      if(user) {
        setLikes((prev) => prev && prev.filter(like => like.likeId !== likeId))
      }
    } catch (err) {
      console.log(err)
    }
  }

  const hasUserLiked = likes?.find((like) => like.userId === user?.uid)
  console.log(hasUserLiked)
  useEffect(() => {
    getLikes();
  }, [])

  return(
    <article className='post-container'>
      <h1>{post.title}</h1>
      <p>{post.description}</p>
      <div className='post-name'>
        <div>
          <button onClick={hasUserLiked ? removeLike : addLike}> {
            hasUserLiked ? <>&#128078;</> : <>&#128077;</>}
          </button>
          <small>Likes: {likes?.length}</small>
        </div>
        <small>@{post.username}</small>
      </div>
    </article>
  )
}