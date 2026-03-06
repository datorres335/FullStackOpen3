import { render, screen } from '@testing-library/react'
import Todo from './Todo'

test('renders content', () => {
  const todo = {
    text: "Learn Docker",
    done: false,
  }

  const func = () => {}
  render(<Todo todo={todo} onClickDelete={func} onClickComplete={func} />)

  const element = screen.getByText('Learn Docker')
  expect(element).toBeDefined()
})