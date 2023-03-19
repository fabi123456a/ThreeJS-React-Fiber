import React from "react";
interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}
interface ErrorBoundaryProps {
  children: React.ReactNode;
}
export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    if (error.message.includes("Could not load blob")) {
    } else {
      return { hasError: true };
    }
  }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (error.message.includes("Could not load blob")) {
      alert("Could not Load Model");
    }
    // You can also log the error to an error reporting service
    //logErrorToMyService(error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <>
          <h1>Something went wrong :(</h1> <p>Please Reload the Page</p>
        </>
      );
    }
    return this.props.children;
  }
}
