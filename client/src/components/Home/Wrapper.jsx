import Home from "../../pages/Home";
import Dashboard from "./Dashboard";
import Navbar from "./Navbar";

export default function Wrapper({ children }) {
    return (
        <Navbar>
            {children}
        </Navbar>
    )
}
