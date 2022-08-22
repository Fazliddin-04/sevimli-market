import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import mainImg from '../assets/mainImg.jpg'
import secondaryImg from '../assets/inside.jpg'
import FeatureCard from '../components/FeatureCard'
import cookies from 'js-cookie'
import { FaChartLine, FaRegUser, FaRegStar, FaTelegram } from 'react-icons/fa'

function About() {
  const currentLangCode = cookies.get('i18next') || 'uz'
  const { t } = useTranslation()
  return (
    <>
      <div className="text-sm breadcrumbs px-5">
        <ul className="flex flex-wrap text-sm sm:text-md lg:text-xl">
          <li>
            <Link to="/">{t('home')}</Link>
          </li>
          <li className="font-medium capitalize">{t('about')}</li>
        </ul>
      </div>
      <div className="mt-10 mb-10 xl:mb-28">
        <h4 className="font-bold text-sm sm:text-md md:text-lg italic text-orange-400 capitalize text-center md:text-left">
          - {t('learn_more')}
        </h4>
        <h2 className="xl:leading-tight text-3xl text-center md:text-left lg:text-4xl xl:text-5xl font-bold mt-5">
          {t('about_title')}
        </h2>
      </div>

      <img
        src={mainImg}
        alt="pic"
        className="h-[310px] md:h-[400px] lg:h-[500px] xl:h-[600px] w-full object-cover rounded-3xl"
      />
      <div className="xl:flex items-center justify-around mt-28">
        <div className="xl:w-[455px]">
          <div className="mb-10">
            <h4 className="font-bold text-sm sm:text-md md:text-lg italic text-orange-400 capitalize text-center md:text-left">
              - {t('how_it_has_started')}
            </h4>
            <h2 className="xl:leading-tight text-3xl text-center md:text-left lg:text-4xl xl:text-5xl font-bold mt-5">
              {t('how_and_when_it_has_all_started')}
            </h2>
          </div>
          <img
            src={secondaryImg}
            alt=""
            className="w-full xl:w-[455px] h-[310px] md:h-[400px] lg:h-[500px] xl:h-[560px] object-cover rounded-3xl"
          />
        </div>
        <div className="text-xl xl:text-3xl xl:w-[600px] mt-8">
          <ul class="list-disc">
            <li className="mb-3 xl:mb-8 text-red-400 font-medium">
              Faqat sifatli mahsulotlar
            </li>
            <p className="mb-8">
              4 yil muqaddam, kompaniya asoschilaridan biri odamlar uchun qulay
              va sifatli mahsulotlarga ega bozor g'oyasi bilan chiqqanida,
              ikkilanib ham o'tirishmadi.
            </p>
            <li className="mb-3 xl:mb-8 text-red-400 font-medium capitalize">
              Qulay narx strategiyasi
            </li>
            <p className="mb-8">
              Boshidanoq bizning asosiy maqsadlarimizdan biri hamyonbop
              narxlarga ega bo'lgan yuqori sifatli mahsulotlar bozorini taklif
              qilish edi. Biz nihoyat bunga erishganimizga ishona olmaymiz va
              endi bundan faxrlanamiz.
            </p>
          </ul>
        </div>
      </div>
      <section id="companyValues" className="text-center py-10 mt-28 mb-20">
        <h4 className="font-bold text-sm sm:text-md md:text-lg italic text-orange-400 capitalize">
          - {t('company_values')}
        </h4>
        <h2 className="title mt-5 mb-12 sm:mb-16">{t('our_core_values')}</h2>
        <div className="flex justify-center flex-wrap gap-[100px]">
          <FeatureCard
            icon={<FaChartLine />}
            title={t('great_innovation')}
            text={t('great_innovation-text')}
          />
          <FeatureCard
            icon={<FaRegStar />}
            title={t('high_quality')}
            text={t('high_quality_about-text')}
          />
          <FeatureCard
            icon={<FaRegUser />}
            title={t('teamwork_matters')}
            text={t('teamwork_matters-text')}
          />
        </div>
      </section>
      <section
        id="newsletter"
        className="bg-slate-200 dark:bg-slate-700/50 rounded-3xl flex items-center justify-center text-center flex-col mt-64 xl:mx-32 py-16 px-5 md:mt-0"
      >
        <h4 className="font-bold text-sm sm:text-md md:text-lg italic text-orange-400 capitalize">
          - {t('our_newsletter')}
        </h4>
        <h1 className="title mt-5 mb-12 sm:mb-16 w-full lg:w-4/5 xl:w-full">
          {currentLangCode === 'uz' && 'Telegram'}
          {currentLangCode === 'tg' && 'Телеграм'}
          {t('sign_up_to_our_channel_in')}
          {currentLangCode === 'ru' && ' Телеграм'}
        </h1>
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

export default About
