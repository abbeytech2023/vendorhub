function FormRow({ children, label, error, hidden }) {
  return (
    <div className={hidden ? "hidden" : "flex flex-col gap-2 mb-5 w-full"}>
      {label && (
        <label
          htmlFor={children.props?.id}
          className="text-sm font-semibold text-gray-700"
        >
          {label}
        </label>
      )}

      <div className="relative">{children}</div>

      {error && (
        <span className="text-sm text-red-500 font-medium">{error}</span>
      )}
    </div>
  );
}

export default FormRow;
