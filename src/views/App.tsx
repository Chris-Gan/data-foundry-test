import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';
import awsmobile from 'aws-exports';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import Provider from 'components/Providers';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import RootPage from './RootPage';

Amplify.configure(awsmobile);

const App = () => {
    return (
        <ErrorBoundary>
            <Provider>
                <RootPage />
                <ReactQueryDevtools initialIsOpen />
            </Provider>
        </ErrorBoundary>
    );
};

export default withAuthenticator(App);
