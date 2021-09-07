import React from "react";
import { Form, Button } from "react-bootstrap";

import classes from "./CreateCourse.module.css";

const CreateCourse = () => {
  return (
    <div className={classes.CreateCourse}>
      <div className={classes.container}>
        <Form>
          <Form.Group className="mb-3" controlId="course">
            <Form.Label>Course</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter course name"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="duration">
            <Form.Label>Duration (in hours)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter course duration in hours"
              min={0}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="startDate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter course starting date"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="link">
            <Form.Label>Course Link</Form.Label>
            <Form.Control type="text" placeholder="Enter course URL" required />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CreateCourse;
