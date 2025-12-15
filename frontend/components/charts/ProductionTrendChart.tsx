import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ProductionData } from '../../types';
import { useTheme } from '../../contexts/ThemeContext';

interface ProductionTrendChartProps {
  data: ProductionData[];
}

const ProductionTrendChart: React.FC<ProductionTrendChartProps> = ({ data }) => {
  const { theme } = useTheme();
  const tickColor = theme === 'dark' ? '#9ca3af' : '#6b7280';
  const gridColor = theme === 'dark' ? '#374151' : '#e5e7eb';

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="colorProduction" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#006A4E" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#006A4E" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
        <XAxis dataKey="day" tick={{ fill: tickColor }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: tickColor }} axisLine={false} tickLine={false} />
        <Tooltip
            contentStyle={{
                backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}
        />
        <Area 
            type="monotone" 
            dataKey="production" 
            stroke="#006A4E" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorProduction)" 
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ProductionTrendChart;