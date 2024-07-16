import '/home/beehyv/Projects/Django/frontend/src/index.css'

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-green-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <img 
            src="https://beesheetsv2.beehyv.com/assets/images/logo.png" 
            alt="BeeHyv Logo" 
            className="h-10"
          />
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-white hover:text-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
            <img 
              src="https://w0.peakpx.com/wallpaper/979/89/HD-wallpaper-purple-smile-design-eye-smily-profile-pic-face-thumbnail.jpg" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;