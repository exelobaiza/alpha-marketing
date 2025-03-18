interface PlanPrices {
  basic: string
  intermediate: string
  pro: string
  full: string
}

interface RegionalPrices {
  LATAM: PlanPrices
  EU: PlanPrices
  OTHER: PlanPrices
}

export const prices: RegionalPrices = {
  LATAM: {
    basic: '$150.000 ARS',
    intermediate: '$250.000 ARS',
    pro: '$350.000 ARS',
    full: '$400.000 ARS',
  },
  EU: {
    basic: '200€',
    intermediate: '300€',
    pro: '400€',
    full: '500€',
  },
  OTHER: {
    basic: '$150.000 ARS',
    intermediate: '$250.000 ARS',
    pro: '$350.000 ARS',
    full: '$400.000 ARS',
  },
}

export const currencyByRegion = {
  LATAM: '/mes',
  EU: '/mes',
  OTHER: '/mes',
} 