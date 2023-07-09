import React, { useEffect, useRef, useState } from "react";
import botIcon from "../assets/auto.png";
import userIcon from "../assets/user.png";

interface chattexts {
  owner: string;
  text: string;
  timeStamp: Date | string;
}

export default function Chat() {
  const [chatText, setChatText] = useState<string>("");
  const [alertInfoFlag, setalertInfoFlag] = useState<[boolean, string]>([
    false,
    "",
  ]);
  const [chatRepliesSet, setChatRepliesSet] = useState<chattexts[]>([
    {
      owner: "bot",
      text: "Hey! How are your doing?",
      timeStamp: new Date().toISOString(),
    },
    {
      owner: "user",
      text: "Hello",
      timeStamp: new Date().toISOString(),
    },
  ]);
  const [showStopResponding, setShowStopResponding] = useState<boolean>(false);

  const lastChatRef = useRef<HTMLDivElement>(null);

  const onSendHandler = () => {
    if (chatText.length) {
      setChatRepliesSet([
        ...chatRepliesSet,
        {
          owner: "user",
          text: chatText,
          timeStamp: new Date().toISOString(),
        },
      ]);
      setChatText("");
      setShowStopResponding(true);
    } else {
      setalertInfoFlag([true, "Can't Send Empty Text!"]);
    }
  };

  const handleStopResp = () => {
    setShowStopResponding(false);
  };

  useEffect(() => {
    lastChatRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [chatRepliesSet]);

  return (
    <>
      <div className=" w-full flex flex-col justify-between">
        {alertInfoFlag[0] ? (
          <p className="fixed right-[35%] mt-7 py-1 px-4 bg-red-600 text-white rounded-xl">
            {alertInfoFlag[1]}
            <button
              className="ml-2 text-black pb-1"
              onClick={() => {
                setalertInfoFlag([false, ""]);
              }}
            >
              x
            </button>
          </p>
        ) : (
          <></>
        )}

        <div className=" overflow-scroll scroll h-auto">
          {chatRepliesSet.map((ele, index) => (
            <div
              key={index}
              className={`text-white m-14 w-2/3 py-3 my-2 items-center flex flex-row+ ${
                ele.owner === "bot"
                  ? " bg-hypMedPurple rounded-e-3xl rounded-tl-3xl "
                  : " bg-hypDarkPurple rounded-s-3xl rounded-tr-3xl justify-end float-right"
              }`}
            >
              {ele.owner === "bot" && (
                <img
                  className="w-10 mx-3 bg-white rounded-xl"
                  src={botIcon.src}
                />
              )}
              <p className="ms-3">{ele.text}</p>
              {ele.owner === "user" && (
                <img
                  className="w-10 mx-3 bg-white rounded-xl"
                  src={userIcon.src}
                />
              )}
              <div
                ref={index === chatRepliesSet.length - 1 ? lastChatRef : null}
              />
            </div>
          ))}
        </div>
        {showStopResponding && (
          <button
            onClick={() => handleStopResp()}
            className="text-hypLightPurple fixed top-[83%] left-[50%] border-solid border-hypLightPurple border-2 rounded-lg px-4"
          >
            ▣ Stop Responding
          </button>
        )}
        <div className="grid grid-cols-12 gap-3 mx-10 my-11">
          <div className="col-span-10">
            <input
              className="w-full px-4 rounded-lg py-2 border-solid border-hypLightPurple border-2 "
              onChange={(e) => {
                setChatText(e.target.value);
                setalertInfoFlag([false, ""]);
              }}
              value={chatText}
              onKeyDown={(e) => (e.key === "Enter" ? onSendHandler() : "")}
            />
          </div>
          <div className="mx-1 flex flex-row">
            <button
              className="text-white me-3 bg-hypLightPurple px-8 rounded-lg py-2 focus:bg-violet-950"
              onClick={(e) => onSendHandler()}
              disabled={showStopResponding}
            >
              Send
            </button>
            <button className="text-white bg-slate-700 px-8 rounded-lg py-2">
              {" "}
              Clear
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
