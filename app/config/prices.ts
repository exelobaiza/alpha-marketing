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
    basic: '$250.000 ARS',
    intermediate: '$350.000 ARS',
    pro: '$400.000 ARS',
    full: '$400.000 ARS',
  },
  EU: {
    basic: '300€',
    intermediate: '400€',
    pro: '500€',
    full: '500€',
  },
  OTHER: {
    basic: '$250.000 ARS',
    intermediate: '$350.000 ARS',
    pro: '$400.000 ARS',
    full: '$400.000 ARS',
  },
}

export const currencyByRegion = {
  LATAM: '/mes',
  EU: '/mes',
  OTHER: '/mes',
} 