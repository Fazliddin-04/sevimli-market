import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import cookies from 'js-cookie'
import { FaTelegram } from 'react-icons/fa'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

import { FreeMode, Navigation, Thumbs } from 'swiper'
import img1 from '../assets/IMG_4578.JPG'
import img2 from '../assets/IMG_4579.JPG'
import img3 from '../assets/IMG_4580.JPG'
import img4 from '../assets/IMG_4581.JPG'
import img5 from '../assets/IMG_4582.JPG'

function Vision() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const currentLangCode = cookies.get('i18next') || 'uz'
  const { t } = useTranslation()
  return (
    <>
      <div className="text-sm breadcrumbs px-5">
        <ul className="flex flex-wrap text-sm sm:text-md lg:text-xl">
          <li>
            <Link to="/">{t('home')}</Link>
          </li>
          <li className="font-medium capitalize">{t('vision')}</li>
        </ul>
      </div>
      <div className="mt-10 mb-10 xl:mb-28">
        <h4 className="font-bold text-sm sm:text-md md:text-lg italic text-orange-400 capitalize text-center md:text-left">
          - {t('learn_more')}
        </h4>
        <h2 className="capitalize xl:leading-tight text-3xl text-center md:text-left lg:text-4xl xl:text-5xl font-bold mt-5">
          {currentLangCode === 'ru'
            ? `познакомиться со зданием`
            : `${t('building')} ${t('explore')}`}
        </h2>
      </div>

      <h2 className="title mt-5 mb-12 sm:mb-16 w-full lg:w-4/5 xl:w-full">
        {t('general')}
      </h2>
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
          height: '70vh',
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mb-5"
      >
        <SwiperSlide>
          <img
            src={img1}
            alt=""
            className="object-cover md:w-2/3 mx-auto h-full block rounded-3xl"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={img2}
            alt=""
            className="object-cover md:w-2/3 mx-auto h-full block rounded-3xl"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={img3}
            alt=""
            className="object-cover md:w-2/3 mx-auto h-full block rounded-3xl"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={img4}
            alt=""
            className="object-cover md:w-2/3 mx-auto h-full block rounded-3xl"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={img5}
            alt=""
            className="object-cover md:w-2/3 mx-auto h-full block rounded-3xl"
          />
        </SwiperSlide>
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            src={img1}
            alt=""
            className="object-cover w-full lg:h-40 block rounded-3xl"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={img2}
            alt=""
            className="object-cover w-full lg:h-40 block rounded-3xl"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={img3}
            alt=""
            className="object-cover w-full lg:h-40 block rounded-3xl"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={img4}
            alt=""
            className="object-cover w-full lg:h-40 block rounded-3xl"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={img5}
            alt=""
            className="object-cover w-full lg:h-40 block rounded-3xl"
          />
        </SwiperSlide>
      </Swiper>
      <section
        id="newsletter"
        className="bg-slate-200 dark:bg-slate-700/50 rounded-3xl flex items-center justify-center text-center flex-col mt-40 xl:mx-32 py-16 px-5"
      >
        <h4 className="font-bold text-sm sm:text-md md:text-lg italic text-orange-400 capitalize">
          - {t('our_newsletter')}
        </h4>
        <h2 className="title mt-5 mb-12 sm:mb-16 w-full lg:w-4/5 xl:w-full">
          {currentLangCode === 'uz' && 'Telegram'}
          {currentLangCode === 'tg' && 'Телеграм'}
          {t('sign_up_to_our_channel_in')}
          {currentLangCode === 'ru' && ' Телеграм'}
        </h2>
        <a
          href="https://t.me/sevimli_supermarket"
          className="flex flex-wrap items-center justify-center gap-3 w-fit text-xs lg:text-xl bg-red-700 text-white w-full p-4 sm:p-5 uppercase font-bold text-center rounded-3xl"
        >
          {t('visit_the_channel')} <FaTelegram />
        </a>
      </section>
    </>
  )
}

export default Vision
