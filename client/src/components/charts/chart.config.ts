import { ApexOptions } from 'apexcharts'

export const monthsArray = [...Array(13).keys()].splice(1)
const allMonthsArray = [
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
]

// Function to parse the date string and return a Date object
export const parseDate = (dateString: string) => {
  const [day, month, year] = dateString.split('.').map(Number)
  return new Date(year, month - 1, day) // month is zero-based in JavaScript Date
}

// Function to format the price
export const formatPrice = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export const AgentsWorkOptions: ApexOptions = {
  chart: {
    type: 'area',
    stacked: false,
    height: 350,
    zoom: {
      type: 'x',
      enabled: true,
      autoScaleYaxis: true,
    },
    toolbar: {
      autoSelected: 'zoom',
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 0,
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      inverseColors: false,
      opacityFrom: 0.85,
      opacityTo: 0.5,
    },
  },
  stroke: {
    curve: 'straight',
    width: 2,
  },
  grid: {
    show: false,
  },
}

export const TotalRevenueOptions: ApexOptions = {
  chart: {
    type: 'bar',
    toolbar: {
      show: true,
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
    show: true,
    width: 2,
    colors: ['transparent'],
  },
  xaxis: {
    categories: allMonthsArray,
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
    horizontalAlign: 'center',
  },
  tooltip: {
    y: {
      formatter(val: number) {
        return `${formatPrice(val)} RON`
      },
    },
  },
}

export const PropertyTypeOptions: ApexOptions = {
  chart: {
    type: 'bar',
    height: 350,
  },
  colors: ['#475BE8'],
  plotOptions: {
    bar: {
      borderRadius: 4,
      borderRadiusApplication: 'end',
      horizontal: true,
    },
  },
  dataLabels: {
    enabled: false,
  },
}
