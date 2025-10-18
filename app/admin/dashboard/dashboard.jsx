import React from 'react';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const cardClass =
  'bg-white rounded-xl shadow p-4 flex-1 min-w-[600px] max-w-[1100px] mx-auto min-h-[370px]';

export default function AdminDashboard() {
  // Dummy data for charts
  const userSignupData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Looping tension',
        data: [64, 58, 80, 89, 18, 55, 39],
        borderColor: '#26c6da',
        backgroundColor: 'rgba(38,198,218,0.1)',
        borderWidth: 3,
        tension: 0.4,
        pointBackgroundColor: '#26c6da',
        pointBorderColor: '#fff',
  pointRadius: 5,
  pointHoverRadius: 7,
  pointStyle: 'circle',
  pointBorderWidth: 3,
  pointHitRadius: 10,
  fill: false,
  spanGaps: false,
      },
    ],
  };

  const orderOverviewData = {
    labels: ['06/08', '07/08', '08/08', '09/08', '10/08', '11/08', '12/08'],
    datasets: [
      {
        label: 'Orders',
        data: [8, 7, 6, 7, 8, 5, 3],
        backgroundColor: '#ff9800',
        yAxisID: 'y',
      },
      {
        label: 'Revenue',
        data: [7, 6, 5, 6, 7, 4, 2],
        backgroundColor: '#4caf50',
        yAxisID: 'y1',
      },
    ],
  };

  const servicesLabels = ['AC', 'Plumber', 'Electrician', 'Painter', 'Cleaner', 'Carpenter'];
  const servicesValues = [120, 90, 70, 60, 50, 40];
  const servicesColors = [
    '#2196f3', '#4caf50', '#ff9800', '#e91e63', '#9c27b0', '#ffc107'
  ];
  const servicesData = {
    labels: servicesLabels,
    datasets: [
      {
        label: 'Services',
        data: servicesValues,
        backgroundColor: servicesColors,
      },
    ],
  };

  // Data for Transactions Overview chart (Account Balance & Razorpay)
  // Area chart data for Transactions Overview (no points, strong fill)
  const transactionOverviewData = {
    labels: ['11/07', '12/07', '13/07', '14/07', '15/07', '16/07', '17/07', '18/07', '19/07', '20/07'],
    datasets: [
      {
        label: 'Account Balance',
        data: [40, 60, 30, 80, 20, 90, 70, 100, 60, 80],
        borderColor: 'rgba(67,185,111,1)',
        backgroundColor: 'rgba(67,185,111,0.35)',
        pointRadius: 0,
        pointHoverRadius: 0,
        fill: true,
        tension: 0.5,
        borderWidth: 2,
      },
      {
        label: 'Razorpay',
        data: [20, 40, 50, 30, 60, 40, 80, 60, 90, 50],
        borderColor: 'rgba(37,99,235,1)',
        backgroundColor: 'rgba(37,99,235,0.35)',
        pointRadius: 0,
        pointHoverRadius: 0,
        fill: true,
        tension: 0.5,
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="p-4 bg-[#f3f6f8] min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
        {/* User Signups */}
  <div className={cardClass + ' mb-0'}>
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-lg text-gray-800">
              User Signups <span className="text-orange-500 text-base">(1754)</span>
            </span>
            {/* Custom dropdown for date range */}
            <div className="relative z-20">
              <select
                className="border rounded px-2 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-200 min-w-[150px] bg-white"
                style={{zIndex: 20}}
                defaultValue="Last 7 days"
              >
                <option>Today</option>
                <option>Yesterday</option>
                <option>This week</option>
                <option>Last week</option>
                <option>Last 7 days</option>
                <option>Last 14 days</option>
                <option>Last 28 days</option>
                <option>Last 30 days</option>
                <option>Last 60 days</option>
                <option>Last 90 days</option>
                <option>Last 12 Month</option>
              </select>
            </div>
          </div>
          <Line
            data={userSignupData}
            options={{
              plugins: {
                legend: {
                  display: true,
                  position: 'top',
                  labels: {
                    boxWidth: 30,
                    font: { size: 13, weight: 'bold' }, // text-sm
                    color: '#666',
                    padding: 10,
                  },
                  align: 'center',
                  maxHeight: 40,
                },
              },
              elements: {
                line: {
                  borderWidth: 3,
                  tension: 0.4,
                },
                point: {
                  radius: 5,
                  hoverRadius: 7,
                  borderWidth: 3,
                  hitRadius: 10,
                  pointStyle: 'circle',
                },
              },
              animation: {
                tension: {
                  duration: 2000,
                  easing: 'linear',
                  from: 0.4,
                  to: 0.1,
                  loop: true,
                },
              },
              layout: {
                padding: {
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                },
              },
              scales: {
                y: {
                  min: 0,
                  max: 100,
                  ticks: {
                    stepSize: 10,
                  },
                  grid: {
                    drawTicks: false,
                  },
                },
                x: {
                  grid: {
                    drawTicks: false,
                  },
                },
              },
            }}
            height={150}
          />
        </div>
        {/* Orders Overview */}
  <div className={cardClass + ' mb-0'}>
    <div className="flex flex-col gap-1 mb-2">
      <div className="flex justify-between items-center">
        <span className="font-semibold text-lg text-gray-800">Orders Overview</span>
        {/* Custom dropdown for date range */}
        <div className="relative z-20">
          <select
            className="border rounded px-2 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-200 min-w-[150px] bg-white"
            style={{zIndex: 20}}
            defaultValue="Last 7 days"
          >
            <option>Today</option>
            <option>Yesterday</option>
            <option>This week</option>
            <option>Last week</option>
            <option>Last 7 days</option>
            <option>Last 14 days</option>
            <option>Last 28 days</option>
            <option>Last 30 days</option>
            <option>Last 60 days</option>
            <option>Last 90 days</option>
            <option>Last 12 Month</option>
          </select>
        </div>
      </div>
      <div className="flex items-center gap-6 mt-1 text-sm">
        <span className="flex items-center ">
          <span className="inline-block w-3 h-3 rounded-full bg-orange-500 mr-1"></span>
          <span className="text-gray-500">Orders:</span>
          <span className="text-gray-700  ml-1">104</span>
        </span>
        <span className="flex items-center text-sm">
          <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-1"></span>
          <span className="text-gray-500">Revenue:</span>
          <span className="text-gray-700 font-bold ml-1">$321</span>
        </span>
      </div>
    </div>
    <Bar
      data={orderOverviewData}
      options={{
        plugins: {
          legend: { display: false },
        },
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Orders',
              color: '#ff9800',
              font: { weight: 'bold', size: 14 },
            },
            ticks: {
              color: '#ff9800',
              font: { weight: 'bold' },
              stepSize: 1,
              max: 8,
            },
            grid: {
              color: '#eee',
            },
          },
          y1: {
            position: 'right',
            grid: { drawOnChartArea: false },
            title: {
              display: true,
              text: 'Revenue',
              color: '#4caf50',
              font: { weight: 'bold', size: 14 },
            },
            ticks: {
              color: '#4caf50',
              font: { weight: 'bold' },
              stepSize: 1,
              max: 8,
            },
          },
          x: {
            grid: {
              color: '#eee',
            },
          },
        },
        barPercentage: 0.6,
        categoryPercentage: 0.5,
      }}
      height={120}
    />
  </div>
        {/* Services */}
        <div className={cardClass + ' mb-0'}>
          <div className="flex flex-col gap-1 mb-2">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg text-gray-800">Total Services</span>
              {/* Custom dropdown for date range */}
              <div className="relative z-20">
                <select
                  className="border rounded px-2 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-200 min-w-[150px] bg-white"
                  style={{zIndex: 20}}
                  defaultValue="Last 7 days"
                >
                  <option>Today</option>
                  <option>Yesterday</option>
                  <option>This week</option>
                  <option>Last week</option>
                  <option>Last 7 days</option>
                  <option>Last 14 days</option>
                  <option>Last 28 days</option>
                  <option>Last 30 days</option>
                  <option>Last 60 days</option>
                  <option>Last 90 days</option>
                  <option>Last 12 Month</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center h-full">
            <div className="w-full max-w-[400px]">
              <Pie data={servicesData} options={{ plugins: { legend: { display: true, position: 'bottom' } } }} height={150} />
            </div>
          </div>
        </div>
        {/* Transactions Overview */}
        <div className={cardClass + ' mb-0'}>
          <div className="flex flex-col gap-1 mb-2">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg text-gray-800">Transactions Overview</span>
              {/* Custom dropdown for date range */}
              <div className="relative z-20">
                <select
                  className="border rounded px-2 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-200 min-w-[150px] bg-white"
                  style={{zIndex: 20}}
                  defaultValue="Last 7 days"
                >
                  <option>Today</option>
                  <option>Yesterday</option>
                  <option>This week</option>
                  <option>Last week</option>
                  <option>Last 7 days</option>
                  <option>Last 14 days</option>
                  <option>Last 28 days</option>
                  <option>Last 30 days</option>
                  <option>Last 60 days</option>
                  <option>Last 90 days</option>
                  <option>Last 12 Month</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-2">
              <span className="bg-green-100 text-green-700 font-bold rounded-full px-3 py-1 text-sm flex items-center">
                Account Balance: $131.00 (13 txn)
              </span>
              <span className="bg-blue-100 text-blue-700 font-bold rounded-full px-3 py-1 text-sm flex items-center">
                Razorpay: $35.00 (4 txn)
              </span>
            </div>
          </div>
          <Line
            data={transactionOverviewData}
            options={{
              plugins: {
                legend: { display: false },
              },
              elements: {
                line: {
                  borderWidth: 2,
                },
                point: {
                  radius: 0,
                  hoverRadius: 0,
                },
              },
              fill: true,
              responsive: true,
              scales: {
                y: {
                  min: 0,
                  max: 120,
                  ticks: {
                    stepSize: 20,
                  },
                  grid: {
                    color: '#e5e7eb',
                  },
                },
                x: {
                  grid: {
                    color: '#e5e7eb',
                  },
                },
              },
            }}
            height={180}
          />
        </div>
      </div>
    </div>
  );
}
