import { useLayoutEffect, useState } from "react"
import { FaRegBookmark } from "react-icons/fa";
import { AppContext } from "../../AppContext/AppContextProvider";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { GrView } from "react-icons/gr";

export default function SavedPens() {
    const [saved, setSaved] = useState([])
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
    useLayoutEffect(() => {
        const fetchSaved = async () => {
            const response = await fetch("http://localhost:5000/api/v1/codepen/savepen", {
                method: "GET",
                mode: "cors",
                credentials: "include"

            })

            if (response.ok) {
                const res = await response.json()
                setSaved(res.data)
                console.log(res)
            }
            else {
                const res = await response.json()
                console.log(res)
            }
        }
        fetchSaved()

    }, [])
    return (
        <div className="flex mt-[80px] ml-[120px] gap-8 flex-wrap">
            {saved.map(el => (
                <>
                    <div className="card card-compact bg-base-100 w-96 shadow-xl mb-5">

                        <>
                            <figure>
                                <iframe srcDoc={tempFunc(el.pen.html, el.pen.css, el.pen.js)} sandbox="allow-scripts" title="Output" className="w-full"></iframe>
                                {/* <img
                                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                                    alt="Shoes" /> */}
                            </figure>

                        </>



                        <div className="card-body">
                            <h2 className="card-title">{el.title}</h2>
                            <p>{el.pen.user.username}</p>
                            <details className="dropdown ml-auto">
                                <summary className="btn m-1"><BsThreeDotsVertical></BsThreeDotsVertical></summary>
                                <ul className="menu dropdown-content bg-base-100 gap-2 rounded-box z-[1] w-52 p-2 shadow">
                                    {/* <li><button className="btn justify-start gap-3" onClick={() => deletePen(el.pen)}><MdDeleteOutline color="red" fontSize={20}></MdDeleteOutline> Delete Pen</button></li> */}
                                    <li><button className="btn justify-start gap-3" onClick={() => navigate(`/codepen/${el.penId}`)}><GrView color="blue" fontSize={20}></GrView> View Pen</button></li>
                                    {/* <li><button className="btn justify-start gap-3" onClick={() => bookmarkPen(el.id)}><FaRegBookmark color="green" fontSize={20}></FaRegBookmark> Bookmark Pen</button></li> */}
                                </ul>
                            </details>
                        </div>
                    </div>
                </>

            ))}

        </div>
    )
}
