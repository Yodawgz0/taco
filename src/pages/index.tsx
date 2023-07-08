import React from "react";
import Home from "./Homepage";
import NextHead from "next/head";
function index() {
  return (
    <>
      <NextHead>
        <meta charSet="UTF-8" />
        <title>TACO</title>
        <meta name="description" content={"description" || ""} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
          key="viewport"
        />
      </NextHead>
      <Home />
    </>
  );
}

export default index;
