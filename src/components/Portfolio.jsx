import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import MotionWrapper from './MotionWrapper';

// Gradient Components
const GradientTech = ({ children }) => (
  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-medium">
    {children}
  </span>
);

const GradientKeyword = ({ children }) => (
  <span className="bg-gradient-to-r from-purple-500 via-blue-500 to-white bg-clip-text text-transparent font-medium">
    {children}
  </span>
);

const projects = [
  {
    id: 1,
    src: "/assets/portfolio/govlink-800x450.webp",
    demo: "https://govlinkglobal.com/",
    title: "GovLink Global",
    description: (
      <>
        <GradientKeyword>MERN</GradientKeyword> platform connecting elite consultants with{" "}
        <GradientKeyword>US & global</GradientKeyword> government projects. Smart{" "}
        <GradientKeyword>search</GradientKeyword> & matching; 2.4k+ talent, 98% success, ~48h avg match. Built for{" "}
        <GradientKeyword>scale</GradientKeyword> with clean, user-focused <GradientTech>UI/UX</GradientTech>.
      </>
    ),
    tags: ["MERN", "Next.js", "Full-stack", "API", "AWS"],
  },
  {
    id: 2,
    src: "/assets/portfolio/keyo-800x450.webp",
    demo: "https://keyo.com/",
    title: "Keyo",
    description: (
      <>
        <GradientKeyword>Scalable</GradientKeyword> <GradientTech>Vue.js</GradientTech> web application built with modern backend services, featuring <GradientKeyword>responsive UI</GradientKeyword>, <GradientKeyword>secure API</GradientKeyword> integrations, and streamlined business workflows. Designed for <GradientKeyword>performance</GradientKeyword> and <GradientKeyword>future growth</GradientKeyword>.
      </>
    ),
    tags: ["Vue.js", "Full-stack", "API", "AWS"],
  },
  {
    id: 3,
    src: "/assets/portfolio/sheperd-800x450.webp",
    demo: "https://shepherd.study/",
    title: "Sheperd",
    description: (
      <>
        <GradientKeyword>Scalable SaaS web app</GradientKeyword> featuring <GradientKeyword>AI content processing</GradientKeyword>, <GradientKeyword>dynamic study tools</GradientKeyword>, and <GradientKeyword>responsive UI</GradientKeyword> for <GradientKeyword>personalized learning experiences</GradientKeyword>.
      </>
    ),
    tags: ["Next.js", "Full-stack", "AI", "SaaS"],
  },
  {
    id: 4,
    src: "/assets/portfolio/shutter-800x450.webp",
    demo: "https://shutterguide.io/",
    title: "ShutterGuide.IO",
    description: (
      <>
        <GradientKeyword>Full-stack photography platform</GradientKeyword> built with <GradientTech>Next.js</GradientTech> featuring <GradientTech>Firebase</GradientTech> <GradientKeyword>authentication</GradientKeyword>, <GradientTech>Stripe</GradientTech> <GradientKeyword>payment processing</GradientKeyword>, <GradientKeyword>user management</GradientKeyword>, and <GradientKeyword>secure transactions</GradientKeyword>. Complete solution for <GradientKeyword>photography services</GradientKeyword> and <GradientKeyword>bookings</GradientKeyword>.
      </>
    ),
    tags: ["Next.js", "Firebase", "Stripe", "Full-stack"],
  },
  {
    id: 5,
    src: "/assets/portfolio/ModernApp-800x450.webp",
    demo: "https://bk-inc-modern-app.netlify.app/",
    title: "Modern Business App",
    description: (
      <>
        <GradientKeyword>Fully responsive</GradientKeyword> business application built with <GradientTech>React</GradientTech> and <GradientTech>Tailwind CSS</GradientTech>. Features <GradientKeyword>sleek design</GradientKeyword>, <GradientKeyword>smooth animations</GradientKeyword>, <GradientKeyword>mobile-first approach</GradientKeyword>, and <GradientKeyword>modern UI/UX</GradientKeyword> patterns for professional business presentation.
      </>
    ),
    tags: ["React", "Tailwind CSS", "Responsive", "UI/UX"],
  },
  {
    id: 6,
    src: "/assets/portfolio/Apple-800x450.webp",
    demo: "https://bkinc525.netlify.app/",
    title: "iPhone Landing Page",
    description: (
      <>
        <GradientKeyword>Premium product showcase</GradientKeyword> featuring <GradientTech>Three.js</GradientTech> <GradientKeyword>3D modeling</GradientKeyword> and <GradientKeyword>interactive animations</GradientKeyword>. Built with <GradientTech>React</GradientTech> and <GradientTech>GSAP</GradientTech> for <GradientKeyword>smooth scrolling</GradientKeyword>, <GradientKeyword>3D product views</GradientKeyword>, and <GradientKeyword>Apple-inspired design</GradientKeyword>.
      </>
    ),
    tags: ["Three.js", "React", "3D", "GSAP", "Animation"]
  },
  {
    id: 7,
    src: "/assets/portfolio/weather-800x450.webp",
    demo: "https://bkinc-weather.netlify.app/",
    title: "Weather Tracker",
    description: (
      <>
        <GradientKeyword>Real-time</GradientKeyword> weather application using <GradientTech>OpenWeatherMap API</GradientTech>. Features <GradientKeyword>city search</GradientKeyword>, <GradientKeyword>current conditions</GradientKeyword>, <GradientKeyword>5-day forecasts</GradientKeyword>, and <GradientKeyword>dynamic weather data</GradientKeyword> with <GradientKeyword>RESTful API</GradientKeyword> integration.
      </>
    ),
    tags: ["OpenWeatherMap API", "React", "Real-time", "REST"],
  },
  {
    id: 8,
    src: "/assets/portfolio/three-800x450.webp",
    demo: "https://brian-3js-3d.netlify.app/",
    title: "3D Portfolio",
    description: (
      <>
        <GradientKeyword>Immersive 3D portfolio</GradientKeyword> showcasing <GradientKeyword>software development skills</GradientKeyword> through <GradientKeyword>interactive 3D environments</GradientKeyword> built with <GradientTech>Three.js</GradientTech> and <GradientTech>React</GradientTech>. Features <GradientKeyword>3D models</GradientKeyword>, <GradientKeyword>animations</GradientKeyword>, and <GradientKeyword>smooth navigation</GradientKeyword> for an engaging user experience.
      </>
    ),
    tags: ["Three.js", "React", "3D", "Interactive"],
  },
  {
    id: 9,
    src: "/assets/portfolio/bkinctube-800x450.webp",
    demo: "https://bkcodetube.netlify.app/",
    title: "BK Code Tube",
    description: (
      <>
        <GradientKeyword>Full-featured video platform</GradientKeyword> built with <GradientTech>React</GradientTech>, featuring <GradientTech>YouTube API</GradientTech> integration for <GradientKeyword>video search</GradientKeyword>, <GradientKeyword>playback</GradientKeyword>, and <GradientKeyword>dynamic content</GradientKeyword>. Includes <GradientKeyword>routing</GradientKeyword>, <GradientKeyword>responsive design</GradientKeyword>, and <GradientKeyword>smooth navigation</GradientKeyword>.
      </>
    ),
    tags: ["React", "YouTube API", "React Router", "REST API"],
  },
];

const ProjectCard = ({ src, demo, title, description, tags, index }) => (
  <MotionWrapper delay={index * 0.1} className="h-full">
    <div className="relative group h-full">
      {/* Background gradient with depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 via-gray-900/50 to-black/50 rounded-2xl transform transition-all duration-500 group-hover:scale-[1.02]"></div>
      
      {/* Border gradient */}
      <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-br from-gray-600/30 via-gray-500/20 to-gray-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Content container - fixed height on tablet/desktop with proper spacing */}
      <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-900/95 to-black/90 rounded-2xl p-4 md:p-6 backdrop-blur-sm h-full flex flex-col md:h-[560px] lg:h-[580px] md:overflow-hidden">
        {/* Image container - fixed dimensions with object-contain */}
        <div className="relative image-container mb-2 w-full overflow-hidden rounded-xl bg-gray-950/50 flex-shrink-0 h-[160px] md:h-[240px] lg:h-[260px]">
          <Image
            src={src}
            alt={title}
            width={800}
            height={450}
            className="w-full h-full object-contain transform transition duration-500 group-hover:scale-105"
            style={{ objectFit: 'contain' }}
            priority={index < 2}
          />
        </div>

        {/* Description - full text on mobile, fixed height on larger screens */}
        <div className="text-gray-300 mb-2 text-xs md:text-sm flex-shrink-0 md:h-[60px] lg:h-[66px] md:overflow-hidden">
          <p className="leading-tight md:leading-normal md:line-clamp-3">
            {description}
          </p>
        </div>

        {/* Animated skill tags */}
        <div className="flex flex-wrap gap-1.5 md:gap-2 mb-2 flex-shrink-0">
          {tags.map((tag, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="px-2 md:px-3 py-0.5 md:py-1 text-[10px] md:text-xs font-medium rounded-full bg-gradient-to-r from-gray-800/80 to-gray-900/80 border border-gray-700/50"
            >
              <GradientTech>{tag}</GradientTech>
            </motion.span>
          ))}
        </div>

        {/* Title with gradient text */}
        <h3 className="text-lg md:text-xl font-bold mb-2 flex-shrink-0">
          <GradientTech>{title}</GradientTech>
        </h3>

        {/* Spacer to push button to bottom */}
        <div className="flex-grow min-h-[8px]"></div>

        {/* Demo link - centered at bottom */}
        <a
          href={demo}
          target="_blank"
          rel="noopener noreferrer"
          className="block px-4 md:px-6 pt-2 pb-[5px] rounded-lg text-sm
                   bg-gradient-to-r from-gray-800/80 to-gray-900/80
                   border border-gray-700/50
                   text-gray-300 hover:text-white
                   transition-all duration-300
                   hover:from-gray-700/80 hover:to-gray-800/80
                   hover:border-gray-600/50
                   hover:shadow-[0_0_15px_rgba(0,0,0,0.3)]
                   flex-shrink-0 w-fit mx-auto mb-2 md:mb-4 text-center"
        >
          <GradientKeyword>View Demo</GradientKeyword>
        </a>
      </div>
    </div>
  </MotionWrapper>
);

const Portfolio = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out',
    });

    // Prevent horizontal scroll on mobile
    const preventHorizontalScroll = (e) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        const startX = touch.clientX;
        const startY = touch.clientY;
        
        const handleTouchMove = (e) => {
          const touch = e.touches[0];
          const deltaX = touch.clientX - startX;
          const deltaY = touch.clientY - startY;
          
          // If horizontal movement is greater than vertical, prevent default
          if (Math.abs(deltaX) > Math.abs(deltaY)) {
            e.preventDefault();
          }
        };
        
        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.addEventListener('touchend', () => {
          document.removeEventListener('touchmove', handleTouchMove);
        }, { once: true });
      }
    };
    
    document.addEventListener('touchstart', preventHorizontalScroll, { passive: false });
    
    return () => {
      document.removeEventListener('touchstart', preventHorizontalScroll);
    };
  }, []);

  return (
    <section
      name="portfolio"
      className="relative w-full min-h-screen bg-gradient-to-b from-gray-800 to-black py-20 px-4 sm:px-6 lg:px-8 overflow-x-hidden"
    >
      {/* Background Blur Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-cyan-500/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-blue-500/5 rounded-full blur-[120px]"></div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800/95 to-black/95 backdrop-blur-[1px]"></div>

      <div className="relative max-w-screen-2xl mx-auto">
        <div 
          className="text-center mb-16 backdrop-blur-sm bg-gray-900/30 p-6 rounded-2xl
                     border border-gray-700/30"
          data-aos="fade-down"
        >
          <h1 className="text-4xl font-bold inline-block border-b-4 border-cyan-500">
            <GradientTech>Portfolio</GradientTech>
          </h1>
          <p 
            className="text-gray-100 mt-6"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            A <GradientKeyword>showcase</GradientKeyword> of my recent <GradientKeyword>work</GradientKeyword> and <GradientKeyword>projects</GradientKeyword>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} {...project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
