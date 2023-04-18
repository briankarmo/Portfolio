import React from "react";
import beats from "../assets/portfolio/beats.png";
import ModernApp from "../assets/portfolio/ModernApp.png";
import Woodmere from "../assets/portfolio/Woodmere.png";
import BKTube from "../assets/portfolio/BKTube.png";
import Three from "../assets/portfolio/three.png";
import bkinctube from "../assets/portfolio/bkinctube.png";
import weather from "../assets/portfolio/weather.png";
import Apple from "../assets/portfolio/Apple.png";

const Portfolio = () => {
  const portfolios = [
    {
      id: 1,
      src: beats,
      demo: "https://bklyriks.netlify.app/",
      description: "A music app created with Vite and Tailwind, fetching data from Rapid API.",
    },
    {
      id: 2,
      src: ModernApp,
      demo: "https://bk-inc-modern-app.netlify.app/",
      description: "A demo of a modern business app built with React and Tailwind.",
    },
    {
      id: 3,
      src: Woodmere,
      demo: "https://briankarmo.com/woodmere-party-store/",
      description: "A static site for a local business built with WordPress.",
    },
    {
      id: 4,
      src: Apple,
      demo: "https://briankarmo-appledemo.netlify.app/",
      description: "A demo site for iPhone advertising using Three.js with a control at the bottom following the animation. Optimized primarily for desktop.",
    },
    {
      id: 5,
      src: weather,
      demo: "https://briankarmo-weathertracker-w-reponsive.netlify.app/",
      description: "A weather tracker app that fetches various measurements of data from OpenWeatherMap API.",
    },
    {
      id: 6,
      src: Three,
      demo: "https://briankarmo-3js-3d.netlify.app/",
      description: "My second portfolio created with the JavaScript 3D library, Three.js.",
    },
    {
      id: 7,
      src: bkinctube,
      demo: "https://bkcodetube.netlify.app/",
      description: "A video player app built with react-router-dom's library browser router function, fetching specific coding channels via Rapid API.",
    },
    {
      id: 8,
      src: BKTube,
      demo: "https://bkinctube.netlify.app/",
      description: "A video player app that fetches all channels from YouTube v3 via Rapid API.",
    },
  ];

return (
    <div
      name="portfolio"
      className="bg-gradient-to-b from-black pt-40  to-gray-800 w-full pb-20  text-white md:h-fit"
    >
      <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-fit">
        <div className="pb-8">
          <p className="text-4xl font-bold inline border-b-4 border-blue-500">
            Portfolio
          </p>
          <p className="py-6">I have attached examples below of my previous work!</p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3  gap-8 px-12 sm:px-0">
      {portfolios.map(({ id, src, demo, description }) => (
        <div key={id} className="shadow-lg shadow-blue-800 rounded-lg ">
          <a href={demo} target="_blank" rel="noopener noreferrer">
            <img src={src} alt={description} className="rounded-md mx-auto pb-2 duration-200 hover:scale-105" />
          </a>
          <div className="flex items-center justify-center">
            <a href={demo} target="_blank" rel="noopener noreferrer">
              <button className="hover:bg-blue-800 text-white font-bold flex justify-items-center px-2 py-2 rounded-full  duration-200 hover:scale-105">
                Demo
              </button>
            </a>
          </div>
          <p className="text-center text-blue-700 font-bold mx-auto">{description}</p>
        </div>
      ))}
    </div>
  </div>
</div>

  );
};

export default Portfolio;
