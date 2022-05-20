import React, { useState, useEffect } from 'react'
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import {
  FaChartLine,
  FaCoffee,
  FaBreadSlice,
  FaConciergeBell,
  FaBirthdayCake,
  FaHandsWash,
  FaHome,
  FaBlender,
  FaGift,
  FaHeadphonesAlt,
  FaPencilRuler,
  FaVolleyballBall,
  FaRocket,
  FaCube,
  FaRegUser,
  FaRegStar,
} from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import { EffectFade, Autoplay, Pagination } from 'swiper'
// import Card from '../components/Card'
import ListMotion from '../components/ListMotion'
import Spinner from '../components/Spinner'
import FeatureCard from '../components/FeatureCard'
const imgList = [
  'https://images.unsplash.com/photo-1652208785003-4100305584a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80',
  'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1590005354167-6da97870c757?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=581&q=80',
  'https://images.unsplash.com/photo-1579113800032-c38bd7635818?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
  'https://images.unsplash.com/photo-1477505982272-ead89926a577?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
  'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1602351447937-745cb720612f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=386&q=80',
  'https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8c3dlZXRzfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1567566024538-81fd7635925f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80',
  'https://images.unsplash.com/photo-1587304947143-7389c4706d43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80',
  'https://images.unsplash.com/photo-1615976909545-a2d402c7dac3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
  'https://images.unsplash.com/photo-1504977402025-84285fea814b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTV8fHByb2R1Y3RzJTIwZm9yJTIwaG9tZXxlbnwwfDF8MHx8&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1558544474-bf682e6669ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLWxpa2VkfDN8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1588279102221-fcb92a9264fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLWxpa2VkfDh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1549501602-52168bb8f653?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80',
  'https://images.unsplash.com/photo-1572635196184-84e35138cf62?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
  // 'https://images.unsplash.com/photo-1575808142341-e39853744dbd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODV8fGZydWl0cyUyMGFuZCUyMHZlZ2V0YWJsZXN8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  // 'https://images.unsplash.com/photo-1551117145-84a5ac4fbe3b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLWxpa2VkfDJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  // 'https://images.unsplash.com/photo-1601648764658-cf37e8c89b70?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
  // 'https://images.unsplash.com/photo-1584589167171-541ce45f1eea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLWxpa2VkfDF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  // 'https://images.unsplash.com/photo-1531384370597-8590413be50a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLWxpa2VkfDl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  // 'https://images.unsplash.com/photo-1533910534207-90f31029a78e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLWxpa2VkfDExfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
  // 'https://images.unsplash.com/photo-1515281239448-2abe329fe5e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1193&q=80',
]

function Home() {
  const { t } = useTranslation()

  // eslint-disable-next-line no-unused-vars
  const [tabs, setTabs] = useState([
    { icon: <FaChartLine size={32} />, label: 'top' },
    { icon: <FaCoffee size={32} />, label: 'chai-coffee' },
    { icon: <FaBreadSlice size={32} />, label: 'for-breakfast' },
    { icon: <FaConciergeBell size={32} />, label: 'for-lunch' },
    { icon: <FaBirthdayCake size={32} />, label: 'for-table' },
    { icon: <FaHandsWash size={32} />, label: 'personal-hygiene' },
    { icon: <FaHome size={32} />, label: 'for-home' },
    { icon: <FaBlender size={32} />, label: 'for-kitchen' },
    { icon: <FaGift size={32} />, label: 'gift' },
    { icon: <FaHeadphonesAlt size={32} />, label: 'home-appliances' },
    { icon: <FaPencilRuler size={32} />, label: 'stationery' },
    { icon: <FaRocket size={32} />, label: 'toys' },
    { icon: <FaVolleyballBall size={32} />, label: 'sport' },
  ])
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedTab, setSelectedTab] = useState(tabs[0])
  const [lastFetchedListing, setLastFetchedListing] = useState(null)
  // eslint-disable-next-line no-unused-vars
  const [selectedId, setSelectedId] = useState(null)

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Get referense
        const listingsRef = collection(db, 'listings')

        // create a query
        const q = query(
          listingsRef,
          where('type', '==', selectedTab.label),
          orderBy('timestamp', 'desc'),
          limit(10)
        )

        // Execute query
        const querySnap = await getDocs(q)

        const lastVisible = querySnap.docs[querySnap.docs.length - 1]
        setLastFetchedListing(lastVisible)

        const listings = []

        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          })
        })

        setListings(listings)
        setLoading(false)
      } catch (error) {
        toast.error("Ro'yxatlarni olib kelib bo'lmadi")
      }
    }
    console.log(selectedTab)
    fetchListings()
  }, [selectedTab])

  // Pagination / Load More

  // eslint-disable-next-line no-unused-vars
  const onFetchMoreListings = async () => {
    try {
      // Get referense
      const listingsRef = collection(db, 'listings')

      // create a query
      const q = query(
        listingsRef,
        orderBy('timestamp', 'desc'),
        startAfter(lastFetchedListing),
        limit(10)
      )

      // Execute query
      const querySnap = await getDocs(q)

      const lastVisible = querySnap.docs[querySnap.docs.length - 1]
      setLastFetchedListing(lastVisible)

      const listings = []

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        })
      })

      setListings((prevState) => [...prevState, ...listings])
      setLoading(false)
    } catch (error) {
      toast.error("Ro'yhatlarni olib kelib bo'lmadi")
    }
  }

  return (
    <>
      <Spinner isShown={loading} />
      <div>
        <section
          className="bg-slate-200/50 rounded-3xl flex items-center flex-wrap sm:flex-nowrap md:overflow-hidden relative intro mt-96 sm:mt-80 md:mt-0"
          // className="backdrop-blur-sm bg-white/30 rounded-3xl flex overflow-hidden intro text-white"
          // className="pt-0 pl-14 text-dark "
        >
          <div
            className="flex-initial sm:px-10 xl:px-0 xl:pl-14 md:w-full  absolute md:static left-0 -top-96 sm:-top-80"
            //  className="pt-24 pl-14 w-1/2"
          >
            <h4 className="font-bold text-lg italic text-orange-400 capitalize">
              - {t('popular_products')}
            </h4>
            <h1 className="title mt-5 mb-12 w-full xl:w-4/5">
              {t('intro_title')}
            </h1>
            <a
              href="#catalog"
              className="lg:text-xl bg-red-700 text-white w-full p-4 sm:p-5 uppercase font-bold text-center rounded-3xl"
            >
              {t('go_to_catalog')}
            </a>
          </div>

          <Swiper
            spaceBetween={30}
            effect={'fade'}
            modules={[EffectFade, Autoplay]}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className="mySwiper flex-initial h-full w-full overflow-hidden rounded-3xl md:overflow md:rounded-none"
          >
            {imgList.map((url) => (
              <SwiperSlide
                key={imgList.indexOf(url)}
                className="w-full bg-slate-200/50"
                style={{ backgroundImage: `url(${url})` }}
              ></SwiperSlide>
            ))}
          </Swiper>
        </section>
        <section id="catalog" className="pt-36 pb-20">
          <h4 className="font-bold text-lg italic text-orange-400 capitalize">
            - {t('categories')}
          </h4>
          <h2 className="title mt-5 mb-16 w-full lg:w-4/5 xl:w-full">
            {t('browse_by_category')}
          </h2>
          <Swiper
            slidesPerView={2}
            spaceBetween={10}
            modules={[Autoplay]}
            autoplay={{ delay: 2000, disableOnInteraction: true }}
            className="mySwiper h-40"
            breakpoints={{
              640: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 4,
              },
              1024: {
                slidesPerView: 5,
              },
              1200: {
                slidesPerView: 6,
              },
              1370: {
                slidesPerView: 8,
              },
            }}
          >
            {tabs.map((item) => (
              <SwiperSlide
                key={item.label}
                className={`h-32 px-2`}
                onClick={() => setSelectedTab(item)}
              >
                <motion.div
                  whileHover={{ scale: 1.1, translateY: 10 }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  className={`${
                    item === selectedTab
                      ? 'bg-slate-300 dark:bg-slate-900 text-red-500'
                      : 'bg-slate-100 dark:bg-slate-700'
                  }  dark:hover:bg-slate-900 hover:text-red-500 h-full w-full rounded-3xl text-center flex items-center flex-col justify-center gap-2`}
                >
                  {item.icon}
                  <div>{t(item.label)}</div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
          <main className="relative">
            <AnimatePresence exitBeforeEnter>
              {!loading &&
                // listings.map(({ id, data }) => (
                //   <motion.div
                //     key={selectedTab ? selectedTab.label : 'empty'}
                //     animate={{ opacity: 1, y: 0 }}
                //     initial={{ opacity: 0, y: 20 }}
                //     exit={{ opacity: 0, y: -20 }}
                //     transition={{ duration: 0.15 }}
                //     className="flex flex-wrap"
                //   >
                //     <motion.div
                //       layoutId={id}
                //       onClick={() => setSelectedId(1)}
                //       className="w-full sm:w-[calc(50%-48px)] lg:w-[calc(33%-56px)] xl:w-[calc(25%-48px)] sm:mx-6 lg:mx-7 mb-14 sm:mb-0 sm:mt-16 xl:mx-6"
                //     >
                //       <Card
                //         badgeColor="lime"
                //         off={'$30'}
                //         price={'$20'}
                //         title={data.name}
                //         category={data.type}
                //         imgUrl={data.imgUrl}
                //       />
                //     </motion.div>
                //   </motion.div>
                // ))
                (listings ? (
                  <ListMotion
                    key={selectedTab ? selectedTab.label : 'empty'}
                    items={listings}
                  />
                ) : (
                  <></>
                ))}
            </AnimatePresence>
          </main>
        </section>
        <section id="whyUs" className="text-center py-10 mb-20">
          <h4 className="font-bold text-lg italic text-orange-400 capitalize">
            - {t('why_us')}
          </h4>
          <h2 className="title mt-5 mb-12 sm:mb-16">{t('whyUs_title')}</h2>
          <div className="flex justify-center flex-wrap gap-[100px]">
            <FeatureCard
              icon={<FaCube />}
              title={t('easy_returns')}
              text={t('easy_returns-text')}
            />
            <FeatureCard
              icon={<FaRegUser />}
              title={t('customer_service')}
              text={t('customer_service-text')}
            />
            <FeatureCard
              icon={<FaRegStar />}
              title={t('high_quality')}
              text={t('high_quality-text')}
            />
          </div>
        </section>
        <section
          id="testimonials"
          className="bg-slate-200 dark:bg-slate-700/50 p-4 rounded-3xl flex flex-wrap sm:flex-nowrap md:overflow-hidden relative intro mt-80 sm:mt-80 md:mt-0"
        >
          <div className="lg:w-2/5 md:pt-24 sm:px-10 xl:px-0 xl:pl-14 absolute md:static left-0 -top-60">
            <h4 className="font-bold text-lg italic text-orange-400 capitalize">
              - {t('reviews')}
            </h4>
            <h1 className="title mt-5 mb-12 sm:mb-16 w-full lg:w-4/5 xl:w-full">
              {t('testimonial_title')}
            </h1>
          </div>

          <Swiper
            spaceBetween={30}
            modules={[Autoplay, Pagination]}
            pagination={{ clickable: true }}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className="mySwiper lg:w-2/5"
          >
            <SwiperSlide className="flex justify-center flex-col text-center md:text-left">
              <div className="h-72">
                <img
                  src={
                    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170'
                  }
                  alt=""
                  className="rounded-full w-20 h-20 object-cover mb-4 mx-auto md:mx-0"
                />
                <h3 className="text-2xl font-semibold mb-4">Johanna Doe</h3>
                <p className="text-xl leading-relaxed mb-4">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Quidem atque a voluptatem eaque culpa cumque facere possimus
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide className="flex justify-center flex-col text-center md:text-left">
              <div className="h-72">
                <img
                  src={
                    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170'
                  }
                  alt=""
                  className="rounded-full w-20 h-20 object-cover mx-auto md:mx-0 mb-4"
                />
                <h3 className="text-2xl font-semibold mb-4">Johanna Doe</h3>
                <p className="text-xl leading-relaxed mb-4">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Quidem atque a voluptatem eaque culpa cumque facere possimus
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide className="flex justify-center flex-col text-center md:text-left">
              <div className="h-72">
                <img
                  src={
                    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170'
                  }
                  alt=""
                  className="rounded-full w-20 h-20 object-cover mx-auto md:mx-0 mb-4"
                />
                <h3 className="text-2xl font-semibold mb-4">Johanna Doe</h3>
                <p className="text-xl leading-relaxed mb-4">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Quidem atque a voluptatem eaque culpa cumque facere possimus
                </p>
              </div>
            </SwiperSlide>
          </Swiper>
        </section>
      </div>
    </>
  )
}

export default Home
