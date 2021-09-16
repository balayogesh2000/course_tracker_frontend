import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { createCourse } from "../../api/course";
import { useSetLoader } from "../../context/LoaderContext";

import classes from "./CreateCourse.module.css";

const CreateCourse = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [startDate, setStartDate] = useState("");
  // const [url, setUrl] = useState("");
  const setLoader = useSetLoader();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoader(true);
    await createCourse({
      name,
      duration,
      startDate,
    });
    setLoader(false);
    toast.success("Course created successfully", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    history.push("/");
  };

  return (
    <div className={classes.CreateCourse}>
      <div className={classes.container}>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="course">
            <Form.Label>Course</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter course name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="duration">
            <Form.Label>Duration (in hours)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter course duration in hours"
              min={0}
              required
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="startDate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter course starting date"
              required
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Form.Group>
          {/* <Form.Group className="mb-3" controlId="link">
            <Form.Label>Course Link</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter course URL"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </Form.Group> */}
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CreateCourse;
