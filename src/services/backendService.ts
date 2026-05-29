const rawApiUrl = ((import.meta as unknown as { env?: { VITE_API_URL?: string } }).env?.VITE_API_URL) || '/api';
const API_URL = rawApiUrl.endsWith('/api') ? rawApiUrl : `${rawApiUrl.replace(/\/$/, '')}/api`;

const parseJsonResponse = async (response: Response) => {
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    const errorMessage = body.error || body.message || `Request failed with status ${response.status}`;
    throw new Error(errorMessage);
  }
  return body;
};

export const backendService = {
  checkConnection: async () => {
    try {
      const response = await fetch(`${API_URL}/health`);
      return await parseJsonResponse(response);
    } catch (error) {
      return {
        status: 'offline',
        message: error instanceof Error ? error.message : 'Backend is offline',
      };
    }
  },

  getSiteData: async () => {
    const response = await fetch(`${API_URL}/data`);
    return await parseJsonResponse(response);
  },

  saveSiteData: async (data: unknown) => {
    const response = await fetch(`${API_URL}/data`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await parseJsonResponse(response);
  },

  login: async (email: string, password: string) => {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return await parseJsonResponse(response);
  },

  signup: async (name: string, email: string, password: string) => {
    if (!name || !email || !password) {
      throw new Error('Name, email and password are required');
    }
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    return await parseJsonResponse(response);
  },

  updateOrderStatus: async (id: string, status: string) => {
    if (!id) throw new Error('Order id is required');
    const response = await fetch(`${API_URL}/orders/${encodeURIComponent(id)}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    return await parseJsonResponse(response);
  },

  updateOrderPaymentStatus: async (id: string, isPaid: boolean) => {
    if (!id) throw new Error('Order id is required');
    const response = await fetch(`${API_URL}/orders/${encodeURIComponent(id)}/payment-status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isPaid }),
    });
    return await parseJsonResponse(response);
  },

  updateBookingStatus: async (id: string, status: string) => {
    if (!id) throw new Error('Booking id is required');
    const response = await fetch(`${API_URL}/bookings/${encodeURIComponent(id)}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    return await parseJsonResponse(response);
  },

  replyMessage: async (id: string, reply: string) => {
    if (!id) throw new Error('Message id is required');
    const response = await fetch(`${API_URL}/messages/${encodeURIComponent(id)}/reply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reply }),
    });
    return await parseJsonResponse(response);
  },

  respondToMessage: async (id: string, followUp: string) => {
    if (!id) throw new Error('Message id is required');
    const response = await fetch(`${API_URL}/messages/${encodeURIComponent(id)}/respond`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ followUp }),
    });
    return await parseJsonResponse(response);
  },

  uploadImage: async (base64: string) => ({ url: base64 }),
};