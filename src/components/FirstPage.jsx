import "../index.css";
import { Link } from 'react-router-dom';

const FirstPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-5xl font-bold mb-8 font-sans">BEESHEETS</h1>
      <div className="space-x-4">
      <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Employee Login
        </Link>
        <Link to="/login" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          Admin Login
        </Link>
      </div>
    </div>
  );
};

export default FirstPage;