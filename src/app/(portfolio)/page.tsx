const Home = () => {
  return (
    <div className="my-5 p-5 max-w-screen-lg mx-auto">
      {Array(10)
        .fill(null)
        .map((_, i) => (
          <div key={i} className="my-5 p-5 bg-gray-100 rounded-md">
            <div>
              At Lolico, I had the opportunity to serve as both a team lead and
              an engineering manager for a team. In my role as a team lead, I
              maintained close communication with the client, planned upcoming
              work, estimated tasks, and ensured smooth operations. As an
              engineering manager, I prioritized team happiness and developed
              growth plans for engineers. Additionally, I gaine
            </div>
          </div>
        ))}
    </div>
  );
};

export default Home;
