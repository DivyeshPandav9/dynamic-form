 import { useNavigate, useParams } from 'react-router'
import { useAppSelector } from '../redux/hooks'

const ViewMore = () => {
  const { id } = useParams()
  console.log(id)

  const data = useAppSelector((state) => state.data.dataList)
  // console.log(data);
  interface DynamicData {
    [key: string]: string | number | boolean | null | undefined // Define the possible value types
  }
  const newData = data.find(
    (data: { id: string | undefined }) => data.id === id
  ) as unknown as DynamicData
  //   console.log(newData)

  const navigate = useNavigate()

  const goBack = () => {
    navigate('/show')
  }
  if (!newData) {
    return <h2>No data found</h2>
  }

  const entries = Object.entries(newData)

  return (
    <div>
      <div className="px-4 sm:px-12">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          {`${newData.fname} ${newData.lname}`}
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          More details and information
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100 sm:px-12">
        <dl className="divide-y divide-gray-100">
          {entries.map(([key, value], index) => (
            <div
              className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
              key={index}
            >
              <dt className="text-mm font-medium leading-6 text-gray-900">
                {key}
              </dt>
              <dd className="mt-1 text-mm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {value as string}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <button
        className="mt-4 ml-10 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
        onClick={goBack}
      >
        Go Back
      </button>
    </div>
  )
}

export default ViewMore
