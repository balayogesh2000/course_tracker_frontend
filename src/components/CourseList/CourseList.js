import React, { useState, useEffect, useCallback } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

import { getAllCourses, deleteCourse } from "../../api/course";
import { useSetLoader } from "../../context/LoaderContext";
import toast from "../../utils/toast";

import classes from "./CourseList.module.css";
import deleteIcon from "../../assets/img/trash.png";

const CourseList = () => {
  const [courseList, setCourseList] = useState([]);
  const setLoader = useSetLoader();

  const fetchData = useCallback(async () => {
    setLoader(true);
    const data = await getAllCourses();
    setCourseList(data.data.data.doc);
    setLoader(false);
  }, [setLoader]);

  const deleteHandler = async (id) => {
    setLoader(true);
    await deleteCourse(id);
    toast("Succesfully deleted the course");
    setLoader(false);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div>
      <div className={classes.container}>
        <Table bordered responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Course Title</th>
              <th>Duration</th>
              <th>Start Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {courseList.map((course, idx) => {
              return (
                <tr>
                  <td>{idx + 1}</td>
                  <td>
                    <Link to={`/course/${course._id}`}>{course.name}</Link>
                  </td>
                  <td>{course.duration} hrs</td>
                  <td>{new Date(course.startDate).toDateString()}</td>
                  <td>
                    <img
                      onClick={() => deleteHandler(course._id)}
                      src={deleteIcon}
                      alt="delete"
                      style={{ cursor: "pointer", width: "25px" }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default CourseList;
