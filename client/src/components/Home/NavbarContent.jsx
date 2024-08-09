import { Link } from "react-router-dom";
import { codepen } from "../../assets";
import { IoMdHome } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function NavbarContent() {
    const navigate = useNavigate()
    return (
        <div className="flex flex-col py-2 gap-5 mt-3">
            <img src={codepen} alt="" />
            <button className="btn btn-outline">Start coding</button>
            <button className="btn btn-ghost text-[20px]"><IoMdHome></IoMdHome>Home</button>

            <div className="flex flex-col gap-4 mt-4">
                <button className="btn btn-primary text-[20px]" onClick={() => navigate('/login')}>Login</button>
                <button className="btn btn-success text-[20px]" onClick={() => navigate("/signup")}>Signup</button>

            </div>

        </div>
    )
}
