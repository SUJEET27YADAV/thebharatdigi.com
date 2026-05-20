import { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  color?: 'default' | 'success' | 'warning' | 'danger';
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
}

export default function StatsCard({
  title,
  value,
  icon,
  color = 'default',
  trend,
}: StatsCardProps) {
  const colorMap = {
    default: '#ac4bff',
    success: '#00c758',
    warning: '#f99c00',
    danger: '#fb2c36',
  };

  const accentColor = colorMap[color];

  return (
    <div
      className="p-6 rounded flex items-start justify-between"
      style={{
        backgroundColor: '#0f172b',
        border: '1px solid #444444',
      }}
    >
      <div>
        <p
          className="text-xs font-medium mb-3"
          style={{
            color: '#314158',
            fontFamily: 'Geist, sans-serif',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          {title}
        </p>
        <p
          className="text-2xl font-bold"
          style={{
            color: '#ffffff',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {value}
        </p>
        {trend && (
          <p
            className="text-xs mt-2"
            style={{
              color: trend.direction === 'up' ? '#00c758' : '#fb2c36',
              fontFamily: 'Geist, sans-serif',
            }}
          >
            {trend.direction === 'up' ? '↑' : '↓'} {Math.abs(trend.value)}%
          </p>
        )}
      </div>
      <div
        className="p-3 rounded"
        style={{
          backgroundColor: accentColor + '20',
          color: accentColor,
        }}
      >
        {icon}
      </div>
    </div>
  );
}
