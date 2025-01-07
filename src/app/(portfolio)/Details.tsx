import React from "react";

const SkillsData = [
  {
    title: "Programming Languages",
    skills: ["Python", "Bash", "JavaScript"],
  },
  {
    title: "Cybersecurity Tools",
    skills: ["Nmap", "Wireshark", "Metasploit", "Burp Suite"],
  },
  {
    title: "Networking",
    skills: ["TCP/IP", "Subnetting", "Packet Analysis"],
  },
  {
    title: "Operating Systems",
    skills: ["Linux (Kali)", "Windows", "macOS"],
  },
];

const CertificationsData = [
  {
    title: "Currently Working Towards",
    details: [
      {
        name: "Cisco Certified Network Associate (CCNA)",
        status: "Ongoing",
        description:
          "Currently studying to strengthen my networking fundamentals, including routing, switching, and network security.",
      },
      {
        name: "CompTIA Security+",
        status: "Ongoing",
        description:
          "Preparing to gain a foundational understanding of cybersecurity principles, risk management, and threat detection.",
      },
    ],
  },
];

const TrainingData = [
  {
    title: "Workshops and Courses",
    details: [
      "Completed coursework in Networking Basics and Cybersecurity Fundamentals as part of my academic program.",
      "Participated in hands-on labs focusing on network configurations and basic security protocols.",
    ],
  },
];

const Details = () => {
  return (
    <div id="skills" className="pb-5">
      <h1 className="text-2xl font-bold">Details</h1>
      <div className="flex flex-col md:flex-row gap-7 items-start mt-5">
        <div className="space-y-5 md:w-1/2">
          {SkillsData.map((data, index) => (
            <div key={index}>
              <h2 className="text-lg font-semibold mb-3">{data.title}</h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="inline-block text-sm bg-gray-200 px-2 py-1 rounded"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className="mt-2">
            <h2 className="text-xl font-bold">Certifications and Training</h2>
            <div className="space-y-4 mt-2">
              {CertificationsData.map((data, index) => (
                <div key={index} className="mt-4">
                  <h2 className="text-lg font-semibold mb-2">{data.title}</h2>
                  <p className="text-md">
                    I am currently working towards the following certifications
                    to enhance my skills and knowledge in networking and
                    cybersecurity.
                  </p>
                  <div className="space-y-2">
                    {data.details.map((detail, index) => (
                      <div key={index} className="mt-2 list-item ml-5">
                        <div className="text-md font-semibold">
                          {detail.name}
                        </div>
                        <div className="text-sm">{detail.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {TrainingData.map((data, index) => (
                <div key={index} className="mt-4">
                  <h2 className="text-lg font-semibold mb-2">{data.title}</h2>
                  <div className="space-y-2">
                    {data.details.map((detail, index) => (
                      <div key={index} className="list-item ml-5">
                        <div className="text-sm">{detail}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
