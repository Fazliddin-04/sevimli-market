import React, { useState } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import cookies from 'js-cookie'
import Spinner from '../components/Spinner'
import { FaTelegram } from 'react-icons/fa'

function Contact() {
  const currentLangCode = cookies.get('i18next') || 'uz'
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    subject: '',
    messageText: '',
  })

  const { fullname, email } = formData
  const { t } = useTranslation()
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const formDataCopy = {
      ...formData,
      timestamp: serverTimestamp(),
    }

    await addDoc(collection(db, 'messages'), formDataCopy)
    setLoading(false)
    toast.success(t('message-sent'))
  }
  if (loading) {
    return <Spinner isShown={null} />
  }
  return (
    <>
      <div className="text-sm breadcrumbs px-5">
        <ul className="flex flex-wrap text-sm sm:text-md lg:text-xl">
          <li>
            <Link to="/">{t('home')}</Link>
          </li>
          <li className="font-medium capitalize">{t('contact-us')}</li>
        </ul>
      </div>
      <div className="mt-10 mb-10 xl:mb-28">
        <h4 className="font-bold text-sm sm:text-md md:text-lg italic text-orange-400 capitalize text-center md:text-left">
          - {t('ask_questions')}
        </h4>
        <h2 className="xl:leading-tight md:w-1/2 text-3xl text-center md:text-left lg:text-4xl xl:text-5xl font-bold mt-5">
          {t('contact-title')}
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 grid-flow-row auto-rows-max gap-10">
        <div>
          <div className="text-xl font-medium">{t('')}</div>
          <div className="">
            <p>{t('')}</p>
          </div>
        </div>
      </div>
      <div className="xl:flex justify-around mt-28">
        <div className="xl:w-[455px]">
          <div className="mb-10">
            <h4 className="font-bold text-sm sm:text-md md:text-lg italic text-orange-400 capitalize text-center md:text-left">
              - {t('reach_out_to_us')}
            </h4>
            <h2 className="title mt-5 text-center md:text-left">
              {t('contact_form_title')}
            </h2>
          </div>
        </div>
        <div className="text-xl xl:w-[600px] ">
          <form className="form-control" onSubmit={onSubmit}>
            <label htmlFor="fullname" className="label">
              {t('fullname')}
            </label>
            <input
              className="input bg-transparent input-error mb-5 w-full"
              type="text"
              id="fullname"
              value={fullname}
              onChange={onChange}
              required
            />
            <label htmlFor="email" className="label">
              {t('email')}
            </label>
            <input
              className="input bg-transparent input-error mb-5 w-full"
              type="email"
              id="email"
              value={email}
              onChange={onChange}
              required
            />
            <label htmlFor="name" className="label">
              {t('subject')}
            </label>
            <select
              onChange={onChange}
              id="subject"
              defaultValue={'not-choosen'}
              className="select bg-transparent select-error select-lg w-full max-w-xs mb-5"
            >
              <option value={'not-choosen'} disabled>
                {t('choose-subject')}
              </option>
              <option value={'general-inquiry'}>{t('general-inquiry')}</option>
              <option value={'press-inquiry'}>{t('press-inquiry')}</option>
            </select>
            <label htmlFor="messageText" className="label">
              {t('message')}
            </label>
            <textarea
              className="textarea textarea-error bg-transparent mb-5 h-32"
              onChange={onChange}
              placeholder=". . ."
              id="messageText"
              required
            ></textarea>
            <button className="btn w-fit bg-red-700 text-white mt-5 border-none">
              {t('send')}
            </button>
          </form>
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

export default Contact
