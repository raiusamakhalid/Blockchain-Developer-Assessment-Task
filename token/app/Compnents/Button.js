import React from "react";

export default function Button({btntext,onClick}) {

  return (
    <div>
      <button
        onClick={onClick}
        className="bg-blue-500 hover:bg-blue-600 text-white mx-1 py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-300"
      >
        {btntext}
      </button>
    </div>
  );
}
