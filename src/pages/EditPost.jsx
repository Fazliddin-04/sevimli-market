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

function EditPost() {
  const [post, setPost] = useState(null)
  const { t } = useTranslation()
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    images: [],
    title: '',
    text: '',
    category: '',
    userRef: '',
  })

  const { images, title, text, category } = formData

  const auth = getAuth()
  const navigate = useNavigate()
  const params = useParams()
  const isMounted = useRef(true)

  // Fetch listing to edit
  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, 'posts', params.postId)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setPost(docSnap.data())
        setFormData({ ...docSnap.data() })
        setLoading(false)
      } else {
        navigate('/')
        toast.error("Ro'yxat aniqlanmadi")
      }
    }

    fetchListing()
  }, [params.postId, navigate])

  // Redirect if listing isn't user's
  useEffect(() => {
    if (post && post.userRef !== auth.currentUser.uid) {
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
        [e.target.id]: e.target.value,
      }))
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)

    if (images.length > 5) {
      setLoading(false)
      toast.error('Max 5 rasm')
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

    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch(() => {
      setLoading(false)
      toast.error('Suratlar yuklanmadi')
      return
    })

    const formDataCopy = {
      ...formData,
      imgUrls,
      timestamp: serverTimestamp(),
    }

    delete formDataCopy.images

    // Update Listing
    const docRef = doc(db, 'posts', params.postId)
    await updateDoc(docRef, formDataCopy)
    setLoading(false)
    toast.success("Ro'yxat saqlandi")
    navigate(`/`)
  }

  if (loading) {
    return <Spinner isShown={null} />
  }

  return (
    <>
      <p className="text-2xl sm:text-4xl lg:text-5xl uppercase font-extrabold p-4 text-center">
        <span className="text-red-500">Post yaratish</span>
      </p>

      <div className="mx-auto bg-slate-100 dark:bg-slate-800 rounded-xl shadow-lg p-5 w-11/12 sm:w-9/12 sm:p-10">
        <form onSubmit={onSubmit} className="form-control">
          <label className="label">
            <span>Sarlavha</span>
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={onMutate}
            className="input bg-transparent input-error mb-4"
            required
          />
          <label className="label">
            <span>Post turi</span>
          </label>
          <input
            type="text"
            name="category"
            id="category"
            value={category}
            onChange={onMutate}
            className="input bg-transparent input-error mb-4"
            placeholder="Misol: Aksiya, Yangi filial, Bestsellerlar ..."
            required
          />
          <label className="label">
            <span>Matn</span>
          </label>
          <textarea
            name="text"
            id="text"
            value={text}
            onChange={onMutate}
            className="textarea textarea-error bg-transparent mb-4 h-60"
          ></textarea>
          <label className="label capitalize"> {t('picture')}</label>
          <input
            className="formInputFile border-error border rounded-t-lg p-2"
            type="file"
            id="images"
            onChange={onMutate}
            max="5"
            accept=".jpg,.png,.jpeg"
            required
            multiple
          />
          <div className="alert alert-info opacity-90 rounded-t-none">
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
              <label>Max 5 surat</label>
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
  )
}

export default EditPost
