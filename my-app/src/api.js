const API_BASE_URL = 'http://localhost:3000'; // Your backend URL

// API functions to replace mock data with real backend calls
export const api = {
  // Get all workers
  getWorkers: async () => {
    const response = await fetch(`${API_BASE_URL}/api/workers`);
    if (!response.ok) {
      throw new Error('Failed to fetch workers');
    }
    return response.json();
  },

  // Get all services
  getServices: async () => {
    const response = await fetch(`${API_BASE_URL}/api/services`);
    if (!response.ok) {
      throw new Error('Failed to fetch services');
    }
    return response.json();
  },

  // Get worker by ID
  getWorker: async (id) => {
    const response = await fetch(`${API_BASE_URL}/api/workers/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch worker');
    }
    return response.json();
  },

  // Get service by ID
  getService: async (id) => {
    const response = await fetch(`${API_BASE_URL}/api/services/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch service');
    }
    return response.json();
  },

  // Create new worker
  createWorker: async (workerData) => {
    const response = await fetch(`${API_BASE_URL}/api/workers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(workerData),
    });
    if (!response.ok) {
      throw new Error('Failed to create worker');
    }
    return response.json();
  },

  // Create new service
  createService: async (serviceData) => {
    const response = await fetch(`${API_BASE_URL}/api/services`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(serviceData),
    });
    if (!response.ok) {
      throw new Error('Failed to create service');
    }
    return response.json();
  }
};