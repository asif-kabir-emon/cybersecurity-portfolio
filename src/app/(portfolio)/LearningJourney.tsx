import React from "react";

const LearningJourney = () => {
  return (
    <div id="learning_journey" className="pb-5">
      <h1 className="text-xl font-bold">Learning Journey</h1>
      <div className="mt-3 text-justify">
        <p>
          Cybersecurity is a continuous learning process, and I’ve made
          significant strides in understanding the following:
        </p>
        <ul className="list-disc ml-7 mt-3 space-y-1.5">
          <li>
            <span className="font-semibold">Progress:</span> Mastered the use of
            tools like Nmap and Wireshark; gained hands-on experience with Linux
            for penetration testing.
          </li>
          <li>
            <span className="font-semibold">Challenges:</span> Developing a
            deeper understanding of advanced concepts like networking and
            cryptography.
          </li>
          <li>
            <span className="font-semibold">Plan:</span> I will sit for exam
            Cisco CCNA and CompTIA Security+ in the next 6 months. I am also
            continuously learning new tools and techniques to enhance my skills.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LearningJourney;
