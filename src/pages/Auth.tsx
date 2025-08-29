import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import { toast } from "@/hooks/use-toast";

export default function AuthPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");

  // SEO
  useEffect(() => {
    const title = mode === "login" ? "Connexion - Laugh Link Hub" : "Inscription - Laugh Link Hub";
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Connectez-vous ou créez un compte (admin ou fan) pour publier et interagir avec des blagues.');
  }, [mode]);

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-100 via-blue-100 to-purple-100 relative overflow-hidden">
      {/* Glassmorphism Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large glassmorphism orbs with zoom and fade effects */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full backdrop-blur-3xl border border-white/10 shadow-2xl animate-[float_8s_ease-in-out_infinite,fadeInOut_6s_ease-in-out_infinite] transform-gpu"></div>
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-gradient-to-tl from-blue-400/15 to-purple-500/15 rounded-full backdrop-blur-3xl border border-white/10 shadow-2xl animate-[float_12s_ease-in-out_infinite_reverse,zoomPulse_8s_ease-in-out_infinite] transform-gpu"></div>
        <div className="absolute top-1/4 right-1/3 w-80 h-80 bg-gradient-to-r from-purple-400/15 to-violet-500/15 rounded-full backdrop-blur-2xl border border-white/10 shadow-xl animate-[float_10s_ease-in-out_infinite,fadeInOut_4s_ease-in-out_infinite_1s] transform-gpu"></div>
        
        {/* Medium glassmorphism elements */}
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-br from-yellow-300/20 to-amber-400/20 rounded-full backdrop-blur-xl border border-white/10 shadow-lg animate-[float_6s_ease-in-out_infinite_2s,zoomPulse_5s_ease-in-out_infinite] transform-gpu"></div>
        <div className="absolute bottom-1/4 left-1/6 w-72 h-72 bg-gradient-to-tr from-blue-300/15 to-indigo-400/15 rounded-full backdrop-blur-xl border border-white/10 shadow-lg animate-[float_9s_ease-in-out_infinite_1.5s,fadeInOut_7s_ease-in-out_infinite] transform-gpu"></div>
        
        {/* Small floating glassmorphism particles */}
        <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-yellow-400/40 rounded-full backdrop-blur-sm border border-white/20 shadow-md animate-[float_4s_ease-in-out_infinite,zoomPulse_3s_ease-in-out_infinite] transform-gpu"></div>
        <div className="absolute top-1/4 right-1/4 w-6 h-6 bg-blue-400/50 rounded-full backdrop-blur-sm border border-white/20 shadow-md animate-[float_5s_ease-in-out_infinite_1s,fadeInOut_4s_ease-in-out_infinite] transform-gpu"></div>
        <div className="absolute bottom-1/3 left-1/3 w-10 h-10 bg-purple-400/40 rounded-full backdrop-blur-sm border border-white/20 shadow-md animate-[float_7s_ease-in-out_infinite_2s,zoomPulse_4s_ease-in-out_infinite] transform-gpu"></div>
      </div>
      
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/5 via-transparent to-white/5 backdrop-blur-[0.5px] pointer-events-none"></div>
      
      <Header />
      
      <section className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-8 sm:py-12">
        <div className="w-full max-w-md sm:max-w-lg xl:max-w-xl animate-[fadeInUp_1s_ease-out,zoomIn_0.8s_ease-out] transform-gpu">
          <Card className="backdrop-blur-2xl bg-white/25 border border-white/30 shadow-2xl shadow-purple-500/10 rounded-3xl overflow-hidden transition-all duration-700 hover:shadow-3xl hover:shadow-yellow-500/20 hover:bg-white/30 hover:scale-[1.02] transform-gpu">
            <CardHeader className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl px-6 py-8 sm:px-8 sm:py-10 border-b border-white/20">
              <div className="text-center mb-8">
                {/* Animated Logo Container with glassmorphism */}
                <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6 group">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/80 via-blue-500/80 to-purple-500/80 rounded-3xl shadow-2xl backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-all duration-500 animate-[zoomPulse_4s_ease-in-out_infinite] transform-gpu"></div>
                  <div className="absolute inset-1 bg-gradient-to-r from-yellow-500/60 to-purple-600/60 rounded-3xl backdrop-blur-sm"></div>
                  <div className="relative w-10 h-10 bg-white/40 rounded-2xl backdrop-blur-lg transform group-hover:scale-110 transition-transform duration-500 shadow-inner border border-white/30">
                    <div className="absolute inset-2 bg-gradient-to-br from-white/60 to-white/30 rounded-lg backdrop-blur-sm"></div>
                  </div>
                  {/* Orbiting glassmorphism elements */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-yellow-400/80 to-orange-500/80 rounded-full backdrop-blur-sm border border-white/30 animate-[orbit_6s_linear_infinite,fadeInOut_3s_ease-in-out_infinite] transform-gpu"></div>
                  <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-r from-blue-400/80 to-purple-500/80 rounded-full backdrop-blur-sm border border-white/30 animate-[orbit_8s_linear_infinite_reverse,zoomPulse_4s_ease-in-out_infinite] transform-gpu"></div>
                </div>
                
                <h1 className="text-3xl sm:text-4xl font-black text-gray-800 mb-3 bg-gradient-to-r from-yellow-600 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-[fadeIn_1.2s_ease-out] transform-gpu">
                  {mode === 'login' ? 'Bon retour !' : 'Rejoignez-nous !'}
                </h1>
                <p className="text-gray-700 text-base sm:text-lg font-medium animate-[fadeIn_1.4s_ease-out] transform-gpu">
                  {mode === 'login' 
                    ? 'Retrouvez votre univers de rires' 
                    : 'Créez votre compte et partagez vos jokes'
                  }
                </p>
              </div>
              
              {/* Enhanced Mode Toggle with glassmorphism */}
              <div className="relative bg-white/20 backdrop-blur-xl rounded-2xl p-2 border border-white/30 shadow-inner">
                <div className={`absolute inset-2 rounded-xl transition-all duration-700 ease-out backdrop-blur-sm border border-white/20 ${
                  mode === 'login' 
                    ? 'translate-x-0 bg-gradient-to-r from-blue-500/80 via-blue-600/80 to-purple-600/80' 
                    : 'translate-x-full bg-gradient-to-r from-yellow-500/80 via-orange-500/80 to-red-500/80'
                } shadow-lg transform-gpu`}></div>
                
                <div className="relative flex">
                  <Button
                    variant="ghost"
                    onClick={() => setMode('login')}
                    className={`flex-1 relative z-10 rounded-xl transition-all duration-500 font-bold text-base py-3 backdrop-blur-sm transform-gpu hover:scale-105 ${
                      mode === 'login' 
                        ? 'text-white shadow-lg' 
                        : 'text-gray-700 hover:text-gray-900 hover:bg-white/10'
                    }`}
                  >
                    Connexion
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setMode('signup')}
                    className={`flex-1 relative z-10 rounded-xl transition-all duration-500 font-bold text-base py-3 backdrop-blur-sm transform-gpu hover:scale-105 ${
                      mode === 'signup' 
                        ? 'text-white shadow-lg' 
                        : 'text-gray-700 hover:text-gray-900 hover:bg-white/10'
                    }`}
                  >
                    Inscription
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="px-6 py-8 sm:px-8 sm:py-10 backdrop-blur-xl">
              <div className="transition-all duration-1000 ease-out transform-gpu">
                {mode === 'login' ? <LoginForm /> : <SignupForm />}
              </div>
            </CardContent>
          </Card>
          
          {/* Enhanced Additional Info with glassmorphism */}
          <div className="mt-8 text-center animate-[fadeInUp_1.6s_ease-out] transform-gpu">
            <div className="inline-flex items-center justify-center px-6 py-3 bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 shadow-lg hover:bg-white/25 hover:scale-105 transition-all duration-500 transform-gpu">
              <p className="text-sm text-gray-700 font-medium">
                {mode === 'login' ? (
                  <>Nouveau ? <span className="text-blue-600 cursor-pointer hover:text-blue-700 transition-colors font-semibold" onClick={() => setMode('signup')}>Créer un compte</span></>
                ) : (
                  <>Déjà membre ? <span className="text-purple-600 cursor-pointer hover:text-purple-700 transition-colors font-semibold" onClick={() => setMode('login')}>Se connecter</span></>
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); }
          25% { transform: translateY(-20px) translateX(10px) scale(1.05); }
          50% { transform: translateY(-10px) translateX(-15px) scale(0.95); }
          75% { transform: translateY(-30px) translateX(5px) scale(1.02); }
        }
        
        @keyframes fadeInOut {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
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
        
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(30px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(30px) rotate(-360deg); }
        }
      `}</style>
    </main>
  );
}

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast({ title: "Erreur de connexion", description: error.message });
    } else {
      toast({ title: "Connecté", description: "Bienvenue !" });
      navigate("/dashboard");
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-8">
      {/* Email Field */}
      <div className="space-y-3 group animate-[fadeInUp_0.8s_ease-out_0.2s_both] transform-gpu">
        <Label className="text-sm font-bold text-gray-800 flex items-center gap-3 group-focus-within:text-blue-600 transition-colors duration-300">
          <div className="relative">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full backdrop-blur-sm border border-white/30"></div>
            <div className="absolute inset-0 bg-blue-400 rounded-full animate-[zoomPulse_3s_ease-in-out_infinite] opacity-30 transform-gpu"></div>
          </div>
          Email
        </Label>
        <div className="relative">
          <Input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="votre.email@exemple.com"
            className="h-14 rounded-2xl border-2 border-white/30 bg-white/20 backdrop-blur-xl text-gray-800 placeholder:text-gray-600 focus:border-blue-500 focus:bg-white/30 focus:ring-4 focus:ring-blue-400/20 transition-all duration-500 text-base font-medium shadow-inner hover:bg-white/25 hover:scale-[1.02] transform-gpu"
            required 
          />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none backdrop-blur-sm"></div>
        </div>
      </div>
      
      {/* Password Field */}
      <div className="space-y-3 group animate-[fadeInUp_0.8s_ease-out_0.4s_both] transform-gpu">
        <Label className="text-sm font-bold text-gray-800 flex items-center gap-3 group-focus-within:text-blue-600 transition-colors duration-300">
          <div className="relative">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full backdrop-blur-sm border border-white/30"></div>
            <div className="absolute inset-0 bg-blue-400 rounded-full animate-[zoomPulse_3s_ease-in-out_infinite_1s] opacity-30 transform-gpu"></div>
          </div>
          Mot de passe
        </Label>
        <div className="relative">
          <Input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="••••••••••"
            className="h-14 rounded-2xl border-2 border-white/30 bg-white/20 backdrop-blur-xl text-gray-800 placeholder:text-gray-600 focus:border-blue-500 focus:bg-white/30 focus:ring-4 focus:ring-blue-400/20 transition-all duration-500 text-base font-medium shadow-inner hover:bg-white/25 hover:scale-[1.02] transform-gpu"
            required 
          />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none backdrop-blur-sm"></div>
        </div>
      </div>
      
      {/* Submit Button */}
      <div className="animate-[fadeInUp_0.8s_ease-out_0.6s_both] transform-gpu">
        <Button 
          type="submit" 
          disabled={loading}
          className="w-full h-14 bg-gradient-to-r from-blue-500/90 via-purple-500/90 to-violet-600/90 hover:from-blue-600 hover:via-purple-600 hover:to-violet-700 text-white font-bold text-lg rounded-2xl shadow-2xl shadow-blue-500/30 hover:shadow-purple-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 disabled:transform-none disabled:opacity-70 border border-white/20 backdrop-blur-xl relative overflow-hidden group transform-gpu"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-sm"></div>
          {loading ? (
            <div className="flex items-center justify-center gap-3 relative z-10">
              <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
              Connexion en cours…
            </div>
          ) : (
            <span className="relative z-10">Se connecter</span>
          )}
        </Button>
      </div>
    </form>
  );
}

function SignupForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<'admin' | 'fan'>('fan');
  const [avatar, setAvatar] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const redirectUrl = useMemo(() => `${window.location.origin}/`, []);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username, role },
        emailRedirectTo: redirectUrl,
      },
    });
    if (error) {
      setLoading(false);
      toast({ title: "Erreur d'inscription", description: error.message });
      return;
    }

    // Try to upload avatar if session exists (email confirmation may be required)
    try {
      const currentUser = data.user;
      if (currentUser && avatar) {
        const path = `${currentUser.id}/avatar-${Date.now()}`;
        const { error: upErr } = await supabase.storage.from('avatars').upload(path, avatar, {
          cacheControl: '3600',
          upsert: true,
        });
        if (!upErr) {
          const { data: pub } = supabase.storage.from('avatars').getPublicUrl(path);
          await (supabase as any).from('profiles').update({ avatar_url: pub.publicUrl, username }).eq('id', currentUser.id);
        }
      }
    } catch (e) {
      // ignore avatar errors for now
    }

    setLoading(false);
    if (!data.session) {
      toast({ title: "Vérifiez votre email", description: "Cliquez sur le lien de confirmation pour activer votre compte." });
      navigate("/");
    } else {
      toast({ title: "Bienvenue", description: "Inscription réussie" });
      navigate("/dashboard");
    }
  };

  return (
    <form onSubmit={handleSignup} className="space-y-8">
      {/* Username Field */}
      <div className="space-y-3 group animate-[fadeInUp_0.8s_ease-out_0.2s_both] transform-gpu">
        <Label className="text-sm font-bold text-gray-800 flex items-center gap-3 group-focus-within:text-yellow-600 transition-colors duration-300">
          <div className="relative">
            <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full backdrop-blur-sm border border-white/30"></div>
            <div className="absolute inset-0 bg-yellow-400 rounded-full animate-[zoomPulse_3s_ease-in-out_infinite] opacity-30 transform-gpu"></div>
          </div>
          Pseudo
        </Label>
        <div className="relative">
          <Input 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Votre pseudo"
            className="h-14 rounded-2xl border-2 border-white/30 bg-white/20 backdrop-blur-xl text-gray-800 placeholder:text-gray-600 focus:border-yellow-500 focus:bg-white/30 focus:ring-4 focus:ring-yellow-400/20 transition-all duration-500 text-base font-medium shadow-inner hover:bg-white/25 hover:scale-[1.02] transform-gpu"
            required 
          />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-500/10 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none backdrop-blur-sm"></div>
        </div>
      </div>
      
      {/* Email and Password Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-3 group animate-[fadeInUp_0.8s_ease-out_0.4s_both] transform-gpu">
          <Label className="text-sm font-bold text-gray-800 flex items-center gap-3 group-focus-within:text-yellow-600 transition-colors duration-300">
            <div className="relative">
              <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full backdrop-blur-sm border border-white/30"></div>
              <div className="absolute inset-0 bg-yellow-400 rounded-full animate-[zoomPulse_3s_ease-in-out_infinite_1s] opacity-30 transform-gpu"></div>
            </div>
            Email
          </Label>
          <div className="relative">
            <Input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="email@exemple.com"
              className="h-14 rounded-2xl border-2 border-white/30 bg-white/20 backdrop-blur-xl text-gray-800 placeholder:text-gray-600 focus:border-yellow-500 focus:bg-white/30 focus:ring-4 focus:ring-yellow-400/20 transition-all duration-500 text-base font-medium shadow-inner hover:bg-white/25 hover:scale-[1.02] transform-gpu"
              required 
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-500/10 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none backdrop-blur-sm"></div>
          </div>
        </div>
        
        <div className="space-y-3 group animate-[fadeInUp_0.8s_ease-out_0.6s_both] transform-gpu">
          <Label className="text-sm font-bold text-gray-800 flex items-center gap-3 group-focus-within:text-yellow-600 transition-colors duration-300">
            <div className="relative">
              <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full backdrop-blur-sm border border-white/30"></div>
              <div className="absolute inset-0 bg-yellow-400 rounded-full animate-[zoomPulse_3s_ease-in-out_infinite_2s] opacity-30 transform-gpu"></div>
            </div>
            Mot de passe
          </Label>
          <div className="relative">
            <Input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••••"
              className="h-14 rounded-2xl border-2 border-white/30 bg-white/20 backdrop-blur-xl text-gray-800 placeholder:text-gray-600 focus:border-yellow-500 focus:bg-white/30 focus:ring-4 focus:ring-yellow-400/20 transition-all duration-500 text-base font-medium shadow-inner hover:bg-white/25 hover:scale-[1.02] transform-gpu"
              required 
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-500/10 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none backdrop-blur-sm"></div>
          </div>
        </div>
      </div>
      
      {/* Role Selection */}
      <div className="space-y-3 animate-[fadeInUp_0.8s_ease-out_0.8s_both] transform-gpu">
        <Label className="text-sm font-bold text-gray-800 flex items-center gap-3">
          <div className="relative">
            <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-violet-500 rounded-full backdrop-blur-sm border border-white/30"></div>
            <div className="absolute inset-0 bg-purple-400 rounded-full animate-[zoomPulse_3s_ease-in-out_infinite_1.5s] opacity-30 transform-gpu"></div>
          </div>
          Type de compte
        </Label>
        <div className="grid grid-cols-2 gap-4">
          <Button
            type="button"
            variant={role === 'fan' ? 'default' : 'outline'}
            onClick={() => setRole('fan')}
            className={`h-14 rounded-2xl transition-all duration-500 font-bold text-base backdrop-blur-xl transform-gpu hover:scale-105 ${
              role === 'fan' 
                ? 'bg-gradient-to-r from-purple-500/90 to-violet-600/90 text-white shadow-lg border border-white/20' 
                : 'border-2 border-white/30 bg-white/20 text-gray-800 hover:bg-white/30'
            }`}
          >
            Fan
          </Button>

         {/* <Button
            type="button"
            variant={role === 'admin' ? 'default' : 'outline'}
            onClick={() => setRole('admin')}
            className={`h-14 rounded-2xl transition-all duration-500 font-bold text-base backdrop-blur-xl transform-gpu hover:scale-105 ${
              role === 'admin' 
                ? 'bg-gradient-to-r from-purple-500/90 to-violet-600/90 text-white shadow-lg border border-white/20' 
                : 'border-2 border-white/30 bg-white/20 text-gray-800 hover:bg-white/30'
            }`}
          >
            Admin
          </Button> */}
        </div>
      </div>
      
     {/* Avatar Upload */}
      <div className="space-y-3 animate-[fadeInUp_0.8s_ease-out_1s_both] transform-gpu">
        <Label className="text-sm font-bold text-gray-800 flex items-center gap-3">
          <div className="relative">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full backdrop-blur-sm border border-white/30"></div>
            <div className="absolute inset-0 bg-blue-400 rounded-full animate-[zoomPulse_3s_ease-in-out_infinite_2.5s] opacity-30 transform-gpu"></div>
          </div>
          Avatar (optionnel)
        </Label>
        <Input 
          type="file" 
          accept="image/*" 
          onChange={(e) => setAvatar(e.target.files?.[0] || null)}
          className="h-14 rounded-2xl border-2 border-white/30 bg-white/20 backdrop-blur-xl text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-yellow-50/80 file:text-yellow-700 hover:file:bg-yellow-100/80 transition-all duration-500 hover:bg-white/25 hover:scale-[1.02] transform-gpu"
        />
      </div>
      
      {/* Submit Button */}
      <div className="animate-[fadeInUp_0.8s_ease-out_1.2s_both] transform-gpu">
        <Button 
          type="submit" 
          disabled={loading}
          className="w-full h-14 bg-gradient-to-r from-yellow-500/90 via-orange-500/90 to-red-500/90 hover:from-yellow-600 hover:via-orange-600 hover:to-red-600 text-white font-bold text-lg rounded-2xl shadow-2xl shadow-yellow-500/30 hover:shadow-orange-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 disabled:transform-none disabled:opacity-70 border border-white/20 backdrop-blur-xl relative overflow-hidden group transform-gpu"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-sm"></div>
          {loading ? (
            <div className="flex items-center justify-center gap-3 relative z-10">
              <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
              Inscription en cours…
            </div>
          ) : (
            <span className="relative z-10">S'inscrire</span>
          )}
        </Button>
      </div>
    </form>
  );
}

