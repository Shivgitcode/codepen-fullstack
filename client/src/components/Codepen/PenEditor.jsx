import { pencard } from "../../utils";
import PenCard from "./PenCard";

export default function PenEditor() {
    return (
        <div className="flex justify-between gap-6  w-full px-6 bg-black">
            {pencard.map(pen => (
                <PenCard pen={pen}></PenCard>
            ))}
        </div>
    )
}
