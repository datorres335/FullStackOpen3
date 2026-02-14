import { useField } from "../hooks"
import { useNavigate } from "react-router-dom"

const CreateNew = ({ addNew, notify }) => {
  const author = useField('text')
  const content = useField('text')
  const info = useField('text')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    notify(`A new anecdote '${content.value}' created!`)
    navigate('/')
  }

  const onReset = () => {
    info.reset()
    author.reset()
    content.reset()
  }

  return (
    <div>
      <h2>create a neww anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' {...content.props}/>
        </div>
        <div>
          author
          <input name='author' {...author.props}/>
        </div>
        <div>
          url for more info
          <input name='info' {...info.props}/>
        </div>
        <button type='submit'>create</button>
        <button onClick={onReset} type='button'>reset</button>
      </form>
    </div>
  )
}

export default CreateNew