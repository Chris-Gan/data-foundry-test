/* eslint-disable import/prefer-default-export */
import { DATE_FORMAT } from 'constants/index';
import { addDays, format, parse } from 'date-fns';

export const calculateResolutionDate = (creationDate: string, severity: string, dateFormat = DATE_FORMAT) => {
    if (creationDate === '') return creationDate;
    const formattedCreationDate = parse(creationDate, dateFormat, new Date());

    switch (severity) {
        case 'Low':
            return format(addDays(formattedCreationDate, 5), dateFormat);
        case 'Medium':
            return format(addDays(formattedCreationDate, 3), dateFormat);
        case 'High':
            return format(addDays(formattedCreationDate, 1), dateFormat);
        default:
            return creationDate;
    }
};
