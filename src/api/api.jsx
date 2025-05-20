import axios from 'axios';

const API_BASE = 'http://88.200.63.148:12345';

export const getSessionUser = async () => {
  const response = await axios.get(`${API_BASE}/user/authentication`, { withCredentials: true });
  return response.data;
};

export const fetchRoles = async () => {
  const res = await axios.get(`${API_BASE}/role`, {
    withCredentials: true,
  });
  return res.data;
};

export const fetchMaterials = async () => {
  const res = await axios.get(`${API_BASE}/material`);
  return res.data.materials;
};

export const addMaterial = async (formData) => {
  const res = await axios.post(`${API_BASE}/material/add`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return res.data;
};

export const getCommentsByProject = async (projectId) => {
  const res = await axios.get(`${API_BASE}/comment/${projectId}`);
  return res.data.comments;
};

export const deleteMaterial = async (materialId) => {
  const res = await axios.delete(`${API_BASE}/material/${materialId}`);
  return res.data;
};

export const updateMaterial = async (materialId, formData) => {
  const res = await axios.put(`${API_BASE}/material/${materialId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return res.data;
};

export const assignRole = async (userId, roleId) => {
  return axios.post(`${API_BASE}/role/assign`, {
    user_id: userId,
    role_id: roleId,
  }, {
    withCredentials: true,
  });
};

export const removeRole = async (userId, roleId) => {
  return axios.delete(`${API_BASE}/role/assign`, {
    data: {
      user_id: userId,
      role_id: roleId,
    },
    withCredentials: true,
  });
};

export const fetchReports = async () => {
  const res = await axios.get(`${API_BASE}/report/`, {
    withCredentials: true
  });
  return res.data;
};

export const updateReportStatus = async (reportId, status) => {
  return axios.put(`${API_BASE}/report/${reportId}/status`, {
    status
  }, {
    withCredentials: true
  });
};


export const searchProjects = async (filters = {}) => {
  const res = await axios.post(`${API_BASE}/project/search`, filters, {
    withCredentials: true,
  });
  return res.data.projects;
};

export const getProjectById = async (id) => {
  const res = await axios.get(`${API_BASE}/project/${id}`, {
    withCredentials: true,
  });
  return res.data;
};

export const registerUser = async ({ username, email, password, file }) => {
  const formData = new FormData();
  formData.append('username', username);
  formData.append('email', email);
  formData.append('password', password);
  formData.append('file', file);

  const response = await axios.post(`${API_BASE}/user/register`, formData);
  return response.data;
};

export const loginUser = (credentials) => {
  console.log(credentials)
  return axios.post(`${API_BASE}/user/login`, credentials, { withCredentials: true }
  );
};