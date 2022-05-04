import React from 'react'

function Card({ off, price, title, category, imgUrl, badgeColor }) {
  return (
    <div className="min-h-[400px] w-full">
      <div className="flex justify-center bg-slate-200 rounded-3xl h-64 mb-8">
        <img src={imgUrl} alt="" />
      </div>
      <h3 className="text-2xl font-semibold mb-4">{title}</h3>
      <div className="flex items-center gap-6">
        <div
          className={`uppercase font-bold text-${badgeColor}-500 bg-${badgeColor}-500/10 px-4 h-10 flex items-center rounded-full`}
        >
          {category}
        </div>
        <h3 className="text-2xl font-semibold">
          {off && (
            <span className="text-xl font-light line-through text-gray-500">
              {off}
            </span>
          )}{' '}
          {price}
        </h3>
      </div>
    </div>
  )
}

export default Card
