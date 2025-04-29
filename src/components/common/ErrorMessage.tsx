import { PrimaryButton } from "./PrimaryButton.tsx";

export const ErrorMessage = ({
  error,
  retryFetch,
}: {
  error: Error;
  retryFetch: () => void;
}) => {
  return (
    <div className="border border-black bg-gray-200 p-4 w-fit">
      <p className="text-black font-bold">Error</p>
      <p className="text-black">{error?.message}</p>
      <PrimaryButton onClick={retryFetch}>Retry</PrimaryButton>
    </div>
  );
};
