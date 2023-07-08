import React from "react";

export default function Chat() {
  return (
    <>
      <div className="text-hypLightPurple w-full flex flex-col justify-between">
        <div className="">This is top section</div>
        <div className="bg-hypDarkPurple flex flex-row">
          <div>
            <input className="px-4" />
          </div>
          <div className="mx-4">
            <button> Send</button>
          </div>
        </div>
      </div>
    </>
  );
}
