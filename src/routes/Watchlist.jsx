import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toggleWatchlist } from "../features/moviesSlice";

function Watchlist() {
  const watchlist = useSelector((state) => state.movies.watchlist);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const IMG_API = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="min-h-screen bg-mabi-black pt-32 px-6 md:px-16 lg:px-24">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-white">
            My <span className="text-mabi-orange text-stroke">Watchlist</span>
          </h1>
          <p className="text-mabi-gray mt-2 uppercase tracking-[0.3em] text-[10px] font-bold">
            {watchlist.length} {watchlist.length === 1 ? 'Title' : 'Titles'} Saved
          </p>
        </div>
        
        <Link 
          to="/" 
          className="text-white border border-white/20 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all"
        >
          + Add more movies
        </Link>
      </div>

      {watchlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
          <div className="text-6xl mb-6 opacity-20 text-white">🎬</div>
          <h2 className="text-xl font-bold text-white mb-2 uppercase tracking-widest">Your list is empty</h2>
          <p className="text-mabi-gray max-w-xs mx-auto mb-8 font-light">
            No has guardado ninguna película todavía. Explora nuestro catálogo y crea tu colección.
          </p>
          <Link 
            to="/" 
            className="bg-mabi-orange text-black px-10 py-3 rounded-md font-black uppercase tracking-widest text-xs hover:bg-white transition-all shadow-lg shadow-mabi-orange/20"
          >
            Browse Movies
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 animate-in fade-in duration-700">
          {watchlist.map((movie) => (
            <div key={movie.id} className="group relative">
              <div 
                onClick={() => navigate(`/${movie.id}`)}
                className="cursor-pointer overflow-hidden rounded-2xl aspect-[2/3] border border-white/10 shadow-xl transition-transform duration-500 group-hover:scale-105"
              >
                <img 
                  src={movie.poster_path ? IMG_API + movie.poster_path : "https://via.placeholder.com/500x750?text=No+Image"} 
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:brightness-50 transition-all duration-500"
                />
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <button className="bg-white text-black p-3 rounded-full font-black text-xs uppercase tracking-tighter">
                      Details
                   </button>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-start">
                <div className="flex-1 pr-2">
                  <h3 className="text-sm font-bold text-white uppercase tracking-tight truncate group-hover:text-mabi-orange transition-colors">
                    {movie.title}
                  </h3>
                  <p className="text-[10px] text-mabi-gray font-bold tracking-widest uppercase">
                    {movie.release_date?.split('-')[0]}
                  </p>
                </div>
                
                <button 
                  onClick={() => dispatch(toggleWatchlist(movie))}
                  className="p-2 text-mabi-gray hover:text-red-500 transition-colors"
                  title="Remove from list"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Watchlist;