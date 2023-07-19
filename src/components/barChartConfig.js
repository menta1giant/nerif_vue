import { CHART_FONT, CHART_PADDING, DARK_COLORS, getChartTooltipSettings, generateLabels, generateData } from './chartConfig';

export function getData({ data=generateData(), labels=generateLabels(), colors=DARK_COLORS }) {
  return {
    labels: labels,
    datasets: [
      {
        label: '',
        color: colors.tickText,
        borderColor: 'transparent',
        backgroundColor: function(context) {
          var value = context.dataset.data[context.dataIndex];
          if (value > 1.6) {
            return '#B7E5B3';  
          } else if (value > 1.4) {
            return '#E5D9B3';
          } else {
            return '#E5BCB3'; 
          }
        },
        maxBarThickness: 40,
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