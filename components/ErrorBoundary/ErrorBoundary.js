import React from 'react';

/*
const ErrorBoundary = ({children}) => {
  let [hasError, setHasError] = useState(false);

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI

    return { hasError: true };
  }

} */

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError = (error) => ({ hasError: true });

  // You can use your own error logging service here
  componentDidCatch = (error, errorInfo) => {
    console.log({ error, errorInfo });
  }

  render = () => {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <h2>Oops, there is an error!</h2>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false })}>
            Try again?
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
