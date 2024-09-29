"use client";

import React, { useState, useRef } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import dayjs from "dayjs";
import "dayjs/locale/pt-br"; // Importa o idioma português

dayjs.locale("pt-br"); // Define o idioma para português do Brasil

export default function MonthYearPicker() {
  const [date, setDate] = useState(dayjs());
  const [open, setOpen] = useState(false); // Controla o estado do popover
  const yearSelected = useRef(false); // Ref para controlar se o ano foi selecionado

  const handleDateChange = (newDate) => {
    // Verifica se o usuário está mudando o ano primeiro e marca que o ano foi selecionado
    if (!yearSelected.current) {
      yearSelected.current = true; // Marca que o ano foi selecionado, independente de ser o mesmo ou diferente
      setDate(newDate);
      return;
    }

    // Fecha o popover após selecionar o mês, garantindo que o ano já foi escolhido
    if (yearSelected.current && newDate.month() !== date.month()) {
      setDate(newDate);
      setOpen(false); // Fecha o popover após a mudança de mês
      yearSelected.current = false; // Reseta para permitir novas seleções no futuro
    }

    // Armazena o mês e o ano selecionados para a query
    const selectedMonth = newDate.month() + 1; // `month()` retorna valores de 0 (Janeiro) a 11 (Dezembro)
    const selectedYear = newDate.year();

    // Exemplo de uso do mês e ano selecionados em uma query
    console.log(`Selecionado: ${selectedMonth}/${selectedYear}`);
    // Sua lógica de query vai aqui, por exemplo:
    // fetchData({ month: selectedMonth, year: selectedYear });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <Popover open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setOpen(true)}
          >
            <Calendar className="w-4 h-4" />
            {date.format("MMMM YYYY")}{" "}
            {/* Atualiza o texto com o mês e ano selecionados */}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="p-2 bg-white border border-gray-300 shadow-lg rounded-md"
          align="start"
        >
          <DateCalendar
            views={["year", "month"]} // Exibe apenas ano e mês
            value={date}
            minDate={dayjs().subtract(4, "year").startOf("year")} // Define o início do ano anterior como mínimo
            maxDate={dayjs()} // Define a data máxima como o mês atual
            onChange={handleDateChange} // Fecha o popover após a seleção do mês após o ano
          />
        </PopoverContent>
      </Popover>
    </LocalizationProvider>
  );
}
