import { useState, useEffect } from 'react'

export type Region = 'LATAM' | 'EUROPE'

interface GeoLocationState {
  region: Region
  loading: boolean
}

export function useGeoLocation(): GeoLocationState {
  const [state, setState] = useState<GeoLocationState>({
    region: 'LATAM',
    loading: true
  })

  useEffect(() => {
    const checkLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/')
        const data = await response.json()
        
        // Si el país está en Europa, usar precios de Europa
        const europeanCountries = ['ES', 'FR', 'DE', 'IT', 'GB', 'PT']
        const region = europeanCountries.includes(data.country_code) ? 'EUROPE' : 'LATAM'
        
        setState({
          region,
          loading: false
        })
      } catch (error) {
        console.error('Error fetching location:', error)
        setState({
          region: 'LATAM', // Default to LATAM if there's an error
          loading: false
        })
      }
    }

    checkLocation()
  }, [])

  return state
} 