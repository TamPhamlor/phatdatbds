const API_BASE_URL = process.env.API_URL || 'https://api.phatdatbatdongsan.com';
const API_KEY = process.env.API_SECRET_KEY;

// Debug log khi khởi động (chỉ log 1 lần)
if (typeof window === 'undefined') {
  console.log('[API Config] API_URL:', API_BASE_URL);
  console.log('[API Config] API_KEY exists:', !!API_KEY);
}

const getHeaders = () => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (API_KEY) {
    headers['X-API-Key'] = API_KEY;
  } else {
    console.warn('[API Warning] API_SECRET_KEY is not set!');
  }
  
  return headers;
};

export async function apiRequest(endpoint: string, options?: RequestInit) {
  const url = `${API_BASE_URL}${endpoint}`;
  return fetch(url, {
    ...options,
    headers: {
      ...getHeaders(),
      ...options?.headers,
    },
  });
}

// Helper cho server-side requests với caching
export async function apiRequestWithCache(endpoint: string, revalidate?: number) {
  const url = `${API_BASE_URL}${endpoint}`;
  return fetch(url, {
    headers: getHeaders(),
    next: { revalidate: revalidate || 60 }
  });
}