import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";

import Chart from "./Chart/Chart";
import { getCourse } from "../../api/course";
import { useSetLoader } from "../../context/LoaderContext";

import classes from "./Course.module.css";

const Course = () => {
  const params = useParams();
  const history = useHistory();
  const [duration, setDuration] = useState([]);
  const setLoader = useSetLoader();

  useEffect(() => {
    (async () => {
      setLoader(true);
      const data = await getCourse(params.id);
      setDuration(data.data.data.data.learningData);
      setLoader(false);
    })();
  }, [params.id, setLoader]);

  let current = 0;
  const averageDataPoints = duration.map((item, idx) => {
    current = current + item.duration;
    return {
      x: idx + 1,
      y: current / (idx + 1),
    };
  });

  const dailyDataPoints = duration.map((item, idx) => {
    return {
      x: idx + 1,
      y: item.duration,
    };
  });

  return (
    <div className={classes.Course}>
      <div className={classes.container}>
        <div className={classes.buttons}>
          <Button
            onClick={() => history.push("/course/" + params.id + "/learning")}
          >
            Edit Learning
          </Button>
          <Button onClick={() => history.goBack()}>Back</Button>
        </div>
        <Chart
          type="line"
          title="Learning Average"
          axisX="No Of Days"
          axisY="Duration in minutes"
          dataPoints={averageDataPoints}
        />
        <Chart
          type="column"
          title="Daily learnings"
          axisX="No Of Days"
          axisY="Duration in minutes"
          dataPoints={dailyDataPoints}
        />
      </div>
    </div>
  );
};

export default Course;
