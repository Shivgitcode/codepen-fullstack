import { pencard } from "../../utils";
import PenCard from "./PenCard";

export default function PenEditor() {
    return (
        <div className="flex  w-full">
            {pencard.map(pen => (
                <PenCard pen={pen}></PenCard>
            ))}
        </div>
    )
}
