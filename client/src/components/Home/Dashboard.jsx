import { useContext, useEffect, useState } from "react";
import { pens } from "../../utils";
import { FaRegBookmark } from "react-icons/fa";
import { AppContext } from "../../AppContext/AppContextProvider";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { GrView } from "react-icons/gr";
import toast from "react-hot-toast";
export default function Dashboard() {
    const { isLoggedIn, setIsLoggedIn, jwtToken } = useContext(AppContext)
    const [penData, setPenData] = useState([])
    const navigate = useNavigate()
    console.log(jwtToken)
    console.log(isLoggedIn)
    if (jwtToken) {
        setIsLoggedIn(true)
    }
    else (
        navigate("/login")
    )

    const tempFunc = (html, css, js) => {
        const template = `
             <html>
            <head>
                <style>
                    ${css}
                </style>
            </head>
            
            <body>
                ${html}


                <script>
                    ${js}
                </script>
            </body>
            
        </html>
        
        `

        return template
    }

    useEffect(() => {

        const fetchData = async () => {
            const response = await fetch("http://localhost:5000/api/v1/codepen", {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",


            })
            if (response.ok) {
                const data = await response.json()
                console.log(data)
                setPenData(data.data)
            }
            else {
                const data = await response.json()
                console.log(data)
            }
        }

        fetchData()



    }, [])

    console.log(isLoggedIn)
    const deletePen = async (id) => {
        console.log("hello", id)
        setPenData(prev => {
            return prev.filter(el => el.id != id)
        })
        const response = await fetch(`http://localhost:5000/api/v1/codepen/${id}`, {
            method: "DELETE",
            mode: "cors",
            credentials: "include"
        })
        if (response.ok) {
            const data = await response.json();
            toast.success(data.message)
        }
        else {
            const data = await response.json();
            toast.error(data.message)
        }


    }

    const bookmarkPen = async (id) => {
        console.log(id)
        const response = await fetch(`http://localhost:5000/api/v1/codepen/savepen/${id}`, {
            method: "POST",
            mode: "cors",
            credentials: "include",

        })
        if (response.ok) {
            const res = await response.json()
            console.log(res)
        }
        else {
            const res = await response.json()
            console.log(res)
        }

    }
    console.log(penData)

    return (
        <div className="w-full flex flex-col ">
            <div>
                <label className="input input-bordered flex items-center gap-2 w-[70%] ml-[80px] mt-10">
                    <input type="text" className="grow" placeholder="Search" />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd" />
                    </svg>
                </label>

            </div>

            {
                isLoggedIn ? <div className="flex flex-row flex-wrap w-[70%] ml-[80px] justify-between mt-10">
                    {penData.map(el => (
                        <>
                            <div className="card card-compact bg-base-100 w-96 shadow-xl mb-5">

                                <>
                                    <figure>
                                        <iframe srcDoc={tempFunc(el.html, el.css, el.js)} sandbox="allow-scripts" title="Output" className="w-full"></iframe>
                                        {/* <img
                                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                                    alt="Shoes" /> */}
                                    </figure>

                                </>



                                <div className="card-body">
                                    <h2 className="card-title">{el.title}</h2>
                                    <p>{el.user.username}</p>
                                    <details className="dropdown ml-auto">
                                        <summary className="btn m-1"><BsThreeDotsVertical></BsThreeDotsVertical></summary>
                                        <ul className="menu dropdown-content bg-base-100 gap-2 rounded-box z-[1] w-52 p-2 shadow">
                                            <li><button className="btn justify-start gap-3" onClick={() => deletePen(el.id)}><MdDeleteOutline color="red" fontSize={20}></MdDeleteOutline> Delete Pen</button></li>
                                            <li><button className="btn justify-start gap-3" onClick={() => navigate(`/codepen/${el.id}`)}><GrView color="blue" fontSize={20}></GrView> View Pen</button></li>
                                            <li><button className="btn justify-start gap-3" onClick={() => bookmarkPen(el.id)}><FaRegBookmark color="green" fontSize={20}></FaRegBookmark> Bookmark Pen</button></li>
                                        </ul>
                                    </details>
                                </div>
                            </div>
                        </>

                    ))}
                </div> : <p className="w-full flex flex-col mt-[20%] ml-[-8%] font-bold text-[32px] items-center ">login to see your saved pens <Link to="/login" className="text-blue-600">Login</Link></p>
            }


        </div>
    )
}
