'use client';

import { useState, useEffect } from 'react';
import { mockSalaries } from '@/lib/mock-data';
import { SalaryData } from '@/types/salary';

export default function ComparePage() {
  const [salaries, setSalaries] = useState<SalaryData[]>([]);
  const [selected1, setSelected1] = useState<string>('');
  const [selected2, setSelected2] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSalaries(mockSalaries);
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

  const salary1 = salaries.find(s => s.id === selected1);
  const salary2 = salaries.find(s => s.id === selected2);

  const getComparison = () => {
    if (!salary1 || !salary2) return null;

    return {
      baseSalary: salary1.baseSalary - salary2.baseSalary,
      bonus: salary1.bonus - salary2.bonus,
      stock: salary1.stock - salary2.stock,
      totalCompensation: salary1.totalCompensation - salary2.totalCompensation,
      levelDifference: `${salary1.level} vs ${salary2.level}`
    };
  };

  const comparison = getComparison();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading salary data...</div>
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
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Compare Compensation</h1>
          <p className="text-gray-600">
            Select two salary records to compare compensation packages side by side
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Select Salaries to Compare</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Salary
              </label>
              <select
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selected1}
                onChange={(e) => setSelected1(e.target.value)}
              >
                <option value="">Select first salary...</option>
                {salaries.map((salary) => (
                  <option key={salary.id} value={salary.id}>
                    {salary.company} - {salary.role} ({salary.level}) - {formatCurrency(salary.totalCompensation)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Second Salary
              </label>
              <select
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selected2}
                onChange={(e) => setSelected2(e.target.value)}
              >
                <option value="">Select second salary...</option>
                {salaries.map((salary) => (
                  <option key={salary.id} value={salary.id}>
                    {salary.company} - {salary.role} ({salary.level}) - {formatCurrency(salary.totalCompensation)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {salary1 && salary2 && comparison && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 text-blue-600">Offer 1</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-500">Company</span>
                    <p className="font-medium">{salary1.company}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Role</span>
                    <p className="font-medium">{salary1.role}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Level</span>
                    <p className="font-medium">
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                        {salary1.level}
                      </span>
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Location</span>
                    <p className="font-medium">{salary1.location}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Experience</span>
                    <p className="font-medium">{salary1.experienceYears} years</p>
                  </div>
                  <div className="pt-3 border-t">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Base Salary</span>
                      <span className="font-medium">{formatCurrency(salary1.baseSalary)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Bonus</span>
                      <span className="font-medium">{formatCurrency(salary1.bonus)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Stock</span>
                      <span className="font-medium">{formatCurrency(salary1.stock)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span className="text-sm font-medium">Total Compensation</span>
                      <span className="font-bold text-green-600">{formatCurrency(salary1.totalCompensation)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 text-purple-600">Offer 2</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-500">Company</span>
                    <p className="font-medium">{salary2.company}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Role</span>
                    <p className="font-medium">{salary2.role}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Level</span>
                    <p className="font-medium">
                      <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded">
                        {salary2.level}
                      </span>
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Location</span>
                    <p className="font-medium">{salary2.location}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Experience</span>
                    <p className="font-medium">{salary2.experienceYears} years</p>
                  </div>
                  <div className="pt-3 border-t">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Base Salary</span>
                      <span className="font-medium">{formatCurrency(salary2.baseSalary)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Bonus</span>
                      <span className="font-medium">{formatCurrency(salary2.bonus)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Stock</span>
                      <span className="font-medium">{formatCurrency(salary2.stock)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span className="text-sm font-medium">Total Compensation</span>
                      <span className="font-bold text-green-600">{formatCurrency(salary2.totalCompensation)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Difference Analysis</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Level Comparison</span>
                  <span className="text-sm text-gray-600">{comparison.levelDifference}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Base Salary Difference</span>
                  <span className={`font-medium ${comparison.baseSalary >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {comparison.baseSalary >= 0 ? '+' : ''}{formatCurrency(comparison.baseSalary)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Bonus Difference</span>
                  <span className={`font-medium ${comparison.bonus >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {comparison.bonus >= 0 ? '+' : ''}{formatCurrency(comparison.bonus)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Stock Difference</span>
                  <span className={`font-medium ${comparison.stock >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {comparison.stock >= 0 ? '+' : ''}{formatCurrency(comparison.stock)}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t">
                  <span className="text-base font-semibold">Total Compensation Difference</span>
                  <span className={`text-lg font-bold ${comparison.totalCompensation >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {comparison.totalCompensation >= 0 ? '+' : ''}{formatCurrency(comparison.totalCompensation)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {!salary1 || !salary2 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500">Select two salaries to see a detailed comparison</p>
          </div>
        )}
      </main>
    </div>
  );
}
