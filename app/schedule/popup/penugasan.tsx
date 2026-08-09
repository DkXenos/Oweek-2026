import "./ketentuan_penugasan.css";
import type { PopupSection } from "../../../lib/schedule-data";
import SectionBody from "./section-body";

export default function Penugasan({ data }: { data: PopupSection }) {
    return <SectionBody data={data} />;
}
