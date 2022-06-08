import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import OAuth from '../components/OAuth'
import { FaEye } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const { name, email, password } = formData

  const navigate = useNavigate()
  const { t } = useTranslation()
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth()

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      const user = userCredential.user

      updateProfile(auth.currentUser, { displayName: name })

      const formDataCopy = { ...formData }
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db, 'users', user.uid), formDataCopy)

      navigate('/profile')
    } catch (error) {
      toast.error("Ro'yxatdan o'tishda nimadir xato ketdi")
    }
  }

  const ref1 = useRef()
  const ref2 = useRef()
  const ref3 = useRef()
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
    ref3.current.innerHTML = ref3.current.innerText
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
    <>
      <div className="background--custom">
        <canvas id="canvas"></canvas>
      </div>
      <div className="bg-black/30 text-white w-full lg:w-2/5 backdrop-blur-lg border-4 border-slate-700 max-w-full py-5 px-14 sm:ml-10 rounded-3xl">
        <p className="text-3xl sm:text-4xl font-bold capitalize text-center sm:my-5">
          {t('welcome')}
        </p>
        <div className="my-10">
          <OAuth />
        </div>
        <div className="divider uppercase">{t('or')}</div>
        <form className="form-control" onSubmit={onSubmit}>
          <div className="form-control-magic">
            <input
              className="input input-ghost w-full"
              type="text"
              id="name"
              value={name}
              onChange={onChange}
              required
            />
            <label className="label block" ref={ref1}>
              {t('name')}
            </label>
          </div>
          <div className="form-control-magic">
            <input
              className="input input-ghost w-full"
              type="email"
              id="email"
              value={email}
              onChange={onChange}
              required
            />
            <label className="label block " ref={ref2}>
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
            <label className="label block" ref={ref3}>
              <span className="label-text text-xl"> {t('password')}</span>
            </label>
            <button
              type="button"
              className="btn btn-outline btn-square btn-sm absolute right-2"
              onClick={() => setShowPassword((prevState) => !prevState)}
            >
              <FaEye />
            </button>
          </div>

          <button className="btn bg-red-700 text-white mt-5border-none">
            {t('register')}
          </button>
        </form>

        <div className="capitalize flex items-center justify-center flex-wrap gap-2 text-center mt-5">
          <span>{t('have_acc')}</span>
          <Link to="/sign-in" className="font-bold text-red-400">
            {t('login')}
          </Link>
        </div>
      </div>
    </>
  )
}

export default SignUp
