import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { deleteData, getDataList } from '../redux/dataSlice/dataHanlder'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router'
// import { DataItem } from '../../types/types' // Ensure the correct path
import { DataItem } from '../types/types'
const ShowUser = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const data = useAppSelector((state) => state.data.dataList) as DataItem[]
  const loading = useAppSelector((state) => state.data.loading)

  const showConfirmationDialog = async (title: string, text: string) => {
    const result = await Swal.fire({
      title: title || 'Are you sure?',
      text: text || "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    })

    if (result.isConfirmed) {
      await Swal.fire({
        title: 'Deleted!',
        text: 'Employee has been deleted.',
        icon: 'success',
      })
    }
    return result.isConfirmed
  }

  const deleteHandle = async (id: string) => {
    const confirmed = await showConfirmationDialog('Delete User', 'Are you sure you want to delete this user?')
    if (confirmed) {
      dispatch(deleteData(id))
    }
  }

  const viewMoreHandle = (id: string) => {
    navigate(`/viewmore/${id}`)
  }

  useEffect(() => {
    dispatch(getDataList())
  }, [dispatch])

  return (
    <>
      <h1 className="text-2xl font-bold mb-4 text-center mt-4">All form Data</h1>
      <div className="item-container p-4">
        <table className="item-table w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border text-center">No</th>
              <th className="px-4 py-2 border text-center">Firstname</th>
              <th className="px-4 py-2 border text-center">Number</th>
              <th className="px-4 py-2 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr className="text-center">
                <td colSpan={6} className="py-4 text-center">Loading...</td>
              </tr>
            ) : data.length > 0 ? (
              data.map((item, index) => (
                <tr key={item.id} className="border-b">
                  <td className="px-4 py-2 text-center">{index + 1}</td>
                  <td className="px-4 py-2 text-center">{item.fname}</td>
                  <td className="px-4 py-2 text-center">{item.pnumber}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      className="delete-button bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded mr-2"
                      onClick={() => deleteHandle(item.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="delete-button bg-blue-500 hover:bg-red-600 text-white py-1 px-2 rounded mr-2"
                      onClick={() => viewMoreHandle(item.id)}
                    >
                      View More
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4">No data found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ShowUser

