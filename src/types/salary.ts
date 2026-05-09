export interface SalaryData {
  id: string;
  company: string;
  role: string;
  level: string;
  location: string;
  experienceYears: number;
  baseSalary: number;
  bonus: number;
  stock: number;
  totalCompensation: number;
  confidenceScore: number;
  createdAt: Date;
}

export interface SalaryInput {
  company: string;
  role: string;
  level: string;
  location: string;
  experienceYears: number;
  baseSalary: number;
  bonus?: number;
  stock?: number;
  confidence?: number;
}

export interface CompanyStats {
  company: string;
  medianCompensation: number;
  salaryCount: number;
  levelDistribution: Record<string, number>;
}

export interface SalaryComparison {
  salary1: SalaryData;
  salary2: SalaryData;
  differences: {
    baseSalary: number;
    bonus: number;
    stock: number;
    totalCompensation: number;
    levelDifference: string;
  };
}
