import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

import { getAllCourses } from "../../api/course";
import { useSetLoader } from "../../context/LoaderContext";

import classes from "./CourseList.module.css";
// import deleteIcon from "../../assets/img/trash.svg";
// import externalLinkIcon from "../../assets/img/external-link.svg";

const CourseList = () => {
  const [courseList, setCourseList] = useState([]);
  const setLoader = useSetLoader();
  useEffect(() => {
    (async () => {
      setLoader(true);
      const data = await getAllCourses();
      setCourseList(data.data.data.doc);
      setLoader(false);
    })();
  }, [setLoader]);
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
              {/* <th>Action</th> */}
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
                  {/* <td>
                  <a href={course.url} target="_blank" rel="noreferrer">
                    <img src={externalLinkIcon} alt="link" />
                  </a>
                  <img
                    src={deleteIcon}
                    alt="delete"
                    style={{ cursor: "pointer" }}
                  />
                </td> */}
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
