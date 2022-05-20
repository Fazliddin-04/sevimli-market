import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

function ForgotPassword() {
  const [email, setEmail] = useState('')

  const onChange = (e) => setEmail(e.target.value)

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      toast.success("Email jo'natildi")
    } catch (error) {
      toast.error("Qayta tiklash xatini yuborib bo'lmadi")
    }
  }

  const { t } = useTranslation()
  const ref1 = useRef()

  useEffect(() => {
    ref1.current.innerHTML = ref1.current.innerText
      .split('')
      .map(
        (letter, idx) =>
          `<span className="label-text" style="transition-delay: ${
            idx * 50
          }ms;">${letter}</span>`
      )
      .join('')
  })

  useEffect(() => {
    // eslint-disable-next-line no-undef
    var gradient = new Gradient()
    gradient.initGradient('#canvas')
  }, [])

  return (
    <div className="overflow-hidden">
      <div className="background--custom">
        <canvas id="canvas"></canvas>
      </div>
      <div className="bg-black/30 text-white w-fit backdrop-blur-lg border-4 border-slate-700 max-w-full py-20 px-14 sm:ml-10 mt-20 rounded-3xl">
        <p className="text-2xl sm:text-3xl font-bold capitalize max-w-sm text-center sm:my-5">
          {t('forgotPass_title')}
        </p>
        <form className="form-control" onSubmit={onSubmit}>
          <div className="form-control-magic">
            <input
              className="input input-ghost w-full"
              type="email"
              id="email"
              value={email}
              onChange={onChange}
              required
            />
            <label className="label block" ref={ref1}>
              {t('email')}
            </label>
          </div>
          <div className="text-white text-md text-right">
            <Link to="/sign-in">{t('login')}</Link>
          </div>
          <button className="btn bg-red-700 text-white mt-5 border-none">
            {t('send_reset_link')}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword
