import AboutMe from "./AboutMe";
import Contact from "./Contact";
import Details from "./Details";

const HomePage = () => {
  return (
    <div className="my-5 px-5 max-w-screen-lg mx-auto space-y-10">
      <AboutMe />
      <Details />
      <Contact />
    </div>
  );
};

export default HomePage;
