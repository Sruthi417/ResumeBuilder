import React from 'react'

interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge = ({ score }: ScoreBadgeProps) => {
  let badgeStyle = '';
  let badgeText = '';

  if (score > 70) {
    badgeStyle = 'bg-badge-green text-badge-green-text';
    badgeText = 'Strong';
  } else if (score > 49) {
    badgeStyle = 'bg-badge-yellow text-badge-yellow-text';
    badgeText = 'Good Start';
  } else {
    badgeStyle = 'bg-badge-red text-badge-red-text';
    badgeText = 'Needs Work';
  }

  return (
    <div className={`score-badge ${badgeStyle}`}>
      <p className='text-sm font-semibold'>{badgeText}</p>
    </div>
  )
}

export default ScoreBadge
