import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom"

export default function ChangePassword() {
    const [password,setPassword]=useState()
    const [token,setToken]=useState()
    const {search}=useLocation()
    const query=new URLSearchParams(search)
    useEffect(()=>{
        setToken(query.get("token"))
    },[])
    const navigate=useNavigate()
    

    
    const submitNewPass=async()=>{
        const response=await fetch("http://localhost:5000/api/v1/changepassword",{
            method:"POST",
            credentials:"include",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({token,password})
        })
        if(response.ok){
            const res=await response.json()
            console.log(res)
            navigate("/login")
            toast.success(res.message)
            
        }
        else{
            const res=await response.json()
            console.log(res.data)
        }
        
    }
  return (
    <div>
        <div className="w-full ml-[30%] mt-[15%]">
            <div className=" bg-[#1e1f26] rounded-lg p-[30px] max-w-[500px] min-h-[300px] flex flex-col items-center gap-5">
                <h2 className=" font-bold text-[32px]">Enter New Password </h2>
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
                    <input type="password" className="grow" placeholder="Password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                </label>
                
                <button className="btn btn-outline font-medium text-[20px] mt-6" onClick={submitNewPass} >reset password</button>
            </div>

        </div>
    

      
    </div>
  )
}
