const Services = () => {
  return (
    <div className="bg-white bg-opacity-90 p-12 rounded-xl shadow-2xl w-full max-w-5xl mx-auto backdrop-blur-md text-center mt-12 space-y-6">
      <h2 className="text-4xl font-bold text-blue-600 mb-6">Our Services</h2>
      <ul className="text-gray-700 text-lg leading-relaxed space-y-6">
        <li>
          ✔ Real-Time Disaster Tracking – Stay updated with live reports,
          satellite feeds, and social media alerts**
        </li>
        <li>
          ✔ AI-Powered Resource Allocation – Predict relief demands and optimize
          food, water, medical aid, and shelter distribution
        </li>
        <li>
          ✔ Multi-Agency Coordination – Foster seamless communication between
          Government, NGOs, and Transport Teams
        </li>
        <li>
          ✔ Volunteer Mobilization – Assign and deploy volunteers efficiently
          for maximum impact
        </li>
        <li>
          ✔ Transport & Logistics Optimization – Ensure smooth movement of
          relief goods and personnel
        </li>
      </ul>
      <img
        src="https://fireandsafetyjournalamericas.com/wp-content/uploads/2023/10/Petropolis-landslide-recovery-Brazil.jpg"
        alt="Relief Operations"
        className="w-full rounded-lg shadow-md"
      />
    </div>
  );
};

export default Services;
