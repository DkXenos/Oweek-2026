import Image from "next/image";
import Homepage from "./homepage/page";
import Navbar from "../app/components/navbar";

export default function Home() {
  return (
    <>
      <Navbar /> {/*diubah nanti kalau mau push*/}
      <div className="homepage-container w-screen h-screen">
        <Homepage />
      </div>
    </>
  );
}
