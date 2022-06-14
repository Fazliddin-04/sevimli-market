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
  const [menuMsg, setMenuMsg] = useState(false)
  const [changeDetails, setChangeDetails] = useState(false)
  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState(null)
  const [posts, setPosts] = useState(null)
  const [msgs, setMsgs] = useState(null)

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

  const fetchUserPosts = async () => {
    const postsRef = collection(db, 'posts')

    const q = query(
      postsRef,
      where('userRef', '==', auth.currentUser.uid),
      orderBy('timestamp', 'desc')
    )

    const querySnap = await getDocs(q)

    let posts = []

    querySnap.forEach((doc) => {
      posts.push({
        id: doc.id,
        data: doc.data(),
      })
    })

    setPosts(posts)
    setLoading(false)
  }

  const fetchMsgs = async () => {
    setLoading(true)
    const postsRef = collection(db, 'messages')

    const q = query(postsRef, orderBy('timestamp', 'desc'))

    const querySnap = await getDocs(q)

    let messages = []

    querySnap.forEach((doc) => {
      messages.push({
        id: doc.id,
        data: doc.data(),
      })
    })

    setMsgs(messages)
    setLoading(false)
  }

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
    auth.signOut()
    navigate('/')
  }

  const onDeleteListing = async (listingId) => {
    if (window.confirm("O'chirishni xohlaganingizga ishonchingiz komilmi?")) {
      await deleteDoc(doc(db, 'listings', listingId))
      const updatedListings = listings.filter(
        (listing) => listing.id !== listingId
      )
      setListings(updatedListings)
      toast.success("Ro'yxat muvaffaqiyatli o'chirildi")
    }
  }

  const onDeletePost = async (postId) => {
    if (window.confirm("O'chirishni xohlaganingizga ishonchingiz komilmi?")) {
      await deleteDoc(doc(db, 'posts', postId))
      const updatedPosts = posts.filter((post) => post.id !== postId)
      setListings(updatedPosts)
      toast.success("Ro'yxat muvaffaqiyatli o'chirildi")
    }
  }

  const onEditListing = (listingId) => navigate(`/edit-listing/${listingId}`)

  const onEditPost = (postId) => navigate(`/edit-post/${postId}`)

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
    } catch (err) {
      toast.error(t('personal_error'))
      console.log(err)
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
      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal  modal-bottom sm:modal-middle">
        <div className="modal-box bg-white dark:bg-slate-900">
          <h3 className="font-bold text-lg">{t('logging_out')}</h3>
          <p className="py-4">{t('are_you_sure')} </p>
          <div className="modal-action">
            <label htmlFor="my-modal-6" className="btn">
              {t('no')}
            </label>
            <label htmlFor="my-modal-6" className="btn" onClick={onLogout}>
              {t('yes')}
            </label>
          </div>
        </div>
      </div>
      {auth.currentUser.uid === 'LDbZ8YMeoNMdjAU4vB0umkIK59x1' && (
        <div className="tabs flex justify-center">
          <div
            className={`${
              menuPersonal
                ? 'dark:bg-slate-700/50 tab-active'
                : 'text-black dark:text-white'
            } tab tab-lg tab-lifted `}
            onClick={() => {
              setMenuPersonal(true)
              setMenuListings(false)
              setMenuBlog(false)
              setMenuMsg(false)
            }}
          >
            {t('personal_details')}
          </div>
          <div
            className={`${
              menuListings ? 'tab-active' : 'text-black dark:text-white'
            } tab tab-lg tab-lifted`}
            onClick={() => {
              setMenuListings(true)
              setMenuPersonal(false)
              setMenuBlog(false)
              setMenuMsg(false)
              fetchUserListings()
            }}
          >
            {t('products')}
          </div>
          <div
            className={`${
              menuBlog ? 'tab-active' : 'text-black dark:text-white'
            } tab tab-lg tab-lifted`}
            onClick={() => {
              setMenuBlog(true)
              setMenuListings(false)
              setMenuPersonal(false)
              setMenuMsg(false)
              fetchUserPosts()
            }}
          >
            {t('blog')}
          </div>
          <div
            className={`${
              menuMsg ? 'tab-active' : 'text-black dark:text-white'
            } tab tab-lg tab-lifted`}
            onClick={() => {
              setMenuMsg(true)
              setMenuListings(false)
              setMenuPersonal(false)
              setMenuBlog(false)
              fetchMsgs()
            }}
          >
            {t('messages')}
          </div>
        </div>
      )}
      <ul className="p-4 mb-10 shadow-lg bg-slate-200 dark:bg-slate-700/50 backdrop-blur-lg rounded-xl rounded-tl-none w-full h-full">
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
              className="input input-bordered bg-transparent"
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
              className="input input-bordered bg-transparent"
              id="email"
              value={email}
              disabled={!changeDetails ? 'disabled' : ''}
              onChange={onChange}
            />
          </form>
          <label
            htmlFor="my-modal-6"
            className="btn btn-error modal-button gap-3 text-lg mt-10 ml-auto"
          >
            {t('log_out')}
            <FaSignOutAlt />
          </label>
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
                {listings.map(({ id, data }) => (
                  <li key={id}>
                    <ListingItem
                      id={id}
                      title={data.name}
                      category={data.type}
                      timestamp={data.timestamp}
                      imgUrl={data.imgUrl}
                      onDelete={() => onDeleteListing(id)}
                      onEdit={() => onEditListing(id)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div
          className={`max-h-90 overflow-y-auto ${
            menuBlog ? 'block' : 'hidden'
          }`}
        >
          {!loading && posts?.length > 0 && (
            <div className="p-4 sm:p-0">
              <div>
                <Link
                  to="/create-post"
                  className="btn bg-red-700 text-white mt-5"
                >
                  <span className="mr-2">
                    <FaPlus />
                  </span>
                  {t('add')}
                </Link>
              </div>
              <ul className="flex flex-wrap justify-center items-center gap-x-9">
                {posts.map(({ id, data }) => (
                  <li key={id}>
                    <ListingItem
                      id={id}
                      title={data.title}
                      category={data.category}
                      timestamp={data.timestamp}
                      imgUrl={data.imgUrls}
                      onDelete={() => onDeletePost(id)}
                      onEdit={() => onEditPost(id)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div
          className={`max-h-90 overflow-y-auto ${menuMsg ? 'block' : 'hidden'}`}
        >
          {!loading && msgs?.length > 0 && (
            <div className="p-4 sm:p-0">
              <ul className="flex flex-wrap justify-start items-start gap-x-2">
                {msgs.map(({ id, data }) => (
                  <li
                    key={id}
                    className="min-w-full w-2/5 border border-black dark:bg-white/20 my-5 p-3 rounded-lg"
                  >
                    <h4>{t(data.subject)}</h4>
                    <h3 className="text-xl font-bold mb-3">
                      {currentLangCode === 'ru' ? (
                        <>
                          {t('from')}
                          <a
                            href={`mailto:${data.email}`}
                            className="text-red-400 link-hover"
                          >
                            {data.fullname}
                          </a>
                        </>
                      ) : (
                        <>
                          <a
                            href={`mailto:${data.email}`}
                            className="text-red-400 link-hover"
                          >
                            {data.fullname}
                          </a>
                          {t('from')}
                        </>
                      )}
                    </h3>
                    <p className="text-md lg:text-lg">{data.messageText}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </ul>
    </>
  )
}

//  {
//    new Date(data.timestamp).toLocaleDateString('uz-Cyrl-UZ').split('/')
//  }

export default Profile
