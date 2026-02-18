import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: { part: CoursePart }) => {
  let details = null;
  switch (part.kind) {
    case "basic":
      details = <i>{part.description}</i>
      break;
    case "group":
      details = <p> project exercises: {part.groupProjectCount}</p>
      break;
    case "background":
      details = (
        <>
          <i>{part.description}</i>
          <p>for more info see {part.backroundMaterial}</p>
        </>
      )
      break;
    case "special":
      details = (
        <>
          <i>{part.description}</i>
          <p>required skills: {part.requirements.join(', ')}</p>
        </>
      )
      break;
    default:
      return assertNever(part);
  }

  return (
    <div>
      <h4>{part.name} (exercises {part.exerciseCount})</h4>
      <>{details}</>
    </div>
  )
}

export default Part;