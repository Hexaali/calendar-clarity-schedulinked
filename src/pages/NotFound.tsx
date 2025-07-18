import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { BrandLogo } from "@/components/shared/Constants";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screenflex items-center justify-center px-4">
      <div className="max-w-2xl text-center space-y-4">
        <div className="mx-auto w-full h-32  rounded-xl flex items-center justify-center text-gray-400 text-sm">
          {BrandLogo}
        </div>
        <div className="text-[100px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-brand-orange leading-none">
          404
        </div>
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-800">
          Page Not Found
        </h1>
        <p className="text-gray-600 text-lg">
          Sorry, we couldn’t find the page you’re looking for. It might have been moved or deleted.
        </p>
        <div>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-brand-green hover:bg-brand-orange text-white rounded-lg transition-colors font-medium"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
