import { SalaryInput } from '@/types/salary';

export function normalizeCompany(company: string): string {
  return company.toLowerCase().trim();
}

export function validateSalaryInput(data: any): SalaryInput {
  const errors: string[] = [];

  if (!data.company || typeof data.company !== 'string') {
    errors.push('Company is required and must be a string');
  }

  if (!data.role || typeof data.role !== 'string') {
    errors.push('Role is required and must be a string');
  }

  if (!data.level || typeof data.level !== 'string') {
    errors.push('Level is required and must be a string');
  }

  if (!data.location || typeof data.location !== 'string') {
    errors.push('Location is required and must be a string');
  }

  if (typeof data.experienceYears !== 'number' || data.experienceYears < 0) {
    errors.push('Experience years must be a non-negative number');
  }

  if (typeof data.baseSalary !== 'number' || data.baseSalary < 0) {
    errors.push('Base salary must be a non-negative number');
  }

  const bonus = data.bonus || 0;
  if (typeof bonus !== 'number' || bonus < 0) {
    errors.push('Bonus must be a non-negative number');
  }

  const stock = data.stock || 0;
  if (typeof stock !== 'number' || stock < 0) {
    errors.push('Stock must be a non-negative number');
  }

  const confidence = data.confidence || 0.5;
  if (typeof confidence !== 'number' || confidence < 0 || confidence > 1) {
    errors.push('Confidence must be a number between 0 and 1');
  }

  if (errors.length > 0) {
    throw new Error(`Validation errors: ${errors.join(', ')}`);
  }

  return {
    company: normalizeCompany(data.company),
    role: data.role,
    level: data.level,
    location: data.location,
    experienceYears: data.experienceYears,
    baseSalary: data.baseSalary,
    bonus,
    stock,
    confidence
  };
}

export function calculateTotalCompensation(baseSalary: number, bonus: number, stock: number): number {
  return baseSalary + bonus + stock;
}
