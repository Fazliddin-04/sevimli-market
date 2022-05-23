import React from 'react'

function Card({ off, price, title, category, imgUrl, badgeColor }) {
  return (
    <div className="min-h-[400px] w-full">
      <div className="flex justify-center overflow-hidden bg-slate-100 rounded-3xl w-72 h-64 mb-8">
        <img src={imgUrl} alt="" width='90%' className='object-contain' />
      </div>
      <h3 className="text-2xl font-semibold mb-4">{title}</h3>
      <div className="flex items-center gap-6">
        <div
          className={`uppercase font-bold ${badgeColor && 'text-pink-500'} ${
            badgeColor && 'bg-pink-600/30'
          } px-4 h-10 flex items-center justify-center rounded-full`}
        >
          {category}
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
