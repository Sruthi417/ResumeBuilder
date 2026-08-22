import ScoreGauge from "./ScoreGauge";
import ScoreBadge from "./ScoreBadge";
import "./OverView.scss";

interface CategoryProps {
  title: string;
  score: number;
}

const Category = ({ title, score }: CategoryProps) => {
  return (
    <div className="overview__category">
      {/* CATEGORY NAME */}
      <div className="overview__category-title">
        <p>{title}</p>
      </div>

      {/* PROGRESS BAR */}
      <div className="overview__progress">
        <div
          className="overview__progress-fill"
          style={{ width: `${Math.min(Math.max(score, 0), 100)}%` }}
        />
      </div>

      {/* SCORE */}
      <div className="overview__score">
        <span>{score}</span>
        <small>/100</small>
      </div>

      {/* EXISTING SCORE BADGE */}
      <div className="overview__badge">
        <ScoreBadge score={score} />
      </div>
    </div>
  );
};

const OverView = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="overview">
      {/* =====================================================
          TOP SCORE
      ===================================================== */}
      <div className="overview__header">
        <div className="overview__gauge">
          <ScoreGauge score={feedback.overallScore} />
        </div>

        <div className="overview__header-content">
          <h2>Your Resume Score</h2>

          <p>
            This score is calculated based on the variables listed below.
          </p>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="overview__divider" />

      {/* =====================================================
          CATEGORY SCORES
      ===================================================== */}
      <div className="overview__categories">
        <Category
          title="Tone & Style"
          score={feedback.toneAndStyle.score}
        />

        <Category
          title="Content"
          score={feedback.content.score}
        />

        <Category
          title="Structure"
          score={feedback.structure.score}
        />

        <Category
          title="Skills"
          score={feedback.skills.score}
        />
      </div>
    </div>
  );
};

export default OverView;





















































// import React from 'react'
// import ScoreGauge from './ScoreGauge'
// import ScoreBadge from './ScoreBadge'


// const Category=({title,score}:{title:string,score:number})=>{
//     const textColor=score > 70 ?'text-green-600'
//     :score >49
//     ? 'text-yellow-600' : 'text-red-600';
//     return(
//         <div className="resume-summary">
//             <div className='category'>
//                 <div className='flex flex-row gap-2 items-center justify-center'>
//                     <p className='text-2xl'>{title}</p>
//                 </div>
//                 <ScoreBadge score={score}/>
//                 <p className='text-2xl'>
//                     <span className={textColor}>{score}/100</span>
//                 </p>
                
//             </div>
//         </div>
//     )
// }

// const OverView = ({feedback}:{feedback:Feedback}) => {
//   return (
//     <div className='bg-white rounded-2xl shadow-md w-full'>
//         <div className='flex flex-row items-center p-4 gap-8'>
//             <ScoreGauge score={feedback.overallScore}/>
//             <div className='="flex flex-col gap-2'>
//                 <h2 className='text-2xl font-bold '> Your Resume Score</h2>
//                 <p className='text-sm text-gray-500'>
//                     This score is calculated based on the variable listed below
//                 </p>
//             </div>
//         </div>
        
//         <Category title="Tone & Style" score={feedback.toneAndStyle.score}/>
//         <Category title="Content" score={feedback.content.score}/>
//         <Category title="Structure" score={feedback.structure.score}/>
//         <Category title="Skills" score={feedback.skills.score}/>



//     </div>
//   )
// }

// export default OverView