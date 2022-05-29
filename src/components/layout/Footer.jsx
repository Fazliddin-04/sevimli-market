import React from 'react'
import { Link } from 'react-router-dom'
import cart from '../../assets/cart.png'
import { FaTelegramPlane, FaInstagram } from 'react-icons/fa'
import { FiFacebook } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'

function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <div className="container px-10 mx-auto mt-28 pb-16 flex flex-wrap sm:justify-around gap-14">
      <div className="max-w-max flex flex-col gap-4">
        <Link to="/" className="font-bold text-3xl flex items-center gap-2">
          <img src={cart} alt="cart" width={50} />
          Sevimli
        </Link>
        <p>
          &copy; {year} - {t('All-rights-reserved')}
        </p>
        <div className="flex gap-4 mt-4">
          <a
            href="https://t.me/sevimlisupermarketiSHURCHI"
            target="_blank"
            rel="noreferrer"
            className="w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-2xl"
          >
            <FaTelegramPlane />
          </a>
          <a
            href="#!"
            target="_blank"
            rel="noreferrer"
            className="w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-2xl"
          >
            <FaInstagram />
          </a>
          <a
            href="#!"
            target="_blank"
            rel="noreferrer"
            className="w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-2xl"
          >
            <FiFacebook />
          </a>
        </div>
      </div>
      <div className="flex flex-col gap-4 capitalize">
        <h3 className="text-2xl font-semibold mb-4">{t('categories')}</h3>
        <Link to="/category/breakfast" className="hover:opacity-70 transition">
          {t('for-breakfast')}
        </Link>
        <Link to="/category/lunch" className="hover:opacity-70 transition">
          {t('for-lunch')}
        </Link>
        <Link to="/category/table" className="hover:opacity-70 transition">
          {t('for-table')}
        </Link>
        <Link to="/category/home" className="hover:opacity-70 transition">
          {t('for-home')}
        </Link>
        <Link to="/category/kitchen" className="hover:opacity-70 transition">
          {t('for-kitchen')}
        </Link>
        <Link to="/category/gift" className="hover:opacity-70 transition">
          {t('gift')}
        </Link>
        <Link to="/category/personal" className="hover:opacity-70 transition">
          {t('personal-hygiene')}
        </Link>
        <Link to="/category/appliances" className="hover:opacity-70 transition">
          {t('home-appliances')}
        </Link>
        <Link to="/category/toys" className="hover:opacity-70 transition">
          {t('toys')}
        </Link>
        <Link to="/category/sport" className="hover:opacity-70 transition">
          {t('sport')}
        </Link>
        <Link to="/category/casual" className="hover:opacity-70 transition">
          {t('casual')}
        </Link>
      </div>
      <div className="flex flex-col gap-4 capitalize">
        <h3 className="text-2xl font-semibold mb-4">{t('company')}</h3>
        <Link to="/about" className="hover:opacity-70 transition">
          {t('about')}
        </Link>
        <Link to="/faq" className="hover:opacity-70 transition">
          {t('faq')}
        </Link>
        <Link to="/contact" className="hover:opacity-70 transition">
          {t('contact')}
        </Link>
        <Link to="/careers" className="hover:opacity-70 transition">
          {t('careers')}
        </Link>
        <Link to="/vision" className="hover:opacity-70 transition">
          {t('vision')}
        </Link>
      </div>
    </div>
  )
}

export default Footer
