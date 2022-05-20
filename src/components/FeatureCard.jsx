import React from 'react'

function FeatureCard({ icon, title, text }) {
  return (
    <div className="flex flex-col items-center w-[304px]">
      <div className="mx-auto mb-8 w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-3xl">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold mb-4">{title}</h3>
      <p className="text-xl leading-relaxed mb-4">{text}</p>
    </div>
  )
}

export default FeatureCard
