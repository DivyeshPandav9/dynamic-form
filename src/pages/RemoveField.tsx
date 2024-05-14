// import React from 'react'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { deleteField, getAllFieldData } from '../redux/slice/formHandler'
import { FieldInput } from '../types/types'
import { useNavigate } from 'react-router'
import Swal from 'sweetalert2'

const RemoveField = () => {
  const data = useAppSelector((state) => state.fieldData.empList)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAllFieldData())
  }, [dispatch])

  const navigate = useNavigate()
  const deleteHandle = (id: string) => {
    Swal.fire({
      title: 'Are you sure you want to delete this field?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteField(id))
        Swal.fire('Deleted!', 'The field has been deleted.', 'success')
        navigate('/dynamic')
      }
    })
  }

  return (
    <>
      {
        <>
          <h1 className="text-2xl font-bold mb-4 text-center mt-4">
            All Fields
          </h1>
          <div className="item-container p-4">
            <table className="item-table w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 border text-center">No</th>
                  <th className="px-4 py-2 border text-center">label</th>
                  <th className="px-4 py-2 border text-center">type</th>
                  <th className="px-4 py-2 border text-center">name</th>
                  <th className="px-4 py-2 border text-center">Placeholder</th>
                  <th className="px-4 py-2 border text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data?.length > 0 ? (
                  data?.map((item: FieldInput, index: number) => (
                    <tr key={index} className="border-b">
                      <td className="px-4 py-2 text-center">{index + 1}</td>
                      <td className="px-4 py-2 text-center">{item.label}</td>
                      <td className="px-4 py-2 text-center">{item.type}</td>
                      <td className="px-4 py-2 text-center">{item.name}</td>
                      <td className="px-4 py-2 text-center">
                        {item.placeholder}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <button
                          className="delete-button bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded mr-2"
                          onClick={() => deleteHandle(item.id || '')}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-4">
                      No data found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      }
    </>
  )
}

export default RemoveField
