import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import cookies from 'js-cookie'
import { FaTelegram } from 'react-icons/fa'

function Faq() {
  const currentLangCode = cookies.get('i18next') || 'uz'
  const { t } = useTranslation()
  return (
    <>
      <div className="text-sm breadcrumbs px-5">
        <ul className="flex flex-wrap text-sm sm:text-md lg:text-xl">
          <li>
            <Link to="/">{t('home')}</Link>
          </li>
          <li className="font-medium capitalize">
            {t('faq')} {currentLangCode === 'uz' && 'Sahifasi'}
          </li>
        </ul>
      </div>
      <div className="mt-10 mb-10 xl:mb-28">
        <h4 className="font-bold text-sm sm:text-md md:text-lg italic text-orange-400 capitalize text-center md:text-left">
          - {t('find_the_answers')}
        </h4>
        <h2 className="xl:leading-tight text-3xl text-center md:text-left lg:text-4xl xl:text-5xl font-bold mt-5">
          {t('faq-full')}
        </h2>
      </div>

      <h2 className="title mt-5 mb-12 sm:mb-16 w-full lg:w-4/5 xl:w-full">
        {t('general')}
      </h2>
      <div className="grid sm:grid-cols-2 grid-flow-row auto-rows-max gap-10">
        <div
          tabindex="0"
          class="collapse collapse-arrow border border-base-100 rounded-box h-max"
        >
          <div class="collapse-title text-xl font-medium">
            {t('faq-general-1')}
          </div>
          <div class="collapse-content">
            <p>{t('faq-general-answer')}</p>
          </div>
        </div>
        <div
          tabindex="0"
          class="collapse collapse-arrow border border-base-100 rounded-box h-max"
        >
          <div class="collapse-title text-xl font-medium">
            {t('faq-general-2')}
          </div>
          <div class="collapse-content">
            <p>{t('faq-general-answer')}</p>
          </div>
        </div>
        <div
          tabindex="0"
          class="collapse collapse-arrow border border-base-100 rounded-box h-max"
        >
          <div class="collapse-title text-xl font-medium">
            {t('faq-general-3')}
          </div>
          <div class="collapse-content">
            <p>{t('faq-general-answer')}</p>
          </div>
        </div>
      </div>
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
          {currentLangCode === 'ru' && ' Telegram'}
        </h2>
        <a
          href="#!"
          className="flex flex-wrap items-center justify-center gap-3 w-fit text-xs lg:text-xl bg-red-700 text-white w-full p-4 sm:p-5 uppercase font-bold text-center rounded-3xl"
        >
          {t('visit_the_channel')} <FaTelegram />
        </a>
      </section>
    </>
  )
}

export default Faq
