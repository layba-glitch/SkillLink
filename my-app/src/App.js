import React, { useState, useEffect } from 'react';

// This file is assumed to exist in the same directory as App.js
// Since you mentioned it imports 'api', we will assume a mock for now
// to make the app runnable as a self-contained unit.
const api = {
  getWorkers: () => new Promise(resolve => setTimeout(() => resolve(mockWorkers), 500)),
  getServices: () => new Promise(resolve => setTimeout(() => resolve(mockServices), 500)),
};

// Mock data to ensure the app is self-contained and runnable
const mockWorkers = [
  { id: 1, name: 'John Doe', skill: 'Plumber', location: 'New York, NY', rating: 4.8, contact: 'john.doe@email.com' },
  { id: 2, name: 'Jane Smith', skill: 'Electrician', location: 'Los Angeles, CA', rating: 4.9, contact: 'jane.smith@email.com' },
  { id: 3, name: 'Mike Johnson', skill: 'Painter', location: 'Chicago, IL', rating: 4.5, contact: 'mike.johnson@email.com' },
  { id: 4, name: 'Emily White', skill: 'Web Designer', location: 'San Francisco, CA', rating: 5.0, contact: 'emily.white@email.com' },
];

const mockServices = [
  { id: 101, worker_id: 1, title: 'Drain Cleaning', description: 'Expert drain cleaning services for all types of pipes.', price_range: '$75 - $150' },
  { id: 102, worker_id: 1, title: 'Pipe Repair', description: 'Fixing leaks and breaks in residential and commercial pipes.', price_range: '$100 - $300' },
  { id: 103, worker_id: 2, title: 'Electrical Wiring', description: 'New home and renovation electrical wiring installation.', price_range: '$500+' },
  { id: 104, worker_id: 2, title: 'Fixture Installation', description: 'Installation of light fixtures, outlets, and switches.', price_range: '$50 - $100' },
  { id: 105, worker_id: 3, title: 'Interior Painting', description: 'Professional interior painting for a fresh new look.', price_range: '$200 - $1000' },
  { id: 106, worker_id: 4, title: 'Custom Website Design', description: 'Building beautiful, responsive websites from scratch.', price_range: '$1000+' },
  { id: 107, worker_id: 4, title: 'UI/UX Consultation', description: 'Consulting services to improve user experience on your site.', price_range: '$75/hour' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [workers, setWorkers] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedWorkerId, setSelectedWorkerId] = useState(null);
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [workersData, servicesData] = await Promise.all([
        api.getWorkers(),
        api.getServices()
      ]);
      
      setWorkers(workersData);
      setServices(servicesData);
    } catch (err) {
      setError('Failed to load data. Make sure your backend is running on localhost:3000');
      console.error('Error fetching data:', err);
      
      setWorkers(mockWorkers);
      setServices(mockServices);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on initial render
  useEffect(() => {
    fetchData();
  }, []);

  const handleWorkerClick = (workerId) => {
    setSelectedWorkerId(workerId);
    setActiveTab('worker-detail');
  };

  const handleServiceClick = (serviceId) => {
    setSelectedServiceId(serviceId);
    setActiveTab('service-detail');
  };

  const Logo = () => (
    <div className="flex items-center space-x-2">
      <svg 
        className="w-10 h-10 text-lime-600 animate-spin-slow" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 4v4m0 4v4m-4-4h4m4 0h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 4v4m0 4v4m-4-4h4m4 0h-4" stroke="url(#paint0_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <defs>
          <linearGradient id="paint0_linear" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
            <stop stopColor="#a3e635"/>
            <stop offset="1" stopColor="#10b981"/>
          </linearGradient>
        </defs>
      </svg>
      <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-teal-600">SkillLink</span>
    </div>
  );

  const Navbar = () => (
    <nav className="bg-white shadow-lg p-4 rounded-b-3xl flex flex-col md:flex-row justify-between items-center fixed w-full top-0 left-0 z-50">
      <div className="flex items-center mb-4 md:mb-0">
        <Logo />
      </div>
      <div className="flex flex-wrap justify-center md:flex-nowrap space-x-2 md:space-x-6">
        <button
          onClick={() => { setActiveTab('home'); setSelectedWorkerId(null); setSelectedServiceId(null); }}
          className={`py-2 px-4 font-semibold rounded-full transition-colors ${activeTab === 'home' ? 'bg-lime-600 text-white shadow-lg' : 'text-gray-600 hover:text-lime-600'}`}
        >
          Home
        </button>
        <button
          onClick={() => { setActiveTab('workers'); setSelectedWorkerId(null); setSelectedServiceId(null); }}
          className={`py-2 px-4 font-semibold rounded-full transition-colors ${activeTab === 'workers' ? 'bg-lime-600 text-white shadow-lg' : 'text-gray-600 hover:text-lime-600'}`}
        >
          Workers
        </button>
        <button
          onClick={() => { setActiveTab('services'); setSelectedWorkerId(null); setSelectedServiceId(null); }}
          className={`py-2 px-4 font-semibold rounded-full transition-colors ${activeTab === 'services' ? 'bg-lime-600 text-white shadow-lg' : 'text-gray-600 hover:text-lime-600'}`}
        >
          Services
        </button>
        <button
          onClick={() => { setActiveTab('contact'); setSelectedWorkerId(null); setSelectedServiceId(null); }}
          className={`py-2 px-4 font-semibold rounded-full transition-colors ${activeTab === 'contact' ? 'bg-lime-600 text-white shadow-lg' : 'text-gray-600 hover:text-lime-600'}`}
        >
          Contact Us
        </button>
      </div>
    </nav>
  );

  const Home = () => (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-white min-h-screen pt-40">
      <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-teal-600 leading-tight mb-4 animate-fadeIn">
        Your One Stop for Every Skill
      </h1>
      <p className="text-xl text-gray-700 max-w-2xl mb-8 animate-slideUp">
        Find the perfect professional for any job, from local handymen to expert freelancers, all in one place.
      </p>
      <div className="relative w-full max-w-lg mb-12 animate-zoomIn">
        <input
          type="text"
          placeholder="Search for a skill or worker..."
          className="w-full py-4 pl-6 pr-16 text-lg border-2 border-gray-300 rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-lime-200 transition-all"
        />
        <svg
          className="w-6 h-6 text-gray-400 absolute right-6 top-1/2 -translate-y-1/2 cursor-pointer"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        <FeatureCard
          title="Find Workers"
          description="Browse a diverse range of skilled workers and find the perfect match for your needs."
          icon={<svg className="w-12 h-12 text-lime-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>}
        />
        <FeatureCard
          title="List Services"
          description="Are you a skilled professional? List your services and connect with customers."
          icon={<svg className="w-12 h-12 text-lime-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>}
        />
        <FeatureCard
          title="Seamless Experience"
          description="Enjoy a user-friendly platform designed for easy navigation and smooth transactions."
          icon={<svg className="w-12 h-12 text-lime-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 018.382 18.04l-3.24-3.24a8 8 0 10-10.382 1.944 8 8 0 001.944 10.382z"></path></svg>}
        />
      </div>
    </div>
  );

  const FeatureCard = ({ title, description, icon }) => (
    <div className="bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700 flex flex-col items-center text-center transition-all duration-300 transform hover:scale-105 hover:border-lime-400">
      <div className="w-16 h-16 bg-lime-500 rounded-full flex items-center justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );

  const Workers = () => (
    <div className="p-8 bg-gray-900 min-h-screen text-gray-100 pt-40">
      <h2 className="text-4xl font-bold text-center text-lime-400 mb-8 animate-fadeIn">Our Skilled Workers</h2>
      {loading ? (
        <p className="text-center text-gray-400">Loading workers...</p>
      ) : error ? (
        <p className="text-center text-red-400">Error: {error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {workers.map(worker => (
            <div
              key={worker.id}
              className="bg-gray-800 p-6 rounded-3xl shadow-xl border border-gray-700 transition-transform transform hover:scale-105 hover:border-lime-400 cursor-pointer animate-slideUp"
              onClick={() => handleWorkerClick(worker.id)}
            >
              <h3 className="text-2xl font-bold text-white mb-2">{worker.name}</h3>
              <p className="text-lime-400 font-medium mb-1">{worker.skill}</p>
              <p className="text-gray-400 text-sm mb-1">{worker.location}</p>
              <div className="flex items-center text-yellow-400">
                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.785.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path></svg>
                <span className="text-gray-400 font-semibold">{worker.rating}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const Services = () => (
    <div className="p-8 bg-gray-900 min-h-screen text-gray-100 pt-40">
      <h2 className="text-4xl font-bold text-center text-lime-400 mb-8 animate-fadeIn">Browse Our Services</h2>
      {loading ? (
        <p className="text-center text-gray-400">Loading services...</p>
      ) : error ? (
        <p className="text-center text-red-400">Error: {error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map(service => (
            <div
              key={service.id}
              className="bg-gray-800 p-6 rounded-3xl shadow-xl border border-gray-700 transition-transform transform hover:scale-105 hover:border-teal-400 cursor-pointer animate-slideUp"
              onClick={() => handleServiceClick(service.id)}
            >
              <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
              <p className="text-gray-400 mb-2">{service.description}</p>
              <div className="flex justify-between items-center text-lime-400 font-semibold">
                <span className="text-sm">Price: {service.price_range}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const WorkerDetail = () => {
    const worker = workers.find(w => w.id === selectedWorkerId);
    if (!worker) {
      return <div className="p-8 pt-40 text-center text-red-400 bg-gray-900 min-h-screen">Worker not found.</div>;
    }
    const workerServices = services.filter(s => s.worker_id === worker.id);

    return (
      <div className="p-8 bg-gray-900 min-h-screen text-gray-100 pt-40">
        <button
          onClick={() => setActiveTab('workers')}
          className="mb-8 py-2 px-4 rounded-full bg-gray-800 text-gray-100 hover:bg-gray-700 transition-colors border border-gray-700"
        >
          &larr; Back to Workers
        </button>
        <div className="bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-700 animate-fadeIn">
          <h2 className="text-4xl font-bold text-white mb-4">{worker.name}</h2>
          <p className="text-lime-400 font-medium text-lg mb-2">{worker.skill}</p>
          <p className="text-gray-400 mb-2">Location: {worker.location}</p>
          <p className="text-gray-400 mb-4">Contact: {worker.contact}</p>
          <div className="flex items-center text-yellow-400 text-lg mb-8">
            <svg className="w-6 h-6 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.785.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path></svg>
            <span className="text-gray-400 font-semibold">{worker.rating}</span>
          </div>

          <h3 className="text-3xl font-bold text-white mb-4">Services Offered</h3>
          {workerServices.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {workerServices.map(service => (
                <div
                  key={service.id}
                  className="bg-gray-900 p-6 rounded-2xl shadow transition-transform transform hover:scale-[1.02] cursor-pointer border border-gray-700"
                  onClick={() => handleServiceClick(service.id)}
                >
                  <h4 className="text-xl font-semibold text-white">{service.title}</h4>
                  <p className="text-gray-400 text-sm">{service.description}</p>
                  <p className="text-lime-400 font-medium mt-2">Price: {service.price_range}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No services listed yet.</p>
          )}
        </div>
      </div>
    );
  };

  const ServiceDetail = () => {
    const service = services.find(s => s.id === selectedServiceId);
    if (!service) {
      return <div className="p-8 pt-40 text-center text-red-400 bg-gray-900 min-h-screen">Service not found.</div>;
    }
    const worker = workers.find(w => w.id === service.worker_id);

    return (
      <div className="p-8 bg-gray-900 min-h-screen text-gray-100 pt-40">
        <button
          onClick={() => setActiveTab('services')}
          className="mb-8 py-2 px-4 rounded-full bg-gray-800 text-gray-100 hover:bg-gray-700 transition-colors border border-gray-700"
        >
          &larr; Back to Services
        </button>
        <div className="bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-700 animate-fadeIn">
          <h2 className="text-4xl font-bold text-white mb-4">{service.title}</h2>
          <p className="text-gray-400 text-lg mb-4">{service.description}</p>
          <p className="text-lime-400 font-medium text-lg mb-4">Price: {service.price_range}</p>

          <h3 className="text-2xl font-bold text-white mb-2">Provided by:</h3>
          {worker ? (
            <div
              className="bg-gray-900 p-6 rounded-2xl shadow transition-transform transform hover:scale-[1.02] cursor-pointer border border-gray-700"
              onClick={() => handleWorkerClick(worker.id)}
            >
              <h4 className="text-xl font-semibold text-white">{worker.name}</h4>
              <p className="text-lime-400">{worker.skill}</p>
              <p className="text-gray-400 text-sm">Location: {worker.location}</p>
            </div>
          ) : (
            <p className="text-gray-400">Worker not found.</p>
          )}
        </div>
      </div>
    );
  };

  const Contact = () => (
    <div className="p-8 bg-gray-900 min-h-screen text-gray-100 pt-40">
      <h2 className="text-4xl font-bold text-center text-lime-400 mb-8 animate-fadeIn">Contact Us</h2>
      <div className="max-w-xl mx-auto bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-700 animate-slideUp">
        <p className="text-center text-gray-400 mb-6">
          Have a question or want to get in touch? Fill out the form below.
        </p>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-400 font-medium mb-1">Name</label>
            <input
              type="text"
              id="name"
              className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-400 font-medium mb-1">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-400 font-medium mb-1">Message</label>
            <textarea
              id="message"
              rows="4"
              className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-lime-500 to-teal-600 text-white font-semibold shadow-lg transition-transform transform hover:scale-105"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="font-sans antialiased text-gray-100 bg-gray-900 min-h-screen">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
          
          .font-sans, h1, h2, h3, h4, button, input, textarea {
            font-family: 'Inter', sans-serif;
          }

          .animate-fadeIn {
            animation: fadeIn 1.5s ease-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-slideUp {
            animation: slideUp 1.5s ease-out 0.5s forwards;
            opacity: 0;
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-zoomIn {
            animation: zoomIn 1.5s ease-out 1s forwards;
            transform: scale(0.9);
            opacity: 0;
          }
          @keyframes zoomIn {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 8s linear infinite;
          }
        `}
      </style>
      <Navbar />
      <main className="container mx-auto p-4">
        {(() => {
          switch (activeTab) {
            case 'home':
              return <Home />;
            case 'workers':
              return <Workers />;
            case 'services':
              return <Services />;
            case 'contact':
              return <Contact />;
            case 'worker-detail':
              return <WorkerDetail />;
            case 'service-detail':
              return <ServiceDetail />;
            default:
              return <Home />;
          }
        })()}
      </main>
    </div>
  );
}
