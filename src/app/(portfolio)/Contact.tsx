import React from "react";

const contactData = [
  {
    title: "Email",
    link: "mailto:asifkabiremon@gmail.com",
  },
  {
    title: "LinkedIn",
    link: "https://www.linkedin.com/in/asifkabir/",
  },
  {
    title: "GitHub",
    link: "https://github.com/asif-kabir-emon",
  },
];

const Contact = () => {
  return (
    <div id="contact" className="py-5">
      <h1 className="text-2xl font-semibold">Contact Me</h1>
      <div>
        <div className="space-x-2 mt-4">
          {Array.from({ length: 30 }).map((_, index) => (
            <div key={index} className="flex items-center space-x-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
              aliquam modi quae illum, sunt iure ratione, temporibus vitae
              rerum, tempore earum. Doloremque in animi libero explicabo
              deleniti reprehenderit laboriosam temporibus.
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
