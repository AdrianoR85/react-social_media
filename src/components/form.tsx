import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../server/firebase";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import '../style/createForm.css'
import { useState } from "react";

interface CreateFromData {
  title: string,
  description: string
}


export function CreateForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    title: yup.string().required("You must add a title"),
    description: yup.string().required("You must add a description")
  })

  const { register, handleSubmit, formState: {errors} } = useForm<CreateFromData>({
    resolver: yupResolver(schema)
  })

  const postsRef = collection(db, 'posts')

  const onCreatePost = async (data: CreateFromData) => {
    await addDoc(postsRef, {
      ...data,
      username: user?.displayName,
      userId: user?.uid
    });
    navigate('/')

    setTitle('')
    setDescription('')
  }

  return(
    <form onSubmit={handleSubmit(onCreatePost)}>
      <input type="text" placeholder="Title" {...register('title')} onChange={e => setTitle(e.target.value)} value={title}/>
      <span className="error-message">{errors.title?.message}</span>
      <textarea placeholder="Description" {...register('description')} onChange={e => setDescription(e.target.value)} value={description}/>
      <span className="error-message">{errors.description?.message}</span>
      <button>Submit</button>
    </form>
  )
}