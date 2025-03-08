import { createContext, useContext, useState } from "react";

const SalesContext = createContext();

export const SalesProvider = ({ children }) => {
  const [invoices, setInvoices] = useState([]);

  const addInvoice = (invoice) => {
    setInvoices([...invoices, invoice])
  }

  return (
    <SalesContext.Provider value={{ invoices, addInvoice }}>
      {children}
    </SalesContext.Provider>
  )
}

export const useSales = () => useContext(SalesContext)