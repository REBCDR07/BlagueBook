import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

export default function Header() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <header className="w-full border-b border-white/20 bg-gradient-to-r from-yellow-50/80 via-blue-50/80 to-purple-50/80 backdrop-blur-xl shadow-sm relative animate-[fadeInDown_0.8s_ease-out] transform-gpu">
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[0.5px]"></div>
      
      <nav className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between relative z-10">
        <Link 
          to="/" 
          className="font-bold text-xl bg-gradient-to-r from-yellow-600 via-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-yellow-700 hover:via-blue-700 hover:to-purple-700 transition-all duration-500 transform hover:scale-105 animate-[fadeIn_1s_ease-out] transform-gpu"
        >
          <span className="relative">
            Laugh Link Hub
            <div className="absolute -inset-2 bg-white/20 backdrop-blur-sm rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          </span>
        </Link>
        
        <div className="flex items-center gap-3 animate-[fadeIn_1.2s_ease-out] transform-gpu">
          <Link 
            to="/" 
            className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-all duration-300 px-3 py-2 rounded-lg hover:bg-blue-50/80 backdrop-blur-sm hover:scale-105 transform-gpu relative group"
          >
            <span className="relative z-10">Accueil</span>
            <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100 transform-gpu"></div>
          </Link>
          
          {isAdmin && (
            <Link 
              to="/dashboard" 
              className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-all duration-300 px-3 py-2 rounded-lg hover:bg-purple-50/80 backdrop-blur-sm hover:scale-105 transform-gpu relative group"
            >
              <span className="relative z-10">Tableau de bord</span>
              <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100 transform-gpu"></div>
            </Link>
          )}
          
          {user ? (
            <Button 
              variant="secondary" 
              onClick={handleLogout}
              className="bg-gradient-to-r from-gray-100/80 to-gray-200/80 hover:from-gray-200/80 hover:to-gray-300/80 text-gray-700 font-medium border border-white/30 rounded-lg px-4 py-2 transition-all duration-300 hover:shadow-md backdrop-blur-xl hover:scale-105 transform-gpu relative group"
            >
              <span className="relative z-10">Déconnexion</span>
              <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100 transform-gpu"></div>
            </Button>
          ) : (
            <Button 
              onClick={() => navigate("/auth")}
              className="bg-gradient-to-r from-yellow-500/90 via-blue-600/90 to-purple-600/90 hover:from-yellow-600/90 hover:via-blue-700/90 hover:to-purple-700/90 text-white font-medium rounded-lg px-4 py-2 transition-all duration-300 hover:shadow-lg transform hover:scale-105 backdrop-blur-xl border border-white/20 relative group transform-gpu"
            >
              <span className="relative z-10">Se connecter</span>
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100 transform-gpu"></div>
            </Button>
          )}
        </div>
      </nav>

      <style jsx>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </header>
  );
}