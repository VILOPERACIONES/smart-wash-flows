import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2, Mail, Lock } from 'lucide-react';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Button } from '@/components/ui/button';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const { login, isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate('/admin/dashboard', { replace: true });
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    
    if (result.success) {
      navigate('/admin/dashboard');
    } else {
      setError(result.error || 'Error al iniciar sesión');
    }
    
    setLoading(false);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        background: 'linear-gradient(135deg, hsl(210 20% 98%) 0%, hsl(0 0% 100%) 50%, hsl(240 100% 50% / 0.03) 100%)'
      }}
    >
      {/* Subtle dot pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'radial-gradient(hsl(218 69% 58%) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />
      
      <div 
        className="w-full max-w-[440px] bg-card/95 backdrop-blur-sm rounded-[20px] p-12 relative z-10"
        style={{
          border: '1px solid hsl(240 100% 50% / 0.1)',
          boxShadow: '0 20px 60px hsl(0 0% 0% / 0.12)'
        }}
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <div 
            className="inline-flex items-center justify-center w-[140px] h-[70px] rounded-xl mb-10 relative"
            style={{
              background: 'linear-gradient(135deg, hsl(240 100% 50%) 0%, hsl(218 100% 31%) 100%)',
              boxShadow: '0 4px 20px hsl(240 100% 50% / 0.4)'
            }}
          >
            <span className="text-primary-foreground font-bold text-2xl tracking-tight">A LAVAR</span>
          </div>
          <h1 className="font-bold text-[2rem] text-foreground mb-3 tracking-[-0.02em]">
            Panel de Administrador
          </h1>
          <p className="text-secondary font-normal text-base">
            Accede para gestionar tu contenido
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-foreground font-semibold text-sm">
              Correo electrónico
            </label>
            <div className="relative">
              <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
                emailFocused ? 'text-primary' : 'text-accent'
              }`}>
                <Mail size={20} />
              </div>
              <input
                id="email"
                type="email"
                placeholder="admin@alavar.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                className="w-full h-12 pl-12 pr-4 rounded-lg font-medium text-[0.95rem] transition-all duration-200 outline-none"
                style={{
                  border: emailFocused ? '1.5px solid hsl(240 100% 50%)' : '1.5px solid hsl(220 13% 91%)',
                  background: emailFocused ? 'hsl(0 0% 100%)' : 'hsl(210 20% 98%)',
                  boxShadow: emailFocused ? '0 0 0 3px hsl(240 100% 50% / 0.1)' : 'none'
                }}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-foreground font-semibold text-sm">
              Contraseña
            </label>
            <div className="relative">
              <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
                passwordFocused ? 'text-primary' : 'text-accent'
              }`}>
                <Lock size={20} />
              </div>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                className="w-full h-12 pl-12 pr-12 rounded-lg font-medium text-[0.95rem] transition-all duration-200 outline-none"
                style={{
                  border: passwordFocused ? '1.5px solid hsl(240 100% 50%)' : '1.5px solid hsl(220 13% 91%)',
                  background: passwordFocused ? 'hsl(0 0% 100%)' : 'hsl(210 20% 98%)',
                  boxShadow: passwordFocused ? '0 0 0 3px hsl(240 100% 50% / 0.1)' : 'none'
                }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-[52px] text-[1.05rem] font-bold mt-6 rounded-[10px] transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
            style={{
              background: 'linear-gradient(135deg, hsl(240 100% 50%) 0%, hsl(218 100% 31%) 100%)',
              boxShadow: '0 4px 14px hsl(240 100% 50% / 0.4)'
            }}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Iniciando sesión...
              </>
            ) : (
              'Iniciar sesión'
            )}
          </Button>

          {error && (
            <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-destructive text-sm text-center font-medium">{error}</p>
            </div>
          )}
        </form>

        {/* Forgot password link */}
        <div className="text-center mt-6">
          <button 
            type="button"
            className="text-accent text-sm font-medium hover:text-primary hover:underline transition-colors"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
