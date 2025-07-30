import React from 'react';

const MetricCard = ({ title, value, subtitle, icon: Icon, color = 'blue', trend, size = 'default' }) => {
  const colorClasses = {
    blue: 'bg-blue-500 text-blue-600 bg-blue-50',
    green: 'bg-green-500 text-green-600 bg-green-50',
    yellow: 'bg-yellow-500 text-yellow-600 bg-yellow-50',
    red: 'bg-red-500 text-red-600 bg-red-50',
    purple: 'bg-purple-500 text-purple-600 bg-purple-50',
    indigo: 'bg-indigo-500 text-indigo-600 bg-indigo-50'
  };

  const [bgColor, textColor, lightBg] = colorClasses[color].split(' ');

  const cardSize = size === 'large' ? 'p-8' : 'p-6';
  const iconSize = size === 'large' ? 'h-12 w-12' : 'h-8 w-8';
  const valueSize = size === 'large' ? 'text-4xl' : 'text-3xl';

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 ${cardSize} hover:shadow-md transition-shadow duration-200`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-4">
            <div className={`${lightBg} p-3 rounded-xl`}>
              <Icon className={`${iconSize} ${textColor}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
              <p className={`${valueSize} font-bold text-gray-900`}>{value}</p>
              {subtitle && (
                <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
              )}
            </div>
          </div>
        </div>
        
        {trend && (
          <div className="text-right">
            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              trend.direction === 'up' 
                ? 'bg-green-100 text-green-800' 
                : trend.direction === 'down'
                ? 'bg-red-100 text-red-800'
                : 'bg-gray-100 text-gray-800'
            }`}>
              {trend.value}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;