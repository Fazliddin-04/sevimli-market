import React from 'react'
import { useTranslation } from 'react-i18next'

function Card({ off, price, title, category, imgUrl }) {
  const { t } = useTranslation()
  return (
    <div className="w-72">
      <div className="flex justify-center overflow-hidden bg-slate-100 rounded-3xl h-40 p-2 lg:h-64 mb-4 lg:mb-8">
        <img
          src={imgUrl}
          alt=""
          width="90%"
          className="object-contain"
          loading="lazy"
        />
      </div>
      <h3 className="text-2xl text-center sm:text-left font-semibold mb-2 lg:mb-4">
        {t(title)}
      </h3>
      <div className="flex justify-center sm:justify-start items-center gap-6">
        <div
          className={`uppercase font-bold text-sm text-pink-500 bg-pink-600/30 px-4 h-10 flex items-center justify-center rounded-full`}
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
    </div>
  )
}

export default Card
