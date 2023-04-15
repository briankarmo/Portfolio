import React from "react";

const About = () => {
  return (
    <div
    name="about"
      className="w-full h-fit bg-gradient-to-b from-gray-800 to-black text-white pb-10"
    >
      <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full  h-full">
        <div className="pb-8">
          <p className="text-4xl font-bold inline border-b-4 border-blue-500">
            About
          </p>
        </div>

        <p className="text-xl">
          My journey as a JavaScript developer began with a passion for web development and design, which eventually grew into a love for coding and problem-solving. Throughout my range of projects, I have gained extensive experience in utilizing frameworks such as React.js, Next.js, and Redux, as well as Node.js for developing server-side applications. Furthermore, I have employed various libraries and styling tools, such as Axios for HTTP clients and CSS preprocessors, to create dynamic, interactive, and responsive component-based applications. Additionally, I have gained hands-on experience in version control with GitHub, which allows me to manage my codebase effectively. By implementing APIs, I have been able to seamlessly integrate external data sources and services, making my applications even more interactive.
        </p>

        <br />

        <p className="text-xl">
          "As an enthusiastic learner, I am consistently driven to enhance and broaden my expertise in JavaScript development. My focus encompasses various aspects of front-end software engineering, including frameworks, object-oriented programming, and DOM manipulation. My passion for staying on the cutting edge of technology, coupled with my unwavering commitment towards constant improvement, sets me apart as an exceptional problem solver!"
        </p>
      </div>
    </div>
  );
};

export default About;