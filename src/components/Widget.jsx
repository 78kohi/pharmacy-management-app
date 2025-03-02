import { Card, CardContent, CardFooter } from './ui/card'
import { Package2, PillBottle, ShoppingBasket, WalletMinimal } from 'lucide-react'
import { Link } from 'react-router'

const Widget = ({ type }) => {
  let content;

  switch (type) {
    case 1:
      content = {
        title: "Total Medicines",
        value: 120,
        link: "/inventory",
        icon: <PillBottle className="text-white/95" />,
        bgColor: "bg-fuchsia-500"
      };
      break;
    case 2:
      content = {
        title: "Total Sales",
        value: 300,
        link: "/sales",
        icon: <ShoppingBasket className="text-white/95" />,
        bgColor: "bg-green-500"
      };
      break;
    case 3:
      content = {
        title: "Total Profit",
        value: `$${150}`,
        link: "/orders",
        icon: <WalletMinimal className="text-white/95" />,
        bgColor: "bg-blue-500"
      };
      break;
    case 4:
      content = {
        title: "Out Of Stock",
        value: 20,
        link: "/inventory",
        icon: <Package2 className="text-white/95" />,
        bgColor: "bg-yellow-500"
      };
      break;
    default:
      content = {
        title: "Unknown",
        value: 0,
        link: "/",
        icon: <PillBottle className="text-white/95" />,
        bgColor: "bg-gray-500"
      };
      break;
  }

  return (
    <Card className="w-full gap-3 rounded-md">
      <CardContent>
        <div className="flex items-center gap-3 py-2">
          <div className={`grid place-items-center ${content.bgColor} size-10 rounded-lg`}>
            {content.icon}
          </div>
          <div className="flex flex-col">
            <h1 className="font-medium text-sm">{content.title}</h1>
            <p className="font-bold text-2xl leading-none">{content.value}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pb-2">
        <Link to={content.link} className="text-blue-500 hover:underline underline-offset-4">View details</Link>
      </CardFooter>
    </Card>
  )
}

export default Widget