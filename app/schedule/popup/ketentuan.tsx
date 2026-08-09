import "./ketentuan_penugasan.css";
import type { PopupSection } from "../../../lib/schedule-data";
import SectionBody from "./section-body";

export default function Ketentuan({ data }: { data: PopupSection }) {
    return <SectionBody data={data} />;
}
