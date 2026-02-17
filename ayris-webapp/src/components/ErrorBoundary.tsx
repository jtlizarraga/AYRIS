import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
                    <h1>Algo salió mal.</h1>
                    <p>Por favor, recarga la página. Si el problema persiste, contacta soporte.</p>
                    <div style={{ background: '#f8d7da', color: '#721c24', padding: '1rem', borderRadius: '4px', marginTop: '1rem' }}>
                        <strong>Error:</strong> {this.state.error?.toString()}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
