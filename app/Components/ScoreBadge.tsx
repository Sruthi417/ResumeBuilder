
interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge = ({ score }: ScoreBadgeProps) => {
  let badgeStyle = '';
  let badgeText = '';

  if (score >= 80) {
    badgeStyle = 'bg-badge-green text-badge-green-text';
    badgeText = 'Excellent';
  } else if (score >= 60) {
    badgeStyle = 'bg-badge-yellow text-badge-yellow-text';
    badgeText = 'Good';
  } else {
    badgeStyle = 'bg-badge-red text-badge-red-text';
    badgeText = 'Improve';
  }

  return (
    <div className={`score-badge ${badgeStyle} flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap`}>
      <span className="text-sm select-none">★</span>
      <span>{badgeText}</span>
    </div>
  )
}

export default ScoreBadge;
