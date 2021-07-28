import React, { useEffect, useState, useCallback } from 'react';
import { Main } from './views/Main';
import firebase from './firebase';
import { useAuth } from './contexts/AuthContext';
import {DataContext} from './contexts/DataProvider';
import Contact from './views/Contact';
 

export const App = () => {
  const [posts, setPosts] = useState([]);
  const db = firebase.firestore();
  const { signIn } = useAuth();
  //console.log(signIn);

  //const getPosts = () => {
    // Pulling data from Flask API
    
    //fetch('/api/blog')
    // .then(res => res.json())
    //  .then(data =>
    // {
    //   setPosts(data)
    // })

    // Pulling data from .json file
    // fetch('./posts.json')
    //   .then(res => res.json())
    //   .then(data => {
    //     this.setState({
    //       posts: data
    //     })
    //   })
  //}

const getPosts = useCallback(() => {

    let newPosts = [];

      db.collection('posts').get().then(ourPosts => {
        ourPosts.forEach(post => {
          newPosts.push({ ...post.data(), postId: post.id, })
          
          //console.log(post.id)
          //console.log(post.data())
        })
        setPosts(newPosts);
      })
  }, [db]);




  useEffect(() => {
   getPosts();
  }, [getPosts]);

  return (
    <div>
      <Main signIn={signIn} posts={posts} contact={Contact}/>
    </div>
  )

  const currentUser = useAuth(DataContext)
}