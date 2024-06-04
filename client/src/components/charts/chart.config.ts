import { ApexOptions } from 'apexcharts'

export const monthsArray = [...Array(13).keys()].splice(1)

// Function to parse the date string and return a Date object
export const parseDate = (dateString: string) => {
  const [day, month, year] = dateString.split('.').map(Number)
  return new Date(year, month - 1, day) // month is zero-based in JavaScript Date
}

// Function to format the price
export const formatPrice = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export const TotalRevenueOptions: ApexOptions = {
  chart: {
    type: 'bar',
    toolbar: {
      show: false,
    },
  },
  colors: ['#475BE8', '#CFC8FF'],
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: false,
      columnWidth: '55%',
    },
  },
  dataLabels: {
    enabled: false,
  },
  grid: {
    show: false,
  },
  stroke: {
    colors: ['transparent'],
    width: 4,
  },
  xaxis: {
    categories: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
  },
  yaxis: {
    title: {
      text: 'RON',
    },
  },
  fill: {
    opacity: 1,
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right',
  },
  tooltip: {
    y: {
      formatter(val: number) {
        return `${formatPrice(val)} RON`
      },
    },
  },
}
