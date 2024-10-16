import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
export default function SignupPage() {
    const [signupDetails, setSignupDetails] = useState({ email: "", username: "", password: "" })
    const navigate = useNavigate()
    const handleSignup = (e) => {
        setSignupDetails((prev) => {
            return { ...prev, [e.target.name]: e.target.value }

        })
        console.log(signupDetails)
    }
    const submitForm = async () => {

        const response = async () => {
            await fetch("http://localhost:5000/api/v1/signup", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },

                credentials: "include",
                body: JSON.stringify(signupDetails)

            })
            if (response.ok) {
                const data = await response.json()
                navigate("/login")
                return data

                console.log(data)
            }

        }
        return toast.promise(response(), {
            loading: 'Loading...',
            success: (data) => `${data.data}`,
            error: (err) => `Error:${err.toString()}`
        })
    }
    return (
        <div className="w-full ml-[30%] mt-[15%]">
            <div className=" bg-[#1e1f26] rounded-lg p-[30px] max-w-[500px] min-h-[300px] flex flex-col items-center gap-5">
                <h2 className=" font-bold text-[32px]">Sign up</h2>
                <label className="input input-bordered flex items-center gap-2 w-[80%]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path
                            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input type="text" className="grow" placeholder="Email" name="email" onChange={handleSignup} />
                </label>
                <label className="input input-bordered flex items-center gap-2 w-[80%]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input type="text" className="grow" placeholder="Username" name="username" onChange={handleSignup} />
                </label>
                <label className="input input-bordered flex items-center gap-2 w-[80%]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            fillRule="evenodd"
                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                            clipRule="evenodd" />
                    </svg>
                    <input type="password" className="grow" placeholder="Password" name="password" onChange={handleSignup} />
                </label>
                <p className="w-full text-right pr-12 mt-[-12px]">Already Have an account ? <Link to="/login" className=" text-blue-600">Login</Link></p>
                <button className="btn btn-outline font-medium text-[20px] mt-6" onClick={submitForm}>Sign Up</button>
            </div>

        </div>
    )
}
