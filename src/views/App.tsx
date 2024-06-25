import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import Routes from 'Routes';
import { Amplify } from 'aws-amplify';
import awsmobile from 'aws-exports';
import { withAuthenticator } from '@aws-amplify/ui-react';
// eslint-disable-next-line import/no-unresolved
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(awsmobile);

const App = () => {
    return (
        <ErrorBoundary>
            <Router basename="/">
                <Routes />
            </Router>
        </ErrorBoundary>
    );
};

export default withAuthenticator(App);
