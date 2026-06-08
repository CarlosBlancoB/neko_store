import { create } from 'zustand'

interface ToastState {
  message: string
  visible: boolean
  show: (msg: string) => void
}

const useToastStore = create<ToastState>((set) => ({
  message: '',
  visible: false,
  show: (msg) => {
    set({ message: msg, visible: true })
    setTimeout(() => set({ visible: false }), 3200)
  },
}))

export { useToastStore }

export default function Toast() {
  const message = useToastStore((s) => s.message)
  const visible = useToastStore((s) => s.visible)

  return <div className={`toast ${visible ? 'show' : ''}`}>{message}</div>
}
