const Contact = () => {
  return (
    <div className="bg-white bg-opacity-90 p-12 rounded-xl shadow-2xl w-full max-w-5xl mx-auto backdrop-blur-md text-center mt-12 space-y-6">
      <h2 className="text-4xl font-bold text-blue-600 mb-6">Contact Us</h2>
      <p className="text-gray-700 text-lg leading-relaxed">
        Have questions, need support, or want to register your department or
        organization? Get in touch with us today!
      </p>
      <div className="text-gray-700 text-lg space-y-4">
        <p>
          📧 Email:{" "}
          <a href="#" className="text-blue-500 hover:underline">
            support@
          </a>
        </p>
        <p>
          📞 Phone: <span className="font-semibold">+91 XXXXX XXXXX</span>
        </p>
        <p>📍 Address: Disaster Relief HQ, New Delhi, India</p>
      </div>
    </div>
  );
};

export default Contact;
