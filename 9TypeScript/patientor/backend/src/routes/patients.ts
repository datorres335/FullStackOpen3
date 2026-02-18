import express from 'express';
import { Response } from 'express';
import patientsService from '../services/patientsService';
import { parsePatient, parseEntry } from '../utils';
import { NonSensitivePatient, Patient } from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientsService.getAllWithoutSsn());
});

router.get('/:id', (req, res: Response<Patient | undefined>) => {
  const id = req.params.id ;
  res.send(patientsService.getOne(id));
});

router.post('/', (req, res: Response<Patient | string>) => {
  try {
    const newPatient = parsePatient(req.body);
    const addedPatient = patientsService.create(newPatient);
    res.send(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }

});

router.post('/:id/entries', (req, res: Response<Patient | undefined | string>) => {
  try {
    const newEntry = parseEntry(req.body);
    const patient = patientsService.addEntry(req.params.id, newEntry);
    res.send(patient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;