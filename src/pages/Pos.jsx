import React from "react";
import { categories, tableData as medicines } from "@/dummy-data/medicines";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Search, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { CustomersComboBox } from "@/components/combo-box";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSales } from "@/hooks/use-sales";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { useNavigate } from "react-router";

const Pos = () => {
  const [receiptOpen, setReceiptOpen] = React.useState(false);
  const [addedMedicines, setAddedMedicines] = React.useState([]);
  const { addInvoice, invoices } = useSales()

  const [paymentType, setPaymentType] = React.useState("");
  const [customer, setCustomer] = React.useState("");

  const navigate = useNavigate()

  const now = new Date();
  const dueDate = new Date(now);
  dueDate.setDate(dueDate.getDate() + 7);
  const formattedDate = now.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const formattedTime = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const netTotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(
    parseFloat(addedMedicines.reduce((acc, item) => acc + item.totalPrice, 0))
  );

  const addToReceipt = (medicine) => {
    setReceiptOpen(true);
    setAddedMedicines((prevMedicines) => {
      const existingMedicine = prevMedicines.find(
        (med) => med.medicine === medicine.medicine
      );

      if (existingMedicine) {
        return prevMedicines.map((med) =>
          med.medicine === medicine.medicine
            ? {
                ...med,
                quantity: med.quantity + 1,
                totalPrice: (med.quantity + 1) * med.unitPrice,
              }
            : med
        );
      } else {
        return [
          ...prevMedicines,
          { ...medicine, quantity: 1, totalPrice: medicine.unitPrice },
        ];
      }
    });
  };

  const removeFromReceipt = (medicine) => {
    if (!medicine) return;
    if (!addedMedicines.length) return;

    setAddedMedicines((prevMedicines) => {
      const updatedMedicines = prevMedicines
        .map((med) =>
          med.medicine === medicine.medicine
            ? {
                ...med,
                quantity: med.quantity - 1,
                totalPrice: (med.quantity - 1) * med.unitPrice,
              }
            : med
        )
        .filter((med) => med.quantity > 0);

      if (updatedMedicines.length === 0) {
        setReceiptOpen(false);
      }

      return updatedMedicines;
    });
  };

  const clearFromReceipt = (medicine) => {
    setAddedMedicines((prevMedicines) => {
      if (prevMedicines.length === 1) {
        setReceiptOpen(false);
        return prevMedicines.filter(
          (med) => med.medicine !== medicine.medicine
        );
      }
      return prevMedicines.filter((med) => med.medicine !== medicine.medicine);
    });
  };

  const generateInvoiceId = () => {
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");

    const latestInvoice = invoices
      .filter((inv) => inv.invoiceId.includes(date))
      .sort((a, b) => b.invoiceId.localeCompare(a.invoiceId))[0];

    const nextNumber = latestInvoice
      ? String(Number(latestInvoice.invoiceId.slice(-3)) + 1).padStart(3, "0")
      : "001";

    return `${date}${nextNumber}`;
  };

  const saveInvoice = () => {
    const totalAmount = addedMedicines.reduce(
      (acc, item) => acc + item.totalPrice,
      0
    );

    const newInvoice = {
      invoiceId: generateInvoiceId(),
      date: now.toISOString(),
      dueDate,
      customer: customer,
      netTotal: totalAmount,
      paidAmount: 0,
      change: -totalAmount,
      status: "pending",
      medicines: addedMedicines,
      paymentType,
    };
    addInvoice(newInvoice);
    setReceiptOpen(false);
    setAddedMedicines([]);
    setPaymentType("");
    setCustomer("");
    toast.success(`Invoice ${newInvoice.invoiceId} created successfully!`, {
      action: <Button onClick={() => navigate('/sales')}>View invoices</Button>,
    });
    console.log(newInvoice)
  }

  return (
    <section className="py-2 px-4 h-full bg-[#F6F6F6]">
      <h1 className="text-2xl font-medium mb-4">Point of Sale</h1>
      <div className="flex gap-2 mb-4">
        <div className="relative">
          <Search className="absolute top-1/2 right-2 -translate-1/2 h-4 w-4" />
          <Input placeholder="Search medicine..." className="w-[250px]" />
        </div>
        <Button variant={"green"} onClick={() => setReceiptOpen(true)}>
          <Plus />
          New sale
        </Button>
      </div>
      <div className="flex gap-4">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-4 p-4 bg-white flex-4 max-h-[400px] overflow-y-scroll">
          {medicines.map((medicine) => {
            const formatted = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(parseFloat(medicine.unitPrice));
            return (
              <div
                className="w-30 h-37 rounded bg-[#F6F6F6]"
                key={medicine.batchNumber}
              >
                <img
                  src="https://placehold.co/120x100"
                  alt=""
                  className="h-25 w-30 rounded-t"
                />
                <div className="flex justify-between items-center px-2 pt-1">
                  <div>
                    <p className="text-sm leading-none">{medicine.medicine}</p>
                    <p className="text-sm text-muted-foreground leading-none">
                      {formatted}
                    </p>
                  </div>
                  <Plus
                    className="h-5 w-5 bg-white rounded-full hover:bg-black/20 transition"
                    onClick={() => addToReceipt(medicine)}
                  />
                </div>
              </div>
            );
          })}
        </div>
        {receiptOpen ? (
          <div className="flex flex-col rounded bg-white flex-2 h-105 w-30 p-2">
            <div className="flex justify-between items-center">
              <h1 className="text-xl">Overview</h1>
              <p className="text-muted-foreground">{`${formattedDate} at ${formattedTime}`}</p>
            </div>
            <div className="pt-5 flex justify-between">
              <p className="text-muted-foreground text-sm">Medicine Name</p>
              <p className="text-muted-foreground text-sm">Quantity</p>
              <p className="text-muted-foreground text-sm">Total price</p>
            </div>
            <Separator className="my-2" />
            <div className="flex flex-col gap-1 max-h-[100px] overflow-y-scroll">
              {addedMedicines.length
                ? addedMedicines.map((med) => {
                    const formatted = new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(parseFloat(med.totalPrice));
                    return (
                      <div
                        className="flex justify-between text-sm px-1"
                        key={med.medicine}
                      >
                        <p className="flex-1/5">{med.medicine}</p>
                        <p className="flex-1 flex items-center gap-2 select-none">
                          <Plus
                            className="h-4 w-4 text-gray-800 hover:bg-black/20 rounded-full transition"
                            onClick={() => addToReceipt(med)}
                          />{" "}
                          {med.quantity}{" "}
                          <Minus
                            className="h-4 w-4 text-gray-800 hover:bg-black/20 rounded-full transition"
                            onClick={() => removeFromReceipt(med)}
                          />
                        </p>
                        <p className="flex-1 flex justify-end items-center gap-1">
                          {formatted}{" "}
                          <X
                            className="h-4 w-4 hover:bg-black/20 rounded-full transition text-muted-foreground"
                            onClick={() => clearFromReceipt(med)}
                          />
                        </p>
                      </div>
                    );
                  })
                : null}
            </div>
            <Separator className="text-lg mt-2 mb-5" />
            <div className="flex flex-col mt-auto">
              <h1 className="">Payment</h1>
              <Separator className="my-2" />
              <div className="flex justify-end px-1">
                <div className="text-sm flex flex-col gap-1">
                  <span className="flex justify-between items-center min-w-60">
                    Net Total:
                    <p className="">{netTotal}</p>
                  </span>
                  <span className="flex justify-between items-center min-w-60">
                    Due Date:
                    <p className="">
                      {dueDate.toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </span>
                  <span className="flex justify-between items-center min-w-60">
                    Late fee:
                    <p className="">$5.00</p>
                  </span>
                  <span className="flex justify-between items-center min-w-60">
                    Customer:
                    <CustomersComboBox value={customer} setValue={setCustomer} variant="outline" width={"min-w-30"} />
                  </span>
                  <span className="flex justify-between items-center min-w-60">
                    Payment Type:
                    <Select
                      value={paymentType}
                      onValueChange={setPaymentType}
                    >
                      <SelectTrigger className="min-w-[100px] max-w-[130px] h-8">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="card">Card</SelectItem>
                        <SelectItem value="qrPayment">QR Payment</SelectItem>
                        <SelectItem value="bankTransfer">Bank Transfer</SelectItem>
                      </SelectContent>
                    </Select>
                  </span>
                </div>
              </div>
              <div className="flex gap-3 mt-3 px-3">
                <Button 
                  variant={"secondary"} size={"sm"} className={"flex-1"}
                  onClick={() => {
                    setReceiptOpen(false);
                    setAddedMedicines([]);
                    setPaymentType("");
                    setCustomer("");
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  variant={"green"} size={"sm"} className={"flex-1"}
                  onClick={() => saveInvoice()}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <Toaster richColors />
    </section>
  );
};

export default Pos;