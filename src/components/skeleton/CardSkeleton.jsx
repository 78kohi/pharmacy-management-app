import { Skeleton } from "../ui/skeleton";

const CardSkeleton = () => {
  return (
    <div>
      <div className="w-[120px] h-[150px] rounded bg-[#F6F6F6]">
        <Skeleton className="h-[105px] w-[120px] rounded-xs" />
        <div className="flex justify-between items-center px-2 mt-2">
          <div className="flex flex-col gap-1">
            <Skeleton className="w-16 h-3 rounded-sm" />
            <Skeleton className="w-7 h-3 rounded-sm" />
          </div>
          <Skeleton className="size-5 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
