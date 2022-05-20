import { useEffect, useState } from 'react'
import { getAuth, updateProfile } from 'firebase/auth'
import {
  doc,
  updateDoc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
} from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import { useNavigate, Link } from 'react-router-dom'
import { FaSignOutAlt, FaPlus } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'
import ListingItem from '../components/ListingItem'

function Profile() {
  const auth = getAuth()
  const [menuPersonal, setMenuPersonal] = useState(true)
  const [menuListings, setMenuListings] = useState(false)
  const [menuBlog, setMenuBlog] = useState(false)
  const [changeDetails, setChangeDetails] = useState(false)
  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState(null)

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
    timestamp: new Date(auth.currentUser.metadata.creationTime)
      .toLocaleDateString('uz-Cyrl-UZ')
      .split('/'),
  })

  const { name, email, timestamp } = formData
  const currentLangCode = cookies.get('i18next') || 'uz'
  const day = timestamp[0].replace('0', '')
  const month = timestamp[1].replace('0', '')
  const navigate = useNavigate()
  const { t } = useTranslation()

  useEffect(() => {
    const fetchUserListings = async () => {
      const listingsRef = collection(db, 'listings')

      const q = query(
        listingsRef,
        where('userRef', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc')
      )

      const querySnap = await getDocs(q)

      let listings = []

      querySnap.forEach((doc) => {
        listings.push({
          id: doc.id,
          data: doc.data(),
        })
      })

      setListings(listings)
      setLoading(false)
    }

    fetchUserListings()
  }, [auth.currentUser.uid])

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const onLogout = () => {
    if (window.confirm('are you sure,')) {
      auth.signOut()
      navigate('/')
    }
  }

  const onDelete = async (listingId) => {
    if (window.confirm("O'chirishni xohlaganingizga ishonchingiz komilmi?")) {
      await deleteDoc(doc(db, 'listings', listingId))
      const updatedListings = listings.filter(
        (listing) => listing.id !== listingId
      )
      setListings(updatedListings)
      toast.success("Ro'yxat muvaffaqiyatli o'chirildi")
    }
  }

  const onEdit = (listingId) => navigate(`/edit-listing/${listingId}`)

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        // update display name in fb
        await updateProfile(auth.currentUser, {
          displayName: name,
        })

        // update in firestore
        const userRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userRef, { name })
      }
    } catch (error) {
      toast.error(t('personal_error'))
    }
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  useEffect(() => {
    // eslint-disable-next-line no-undef
    var gradient = new Gradient()
    gradient.initGradient('#canvas')
  }, [])
  return (
    <>
      <div className="flex justify-between">
        <div className="tabs">
          <div
            className={`${
              menuPersonal
                ? 'tab-active text-red-400'
                : 'text-black dark:text-white'
            } tab tab-lg tab-lifted `}
            onClick={() => {
              setMenuPersonal(true)
              setMenuListings(false)
              setMenuBlog(false)
            }}
          >
            {t('personal_details')}
          </div>
          <div
            className={`${
              menuListings
                ? 'tab-active text-red-400'
                : 'text-black dark:text-white'
            } tab tab-lg tab-lifted`}
            onClick={() => {
              setMenuListings(true)
              setMenuPersonal(false)
              setMenuBlog(false)
            }}
          >
            {t('products')}
          </div>
          <div
            className={`${
              menuBlog
                ? 'tab-active text-red-400'
                : 'text-black dark:text-white'
            } tab tab-lg tab-lifted`}
            onClick={() => {
              setMenuBlog(true)
              setMenuListings(false)
              setMenuPersonal(false)
            }}
          >
            {t('blog')}
          </div>
        </div>
      </div>
      <ul className="p-4 mb-10 shadow-lg bg-slate-100 dark:bg-slate-900 backdrop-blur-lg rounded-xl w-full h-full">
        <div className={`${menuPersonal ? 'block' : 'hidden'}`}>
          <div className={`background--custom profile rounded-2xl`}>
            <canvas id="canvas"></canvas>
            <div className="text-white backdrop-blur-sm rounded-3xl mx-auto sm:mx-0 sm:p-6 ml-4 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold flex flex-col gap-5">
              <div className="flex flex-col sm:flex-row gap-5 capitalize">
                {t('hi')}
                <span>{name.split(' ')[0]}!</span>
              </div>
              <span className="text-xl font-normal">
                {currentLangCode === 'ru' ? (
                  <>
                    {t('member_since')}
                    {day}-{t(months[month - 1])}, {timestamp[2]}
                  </>
                ) : (
                  <>
                    {day}-{t(months[month - 1])}
                    {t('member_since')}, {timestamp[2]}
                  </>
                )}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between flex-wrap gap-5 mt-5">
            <p className="text-xl"> {t('personal_details')}</p>
            <button
              className="btn btn-outline"
              onClick={() => {
                changeDetails && onSubmit()
                setChangeDetails((prevState) => !prevState)
              }}
            >
              {changeDetails ? t('done') : t('change')}
            </button>
          </div>

          <form className="form-control">
            <label className="label">
              <span className="label-text">{t('name')}</span>
            </label>
            <input
              type="text"
              placeholder="username"
              className="input input-ghost text-white"
              value={name}
              id="name"
              disabled={!changeDetails ? 'disabled' : ''}
              onChange={onChange}
            />
            <label className="label">
              <span className="label-text">{t('email')}</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              className="input input-ghost text-white"
              id="email"
              value={email}
              disabled={!changeDetails ? 'disabled' : ''}
              onChange={onChange}
            />
          </form>
          <button
            className="btn btn-error gap-3 text-lg mt-10 ml-auto"
            type="button"
            onClick={onLogout}
          >
            {t('log_out')}
            <FaSignOutAlt />
          </button>
        </div>
        <div
          className={`max-h-90 overflow-y-auto ${
            menuListings ? 'block' : 'hidden'
          }`}
        >
          {!loading && listings?.length > 0 && (
            <div className="p-4 sm:p-0">
              <div>
                <Link
                  to="/create-listing"
                  className="btn bg-red-700 text-white mt-5"
                >
                  <span className="mr-2">
                    <FaPlus />
                  </span>
                  {t('add')}
                </Link>
              </div>
              <ul className="flex flex-wrap justify-center items-center gap-x-9">
                {listings.map((listing) => (
                  <ListingItem
                    key={listing.id}
                    listing={listing.data}
                    id={listing.id}
                    onDelete={() => onDelete(listing.id)}
                    onEdit={() => onEdit(listing.id)}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>
      </ul>
    </>
  )
}

export default Profile
