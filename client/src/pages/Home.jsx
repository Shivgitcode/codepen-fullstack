import { Suspense } from "react";
import Dashboard from "../components/Home/Dashboard";
import Wrapper from "../components/Home/Wrapper";

export default function Home() {
    return (
        <div>
            <Wrapper>

                <Dashboard></Dashboard>
            </Wrapper>



        </div>
    )
}
