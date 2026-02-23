import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import Constants from 'expo-constants';

const { apolloUri } = Constants.expoConfig.extra;

//NOTE: you find the correct URL value once you start the app with "npm start" under "Metro waiting on exp://192.168.1.233:8081" (the stuff between exp:// and :8081)
const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({ uri: apolloUri }),
    cache: new InMemoryCache(),
  })
};

export default createApolloClient;