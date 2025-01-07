import AboutMe from "./AboutMe";
import CareerObjective from "./CareerObjective";
import Contact from "./Contact";
import Details from "./Details";
import LearningJourney from "./LearningJourney";
import Projects from "./Projects";

const HomePage = () => {
  return (
    <div className="my-5 px-5 max-w-screen-lg mx-auto space-y-7">
      <AboutMe />
      <Details />
      <LearningJourney />
      <CareerObjective />
      <Projects />
      <Contact />
    </div>
  );
};

export default HomePage;
