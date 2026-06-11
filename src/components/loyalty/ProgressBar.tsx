interface ProgressBarProps {
  percent: number
  label: string
}

export default function ProgressBar({ percent, label }: ProgressBarProps) {
  return (
    <>
      <div
        className='progress-bar'
        role='progressbar'
        aria-valuenow={Math.round(percent)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-labelledby='progressLabel'
      >
        <div className='progress-fill' style={{ width: `${percent}%` }} />
      </div>
      <div id='progressLabel'>{label}</div>
    </>
  )
}
