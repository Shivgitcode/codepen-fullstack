import { useParams } from "react-router-dom";
import Display from "./Display";
import Header from "./Header";
import PenEditor from "./PenEditor";
import { useCodeStore } from "../../zustand/codeStore";
import { useEffect, useState } from "react";

export default function CodePenComponent() {
  const params = useParams();
  const [penTitle, setPenTitle] = useState("");
  const { setLang, setMyLangs } = useCodeStore((state) => ({
    setLang: state.setLang,
    setMyLangs: state.setMyLangs,
  }));
  useEffect(() => {
    const fetchOne = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/codepen/${params.id}`,
        {
          method: "POST",
          mode: "cors",
          credentials: "include",
        },
      );
      if (response.ok) {
        const data = await response.json();
        setLang(data.pen.pens[0]);
        setMyLangs(data.pen.pens[0]);
        setPenTitle(data.pen.pens[0].title);
      } else {
        const data = await response.json();
        console.log(data);
      }
    };
    if (params.id) {
      fetchOne();
    } else {
      setMyLangs({ html: "", css: "", js: "" });
    }
  }, [params.id, setLang, setMyLangs]);

  return (
    <div>
      <Header penName={penTitle}></Header>
      <PenEditor></PenEditor>
      <Display></Display>
    </div>
  );
}
