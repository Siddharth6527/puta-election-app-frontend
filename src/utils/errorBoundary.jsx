import React, { Component } from 'react';
import ErrorPage from '../pages/errorPage';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error: error };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.error("ErrorBoundary caught an error", error, errorInfo);
        this.setState({ error: error, errorInfo: errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return <ErrorPage />
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
