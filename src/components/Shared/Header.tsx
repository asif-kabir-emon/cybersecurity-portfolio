"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const menuItems = [
  { name: "About Me", link: "about_me" },
  { name: "Skills", link: "skills" },
  { name: "Projects", link: "projects" },
  { name: "Contact", link: "contact" },
];

const Header = () => {
  const [boxShadow, setBoxShadow] = useState("0 0 0 0 rgba(0, 0, 0, 0)");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigateTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      if (scrollY > 0) {
        setBoxShadow("0 0.5px 0.5px rgba(0, 0, 0, 0.05)");
      } else {
        setBoxShadow("0 0 0 0 rgba(0, 0, 0, 0)");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.div
      className="top-0 z-50 glass-effect absolute w-full"
      style={{ boxShadow }}
    >
      <div className="p-5 max-w-screen-lg mx-auto">
        <div className="flex justify-between items-center">
          <p className="font-semibold">Md Asif Kabir Emon</p>
          <div className="flex items-center">
            <div className="hidden md:flex">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => navigateTo(item.link)}
                  className="mx-2 text-gray-700 hover:text-gray-900"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <div
              className="mx-2 hover:cursor-pointer hidden md:flex"
              onClick={() =>
                window.open(
                  "https://drive.google.com/file/d/1OImfiWFQI3PLrDYs_qa2ASDa_e8qih2q/view",
                  "_blank",
                )
              }
            >
              Resume
            </div>

            <div
              className="md:hidden cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </div>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="flex flex-col items-center md:hidden top-0 left-0 w-full h-full bg-white z-50 overflow-y-auto relative">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                navigateTo(item.link);
                setIsMenuOpen(false);
              }}
              className="my-2 text-gray-700 hover:text-gray-900"
            >
              {item.name}
            </button>
          ))}
          <button
            onClick={() =>
              window.open(
                "https://drive.google.com/file/d/1OImfiWFQI3PLrDYs_qa2ASDa_e8qih2q/view",
                "_blank",
              )
            }
            className="my-2 text-gray-700 hover:text-gray-900"
          >
            Resume
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default Header;
