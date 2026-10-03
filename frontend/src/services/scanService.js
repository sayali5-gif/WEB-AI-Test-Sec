import api from './api';

// Get all scans
export const getScans = async () => {
  const response = await api.get('/scans');
  return response.data;
};

// Get a single scan
export const getScan = async (id) => {
  const response = await api.get(`/scans/${id}`);
  return response.data;
};

// Create a new scan
export const createScan = async (data) => {
  const response = await api.post('/scans', data);
  return response.data;
};

export const getScanStatus = async (id) => (await api.get(`/scans/${id}/status`)).data;
export const cancelScan = async (id) => (await api.post(`/scans/${id}/cancel`)).data;
