import './App.css';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import AddFieldForm from './pages/AddFieldForm';
import DynamicForm from './pages/DynamicForm';
import ShowUser from './pages/ShowUser';
import NavigationBar from './components/NavigationBar';
import UpdateData from './pages/UpdateData';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<NavigationBar/>}>
        <Route path="*" element={<h2>404 page not found</h2>} />
        <Route path="/" element={<AddFieldForm/>} />
        <Route path="/dynamic" element={<DynamicForm/>} />
        <Route path="/show" element={<ShowUser/>} />       
        <Route path="/update/:id" element={<UpdateData/>} />       
      </Route>,
    ),
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
export default App;
