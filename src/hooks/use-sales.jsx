import { createContext, useContext, useEffect, useState } from "react";

const SalesContext = createContext();

export const SalesProvider = ({ children }) => {
  const [invoices, setInvoices] = useState(() => {
    const saved = localStorage.getItem("invoices")
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("invoices", JSON.stringify(invoices))
  }, [invoices])


  const addInvoice = (invoice) => {
    setInvoices([...invoices, invoice])
  }

  const editInvoice = (invoiceId, updatedData) => {
    setInvoices((prevInvoices) =>
      prevInvoices.map((invoice) =>
        invoice.invoiceId === invoiceId
          ? {
              ...invoice,
              customer: updatedData.customer,
              paymentType: updatedData.paymentType,
              date: new Date(updatedData.date).toISOString(),
              dueDate: new Date(updatedData.dueDate).toISOString(),
              medicines: updatedData.medicines,
              netTotal: updatedData.medicines.reduce(
                (acc, med) => acc + med.totalPrice,
                0
              ),
              paidAmount: updatedData.paidAmount,
              status:
                updatedData.paidAmount >= updatedData.netTotal
                  ? "paid"
                  : "pending",
              change: updatedData.paidAmount,
            }
          : invoice
      )
    );
  }

  return (
    <SalesContext.Provider value={{ invoices, addInvoice, editInvoice }}>
      {children}
    </SalesContext.Provider>
  )
}

export const useSales = () => useContext(SalesContext)