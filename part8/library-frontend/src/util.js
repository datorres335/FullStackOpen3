import { ALL_BOOKS } from './queries.js'

import { ApolloLink, HttpLink } from '@apollo/client'
import { SetContextLink } from '@apollo/client/link/context'

import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'

export const updateCacheWith = (addedBook, cache) => {
  const uniqByTitle = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  const genres = addedBook.genres.filter(genre => {
    return cache.readQuery({ query: ALL_BOOKS, variables: { genre } })
  })
  
  genres.forEach(genre => {
    cache.updateQuery({ query: ALL_BOOKS, variables: { genre } }, ({ allBooks }) => {
      return {
        allBooks: uniqByTitle(allBooks.concat(addedBook)),
      }
    })
  })
}

export const STORAGE_KEY = 'library-user-token'

export const getWsHttpSplitLink = () => {
  const wsLink = new GraphQLWsLink(createClient({
    url: 'ws://localhost:4000/',
  }))
  
  const authLink = new SetContextLink(({ headers }) => {
    const token = localStorage.getItem(STORAGE_KEY)
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : null,
      }
    }
  })
  
  const httpLink = new HttpLink({ uri: 'http://localhost:4000' })
  
  const splitLink = ApolloLink.split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    authLink.concat(httpLink),
  )

  return splitLink
}