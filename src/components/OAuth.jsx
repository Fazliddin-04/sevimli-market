import React, { useLocation, useNavigate } from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import googleIcon from '../assets/svg/googleIcon.svg'
import { useTranslation } from 'react-i18next'

function OAuth() {
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation()
  const onGoogleClick = async () => {
    try {
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      // check for user
      const docRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(docRef)

      // if user does not exists, create user
      if (!docSnap.exists) {
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          tiemstamp: serverTimestamp(),
        })
      }
      navigate('/')
    } catch (error) {
      toast.error("Google bilan avtorizatsiya qilib bo'lmadi")
    }
  }

  return (
    <button
      className="btn btn-outline text-white gap-4 text-xs sm:text-sm flex-nowrap uppercase w-full"
      onClick={onGoogleClick}
    >
      <img src={googleIcon} alt="google" className="object-cover max-h-8" />

      {location.pathname === '/sign-up'
        ? t('sign_up_with_G')
        : t('sign_in_with_G')}
    </button>
  )
}

export default OAuth
