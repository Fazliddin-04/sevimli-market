import React, { useState, useEffect } from 'react'
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
} from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'

function Blog() {
  const [posts, setPosts] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastFetchedPost, setLastFetchedPost] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      try {
        // Get referense
        const postsRef = collection(db, 'posts')

        // create a query
        const q = query(postsRef, orderBy('timestamp', 'desc'), limit(20))

        // Execute query
        const querySnap = await getDocs(q)

        const lastVisible = querySnap.docs[querySnap.docs.length - 1]
        setLastFetchedPost(lastVisible)

        const posts = []

        querySnap.forEach((doc) => {
          return posts.push({
            id: doc.id,
            data: doc.data(),
          })
        })

        setPosts(posts)
        setLoading(false)
      } catch (error) {
        toast.error("Postlarni olib kelib bo'lmadi")
      }
    }
    fetchPosts()
  }, [])
  // eslint-disable-next-line no-unused-vars
  const onFetchMorePosts = async () => {
    try {
      // Get referense
      const postsRef = collection(db, 'posts')

      // create a query
      const q = query(
        postsRef,
        orderBy('timestamp', 'desc'),
        startAfter(lastFetchedPost),
        limit(20)
      )

      // Execute query
      const querySnap = await getDocs(q)

      const lastVisible = querySnap.docs[querySnap.docs.length - 1]
      setLastFetchedPost(lastVisible)

      const posts = []

      querySnap.forEach((doc) => {
        return posts.push({
          id: doc.id,
          data: doc.data(),
        })
      })

      setPosts((prevState) => [...prevState, ...posts])
      setLoading(false)
    } catch (error) {
      toast.error("Postlarni olib kelib bo'lmadi")
    }
  }
  return <div>Blog</div>
}

export default Blog
