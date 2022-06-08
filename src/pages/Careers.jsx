import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import cookies from 'js-cookie'

function Careers() {
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
            {t('careers')}
            {currentLangCode === 'uz' && 'i Sahifasi'}
          </li>
        </ul>
      </div>
      <div className="mt-10 mb-10 xl:mb-28">
        <h4 className="font-bold text-sm sm:text-md md:text-lg italic text-orange-400 capitalize text-center md:text-left">
          - {t('join_our_team')}
        </h4>
        <h2 className="xl:leading-tight text-3xl text-center md:text-left lg:text-4xl xl:text-5xl font-bold mt-5">
          {t('careers-title')}
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 grid-flow-row auto-rows-max gap-10">
        <div class="card bg-primary text-primary-content">
          <div class="card-body">
            <h2 class="card-title">Sr. Sales Manager</h2>
            <p>Sales {'&'} Marketing - Shurchi, Surxondaryo - $1k+</p>
            <div class="card-actions justify-end">
              <button class="btn">Apply</button>
            </div>
          </div>
        </div>
        <div class="card bg-primary text-primary-content">
          <div class="card-body">
            <h2 class="card-title">Junior Marketing Designer</h2>
            <p>Sales {'&'} Marketing - Shurchi, Surxondaryo - $1k+</p>
            <div class="card-actions justify-end">
              <button class="btn">Apply</button>
            </div>
          </div>
        </div>
        <div class="card bg-primary text-primary-content">
          <div class="card-body">
            <h2 class="card-title">Digital Marketing Consultant</h2>
            <p>Sales {'&'} Marketing - Shurchi, Surxondaryo - $1k+</p>
            <div class="card-actions justify-end">
              <button class="btn">Apply</button>
            </div>
          </div>
        </div>
        <div class="card bg-primary text-primary-content">
          <div class="card-body">
            <h2 class="card-title">Marketing Manager (Sales)</h2>
            <p>Sales {'&'} Marketing - Shurchi, Surxondaryo - $1k+</p>
            <div class="card-actions justify-end">
              <button class="btn">Apply</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Careers
