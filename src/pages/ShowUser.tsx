import { useEffect } from "react";

// import { useNavigate } from "react-router";
// import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { deleteData, getDataList } from "../redux/dataSlice/dataHanlder";
import { dataTypes } from "../types/types";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const ShowUser = () => {
  const dispatch = useAppDispatch();
    const navigate = useNavigate();

  //   const [isSearching, setIsSearching] = useState(false);

  const data = useAppSelector((state) => state.data.dataList);

  const loading = useAppSelector((state) => state.data.loading);
  // const error = useAppSelector((state) => state.employee.error);

    const showConfirmationDialog = async (title: string, text: string) => {
      const result = await Swal.fire({
        title: title || "Are you sure?",
        text: text || "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) { 
        await Swal.fire({
          title: "Deleted!",
          text: "Employee has been deleted.",
          icon: "success",
        });
      }
      return result.isConfirmed;
    };

    const deleteHandle = async (id:string) => {
      const confirmed = await showConfirmationDialog(
        'Delete User',
        'Are you sure you want to delete this user?',
      );
      if (confirmed) {
        dispatch(deleteData(id));
      }
    };

    const updateHandle = (id: string) => {
      navigate(`/update/${id}`);
    };

    // const handleSearch: React.FormEventHandler<HTMLInputElement> = (
    //   e: FormEvent<HTMLInputElement>
    // ) => {
    //   const query = (e.target as HTMLInputElement).value;
    //   dispatch(searchEmployee(query));
    //   setIsSearching(query.length > 0);
    // };

  useEffect(() => {
    dispatch(getDataList());
  }, [dispatch]);

  return (
    <>
      <p className="form-header">Employee Details</p>
      {
        // error ? (
        //   <h2>{error?.message}</h2>
        // ) :
        <>
          {/* <div className="search-container">
            <label className="search-label" htmlFor="search">
              Search{" "}
            </label>
            <input
            //   onChange={handleSearch}
              className="search-input"
              id="search"
              type="text"
              placeholder="search employee by name"
            />
          </div> */}
          <div className="item-container p-4">
            <table className="item-table w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 border text-center">No</th>
                  <th className="px-4 py-2 border text-center">Firstname</th>
                  <th className="px-4 py-2 border text-center">Lastname</th>
                  <th className="px-4 py-2 border text-center">Number</th>
                  <th className="px-4 py-2 border text-center">Class</th>
                  <th className="px-4 py-2 border text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr className="text-center">
                    <td colSpan={6} className="py-4 text-center">
                      Loading...
                    </td>
                  </tr>
                ) : data?.length > 0 ? (
                  data?.map((item: dataTypes, index: number) => (
                    <tr key={item.id} className="border-b">
                      <td className="px-4 py-2 text-center">{index + 1}</td>
                      <td className="px-4 py-2 text-center">{item.fname}</td>
                      <td className="px-4 py-2 text-center">{item.lname}</td>
                      <td className="px-4 py-2 text-center">{item.pnumber}</td>
                      <td className="px-4 py-2 text-center">{item.class}</td>
                      <td className="px-4 py-2 text-center">
                        <button
                          className="delete-button bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded mr-2"
                          onClick={() => deleteHandle(item.id)}
                        >
                          Delete
                        </button>
                        <button
                          className="update-button bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded"
                          onClick={() => updateHandle(item.id)}
                        >
                          Update
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
  );
};

export default ShowUser;
