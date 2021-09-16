import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Navbar from "./components/Navbar/Navbar";
import CreateCourse from "./components/CreateCourse/CreateCourse";
import CourseList from "./components/CourseList/CourseList";
import Course from "./components/Course/Course";
import Learning from "./components/Learning/Learning";
import { LoaderProvider } from "./context/LoaderContext";

const App = () => {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Navbar />
      <LoaderProvider>
        <div>
          <Switch>
            <Redirect exact path="/" to="/course" />
            <Route exact path="/course" component={CourseList} />
            <Route exact path="/create-course" component={CreateCourse} />
            <Route exact path="/course/:id" component={Course} />
            <Route exact path="/course/:id/learning" component={Learning} />
          </Switch>
        </div>
      </LoaderProvider>
    </div>
  );
};

export default App;
