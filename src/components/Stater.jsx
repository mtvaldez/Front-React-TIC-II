import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

export function Stater() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {

    if (!startDate || !endDate) {
        setError('Both dates are required');
        return;
    }
      
    if (new Date(startDate) > new Date(endDate)) {
        setError('The start date cannot be after the end date');
        return;
    }
      

    setError('');
    
    // Simulación de cálculo o llamado a API
    // Reemplazar por lógica real
    const simulatedData = {
      min: 5,
      max: 98,
      avg: 45.3,
      median: 44,
      stdDev: 12.1,
    };

    setStats(simulatedData);
  };

  return (
    <Card className="w-full max-w-xl mx-auto mt-10 shadow-lg border border-gray-200">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold text-gray-800">
          Statistcs By Date
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {/* Rango de fechas */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col w-full">
            <label htmlFor="startDate" className="text-sm font-medium text-gray-700">From:</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border rounded px-3 py-2"
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="endDate" className="text-sm font-medium text-gray-700">To:</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border rounded px-3 py-2"
            />
          </div>
        </div>

        <button
          onClick={handleCalculate}
          className="mt-2 w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
        >
          Calculate
        </button>

        {error && <p className="text-sm text-red-600 font-medium">{error}</p>}

        {/* Resultados */}
        {stats && (
          <div className="mt-4 border-t pt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 text-sm">
            <div><strong>Minimum:</strong> {stats.min}</div>
            <div><strong>Maximum:</strong> {stats.max}</div>
            <div><strong>Avarage:</strong> {stats.avg}</div>
            <div><strong>Median:</strong> {stats.median}</div>
            <div><strong>Standard Deviation:</strong> {stats.stdDev}</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
