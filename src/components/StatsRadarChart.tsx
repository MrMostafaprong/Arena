import React from 'react';
import type { AvatarStats } from '../types/game';
import { STAT_DEFINITIONS } from '../data/gameCatalog';

interface StatsRadarChartProps {
  stats: AvatarStats;
  className?: string;
  compact?: boolean;
}

export const StatsRadarChart: React.FC<StatsRadarChartProps> = ({
  stats,
  className = '',
  compact = false,
}) => {
  const count = STAT_DEFINITIONS.length;
  const cx = 175;
  const cy = 148;
  const maxRadius = compact ? 84 : 96;

  const maxStatValue = Math.max(
    14,
    ...STAT_DEFINITIONS.map((d) => stats[d.key] || 0)
  );

  const ringLevels = [0.25, 0.5, 0.75, 1];

  const getPoint = (index: number, ratio: number, extraRadius = 0) => {
    const angle = -Math.PI / 2 + (index * Math.PI * 2) / count;
    const r = maxRadius * ratio + extraRadius;
    return {
      x: cx + Math.cos(angle) * r,
      y: cy + Math.sin(angle) * r,
      angle,
    };
  };

  const statVertices = STAT_DEFINITIONS.map((def, idx) => {
    const val = Math.max(1, stats[def.key] || 1);
    const ratio = Math.min(1, val / maxStatValue);
    return {
      ...getPoint(idx, ratio),
      def,
      val,
    };
  });

  const statPolygonPoints = statVertices
    .map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(' ');

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 350 296"
        className="w-full max-w-[330px] h-auto overflow-visible select-none"
        role="img"
        aria-label="المخطط الراداري للسمات الثماني"
      >
        <defs>
          <radialGradient id="isekaiRadarFill" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.45" />
            <stop offset="70%" stopColor="#E6B85C" stopOpacity="0.30" />
            <stop offset="100%" stopColor="#E6B85C" stopOpacity="0.16" />
          </radialGradient>
          <filter id="isekaiRadarGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Concentric Octagon Rings */}
        {ringLevels.map((lvl, rIdx) => {
          const ringPoints = STAT_DEFINITIONS.map((_, i) => {
            const p = getPoint(i, lvl);
            return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
          }).join(' ');
          return (
            <polygon
              key={rIdx}
              points={ringPoints}
              fill={rIdx === ringLevels.length - 1 ? 'rgba(13, 20, 34, 0.55)' : 'none'}
              stroke={rIdx === ringLevels.length - 1 ? 'rgba(230, 184, 92, 0.35)' : 'rgba(148, 163, 184, 0.16)'}
              strokeWidth={rIdx === ringLevels.length - 1 ? 1.25 : 0.85}
              strokeDasharray={rIdx === 1 ? '3 3' : undefined}
            />
          );
        })}

        {/* 8 Axis Spokes */}
        {STAT_DEFINITIONS.map((def, idx) => {
          const outer = getPoint(idx, 1);
          return (
            <line
              key={def.key}
              x1={cx}
              y1={cy}
              x2={outer.x}
              y2={outer.y}
              stroke="rgba(148, 163, 184, 0.22)"
              strokeWidth={0.9}
            />
          );
        })}

        {/* Active Stat Radar Polygon */}
        <polygon
          points={statPolygonPoints}
          fill="url(#isekaiRadarFill)"
          stroke="#E6B85C"
          strokeWidth={2}
          strokeLinejoin="round"
          filter="url(#isekaiRadarGlow)"
        />

        {/* Vertex Dots & Axis Labels */}
        {statVertices.map((v, idx) => {
          const labelPos = getPoint(idx, 1, 24);
          const cos = Math.cos(v.angle);
          const textAnchor =
            Math.abs(cos) < 0.22 ? 'middle' : cos > 0 ? 'start' : 'end';

          return (
            <g key={v.def.key}>
              <circle
                cx={v.x}
                cy={v.y}
                r={3.8}
                fill={v.def.color}
                stroke="#0A0F1A"
                strokeWidth={1.3}
              />
              <text
                x={labelPos.x}
                y={labelPos.y - 2}
                textAnchor={textAnchor}
                dominantBaseline="middle"
                fill="#F1F5F9"
                fontSize="11.5"
                fontWeight="700"
                className="font-display"
              >
                {v.def.short}
              </text>
              <text
                x={labelPos.x}
                y={labelPos.y + 11}
                textAnchor={textAnchor}
                dominantBaseline="middle"
                fill={v.def.color}
                fontSize="10.5"
                fontWeight="700"
                className="font-mono-num"
              >
                {v.val}
              </text>
            </g>
          );
        })}

        {/* Center Core Crest */}
        <circle cx={cx} cy={cy} r={3.2} fill="#E6B85C" fillOpacity={0.8} />
      </svg>
    </div>
  );
};
