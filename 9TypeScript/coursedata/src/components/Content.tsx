import Part from "./Part"
import { Props } from "../types";

const Content = ({ parts }: Props) => {
  return (
    <>
      {parts.map(part => <Part key={part.name} part={part}/> )}
    </>
  )
};

export default Content;