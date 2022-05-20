import { useState, useEffect, useRef } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'
import { doc, updateDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'
import { useTranslation } from 'react-i18next'

function EditListing() {
  const [listing, setListing] = useState(null)
  const { t } = useTranslation()
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    image: [],
    name: '',
    type: '',
    userRef: '',
  })

  const { image, name } = formData

  const auth = getAuth()
  const navigate = useNavigate()
  const params = useParams()
  const isMounted = useRef(true)

  // Fetch listing to edit
  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, 'listings', params.listingId)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setListing(docSnap.data())
        console.log(docSnap.data())
        setFormData({ ...docSnap.data() })
        setLoading(false)
      } else {
        navigate('/')
        toast.error("Ro'yxat aniqlanmadi")
      }
    }

    fetchListing()
  }, [params.listingId, navigate])

  // Redirect if listing isn't user's
  useEffect(() => {
    if (listing && listing.userRef !== auth.currentUser.uid) {
      toast.error("Siz bu ro'yxatni o'zgartirolmaysiz!")
      navigate('/')
    }
  })

  // userRef ni tizimga kirgan foydalanuvchiga o'rnatadi
  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({ ...formData, userRef: user.uid })
        } else {
          navigate('/sign-in')
        }
      })
    }

    return () => {
      isMounted.current = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted])

  const onMutate = (e) => {
    let boolean = null

    if (e.target.value === 'true') {
      boolean = true
    }
    if (e.target.value === 'false') {
      boolean = false
    }
    // Files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.files,
      }))
    }

    // text/numbers
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }))
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)

    if (image.length > 1) {
      setLoading(false)
      toast.error('Max 1 rasm')
      return
    }

    // Store image in firebase
    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage()
        const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`

        const storageRef = ref(storage, 'images/' + fileName)

        const uploadTask = uploadBytesResumable(storageRef, image)

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log('Upload is ' + progress + '% done')
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused')
                break
              case 'running':
                console.log('Upload is running')
                break
              default:
                break
            }
          },
          (error) => {
            reject(error)
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL)
            })
          }
        )
      })
    }

    const imgUrl = await Promise.all(
      [...image].map((image) => storeImage(image))
    ).catch(() => {
      setLoading(false)
      toast.error('Suratlar yuklanmadi')
      return
    })

    const formDataCopy = {
      ...formData,
      imgUrl,
      timestamp: serverTimestamp(),
    }

    delete formDataCopy.image

    // Update Listing
    const docRef = doc(db, 'listings', params.listingId)
    await updateDoc(docRef, formDataCopy)
    setLoading(false)
    toast.success("Ro'yxat saqlandi")
    navigate(`/`)
  }

  return (
    <>
      <Spinner isShown={loading} />
      {!loading && (
        <>
          <p className="text-2xl sm:text-4xl lg:text-5xl uppercase font-extrabold p-4 text-center">
            <span className="text-red-500">{t('create-title')}</span>
          </p>

          <div className="mx-auto bg-slate-100 dark:bg-slate-900 rounded-xl shadow-lg p-5 w-11/12 sm:w-9/12 sm:p-10">
            <form onSubmit={onSubmit} className="form-control">
              <div className="btn-group mx-auto my-5 justify-center">
                <input
                  type="radio"
                  name="type"
                  value={'top'}
                  id="type"
                  data-title={t('top')}
                  className={`btn rounded-none ${
                    listing.type === 'top' ? 'btn-outline' : 'btn-ghost'
                  }`}
                  onClick={onMutate}
                  required
                />
                <input
                  type="radio"
                  name="type"
                  value={'for-breakfast'}
                  id="type"
                  data-title={t('for-breakfast')}
                  className={`btn rounded-none ${
                    listing.type === 'for-breakfast'
                      ? 'btn-outline'
                      : 'btn-ghost'
                  }`}
                  onClick={onMutate}
                  required
                />
                <input
                  type="radio"
                  name="type"
                  value={'for-lunch'}
                  id="type"
                  data-title={t('for-lunch')}
                  className={`btn rounded-none ${
                    listing.type === 'for-lunch' ? 'btn-outline' : 'btn-ghost'
                  }`}
                  onClick={onMutate}
                  required
                />
                <input
                  type="radio"
                  name="type"
                  value={'for-table'}
                  id="type"
                  data-title={t('for-table')}
                  className={`btn rounded-none ${
                    listing.type === 'for-table' ? 'btn-outline' : 'btn-ghost'
                  }`}
                  onClick={onMutate}
                  required
                />
                <input
                  type="radio"
                  name="type"
                  value={'personal-hygiene'}
                  id="type"
                  data-title={t('personal-hygiene')}
                  className={`btn rounded-none ${
                    listing.type === 'personal-hygiene'
                      ? 'btn-outline'
                      : 'btn-ghost'
                  }`}
                  onClick={onMutate}
                  required
                />
                <input
                  type="radio"
                  name="type"
                  value={'chai-coffee'}
                  id="type"
                  data-title={t('chai-coffee')}
                  className={`btn rounded-none ${
                    listing.type === 'chai-coffee' ? 'btn-outline' : 'btn-ghost'
                  }`}
                  onClick={onMutate}
                  required
                />
                <input
                  type="radio"
                  name="type"
                  value={'for-home'}
                  id="type"
                  data-title={t('for-home')}
                  className={`btn rounded-none ${
                    listing.type === 'for-home' ? 'btn-outline' : 'btn-ghost'
                  }`}
                  onClick={onMutate}
                  required
                />
                <input
                  type="radio"
                  name="type"
                  value={'for-kitchen'}
                  id="type"
                  data-title={t('for-kitchen')}
                  className={`btn rounded-none ${
                    listing.type === 'for-kitchen' ? 'btn-outline' : 'btn-ghost'
                  }`}
                  onClick={onMutate}
                  required
                />
                <input
                  type="radio"
                  name="type"
                  value={'gift'}
                  id="type"
                  data-title={t('gift')}
                  className={`btn rounded-none ${
                    listing.type === 'gift' ? 'btn-outline' : 'btn-ghost'
                  }`}
                  onClick={onMutate}
                  required
                />
                <input
                  type="radio"
                  name="type"
                  value={'home-appliances'}
                  id="type"
                  data-title={t('home-appliances')}
                  className={`btn rounded-none ${
                    listing.type === 'home-appliances'
                      ? 'btn-outline'
                      : 'btn-ghost'
                  }`}
                  onClick={onMutate}
                  required
                />
                <input
                  type="radio"
                  name="type"
                  value={'toys'}
                  id="type"
                  data-title={t('toys')}
                  className={`btn rounded-none ${
                    listing.type === 'toys' ? 'btn-outline' : 'btn-ghost'
                  }`}
                  onClick={onMutate}
                  required
                />
                <input
                  type="radio"
                  name="type"
                  value={'sport'}
                  id="type"
                  data-title={t('sport')}
                  className={`btn rounded-none ${
                    listing.type === 'sport' ? 'btn-outline' : 'btn-ghost'
                  }`}
                  onClick={onMutate}
                  required
                />
                <input
                  type="radio"
                  name="type"
                  value={'stationery'}
                  id="type"
                  data-title={t('stationery')}
                  className={`btn rounded-none ${
                    listing.type === 'stationery' ? 'btn-outline' : 'btn-ghost'
                  }`}
                  onClick={onMutate}
                  required
                />
                <input
                  type="radio"
                  name="type"
                  value={'casual'}
                  id="type"
                  data-title={t('casual')}
                  className={`btn rounded-none ${
                    listing.type === 'casual' ? 'btn-outline' : 'btn-ghost'
                  }`}
                  onClick={onMutate}
                  required
                />
              </div>

              <label className="label">
                <span>{t('name-item')}</span>
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={onMutate}
                className="input bg-transparent input-error"
                placeholder={t('name-item')}
                required
              />

              <label className="label capitalize"> {t('picture')}</label>
              <input
                className="formInputFile border-error border rounded-t-lg p-2"
                type="file"
                id="image"
                onChange={onMutate}
                max="1"
                accept=".jpg,.png,.jpeg"
                required
              />
              <div className="alert alert-neutral text-neutral-content border-error border rounded-t-none">
                <div className="flex-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="w-6 h-6 mx-2 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <label>
                    Oldingi rasm:{' '}
                    <a
                      href={listing.imgUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="underline decoration-pink-500 decoration-2 hover:decoration-4 text-white"
                    >
                      {listing.imgUrl}
                    </a>
                  </label>
                </div>
              </div>
              <div className="mt-10 flex items-center gap-5">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => navigate('/profile')}
                >
                  {t('back')}
                </button>
                <button type="submit" className="btn btn-primary flex-auto">
                  {t('add')}
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  )
}

export default EditListing
