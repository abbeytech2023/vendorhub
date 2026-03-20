import { nigeriaData } from "../utility/stateLocalGovt";

export default function LocalGovtSelect({ register, selectedState }) {
  const localGovts = selectedState ? nigeriaData[selectedState] : [];

  return (
    <div className="flex flex-col gap-2 w-full">
      <select
        disabled={!selectedState}
        className={`w-full px-4 py-3 border rounded-lg outline-none transition
        ${
          selectedState
            ? "border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            : "border-gray-200 bg-gray-100 cursor-not-allowed"
        }`}
        {...register("localGovernment", {
          required: "Please select a local government",
        })}
      >
        <option value="">
          {selectedState
            ? "Select your local government"
            : "Select state first"}
        </option>

        {localGovts.map((lga) => (
          <option key={lga} value={lga}>
            {lga}
          </option>
        ))}
      </select>
    </div>
  );
}
