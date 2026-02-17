import { isNotNumber } from "./utils";

const args = process.argv;

if (args.length < 4) {
  throw new Error('Too few arguments');
}

const argTarget = args[2];

if (isNotNumber(argTarget)) {
  throw new Error('Argements should be numbers')
}

const target = Number(argTarget);

const argDays = args.slice(3);

for (const dayArg of argDays) {
  if (isNotNumber(dayArg)) {
    throw new Error('Arguments should be numbers');
  }
}

const days = argDays.map(d => Number(d));

interface ExerciseResult {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateRating = (target: number, average: number): 1 | 2 | 3 => {
  if (average < 0.5 * target) {
    return 1;
  }
  if (average < 1.2 * target) {
    return 2;
  }

  return 3
}

const calculateExercises = (days: number[], target: number): ExerciseResult => {
  const descriptions = {
    1: 'you could do so much more, please',
    2: 'not too bad but could be better',
    3: 'good job!'
  }

  const periodLength = days.length;
  const sum = days.reduce((s, d) => s + d);
  const average = sum / periodLength;
  const rating = calculateRating(target, average);

  return {
    periodLength,
    trainingDays: days.filter(v => v > 0).length,
    success: average >= target,
    rating,
    ratingDescription: descriptions[rating],
    target,
    average
  };
}

const result = calculateExercises(days, target);
console.log(result);
