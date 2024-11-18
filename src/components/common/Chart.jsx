import ReactApexChart from "react-apexcharts";

function Chart({ 
  data, 
  title,
  xAxisKey = "naziv",
  yAxisKey = "iznos",
  colors = ["#A9DFD8"],
  tooltipFormatter = (value) => value.toLocaleString("hr-HR", {
    style: "currency",
    currency: "EUR",
  })
}) {
  const options = {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
      background: "#21222D",
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: "40%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      borderColor: "#2C2D33",
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
      padding: {
        top: 20,
      },
    },
    xaxis: {
      categories: data.map((item) => item[xAxisKey]),
      labels: {
        style: {
          colors: "#D2D2D2",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#D2D2D2",
        },
        formatter: tooltipFormatter,
      },
    },
    colors: colors,
    tooltip: {
      theme: false,
      custom: function ({ series, seriesIndex, dataPointIndex }) {
        const value = series[seriesIndex][dataPointIndex];
        return `<div class="custom-tooltip">
          <span>${tooltipFormatter(value)}</span>
        </div>`;
      },
    },
  };

  const series = [
    {
      name: "Iznos",
      data: data.map((item) => item[yAxisKey]),
    },
  ];

  return (
    <div className="bg-[#21222D] rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
      />
    </div>
  );
}

export default Chart;
