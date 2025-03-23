/* eslint-disable react/prop-types */
import { formatMoney } from '@/lib/formatMoney';
import React from 'react'

const MedicineCard = 
({ 
  editable,
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

  const statusColor = 
    editedValues.status === "in stock"
      ? "bg-green-200 text-green-600"
      : status === "low stock"
      ? "bg-yellow-200 text-yellow-600"
      : status === "expiring"
      ? "bg-orange-200 text-orange-600"
      : "bg-red-200 text-red-600";

  return (
    <div className="rounded-lg flex flex-col gap-2">
      <img src={`https://placehold.co/350x200?text=${editedValues.medicine}`} />
      <div className="flex justify-between items-start">
        <span className="">
          <h1 className="leading-none text-2xl font-medium">
            {editedValues.medicine}
          </h1>
          <p className="leading-none text-gray-600">{editedValues.batch}</p>
        </span>
        <div className="">
          <div className={`flex items-center gap-2 h-5.5 px-3 rounded ${statusColor}`}>
            <div className="size-3 rounded-full bg-current"></div>
            <p className="text-sm">{editedValues.status}</p>
          </div>
          <p className="text-gray-600 flex justify-end gap-1">
            <p className="underline">{editedValues.quantity}</p>
            in stock
          </p>
        </div>
      </div>
      <div className="w-full h-px bg-gray-400"></div>
      <div className="flex flex-wrap gap-8 items-center">
        <span className="flex flex-col leading-none">
          Category: 
          <span className="font-medium text-gray-600">{editedValues.category}</span>
        </span>
        <span className="flex flex-col leading-none">
          Price per unit: 
          <span className="font-medium text-gray-600">{formatMoney(editedValues.unitPrice)}</span>
        </span>
        <span className="flex flex-col leading-none">
          Expiring at: 
          <span className="font-medium text-gray-600">{editedValues.expiryDate}</span>
        </span>
        <span className="flex flex-col leading-none">
          Purchased at: 
          <span className="font-medium text-gray-600">{editedValues.purchaseDate}</span>
        </span>
      </div>
      <div className="">

      </div>
    </div>
  );
}

export default MedicineCard