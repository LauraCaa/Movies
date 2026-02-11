import { useState, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleWatchlist } from "../features/moviesSlice";
import { 
  getMoviesDetail, 
  getMovieCredits, 
  getSimilarMovies, 
  getMovieVideos 
} from "../services/apiCall";

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async ({ params }) => {
  const [movie, cast, related, videos] = await Promise.all([
    getMoviesDetail(params.id),
    getMovieCredits(params.id),
    getSimilarMovies(params.id),
    getMovieVideos(params.id) // <--- Nueva petición
  ]);
  
  const trailer = videos?.find(vid => vid.type === "Trailer" && vid.site === "YouTube");
  
  return { movie, cast, related, trailer };
}

const MovieDetail = () => {
  const { movie, cast, related, trailer } = useLoaderData();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const watchlist = useSelector((state) => state.movies.watchlist);
  const isInWatchlist = watchlist.some((m) => m.id === movie.id);

  const [activeTab, setActiveTab] = useState("about");
  const [showTrailer, setShowTrailer] = useState(false); // Estado para el modal del video

  const IMG_API = "https://image.tmdb.org/t/p/w1280"; 
  const POSTER_API = "https://image.tmdb.org/t/p/w342";
  const PROFILE_API = "https://image.tmdb.org/t/p/w185";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [movie.id]);

  const {
    title, 
    poster_path, 
    backdrop_path,
    overview,
    vote_average,
    release_date,
    genres,
    runtime
  } = movie;

  return (
    <div className="relative min-h-screen bg-mabi-black text-white overflow-x-hidden pb-20">
      
      <div className="absolute top-0 left-0 w-full h-[70vh] md:h-screen">
        <img 
          src={IMG_API + (backdrop_path || poster_path)} 
          alt="background"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-mabi-black via-mabi-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-mabi-black via-transparent to-transparent" />
      </div>

      <div className="relative z-10 pt-32 px-6 md:px-16 lg:px-24 flex flex-col md:flex-row gap-12">
        
        <div className="hidden lg:block w-1/3 max-w-[380px] shrink-0">
          <img 
            src={IMG_API + poster_path} 
            alt={title} 
            className="rounded-2xl shadow-2xl border border-white/10 sticky top-32"
          />
        </div>

        <div className="flex-1 flex flex-col justify-end">
          <button 
            onClick={() => navigate("/")}
            className="mb-8 flex items-center gap-2 text-mabi-gray hover:text-white transition-colors text-xs font-bold uppercase tracking-[0.2em]"
          >
            ← Back to movies
          </button>

          <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-4 leading-none">
            {title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mb-8 text-sm font-bold">
            <span className="text-mabi-orange border border-mabi-orange px-2 py-0.5 rounded text-[10px] tracking-tighter">HD</span>
            <span className="text-gray-300">{release_date?.split('-')[0]}</span>
            <span className="flex items-center gap-1">
               <span className="text-yellow-500 text-lg">★</span> {vote_average?.toFixed(1)} 
            </span>
            {runtime > 0 && <span className="text-gray-300">{runtime} min</span>}
          </div>

          <div className="flex gap-4 mb-12">
            <button 
              onClick={() => trailer ? setShowTrailer(true) : alert("Trailer not available")}
              className="bg-white text-black px-10 py-3 rounded-md font-black hover:bg-mabi-orange transition-all flex items-center gap-2 group"
            >
              <span className="text-lg">▶</span> PLAY TRAILER
            </button>
            
            <button 
              onClick={() => dispatch(toggleWatchlist(movie))}
              className={`px-6 py-3 rounded-md font-bold border transition-all flex items-center gap-2 backdrop-blur-md ${
                isInWatchlist 
                ? "bg-mabi-orange text-black border-mabi-orange" 
                : "bg-gray-500/20 text-white border-white/10 hover:bg-white/10"
              }`}
            >
              {isInWatchlist ? "✓ IN WATCHLIST" : "+ WATCHLIST"}
            </button>
          </div>

          <div className="flex gap-8 border-b border-white/10 mb-8">
            {["about", "related", "cast"].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 font-bold text-xs uppercase tracking-[0.2em] transition-all relative ${
                  activeTab === tab ? "text-white" : "text-mabi-gray hover:text-white"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-mabi-orange animate-in fade-in slide-in-from-left-2" />
                )}
              </button>
            ))}
          </div>

          <div className="min-h-[400px]">
            {activeTab === "about" && (
              <div className="animate-in fade-in duration-500">
                <h3 className="text-mabi-orange font-bold uppercase text-[10px] tracking-[0.3em] mb-3">Overview</h3>
                <p className="text-gray-300 text-lg leading-relaxed font-light max-w-3xl mb-10">
                  {overview || "No description available for this title."}
                </p>

                <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
                  <div>
                    <span className="block text-mabi-gray text-[10px] uppercase font-bold tracking-widest mb-1">Release Date</span>
                    <span className="text-white font-medium">{release_date}</span>
                  </div>
                  <div>
                    <span className="block text-mabi-gray text-[10px] uppercase font-bold tracking-widest mb-1">Genres</span>
                    <span className="text-white font-medium">
                        {genres?.map(g => g.name).join(", ") || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "related" && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 animate-in fade-in zoom-in-95 duration-500">
                {related?.slice(0, 8).map((relatedMovie) => (
                  <div 
                    key={relatedMovie.id} 
                    onClick={() => navigate(`/${relatedMovie.id}`)}
                    className="cursor-pointer group relative"
                  >
                    <div className="overflow-hidden rounded-lg aspect-[2/3] border border-white/5">
                      <img 
                        src={relatedMovie.poster_path ? POSTER_API + relatedMovie.poster_path : "https://via.placeholder.com/342x513?text=No+Poster"} 
                        alt={relatedMovie.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <p className="mt-2 text-[11px] font-bold uppercase tracking-wider truncate group-hover:text-mabi-orange">{relatedMovie.title}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "cast" && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {cast?.slice(0, 10).map((person) => (
                  <div key={person.id} className="text-center group">
                    <div className="relative mb-3 overflow-hidden rounded-2xl aspect-square border border-white/10">
                      <img 
                        src={person.profile_path ? PROFILE_API + person.profile_path : "https://via.placeholder.com/185x185?text=User"} 
                        alt={person.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                    <p className="font-bold text-sm text-white">{person.name}</p>
                    <p className="text-[10px] text-mabi-gray uppercase tracking-tighter mt-1">{person.character}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {showTrailer && trailer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <button 
              onClick={() => setShowTrailer(false)}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-mabi-orange text-white p-2 rounded-full transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
              title="Movie Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  )
}

export default MovieDetail;