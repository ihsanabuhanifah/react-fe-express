

export default function ErrorMessage({children}) {
  return (
    <p className="italic text-red-200 font-bold">
      {children}
    </p>
  );
}
