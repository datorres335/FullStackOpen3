import { useState, useImperativeHandle, forwardRef } from 'react'
import { SmallButton } from './styled'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div style={{ marginTop: 20 }}>
      <div style={hideWhenVisible}>
        <SmallButton onClick={toggleVisibility}>{props.buttonLabel}</SmallButton>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <SmallButton onClick={toggleVisibility}>cancel</SmallButton>
      </div>
    </div>
  )
})

//Since Togglable is wrapped with forwardRef(), React can't automatically infer its component name. 
// Without this line, the component would appear as ForwardRef in React Developer Tools, making debugging harder
Togglable.displayName = 'Togglable'

export default Togglable