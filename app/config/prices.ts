import { Region } from '../hooks/useGeoLocation'

interface PricingPlan {
  basic: string
  intermediate: string
  pro: string
  full: string
}

export const prices: Record<Region, PricingPlan> = {
  LATAM: {
    basic: "150.000",
    intermediate: "250.000",
    pro: "350.000",
    full: "400.000"
  },
  EUROPE: {
    basic: "200",
    intermediate: "300",
    pro: "400",
    full: "500"
  }
}

export const currencyByRegion: Record<Region, string> = {
  LATAM: "ARS",
  EUROPE: "€"
} 