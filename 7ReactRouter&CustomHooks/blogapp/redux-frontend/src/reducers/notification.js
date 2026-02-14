import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: null, type: 'success' }

const slice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    set(state, action) {
      return action.payload
    },
    clear() {
      return initialState
    }
  },
})

export const { set, clear } = slice.actions

export const notify = (message, type='success') => {
  return async dispatch => {
    dispatch(set({ message, type }))
    setTimeout(() => {
      dispatch(clear())
    }, 2000)
  }
}

export default slice.reducer