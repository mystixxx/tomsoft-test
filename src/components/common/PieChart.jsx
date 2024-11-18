import ReactApexChart from "react-apexcharts";

function PieChart({ 
  data, 
  title,
  labelKey = "naziv",
  valueKey = "iznos",
  colors = ["#A9DFD8", "#7CABA6", "#5E8480", "#475F5C", "#2C3533"],
  tooltipFormatter = (value, item) => value.toLocaleString("hr-HR", {
    style: "currency",
    currency: "EUR",
  })
}) {
  const options = {
    chart: {
      background: "#21222D",
      type: "pie",
    },
    labels: data.map((item) => item[labelKey]),
    colors: colors,
    legend: {
      position: "bottom",
      labels: {
        colors: "#D2D2D2",
      },
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "14px",
        fontFamily: "Inter, sans-serif",
        fontWeight: 500,
      },
      formatter: function (val) {
        return Math.round(val) + "%";
      },
    },
    tooltip: {
      theme: false,
      custom: function ({ series, seriesIndex, w }) {
        const value = data[seriesIndex][valueKey];
        return `<div class="custom-tooltip">
          <span>${tooltipFormatter(value, data[seriesIndex])}</span>
        </div>`;
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const series = data.map((item) => item[valueKey]);

  return (
    <div className="bg-[#21222D] rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <ReactApexChart
        options={options}
        series={series}
        type="pie"
        height={350}
      />
    </div>
  );
}

export default PieChart;
