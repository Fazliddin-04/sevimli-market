import { useTranslation } from 'react-i18next'
import { FaRegTrashAlt, FaRegEdit } from 'react-icons/fa'

function ListingItem({
  title,
  category,
  timestamp,
  imgUrl,
  id,
  onEdit,
  onDelete,
}) {
  const { t } = useTranslation()
  return (
    <div className="flex items-end flex-col my-5 w-full sm:w-auto">
      {onDelete && (
        <div className="flex items-center gap-5 text-center p-4 rounded-t-box border-b-0 border border-black dark:border-white">
          <div className="" onClick={() => onDelete(id, title)}>
            <FaRegTrashAlt />
          </div>
          {onEdit && (
            <div className="" onClick={() => onEdit(id)}>
              <FaRegEdit />
            </div>
          )}
        </div>
      )}
      <div className="card card-bordered w-full rounded-tr-none dark:border-white lg:card-side transition hover:shadow-lg">
        <figure className="flex items-center justify-center h-48 p-2">
          <img src={imgUrl[0]} alt={title} className="object-cover h-full" />
        </figure>
        <div className="card-body flex-1">
          <h2 className="card-title flex-1 ">
            {t(title).length > 50 ? t(title).slice(0, 30) + '...' : t(title)}
            {new Date(timestamp.seconds * 1000).toLocaleDateString('en') ===
              new Date().toLocaleDateString('en') && (
              <div className="badge mx-2 badge-secondary uppercase">{t('new')}</div>
            )}
          </h2>
          <div className="card-actions">
            <div className="badge bg-red-600 text-white capitalize p-4 text-md">
              {t(category).replace(/-/g, ' ')}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListingItem
