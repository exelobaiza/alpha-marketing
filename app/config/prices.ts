import { Region } from '../hooks/useGeoLocation'

interface PricingPlan {
  basic: string
  intermediate: string
  pro: string
  full: string
}

export const prices: Record<Region, PricingPlan> = {
  LATAM: {
    basic: "150.000/mes",
    intermediate: "250.000/mes",
    pro: "350.000/mes",
    full: "400.000/mes"
  },
  EUROPE: {
    basic: "200/mes",
    intermediate: "300/mes",
    pro: "400/mes",
    full: "500/mes"
  }
}

export const currencyByRegion: Record<Region, string> = {
  LATAM: "ARS",
  EUROPE: "€"
} 