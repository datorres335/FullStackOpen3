const Header = (props) => <h1>{props.course}</h1>

const Content = ({parts}) => (
  <div>
    {parts.map(part => <Part key={part.id} part={part} />)}
  </div>
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = (props) => <p><b>Number of exercises {props.total}</b></p>

const Courses = ({courses}) => {
  return (
    <>
      {courses.map(course => {
        return (
          <div key={course.id}>
            <h1>{course.name}</h1>
            <Content parts={course.parts}/>
            <Total total={course.parts.reduce((acc, current) => (acc += current.exercises), 0)}/>
          </div>
        )
      })}
    </>
  )
}

export default Courses