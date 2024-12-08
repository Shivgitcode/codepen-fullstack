import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Codepen from "./pages/Codepen";
import Saved from "./pages/Saved";
import Reset from "./pages/Reset";
import ChangePassword from "./components/Auth/ChangePassword";
import Otp from "./components/Auth/Otp";
import OtpVerification from "./pages/OtpVerification";

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
        <Route path="/reset" element={<Reset></Reset>}></Route>
        <Route
          path="/otp"
          element={<OtpVerification></OtpVerification>}
        ></Route>
        <Route
          path="/changepass"
          element={<ChangePassword></ChangePassword>}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
