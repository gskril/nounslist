import { useEffect, useState } from 'react'

export const useHealthCheck = (): boolean | undefined => {
  const [isHealthy, setIsHealthy] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    const checkHealth = async (): Promise<void> => {
      try {
        const response = await fetch('https://api.nounishdata.com/health')
        setIsHealthy(response.status === 200)
      } catch (error) {
        setIsHealthy(false)
      }
    }
    checkHealth()
  }, [])

  return isHealthy
}
