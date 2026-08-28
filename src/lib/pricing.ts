import type { Package } from '../data/packages'

export type PartyKey = 'adults' | 'seniors' | 'children' | 'infants'

export type Party = Record<PartyKey, number>

export type RoomStyle = 'suite' | 'double' | 'shared'

export const partyGroups: { key: PartyKey; label: string; hint: string; icon: string }[] = [
  { key: 'adults', label: 'بالغين (12+ سنة)', hint: 'سعر كامل', icon: 'person' },
  {
    key: 'seniors',
    label: 'كبار السن (يحتاجون رعاية)',
    hint: 'مرافقة ورعاية خاصة',
    icon: 'elderly',
  },
  { key: 'children', label: 'أطفال (2-11 سنة)', hint: '75% من سعر الفرد', icon: 'child_care' },
  { key: 'infants', label: 'رضع (أقل من سنتين)', hint: '10% من سعر الفرد', icon: 'crib' },
]

export const roomStyles: {
  id: RoomStyle
  label: string
  hint: string
  icon: string
  /** Multiplier applied to the programme's per-person rate. */
  factor: number
}[] = [
  {
    id: 'suite',
    label: 'أجنحة عائلية متصلة',
    hint: 'الخيار المفضل للعائلات',
    icon: 'meeting_room',
    factor: 1.1,
  },
  { id: 'double', label: 'غرف ثنائية', hint: 'خصوصية أعلى', icon: 'bed', factor: 1 },
  {
    id: 'shared',
    label: 'غرف ثلاثية / رباعية',
    hint: 'اقتصادي للمجموعات',
    icon: 'hotel',
    factor: 0.86,
  },
]

const CHILD_RATE = 0.75
const INFANT_RATE = 0.1
/** Group discount kicks in from five travellers, per the agency's offer. */
export const GROUP_MIN = 5
export const GROUP_DISCOUNT = 0.05
export const DEPOSIT_RATE = 0.3

export type Quote = {
  travellers: number
  payingUnits: number
  baseRate: number
  subtotal: number
  discount: number
  total: number
  deposit: number
  qualifiesForDiscount: boolean
}

export function quote(pkg: Package, party: Party, style: RoomStyle): Quote {
  const travellers = party.adults + party.seniors + party.children + party.infants
  const roomFactor = roomStyles.find((r) => r.id === style)?.factor ?? 1

  // The double room is the reference rate; other styles scale off it.
  const reference =
    pkg.rooms.find((room) => room.label.includes('ثنائية'))?.price ?? pkg.fromPrice
  const baseRate = Math.round(reference * roomFactor)

  const payingUnits =
    party.adults + party.seniors + party.children * CHILD_RATE + party.infants * INFANT_RATE

  const subtotal = Math.round(baseRate * payingUnits)
  const qualifiesForDiscount = travellers >= GROUP_MIN
  const discount = qualifiesForDiscount ? Math.round(subtotal * GROUP_DISCOUNT) : 0
  const total = subtotal - discount

  return {
    travellers,
    payingUnits,
    baseRate,
    subtotal,
    discount,
    total,
    deposit: Math.round(total * DEPOSIT_RATE),
    qualifiesForDiscount,
  }
}
