import Header from "./components/Header";
import Total from "./components/Total";
import Content from "./components/Content";
import { CoursePart } from "./types";
import courses from '../data/courses'

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = courses as CoursePart[];

  return (
    <div>
      <Header text={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;