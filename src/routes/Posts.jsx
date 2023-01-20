import React, {useEffect, useState} from 'react';
import './Posts.styles.scss';
import { onSnapshot, query, collection, getDocs, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import {db} from "../main.jsx";
import {useAuth} from "../providers/AuthProvider.jsx";

export const Posts = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      const postsQuery = query(collection(db, 'posts'))
      const unsub = onSnapshot(postsQuery, postsSnapshot => {
        const postsData = postsSnapshot.docs.map(item => {
          return {
            id: item.id,
            ...item.data(),
          }
        });
        setPosts(postsData);
      })

      return () => unsub();
    })();
  }, []);

  const handleAddLike = async (id) => {
    const postRef = doc(db, 'posts', id);
    await updateDoc(postRef, {
      likes: arrayUnion(user.uid),
    })
  }

  const handleRemoveLike = async (id) => {
    const postRef = doc(db, 'posts', id);
    await updateDoc(postRef, {
      likes: arrayRemove(user.uid),
    })
  }

  return (
    <div className="posts">
        {posts.map(item => (
          <div className="post" key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.content}</p>
            {item.likes.length && item.likes.includes(user.uid) ?
              <button className="posts__button" onClick={() => handleRemoveLike(item.id)}>{item.likes.length} 🖤 Unlike</button>
              :
              <button className="posts__button" onClick={() => handleAddLike(item.id)}>{item.likes.length} ❤️ Like</button>
            }
          </div>
        ))}
    </div>
  )
};
