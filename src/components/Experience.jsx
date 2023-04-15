import React from "react";

import html from "../assets/html.png";
import css from "../assets/css.png";
import javascript from "../assets/javascript.png";
import reactImage from "../assets/react.png";
import Vite from "../assets/vite.png";
import NodeJS from "../assets/node.png";
import github from "../assets/github.png";
import tailwind from "../assets/tailwind.png";
import api from "../assets/api.png";
import chat from "../assets/chatGPT.png";
import redux from"../assets/redux.png";
import next from "../assets/next.png";

const Experience = () => {
  const techs = [
    {
      id: 1,
      src: html,
      title: "HTML",
      style: "shadow-orange-600",
    },
    {
      id: 2,
      src: css,
      title: "CSS",
      style: "shadow-blue-600",
    },
    {
      id: 3,
      src: javascript,
      title: "JavaScript",
      style: "shadow-yellow-500",
    },
    {
      id: 4,
      src: reactImage,
      title: "React",
      style: "shadow-sky-400",
    },
    {
      id: 5,
      src: Vite,
      title: "Vite",
      style: "shadow-purple-600",
     
     
    },
    {
      id: 6,
      src: github,
      title: "GitHub",
      style: "shadow-blue-400",
    },
    {
      id: 7,
      src: NodeJS,
      title: "Node JS",
      style: "shadow-green-600"
    },
    {
      id: 8,
      src: tailwind,
      title: "Tailwind",
      style: "shadow-cyan-400",
    
    },
    {
    id: 9,
    src: redux,
    title: "Redux",
    style: "shadow-purple-400",  
  },
  {
    id: 10,
    src: next,
    title: "Next JS",
    style: "shadow-gray-100",  

  },
  {
    id: 11,
      src: chat,
      title: "ChatGPT",
      style: "shadow-blue-800",  
  },
  {
    id: 12,
      src: api,
      title: "Application Programming Interface",
      style: "shadow-red-600",  
  }
  ]



  return (
    <div
      name="experience"
      className="bg-gradient-to-b from-gray-800 to-black pt-20 w-full h-fit"
    >
      <div className="max-w-screen-lg mx-auto p-4 flex flex-col justify-center pt-10 w-full h-full text-white">
        <div>
          <p className="text-4xl font-bold border-b-4 border-b-green-700 p-2 inline">
            Experience
          </p>
          <p className="py-6">I have worked with multiple technologies including, but not limited to</p>
        </div>

        <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-8 text-center py-8 px-12 sm:px-0">
          {techs.map(({ id, src, title, style }) => (
            <div
              key={id}
              className={`shadow-md hover:scale-105 duration-500 py-2 rounded-lg ${style}`}
            >
              <img src={src} alt="" className="w-20 mx-auto" />
              <p className="mt-4">{title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;