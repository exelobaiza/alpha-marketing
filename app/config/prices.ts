import { Region } from '../hooks/useGeoLocation'

interface PricingPlan {
  basic: string
  intermediate: string
  pro: string
  full: string
}

export const prices: Record<Region, PricingPlan> = {
  LATAM: {
    basic: '25.000',
    intermediate: '35.000',
    pro: '45.000',
    full: '55.000'
  },
  EUROPE: {
    basic: '149',
    intermediate: '249',
    pro: '349',
    full: '449'
  }
}

export const currencyByRegion: Record<Region, string> = {
  LATAM: 'ARS',
  EUROPE: '€'
} 