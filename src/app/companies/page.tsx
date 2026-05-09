'use client';

import { useState, useEffect } from 'react';
import { mockSalaries } from '@/lib/mock-data';
import { SalaryData } from '@/types/salary';

interface CompanyStats {
  company: string;
  medianCompensation: number;
  salaryCount: number;
  levelDistribution: Record<string, number>;
  averageExperience: number;
}

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<CompanyStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const companyMap = new Map<string, SalaryData[]>();

    mockSalaries.forEach(salary => {
      const normalizedName = salary.company.toLowerCase();
      if (!companyMap.has(normalizedName)) {
        companyMap.set(normalizedName, []);
      }
      companyMap.get(normalizedName)!.push(salary);
    });

    const companyStats: CompanyStats[] = Array.from(companyMap.entries()).map(([company, salaries]) => {
      const sortedSalaries = salaries.sort((a, b) => a.totalCompensation - b.totalCompensation);
      const medianCompensation = sortedSalaries[Math.floor(sortedSalaries.length / 2)].totalCompensation;
      
      const levelDistribution: Record<string, number> = {};
      salaries.forEach(salary => {
        levelDistribution[salary.level] = (levelDistribution[salary.level] || 0) + 1;
      });

      const averageExperience = salaries.reduce((sum, salary) => sum + salary.experienceYears, 0) / salaries.length;

      return {
        company: salaries[0].company,
        medianCompensation,
        salaryCount: salaries.length,
        levelDistribution,
        averageExperience: Math.round(averageExperience * 10) / 10
      };
    });

    setCompanies(companyStats.sort((a, b) => b.medianCompensation - a.medianCompensation));
    setLoading(false);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading company data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <a href="/" className="text-xl font-bold text-gray-900">CompIntel</a>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/" className="text-gray-700 hover:text-gray-900">Home</a>
              <a href="/salaries" className="text-gray-700 hover:text-gray-900">Salary Table</a>
              <a href="/compare" className="text-gray-700 hover:text-gray-900">Compare</a>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Company Insights</h1>
          <p className="text-gray-600">
            Median compensation and level distribution by company
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => (
            <div key={company.company} className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{company.company}</h3>
                <p className="text-sm text-gray-500">{company.salaryCount} salary records</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Median Total Compensation</span>
                  <span className="text-lg font-bold text-green-600">
                    {formatCurrency(company.medianCompensation)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Average Experience</span>
                  <span className="text-sm font-medium">{company.averageExperience} years</span>
                </div>

                <div className="pt-3 border-t">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Level Distribution</h4>
                  <div className="space-y-1">
                    {Object.entries(company.levelDistribution)
                      .sort(([a], [b]) => a.localeCompare(b))
                      .map(([level, count]) => (
                        <div key={level} className="flex justify-between items-center">
                          <span className="text-xs text-gray-600">
                            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                              {level}
                            </span>
                          </span>
                          <span className="text-xs font-medium">{count} positions</span>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="pt-3">
                  <a 
                    href={`/salaries?company=${encodeURIComponent(company.company)}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View all {company.company} salaries →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {companies.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500">No company data available</p>
          </div>
        )}
      </main>
    </div>
  );
}
