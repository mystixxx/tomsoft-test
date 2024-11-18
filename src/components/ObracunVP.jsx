import { useState } from "react";
import { useWarehouses } from "../hooks/useWarehouses";
import { useTurnover } from "../hooks/useTurnover";
import {
  Table,
  Dropdown,
  Calendar,
  Button,
  LoadingSpinner,
  Chart,
  PieChart,
  NoResults,
} from "./common";

const TABLE_HEADERS = ["Način plaćanja", "Iznos"];

const ObracunVP = () => {
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isSearchEnabled, setIsSearchEnabled] = useState(false);

  const { data: warehouses, isLoading: isLoadingWarehouses } = useWarehouses();
  const {
    data: turnoverPayments,
    isLoading: isLoadingTurnover,
    error: turnoverError,
    refetch: refetchTurnover,
  } = useTurnover(
    "payments",
    { selectedWarehouse, startDate, endDate },
    isSearchEnabled
  );

  const handleProceed = () => {
    if (!selectedWarehouse || !startDate) {
      alert("Molimo popunite obavezna polja");
      return;
    }
    setIsSearchEnabled(true);
    refetchTurnover();
  };

  if (isLoadingWarehouses) {
    return <LoadingSpinner />;
  }

  if (turnoverError) {
    return (
      <NoResults
        title="Greška pri dohvaćanju podataka"
        message={turnoverError.message || "Molimo pokušajte ponovno kasnije"}
      />
    );
  }

  const renderRow = (payment) => (
    <>
      <td className="py-4 px-4 text-white font-medium">{payment.naziv}</td>
      <td className="py-4 px-4 text-white font-medium">
        {payment.iznos.toLocaleString("hr-HR", {
          style: "currency",
          currency: "EUR",
        })}
      </td>
    </>
  );

  return (
    <div>
      <div className="flex lg:flex-row flex-col gap-6 mb-6">
        <div>
          <label className="block mb-2 text-white">
            Odaberi skladište
            <span className="text-red-500 ml-1">*</span>
          </label>
          <Dropdown
            options={warehouses}
            value={selectedWarehouse}
            onChange={setSelectedWarehouse}
            placeholder="Odaberi skladište..."
            label="Odaberi skladište"
            required
            className="w-64"
          />
        </div>
        <Calendar
          selected={startDate}
          onChange={setStartDate}
          placeholder="Odaberi početni datum"
          label="Početni datum"
          required
          className="w-64"
        />
        <Calendar
          selected={endDate}
          onChange={setEndDate}
          placeholder="Odaberi završni datum"
          label="Završni datum"
          className="w-64"
        />
      </div>

      <Button
        onClick={handleProceed}
        label="Pretraži"
        disabled={!selectedWarehouse || !startDate}
        loading={isLoadingTurnover}
      />

      {turnoverPayments?.length > 0 ? (
        <>
          <Table
            title="Promet po načinu plaćanja"
            headers={TABLE_HEADERS}
            data={turnoverPayments}
            renderRow={renderRow}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Chart
              data={turnoverPayments}
              title="Grafički prikaz prometa po načinu plaćanja"
              xAxisKey="naziv"
              yAxisKey="iznos"
              colors={["#A9DFD8"]}
            />
            <PieChart
              data={turnoverPayments}
              title="Udio načina plaćanja"
              labelKey="naziv"
              valueKey="iznos"
              colors={["#A9DFD8", "#7CABA6", "#5E8480", "#475F5C", "#2C3533"]}
            />
          </div>
        </>
      ) : (
        <NoResults
          title="Nema podataka za prikaz"
          message="Odaberite skladište i datum za prikaz podataka"
        />
      )}
    </div>
  );
};

export default ObracunVP;
