import React from 'react';
import MotionWrapper from './MotionWrapper';

const GradientTech = ({ children }) => (
  <span className="bg-gradient-to-r from-blue-900 to-white bg-clip-text text-transparent font-semibold">{children}</span>
);

const About = () => {
  return (
    <section
      id="about"
      className="w-full min-h-screen bg-gradient-to-b from-gray-800 to-black text-white py-8 sm:py-12 scroll-mt-20"
      aria-label="About Me Section"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <MotionWrapper>
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold border-b-4 border-blue-500 inline-block pb-2">
            About Me
          </h2>
        </div>
        </MotionWrapper>

        {/* Main Content */}
        <div className="space-y-6 text-base sm:text-lg">
          {/* All Paragraphs Container */}
          <div className="space-y-6">
            {/* Journey & Skills */}
            <MotionWrapper delay={0.2}>
            <div className="bg-gray-900/30 rounded-lg p-6 mx-4 sm:mx-0">
              <p className="text-gray-200 leading-relaxed sm:leading-loose m-0">
                My journey as a developer began with a profound passion for <b>web design</b>, 
                quickly evolving into a deep love for <b>coding</b> and <b>creative problem-solving</b>. I build dynamic, interactive, 
                and responsive applications using powerful <GradientTech>front-end frameworks</GradientTech> such 
                as <GradientTech>React.js</GradientTech>, <GradientTech>Next.js</GradientTech>, and <GradientTech>Vue.js</GradientTech>, elegantly paired with <GradientTech>Tailwind CSS</GradientTech> to create clean, efficient, 
                and visually appealing designs.
              </p>
            </div>
            </MotionWrapper>

            {/* Backend Expertise */}
            <MotionWrapper delay={0.4}>
            <div className="bg-gray-900/30 rounded-lg p-6 mx-4 sm:mx-0">
              <p className="text-gray-200 leading-relaxed sm:leading-loose m-0">
                On the backend, I utilize robust languages like <GradientTech>Python</GradientTech>, <GradientTech>PHP</GradientTech>, and <GradientTech>Node.js</GradientTech>, along with frameworks such as <GradientTech>Laravel</GradientTech>, to craft reliable and scalable solutions. <GradientTech>APIs</GradientTech> form the backbone of my applications, 
                enabling seamless integration of external services to significantly enhance functionality 
                and elevate user experiences.
              </p>
            </div>
            </MotionWrapper>

            {/* Development Practices */}
            <MotionWrapper delay={0.6}>
            <div className="bg-gray-900/30 rounded-lg p-6 mx-4 sm:mx-0">
              <p className="text-gray-200 leading-relaxed sm:leading-loose m-0">
                Meticulous <b>version control</b> practices through <GradientTech>GitHub</GradientTech> ensure <b>efficient project management</b>, <b>collaborative workflows</b>, and <b>maintainable codebases</b>. My dedication to refining <b>UI/UX development</b> is evident in my consistent focus on creating <b>intuitive</b>, <b>user-friendly interfaces</b> that engage and retain users.
              </p>
            </div>
            </MotionWrapper>

            {/* eCommerce Expertise */}
            <MotionWrapper delay={0.8}>
            <div className="bg-gray-900/30 rounded-lg p-6 mx-4 sm:mx-0">
              <p className="text-gray-200 leading-relaxed sm:leading-loose m-0">
                With specialized expertise in custom <GradientTech>Shopify Liquid coding</GradientTech>,
                I enhance <GradientTech>eCommerce platforms</GradientTech>, showcasing an <b>innovative approach</b> and delivering <b>impactful results</b> within the <GradientTech>digital marketplace</GradientTech>.
              </p>
            </div>
            </MotionWrapper>

            {/* Security & Infrastructure */}
            <MotionWrapper delay={1}>
            <div className="bg-gray-900/30 rounded-lg p-6 mx-4 sm:mx-0">
              <p className="text-gray-200 leading-relaxed sm:leading-loose m-0">
                For <b>secure payment systems</b> and <b>data protection</b>, I implement <b>advanced encryption methods</b> alongside trusted third-party services. 
                I work with tools and platforms such as <GradientTech>Stripe</GradientTech> for reliable <b>payment processing</b>, and <GradientTech>Firebase</GradientTech> for real-time <b>backend infrastructure</b>, <b>user authentication</b>, and <b>data management</b>. I further support <b>scalability</b> and <b>system resilience</b> by leveraging cloud-based solutions through platforms such as <GradientTech>AWS</GradientTech>.
              </p>
            </div>
            </MotionWrapper>
          </div>

          {/* Quote Box */}
          <MotionWrapper delay={1.4}>
          <blockquote className="mt-12 p-6 italic border-l-4 border-cyan-500 bg-gray-900/50 rounded-lg shadow-xl mx-4 sm:mx-0">
            <p className="text-gray-200 leading-relaxed sm:leading-loose">
              &ldquo;As a dedicated and proactive learner, I continuously expand my expertise across diverse <GradientTech>technologies</GradientTech> and <GradientTech>frameworks</GradientTech>, focusing on <GradientTech>cutting-edge tools</GradientTech> and <b>UI/UX development</b>. My <b>resilience</b> and <b>commitment to technological advancement</b> highlight me as an <GradientTech>exceptional developer</GradientTech> and <b>problem solver</b>.&rdquo;
            </p>
          </blockquote>
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
};

export default About;
