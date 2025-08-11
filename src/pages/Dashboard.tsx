import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, isAdmin, loading } = useAuth();
  const [jokes, setJokes] = useState<any[]>([]);
  const [counts, setCounts] = useState<Record<string, { likes: number; laughs: number; comments: number }>>({});

  useEffect(() => {
    document.title = 'Tableau de bord - Laugh Link Hub';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', "Gérez vos blagues et consultez les statistiques (likes, rires, commentaires).");
  }, []);

  useEffect(() => {
    if (!loading) {
      if (!user) navigate('/auth');
      if (user && isAdmin) {
        loadMyJokes(user.id);
      }
    }
  }, [user, isAdmin, loading, navigate]);

  const loadMyJokes = async (userId: string) => {
    const { data, error } = await (supabase as any).from('jokes').select('*').eq('author_id', userId).order('created_at', { ascending: false });
    if (!error) {
      setJokes(data || []);
      const ids = (data || []).map((j: any) => j.id);
      if (ids.length) {
        const [reactions, comments] = await Promise.all([
          (supabase as any).from('reactions').select('post_id, type').in('post_id', ids),
          (supabase as any).from('comments').select('post_id').in('post_id', ids)
        ]);
        const newCounts: Record<string, { likes: number; laughs: number; comments: number }> = {};
        ids.forEach((id: string) => {
          const likes = (reactions.data || []).filter((r: any) => r.post_id === id && String(r.type) === 'like').length;
          const laughs = (reactions.data || []).filter((r: any) => r.post_id === id && String(r.type) === 'laugh').length;
          const commentsCount = (comments.data || []).filter((c: any) => c.post_id === id).length;
          newCounts[id] = { likes, laughs, comments: commentsCount };
        });
        setCounts(newCounts);
      }
    }
  };

  const totalStats = useMemo(() => {
    const total = { likes: 0, laughs: 0, comments: 0 };
    Object.values(counts).forEach(c => {
      total.likes += c.likes;
      total.laughs += c.laughs;
      total.comments += c.comments;
    });
    return total;
  }, [counts]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-blue-50 to-purple-50 flex items-center justify-center relative overflow-hidden">
        {/* Glassmorphism loading background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-yellow-400/15 to-orange-500/15 rounded-full backdrop-blur-3xl border border-white/10 shadow-xl animate-[float_6s_ease-in-out_infinite,zoomPulse_4s_ease-in-out_infinite] transform-gpu"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tl from-blue-400/15 to-purple-500/15 rounded-full backdrop-blur-3xl border border-white/10 shadow-xl animate-[float_8s_ease-in-out_infinite_reverse,fadeInOut_5s_ease-in-out_infinite] transform-gpu"></div>
        </div>
        
        <div className="text-center relative z-10 bg-white/20 backdrop-blur-xl rounded-3xl p-8 border border-white/30 shadow-2xl animate-[zoomIn_1s_ease-out,fadeIn_1s_ease-out] transform-gpu">
          <div className="w-16 h-16 border-4 border-blue-200/50 border-t-blue-600 rounded-full animate-spin mx-auto mb-4 backdrop-blur-sm"></div>
          <p className="text-gray-600 font-medium">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Glassmorphism Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-gradient-to-br from-yellow-400/10 to-orange-500/10 rounded-full backdrop-blur-3xl border border-white/10 shadow-2xl animate-[float_12s_ease-in-out_infinite,fadeInOut_8s_ease-in-out_infinite] transform-gpu"></div>
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-gradient-to-tl from-blue-400/10 to-purple-500/10 rounded-full backdrop-blur-3xl border border-white/10 shadow-2xl animate-[float_15s_ease-in-out_infinite_reverse,zoomPulse_10s_ease-in-out_infinite] transform-gpu"></div>
        <div className="absolute top-1/3 right-1/5 w-96 h-96 bg-gradient-to-r from-purple-400/8 to-violet-500/8 rounded-full backdrop-blur-2xl border border-white/10 shadow-xl animate-[float_10s_ease-in-out_infinite_2s,fadeInOut_6s_ease-in-out_infinite] transform-gpu"></div>
        
        {/* Medium floating elements */}
        <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-gradient-to-br from-yellow-300/15 to-amber-400/15 rounded-full backdrop-blur-xl border border-white/10 shadow-lg animate-[float_8s_ease-in-out_infinite_1s,zoomPulse_6s_ease-in-out_infinite] transform-gpu"></div>
        <div className="absolute bottom-1/3 left-1/6 w-80 h-80 bg-gradient-to-tr from-blue-300/12 to-indigo-400/12 rounded-full backdrop-blur-xl border border-white/10 shadow-lg animate-[float_11s_ease-in-out_infinite_3s,fadeInOut_7s_ease-in-out_infinite] transform-gpu"></div>
      </div>

      <Header />
      
      <section className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:py-12">
        {isAdmin ? (
          <>
            {/* Admin Header with glassmorphism */}
            <div className="text-center mb-12 animate-[fadeInUp_1s_ease-out] transform-gpu">
              <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6 group">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/80 via-blue-500/80 to-purple-500/80 rounded-3xl shadow-2xl backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-all duration-500 animate-[zoomPulse_5s_ease-in-out_infinite] transform-gpu"></div>
                <div className="relative w-16 h-16 bg-white/40 rounded-2xl backdrop-blur-lg transform group-hover:scale-110 transition-transform duration-500 shadow-inner border border-white/30 flex items-center justify-center">
                  <span className="text-2xl animate-[fadeIn_1.2s_ease-out] transform-gpu">📊</span>
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-yellow-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 animate-[fadeIn_1.4s_ease-out] transform-gpu">
                Tableau de bord Admin
              </h1>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto animate-[fadeIn_1.6s_ease-out] transform-gpu">
                Gérez vos blagues et consultez les statistiques de votre communauté
              </p>
            </div>

            {/* Stats Overview with glassmorphism */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <Card className="bg-white/25 backdrop-blur-xl border border-white/30 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-2xl overflow-hidden group hover:scale-105 hover:bg-white/30 animate-[fadeInUp_0.8s_ease-out_0.2s_both] transform-gpu">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total blagues</p>
                      <p className="text-3xl font-bold text-gray-800 animate-[zoomIn_0.6s_ease-out_0.4s_both] transform-gpu">{jokes.length}</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400/80 to-orange-500/80 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-all duration-300 animate-[zoomPulse_4s_ease-in-out_infinite] transform-gpu">
                      <span className="text-white text-xl">📝</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/25 backdrop-blur-xl border border-white/30 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-2xl overflow-hidden group hover:scale-105 hover:bg-white/30 animate-[fadeInUp_0.8s_ease-out_0.4s_both] transform-gpu">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total likes</p>
                      <p className="text-3xl font-bold text-red-600 animate-[zoomIn_0.6s_ease-out_0.6s_both] transform-gpu">{totalStats.likes}</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-red-400/80 to-pink-500/80 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-all duration-300 animate-[zoomPulse_4s_ease-in-out_infinite_1s] transform-gpu">
                      <span className="text-white text-xl">❤️</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              

              <Card className="bg-white/25 backdrop-blur-xl border border-white/30 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-2xl overflow-hidden group hover:scale-105 hover:bg-white/30 animate-[fadeInUp_0.8s_ease-out_0.8s_both] transform-gpu">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Commentaires</p>
                      <p className="text-3xl font-bold text-blue-600 animate-[zoomIn_0.6s_ease-out_1s_both] transform-gpu">{totalStats.comments}</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-400/80 to-purple-500/80 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-all duration-300 animate-[zoomPulse_4s_ease-in-out_infinite_3s] transform-gpu">
                      <span className="text-white text-xl">💬</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons with glassmorphism */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-[fadeInUp_1s_ease-out_1s_both] transform-gpu">
              <Button 
                onClick={() => navigate('/new-joke')}
                className="bg-gradient-to-r from-yellow-500/90 via-blue-600/90 to-purple-600/90 hover:from-yellow-600 hover:via-blue-700 hover:to-purple-700 text-white font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 backdrop-blur-xl border border-white/20 transform-gpu"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Nouvelle blague
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/')}
                className="border-2 border-white/30 bg-white/20 backdrop-blur-xl text-gray-700 hover:bg-white/30 hover:scale-105 font-medium px-8 py-3 rounded-xl transition-all duration-500 transform-gpu"
              >
                Voir toutes les blagues
              </Button>
            </div>
            
            {/* Jokes List - AFFICHAGE HORIZONTAL avec glassmorphism */}
            <div className="animate-[fadeInUp_1.2s_ease-out_1.2s_both] transform-gpu">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500/80 to-pink-600/80 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20 animate-[zoomPulse_3s_ease-in-out_infinite] transform-gpu">
                  <span className="text-white text-sm">📝</span>
                </div>
                Mes blagues ({jokes.length})
              </h2>

              {/* Grille horizontale responsive avec glassmorphism */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jokes.map((j, index) => (
                  <Card 
                    key={j.id} 
                    className="flex flex-col backdrop-blur-xl bg-white/25 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-2xl overflow-hidden group hover:-translate-y-2 hover:scale-[1.02] hover:bg-white/30 animate-[fadeInUp_0.8s_ease-out_both] transform-gpu"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardHeader className="bg-gradient-to-r from-yellow-50/60 via-blue-50/60 to-purple-50/60 backdrop-blur-xl px-6 py-4 border-b border-white/20">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-yellow-400/80 via-blue-500/80 to-purple-600/80 rounded-xl flex items-center justify-center text-white font-bold text-sm backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-all duration-300 animate-[zoomPulse_4s_ease-in-out_infinite] transform-gpu" style={{ animationDelay: `${index * 0.2}s` }}>
                            #{index + 1}
                          </div>
                          <div>
                            <CardTitle className="text-sm font-semibold text-gray-800">
                              Blague #{index + 1}
                            </CardTitle>
                            <p className="text-xs text-gray-500">
                              {new Date(j.created_at).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-6 flex flex-col flex-grow backdrop-blur-sm">
                      {/* Contenu de la blague qui grandit pour remplir l'espace */}
                      <div className="flex-grow mb-6">
                        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap text-base line-clamp-6">
                          {j.content}
                        </p>
                      </div>
                      
                      {/* Stats - mt-auto pousse cette section en bas de la carte */}
                      <div className="flex flex-wrap gap-4 mt-auto pt-6 border-t border-white/20">
                        <div className="flex items-center gap-2 bg-red-50/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-red-100/50 hover:scale-105 transition-all duration-300 transform-gpu">
                          <span className="text-lg animate-[zoomPulse_3s_ease-in-out_infinite] transform-gpu">❤️</span>
                          <span className="font-semibold text-red-700">{counts[j.id]?.likes ?? 0}</span>
                          <span className="text-sm text-red-600">likes</span>
                        </div>
                        
                        
                        
                        <div className="flex items-center gap-2 bg-blue-50/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-blue-100/50 hover:scale-105 transition-all duration-300 transform-gpu">
                          <span className="text-lg animate-[zoomPulse_3s_ease-in-out_infinite_2s] transform-gpu">💬</span>
                          <span className="font-semibold text-blue-700">{counts[j.id]?.comments ?? 0}</span>
                          <span className="text-sm text-blue-600">commentaires</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {!jokes.length && (
                <Card className="backdrop-blur-xl bg-white/25 border border-white/30 shadow-xl rounded-2xl overflow-hidden mt-6 animate-[fadeInUp_1s_ease-out_1.4s_both] transform-gpu">
                  <CardContent className="p-12 text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-yellow-400/80 via-blue-500/80 to-purple-600/80 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/20 animate-[zoomPulse_4s_ease-in-out_infinite] transform-gpu">
                      <span className="text-3xl">🎭</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                      Aucune blague publiée
                    </h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      Vous n'avez pas encore publié de blagues. Commencez dès maintenant à partager votre humour !
                    </p>
                    <Button 
                      onClick={() => navigate('/new-joke')}
                      className="bg-gradient-to-r from-yellow-500/90 via-blue-600/90 to-purple-600/90 hover:from-yellow-600 hover:via-blue-700 hover:to-purple-700 text-white font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 backdrop-blur-xl border border-white/20 transform-gpu"
                    >
                      Créer ma première blague
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </>
        ) : (
          // Fan Dashboard with glassmorphism
          <div className="text-center py-16 animate-[fadeInUp_1s_ease-out] transform-gpu">
            <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6 group">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/80 via-blue-500/80 to-purple-500/80 rounded-3xl shadow-2xl backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-all duration-500 animate-[zoomPulse_5s_ease-in-out_infinite] transform-gpu"></div>
              <div className="relative w-16 h-16 bg-white/40 rounded-2xl backdrop-blur-lg transform group-hover:scale-110 transition-transform duration-500 shadow-inner border border-white/30 flex items-center justify-center">
                <span className="text-2xl animate-[fadeIn_1.2s_ease-out] transform-gpu">🎭</span>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-yellow-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 animate-[fadeIn_1.4s_ease-out] transform-gpu">
              Espace Fan
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8 animate-[fadeIn_1.6s_ease-out] transform-gpu">
              Bienvenue dans votre espace personnel ! Découvrez les dernières blagues et interagissez avec la communauté.
            </p>
            <Button 
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-yellow-500/90 via-blue-600/90 to-purple-600/90 hover:from-yellow-600 hover:via-blue-700 hover:to-purple-700 text-white font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 backdrop-blur-xl border border-white/20 animate-[fadeInUp_1.8s_ease-out] transform-gpu"
            >
              Découvrir les blagues
            </Button>
          </div>
        )}
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); }
          25% { transform: translateY(-30px) translateX(15px) scale(1.05); }
          50% { transform: translateY(-15px) translateX(-20px) scale(0.95); }
          75% { transform: translateY(-40px) translateX(10px) scale(1.02); }
        }
        
        @keyframes fadeInOut {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.6; }
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
      `}</style>
    </main>
  );
}

