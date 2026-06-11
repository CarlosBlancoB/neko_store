import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ProgressBar from '@/components/loyalty/ProgressBar'

describe('ProgressBar', () => {
  it('renderiza el label', () => {
    render(<ProgressBar percent={50} label='500 / 1000 pts' />)
    expect(screen.getByText('500 / 1000 pts')).toBeDefined()
  })

  it('tiene role progressbar', () => {
    render(<ProgressBar percent={75} label='Progreso' />)
    const bar = screen.getByRole('progressbar')
    expect(bar).toBeDefined()
  })

  it('aria-valuenow refleja percent', () => {
    render(<ProgressBar percent={33} label='test' />)
    const bar = screen.getByRole('progressbar')
    expect(bar.getAttribute('aria-valuenow')).toBe('33')
  })

  it('progressbar tiene aria-valuemin 0', () => {
    render(<ProgressBar percent={0} label='test' />)
    const bar = screen.getByRole('progressbar')
    expect(bar.getAttribute('aria-valuemin')).toBe('0')
  })

  it('progressbar tiene aria-valuemax 100', () => {
    render(<ProgressBar percent={100} label='test' />)
    const bar = screen.getByRole('progressbar')
    expect(bar.getAttribute('aria-valuemax')).toBe('100')
  })

  it('progress-fill tiene ancho correcto', () => {
    render(<ProgressBar percent={66} label='test' />)
    const fill = document.querySelector('.progress-fill') as HTMLElement
    expect(fill.style.width).toBe('66%')
  })
})
