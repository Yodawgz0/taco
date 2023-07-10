import React, { useEffect, useRef, useState } from "react";
import botIcon from "../assets/auto.png";
import userIcon from "../assets/user.png";
import axios from "axios";

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
      text: "Hi! I am TACO: Terms And Conditions Oracle. What can I help you with ?",
      timeStamp: new Date().toISOString(),
    },
  ]);
  const [showStopResponding, setShowStopResponding] = useState<boolean>(false);

  const lastChatRef = useRef<HTMLDivElement>(null);
  function checkText(text: string) {
    const regex = /^[A-Za-z0-9 !??&_]+$/;
    if (text.length === 1 && (text === "!" || text === "?")) {
      return false;
    }
    return true;
  }

  const handleClear = () => {
    setChatRepliesSet([
      {
        owner: "bot",
        text: "Hi! I am TACO: Terms And Conditions Oracle, what can I help you with ?",
        timeStamp: dateFormatting(new Date().toISOString()),
      },
    ]);
  };

  useEffect(() => {}, [chatRepliesSet]);

  const onSendHandler = async () => {
    setalertInfoFlag([false, ""]);
    if (!checkText(chatText)) {
      setalertInfoFlag([true, "Please enter meaningful text!"]);
      return;
    }
    if (chatText.length) {
      setShowStopResponding(true);
      setChatRepliesSet([
        ...chatRepliesSet,
        {
          owner: "user",
          text: chatText,
          timeStamp: dateFormatting(new Date().toISOString()),
        },
      ]);
      setChatText("");
      const formData = new FormData();
      formData.append("message", chatText);

      axios
        .post("http://34.29.65.217:5000/taco-request", formData, {
          headers: {
            Authorization:
              "7a28fd58593f05e7297f8ca5fd04a36bef5723347d49c541bfb767cabd6c1016",
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          setChatRepliesSet([
            ...chatRepliesSet,
            {
              owner: "user",
              text: chatText,
              timeStamp: dateFormatting(new Date().toISOString()),
            },
            {
              owner: "bot",
              text: response.data,
              timeStamp: dateFormatting(new Date().toISOString()),
            },
          ]);

          setShowStopResponding(false);
        })
        .catch((error) => {
          console.error("Error:", error);
          setalertInfoFlag([true, "Something Went Wrong!"]);
        });
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

  const dateFormatting = (date: string) => {
    const formattedDate =
      new Date(date).getMonth() +
      "/" +
      new Date(date).getDate() +
      "/" +
      new Date(date).getFullYear() +
      " " +
      new Date(date).getHours() +
      ":" +
      new Date(date).getMinutes();
    return formattedDate;
  };

  return (
    <>
      <div className=" w-full flex flex-col justify-between ">
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

        <div className=" overflow-scroll scroll h-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          {chatRepliesSet.map((ele, index) => (
            <div
              key={index}
              className={`text-hypLightPurple m-14 w-2/3 py-3 my-2 items-center flex flex-row+ ${
                ele.owner === "bot"
                  ? " bg-hypMedPurple rounded-e-3xl rounded-tl-3xl "
                  : " bg-hypDarkPurple rounded-s-3xl rounded-tr-3xl justify-end float-right"
              }`}
            >
              {ele.owner === "bot" && (
                <div className="px-3 w-20">
                  <img
                    className="w-10 mx-3 bg-white rounded-xl"
                    src={botIcon.src}
                  />
                </div>
              )}
              <div className="p-3">
                {" "}
                <p className="ms-3">{ele.text}</p>
              </div>

              {ele.owner === "user" && (
                <div className="">
                  {" "}
                  <img
                    className="w-10 mx-3 bg-white rounded-xl"
                    src={userIcon.src}
                  />
                  <p className="mt-1 mr-2 text-slate-600 text-xs">
                    {ele.timeStamp.toString()}
                  </p>
                </div>
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
            disabled={true}
            className="text-hypLightPurple fixed top-[83%] left-[50%] border-solid border-hypLightPurple border-2 rounded-lg px-4"
          >
            ▣ Generating Response...
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
              disabled={showStopResponding}
              onKeyDown={(e) => (e.key === "Enter" ? onSendHandler() : "")}
              placeholder="Type your text here...."
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
            <button
              onClick={() => handleClear()}
              className="text-white bg-slate-700 px-8 rounded-lg py-2"
            >
              {" "}
              Clear
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
