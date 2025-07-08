const BASE_URL = '/api/client'

export const CLIENT_ENDPOINTS = {
  AUTH: {
    LOGIN: `${BASE_URL}/login`,
    REGISTER: `${BASE_URL}/registration`,
    VERIFY_EMAIL_AUTO: `${BASE_URL}/verify-email(auto)`,
    VERIFY_EMAIL_MANUAL: `${BASE_URL}/verify-email(manual)`,
    RESEND_TOKEN: `${BASE_URL}/resend-token`,
    GOOGLE: `${BASE_URL}/google`,
    FACEBOOK: `${BASE_URL}/facebook`,
    PASSWORD_RESET: `${BASE_URL}/password-reset`,
  },
  DASHBOARD: `${BASE_URL}/dashboard`,
  SUPPORT:{
      OFFLINE_SUPPORT: `${BASE_URL}/offline-support`
  }
}

export default CLIENT_ENDPOINTS
