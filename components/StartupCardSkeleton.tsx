import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";

export const StartupCardSkeleton = () => (
    <>
      {[0, 1, 2, 3, 4].map((index: number) => (
        <li key={cn("skeleton", index)}>
          <Skeleton className="startup-card_skeleton" />
        </li>
      ))}
    </>
  );

export const StartupDetailsSkeleton = () => (
  <div className="space-y-5 mt-10 max-w-4xl mx-auto animate-pulse">
    <div className="h-64 bg-gray-200 rounded-xl" />
    <div className="space-y-3">
      <div className="h-8 bg-gray-200 rounded w-1/3" />
      <div className="h-4 bg-gray-200 rounded w-2/3" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
    </div>
  </div>
);


export const EditorPicksSkeleton = () => (
  <div className="max-w-4xl mx-auto space-y-4">
    <Skeleton className="h-8 w-48" />
    <div className="grid sm:grid-cols-2 gap-5">
      {[1, 2].map((i) => (
        <Skeleton key={`editor-skeleton-${i}`} className="h-[400px] w-full" />
      ))}
    </div>
  </div>
);