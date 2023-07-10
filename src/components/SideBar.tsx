import React from "react";
import logo from "../assets/logo.png";

export default function SideBar() {
  return (
    <>
      <div className="bg-hypBlackLight  w-1/6 text-center">
        <img className="w-36 ms-6 mt-3" src={logo.src} />
      </div>
    </>
  );
}
