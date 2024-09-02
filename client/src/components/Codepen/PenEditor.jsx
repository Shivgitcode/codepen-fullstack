import { pencard } from "../../utils";
import { useCodeStore } from "../../zustand/codeStore";
import PenCard from "./PenCard";

export default function PenEditor() {
    const { onePen } = useCodeStore((state) => ({
        onePen: state.onePen
    }))
    return (
        <div className="flex justify-between gap-6  w-full px-6 bg-black">
            {pencard.map(pen => (
                <PenCard pen={pen} onePen={onePen}></PenCard>
            ))}
        </div>
    )
}
