import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const professions = ["a Front-End Developer", "a Back-End Developer", "a Gym Rat", "a Crypto Trader", "a Professional Boxer"];

const TypingAnimation = ({ words }) => {
  const [currentWord, setCurrentWord] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting && currentText === words[currentWord]) {
        setTimeout(() => setIsDeleting(true), 1500);
        return;
      }

      if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentWord((prev) => (prev + 1) % words.length);
        return;
      }

      const delta = isDeleting ? 100 : 200;
      const text = words[currentWord].substring(0, currentText.length + (isDeleting ? -1 : 1));
      setCurrentText(text);
    }, Math.random() * 50 + 100);

    return () => clearTimeout(timeout);
  }, [currentText, currentWord, isDeleting, words]);

  return <span className="text-green-500">{currentText}</span>;
};

const LandingPage = ({ onDiscoverMore, onContact }) => (
  <div className="w-full sm:max-w-2xl sm:ml-[5%] md:ml-[10%]">
    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">notymn</h1>
    <p className="text-lg sm:text-xl md:text-2xl mb-8">
      I'm <TypingAnimation words={professions} />
    </p>
    <div className="flex space-x-4">
      <button 
        onClick={onDiscoverMore}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded inline-flex items-center transition duration-300"
      >
        <span>Discover More</span>
        <ArrowRight className="ml-2" size={20} />
      </button>
      <button 
        onClick={onContact}
        className="border-2 border-green-500 text-green-500 font-bold py-2 px-4 rounded inline-flex items-center transition duration-300 hover:bg-green-500 hover:bg-opacity-20"
      >
        <span>Contact Me</span>
      </button>
    </div>
  </div>
);

const ProjectCard = ({ title, description, url }) => (
  <a 
    href={url} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="block bg-gray-800 p-4 rounded-lg mb-4 transition duration-300 hover:bg-gray-700 hover:shadow-lg"
  >
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p>{description}</p>
  </a>
);

const DetailsPage = ({ onGoBack }) => (
  <div className="w-full sm:max-w-3xl sm:ml-[5%] md:ml-[10%]">
    <button 
      onClick={onGoBack}
      className="mb-8 text-green-500 hover:text-green-400 font-bold py-2 px-4 rounded inline-flex items-center transition duration-300"
    >
      <ArrowLeft className="mr-2" size={20} />
      <span>Go Back</span>
    </button>
    
    <section className="mb-12">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Who is notymn?</h2>
      <p className="text-base sm:text-lg mb-4">
        notymn, also known as Yamen Afifi, is a 18 year old professional boxer & well educated gentleman.
      </p>
      <p className="text-base sm:text-lg">
        Driven by curiosity and a desire to push boundaries, notymn constantly seeks new 
        challenges in both the digital and physical realms.
      </p>
    </section>
    
    <section>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
      <ProjectCard 
        title="Saudi Arabia Booking" 
        description="An innovative application that introduces new intuitive booking solutions for appointment/reservation based shops in the Kingdom of Saudi Arabia."
        url="https://example.com/saudi-arabia-booking"
      />
      <ProjectCard 
        title="The United Network" 
        description="Private chat-application that offers End to End encryption & media posting."
        url="https://example.com/united-network"
      />
      <ProjectCard 
        title="Essences" 
        description="An e-commerce shop that sells simplistic yet eye pleasing wardrobe peices."
        url="https://example.com/essences"
      />
    </section>
  </div>
);

const ContactPage = ({ onGoBack }) => (
  <div className="w-full sm:max-w-3xl sm:ml-[5%] md:ml-[10%]">
    <button 
      onClick={onGoBack}
      className="mb-8 text-green-500 hover:text-green-400 font-bold py-2 px-4 rounded inline-flex items-center transition duration-300"
    >
      <ArrowLeft className="mr-2" size={20} />
      <span>Go Back</span>
    </button>
    
    <section className="mb-12">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Contact Me</h2>
      <p className="text-base sm:text-lg mb-4">
        I'm always open to new opportunities and collaborations. Feel free to reach out!
      </p>
      <ul className="text-base sm:text-lg">
        <li>Email: <a className='text-green-500' href="mail:notymn@gmail.com">notymn@gmail.com</a></li>
        <li>Instagram: <a className='text-green-500' href="https://instagram.com/notymn_" target="_blank">@notymn</a></li>
        <li>Twitter: <a className='text-green-500' href="https://x.com/notvoiez" target='_blank'>@notymn</a></li>
      </ul>
    </section>
  </div>
);

const App = () => {
  const [currentPage, setCurrentPage] = useState('landing');

  return (
    <div className="min-h-screen bg-gray-900 text-white font-serif flex items-center">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {currentPage === 'landing' && (
          <LandingPage 
            onDiscoverMore={() => setCurrentPage('details')} 
            onContact={() => setCurrentPage('contact')}
          />
        )}
        {currentPage === 'details' && (
          <DetailsPage onGoBack={() => setCurrentPage('landing')} />
        )}
        {currentPage === 'contact' && (
          <ContactPage onGoBack={() => setCurrentPage('landing')} />
        )}
      </div>
    </div>
  );
};

export default App;