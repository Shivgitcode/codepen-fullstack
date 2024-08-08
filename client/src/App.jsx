import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Navbar from "./components/Navbar"
import Codepen from "./pages/Codepen"


function App() {


  return (
    <div className="overflow-x-hidden">
      < >
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/signup" element={<Signup></Signup>}></Route>
          <Route path="/codepen" element={<Codepen></Codepen>}></Route>
        </Routes>
      </>

    </div>


  )

}

export default App
