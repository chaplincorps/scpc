const BASE_URL = '/api/client'

export const CLIENT_ENDPOINTS = {
  AUTH: {
    LOGIN: `${BASE_URL}/login`,
    REGISTER: `${BASE_URL}/registration`,
    VERIFY_EMAIL: `${BASE_URL}/verify-email`,
    RESEND_TOKEN: `${BASE_URL}/resend-token`,
    GOOGLE: `${BASE_URL}/google`,
    FACEBOOK: `${BASE_URL}/facebook`
  },
  DASHBOARD: `${BASE_URL}/dashboard`,
}

export default CLIENT_ENDPOINTS
