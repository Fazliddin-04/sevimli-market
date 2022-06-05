import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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
import { AnimatePresence } from 'framer-motion'
import ListMotion from '../components/ListMotion'
import Spinner from '../components/Spinner'
import { useTranslation } from 'react-i18next'

function Blog() {
  const [posts, setPosts] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastFetchedPost, setLastFetchedPost] = useState(null)

  const { t } = useTranslation()

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

  if (loading) {
    return <Spinner isShown={null} />
  }

  return (
    <div id="blog">
      <div className="text-sm breadcrumbs px-5">
        <ul className="flex flex-wrap text-xl">
          <li>
            <Link to="/">Bosh sahifa</Link>
          </li>
          <li className="font-medium">Blog</li>
        </ul>
      </div>
      <div className="my-10">
        <h4 className="font-bold text-sm sm:text-md md:text-lg italic text-orange-400 capitalize text-center md:text-left">
          - {t('our_blog')}
        </h4>
        <h2 className="title mt-5 mb-16 w-full lg:w-4/5 xl:w-full text-center md:text-left">
          {t('check_out_our_blog')}
        </h2>
      </div>
      <AnimatePresence exitBeforeEnter>
        {!loading &&
          (posts ? (
            <ListMotion items={posts} blog={true} />
          ) : (
            <p>No listings</p>
          ))}
      </AnimatePresence>
    </div>
  )
}

export default Blog
