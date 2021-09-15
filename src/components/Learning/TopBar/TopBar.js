import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

import { getCourse, updateCourse } from "../../../api/course";

import classes from "./TopBar.module.css";

const differenceBetweenDates = (dateA, dateB) => {
  const date1 = new Date(dateA);
  const date2 = new Date(dateB);
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const TopBar = () => {
  const history = useHistory();
  const params = useParams();
  const [submitted, setSubmitted] = useState(false);
  const [day, setDay] = useState("");
  const [date, setDate] = useState("");
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);
  const [today, setToday] = useState(0);
  const [total, setTotal] = useState("");
  const [average, setAverage] = useState("");
  const [isFromDisabled, setIsFromDisabled] = useState(false);
  const [isToDisabled, setIsToDisabled] = useState(false);
  const [isTodayDisabled, setIsTodayDisabled] = useState(false);
  const [courseData, setCourseData] = useState([]);
  const [learningData, setLearningData] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getCourse(params.id);
      const courseData = data.data.data.data;
      console.log(courseData);
      setCourseData(courseData);
      setLearningData(courseData.learningData);
      setDay(differenceBetweenDates(courseData.startDate, Date.now()));
      setDate(new Date(Date.now()).toDateString());
      setFrom(0);
      setTo(0);
      setTotal(0);
      setAverage(0);
    })();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedData = [...learningData];
    if (updatedData.length === day - 1) {
      await updateCourse(params.id, {
        learningData: updatedData,
      });
    }
    setSubmitted(true);
    setIsToDisabled(true);
    setIsTodayDisabled(true);
    setIsFromDisabled(true);
  };

  const resetHandler = () => {
    setSubmitted(false);
    setIsToDisabled(false);
    setIsTodayDisabled(false);
    setIsFromDisabled(false);
  };
  return (
    <div className={classes.TopBar} onSubmit={submitHandler}>
      <div className={classes.head}>
        <h5 className={classes.title}>Today's Update</h5>
        <div>
          <Button
            type="primary"
            onClick={() => history.push(`/course/${params.id}/edit`)}
          >
            Edit Past updates
          </Button>
          <Button
            type="primary"
            style={{ marginLeft: "10px" }}
            onClick={() => history.goBack()}
          >
            Back
          </Button>
        </div>
      </div>
      <Form className={classes.form}>
        <Form.Group>
          <Form.Label>Day</Form.Label>
          <Form.Control type="text" disabled value={day} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Date</Form.Label>
          <Form.Control type="text" value={date} disabled />
        </Form.Group>
        <Form.Group>
          <Form.Label>From</Form.Label>
          <Form.Control
            type="number"
            required
            min={0}
            disabled={isFromDisabled}
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>To</Form.Label>
          <Form.Control
            type="number"
            required
            min={0}
            value={to}
            onChange={(e) => setTo(e.target.value)}
            disabled={isToDisabled}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Today</Form.Label>
          <Form.Control
            type="number"
            required
            min={0}
            value={today}
            onChange={(e) => setToday(e.target.value)}
            disabled={isTodayDisabled}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Total</Form.Label>
          <Form.Control type="number" required min={0} disabled value={total} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Average</Form.Label>
          <Form.Control
            type="number"
            required
            min={0}
            disabled
            value={average}
          />
        </Form.Group>
        {!submitted && (
          <button type="submit" className={classes.submitBtn}></button>
        )}
        {submitted && (
          <button
            type="reset"
            className={classes.cancelBtn}
            onClick={resetHandler}
          ></button>
        )}
      </Form>
    </div>
  );
};

export default TopBar;
