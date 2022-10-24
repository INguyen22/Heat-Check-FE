import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';
import { BrowserRouter} from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client'

const client = new ApolloClient({
  uri: 'https://heatcheck-be.herokuapp.com/graphql',
  cache: new InMemoryCache(),
})

test('renders learn react link', () => {
  render(  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>);
  const linkElement = screen.getByText(/Search/);
  expect(linkElement).toBeInTheDocument();
});
