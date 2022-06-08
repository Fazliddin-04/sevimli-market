import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { toast } from 'react-toastify'
import OAuth from '../components/OAuth'
import { FaEye } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const { t } = useTranslation()

  const ref1 = useRef()
  const ref2 = useRef()

  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    const auth = getAuth()

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

      if (userCredential.user) {
        navigate('/profile')
      }
    } catch (error) {
      toast.error("Noto'g'ri hisob ma'lumotlari")
    }
  }

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
    ref2.current.innerHTML = ref2.current.innerText
      .split('')
      .map(
        (letter, idx) =>
          letter !== '' &&
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
      <div className="bg-black/30 text-white w-fit backdrop-blur-lg border-4 border-slate-700 max-w-full py-5 px-14 sm:ml-10 rounded-3xl">
        <p className="text-2xl sm:text-3xl font-bold capitalize max-w-sm text-center sm:my-5">
          {t('login_title')}
        </p>
        <div className="my-10">
          <OAuth />
        </div>
        <div className="divider uppercase"> {t('or')}</div>
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
            <label className="label block" ref={ref1} htmlFor="email">
              {t('email')}
            </label>
          </div>

          <div className="form-control-magic flex items-center justify-center">
            <input
              className="input input-ghost w-full"
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={onChange}
              required
            />
            <label className="label block" ref={ref2} htmlFor="password">
              {t('password')}
            </label>

            <button
              type="button"
              className="btn btn-outline btn-square btn-sm absolute right-2"
              onClick={() => setShowPassword((prevState) => !prevState)}
            >
              <FaEye />
            </button>
          </div>
          <div className="text-white text-md text-right">
            <Link to="/forgot-password">{t('forgot_password')}</Link>
          </div>

          <button className="btn bg-red-700 text-white mt-5 border-none">
            {t('login')}
          </button>
        </form>

        <div className="flex items-center capitalize justify-center flex-wrap gap-2 text-center mt-5">
          <span>{t('have_not_acc')}</span>
          <Link to="/sign-up" className="font-bold text-red-400 ">
            {t('register')}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignIn
