export default function Spinner() {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`animate-spin rounded-full border-4 border-t-transparent border-blue-600 h-[48px] w-[48px]`}
      />
    </div>
  );
}
