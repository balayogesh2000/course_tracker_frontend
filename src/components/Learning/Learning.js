import React, { useState, useEffect } from "react";
import { Table, InputGroup, FormControl, Button } from "react-bootstrap";
import { useParams, useHistory } from "react-router";

import { getCourse, updateCourse } from "../../api/course";
import { differenceBetweenDates } from "../../utils/dateDifference";
import showToast from "../../utils/toast";
import { useSetLoader } from "../../context/LoaderContext";

import classes from "./Learning.module.css";

const Learning = () => {
  const params = useParams();
  const history = useHistory();
  const [courseData, setCourseData] = useState({});
  const [learningData, setLearningData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [tableBody, setTableBody] = useState([]);
  const setLoader = useSetLoader();

  useEffect(() => {
    (async () => {
      setLoader(true);
      const data = await getCourse(params.id);
      setCourseData(data.data.data.data);
      const fetchedCourseData = data.data.data.data;
      const fetchedLearningData = fetchedCourseData.learningData;
      const days = differenceBetweenDates(
        fetchedCourseData.startDate,
        Date.now()
      );
      for (let i = fetchedLearningData.length; i < days; i++) {
        fetchedLearningData.push({ duration: "", notes: "" });
      }
      setLearningData(fetchedLearningData);
      setLoader(false);
    })();
  }, [params.id, setLoader]);

  const updateLearningData = (event, index, key) => {
    setLearningData((prev) => {
      const data = [...prev];
      data[index][key] = event.target.value;
      return data;
    });
  };

  const saveHandler = async () => {
    setLoader(true);
    await updateCourse(params.id, { learningData });
    setEdit(false);
    setLoader(false);
    showToast("Learning Data saved successfully");
  };

  const cancelHandler = async () => {
    setLoader(true);
    const data = await getCourse(params.id);
    setLearningData(data.data.data.data.learningData);
    setLoader(false);
    setEdit(false);
  };
  useEffect(() => {
    const tableBody = [];
    let duration = 0;
    for (
      let i = 0;
      i < differenceBetweenDates(courseData.startDate, Date.now());
      i++
    ) {
      let date = new Date(courseData.startDate);
      date.setDate(new Date(courseData.startDate).getDate() + i);
      duration += learningData[i] ? +learningData[i].duration : 0;
      tableBody.push(
        <tr className={classes.tr} key={date.toDateString()}>
          <td>{i + 1}</td>
          <td>{date.toDateString()}</td>
          <td>
            {!edit ? (
              learningData[i]?.duration
            ) : (
              <InputGroup size="sm">
                <FormControl
                  type="number"
                  min={0}
                  value={learningData[i]?.duration}
                  onChange={(e) => updateLearningData(e, i, "duration")}
                />
              </InputGroup>
            )}
          </td>
          <td>{duration.toFixed(2)}</td>
          <td>{(duration / (i + 1)).toFixed(2)}</td>
          <td>
            {!edit ? (
              <p
                style={{
                  maxWidth: "300px",
                  overflow: "auto",
                  margin: "auto",
                }}
              >
                {learningData[i]?.notes}
              </p>
            ) : (
              <InputGroup>
                <FormControl
                  as="textarea"
                  value={learningData[i]?.notes}
                  onChange={(e) => updateLearningData(e, i, "notes")}
                />
              </InputGroup>
            )}
          </td>
        </tr>
      );
    }
    setTableBody(tableBody);
  }, [courseData, edit, learningData]);

  return (
    <div className={classes.learning}>
      <div className={classes.container}>
        <div className={classes.buttons}>
          <Button onClick={() => history.push(`/course/${params.id}`)}>
            Learning Average
          </Button>
          {!edit && <Button onClick={() => setEdit(true)}>Edit</Button>}
          {edit && <Button onClick={cancelHandler}>Cancel</Button>}
          {edit && <Button onClick={saveHandler}>Save</Button>}
          {!edit && <Button onClick={() => history.goBack()}>Back</Button>}
        </div>
        <Table bordered responsive>
          <thead>
            <tr>
              <th>Days</th>
              <th>Date</th>
              <th>Duration (mins)</th>
              <th>Total (mins)</th>
              <th>Average (mins)</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>{tableBody}</tbody>
        </Table>
      </div>
    </div>
  );
};

export default Learning;
