import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

function Card({ off, price, title, category, imgUrl, linked, id }) {
  const { t } = useTranslation()
  return (
    <Link
      to={linked ? `/blog/${id}` : '/'}
      className="w-64 listMotion-card block"
    >
      <div className="listMotion-card__frame flex justify-center overflow-hidden bg-slate-100 rounded-3xl p-2 h-64 mb-4 lg:mb-8">
        <img
          src={imgUrl[0]}
          alt=""
          width="100%"
          className="object-cover"
          loading="lazy"
        />
      </div>
      <h3 className="text-2xl text-center sm:text-left font-semibold mb-2 lg:mb-4">
        {t(title)}
      </h3>
      <div className="flex justify-center sm:justify-start items-center gap-6">
        <div
          className={`listMotion-card__category uppercase font-bold text-sm px-4 h-10 flex items-center justify-center rounded-full`}
        >
          {t(category)}
        </div>
        {/* <h3 className="text-2xl font-semibold">
          {off && (
            <span className="text-xl font-light line-through text-gray-500">
              {off}
            </span>
          )}{' '}
          {price}
        </h3> */}
      </div>
    </Link>
  )
}

export default Card
