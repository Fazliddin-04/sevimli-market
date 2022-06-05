import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'
import ListMotion from '../components/ListMotion'

function Category() {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastFetchedListing, setLastFetchedListing] = useState(null)

  const currentLangCode = cookies.get('i18next') || 'uz'
  const params = useParams()
  const { t } = useTranslation()

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Get referense
        const listingsRef = collection(db, 'listings')

        // create a query
        const q = query(
          listingsRef,
          where('type', '==', params.categoryName),
          orderBy('timestamp', 'desc'),
          limit(10)
        )

        // Execute query
        const querySnap = await getDocs(q)

        const lastVisible = querySnap.docs[querySnap.docs.length - 1]
        setLastFetchedListing(lastVisible)

        const listings = []

        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          })
        })

        setListings(listings)
        setLoading(false)
      } catch (error) {
        toast.error("Ro'yhatlarni olib kelib bo'lmadi")
      }
    }

    fetchListings()
  }, [params.categoryName])

  // Pagination / Load More
  const onFetchMoreListings = async () => {
    try {
      // Get referense
      const listingsRef = collection(db, 'listings')

      // create a query
      const q = query(
        listingsRef,
        where('type', '==', params.categoryName),
        orderBy('timestamp', 'desc'),
        startAfter(lastFetchedListing),
        limit(10)
      )

      // Execute query
      const querySnap = await getDocs(q)

      const lastVisible = querySnap.docs[querySnap.docs.length - 1]
      setLastFetchedListing(lastVisible)

      const listings = []

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        })
      })

      setListings((prevState) => [...prevState, ...listings])
      setLoading(false)
    } catch (error) {
      toast.error("Ro'yhatlarni olib kelib bo'lmadi")
    }
  }

  return (
    <div className="mb-5">
      <div className="text-sm breadcrumbs px-5">
        <ul className="flex flex-wrap text-xl">
          <li>
            <Link to="/">{t('home')}</Link>
          </li>
          <li className="font-medium">{t('categories')}</li>
        </ul>
      </div>
      <div className="my-10">
        <h4 className="font-bold text-sm sm:text-md md:text-lg italic text-orange-400 capitalize text-center md:text-left">
          - {t(params.categoryName)}
        </h4>
        <h2 className="title mt-5 mb-16 w-full lg:w-4/5 xl:w-full text-center md:text-left capitalize">
          {(params.categoryName === 'top' && currentLangCode === 'uz') ||
          (params.categoryName === 'toys' && currentLangCode === 'uz')
            ? `${t(params.categoryName)} ${t('explore')}`
            : currentLangCode === 'uz'
            ? `${t(params.categoryName)} ${t('products')} ${t('explore')}`
            : params.categoryName === 'top' && currentLangCode === 'ru'
            ? 'Просмотр лучших продуктов'
            : `${t('explore')} ${t('products')} ${
                t(params.categoryName) === 'личная гигиена'
                  ? 'личной гигиены'
                  : params.categoryName === 'top'
                  ? 'Просмотр лучших продуктов'
                  : t(params.categoryName)
              } `}
        </h2>
      </div>

      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <div className="my-10">
            <ul className="p-0 flex flex-wrap gap-10">
              {!loading &&
                (listings ? (
                  <ListMotion items={listings} blog={false} />
                ) : (
                  <p>No listings</p>
                ))}
            </ul>
          </div>

          <br />
          <br />
          {listings.length > 10 && (
            <button
              className="block mt-16 mx-auto w-fit text-xs lg:text-lg bg-red-700 text-white w-full p-4 sm:p-5 uppercase font-bold text-center rounded-3xl"
              onClick={onFetchMoreListings}
            >
              {t('view_more')}
            </button>
          )}
        </>
      ) : (
        <p className="text-center mx-auto my-10 w-max">
          {params.categoryName.toUpperCase().replace('-', ' ')} uchun ro'yxatlar
          yo'q
        </p>
      )}
    </div>
  )
}

export default Category
