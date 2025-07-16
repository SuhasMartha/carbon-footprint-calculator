import React from 'react';
import { Badge } from '../types';

interface BadgeDisplayProps {
  badges: Badge[];
  showAll?: boolean;
  className?: string;
}

const BadgeDisplay: React.FC<BadgeDisplayProps> = ({ badges, showAll = false, className = '' }) => {
  const displayBadges = showAll ? badges : badges.slice(0, 3);

  const getBadgeColor = (level: Badge['level']) => {
    switch (level) {
      case 'platinum': return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
      case 'gold': return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
      case 'silver': return 'bg-gradient-to-r from-gray-400 to-gray-600 text-white';
      case 'bronze': return 'bg-gradient-to-r from-orange-400 to-orange-600 text-white';
      default: return 'bg-gray-200 text-gray-700';
    }
  };

  if (badges.length === 0) {
    return (
      <div className={`text-center text-gray-500 ${className}`}>
        <p>No badges earned yet. Keep tracking to earn your first badge!</p>
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {displayBadges.map((badge) => (
        <div
          key={badge.id}
          className={`flex items-center space-x-3 p-3 rounded-lg ${getBadgeColor(badge.level)} shadow-md`}
        >
          <span className="text-2xl">{badge.icon}</span>
          <div className="flex-1">
            <h3 className="font-semibold">{badge.name}</h3>
            <p className="text-sm opacity-90">{badge.description}</p>
          </div>
          <div className="text-right">
            <div className="text-xs opacity-75">
              {new Date(badge.earnedDate).toLocaleDateString()}
            </div>
          </div>
        </div>
      ))}
      
      {!showAll && badges.length > 3 && (
        <div className="text-center text-gray-500 text-sm">
          +{badges.length - 3} more badges
        </div>
      )}
    </div>
  );
};

export default BadgeDisplay;