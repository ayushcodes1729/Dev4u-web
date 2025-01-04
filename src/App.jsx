import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./Components/Navbar"
import MainLayout from "./Layouts/MainLayout"
import Login from "./Pages/Login"
import Profile from "./Pages/Profile"
import HomePage from "./Pages/HomePage"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout/>}>
            <Route path="/" element={<HomePage/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/profile" element={<Profile/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
