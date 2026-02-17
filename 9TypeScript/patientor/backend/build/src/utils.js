"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseEntry = exports.parsePatient = void 0;
const types_1 = require("./types");
const isNumber = (value) => {
    return typeof value === 'number';
};
const isString = (value) => {
    return typeof value === 'string' || value instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const isGender = (value) => {
    return Object.values(types_1.Gender).map(v => v.toString()).includes(value);
};
const parseString = (value, what) => {
    if (isString(value)) {
        return value;
    }
    throw new Error(`Value of ${what} incorrect: ${value}`);
};
const parseDate = (value, what) => {
    if (!isString(value) || !isDate(value)) {
        throw new Error(`Value of ${what} incorrect: ${value}`);
    }
    return value;
};
const parseGender = (value) => {
    if (!isString(value) || !isGender(value)) {
        throw new Error(`Value of gender incorrect: ${value}`);
    }
    return value;
};
const parseHealtCheckRating = (value, what) => {
    if (isNumber(value) && (value === 0 || value === 1 || value === 2 || value === 3)) {
        return value;
    }
    throw new Error(`Value of ${what} incorrect: ${value}`);
};
const parseDiagnosisCodes = (object) => {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
        return [];
    }
    return object.diagnosisCodes;
};
const parseDischarge = (object) => {
    if (!object || typeof object !== 'object' || !('discharge' in object)) {
        return undefined;
    }
    const discharege = object.discharge;
    if (!discharege || typeof discharege !== 'object')
        throw new Error('invalid discharge');
    if (!('date' in discharege) || !isString(discharege.date) || !isDate(discharege.date)) {
        throw new Error('discharge date missing or wrong type');
    }
    if (!('criteria' in discharege) || !isString(discharege.criteria)) {
        throw new Error('discharge criteria missing or wrong type');
    }
    return {
        date: discharege.date,
        criteria: discharege.criteria
    };
};
const parseSickLeave = (object) => {
    if (!object || typeof object !== 'object' || !('sickLeave' in object)) {
        return undefined;
    }
    const siclLeave = object.sickLeave;
    if (!siclLeave || typeof siclLeave !== 'object')
        throw new Error('invalid siclLeave');
    if (!('startDate' in siclLeave) || !isString(siclLeave.startDate) || !isDate(siclLeave.startDate)) {
        throw new Error('sickLeave startDate missing or wrong type');
    }
    if (!('endDate' in siclLeave) || !isString(siclLeave.endDate) || !isDate(siclLeave.endDate)) {
        throw new Error('sickLeave endDate missing or wrong type');
    }
    return {
        startDate: siclLeave.startDate,
        endDate: siclLeave.endDate
    };
};
const parsePatient = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Data missing or in wrong format');
    }
    if (!('name' in object))
        throw new Error('name missing');
    if (!('occupation' in object))
        throw new Error('occupation missing');
    if (!('ssn' in object))
        throw new Error('ssn missing');
    if (!('gender' in object))
        throw new Error('gender missing');
    if (!('dateOfBirth' in object))
        throw new Error('dateOfBirth missing');
    return {
        name: parseString(object.name, 'name'),
        dateOfBirth: parseDate(object.dateOfBirth, 'dateOfBirth'),
        gender: parseGender(object.gender),
        occupation: parseString(object.occupation, 'occupation'),
        ssn: parseString(object.ssn, 'occupation'),
        entries: []
    };
};
exports.parsePatient = parsePatient;
const parseEntry = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Data missing or in wrong format');
    }
    if (!('type' in object))
        throw new Error('type missing');
    if (!('date' in object))
        throw new Error('date missing');
    if (!('specialist' in object))
        throw new Error('specialist missing');
    if (!('description' in object))
        throw new Error('description missing');
    const common = {
        date: parseDate(object.date, 'date'),
        specialist: parseString(object.specialist, 'specialist'),
        description: parseString(object.description, 'description'),
        diagnosisCodes: parseDiagnosisCodes(object)
    };
    if (object.type === 'HealthCheck') {
        if (!('healthCheckRating' in object))
            throw new Error('healthCheckRating missing');
        return Object.assign(Object.assign({}, common), { type: 'HealthCheck', healthCheckRating: parseHealtCheckRating(object.healthCheckRating, 'healthCheckRating') });
    }
    else if (object.type === 'OccupationalHealthcare') {
        if (!('employerName' in object))
            throw new Error('employerName missing');
        return Object.assign(Object.assign({}, common), { type: 'OccupationalHealthcare', employerName: parseString(object.employerName, 'employerName'), sickLeave: parseSickLeave(object) });
    }
    else if (object.type === 'Hospital') {
        return Object.assign(Object.assign({}, common), { type: 'Hospital', discharge: parseDischarge(object) });
    }
    throw new Error(`Incorrect type: ${object.type}`);
};
exports.parseEntry = parseEntry;
