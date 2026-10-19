import { documentCodes } from '@/data/e-sanchit-codes'
import { quantityCodes } from '@/data/quantity-code'
import schemeCodes from '@/data/scheme-codes'
import { stateOptions } from '@/data/states'
import { Trades } from '@/data/trade-agrements'
import { cargoOptions, contractTypes, paymentTypes, priceInclusionTypes, sealTypes, weightUnits } from '@/data/types'
import { ports } from './model'

const MOCK_LATENCY_MS = 250

const currencyOptions = ['USD', 'EUR', 'INR', 'AED', 'GBP', 'SGD'].map((value) => ({ value, label: value }))

const nfeiCategoryOptions = [
  { value: '01', label: 'Free trade sample' },
  { value: '02', label: 'Diplomatic goods' },
  { value: '03', label: 'Warranty replacement' },
  { value: '07', label: 'Gift parcel' },
  { value: '08', label: 'Other' }
]

const igstPaymentOptions = [
  { value: 'NA', label: 'Not applicable' },
  { value: 'LUT', label: 'Under LUT / bond' },
  { value: 'P', label: 'Against payment' }
]

const accessoryStatusOptions = [
  { value: '0', label: 'No accessory' },
  { value: '1', label: 'Included free of cost' },
  { value: '2', label: 'Entered separately' }
]

const fileTypeOptions = [{ value: 'pdf', label: 'PDF' }]
const containerSizeOptions = [
  { value: '20', label: '20 ft' },
  { value: '40', label: '40 ft' },
  { value: '45', label: '45 ft' }
]
const containerSealTypeOptions = [
  { value: 1, label: 'BTSL - Bottle Seal' },
  { value: 2, label: 'ESEAL - Electronic Seal' },
  { value: 3, label: 'RFID - Radio Frequency Identifier' }
]
const goodsSourceOptions = [
  { value: 'I', label: 'Imported' },
  { value: 'D', label: 'Indigenous' }
]

export interface ShippingBillFormOptions {
  documentCodes: typeof documentCodes
  quantityCodes: typeof quantityCodes
  schemeCodes: typeof schemeCodes
  stateOptions: typeof stateOptions
  tradeAgreementOptions: typeof Trades
  cargoOptions: typeof cargoOptions
  contractTypes: typeof contractTypes
  paymentTypes: typeof paymentTypes
  priceInclusionTypes: typeof priceInclusionTypes
  sealTypes: typeof sealTypes
  weightUnits: typeof weightUnits
  currencyOptions: typeof currencyOptions
  nfeiCategoryOptions: typeof nfeiCategoryOptions
  igstPaymentOptions: typeof igstPaymentOptions
  accessoryStatusOptions: typeof accessoryStatusOptions
  fileTypeOptions: typeof fileTypeOptions
  containerSizeOptions: typeof containerSizeOptions
  containerSealTypeOptions: typeof containerSealTypeOptions
  goodsSourceOptions: typeof goodsSourceOptions
  portOptions: Array<{ value: string; label: string }>
}

function wait<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), MOCK_LATENCY_MS))
}

/** Async reference-data boundary; replace this implementation with an API client when available. */
export const shippingBillOptionsService = {
  getFormOptions(): Promise<ShippingBillFormOptions> {
    return wait({
      documentCodes,
      quantityCodes,
      schemeCodes,
      stateOptions,
      tradeAgreementOptions: Trades,
      cargoOptions,
      contractTypes,
      paymentTypes,
      priceInclusionTypes,
      sealTypes,
      weightUnits,
      currencyOptions,
      nfeiCategoryOptions,
      igstPaymentOptions,
      accessoryStatusOptions,
      fileTypeOptions,
      containerSizeOptions,
      containerSealTypeOptions,
      goodsSourceOptions,
      portOptions: ports.map((port) => ({ value: port.code, label: `${port.name} · ${port.code}` }))
    })
  }
}