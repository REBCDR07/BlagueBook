import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-blue-100 to-purple-100 relative overflow-hidden">
      {/* Glassmorphism Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-gradient-to-br from-yellow-400/15 to-orange-500/15 rounded-full backdrop-blur-3xl border border-white/10 shadow-2xl animate-[float_12s_ease-in-out_infinite,fadeInOut_8s_ease-in-out_infinite] transform-gpu"></div>
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-gradient-to-tl from-blue-400/12 to-purple-500/12 rounded-full backdrop-blur-3xl border border-white/10 shadow-2xl animate-[float_15s_ease-in-out_infinite_reverse,zoomPulse_10s_ease-in-out_infinite] transform-gpu"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-violet-500/10 rounded-full backdrop-blur-2xl border border-white/10 shadow-xl animate-[float_9s_ease-in-out_infinite_2s,fadeInOut_6s_ease-in-out_infinite] transform-gpu"></div>
        
        {/* Medium floating elements */}
        <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-gradient-to-br from-yellow-300/18 to-amber-400/18 rounded-full backdrop-blur-xl border border-white/10 shadow-lg animate-[float_7s_ease-in-out_infinite_1s,zoomPulse_5s_ease-in-out_infinite] transform-gpu"></div>
        <div className="absolute bottom-1/3 left-1/6 w-72 h-72 bg-gradient-to-tr from-blue-300/15 to-indigo-400/15 rounded-full backdrop-blur-xl border border-white/10 shadow-lg animate-[float_11s_ease-in-out_infinite_3s,fadeInOut_7s_ease-in-out_infinite] transform-gpu"></div>
        
        {/* Small floating particles */}
        <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-yellow-400/25 rounded-full backdrop-blur-sm border border-white/20 shadow-md animate-[float_4s_ease-in-out_infinite,zoomPulse_3s_ease-in-out_infinite] transform-gpu"></div>
        <div className="absolute top-1/4 right-1/3 w-12 h-12 bg-blue-400/30 rounded-full backdrop-blur-sm border border-white/20 shadow-md animate-[float_6s_ease-in-out_infinite_2s,fadeInOut_4s_ease-in-out_infinite] transform-gpu"></div>
        <div className="absolute bottom-1/4 left-1/4 w-14 h-14 bg-purple-400/25 rounded-full backdrop-blur-sm border border-white/20 shadow-md animate-[float_8s_ease-in-out_infinite_3s,zoomPulse_4s_ease-in-out_infinite] transform-gpu"></div>
      </div>
      
      <div className="text-center relative z-10 bg-white/25 backdrop-blur-2xl rounded-3xl p-12 shadow-2xl border border-white/30 max-w-lg mx-4 animate-[fadeInUp_1s_ease-out,zoomIn_0.8s_ease-out] transform-gpu">
        {/* Animated 404 Icon with glassmorphism */}
        <div className="relative inline-flex items-center justify-center w-32 h-32 mb-8 group">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/80 via-blue-500/80 to-purple-500/80 rounded-full shadow-2xl backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-all duration-500 animate-[zoomPulse_5s_ease-in-out_infinite] transform-gpu"></div>
          <div className="absolute inset-2 bg-white/40 backdrop-blur-xl rounded-full border border-white/30 shadow-inner"></div>
          <div className="relative text-4xl font-black bg-gradient-to-r from-yellow-600 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-[fadeIn_1.2s_ease-out] transform-gpu">
            404
          </div>
          {/* Orbiting glassmorphism elements */}
          <div className="absolute -top-4 -right-4 w-6 h-6 bg-gradient-to-r from-yellow-400/80 to-orange-500/80 rounded-full backdrop-blur-sm border border-white/30 animate-[orbit_8s_linear_infinite,zoomPulse_3s_ease-in-out_infinite] transform-gpu"></div>
          <div className="absolute -bottom-4 -left-4 w-4 h-4 bg-gradient-to-r from-blue-400/80 to-purple-500/80 rounded-full backdrop-blur-sm border border-white/30 animate-[orbit_10s_linear_infinite_reverse,fadeInOut_4s_ease-in-out_infinite] transform-gpu"></div>
        </div>
        
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-600 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-[fadeIn_1.4s_ease-out] transform-gpu">
          Oops! Page introuvable
        </h1>
        <p className="text-xl text-gray-700 mb-8 max-w-md mx-auto leading-relaxed animate-[fadeIn_1.6s_ease-out] transform-gpu">
          Il semblerait que cette page ait disparu dans l'univers des blagues !
        </p>
        
        <a 
          href="/" 
          className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-500/90 via-blue-600/90 to-purple-600/90 hover:from-yellow-600/90 hover:via-blue-700/90 hover:to-purple-700/90 text-white font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 backdrop-blur-xl border border-white/20 animate-[fadeInUp_1.8s_ease-out] transform-gpu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Retour à l'accueil
        </a>
        
        <div className="mt-8 text-sm text-gray-600 bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/20 animate-[fadeIn_2s_ease-out] transform-gpu">
          <p className="flex items-center justify-center gap-2">
            Peut-être qu'une bonne blague vous remontera le moral ! 
            <span className="animate-[zoomPulse_2s_ease-in-out_infinite] transform-gpu">😄</span>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); }
          25% { transform: translateY(-30px) translateX(20px) scale(1.08); }
          50% { transform: translateY(-15px) translateX(-25px) scale(0.92); }
          75% { transform: translateY(-40px) translateX(15px) scale(1.05); }
        }
        
        @keyframes fadeInOut {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.7; }
        }
        
        @keyframes zoomPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes zoomIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(40px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(40px) rotate(-360deg); }
        }
      `}</style>
    </div>
  );
};

export default NotFound;

