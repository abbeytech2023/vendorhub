import { nigeriaData } from "../utility/stateLocalGovt";

export default function StateSelect({
  register,
  selectedState,
  setSelectedState,
}) {
  const states = Object.keys(nigeriaData);

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <select
        value={selectedState}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg
        focus:ring-2 focus:ring-green-500 focus:border-green-500
        outline-none transition"
        {...register("state", {
          onChange: handleStateChange,
          required: "Please select a state",
        })}
      >
        <option value="">Select your state</option>

        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>
    </div>
  );
}
