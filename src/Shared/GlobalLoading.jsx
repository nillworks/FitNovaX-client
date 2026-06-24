import React from 'react';

const GlobalLoading = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#F8FAFC]/80 backdrop-blur-md transition-opacity duration-500 overflow-hidden">
      
      {/* Massive organic background glowing blobs (not a card!) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-gradient-to-r from-[#22C55E]/20 to-[#15803D]/20 rounded-full blur-[100px] animate-[pulse_4s_ease-in-out_infinite] mix-blend-multiply"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] bg-gradient-to-t from-[#8FE3B0]/20 to-[#16A34A]/20 rounded-full blur-[80px] animate-[pulse_3s_ease-in-out_infinite_1s] mix-blend-multiply"></div>

      {/* Floating Freeform Animation */}
      <div className="relative z-10 flex flex-col items-center justify-center transform scale-125">
        
        {/* The Heartbeat */}
        <div className="w-48 h-24 flex items-center justify-center mb-6 drop-shadow-[0_0_15px_rgba(34,197,94,0.6)]">
          <svg 
            className="w-full h-full text-[#16A34A]" 
            viewBox="0 0 200 100" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <polyline 
              points="0,50 40,50 55,20 85,90 115,10 145,80 160,50 200,50" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              strokeDasharray="400"
              strokeDashoffset="400"
              className="animate-[heartbeat_2s_linear_infinite]"
            />
          </svg>
        </div>

        {/* Free-floating Text */}
        <h2 className="text-[#1E293B] font-black text-3xl tracking-tighter uppercase drop-shadow-sm">
          Fit<span className="text-[#22C55E]">Nova</span>
        </h2>
        
        <div className="flex items-center gap-3 mt-4">
          <div className="h-[2px] w-8 bg-gradient-to-r from-transparent to-[#22C55E] animate-pulse"></div>
          <p className="text-[#15803D] text-sm font-bold tracking-[0.3em] uppercase animate-pulse drop-shadow-sm">
            Loading
          </p>
          <div className="h-[2px] w-8 bg-gradient-to-l from-transparent to-[#22C55E] animate-pulse"></div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes heartbeat {
          0% { stroke-dashoffset: 400; }
          40% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -400; }
        }
      `}} />
    </div>
  );
};

export default GlobalLoading;
