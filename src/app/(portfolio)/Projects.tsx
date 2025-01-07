import React from "react";
import project_image_1 from "@/assets/project-1.webp";
import project_image_2 from "@/assets/project-2.webp";
import Image from "next/image";

const projectsData = [
  {
    title: "Network Vulnerability Scan and Remediation",
    image: project_image_1,
    objective: "To identify vulnerabilities in the network and remediate them.",
    tools: ["Nmap", "OpenVAS", "Wireshark"],
    methodology:
      "Scanning the network using Nmap and OpenVAS, analyzing the traffic using Wireshark, and remediating the vulnerabilities.",
    outcome:
      "Reduced high-risk vulnerabilities by 80% and strengthened network security.",
  },
  {
    title: "Web Application Security Assessment",
    image: project_image_2,
    objective:
      "To identify vulnerabilities in the web application and remediate them.",
    tools: ["Burp Suite", "OWASP ZAP", "Nessus"],
    methodology:
      "Scanning the web application using Burp Suite and OWASP ZAP, analyzing the traffic using Nessus, and remediating the vulnerabilities.",
    outcome:
      "Reduced high-risk vulnerabilities by 70% and strengthened web application security.",
  },
];

const Projects = () => {
  return (
    <div id="projects" className="py-5">
      <h1 className="text-2xl font-bold">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 items-start mt-5">
        {projectsData.map((data, index) => (
          <div key={index} className="border-[1.5px] rounded-lg">
            <Image
              src={data.image}
              alt={data.title}
              className="h-52 object-cover rounded-t-lg"
            />
            <div className="px-5 py-5 inline-block w-full space-y-2 text-start">
              <h2 className="text-xl font-semibold mb-2">{data.title}</h2>
              <p className="text-md">
                <span className="font-semibold">Objective: </span>
                {data.objective}
              </p>
              <p className="text-md">
                <span className="font-semibold">Tools: </span>
                {data.tools.join(", ")}
              </p>
              <p className="text-md">
                <span className="font-semibold">Methodology: </span>
                {data.methodology}
              </p>
              <p className="text-md">
                <span className="font-semibold">Outcome: </span>
                {data.outcome}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
