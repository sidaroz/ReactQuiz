import { render, screen} from '@testing-library/react';
import {BrowserRouter, Router} from 'react-router-dom';
import userEvent from "@testing-library/user-event";
import {createMemoryHistory} from 'history';
import App from './App';

test('App contains NavBar', () => {
  render(<App />);
  const linkElement = screen.getByRole('NavBar');
  expect(linkElement).toBeInTheDocument();
});

test('should redirect and update history', () => {
    const history = createMemoryHistory();
    render(<Router history={history}><App/></Router>);
    userEvent.click(screen.getByText("Start a quiz"));
    expect(history.location.pathname).toEqual('/setupquiz');
});

test('should redirect and update dom', () => {
    render(<BrowserRouter><App/></BrowserRouter>);
    userEvent.click(screen.getByText("Start a quiz"));
    expect(screen.getByText('username:')).toBeInTheDocument();
});


