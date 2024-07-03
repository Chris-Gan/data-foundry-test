import { UseMutationResult, useMutation, useQuery } from '@tanstack/react-query';
import { createServiceRequest, deleteServiceRequest, getServiceRequestHistories, updateServiceRequest } from 'api/serviceRequestApi';
import { requestServiceFormInitValues } from 'constants/index';
import { hideDeleteDialog, hideLoading, setEditedRequestCurrentValues, setServiceRequestForm, setSnackbar, showLoading, toggleForm } from 'context';
import { useAppDispatch } from 'context/store';
import { ServiceHistoryInterface, ServiceRequestFormInterface, ServiceRequestResponse } from 'interfaces';
import { useEffect } from 'react';

const useServices = (): {
    serviceHistories: ServiceHistoryInterface[];
    createServiceRequestMutation: UseMutationResult<unknown, Error, ServiceRequestFormInterface, unknown>;
    updateServiceRequestMutation: UseMutationResult<unknown, Error, { id: string; values: ServiceRequestFormInterface }, unknown>;
    deleteServiceRequestMutation: UseMutationResult<unknown, Error, string, unknown>;
} => {
    const dispatch = useAppDispatch();
    const {
        data: serviceHistories,
        isLoading,
        refetch,
    } = useQuery<ServiceRequestResponse>({
        queryKey: ['serviceHistories'],
        queryFn: getServiceRequestHistories,
        staleTime: Infinity,
    });

    const createServiceRequestMutation = useMutation({
        mutationFn: (submittedData: ServiceRequestFormInterface) => createServiceRequest(submittedData),
        onSettled: async (data, error) => {
            if (error) {
                dispatch(
                    setSnackbar({
                        isOpen: true,
                        message: `Error creating service request: ${error}`,
                        severity: 'error',
                    })
                );
            } else {
                await refetch();
                dispatch(toggleForm());
                dispatch(setServiceRequestForm(requestServiceFormInitValues));
                dispatch(
                    setSnackbar({
                        isOpen: true,
                        message: 'Service request created successfully!',
                        severity: 'success',
                    })
                );
            }
            dispatch(hideLoading());
        },
    });

    const updateServiceRequestMutation = useMutation({
        mutationFn: ({ id, values }: { id: string; values: ServiceRequestFormInterface }) => updateServiceRequest(id, values),
        onSettled: async (data, error) => {
            if (error) {
                dispatch(
                    setSnackbar({
                        isOpen: true,
                        message: `Error updating service request: ${error}`,
                        severity: 'error',
                    })
                );
            } else {
                await refetch();
                dispatch(toggleForm());
                dispatch(setServiceRequestForm(requestServiceFormInitValues));
                dispatch(setEditedRequestCurrentValues(null));
                dispatch(
                    setSnackbar({
                        isOpen: true,
                        message: 'Service request updated successfully!',
                        severity: 'success',
                    })
                );
            }
            dispatch(hideLoading());
        },
    });
    const deleteServiceRequestMutation = useMutation({
        mutationFn: (id: string) => deleteServiceRequest(id),
        onSettled: async (data, error) => {
            if (error) {
                dispatch(
                    setSnackbar({
                        isOpen: true,
                        message: `Error deleting service request: ${error}`,
                        severity: 'error',
                    })
                );
            } else {
                await refetch();
                dispatch(toggleForm());
                dispatch(setServiceRequestForm(requestServiceFormInitValues));
                dispatch(setEditedRequestCurrentValues(null));
                dispatch(hideDeleteDialog());
                dispatch(
                    setSnackbar({
                        isOpen: true,
                        message: 'Service request deleted successfully!',
                        severity: 'success',
                    })
                );
            }
            dispatch(hideLoading());
        },
    });
    useEffect(() => {
        if (isLoading) {
            dispatch(showLoading());
        } else {
            dispatch(hideLoading());
        }
    }, [isLoading, dispatch]);

    return {
        serviceHistories: serviceHistories?.items ?? [],
        createServiceRequestMutation,
        updateServiceRequestMutation,
        deleteServiceRequestMutation,
    };
};

export default useServices;
