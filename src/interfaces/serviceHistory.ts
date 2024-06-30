export type Severity = 'Low' | 'Medium' | 'High';

export interface ServiceHistoryInterface {
    id: string;
    requestName: string;
    requestDescription: string;
    creationDate: string;
    severity: Severity;
    resolutionDate: string;
    reporterName: string;
    contactInformation: string;
    location: string;
}
export type ServiceRequestFormInterface = Omit<ServiceHistoryInterface, 'id'>;

export interface ServiceRequestResponse {
    items: ServiceHistoryInterface[];
}
