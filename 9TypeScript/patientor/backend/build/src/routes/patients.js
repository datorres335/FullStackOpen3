"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientsService_1 = __importDefault(require("../services/patientsService"));
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientsService_1.default.getAllWithoutSsn());
});
router.get('/:id', (req, res) => {
    const id = req.params.id;
    res.send(patientsService_1.default.getOne(id));
});
router.post('/', (req, res) => {
    try {
        const newPatient = (0, utils_1.parsePatient)(req.body);
        const addedPatient = patientsService_1.default.create(newPatient);
        res.send(addedPatient);
    }
    catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
router.post('/:id/entries', (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const newEntry = (0, utils_1.parseEntry)(req.body);
        const patient = patientsService_1.default.addEntry(req.params.id, newEntry);
        res.send(patient);
    }
    catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
exports.default = router;
