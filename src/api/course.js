import axios from "axios";

let baseURL = "https://track-online-course.herokuapp.com/api/v1/course/";

if (process.env.NODE_ENV === "development") {
  baseURL = "http://localhost:5000/api/v1/course/";
}

export const createCourse = async (body) => {
  await axios.post(baseURL, body);
};

export const getAllCourses = async () => {
  const data = await axios.get(baseURL);
  return data;
};

export const getCourse = async (id) => {
  const data = await axios.get(baseURL + id);
  return data;
};

export const updateCourse = async (id, body) => {
  const data = await axios.patch(baseURL + id, body);
  return data;
};

export const deleteCourse = async (id) => {
  const data = await axios.delete(baseURL + id);
  return data;
};

export const getAllLearning = async (id) => {
  const data = await axios.get(baseURL + id + "/learning");
  return data;
};
