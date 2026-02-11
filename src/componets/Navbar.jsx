import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const watchlist = useSelector((state) => state.movies.watchlist);

  const navLinkClass = ({ isActive }) =>
    `transition-colors duration-300 hover:text-mabi-orange flex items-center gap-2 ${
      isActive ? "text-mabi-orange border-b-2 border-mabi-orange pb-1" : "text-gray-300"
    }`;

  return (
    <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-10 py-5 bg-gradient-to-b from-black/90 to-transparent backdrop-blur-sm">
      
      <div className="flex items-center gap-10">
        <Link to="/" className="text-2xl font-black tracking-tighter text-mabi-orange italic cursor-pointer">
          LAMI
        </Link>
        
        <ul className="flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em]">
          <li>
            <NavLink to="/" className={navLinkClass}>
              Movies
            </NavLink>
          </li>
          
          <li className="relative">
            <NavLink to="/watchlist" className={navLinkClass}>
              Watchlist
              {watchlist.length > 0 && (
                <span className="bg-mabi-orange text-black text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {watchlist.length}
                </span>
              )}
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="flex items-center gap-6">
        {user?.name ? (
          <div className="flex items-center gap-4 border-l border-white/10 pl-6">
            <div className="text-right">
                <p className="text-[10px] text-mabi-gray uppercase font-bold tracking-widest">Premium</p>
                <span className="text-sm font-bold text-white leading-none">{user.name}</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-mabi-orange to-yellow-500 flex items-center justify-center text-sm font-black text-black uppercase shadow-lg shadow-mabi-orange/20">
              {user.name.charAt(0)}
            </div>
          </div>
        ) : (
          <NavLink 
            to="/login" 
            className="px-6 py-2 border border-mabi-orange text-mabi-orange hover:bg-mabi-orange hover:text-black font-bold text-[10px] rounded uppercase tracking-widest transition-all"
          >
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
}

export default Navbar;