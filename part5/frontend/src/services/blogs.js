import axios from 'axios'
import storage from './storage'

const baseUrl = '/api/blogs'

const getConfig = () => ({
  headers : { Authorization: `Bearer ${storage.loadUser().token}` }
})

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const update = async (id, newObject) => {
  const request = await axios.put(`${baseUrl}/${id}`, newObject, getConfig())
  return request.data
}

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject, getConfig())
  return response.data
}

const remove = async id => {
  const response = await axios.delete(`${baseUrl}/${id}`, getConfig())
  return response.data
}

export default { getAll, update, create, remove }