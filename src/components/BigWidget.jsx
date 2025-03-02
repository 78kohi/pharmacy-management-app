/* eslint-disable react/prop-types */
import { Card, CardContent } from './ui/card'
import { ChevronDown, ChevronRight, PillBottle, Repeat,TrendingUp, TrendingDown } from 'lucide-react'
import { Link } from 'react-router'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Button } from './ui/button';
import { ChartContainer, ChartLegendContent, ChartTooltip, ChartTooltipContent } from './ui/chart';
import { Bar, BarChart, CartesianGrid, Label, Legend, PieChart, Pie, XAxis, YAxis } from 'recharts';
import { formatSuffix } from '@/lib/formatMoney';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const data = {
  expireData: [
    {
      medicineName: "Paracetamol",
      expireDate: "1 Jan 2025",
      daysUntilExpiry: 20,
      quantity: 10
    },
    {
      medicineName: "Paracetamol",
      expireDate: "1 Jan 2025",
      daysUntilExpiry: 20,
      quantity: 10
    },
    {
      medicineName: "Paracetamol",
      expireDate: "1 Jan 2025",
      daysUntilExpiry: 20,
      quantity: 10
    },
    {
      medicineName: "Paracetamol",
      expireDate: "1 Jan 2025",
      daysUntilExpiry: 20,
      quantity: 10
    },
    {
      medicineName: "Paracetamol",
      expireDate: "1 Jan 2025",
      daysUntilExpiry: 20,
      quantity: 10
    },
  ],
  ordersData: [
    {
      medicineName: "Paracetamol",
      batch: "001032501",
      status: "delivered",
      quantity: 30,
      price: `$${18.00}`
    },
    {
      medicineName: "Paracetamol",
      batch: "001032501",
      status: "pending",
      quantity: 30,
      price: `$${18.00}`
    },
    {
      medicineName: "Paracetamol",
      batch: "001032501",
      status: "delivered",
      quantity: 30,
      price: `$${18.00}`
    },
    {
      medicineName: "Paracetamol",
      batch: "001032501",
      status: "cancelled",
      quantity: 30,
      price: `$${18.00}`
    },
    {
      medicineName: "Paracetamol",
      batch: "001032501",
      status: "pending",
      quantity: 30,
      price: `$${18.00}`
    },
  ],
  monthlyProgress: [
    { month: "Jan", sales: 10100, expenses: 6200 },
    { month: "Feb", sales: 8210, expenses: 3200 },
    { month: "Mar", sales: 6810, expenses: 3400 },
    { month: "Apr", sales: 9131, expenses: 5589 },
    { month: "May", sales: 1312, expenses: 1241 },
    { month: "Jun", sales: 1234, expenses: 1248 },
    { month: "Jul", sales: 14144, expenses: 12204 },
    { month: "Aug", sales: 6310, expenses: 5904 },
    { month: "Sep", sales: 8570, expenses: 4883 },
    { month: "Oct", sales: 4884, expenses: 4955 },
    { month: "Nov", sales: 15134, expenses: 12000 },
    { month: "Dec", sales: 9482, expenses: 5315 },
  ],
  todayReport: [
    { label: "sales", amount: 19381, fill: "#2662D9" },
    { label: "expenses", amount: 7823, fill: "#E23670" },
  ]
}

const BigWidget = ({ type, className }) => {
  let content;
  let chartConfig;
  let tableJSX;
  let chartJSX;

  switch (type) {
    case 1:
      content = {
        title: "Expiring List",
        link: "/inventory",
        hasLink: true,
        isTable: true,
      };
      tableJSX = {
        header: (
          <TableRow>
            <TableHead>Medicine name</TableHead>
            <TableHead className="w-[100px]">Expire Date</TableHead>
            <TableHead>Days Until Expiry</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Restock</TableHead>
          </TableRow>
        ),
        body: (
          data.expireData.map((medicine, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{medicine.medicineName}</TableCell>
              <TableCell className="font-medium">{medicine.expireDate}</TableCell>
              <TableCell>{medicine.daysUntilExpiry}</TableCell>
              <TableCell>{medicine.quantity}</TableCell>
              <TableCell>
                <Button size="iconSm" variant="restock" className="rounded-sm">
                  <Repeat />
                </Button>
              </TableCell>
            </TableRow>
          ))
        )
      };
      break;
    case 2:
      content = {
        title: "Recent Orders",
        link: "/sales",
        hasLink: true,
        isTable: true,
      };
      tableJSX = {
        header: (
          <TableRow>
            <TableHead>Medicine name</TableHead>
            <TableHead className="w-[100px]">Batch</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead className="text-right">Price</TableHead>
          </TableRow>
        ),
        body: (
          data.ordersData.map((medicine, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{medicine.medicineName}</TableCell>
              <TableCell className="font-medium">{medicine.batch}</TableCell>
              <TableCell>
                <div className={`${medicine.status === 'delivered' ? 'bg-green-100 text-green-500' : medicine.status === 'pending' ? 'bg-yellow-100/90 text-yellow-500' : 'bg-red-100/90 text-red-500'} rounded px-2 py-0.5 w-fit`}>
                  {medicine.status}
                </div>
              </TableCell>
              <TableCell>{medicine.quantity}</TableCell>
              <TableCell className="text-right">{medicine.price}</TableCell>
            </TableRow>
          ))
        )
      };
      break;
    case 3:
      content = {
        title: "Monthly Progress",
        hasDropdown: true,
      };
      chartConfig = {
        sales: {
          label: "Sales",
          color: "#2662D9",
        },
        expenses: {
          label: "Expenses",
          color: "#DF356F",
        },
      }
      chartJSX = (
        <BarChart accessibilityLayer data={data.monthlyProgress}>
          <CartesianGrid />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis 
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dashed" />}
          />
          <Bar dataKey="sales" fill="var(--color-sales)" radius={1} />
          <Bar dataKey="expenses" fill="var(--color-expenses)" radius={1} />
        </BarChart>
      )
      break;
    case 4:
      content = {
        title: "Today's Report",
      };
      chartConfig = {
        sales: {
          label: "Sales",
          color: "#2662D9",
        },
        expenses: {
          label: "Expenses",
          color: "#DF356F",
        },
      }
      chartJSX = (
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent nameKey="label" />}
          />
          <Pie 
            data={data.todayReport}
            nameKey="label" 
            dataKey="amount"
            innerRadius={70}
            strokeWidth={5}
            minAngle={90} 
            legendType='square' >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    const profit = data.todayReport[0].amount - data.todayReport[1].amount;
                    const isProfit = profit > 0;
                    
                    return (
                      <foreignObject 
                        x={viewBox.cx - 60} 
                        y={viewBox.cy - 40} 
                        width={120} 
                        height={80}
                      >
                        <div className="flex flex-col items-center justify-center h-full">
                          <div className={`text-3xl font-bold`}>
                            {isProfit ? `+$${formatSuffix(profit)}` : `-$${formatSuffix(Math.abs(profit))}`}
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            {isProfit ? (
                              <>
                                Profit <TrendingUp className="h-4 w-4" />
                              </>
                            ) : (
                              <>
                                Loss <TrendingDown className="h-4 w-4" />
                              </>
                            )}
                          </div>
                        </div>
                      </foreignObject>
                    );
                  }
                }}
              />
          </Pie>
          <Legend 
            width={120}
            verticalAlign='middle' layout="vertical" align="right" 
            content={<ChartLegendContent />} />
        </PieChart>
      )
      break;
    default:
      content = {
        title: "Unknown",
        link: "/",
        icon: <PillBottle className="text-white/95" />,
        bgColor: "bg-gray-500"
      };
      tableJSX = [];
      break;
  }

  return (
    <Card className={`w-full gap-3 rounded-md ${className}`}>
      <CardContent className="flex flex-1 flex-col gap-3 p-2.5">
        <div className="flex justify-between">
          <h1 className="font-medium text-lg">{content.title}</h1>
          {content.hasLink ? (
          <div className="flex gap-2 cursor-pointer">
            <p className="text-blue-500">See All</p>
            <div className="bg-gray-100 rounded-xs">
              <ChevronRight />
            </div>
          </div>
          ) : content.hasDropdown ? (
            <Select defaultValue="monthly-progress">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Monthly Progress" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly-progress">Monthly Progress</SelectItem>
                <SelectItem value="daily-progress">Daily Progress</SelectItem>
              </SelectContent>
            </Select>
          ) : null}
        </div>
        {content.isTable ? (
        <Table>
          <TableHeader>
            {tableJSX.header}
          </TableHeader>
          <TableBody>
            {tableJSX.body}
          </TableBody>
        </Table>) : (
          <ChartContainer config={chartConfig} className={'h-full'}>
            {chartJSX}
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}

export default BigWidget