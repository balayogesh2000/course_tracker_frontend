import { Route, Switch } from "react-router-dom";

import CreateCourse from "./components/CreateCourse/CreateCourse";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <div>
        <Switch>
          <Route exact path="/create-course" component={CreateCourse} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
