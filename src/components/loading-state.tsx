import { Loader2Icon } from "lucide-react"

interface Props{
  title: string;
  description: string;
};

export const LoadingState = ({ title, description }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Loader2Icon className="animate-spin h-8 w-8 text-gray-500 mb-4" />
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};