import { z } from "zod";
import { NewPatient, Gender, EntryWithoutId } from "./types";

const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  gender: z.enum(Gender),
  occupation: z.string(),
  ssn: z.string(),
});

const BaseEntrySchema = z.object({
  date: z.iso.date(),
  specialist: z.string(),
  description: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)]),
});

const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.iso.date(),
    criteria: z.string(),
  }).optional(),
});

const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z.object({
    startDate: z.iso.date(),
    endDate: z.iso.date(),
  }).optional(),
});

const EntryWithoutIdSchema = z.discriminatedUnion("type", [
  HealthCheckEntrySchema,
  HospitalEntrySchema,
  OccupationalHealthcareEntrySchema,
]);

export const parsePatient = (object: unknown): NewPatient => {
  const parsed = NewPatientSchema.parse(object);
  return {
    ...parsed,
    entries: [],
  };
};

export const parseEntry = (object: unknown): EntryWithoutId => {
  return EntryWithoutIdSchema.parse(object);
};
