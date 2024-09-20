import { Navigate, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Main from "./pages/Main"
import { Toaster } from "react-hot-toast"
import { useAuthContext } from "./hooks/useAuthContext"

type Props = {}

const App = ({}: Props) => {
  const {user} = useAuthContext().state;
  return (
    <>
    <Routes>
      
      <Route path="/" element={user ? <Main/>: <Navigate to="/login"/>}/>
      <Route path="/login" element={!user ? <Login/> : <Navigate to="/"/>}/>
      <Route path="/signup" element={!user ? <Signup/> : <Navigate to="/"/>}/>
    </Routes>
    <Toaster
          position="top-right"
          reverseOrder={false}
        />
    </>
  )
}

export default App