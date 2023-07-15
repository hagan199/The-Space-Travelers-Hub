import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import the BrowserRouter component
import App from '../App';

test('renders learn react link', () => {
  render(
    <Router> {/* Wrap the component with the Router */}
      <App />
    </Router>
  );
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
