// /store/dashboardStore.js
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import axios from 'axios'
import { CLIENT_ENDPOINTS } from '@/config/apiEndpoints'

export const useDashboardStore = create(
  subscribeWithSelector((set, get) => ({
    // Dashboard data state
    dashboardData: null,
    loading: false,
    error: null,
    lastFetched: null,
    initialized: false,

    // Actions
    setDashboardData: (data) => 
      set({ 
        dashboardData: data, 
        error: null, 
        lastFetched: Date.now(),
        initialized: true 
      }),

    setLoading: (loading) => 
      set({ loading }),

    setError: (error) => 
      set({ 
        error, 
        loading: false 
      }),

    setInitialized: (initialized) =>
      set({ initialized }),

    clearDashboard: () => 
      set({ 
        dashboardData: null, 
        error: null, 
        lastFetched: null,
        initialized: false 
      }),

    // Fetch dashboard data
    fetchDashboardData: async () => {
      const { loading } = get()
      
      // Prevent multiple simultaneous requests
      if (loading) return

      try {
        set({ loading: true, error: null })
        
        const response = await axios.get(CLIENT_ENDPOINTS.DASHBOARD)
        
        set({ 
          dashboardData: response.data,
          loading: false,
          error: null,
          lastFetched: Date.now(),
          initialized: true
        })

        return response.data
      } 
      catch (error) {
        console.error('Dashboard fetch error:', error)
        
        set({ 
          error: error.response?.data?.error || 'Failed to fetch dashboard data',
          loading: false 
        })

        // Re-throw the error so calling code can handle it
        throw error
      }
    },

    // Refresh dashboard data (force refresh)
    refreshDashboard: async () => {
      try {
        set({ loading: true, error: null })
        const response = await axios.get(CLIENT_ENDPOINTS.DASHBOARD)
        
        set({ 
          dashboardData: response.data,
          loading: false,
          error: null,
          lastFetched: Date.now(),
          initialized: true
        })

        return response.data
      } 
      catch (error) {
        console.error('Dashboard refresh error:', error)
        
        set({ 
          error: error.response?.data?.error || 'Failed to refresh dashboard data',
          loading: false 
        })

        throw error
      }
    },

    // Check if data is stale (older than 5 minutes)
    isDataStale: () => {
      const { lastFetched } = get()
      if (!lastFetched) return true
      
      const fiveMinutes = 5 * 60 * 1000
      return Date.now() - lastFetched > fiveMinutes
    },

    // Fetch data only if stale or not initialized
    fetchIfNeeded: async () => {
      const { initialized, isDataStale, fetchDashboardData } = get()
      
      if (!initialized || isDataStale()) {
        return await fetchDashboardData()
      }
      
      return get().dashboardData
    }
  }))
)