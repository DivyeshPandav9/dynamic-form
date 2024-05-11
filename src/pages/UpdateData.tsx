import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectData, updateData } from "../redux/dataSlice/dataHanlder";
import { dataTypes } from "../types/types";

const UpdateData = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // Get ID from URL parameters

  useEffect(() => {
    // Fetch data based on ID when the component mounts

    dispatch(selectData(id || ""));
  }, [dispatch, id]);

  const data = useAppSelector((state) => state.data.updateList);
  console.log(data);
  
  //   const [validationMessages, setValidationMessages] = useState<Record<string, string>>({});

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    // Construct form values object
    const formValues: Record<string, string> = {};
    formData.forEach((value, key) => {
      formValues[key] = value as string;
    });

    // Dispatch action to update data
    dispatch(updateData(formValues, id || ""))
      .then(() => {
        // Handle successful update - navigate to show page or handle as per your requirement
        navigate("/show");
      })
      .catch((error) => {
        // Handle error
        console.error("Error updating data:", error);
      });
  };

  return (
    <>
      <div className="border max-w-md mx-auto p-8 rounded-lg mt-8">
        <h1 className="text-2xl font-bold mb-4 text-center mt-4">
          Dynamic Form
        </h1>
        <form
          className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg"
          onSubmit={handleSubmit}
        >
          {data.length > 0 ? (
            data?.map((field: dataTypes, index: number) => (
              <div key={index} className="mb-1  p-1 rounded-md">
                <label
                  htmlFor={field.fname}
                  className="block text-gray-700 font-medium mb-1"
                >
                  {field.label || field.fname}
                </label>

                {field.type === "select" && field?.options ? (
                  <select
                    id={field.fname}
                    name={field.fname}
                    required={field.required}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  >
                    {field.options.map((option: { value: string }) => (
                      <option key={option.value} value={option.value}>
                        {option.value}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={field.fname}
                    type={field.type}
                    name={field.fname}
                    placeholder={field.placeholder}
                    required={field.required}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  />
                )}

                {/* {validationMessages[field.name] && (
                  <span className="text-red-600">{validationMessages[field.name]}</span>
                )} */}
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
          <button
            type="submit"
            className="w-full px-3 py-2 bg-blue-500 text-white rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateData;
