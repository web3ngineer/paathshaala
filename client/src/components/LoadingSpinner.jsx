import { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";

const LoadingSpinner = () => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <FaSpinner className="w-16 h-16 text-blue-600 animate-spin" />
      <p className="mt-4 text-lg font-semibold text-gray-700">Loading, please wait...</p>
      {showMessage && (
        <p className="mt-2 text-md text-gray-600">
          Our free server is currently waking up, which may take a few moments. Please be patient while we get things up and running. Thank you for your understanding!
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
