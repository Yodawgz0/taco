import Chat from "@/components/Chat";
import SideBar from "@/components/SideBar";
import React from "react";

export default function HomePage() {
  return (
    <>
      <div
        className="bg-hypBlack h-screen flex flex-row
      "
      >
        <SideBar />
        <Chat />
      </div>
    </>
  );
}
