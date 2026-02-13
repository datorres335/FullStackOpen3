import ReactDOM from 'react-dom/client'
import App from './App'

import { ApolloClient, InMemoryCache } from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react'

import { getWsHttpSplitLink } from './util'

export const STORAGE_KEY = 'library-user-token'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: getWsHttpSplitLink()
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)