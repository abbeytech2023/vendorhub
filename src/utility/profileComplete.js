// utils/profile.js
export function checkProfileComplete(vendor) {
  const requiredFields = [
    "fullName",
    "storeName",
    "phone",
    "whatsapp",
    "state",
    "localGovernment",
    "officeAddress",
    "bankName",
    "accountName",
    "accountNumber",
    "nin",
  ];

  const missingFields = requiredFields.filter(
    (field) => !vendor?.[field] || vendor[field].toString().trim() === "",
  );

  return {
    isComplete: missingFields.length === 0,
    missingFields,
  };
}
