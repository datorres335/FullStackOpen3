import axios from 'axios'

//const baseUrl = 'http://localhost:3001/api/persons'
const baseUrl = '/api/persons' //need to use relative URL when you copy 'dist' (aka frontend production build, aka 'npm run build') into backend dir
  // your going to have to use a proxy in the backend to make the frontend work again in dev mode
  // proxy added in vite.config.js

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const remove = id => {
  const url = `${baseUrl}/${id}`
  const request = axios.delete(url)
  return request.then(response => response.data)
}

const update = personObject => {
  const url = `${baseUrl}/${personObject.id}`
  const request = axios.put(url, personObject)
  return request.then(response => response.data)
}

export default { getAll, create, remove, update }