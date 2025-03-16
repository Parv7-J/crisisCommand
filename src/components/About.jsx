const About = () => {
  return (
    <div className="bg-white bg-opacity-90 p-12 rounded-xl shadow-2xl w-full max-w-5xl mx-auto backdrop-blur-md text-center space-y-6">
      <h2 className="text-4xl font-bold text-blue-600 mb-6">
        About Our Platform
      </h2>
      <p className="text-gray-700 text-lg leading-relaxed">
        In times of crisis, swift and coordinated action is essential. Our
        disaster management platform serves as a centralized hub, connecting
        government agencies, NGOs, medical teams, logistics providers, and
        volunteers to streamline relief efforts.
      </p>
      <p className="text-gray-700 text-lg leading-relaxed">
        Using real-time tracking, AI-driven decision-making, and multi-agent
        coordination, we aim to minimize disaster response time and maximize
        impact.
      </p>
      <img
        src="https://www.worldbank.org/content/dam/photos/780x439/2017/sep/jp-feature-170912.jpg"
        alt="Disaster Response"
        className="w-full rounded-lg shadow-md"
      />
    </div>
  );
};

export default About;
