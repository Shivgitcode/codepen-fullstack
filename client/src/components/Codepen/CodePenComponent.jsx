import Display from "./Display";
import Header from "./Header";
import PenEditor from "./PenEditor";

export default function CodePenComponent() {
    return (
        <div>
            <Header></Header>
            <PenEditor></PenEditor>
            <Display></Display>
        </div>
    )
}
