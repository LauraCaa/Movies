import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../features/moviesSlice";
import Loading from "../componets/Loading";
import { useNavigate } from "react-router-dom";
import { getVote } from "../services/apiCall";

function Movies() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { movieList, loading, error } = useSelector((state) => state.movies);

  const IMG_API = "https://image.tmdb.org/t/p/w1280";

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  if (loading) return <Loading />;
  if (error) return <h1 className="text-center mt-20 text-red-500">{error}</h1>;

  const heroMovie = movieList[0];
  const otherMovies = movieList.slice(1);

  return (
    <div className="bg-mabi-black min-h-screen pb-20">
      
      {heroMovie && (
        <div className="relative w-full h-[85vh] overflow-hidden">
          <img 
            src={IMG_API + heroMovie.backdrop_path} 
            alt={heroMovie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-mabi-black via-transparent to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-mabi-black/80 via-transparent to-transparent" />

          <div className="absolute bottom-20 left-10 md:left-20 max-w-2xl space-y-4">
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white italic">
              {heroMovie.title}
            </h1>
            <p className="text-gray-300 text-lg line-clamp-3">
              {heroMovie.overview}
            </p>
            <div className="flex items-center gap-4 pt-4">
              <button 
                onClick={() => navigate(`/${heroMovie.id}`)}
                className="bg-white text-black px-8 py-3 rounded-md font-bold hover:bg-mabi-orange transition-colors flex items-center gap-2"
              >
                <span>▶</span> PLAY
              </button>
              <button 
                onClick={() => navigate(`/${heroMovie.id}`)} // <--- Añade esto
                className="bg-gray-500/50 backdrop-blur-md text-white px-8 py-3 rounded-md font-bold hover:bg-gray-400 transition-colors"
              >
                DETAILS
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="px-10 md:px-20 mt-[-50px] relative z-10">
        <h2 className="text-2xl font-bold mb-6 text-white tracking-wide">
          More Like This
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {otherMovies.map((movie) => {
            const { title, vote_average, poster_path, id } = movie;
            return (
              <div 
                key={id}
                onClick={() => navigate(`/${id}`)} 
                className="group relative cursor-pointer transition-transform duration-300 hover:scale-105"
              >
                <div className="overflow-hidden rounded-xl shadow-lg border border-white/10">
                  <img 
                    src={IMG_API + poster_path} 
                    alt={title}
                    className="w-full h-auto object-cover group-hover:brightness-75 transition-all"
                  />
                </div>

                <div className="mt-3 flex justify-between items-start gap-2">
                  <h5 className="text-sm font-semibold text-gray-200 group-hover:text-mabi-orange transition-colors">
                    {title}
                  </h5>
                  <span 
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded text-black shadow-sm"
                    style={{ backgroundColor: getVote(vote_average) }}
                  >
                    {vote_average.toFixed(1)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Movies;