import { Github, Linkedin, Mail } from "lucide-react";
import React from "react";

const contactData = [
  {
    title: "Email",
    link: "mailto:asifkabiremon@gmail.com",
    text: "asifkabiremon@gmail.com",
    icon: <Mail size={40} />,
  },
  {
    title: "LinkedIn",
    link: "https://www.linkedin.com/in/asif-kabir-emon/",
    text: "asif-kabir-emon",
    icon: <Linkedin size={40} />,
  },
  {
    title: "GitHub",
    link: "https://github.com/asif-kabir-emon",
    text: "asif-kabir-emon",
    icon: <Github size={40} />,
  },
];

const Contact = () => {
  return (
    <div id="contact" className="py-5">
      <h1 className="text-2xl font-bold">Contact</h1>
      <div className="flex flex-col md:flex-row gap-7 items-start mt-5">
        {contactData.map((data, index) => (
          <div
            key={index}
            className="border-[1.5px] px-5 py-5 inline-block rounded-lg w-full space-y-2 md:w-1/3 text-center"
          >
            <span className="flex justify-center">{data.icon}</span>
            <h2 className="text-lg font-semibold mb-2">{data.title}</h2>
            <a
              href={data.link}
              target="_blank"
              rel="noreferrer"
              className="text-md hover:underline"
            >
              {data.text}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contact;
