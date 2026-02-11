import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../features/authSlice";

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setUser({ name, password }));
    navigate("/");
    setName("");
    setPassword("");
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-mabi-black">
      
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2000" 
          alt="bg" 
          className="w-full h-full object-cover opacity-30 scale-105 blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-mabi-black via-transparent to-mabi-black" />
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-10 rounded-3xl shadow-2xl">
          
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black italic text-mabi-orange tracking-tighter mb-2">
              MABI
            </h1>
            <p className="text-mabi-gray text-sm uppercase tracking-[0.2em]">Sign In to your account</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            
            <div className="space-y-2">
              <label htmlFor="name" className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                User Name
              </label>
              <input 
                type="text" 
                id="name" 
                required 
                placeholder="Enter your username"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-mabi-orange focus:ring-1 focus:ring-mabi-orange transition-all duration-300"
                value={name} 
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                Password
              </label>
              <input 
                type="password"
                id="password" 
                required 
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-mabi-orange focus:ring-1 focus:ring-mabi-orange transition-all duration-300"
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-mabi-orange hover:bg-white text-black font-black py-4 rounded-xl transition-all duration-300 uppercase tracking-widest text-sm shadow-lg shadow-mabi-orange/20 active:scale-[0.98]"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 text-center space-y-4">
            <p className="text-mabi-gray text-xs">
              New to Mabi? <span className="text-white font-bold cursor-pointer hover:underline">Sign up now.</span>
            </p>
            <p className="text-[10px] text-gray-600 leading-tight">
              This page is protected by Google reCAPTCHA to ensure you're not a bot.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;