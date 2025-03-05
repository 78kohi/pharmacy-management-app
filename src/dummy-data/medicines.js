export const medicines = [
  { value: "paracetamol", label: "Paracetamol" },
  { value: "ibuprofen", label: "Ibuprofen" },
  { value: "amoxicillin", label: "Amoxicillin" },
  { value: "cetirizine", label: "Cetirizine" },
  { value: "metformin", label: "Metformin" },
  { value: "atorvastatin", label: "Atorvastatin" },
  { value: "omeprazole", label: "Omeprazole" },
  { value: "losartan", label: "Losartan" },
  { value: "aspirin", label: "Aspirin" },
  { value: "furosemide", label: "Furosemide" },
];

export const tableData = [
  {
    batch: "20230101-001",
    medicine: "Paracetamol",
    category: "Pain Relief",
    purchaseDate: "2023-01-01",
    expiryDate: "2025-10-01",
    quantity: 316,
    unitPrice: 0.50,
    status: "in stock",
  },
  {
    batch: "20230201-002",
    medicine: "Ibuprofen",
    category: "Pain Relief",
    purchaseDate: "2023-02-01",
    expiryDate: "2025-02-01",
    quantity: 242,
    unitPrice: 0.60,
    status: "in stock",
  },
  {
    batch: "20230301-003",
    medicine: "Amoxicillin",
    category: "Antibiotics",
    purchaseDate: "2023-03-01",
    expiryDate: "2025-03-01",
    quantity: 837,
    unitPrice: 1.00,
    status: "low stock",
  },
  {
    batch: "20230401-004",
    medicine: "Cetirizine",
    category: "Antihistamines",
    purchaseDate: "2023-04-01",
    expiryDate: "2025-04-01",
    quantity: 874,
    unitPrice: 0.40,
    status: "in stock",
  },
  {
    batch: "20230501-005",
    medicine: "Metformin",
    category: "Diabetes",
    purchaseDate: "2023-05-01",
    expiryDate: "2025-05-01",
    quantity: 721,
    unitPrice: 0.30,
    status: "expired",
  },
  {
    batch: "20230601-006",
    medicine: "Atorvastatin",
    category: "Cholesterol",
    purchaseDate: "2023-06-01",
    expiryDate: "2025-06-01",
    quantity: 500,
    unitPrice: 0.70,
    status: "in stock",
  },
  {
    batch: "20230701-007",
    medicine: "Omeprazole",
    category: "Acid Reflux",
    purchaseDate: "2023-07-01",
    expiryDate: "2025-07-01",
    quantity: 300,
    unitPrice: 0.55,
    status: "in stock",
  },
  {
    batch: "20230801-008",
    medicine: "Losartan",
    category: "Blood Pressure",
    purchaseDate: "2023-08-01",
    expiryDate: "2025-08-01",
    quantity: 450,
    unitPrice: 0.65,
    status: "low stock",
  },
  {
    batch: "20230901-009",
    medicine: "Aspirin",
    category: "Pain Relief",
    purchaseDate: "2023-09-01",
    expiryDate: "2025-09-01",
    quantity: 600,
    unitPrice: 0.20,
    status: "in stock",
  },
  {
    batch: "20231001-010",
    medicine: "Furosemide",
    category: "Diuretics",
    purchaseDate: "2023-10-01",
    expiryDate: "2025-10-01",
    quantity: 350,
    unitPrice: 0.45,
    status: "expired",
  },
].map(item => {
  const today = new Date();
  const expiryDate = new Date(item.expiryDate);
  const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
  
  let status;
  if (daysUntilExpiry < 0) {
    status = "expired";
  } else if (daysUntilExpiry <= 30) {
    status = "expiring";
  } else if (item.quantity >= 500) {
    status = "in stock";
  } else if (item.quantity <= 50) {
    status = "out of stock";
  } else {
    status = "low stock";
  }

  return {
    ...item,
    daysUntilExpiry,
    status
  };
});
