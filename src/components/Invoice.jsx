/* eslint-disable react/prop-types */
import React from "react";
import { Separator } from "./ui/separator";
import { format } from "date-fns";
import { Banknote, CreditCard, Info, Landmark, Minus, Plus, QrCode, SquarePen, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { CustomersComboBox } from "./combo-box";
import { Input } from "./ui/input";
import { SingleCalendar } from "./ui/single-calendar";
import { CalendarDatePicker } from "./calendar-date-picker";
import { DatePicker } from "./date-picker";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "./ui/sheet";

import {tableData as medicinesData } from "@/dummy-data/medicines";
import { calculateLateFee, formatMoney } from "@/lib/formatMoney";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Invoice = ({
invoiceId,
date,
  dueDate,
  customer,
  medicines,
  paymentType,
  paidAmount,
editable,
onSave,
}) => {
  const [editedValues, setEditedValues] = React.useState({
    customer,
    paymentType,
    medicines,
    paidAmount,
    date: new Date(date),
    dueDate: new Date(dueDate),
  });
  const [editPaidAmount, setEditPaidAmount] = React.useState(false);
  console.log(editedValues.medicines)

  const totalPrice = editedValues.medicines.reduce((acc, med) => acc + med.totalPrice, 0)
  const netTotal = totalPrice + calculateLateFee(editedValues.date, editedValues.dueDate);

  const isPaid = editedValues.paidAmount >= netTotal;
  const change = isPaid ? formatMoney(editedValues.paidAmount - netTotal) : "not paid";
  
  const addToInvoice = (medicine) => {
    setEditedValues((prev) => {
      const existingMedicine = prev.medicines.find(
        (med) => med.medicine === medicine.medicine
      );

      if(existingMedicine){
        return {
          ...prev,
          medicines: prev.medicines.map((med) =>
            med.medicine === medicine.medicine
              ? {
                  ...med,
                  quantity: med.quantity + 1,
                  totalPrice: (med.quantity + 1) * med.unitPrice,
                }
              : med
          ),
        };
      } else {
        return {
          ...prev,
          medicines: [...prev.medicines, { ...medicine, quantity: 1, totalPrice: medicine.unitPrice }],
        }
      }
    });
  }

  const removeFromInvoice = (medicine) => {
    if (!medicine) return;
    if (!editedValues.medicines.length) return;

    setEditedValues(prev => ({
      ...prev,
      medicines: prev.medicines.map((med) =>
        med.medicine === medicine.medicine
          ? {
              ...med,
              quantity: med.quantity - 1,
              totalPrice: (med.quantity - 1) * med.unitPrice,
            }
          : med
      ).filter((med) => med.quantity > 0)
    }))
  }

  const clearFromInvoice = (medicine) => {
    if (!medicine) return;
    if (!editedValues.medicines.length) return;

    setEditedValues(prev => ({
      ...prev,
      medicines: prev.medicines.filter((med) => med.medicine !== medicine.medicine)
    }))
  }

  const handlePaidAmountChange = (e) => {
    let value = e.target.value;
    value = value.replace(/,/g, ".").replace(/\s+/g, "").replace(/^\s*$/, "0").replace(/^0+(\d)/, "$1")

    if(!/^\d*\.?\d*$/.test(value)) return;

    const match = value.match(/^(\d{0,10})?(\.\d{0,2})?/)
    if(match) setEditedValues((prev) => ({ ...prev, paidAmount: match[0] || "" }))
  }

  const paymentTypeIcon = 
    editedValues.paymentType === 'card' ?
    <CreditCard className="size-4" /> :
    editedValues.paymentType === 'cash' ?
    <Banknote className="size-4" /> :
    editedValues.paymentType === 'qr payment' ?
    <QrCode className="size-4" /> :
    <Landmark className="size-4" />
  
  const avatarJSX = (
    <Avatar className="size-6">
      <AvatarImage src={`https://avatar.iran.liara.run/public/?username=${editedValues.customer}`} alt="avatar" />
      <AvatarFallback>AV</AvatarFallback>
    </Avatar>
  );

  return (
    <div className="flex flex-col rounded bg-white flex-2 h-130 w-full p-2">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl">Overview</h1>
          <p className="text-muted-foreground leading-none">
            Invoice {invoiceId}
          </p>
        </div>
        <span className="flex items-center gap-2">
          {editable ? (
            <DatePicker
              date={editedValues.date}
              onDateSelect={(value) => {
                setEditedValues((prev) => ({ ...prev, date: value }));
              }}
            />
          ) : (
            <p className="text-muted-foreground">{`${format(
              editedValues.date,
              "PPPp"
            )}`}</p>
          )}
        </span>
      </div>
      <div className="pt-5 flex justify-between">
        <p className="text-muted-foreground text-sm">Medicine Name</p>
        <p className="text-muted-foreground text-sm">Quantity</p>
        <p className="text-muted-foreground text-sm">Total price</p>
      </div>
      <Separator className="my-2" />
      <div className="flex flex-col gap-1 max-h-[150px] overflow-y-scroll">
        {editedValues.medicines.length
          ? editedValues.medicines.map((med) => {
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
                  <p className="flex-1 flex items-center gap-2">
                    {editable && (
                      <Plus
                        className="h-4 w-4 text-gray-800 hover:bg-black/20 rounded-full transition"
                        onClick={() => addToInvoice(med)}
                      />
                    )}
                    {med.quantity}
                    {editable && (
                      <Minus
                        className="h-4 w-4 text-gray-800 hover:bg-black/20 rounded-full transition"
                        onClick={() => removeFromInvoice(med)}
                      />
                    )}
                  </p>
                  <p className="flex-1 flex justify-end items-center gap-1">
                    {formatted}
                    {editable && (
                      <X
                        className="h-4 w-4 hover:bg-black/20 rounded-full transition text-muted-foreground"
                        onClick={() => clearFromInvoice(med)}
                      />
                    )}
                  </p>
                </div>
              );
            })
          : null}
      </div>
      <Separator className="text-lg mt-2" />
      {editable && <Sheet>
        <SheetTrigger className="mt-2 mx-auto flex items-center text-muted-foreground hover:text-black/90 cursor-pointer transition gap-2">
          <Plus className="size-4" />
          <p className="text-sm select-none">Add medicine</p>
        </SheetTrigger>
        <SheetContent side="left" className="w-[330px]">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-4 p-4 bg-white flex-4 overflow-y-scroll">
            {medicinesData.map((medicine) => {
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
                      <p className="text-sm leading-none">
                        {medicine.medicine}
                      </p>
                      <p className="text-sm text-muted-foreground leading-none">
                        {formatted}
                      </p>
                    </div>
                    <Plus
                      className="h-5 w-5 bg-white rounded-full hover:bg-black/20 transition"
                      onClick={() => addToInvoice(medicine)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>}
      <div className="flex flex-col mt-auto">
        <h1 className="">Payment</h1>
        <Separator className="my-2" />
        <div className="flex justify-end px-1">
          <div className="text-sm flex flex-col gap-1">
            <span className="flex justify-between items-center min-w-70">
              Total:
              <p className="">
                {formatMoney(totalPrice)}
              </p>
            </span>
            <span className="flex justify-between items-center min-w-70">
              Net Total:
              <p className="">
                {formatMoney(netTotal)}
              </p>
            </span>
            <span className="flex justify-between items-center min-w-70">
              Paid Amount:
              <Label className="group flex items-center gap-1">
                <SquarePen className={`h-3 w-3 text-gray-800 opacity-0 ${editable ? 'group-hover:opacity-100' : ''} transition`} />
                {editable ? 
                editPaidAmount ? 
               ( <Input
                  type={"text"}
                  className="text-right w-15 h-fit text-sm"
                  value={editedValues.paidAmount}
                  onChange={handlePaidAmountChange}
                  onBlur={(e) => {
                    setEditPaidAmount(false);
                    setEditedValues((prev) => ({ ...prev, paidAmount: parseFloat(e.target.value) }))
                  }}
                  noBorder required />) :
                (<p className="group-hover:text-black/90" onClick={() => setEditPaidAmount(true)}>
                  {formatMoney(editedValues.paidAmount)}
                </p>) :
                (<p>
                  {formatMoney(editedValues.paidAmount)}
                </p>)
                }
              </Label>
            </span>
            <span className="flex justify-between items-center min-w-70">
              Change:
              <p className="capitalize">{change}</p>
            </span>
            <span className="flex justify-between items-center min-w-70">
              Due Date:
              <p className="">{format(dueDate, "PPP")}</p>
            </span>
            <span className="flex justify-between items-center min-w-70">
              <span className="flex items-center gap-2">
                Late fee:
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="size-3.5 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>$2.00 late fee per day</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </span>
              <p className="">
                {formatMoney(
                  calculateLateFee(editedValues.date, editedValues.dueDate)
                )}
              </p>
            </span>
            <span className="flex justify-between items-center min-w-70">
              Customer:
              <span className={`flex items-center ${editable ? "" : "gap-2"}`}>
              {editable ? (
                <CustomersComboBox
                width={"100"}
                variant="ghost"
                value={editedValues.customer}
                setValue={(value) =>
                  setEditedValues((prev) => ({ ...prev, customer: value }))
                }
                avatar={avatarJSX}
                />
              ) : (
                <>
                <Avatar className="size-6">
                  <AvatarImage src="https://avatar.iran.liara.run/public" alt="avatar" />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
                <p className="capitalize">{customer}</p>
                </>
              )}
              </span>
            </span>
            <span className="flex justify-between items-center min-w-70">
              Payment Type:
              <span className={`flex items-center ${editable ? "" : "gap-2"}`}>
              {editable ? (
                <Select
                value={editedValues.paymentType}
                onValueChange={(value) =>
                    setEditedValues((prev) => ({ ...prev, paymentType: value }))
                  }
                >
                  <SelectTrigger className="max-w-35 h-8 hover:bg-accent" noBorder>
                    {paymentTypeIcon}
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="card">Card</SelectItem>
                    <SelectItem value="qr payment">QR Payment</SelectItem>
                    <SelectItem value="bank transfer">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <>
                {paymentTypeIcon}
                <p className="capitalize">{paymentType}</p>
                </>
              )}
            </span>
            </span>
          </div>
        </div>
      </div>
      <div className="mt-2">
        {editable && (
          <Button
            onClick={() => onSave(editedValues)}
            className="w-full"
            variant="green"
          >
            Save
          </Button>
        )}
      </div>
    </div>
  );
};

export default Invoice;
