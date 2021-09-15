import axios from "axios";

const baseURL = "http://localhost:5000/api/v1/";

export const createCourse = async (body) => {
  await axios.post("http://localhost:5000/api/v1/course", body);
};

export const getAllCourses = async () => {
  const data = await axios.get(baseURL + "course");
  return data;
};

export const getCourse = async (id) => {
  const data = await axios.get(baseURL + "course/" + id);
  return data;
};

export const updateCourse = async (id, body) => {
  const data = await axios.patch(baseURL + "course/" + id, body);
  return data;
};

export const deleteCourse = async (id) => {
  const data = await axios.delete(baseURL + "course/" + id);
  return data;
};

export const getAllLearning = async (id) => {
  const data = await axios.get(baseURL + "course/" + id + "/learning");
  return data;
};
