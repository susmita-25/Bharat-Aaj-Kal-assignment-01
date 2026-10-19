import { saveBill } from './demo-store'
import { SavedBill, ShippingBillFormValues } from './model'

const MOCK_LATENCY_MS = 450

function wait<T>(value: T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), MOCK_LATENCY_MS)
  })
}

/**
 * Mock submission boundary. Keeping persistence behind this Promise-based
 * service lets the UI work without a backend and makes API replacement local.
 */
export const shippingBillMockService = {
  async submit(values: ShippingBillFormValues, existingId?: number): Promise<SavedBill> {
    // Basic service-level guard protects callers other than the form UI too.
    if (!values.exporterId || !values.exporterBranchId) {
      throw new Error('Select an exporter and exporter branch before saving.')
    }
    if (!values.consigneeId || !values.consigneeBranchId) {
      throw new Error('Select a consignee and consignee branch before saving.')
    }
    if (!values.loadingPort || !values.finalDestinationPort) {
      throw new Error('Select both loading and destination ports before saving.')
    }

    await wait(undefined)
    return saveBill(values, existingId)
  }
}
