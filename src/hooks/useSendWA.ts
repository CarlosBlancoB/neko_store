import { WA_TEMPLATES } from '@/data/waTemplates'
import { useWAConfigStore } from '@/stores/waConfigStore'
import type { WANotificationType } from '@/types/waConfig'

interface SendOptions {
  phone: string
  type: WANotificationType
  templateData: Record<string, unknown>
}

function getWaUrl(phone: string, message: string): string {
  return `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
}

export function useSendWA() {
  const config = useWAConfigStore((s) => s.config)

  const canSendCustomer = (type: WANotificationType): boolean =>
    config.enabledCustomerTypes.includes(type)

  const canSendAdmin = (type: WANotificationType): boolean =>
    config.enabledAdminTypes.includes(type)

  const send = ({ phone, type, templateData }: SendOptions) => {
    const templateFn = WA_TEMPLATES[type] as (data: Record<string, unknown>) => string
    if (!templateFn) return
    const message = templateFn(templateData)
    const url = getWaUrl(phone, message)
    window.open(url, '_blank')
  }

  const sendCustomer = (type: WANotificationType, templateData: Record<string, unknown>) => {
    if (!canSendCustomer(type)) return
    send({ phone: config.adminPhone, type, templateData })
  }

  const sendAdmin = (type: WANotificationType, templateData: Record<string, unknown>) => {
    if (!canSendAdmin(type)) return
    send({ phone: config.adminPhone, type, templateData })
  }

  return { sendCustomer, sendAdmin, canSendCustomer, canSendAdmin }
}
