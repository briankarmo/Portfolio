import React from "react";
import HeroImage from "../assets/heroImage.png";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-scroll";

const Home = () => {
  return (
    <div
      name="home"
      className="h-fit w-full bg-gradient-to-b pt-20 from-black via-black to-gray-800"
    >
      <div className="max-w-screen-lg mx-auto flex flex-col items-center justify-center h-full px-2 md:flex-row">
        <div className="flex flex-col justify-center h-fit">
          <h2 className="text-4xl sm:text-7xl font-bold text-white">
            Front End Software Engineer
          </h2>
          <p className="text-gray-500 py-4 max-w-md">
            Welcome to my JavaScript portfolio! As a web developer, I have a strong passion for creating dynamic and user-friendly web applications by leveraging the latest technologies and frameworks. My area of expertise lies in the development of full-stack solutions, which involves front-end design, back-end implementation, and database management. I am committed to constantly learning new techniques and tools to enhance my skills and deliver the best possible solutions to clients. I am thrilled to work on innovative and impactful projects, and I welcome any opportunities to explore how I can contribute. Thank you for taking the time to browse my portfolio!
          </p>

          <div>
            <Link
              to="portfolio"
              smooth
              duration={500}
              className="group text-white w-fit pb-15 px-6 py-3 my-2 flex items-center rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer"
            >
              Portfolio
              <span className="group-hover:rotate-90 duration-300">
                <MdOutlineKeyboardArrowRight size={25} className="ml-1" />
              </span>
            </Link>
          </div>
        </div>

        <div>
          <img
            src={HeroImage}
            alt="my profile"
            className="rounded-2xl  mb-10  pt-10 w-2/3 md:w-fit" />
        </div>
      </div>
    </div>
  );
};

export default Home;