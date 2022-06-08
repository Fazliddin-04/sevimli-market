import { React, useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { getDoc, doc } from 'firebase/firestore'
import { db } from '../firebase.config'
import Spinner from '../components/Spinner'

import SwiperCore, { Autoplay, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
SwiperCore.use([Autoplay, Pagination])

function SinglePost() {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(db, 'posts', params.postId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setPost(docSnap.data())
        setLoading(false)
      }
    }

    fetchPost()
  }, [navigate, params.postId])

  if (loading) {
    return <Spinner isShown={null} />
  }

  return (
    <>
      <div className="text-sm breadcrumbs px-5">
        <ul className="flex flex-wrap text-sm sm:text-md lg:text-xl">
          <li>
            <Link to="/">Bosh sahifa</Link>
          </li>
          <li>
            <Link to={`/blog`} className="capitalize">
              Blog
            </Link>
          </li>
          <li className="font-medium">{post.title}</li>
        </ul>
      </div>
      <div className="my-10">
        <h4 className="font-bold text-sm sm:text-md md:text-lg italic text-orange-400 capitalize text-center md:text-left">
          - {post.category}
        </h4>
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mt-5">
          {post.title}
        </h2>
      </div>
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="my-20 h-[600px] rounded-3xl"
        loop={true}
      >
        {post.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div className="h-full">
              <img
                src={`${url}`}
                alt="pic"
                className="h-full w-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <p className="md:text-xl">{post.text}</p>
    </>
  )
}

export default SinglePost
