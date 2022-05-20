import { Link } from 'react-router-dom'
import { FaRegTrashAlt, FaRegEdit } from 'react-icons/fa'

function ListingItem({
  listing,
  id,
  onEdit,
  onDelete,
}) {
  return (
    <div className="flex items-end flex-col my-5">
      {onDelete && (
        <div className="flex items-center gap-5 text-center p-4 rounded-t-box border-b-0 border border-black dark:border-white">
          <div className="" onClick={() => onDelete(listing.id, listing.name)}>
            <FaRegTrashAlt />
          </div>
          {onEdit && (
            <div className="" onClick={() => onEdit(id)}>
              <FaRegEdit />
            </div>
          )}
        </div>
      )}
      <Link
        to={`/category/${listing.type}/${id}`}
        className={`card card-bordered rounded-tr-none dark:border-white card-side h-40 transition hover:shadow-lg`}
      >
        <figure className="flex items-center justify-center">
          <img
            src={listing.imgUrl}
            alt={listing.name}
            className="object-cover h-full"
          />
        </figure>
        <div className={`card-body flex-1`}>
          <h2 className="card-title flex-1 ">
            {listing.name.length > 30
              ? listing.name.slice(0, 30) + '...'
              : listing.name}
            {new Date(listing.timestamp.seconds * 1000).toLocaleDateString(
              'en'
            ) === new Date().toLocaleDateString('en') && (
              <div className="badge mx-2 badge-secondary uppercase">yangi</div>
            )}
          </h2>
          <div className="card-actions">
            <div className="badge bg-red-600 text-white capitalize p-3">
              {listing.type.replace(/-/g, ' ')}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ListingItem
