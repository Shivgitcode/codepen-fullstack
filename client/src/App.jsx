import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Codepen from "./pages/Codepen"
import { Suspense } from "react"
import Saved from "./pages/Saved"


function App() {


  return (
    <div className="overflow-x-hidden">

      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/codepen" element={<Codepen></Codepen>}></Route>
        <Route path="/codepen/:id" element={<Codepen></Codepen>}></Route>
        <Route path="/codepen/saved" element={<Saved></Saved>}></Route>
      </Routes>


    </div>


  )

}

export default App
