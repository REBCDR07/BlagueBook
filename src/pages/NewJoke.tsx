import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function NewJokePage() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    document.title = 'Nouvelle blague - Laugh Link Hub';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', "Rédigez et publiez une nouvelle blague (limite 10 000 caractères).");
  }, []);

  useEffect(() => {
    if (!loading) {
      if (!user) navigate('/auth');
      if (user && !isAdmin) navigate('/');
    }
  }, [user, isAdmin, loading, navigate]);

  const remaining = useMemo(() => 10000 - content.length, [content.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return navigate('/auth');
    if (!isAdmin) {
      toast({ title: 'Action non autorisée', description: 'Seuls les admins peuvent publier.' });
      return;
    }
    if (!content.trim()) {
      toast({ title: 'Contenu vide', description: 'Écrivez votre blague.' });
      return;
    }
    setSaving(true);
    const { error } = await (supabase as any).from('jokes').insert({ content, author_id: user.id });
    setSaving(false);
    if (error) {
      toast({ title: 'Échec de la publication', description: error.message });
    } else {
      toast({ title: 'Publié', description: 'Votre blague est en ligne !' });
      navigate('/');
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Glassmorphism Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-gradient-to-br from-yellow-400/12 to-orange-500/12 rounded-full backdrop-blur-3xl border border-white/10 shadow-2xl animate-[float_10s_ease-in-out_infinite,fadeInOut_7s_ease-in-out_infinite] transform-gpu"></div>
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-gradient-to-tl from-blue-400/10 to-purple-500/10 rounded-full backdrop-blur-3xl border border-white/10 shadow-2xl animate-[float_14s_ease-in-out_infinite_reverse,zoomPulse_9s_ease-in-out_infinite] transform-gpu"></div>
        <div className="absolute top-1/4 right-1/5 w-80 h-80 bg-gradient-to-r from-purple-400/8 to-violet-500/8 rounded-full backdrop-blur-2xl border border-white/10 shadow-xl animate-[float_8s_ease-in-out_infinite_2s,fadeInOut_5s_ease-in-out_infinite] transform-gpu"></div>
        
        {/* Medium floating elements */}
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-br from-yellow-300/15 to-amber-400/15 rounded-full backdrop-blur-xl border border-white/10 shadow-lg animate-[float_6s_ease-in-out_infinite_1s,zoomPulse_4s_ease-in-out_infinite] transform-gpu"></div>
        <div className="absolute bottom-1/3 left-1/6 w-72 h-72 bg-gradient-to-tr from-blue-300/12 to-indigo-400/12 rounded-full backdrop-blur-xl border border-white/10 shadow-lg animate-[float_9s_ease-in-out_infinite_3s,fadeInOut_6s_ease-in-out_infinite] transform-gpu"></div>
      </div>

      <Header />
      <main className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
        <div className="bg-white/25 dark:bg-gray-800/25 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 overflow-hidden animate-[fadeInUp_1s_ease-out,zoomIn_0.8s_ease-out] transform-gpu">
          {/* Header Section with glassmorphism */}
          <div className="bg-gradient-to-r from-yellow-500/90 via-blue-600/90 to-purple-600/90 px-6 py-8 sm:px-8 relative backdrop-blur-sm">
            <div className="absolute inset-0 bg-white/5 backdrop-blur-[0.5px]"></div>
            <div className="flex items-center space-x-3 relative z-10">
              <div className="bg-white/25 backdrop-blur-xl rounded-full p-3 border border-white/30 shadow-lg animate-[zoomPulse_4s_ease-in-out_infinite] transform-gpu">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white animate-[fadeIn_1.2s_ease-out] transform-gpu">
                  Écrire une blague
                </h1>
                <p className="text-white/95 mt-1 text-sm sm:text-base animate-[fadeIn_1.4s_ease-out] transform-gpu">
                  Partagez votre humour avec la communauté
                </p>
              </div>
            </div>
          </div>

          {/* Form Section with glassmorphism */}
          <div className="p-6 sm:p-8 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Textarea Container */}
              <div className="relative animate-[fadeInUp_0.8s_ease-out_0.2s_both] transform-gpu">
                <label htmlFor="joke-content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Contenu de la blague
                </label>
                <div className="relative group">
                  <Textarea
                    id="joke-content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={12}
                    maxLength={10000}
                    placeholder="Écrivez votre blague ici... Soyez créatif et amusant !"
                    className="w-full min-h-[300px] p-4 text-base leading-relaxed resize-none border-2 border-white/30 dark:border-gray-600/30 bg-white/20 backdrop-blur-xl rounded-xl focus:border-blue-500/50 focus:ring-2 focus:ring-purple-200/50 dark:focus:ring-blue-800/50 transition-all duration-500 dark:bg-gray-700/20 hover:bg-white/25 dark:hover:bg-gray-600/25 hover:scale-[1.01] transform-gpu"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-500/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none backdrop-blur-[0.5px]" />
                </div>
              </div>

              {/* Stats and Actions with glassmorphism */}
              <div className="bg-gradient-to-r from-yellow-50/60 via-blue-50/60 to-purple-50/60 dark:bg-gray-700/25 backdrop-blur-xl rounded-xl p-4 border border-white/30 shadow-lg animate-[fadeInUp_0.8s_ease-out_0.4s_both] transform-gpu">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  {/* Character Count */}
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full backdrop-blur-sm border border-white/30 animate-[zoomPulse_3s_ease-in-out_infinite] transform-gpu ${remaining < 1000 ? 'bg-red-500/80' : remaining < 2000 ? 'bg-yellow-500/80' : 'bg-green-500/80'}`} />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      <span className={remaining < 1000 ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-300'}>
                        {remaining.toLocaleString()}
                      </span>
                      <span className="text-gray-400"> / 10 000 caractères restants</span>
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="flex-1 max-w-xs">
                    <div className="w-full bg-white/30 dark:bg-gray-600/30 backdrop-blur-sm rounded-full h-2 border border-white/20">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 backdrop-blur-sm transform-gpu ${
                          remaining < 1000 ? 'bg-red-500/80' : 
                          remaining < 2000 ? 'bg-yellow-500/80' : 
                          'bg-gradient-to-r from-yellow-500/80 via-blue-500/80 to-purple-500/80'
                        }`}
                        style={{ width: `${Math.max(0, Math.min(100, ((10000 - remaining) / 10000) * 100))}%` }}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    disabled={saving || !content.trim()}
                    className="bg-gradient-to-r from-yellow-500/90 via-blue-600/90 to-purple-600/90 hover:from-yellow-600/90 hover:via-blue-700/90 hover:to-purple-700/90 text-white font-medium px-8 py-2.5 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none min-w-[120px] backdrop-blur-xl border border-white/20 transform-gpu"
                  >
                    {saving ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Publication...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        <span>Publier</span>
                      </div>
                    )}
                  </Button>
                </div>
              </div>

              {/* Tips Section with glassmorphism */}
              <div className="bg-gradient-to-r from-blue-50/60 via-purple-50/60 to-yellow-50/60 dark:bg-blue-900/20 backdrop-blur-xl border border-blue-200/50 dark:border-blue-800/50 rounded-xl p-4 shadow-lg animate-[fadeInUp_0.8s_ease-out_0.6s_both] transform-gpu">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-blue-300/30 animate-[zoomPulse_4s_ease-in-out_infinite] transform-gpu">
                      <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-1">
                      Conseils pour une bonne blague
                    </h3>
                    <p className="text-sm text-blue-700 dark:text-blue-400 leading-relaxed">
                      Soyez original, respectueux et amusant. Les meilleures blagues sont souvent courtes et surprenantes !
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); }
          25% { transform: translateY(-25px) translateX(15px) scale(1.05); }
          50% { transform: translateY(-15px) translateX(-20px) scale(0.95); }
          75% { transform: translateY(-35px) translateX(10px) scale(1.02); }
        }
        
        @keyframes fadeInOut {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.6; }
        }
        
        @keyframes zoomPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes zoomIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

