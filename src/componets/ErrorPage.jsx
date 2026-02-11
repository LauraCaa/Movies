import { useRouteError, Link } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div className="min-h-screen bg-mabi-black flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
            
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-[20rem] md:text-[30rem] font-black text-white/[0.02] select-none">
                    404
                </span>
            </div>

            <div className="relative z-10">
                <h1 className="text-mabi-orange text-8xl md:text-9xl font-black italic tracking-tighter mb-2 animate-pulse">
                    OOPS!
                </h1>
                
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 uppercase tracking-widest">
                    Pérdida de Señal
                </h2>

                <p className="text-mabi-gray max-w-md mx-auto mb-10 text-lg font-light">
                    Lo sentimos, no pudimos encontrar la escena que buscabas. Incluso en las mejores producciones hay errores de cámara.
                </p>

                <div className="mb-12 inline-block px-4 py-2 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">
                    <code className="text-sm text-mabi-orange font-mono uppercase tracking-wider">
                        Código de error: {error.statusText || error.message}
                    </code>
                </div>

                <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                    <Link
                        to="/"
                        className="bg-white text-black px-10 py-4 rounded-md font-black hover:bg-mabi-orange transition-all duration-300 uppercase tracking-widest text-sm shadow-xl hover:scale-105"
                    >
                        Volver al Inicio
                    </Link>
                    
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-gray-500/20 backdrop-blur-md border border-white/10 text-white px-10 py-4 rounded-md font-bold hover:bg-white/10 transition-all uppercase tracking-widest text-sm"
                    >
                        Reintentar
                    </button>
                </div>
            </div>

            <div className="absolute bottom-10 text-[10px] uppercase tracking-[0.5em] text-mabi-gray/30">
                Mabi Streaming Service • Internal Signal Error
            </div>
        </div>
    );
}