/* eslint-disable no-restricted-syntax */
import { get, post, put, del } from 'aws-amplify/api';
import { API_NAME, API_PATH } from 'constants/index';
import { ServiceRequestFormInterface, ServiceRequestResponse } from 'interfaces';

export const getServiceRequestHistories = async () => {
    try {
        const getOperation = get({
            apiName: API_NAME,
            path: API_PATH,
        });
        const { body } = await getOperation.response;
        const response = await body.json();
        return response as unknown as ServiceRequestResponse;
    } catch (error) {
        console.error('Error fetching service requests:', error);
        throw error;
    }
};

export const createServiceRequest = async (serviceRequest: ServiceRequestFormInterface) => {
    try {
        const { requestName, requestDescription, creationDate, severity, resolutionDate, reporterName, contactInformation, location } =
            serviceRequest;

        const postOperation = post({
            apiName: API_NAME,
            path: API_PATH,
            options: {
                headers: {
                    'content-type': 'application/json',
                },
                body: {
                    requestName,
                    requestDescription,
                    creationDate,
                    severity,
                    resolutionDate,
                    reporterName,
                    contactInformation,
                    location,
                },
            },
        });

        const { body } = await postOperation.response;
        const response = body.json();
        return response;
    } catch (error) {
        console.error('Error creating service request:', error);
        throw error;
    }
};

export const updateServiceRequest = async (id: string, values: ServiceRequestFormInterface) => {
    try {
        const { requestName, requestDescription, severity, resolutionDate, reporterName, contactInformation, location } = values;

        const putOperation = put({
            apiName: API_NAME,
            path: `${API_PATH}${id}`,
            options: {
                headers: {
                    'content-type': 'application/json',
                },
                body: {
                    requestName,
                    requestDescription,
                    severity,
                    resolutionDate,
                    reporterName,
                    contactInformation,
                    location,
                    lastUpdatedAt: new Date().toISOString(),
                },
            },
        });

        const { body } = await putOperation.response;
        const response = body.json();
        return response;
    } catch (error) {
        console.error('Error updating service request:', error);
        throw error;
    }
};

export const deleteServiceRequest = async (id: string) => {
    try {
        const deleteOperation = await del({
            apiName: API_NAME,
            path: `${API_PATH}${id}`,
        });

        await deleteOperation.response;
    } catch (error) {
        console.error('Error deleting service request:', error);
        throw error;
    }
};
