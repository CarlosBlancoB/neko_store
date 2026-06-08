interface ProgressBarProps {
  percent: number
  label: string
}

export default function ProgressBar({ percent, label }: ProgressBarProps) {
  return (
    <>
      <div className='progress-bar'>
        <div className='progress-fill' style={{ width: `${percent}%` }} />
      </div>
      <div id='progressLabel'>{label}</div>
    </>
  )
}
