import { useParams } from "react-router-dom";
import Display from "./Display";
import Header from "./Header";
import PenEditor from "./PenEditor";
import { useCodeStore } from "../../zustand/codeStore";
import { useEffect } from "react";

export default function CodePenComponent() {
    const params = useParams()
    const { setLang, setMyLangs } = useCodeStore((state) => ({
        setLang: state.setLang,
        setMyLangs: state.setMyLangs
    }))
    useEffect(() => {
        const fetchOne = async () => {
            const response = await fetch(`http://localhost:5000/api/v1/codepen/${params.id}`, {
                method: "POST",
                mode: "cors",
                credentials: "include",

            })
            if (response.ok) {
                const data = await response.json()
                setLang(data.pen.pens[0])
                setMyLangs(data.pen.pens[0])
                console.log(data.pen)
            }
            else {
                const data = await response.json()
                console.log(data)
            }
        }
        if (params.id) {
            fetchOne()
        } else {
            setMyLangs({ html: "", css: "", js: "" })
        }
    }, [])

    return (
        <div>
            <Header></Header>
            <PenEditor></PenEditor>
            <Display></Display>
        </div>
    )
}
