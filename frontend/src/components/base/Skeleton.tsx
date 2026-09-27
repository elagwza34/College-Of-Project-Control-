interface SkeletonProps {
  className?: string;
  variant?: 'rect' | 'circle' | 'text' | 'card';
  width?: string;
  height?: string;
  count?: number;
}

export default function Skeleton({
  className = '',
  variant = 'rect',
  width,
  height,
  count = 1,
}: SkeletonProps) {
  const baseClasses = 'relative overflow-hidden bg-background-200/70';

  const variantClasses = {
    rect: 'rounded-md',
    circle: 'rounded-full',
    text: 'rounded-sm',
    card: 'rounded-xl',
  };

  const shimmer = <div className="skeleton-shimmer -translate-x-full" />;

  const items = Array.from({ length: count }).map((_, i) => (
    <div
      key={i}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={{
        width: width || '100%',
        height: height || (variant === 'text' ? '1em' : variant === 'circle' ? '48px' : '100%'),
      }}
    >
      {shimmer}
    </div>
  ));

  if (count === 1) return items[0];
  return <div className="flex flex-col gap-3">{items}</div>;
}

export function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-xl border border-background-200/80 bg-white p-5">
      <Skeleton variant="rect" height="160px" className="mb-4" />
      <Skeleton variant="text" width="40%" height="12px" className="mb-3" />
      <Skeleton variant="text" width="80%" height="16px" className="mb-2" />
      <Skeleton variant="text" width="60%" height="16px" className="mb-2" />
      <Skeleton variant="text" width="90%" height="14px" className="mb-4" />
      <div className="flex items-center justify-between pt-3 border-t border-background-200/50">
        <Skeleton variant="text" width="30%" height="12px" />
        <Skeleton variant="text" width="20%" height="12px" />
      </div>
    </div>
  );
}

export function SkeletonArticleCard() {
  return (
    <div className="overflow-hidden rounded-lg border border-background-200/70 bg-background-50 p-5">
      <div className="flex items-center gap-2 mb-3">
        <Skeleton variant="text" width="30%" height="12px" />
        <Skeleton variant="rect" width="50px" height="16px" className="rounded-full" />
      </div>
      <Skeleton variant="text" width="85%" height="18px" className="mb-2" />
      <Skeleton variant="text" width="75%" height="18px" className="mb-2" />
      <Skeleton variant="text" width="100%" height="14px" className="mb-1" />
      <Skeleton variant="text" width="60%" height="14px" className="mb-4" />
      <div className="flex items-center justify-between">
        <Skeleton variant="text" width="20%" height="12px" />
        <Skeleton variant="text" width="25%" height="12px" />
      </div>
    </div>
  );
}

export function SkeletonCategoryCard() {
  return (
    <div className="overflow-hidden rounded-lg border border-background-200/70 bg-background-100 p-6">
      <Skeleton variant="circle" width="44px" height="44px" className="mb-4" />
      <Skeleton variant="text" width="50%" height="18px" className="mb-2" />
      <Skeleton variant="text" width="100%" height="14px" className="mb-1" />
      <Skeleton variant="text" width="80%" height="14px" />
    </div>
  );
}
