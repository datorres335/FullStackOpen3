const args = process.argv;

if (args.length !== 4) {
  throw new Error('Wrong number of arguments');
}

if (isNaN(Number(args[2])) || isNaN(Number(args[3]))) {
  throw new Error('Arguments should be numbers');
}

const height = Number(args[3]);
const weight = Number(args[4]);

const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / ((height / 100) * (height / 100));

  const limits = [
    { value: 16, type: "Underweight (Severe thinness)" },
    { value: 17, type: "Underweight (Moderate thinness)" },
    { value: 18.5, type: "Underweight (Mild thinness)" },
    { value: 25, type: "Normal range" },
    { value: 30, type: "Overweight (Pre-obese)" },
    { value: 35, type: "Obese (Class I)" },
    { value: 40, type: "Obese (Class II)" }
  ];

  for (const { value, type } of limits) {
    if (bmi < value) {
      return type
    }
  }

  return "Obese (Class III)";
};

const bmi = calculateBmi(height, weight);

console.log(bmi);