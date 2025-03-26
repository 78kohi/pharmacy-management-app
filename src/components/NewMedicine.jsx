import React from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { addYears, format } from 'date-fns'
import { toast } from 'sonner'
import { medicineApi } from '@/lib/api'
import { useNavigate } from 'react-router'

const NewMedicine = () => {
  const [values, setValues] = React.useState({
    medicine: "",
    batch: "",
    category: "",
    quantity: 0,
    unitPrice: 0,
    purchaseDate: new Date(),
    expiryDate: addYears(new Date(), 5),
    status: "in stock",
  })

  const navigate = useNavigate()

  const handleUnitPrice = (e) => {
    let value = e.target.value;
    value = value.replace(/,/g, ".").replace(/\s+/g, "").replace(/^\s*$/, "0").replace(/^0+(\d)/, "$1")

    if(!/^\d*\.?\d*$/.test(value)) return;

    const match = value.match(/^(\d{0,10})?(\.\d{0,2})?/)
    if(match) setValues((prev) => ({ ...prev, unitPrice: match[0] || "" }))
  }

  const handleQuantity = (e) => {
    let value = e.target.value;
    value = value.replace(/,./g, "").replace(/^\s*$/, "0").replace(/^0+(\d)/, "$1")

    if(!/^\d+$/.test(value)) return;

    const match = value.match(/^(\d{0,10})/)
    if(match) setValues((prev) => ({ ...prev, quantity: match[0] || "" }))
  }

  const addMedicine = async () => {
    const toastId = toast.loading("Adding medicine...");
    try {
      let valuesCopy = { ...values };

      if(!values.medicine || !values.category || !values.quantity || !values.unitPrice) {
        toast.error("Please fill in all required fields", { id: toastId });
        return
      }

      const prefix = values.medicine.slice(0, 3).toUpperCase();
      const date = format(new Date(values.purchaseDate), "yyMM");
      const random = Math.floor(Math.random() * 9000) + 1000;
      valuesCopy.batch = `${prefix}-${date}-${random}`;
      setValues((prev) => ({ ...prev, 
        batch: valuesCopy.batch,
        status: values.quantity >= 500 ? "in stock" : values.quantity <= 50 ? "out of stock" : "low stock"
      }))

      const response = await medicineApi.addMedicine(valuesCopy);

      if(response.error) {
        toast.error(response.error, { id: toastId });
        return
      } else {
        toast.success("Medicine added successfully!", { id: toastId });
        new Promise((resolve) => setTimeout(resolve, 1500)).then(() => {
          navigate("/inventory")
          window.location.reload();
        });
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong", { id: toastId });
    }
  }

  return (
    <div className="">
      <h1 className="text-2xl">New Medicine</h1>
      <div className="grid gap-2 mt-4">
        <div className="grid w-full  items-center gap-1.5">
          <Label htmlFor="name">Medicine Name</Label>
          <Input type="text" id="name" placeholder="Medicine Name" 
            value={values.medicine}          
            onChange={(e) => setValues((prev) => ({ ...prev, medicine: e.target.value }))}
          />
        </div>
        <div className="grid w-full  items-center gap-1.5">
          <Label htmlFor="category">Category</Label>
          <Input type="text" id="category" placeholder="Category" 
            value={values.category}          
            onChange={(e) => setValues((prev) => ({ ...prev, category: e.target.value }))}
          />
        </div>
        <div className="grid w-full  items-center gap-1.5">
          <Label htmlFor="quantity">Quantity</Label>
          <Input type="text" id="quantity" placeholder="Quantity" 
            value={values.quantity}          
            onChange={(e) => handleQuantity(e)}
          />
        </div>
        <div className="grid w-full  items-center gap-1.5">
          <Label htmlFor="unitPrice">Unit Price</Label>
          <Input type="text" id="unitPrice" placeholder="Unit Price" 
            value={values.unitPrice}
            onChange={(e) => handleUnitPrice(e)}
          />
        </div>
        <span className="flex justify-between items-center">
          <span className="">
            {values.batch ? <p>{values.batch}</p> : <p className="text-sm">Batch auto generated</p>}
          </span>
          <span className="flex flex-col leading-none">
            <p className="text-sm">Purchase Date</p>
            {format(values.purchaseDate, "dd-MM-yyyy")}
          </span>
          <span className="flex flex-col leading-none">
            <p className="text-sm">Expiry Date</p>
            {format(values.expiryDate, "dd-MM-yyyy")}
          </span>
        </span>
        <div className="grid mt-4 w-full  items-center gap-1.5">
          <Button
          variant="green"
          onClick={() => addMedicine()}
          >
            Add Medicine
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NewMedicine