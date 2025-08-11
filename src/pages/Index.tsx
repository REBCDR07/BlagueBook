import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

function truncateWords(text: string, maxWords: number) {
  const words = text.split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(' ') + '…';
}

const Index = () => {
  const { user } = useAuth();
  const [jokes, setJokes] = useState<any[]>([]);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [reactions, setReactions] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

  useEffect(() => {
    document.title = 'Actualité des blagues - Laugh Link Hub';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Découvrez les dernières blagues publiées. Likez, riez et commentez !');
  }, []);

  useEffect(() => {
    (async () => {
      const { data, error } = await (supabase as any).from('jokes').select('*').order('created_at', { ascending: false });
      if (!error) {
        setJokes(data || []);
        const ids = (data || []).map((j: any) => j.id);
        if (ids.length) {
          const { data: r } = await (supabase as any).from('reactions').select('id, post_id, type, user_id').in('post_id', ids);
          const { data: c } = await (supabase as any).from('comments').select('id, post_id, user_id, content, created_at').in('post_id', ids);
          setReactions(r || []);
          setComments(c || []);
        } else {
          setReactions([]);
          setComments([]);
        }
      }
    })();
  }, []);

  const toggleExpand = (id: string) => setExpanded((e) => ({ ...e, [id]: !e[id] }));

  const countByType = (id: string, type: string) => reactions.filter((r) => r.post_id === id && String(r.type) === type).length;
  const userReacted = (id: string, type: string) => !!(user && reactions.find((r) => r.post_id === id && String(r.type) === type && r.user_id === user.id));

  const handleReact = async (postId: string, type: 'like' | 'laugh') => {
    if (!user) return toast({ title: 'Connectez-vous', description: 'Vous devez être connecté pour réagir.' });
    const existing = reactions.find((r) => r.post_id === postId && String(r.type) === type && r.user_id === user.id);
    if (existing) {
      await (supabase as any).from('reactions').delete().eq('id', existing.id);
      setReactions((prev) => prev.filter((r) => r.id !== existing.id));
    } else {
      const { data, error } = await (supabase as any).from('reactions').insert({ post_id: postId, type, user_id: user.id }).select();
      if (!error && data) setReactions((prev) => [...prev, data[0]]);
    }
  };

  const handleAddComment = async (postId: string) => {
    if (!user) return toast({ title: 'Connectez-vous', description: 'Vous devez être connecté pour commenter.' });
    const content = commentInputs[postId]?.trim();
    if (!content) return;
    const { data, error } = await (supabase as any).from('comments').insert({ post_id: postId, user_id: user.id, content }).select();
    if (!error && data) {
      setComments((prev) => [...prev, data[0]]);
      setCommentInputs((s) => ({ ...s, [postId]: '' }));
    }
  };

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
      
      <section className="relative z-10 mx-auto max-w-4xl px-4 py-8 sm:py-12">
        {/* Header with glassmorphism */}
        <div className="text-center mb-12 animate-[fadeInUp_1s_ease-out] transform-gpu">
          <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6 group">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/80 via-blue-500/80 to-purple-500/80 rounded-3xl shadow-2xl backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-all duration-500 animate-[zoomPulse_5s_ease-in-out_infinite] transform-gpu"></div>
            <div className="relative w-16 h-16 bg-white/40 rounded-2xl backdrop-blur-lg transform group-hover:scale-110 transition-transform duration-500 shadow-inner border border-white/30 flex items-center justify-center">
              <span className="text-2xl animate-[fadeIn_1.2s_ease-out] transform-gpu">😂</span>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-yellow-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 animate-[fadeIn_1.4s_ease-out] transform-gpu">
            Actualité des blagues
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto animate-[fadeIn_1.6s_ease-out] transform-gpu">
            Découvrez les dernières blagues publiées. Likez, riez et commentez !
          </p>
        </div>

        {/* Jokes Grid - AFFICHAGE HORIZONTAL avec glassmorphism */}
        <div className="animate-[fadeInUp_1.2s_ease-out_0.5s_both] transform-gpu">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500/80 to-pink-600/80 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20 animate-[zoomPulse_3s_ease-in-out_infinite] transform-gpu">
              <span className="text-white text-sm">😂</span>
            </div>
            Toutes les blagues ({jokes.length})
          </h2>

          {/* Grille horizontale responsive avec glassmorphism */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jokes.map((j, index) => {
              const isOpen = !!expanded[j.id];
              const preview = truncateWords(j.content, 50);
              const commentsForJoke = comments.filter(c => c.post_id === j.id);
              
              return (
                <Card 
                  key={j.id}
                  className="flex flex-col backdrop-blur-xl bg-white/25 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-2xl overflow-hidden group hover:-translate-y-2 hover:scale-[1.02] hover:bg-white/30 animate-[fadeInUp_0.8s_ease-out_both] transform-gpu"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="bg-gradient-to-r from-yellow-50/60 via-blue-50/60 to-purple-50/60 backdrop-blur-xl px-4 py-3 border-b border-white/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
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
                  
                  <CardContent className="p-4 flex flex-col flex-grow backdrop-blur-sm">
                    {/* Contenu de la blague qui grandit pour remplir l'espace */}
                    <div className="flex-grow mb-4">
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/20 h-full">
                        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap text-sm line-clamp-6">
                          {isOpen ? j.content : preview}
                        </p>
                        {j.content.split(/\s+/).length > 50 && (
                          <Button 
                            variant="outline"
                            onClick={() => toggleExpand(j.id)}
                            className="mt-3 w-full border-2 border-white/30 bg-white/20 backdrop-blur-xl text-gray-700 hover:bg-white/30 hover:scale-105 font-medium px-3 py-1 rounded-lg transition-all duration-300 text-xs transform-gpu"
                          >
                            {isOpen ? 'Voir moins' : 'Voir plus'}
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    {/* Boutons de réaction - mt-auto pousse cette section en bas de la carte */}
                    <div className="flex flex-wrap gap-2 mt-auto mb-4">
                      <Button 
                        variant={userReacted(j.id, 'like') ? 'default' : 'outline'}
                        onClick={() => handleReact(j.id, 'like')}
                        className={`${
                          userReacted(j.id, 'like') 
                            ? 'bg-gradient-to-r from-red-500/90 to-pink-600/90 hover:from-red-600 hover:to-pink-700 text-white border-red-300/50' 
                            : 'border-2 border-white/30 bg-white/20 backdrop-blur-xl text-gray-700 hover:bg-red-50/50'
                        } hover:scale-105 font-medium px-3 py-1 rounded-lg transition-all duration-300 backdrop-blur-sm shadow-lg text-xs transform-gpu flex-1`}
                      >
                        <span className="text-sm mr-1 animate-[zoomPulse_3s_ease-in-out_infinite] transform-gpu">❤️</span>
                        {countByType(j.id, 'like')}
                      </Button>
                      
                      <Button 
                        variant={userReacted(j.id, 'laugh') ? 'default' : 'outline'}
                        onClick={() => handleReact(j.id, 'laugh')}
                        className={`${
                          userReacted(j.id, 'laugh') 
                            ? 'bg-gradient-to-r from-yellow-500/90 to-orange-600/90 hover:from-yellow-600 hover:to-orange-700 text-white border-yellow-300/50' 
                            : 'border-2 border-white/30 bg-white/20 backdrop-blur-xl text-gray-700 hover:bg-yellow-50/50'
                        } hover:scale-105 font-medium px-3 py-1 rounded-lg transition-all duration-300 backdrop-blur-sm shadow-lg text-xs transform-gpu flex-1`}
                      >
                        <span className="text-sm mr-1 animate-[zoomPulse_3s_ease-in-out_infinite_1s] transform-gpu">😂</span>
                        {countByType(j.id, 'laugh')}
                      </Button>
                    </div>

                    {/* Section commentaires compacte */}
                    <div className="pt-3 border-t border-white/20">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-500/80 to-purple-600/80 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/20 animate-[zoomPulse_3s_ease-in-out_infinite] transform-gpu">
                          <span className="text-white text-xs">💬</span>
                        </div>
                        <h3 className="font-semibold text-gray-800 text-sm">
                          {commentsForJoke.length} commentaire{commentsForJoke.length !== 1 ? 's' : ''}
                        </h3>
                      </div>
                      
                      <div className="space-y-2">
                        {/* Affichage des derniers commentaires seulement */}
                        {commentsForJoke.slice(-2).map((c) => (
                          <div 
                            key={c.id} 
                            className="bg-white/20 backdrop-blur-sm rounded-lg p-2 border border-white/20 hover:bg-white/25 transition-all duration-300 transform-gpu"
                          >
                            <div className="text-gray-500 text-xs mb-1 font-medium">
                              {new Date(c.created_at).toLocaleDateString('fr-FR')}
                            </div>
                            <div className="whitespace-pre-wrap text-gray-800 leading-relaxed text-xs line-clamp-2">
                              {c.content}
                            </div>
                          </div>
                        ))}
                        
                        {/* Formulaire d'ajout de commentaire compact */}
                        <div className="flex gap-2 mt-3">
                          <Input 
                            placeholder="Commenter…" 
                            value={commentInputs[j.id] || ''} 
                            onChange={(e) => setCommentInputs((s) => ({ ...s, [j.id]: e.target.value }))}
                            className="bg-white/20 backdrop-blur-xl border border-white/30 text-gray-800 placeholder-gray-500 rounded-lg focus:bg-white/30 focus:border-white/50 transition-all duration-300 text-xs transform-gpu"
                          />
                          <Button 
                            onClick={() => handleAddComment(j.id)}
                            className="bg-gradient-to-r from-blue-500/90 to-purple-600/90 hover:from-blue-600 hover:to-purple-700 text-white font-medium px-3 py-1 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 backdrop-blur-xl border border-white/20 text-xs transform-gpu"
                          >
                            ✓
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {!jokes.length && (
            <div className="text-center py-16 animate-[fadeInUp_1s_ease-out] transform-gpu">
              <div className="w-24 h-24 bg-gradient-to-r from-gray-400/20 to-gray-500/20 rounded-full backdrop-blur-xl border border-white/30 flex items-center justify-center mx-auto mb-6 animate-[zoomPulse_4s_ease-in-out_infinite] transform-gpu">
                <span className="text-4xl">🤔</span>
              </div>
              <p className="text-gray-600 text-lg font-medium bg-white/20 backdrop-blur-xl rounded-2xl px-8 py-4 border border-white/30 inline-block">
                Aucune blague publiée pour l'instant.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Index;

