import { DARK_COLORS } from '@/lib/chart';

export function getData({ data=generateData(), labels=generateLabels(), colors=DARK_COLORS }) {
  return {
    labels: labels,
    datasets: [
      {
        label: '',
        color: colors.tickText,
        borderColor: colors.accentPrimary,
        backgroundColor: colors.accentPrimary,
        pointBackgroundColor: colors.accentPrimary, 
        pointBorderColor: colors.accentPrimary,
        pointRadius: 5,
        borderWidth: 2,
        tension: 0.5,
        data: data,
      },
    ],
  }
}

export function getOptions({ colors=DARK_COLORS }) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: colors.tickText,
          maxRotation: 0,
          autoSkipPadding: 20,
          fontSize: 40,
          font: {
            family: 'Manrope',
            size: 14,
          },
          padding: 32,
        },
        border: {
          display: false,
        },
      },
      y: {
        grid: {
          color: colors.gridY,
        },
        ticks: {
          color: colors.tickText,
          callback: (value) => value.toFixed(2),
          font: {
            family: 'Manrope',
            size: 14,
          },
          padding: 32,
        },
        min: 1.2,
        max: 2,
        border: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
         display: false
      },
      tooltip: {
        enabled: true,
        usePointStyle: true,
        titleMarginBottom: 8,
        titleColor: colors.tickText,
        bodyColor: colors.tickText,
        borderColor: colors.tooltipBorder,
        borderWidth: 1,
        backgroundColor: colors.tooltipBackground,
        displayСolors: false,
        boxWidth: 0,
        boxHeight: 0,
        padding: 8,
        callbacks: {
          label: function(context) {
            return parseFloat(context.formattedValue.replace(',','.')).toFixed(2)
          }
        }
      }
   }
  }
}

function generateLabels() {
  const labels = [];
  const now = new Date();
  const hours = now.getHours();
  for (let i = 0; i <= 10; i++) {
    const minutes = i*6;
    labels.push(`${hours}:${minutes}`);
  }
  return labels;
}

// Generate data for Y-axis
function generateData() {
  const data = [];
  const minValue = 1.25; // Lowest coefficient value
  const maxValue = 1.95; // Highest coefficient value
  for (let i = 0; i <= 10; i++) {
    const coefficient = Math.random() * (maxValue - minValue) + minValue;
    data.push(coefficient);
  }
  return data;
}