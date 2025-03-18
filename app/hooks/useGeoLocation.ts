import { useState, useEffect } from 'react'

type Region = 'LATAM' | 'EU' | 'OTHER'

interface GeoLocationState {
  region: Region
  loading: boolean
  error: string | null
}

export function useGeoLocation() {
  const [state, setState] = useState<GeoLocationState>({
    region: 'LATAM', // Default to LATAM
    loading: true,
    error: null,
  })

  useEffect(() => {
    const detectRegion = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/')
        const data = await response.json()
        
        // Define regions based on continent codes
        // EU for Europe, SA/NA for Latin America
        const region: Region = data.continent_code === 'EU' 
          ? 'EU'
          : ['SA', 'NA'].includes(data.continent_code) 
            ? 'LATAM' 
            : 'OTHER'

        setState({
          region,
          loading: false,
          error: null,
        })
      } catch (error) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: 'Error detecting region',
        }))
      }
    }

    detectRegion()
  }, [])

  return state
} 