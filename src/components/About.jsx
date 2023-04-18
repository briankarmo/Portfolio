import React from "react";

const About = () => {
  return (
    <div
    name="about"
      className="w-full h-fit pt-20 bg-gradient-to-b from-gray-800 to-black text-white pb-10"
    >
      <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-fit">
        <div className="pb-8">
          <p className="text-4xl font-bold inline border-b-4 border-blue-500">
            About
          </p>
        </div>

        <p className="text-xl">
        My journey as a developer began with a passion for web development and design, which eventually evolved into a love for coding and problem-solving. With an extensive range of projects under my belt, I have acquired substantial expertise in working with popular frameworks like React.js, Next.js, and Redux, as well as utilizing Node.js for building server-side applications. My development arsenal also includes several libraries and styling tools like Axios for HTTP clients and CSS preprocessors via TailwindCSS, to create dynamic, interactive, and responsive component-based applications. In addition, I have honed my version control skills by using GitHub, which helps me effectively manage my codebase.  Furthemore, I have employed APIs, which enable seamless integration with external data sources and services, to make my applications even more interactive.
        </p>

        <br />

        <p className="text-xl">
        "As a dedicated and enthusiastic learner, I am continually driven to enhance and broaden my expertise in JavaScript development. My focus encompasses various aspects of front-end software engineering, including frameworks, object-oriented programming, UI/UX development, and DOM manipulation. Through my relentless pursuit of problem-solving and unwavering commitment to constant improvement, I have developed the resilience and dedication required to overcome any obstacle. This, coupled with my passion for staying on the cutting edge of technology, sets me apart as an exceptional problem solver.""
        </p>
      </div>
    </div>
  );
};

export default About;