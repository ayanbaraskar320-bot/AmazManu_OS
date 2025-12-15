import React from 'react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer, PolarAngleAxis } from 'recharts';
import { useTheme } from '../../contexts/ThemeContext';

interface OeeGaugeChartProps {
  value: number;
  name: string;
}

const OeeGaugeChart: React.FC<OeeGaugeChartProps> = ({ value, name }) => {
  const { theme } = useTheme();
  const data = [{ name, value, fill: '#006A4E' }];
  const textColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-500';

  return (
    <div className="relative w-full h-48 text-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          innerRadius="70%"
          outerRadius="90%"
          data={data}
          startAngle={180}
          endAngle={0}
          barSize={20}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            background={{ fill: theme === 'dark' ? '#374151' : '#e5e7eb' }}
            dataKey="value"
            angleAxisId={0}
            cornerRadius={10}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-[-10px]">
        <p className="text-3xl font-bold text-bc-green">{`${value}%`}</p>
        <p className={`text-sm ${textColor}`}>{name}</p>
      </div>
    </div>
  );
};

export default OeeGaugeChart;