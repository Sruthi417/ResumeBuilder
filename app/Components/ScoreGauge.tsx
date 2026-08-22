const ScoreGauge = ({ score = 75 }: { score: number }) => {
  const percentage = score / 100;
  const pathLength = 125.66; // Math.PI * 40

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-40 h-24">
        <svg viewBox="0 0 100 55" className="w-full h-full">
          <defs>
            <linearGradient
              id="gaugeGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="50%" stopColor="#d946ef" />
              <stop offset="100%" stopColor="#f43f5e" />
            </linearGradient>
          </defs>

          {/* Background arc */}
          <path
            d="M10,50 A40,40 0 0,1 90,50"
            fill="none"
            stroke="#f2f4f7"
            strokeWidth="9"
            strokeLinecap="round"
          />

          {/* Foreground arc with rounded ends */}
          <path
            d="M10,50 A40,40 0 0,1 90,50"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray={pathLength}
            strokeDashoffset={pathLength * (1 - percentage)}
            style={{ transition: "stroke-dashoffset 0.8s ease-in-out" }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-end pb-0 ">
          <span className="text-4xl font-bold text-gray-900 leading-none ">{score}</span>
          <span className="text-sm text-gray-400 font-medium ">/100</span>
        </div>
      </div>
    </div>
  );
};

export default ScoreGauge;
