import ASCIIText from '@/components/reactbits/ASCIIText/ASCIIText'
import { Button } from '@/components/ui/button'
import { ArrowLeft, LayoutDashboard } from 'lucide-react'
import { useNavigate } from 'react-router';

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <section className="flex justify-end h-full max-h-[500px]">
      <ASCIIText
        text="404"
        enableWaves={true}
        asciiFontSize={8}
        textColor={"#BFDBFE"}
      />
      <div className="flex flex-col gap-2 items-center justify-center h-full w-1/2">
        <div className="flex flex-col gap-2">
          <h1 className="text-7xl font-bold">Oops!</h1>
          <h4 className="text-xl text-gray-600">We couldn&apos;t find the page you were looking for</h4>
          <div className="flex gap-5 z-10">
            <Button variant={'outline'} onClick={() => navigate(-1)} className="cursor-pointer">
              Go Back <ArrowLeft />
            </Button>
            <Button onClick={() => navigate('/')} className="cursor-pointer">
              Dashboard <LayoutDashboard />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NotFound