import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!email || !password) {
      setError('Por favor completa todos los campos.');
      triggerShake();
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor ingresa un email válido.');
      triggerShake();
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      triggerShake();
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Check credentials
    if (email === 'admin@alavar.com' && password === 'Admin123!') {
      if (rememberMe) {
        localStorage.setItem('adminSession', 'true');
      }
      navigate('/admin/dashboard');
    } else {
      setError('Credenciales incorrectas. Intenta de nuevo.');
      triggerShake();
      setIsLoading(false);
    }
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Column - Visual */}
      <div 
        className="relative overflow-hidden flex flex-col justify-center items-center p-10 md:p-20 h-[30vh] md:h-screen animate-fade-in"
        style={{
          background: 'linear-gradient(135deg, #0000FF 0%, #0033a0 50%, #4B82DF 100%)',
        }}
      >
        {/* Decorative Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 text-center">
          {/* Logo placeholder */}
          <div 
            className="mx-auto mb-8 md:mb-10 font-bold text-white tracking-tight"
            style={{ 
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              letterSpacing: '-0.02em',
            }}
          >
            A LAVAR
          </div>
          
          <h2 
            className="font-bold text-white mb-4 hidden md:block"
            style={{ 
              fontSize: '2.5rem',
              letterSpacing: '-0.02em',
            }}
          >
            Bienvenido de vuelta
          </h2>
          
          <p 
            className="text-white/90 max-w-[400px] mx-auto hidden md:block"
            style={{ 
              fontSize: '1.125rem',
              lineHeight: 1.6,
            }}
          >
            Administra tu contenido de forma simple y eficiente
          </p>
        </div>
      </div>

      {/* Right Column - Form */}
      <div 
        className="flex justify-center items-center p-6 md:p-20 h-[70vh] md:h-screen bg-white overflow-y-auto animate-fade-in"
        style={{ animationDelay: '0.1s' }}
      >
        <div className="w-full max-w-[440px]">
          {/* Badge */}
          <span 
            className="inline-flex mb-8 px-5 py-2 rounded-3xl font-semibold uppercase"
            style={{
              background: 'rgba(0, 0, 255, 0.08)',
              color: '#0000FF',
              fontSize: '0.8rem',
              letterSpacing: '0.05em',
            }}
          >
            Admin Panel
          </span>

          {/* Title */}
          <h1 
            className="font-bold mb-3"
            style={{ 
              fontSize: '2.25rem',
              color: '#000000',
              letterSpacing: '-0.02em',
            }}
          >
            Iniciar Sesión
          </h1>

          {/* Description */}
          <p 
            className="mb-12"
            style={{ 
              fontSize: '1rem',
              color: '#0033a0',
            }}
          >
            Accede al panel de administrador
          </p>

          {/* Form */}
          <form 
            onSubmit={handleSubmit} 
            className={`space-y-6 ${shake ? 'animate-shake' : ''}`}
            style={{
              animation: shake ? 'shake 0.5s ease-in-out' : 'none',
            }}
          >
            {/* Email Field */}
            <div>
              <label 
                className="block mb-2 font-semibold"
                style={{ fontSize: '0.9rem', color: '#000000' }}
              >
                Correo electrónico
              </label>
              <div className="relative">
                <Mail 
                  className="absolute left-[18px] top-1/2 -translate-y-1/2 transition-colors duration-300"
                  size={20}
                  style={{ color: emailFocused ? '#0000FF' : '#4B82DF' }}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  placeholder="admin@alavar.com"
                  className="w-full h-14 pl-[52px] pr-5 rounded-xl font-medium transition-all duration-300 outline-none"
                  style={{
                    background: emailFocused ? '#FFFFFF' : '#F9FAFB',
                    border: emailFocused ? '2px solid #0000FF' : '2px solid #E5E7EB',
                    boxShadow: emailFocused ? '0 0 0 4px rgba(0, 0, 255, 0.08)' : 'none',
                    fontSize: '1rem',
                    color: '#000000',
                  }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label 
                className="block mb-2 font-semibold"
                style={{ fontSize: '0.9rem', color: '#000000' }}
              >
                Contraseña
              </label>
              <div className="relative">
                <Lock 
                  className="absolute left-[18px] top-1/2 -translate-y-1/2 transition-colors duration-300"
                  size={20}
                  style={{ color: passwordFocused ? '#0000FF' : '#4B82DF' }}
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  placeholder="••••••••"
                  className="w-full h-14 pl-[52px] pr-[52px] rounded-xl font-medium transition-all duration-300 outline-none"
                  style={{
                    background: passwordFocused ? '#FFFFFF' : '#F9FAFB',
                    border: passwordFocused ? '2px solid #0000FF' : '2px solid #E5E7EB',
                    boxShadow: passwordFocused ? '0 0 0 4px rgba(0, 0, 255, 0.08)' : 'none',
                    fontSize: '1rem',
                    color: '#000000',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-0 bg-transparent border-none cursor-pointer transition-colors duration-200 hover:opacity-80"
                  style={{ color: '#0033a0' }}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex justify-between items-center pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="sr-only"
                  />
                  <div 
                    className="w-5 h-5 rounded-md border-2 transition-all duration-200 flex items-center justify-center"
                    style={{
                      background: rememberMe ? '#0000FF' : '#FFFFFF',
                      borderColor: rememberMe ? '#0000FF' : '#E5E7EB',
                    }}
                  >
                    {rememberMe && (
                      <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                        <path d="M1 5L4.5 8.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                </div>
                <span style={{ color: '#0033a0', fontSize: '0.9rem' }} className="font-medium">
                  Recordarme
                </span>
              </label>
              
              <a 
                href="#" 
                className="font-medium transition-colors duration-200 hover:underline"
                style={{ color: '#4B82DF', fontSize: '0.9rem' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#0000FF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#4B82DF')}
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 rounded-xl font-bold text-white flex justify-center items-center gap-2.5 transition-all duration-300"
              style={{
                background: isLoading 
                  ? 'linear-gradient(135deg, #0000FF 0%, #0033a0 100%)' 
                  : 'linear-gradient(135deg, #0000FF 0%, #0033a0 100%)',
                boxShadow: '0 8px 20px rgba(0, 0, 255, 0.25)',
                fontSize: '1.05rem',
                opacity: isLoading ? 0.7 : 1,
                cursor: isLoading ? 'not-allowed' : 'pointer',
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(0, 0, 255, 0.35)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 255, 0.25)';
              }}
              onMouseDown={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 255, 0.2)';
                }
              }}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Iniciando sesión...</span>
                </>
              ) : (
                'Iniciar Sesión'
              )}
            </button>

            {/* Error Message */}
            {error && (
              <div 
                className="flex items-center gap-3 p-4 rounded-xl animate-fade-in"
                style={{
                  background: 'rgba(220, 38, 38, 0.08)',
                  border: '1px solid rgba(220, 38, 38, 0.2)',
                }}
              >
                <AlertCircle size={20} style={{ color: '#DC2626' }} />
                <span className="font-medium" style={{ color: '#DC2626', fontSize: '0.9rem' }}>
                  {error}
                </span>
              </div>
            )}
          </form>

          {/* Separator */}
          <div className="flex items-center gap-4 my-10">
            <div className="flex-grow h-px" style={{ background: '#E5E7EB' }} />
            <span style={{ color: '#0033a0', fontSize: '0.85rem' }}>o</span>
            <div className="flex-grow h-px" style={{ background: '#E5E7EB' }} />
          </div>

          {/* Help Text */}
          <p className="text-center" style={{ color: '#0033a0', fontSize: '0.875rem' }}>
            ¿Necesitas ayuda?{' '}
            <a 
              href="#" 
              className="font-medium transition-colors duration-200 hover:underline"
              style={{ color: '#4B82DF' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#0000FF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#4B82DF')}
            >
              Soporte técnico
            </a>
          </p>

          {/* Demo Credentials Card */}
          <div 
            className="mt-8 p-4 rounded-xl"
            style={{
              background: 'rgba(75, 130, 223, 0.06)',
              border: '1px solid rgba(75, 130, 223, 0.15)',
            }}
          >
            <p className="font-semibold mb-2" style={{ color: '#4B82DF', fontSize: '0.85rem' }}>
              Credenciales de prueba:
            </p>
            <div style={{ color: '#0033a0', fontSize: '0.85rem' }}>
              <p>Email: <code className="font-mono">admin@alavar.com</code></p>
              <p>Password: <code className="font-mono">Admin123!</code></p>
            </div>
          </div>

          {/* Copyright */}
          <p 
            className="mt-8 text-center"
            style={{ color: '#0033a0', fontSize: '0.8rem', opacity: 0.7 }}
          >
            A LAVAR 2026 - Diseñado y Desarrollado por Búho Solutions.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;
