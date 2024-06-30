import { Route, Routes as RoutesWrapper } from 'react-router-dom';
import RequestHistoryPage from 'views/RequestHistoryPage';

const Routes = () => {
    return (
        <RoutesWrapper>
            <Route index element={<RequestHistoryPage />} />
        </RoutesWrapper>
    );
};

export default Routes;
