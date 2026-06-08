interface SizePickerProps {
  sizes: string[]
  selected: string | null
  onSelect: (size: string) => void
}

export default function SizePicker({ sizes, selected, onSelect }: SizePickerProps) {
  return (
    <div className='size-picker'>
      <label htmlFor='size-picker-input'>TALLA</label>
      <div className='size-options'>
        <input id='size-picker-input' type='hidden' value={selected ?? ''} readOnly />
        {sizes.map((size) => (
          <button
            key={size}
            className={`size-opt ${selected === size ? 'selected' : ''}`}
            onClick={() => onSelect(size)}
            type='button'
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  )
}
