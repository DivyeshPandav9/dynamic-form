import { NavLink, Outlet } from 'react-router-dom';

const NavigationBar = () => {
  const auth = localStorage.getItem('token');

  return (
    <>
      {auth ? (
        <>
          <div className="navbar bg-gradient-to-r from-blue-500 to-purple-500 p-4">
            <div className="flex justify-between items-center">
              <div className="flex space-x-4">
                <NavLink  to="/" className="text-white font-semibold" >Home</NavLink>
                <NavLink  to="/dynamic" className="text-white font-semibold" >Dynamic</NavLink>
                <NavLink  to="/show" className="text-white font-semibold" >Show</NavLink>
              </div>
              <button className="logout-button bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded">
                Logout
              </button>
            </div>
          </div>

          <Outlet />
        </>
      ) : (
        <>
          <div className="navbar bg-gray-800 p-4">
            <div className="flex space-x-4">
              <NavLink to="/signup" className="text-white font-semibold" >Signup</NavLink>
              <NavLink to="/login" className="text-white font-semibold" >Login</NavLink>
            </div>
          </div>
          <Outlet />
        </>
      )}
    </>
  );
};
export default NavigationBar;
