import { useState } from "react";
import { useWarehouses } from "../hooks/useWarehouses";
import { useTurnover } from "../hooks/useTurnover";
import {
  Table,
  Dropdown,
  Calendar,
  Button,
  LoadingSpinner,
  Status,
  PieChart,
  NoResults,
} from "./common";

const TABLE_HEADERS = ["ID", "Naziv", "Kolicina", "Iznos", "Usluga"];

const ObracunART = () => {
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isSearchEnabled, setIsSearchEnabled] = useState(false);

  const { data: warehouses, isLoading: isLoadingWarehouses } = useWarehouses();
  const {
    data: turnoverArticles,
    isLoading: isLoadingTurnover,
    error: turnoverError,
    refetch: refetchTurnover,
  } = useTurnover(
    "articles",
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

  const renderRow = (article) => (
    <>
      <td className="py-4 px-4 text-white font-medium">{article.artikl_uid}</td>
      <td className="py-4 px-4 text-white font-medium">
        {article.naziv_artikla}
      </td>
      <td className="py-4 px-4 text-white font-medium">{article.kolicina}</td>
      <td className="py-4 px-4 text-white font-medium">
        {article.iznos.toLocaleString("hr-HR", {
          style: "currency",
          currency: "EUR",
        })}
      </td>
      <td className="py-4 px-4">
        <Status isActive={article.usluga === "D"} />
      </td>
    </>
  );

  return (
    <div>
      <div className="flex lg:flex-row flex-col gap-6 mb-6">
        <div>
          {" "}
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

      {turnoverArticles?.length > 0 ? (
        <>
          <Table
            title="Promet po artiklima"
            headers={TABLE_HEADERS}
            data={turnoverArticles}
            renderRow={renderRow}
          />
          <PieChart
            data={[
              {
                naziv: "Usluge",
                iznos: turnoverArticles.filter((item) => item.usluga === "D").length,
                percentage: (turnoverArticles.filter((item) => item.usluga === "D").length / turnoverArticles.length * 100).toFixed(1)
              },
              {
                naziv: "Proizvodi",
                iznos: turnoverArticles.filter((item) => item.usluga === "N").length,
                percentage: (turnoverArticles.filter((item) => item.usluga === "N").length / turnoverArticles.length * 100).toFixed(1)
              },
            ]}
            title="Omjer usluga i proizvoda"
            labelKey="naziv"
            valueKey="iznos"
            colors={["#A9DFD8", "#7C7EDD"]}
            tooltipFormatter={(value, item) => `${item.percentage}%`}
          />
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

export default ObracunART;
