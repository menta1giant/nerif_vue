export const CHART_FONT = {
  family: 'Manrope',
  size: 14,
}

export const CHART_PADDING = 32;

export function getChartTooltipSettings(colors) {
  return {
    enabled: true,
    usePointStyle: true,
    titleMarginBottom: 8,
    titleColor: colors.tickText,
    bodyColor: colors.tickText,
    borderColor: colors.tooltipBorder,
    borderWidth: 1,
    backgroundColor: colors.tooltipBackground,
    displayColors: false,
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

export const DARK_COLORS = {
  accentPrimary: '#DBAA04',
  gridY: '#767EAD',
  tickText: '#F5F6FA',
  background: '#616A98',
  tooltipBackground: '#3E456A',
  tooltipBorder: 'transparent',
}

export const BRIGHT_COLORS = {
  accentPrimary: '#6D79BF',
  gridY: '#EDEFFA',
  tickText: '#2C314C',
  background: 'transparent',
  tooltipBackground: '#FCFCFF',
  tooltipBorder: '#767EAD',
}

export function generateLabels() {
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
export function generateData() {
  const data = [];
  const minValue = 1.25; // Lowest coefficient value
  const maxValue = 1.95; // Highest coefficient value
  for (let i = 0; i <= 10; i++) {
    const coefficient = Math.random() * (maxValue - minValue) + minValue;
    data.push(coefficient);
  }
  return data;
}