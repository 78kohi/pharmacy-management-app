/* eslint-disable react/prop-types */
import { formatMoney } from '@/lib/formatMoney';
import { format } from 'date-fns';
import { Edit, Repeat } from 'lucide-react';
import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Input } from './ui/input';
import { DatePicker } from './date-picker';
import { Button } from './ui/button';
import { medicineApi } from '@/lib/api';
import { toast } from 'sonner';

const MedicineCard = 
({ 
  editable,
  _id,
  batch,
  category,
  expiryDate,
  medicine,
  purchaseDate,
  quantity,
  status,
  unitPrice,
}) => {
  const [editedValues, setEditedValues] = React.useState({
    batch,
    category,
    expiryDate,
    medicine,
    purchaseDate,
    quantity,
    status,
    unitPrice,
  });
  const initialValues = React.useRef({ medicine, purchaseDate });

  const statusColor = 
    editedValues.status === "in stock"
      ? "bg-green-200 text-green-600"
      : status === "low stock"
      ? "bg-yellow-200 text-yellow-600"
      : status === "expiring"
      ? "bg-orange-200 text-orange-600"
      : "bg-red-200 text-red-600";

  const handleUnitPriceChange = (e) => {
    let value = e.target.value;
    value = value.replace(/,/g, ".").replace(/\s+/g, "").replace(/^\s*$/, "0").replace(/^0+(\d)/, "$1")

    if(!/^\d*\.?\d*$/.test(value)) return;

    const match = value.match(/^(\d{0,10})?(\.\d{0,2})?/)
    if(match) setEditedValues((prev) => ({ ...prev, unitPrice: match[0] || "" }))
  }

  const handleSaveChanges = async () => {
    const toastId = toast.loading("Updating...");
    try {
      console.log(editedValues)
      let updatedValues = { ...editedValues }; 

      if (
        initialValues.current.medicine !== editedValues.medicine ||
        initialValues.current.purchaseDate !== editedValues.purchaseDate
      ) {
        const prefix = editedValues.medicine.slice(0, 3).toUpperCase();
        const date = format(new Date(editedValues.purchaseDate), "yyMM");
        const random = Math.floor(Math.random() * 9000) + 1000; 
        updatedValues.batch = `${prefix}-${date}-${random}`;
        setEditedValues((prev) => ({ ...prev, batch: updatedValues.batch }))
      }

      if (
        !editedValues.medicine ||
        !editedValues.batch ||
        !editedValues.category
      ) {
        toast.error("Please fill in all required fields", { id: toastId });
        return;
      }

      const response = await medicineApi.updateMedicine(_id, updatedValues);
      console.log(response)

      if (response.error) {
        throw new Error("failed to update medicine")
      } else {
        toast.success("Medicine updated successfully", { id: toastId });
        await new Promise((resolve) => setTimeout(resolve, 1500)).then(() => {
          window.location.reload();
        });
      }
    } catch (error) {
      toast.error(error.message || 'Something went wrong', { id: toastId });
    }
  }

  return (
    <div className="rounded-lg flex flex-col gap-2">
      <img src={`https://placehold.co/350x200?text=${editedValues.medicine}`} />
      <div className="flex justify-between items-start">
        <span className="">
          {editable ? (
            <span className="flex items-center group relative">
              <Edit className="h-3 w-3 hidden absolute -translate-1/2 top-1/2 -left-2 group-hover:block text-muted-foreground" />
              <Input
                type={"text"}
                className={`!text-2xl h-fit rounded-none font-medium leading-none`}
                value={editedValues.medicine}
                onChange={(e) => {
                  setEditedValues((prev) => ({
                    ...prev,
                    medicine: e.target.value,
                  }));
                }}
                onBlur={(e) => {
                  setEditedValues((prev) => ({
                    ...prev,
                  medicine: e.target.value,
                  }));
                }}
                noBorder
                required
              />
            </span>
          ) : (
            <h1 className="leading-none text-2xl font-medium">
              {editedValues.medicine}
            </h1>
          )}
          {editable ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <p 
                    className="leading-none text-gray-600 hover:text-black"
                  >
                    {editedValues.batch}
                  </p>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Generate batch</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <p className="leading-none text-gray-600">{editedValues.batch}</p>
          )}
        </span>
        <div className="">
          <div
            className={`flex items-center gap-2 h-5.5 px-3 rounded ${statusColor}`}
          >
            <div className="size-3 rounded-full bg-current"></div>
            <p className="text-sm">{editedValues.status}</p>
          </div>
          <p className="text-gray-600 flex items-center justify-end gap-1 group">
            <p className="underline">{editedValues.quantity}</p>
            in stock
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="place-items-center bg-gray-200 hidden group-hover:grid rounded-sm h-4 w-4 cursor-pointer">
                    <Repeat className="h-3 w-3 text-gray-700" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Restock</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </p>
        </div>
      </div>
      <div className="w-full h-px bg-gray-400"></div>
      <div className="flex flex-wrap gap-8 items-center">
        <span className="flex flex-col leading-none">
          Category:
          {editable ? (
            <span className="flex items-center group relative">
              <Input
                type={"text"}
                className="font-medium text-gray-600 hover:text-black max-w-15 h-fit capitalize"
                value={editedValues.category}
                onChange={(e) => {
                  setEditedValues((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }));
                }}
                onBlur={(e) => {
                  setEditedValues((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }));
                }}
                noBorder
                required
              />
              <Edit className="h-3 w-3 hidden absolute -translate-1/2 top-1/2 -left-2 group-hover:block text-muted-foreground" />
            </span>
          ) : (
            <span className="font-medium text-gray-600">
              {editedValues.category}
            </span>
          )}
        </span>
        <span className="flex flex-col leading-none">
          Price per unit:
          {editable ? (
            <span className="flex items-center group relative">
              <Edit className="h-3 w-3 hidden absolute -translate-1/2 top-1/2 -left-2 group-hover:block text-muted-foreground" />
              <span className="font-medium text-gray-600">$</span>
              <Input
                type={"text"}
                className="font-medium text-gray-600 hover:text-black max-w-15 h-fit"
                value={editedValues.unitPrice}
                onChange={(e) => handleUnitPriceChange(e)}
                onBlur={(e) => {
                  setEditedValues((prev) => ({
                    ...prev,
                    unitPrice: e.target.value,
                  }));
                }}
                noBorder
                required
              />
            </span>
          ) : (
            <span className="font-medium text-gray-600">
              {formatMoney(editedValues.unitPrice)}
            </span>
          )}
        </span>
        <span className="flex flex-col leading-none">
          Expiring at:
          {editable ? (
            <DatePicker
              date={editedValues.expiryDate}
              onDateSelect={(value) => {
                setEditedValues((prev) => ({ ...prev, expiryDate: value }));
              }}
              formatStr="dd-MM-yyyy"
            />
          ) : (
            <span className="font-medium text-gray-600">
              {format(editedValues.expiryDate, "dd-MM-yyyy")}
            </span>
          )}
        </span>
        <span className="flex flex-col leading-none">
          Purchased at:
          {editable ? (
            <DatePicker
              date={editedValues.purchaseDate}
              onDateSelect={(value) => {
                setEditedValues((prev) => ({ ...prev, purchaseDate: value }));
              }}
              formatStr="dd-MM-yyyy"
            />
          ) : (
            <span className="font-medium text-gray-600">
              {format(editedValues.purchaseDate, "dd-MM-yyyy")}
            </span>
          )}
        </span>
      </div>
      {editable && 
      <div className="">
        <Button
          variant="green"
          className="w-full mt-2 text-background h-9 rounded-lg"
          onClick={() => handleSaveChanges()}
        >
          Save changes
        </Button>
      </div>}
    </div>
  );
}

export default MedicineCard