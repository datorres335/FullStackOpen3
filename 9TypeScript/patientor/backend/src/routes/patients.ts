import express from 'express';
import { Response } from 'express';
import { z } from 'zod';
import patientsService from '../services/patientsService';
import { parsePatient, parseEntry } from '../utilsZod';
import { NonSensitivePatient, Patient } from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientsService.getAllWithoutSsn());
});

router.get('/:id', (req, res: Response<Patient | undefined>) => {
  const id = req.params.id ;
  res.send(patientsService.getOne(id));
});

router.post('/', (req, res: Response<Patient | z.core.$ZodIssue[] | string>) => {
  try {
    const newPatient = parsePatient(req.body);
    const addedPatient = patientsService.create(newPatient);
    res.send(addedPatient);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send(error.issues);
    } else {
      res.status(400).send('Something went wrong.');
    }
  }

});

router.post('/:id/entries', (req, res: Response<Patient | undefined | z.core.$ZodIssue[] | string>) => {
  try {
    const newEntry = parseEntry(req.body);
    const patient = patientsService.addEntry(req.params.id, newEntry);
    res.send(patient);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send(error.issues);
    } else {
      res.status(400).send('Something went wrong.');
    }
  }
});

export default router;