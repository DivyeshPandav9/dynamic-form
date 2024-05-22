import './App.css'

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import AddFieldForm from './pages/AddFieldForm'
import DynamicForm from './pages/DynamicForm'
import ShowUser from './pages/ShowUser'
import NavigationBar from './components/NavigationBar'
import RemoveField from './pages/RemoveField'
import Signin from './pages/Signin'
import Login from './pages/Login'
import withAuth from './hoc/withAuth'
import ViewMore from './pages/ViewMore'
import Cursor from './components/Cursor'

const ProtectedAddFieldForm = withAuth(AddFieldForm)
const ProtectedDynamic = withAuth(DynamicForm)
const ProtectedShowuser = withAuth(ShowUser)
const ProtectedRemove = withAuth(RemoveField)

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      
      <Route element={<NavigationBar />}>
        <Route path="*" element={<h2>404 page not found</h2>} />
        <Route path="/" element={<ProtectedAddFieldForm />} />
        <Route path="/dynamic" element={<ProtectedDynamic />} />
        <Route path="/show" element={<ProtectedShowuser />} />
        <Route path="/removeField" element={<ProtectedRemove />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/login" element={<Login />} />
        <Route path='/viewmore/:id' element={<ViewMore/>}/>
      </Route>
    )
  )
  return (
    <>
    <Cursor/>
      <RouterProvider router={router} />
    </>
  )
}
export default App
