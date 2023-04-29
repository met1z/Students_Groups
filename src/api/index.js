import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/v1';

export const fetchStudents = async () => {
  //
  const { data } = await axios.get(`${API_URL}/students`);
  return data.data;
};

export const fetchStudentById = async (id) => {
  //
  const url = `${API_URL}/students/${id}`;

  const { data } = await axios.get(url);
  return data.data;
};

export const deleteStudent = async (id) => {
  //
  const url = `${API_URL}/students/${id}`;

  await axios.post( url, { '_method' : 'DELETE' });
};

export const addOrUpdateStudent = async (student) => {
  //
  const { data } = await axios.post(`${API_URL}/students`, student);
  return data.data.id;
};

export const fetchGroups = async () => {
  //
  const { data } = await axios.get(`${API_URL}/groups`);
  return data.data;
};

