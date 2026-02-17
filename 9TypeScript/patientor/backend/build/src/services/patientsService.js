"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const patients = patients_1.default;
const getAllWithoutSsn = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
    }));
};
const getOne = (id) => {
    return patients.find(p => p.id === id);
};
const addEntry = (id, newEntry) => {
    const patient = patients.find(p => p.id === id);
    console.log(newEntry);
    if (patient) {
        const entry = Object.assign(Object.assign({}, newEntry), { id: (0, uuid_1.v1)() });
        patient.entries = patient.entries.concat(entry);
    }
    return patient;
};
const create = (patient) => {
    const newPatient = Object.assign(Object.assign({}, patient), { id: (0, uuid_1.v1)() });
    return newPatient;
};
exports.default = {
    getAllWithoutSsn,
    create,
    getOne,
    addEntry
};
