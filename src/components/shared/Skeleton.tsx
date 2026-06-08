interface SkeletonProps {
  width?: string
  height?: string
  className?: string
}

export default function Skeleton({
  width = '100%',
  height = '20px',
  className = '',
}: SkeletonProps) {
  return (
    <div
      className={className}
      style={{
        width,
        height,
        background: 'var(--surface-2)',
        borderRadius: '4px',
        animation: 'pulse 1.5s ease-in-out infinite',
      }}
      aria-hidden='true'
    />
  )
}
