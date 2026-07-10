import { MAX_CHART_COUNT } from '@/constants/skills';

export const ChartSkeleton = () => {
  return (
    <div className="chart-item">
      <svg viewBox="0 0 120 120" className="chart-svg">
        <circle
          cx="60"
          cy="60"
          r="50"
          strokeWidth="1"
          stroke="rgba(0, 0, 0, 0.1)"
          fill="none"
        />
      </svg>
      <span>読み込み中...</span>
    </div>
  );
};

export const ChartsSkeleton = () => {
  return (
    <>
      {[...Array(MAX_CHART_COUNT)].map((_, index) => (
        <ChartSkeleton key={index} />
      ))}
    </>
  );
};
