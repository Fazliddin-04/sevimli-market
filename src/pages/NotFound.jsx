import { FaHome } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function NotFound() {
  const { t } = useTranslation()

  return (
    <div className="hero">
      <div className="text-center hero-content">
        <div className="max-w-lg">
          <h1 className="text-8xl mb-8 font-bold">{t('oops')}!</h1>
          <p className="text-5xl mb-8">404 - {t('page_not_found')}!</p>
          <Link to="/" className="btn btn-primary btn-lg">
            <FaHome className="mr-2" />
            {t('back_to_home')}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
