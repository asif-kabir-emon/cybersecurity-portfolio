"use client";
import Image from "next/image";
import React from "react";
import profile_photo from "@/assets/profile-photo.jpg";
import { navigateTo } from "@/utils/NavigateTo";

const info = {
  name: "Md Asif Kabir Emon",
  description:
    "I am a passionate cybersecurity enthusiast currently pursuing masters in cybersecurity. I am eager to tackle the evolving challenges in cybersecurity and protect digital systems from vulnerabilities and threats. My journey includes hands-on projects, certifications, and continuous learning to excel in this dynamic field.",
  role: "Cybersecurity Enthusiast",
  resume:
    "https://drive.google.com/file/d/1OImfiWFQI3PLrDYs_qa2ASDa_e8qih2q/view",
};

const AboutMe = () => {
  return (
    <div id="about_me" className="py-5">
      <div className="flex flex-col md:flex-row items-center justify-center space-y-8 space-x-6">
        <Image
          src={profile_photo}
          width={370}
          height={370}
          alt="profile-image"
          className="rounded-md"
        />
        <div className="space-y-4 justify-center items-center">
          <h1 className="text-3xl font-semibold">Hi, I'm {info.name}</h1>
          <h3 className="text-2xl ">{info.role}</h3>
          <p className="text-lg text-gray-700 text-justify">
            {info.description}
          </p>
          <div className="space-x-2">
            <button
              onClick={() => window.open(info.resume, "_blank")}
              className="px-5 py-2 text-white bg-black rounded-md hover:bg-slate-700"
            >
              Resume
            </button>
            <button
              onClick={() => navigateTo("contact")}
              className="px-5 py-2 text-white bg-black rounded-md hover:bg-slate-700"
            >
              Contact Me
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
