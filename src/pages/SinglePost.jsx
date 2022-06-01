import { React, useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { getDoc, doc } from 'firebase/firestore'
import { db } from '../firebase.config'
import Spinner from '../components/Spinner'

import SwiperCore, { Navigation, Pagination, Zoom } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
SwiperCore.use([Zoom, Navigation, Pagination])

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

  const months = [
    'Yanvar',
    'Fevral',
    'Mart',
    'Aprel',
    'May',
    'Iyun',
    'Iyul',
    'Avgust',
    'Sentabr',
    'Oktabr',
    'Noyabr',
    'Dekabr',
  ]

  let year
  let month
  let day

  if (!loading) {
    let date = new Date(post.timestamp.seconds * 1000)
    year = date.getFullYear()
    month = date.getMonth()
    day = date.getDate()
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <div className="text-sm breadcrumbs px-5">
        <ul className="flex flex-wrap">
          <li>
            <Link to="/">Bosh sahifa</Link>
          </li>
          <li>
            <Link to={`/blog`} className="capitalize">
              Blog
            </Link>
          </li>
          <li>{post.title}</li>
        </ul>
      </div>
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold ">
        {post.title}
      </h2>
      <div className="divider"></div>
      <p className="md:text-xl">{post.text}</p>
      <Swiper
        slidesPerView={1}
        navigation={true}
        pagination={{ clickable: true }}
        className="w-max lg:w-1/2"
        loop={true}
        style={{
          '--swiper-navigation-color':
            'hsla(var(--p) / var(--tw-bg-opacity, 1))',
          '--swiper-pagination-color': '#fff',
        }}
      >
        {post.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div className="swiper-zoom-container h-full w-full relative">
              <img src={`${url}`} alt="pic" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default SinglePost
