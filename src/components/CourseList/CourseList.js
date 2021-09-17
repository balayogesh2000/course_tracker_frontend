import React, { useState, useEffect, useCallback } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

import { getAllCourses, deleteCourse } from "../../api/course";
import { useSetLoader } from "../../context/LoaderContext";
import toast from "../../utils/toast";
import Modal from "../Modal/Modal";

import classes from "./CourseList.module.css";
import deleteIcon from "../../assets/img/trash.png";

const CourseList = () => {
  const [courseList, setCourseList] = useState([]);
  const setLoader = useSetLoader();
  const [show, setShow] = useState(false);
  const [curCourseId, setCurCourseId] = useState("");

  const fetchData = useCallback(async () => {
    setLoader(true);
    const data = await getAllCourses();
    setCourseList(data.data.data.doc);
    setLoader(false);
  }, [setLoader]);

  const deleteClickHanlder = (id) => {
    setCurCourseId(id);
    setShow(true);
  };

  const deleteHandler = async () => {
    setLoader(true);
    await deleteCourse(curCourseId);
    toast("Succesfully deleted the course");
    setLoader(false);
    setCurCourseId("");
    setShow(false);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <>
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
                        onClick={() => deleteClickHanlder(course._id)}
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
      <Modal
        show={show}
        setShow={setShow}
        title="Delete Confirmation"
        save="Yes"
        cancel="No"
        onSave={deleteHandler}
      >
        Are you sure you want to delete?
      </Modal>
    </>
  );
};

export default CourseList;
