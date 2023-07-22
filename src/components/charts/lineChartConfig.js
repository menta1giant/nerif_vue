import { CHART_FONT, CHART_PADDING, DARK_COLORS, getChartTooltipSettings } from './chartConfig';

export function getData({ data=[], labels=[], colors=DARK_COLORS }) {
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
          font: CHART_FONT,
          padding: CHART_PADDING,
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
          font: CHART_FONT,
          padding: CHART_PADDING,
        },
        border: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
         display: false
      },
      tooltip: getChartTooltipSettings(colors),
   }
  }
}