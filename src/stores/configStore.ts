import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { DEFAULT_CONFIG } from '@/data/defaultConfig'
import type { StoreConfig } from '@/types/config'

interface ConfigState {
  config: StoreConfig
  updateConfig: (partial: Partial<StoreConfig>) => void
  resetConfig: () => void
}

export const useConfigStore = create<ConfigState>()(
  persist(
    (set) => ({
      config: { ...DEFAULT_CONFIG },
      updateConfig: (partial) => set((state) => ({ config: { ...state.config, ...partial } })),
      resetConfig: () => set({ config: { ...DEFAULT_CONFIG } }),
    }),
    { name: 'nekoConfig' },
  ),
)
