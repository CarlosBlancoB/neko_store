interface ToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  id?: string
}

export default function Toggle({ checked, onChange, id }: ToggleProps) {
  return (
    <>
      <input
        type='checkbox'
        className='toggle-input'
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <label htmlFor={id} className='toggle-track' aria-label={id ?? 'toggle'} />
    </>
  )
}
