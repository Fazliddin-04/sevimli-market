import React, { useEffect, useState } from 'react'
import { FaChartLine } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-fade'
import { EffectFade, Autoplay } from 'swiper'
import Card from '../components/Card'
const imgList = [
  'https://images.unsplash.com/photo-1575808142341-e39853744dbd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODV8fGZydWl0cyUyMGFuZCUyMHZlZ2V0YWJsZXN8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1590005354167-6da97870c757?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=581&q=80',
  'https://images.unsplash.com/photo-1579113800032-c38bd7635818?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
  'https://images.unsplash.com/photo-1477505982272-ead89926a577?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
  'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1602351447937-745cb720612f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=386&q=80',
  'https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8c3dlZXRzfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1567566024538-81fd7635925f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80',
  'https://images.unsplash.com/photo-1587304947143-7389c4706d43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80',
  'https://images.unsplash.com/photo-1594846753184-b2a52f370b87?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80',
  'https://images.unsplash.com/photo-1504977402025-84285fea814b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTV8fHByb2R1Y3RzJTIwZm9yJTIwaG9tZXxlbnwwfDF8MHx8&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1558544474-bf682e6669ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLWxpa2VkfDN8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1588279102221-fcb92a9264fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLWxpa2VkfDh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1549501602-52168bb8f653?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80',
  'https://images.unsplash.com/photo-1572635196184-84e35138cf62?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
  // 'https://images.unsplash.com/photo-1551117145-84a5ac4fbe3b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLWxpa2VkfDJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  // 'https://images.unsplash.com/photo-1601648764658-cf37e8c89b70?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
  // 'https://images.unsplash.com/photo-1584589167171-541ce45f1eea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLWxpa2VkfDF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  // 'https://images.unsplash.com/photo-1531384370597-8590413be50a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLWxpa2VkfDl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  // 'https://images.unsplash.com/photo-1533910534207-90f31029a78e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLWxpa2VkfDExfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
  // 'https://images.unsplash.com/photo-1515281239448-2abe329fe5e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1193&q=80',
]

function Home() {
  // eslint-disable-next-line no-unused-vars
  const [tabs, setTabs] = useState([
    { icon: <FaChartLine size={24} />, label: 'Top mahsulotlar' },
    { icon: <FaChartLine size={24} />, label: 'Lettuce' },
    { icon: <FaChartLine size={24} />, label: 'Cheese' },
    { icon: <FaChartLine size={24} />, label: 'Carrot' },
    { icon: <FaChartLine size={24} />, label: 'Banana' },
    { icon: <FaChartLine size={24} />, label: 'Blueberries' },
    { icon: <FaChartLine size={24} />, label: 'Champers' },
    { icon: <FaChartLine size={24} />, label: 'Parfumeria' },
    { icon: <FaChartLine size={24} />, label: 'Toys' },
    { icon: <FaChartLine size={24} />, label: 'Books' },
  ])
  const [selectedTab, setSelectedTab] = useState(tabs[0])

  // eslint-disable-next-line no-unused-vars
  const [selectedId, setSelectedId] = useState(null)

  const { t } = useTranslation()
  useEffect(() => {
    // eslint-disable-next-line no-undef
    var gradient = new Gradient()
    gradient.initGradient('#canvas')
  }, [])
  return (
    <>
      <div>
        {/* <div className="background--custom">
          <canvas id="canvas"></canvas>
        </div> */}
        <section
          className="bg-slate-200/50 rounded-3xl flex flex-wrap sm:flex-nowrap md:overflow-hidden relative intro mt-80 sm:mt-80 md:mt-0"
          // className="backdrop-blur-sm bg-white/30 rounded-3xl flex overflow-hidden intro text-white"
          // className="pt-0 pl-14 text-dark "
        >
          <div
            className="flex-initial md:pt-24 sm:px-10 xl:px-0 xl:pl-14 md:w-full absolute md:static left-0 -top-80 sm:-top-80"
            //  className="pt-24 pl-14 w-1/2"
          >
            <h4 className="font-bold text-lg italic text-orange-400 capitalize">
              - {t('popular_products')}
            </h4>
            <h1 className="text-3xl lg:text-4xl 2xl:text-5xl leading-snug lg:leading-snug 2xl:leading-tight mt-5 font-bold mb-12 sm:mb-16 w-full lg:w-4/5 xl:w-full">
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
            className="mySwiper flex-initial w-full overflow-hidden rounded-3xl md:overflow md:rounded-none"
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
          <h1 className="text-3xl lg:text-4xl 2xl:text-5xl leading-snug lg:leading-snug 2xl:leading-tight mt-5 font-bold mb-16 w-full lg:w-4/5 xl:w-full">
            {t('browse_by_category')}
          </h1>
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
                className={`${
                  item === selectedTab ? 'selected' : ''
                } h-32 px-4`}
                onClick={() => setSelectedTab(item)}
              >
                <motion.div
                  whileHover={{ scale: 1.1, translateY: 10 }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  className={`${
                    item === selectedTab && 'bg-slate-800 text-red-500'
                  } bg-slate-200/50 hover:bg-slate-800 hover:text-red-500 h-full w-full rounded-3xl text-center flex items-center flex-col justify-center gap-2`}
                >
                  {item.icon}
                  <div>{item.label}</div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
          <main className="relative">
            <AnimatePresence exitBeforeEnter>
              <motion.div
                key={selectedTab ? selectedTab.label : 'empty'}
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.15 }}
                className="flex flex-wrap"
              >
                <motion.div
                  layoutId={1}
                  onClick={() => setSelectedId(1)}
                  className="w-full sm:w-[calc(50%-48px)] lg:w-[calc(33%-56px)] xl:w-[calc(25%-48px)] sm:mx-6 lg:mx-7 mb-14 sm:mb-0 sm:mt-16 xl:mx-6"
                >
                  <Card
                    badgeColor="lime"
                    off={'$30'}
                    price={'$20'}
                    title={'Hello world'}
                    category={'Parfumeria'}
                    imgUrl={
                      'https://ui8-hygge.herokuapp.com/hugge/img/products/product-pic-1.png'
                    }
                  />
                </motion.div>

                <motion.div
                  layoutId={2}
                  onClick={() => setSelectedId(2)}
                  className="min-h-[400px] w-full sm:w-[calc(50%-48px)] lg:w-[calc(33%-56px)] xl:w-[calc(25%-48px)] sm:mx-6 lg:mx-7 mb-14 sm:mb-0 sm:mt-16 xl:mx-6 flex-initial"
                >
                  <Card
                    badgeColor="fuchsia"
                    off={'$30'}
                    price={'$20'}
                    title={'Hello world'}
                    category={'Parfumeria'}
                    imgUrl={
                      'https://ui8-hygge.herokuapp.com/hugge/img/products/product-pic-1.png'
                    }
                  />
                </motion.div>
                <motion.div
                  layoutId={3}
                  onClick={() => setSelectedId(3)}
                  className="min-h-[400px] w-full sm:w-[calc(50%-48px)] lg:w-[calc(33%-56px)] xl:w-[calc(25%-48px)] sm:mx-6 lg:mx-7 mb-14 sm:mb-0 sm:mt-16 xl:mx-6 flex-initial"
                >
                  <Card
                    badgeColor="blue"
                    price={'$20'}
                    title={'Hello world'}
                    category={'Parfumeria'}
                    imgUrl={
                      'https://ui8-hygge.herokuapp.com/hugge/img/products/product-pic-1.png'
                    }
                  />
                </motion.div>
                <motion.div
                  layoutId={4}
                  onClick={() => setSelectedId(4)}
                  className="min-h-[400px] w-full sm:w-[calc(50%-48px)] lg:w-[calc(33%-56px)] xl:w-[calc(25%-48px)] sm:mx-6 lg:mx-7 mb-14 sm:mb-0 sm:mt-16 xl:mx-6 flex-initial"
                >
                  <Card
                    badgeColor="yellow"
                    price={'$20'}
                    title={'Hello world'}
                    category={'Parfumeria'}
                    imgUrl={
                      'https://ui8-hygge.herokuapp.com/hugge/img/products/product-pic-1.png'
                    }
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </main>
        </section>
      </div>
    </>
  )
}

export default Home
