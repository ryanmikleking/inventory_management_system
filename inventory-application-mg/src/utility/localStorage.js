export const LocalDataStore = (newData) => {
  const existingData = JSON.parse(localStorage.getItem("submissions")) || [];

  existingData.push({
    id: crypto.randomUUID(),
    ...newData,
  });

  localStorage.setItem("submissions", JSON.stringify(existingData));
};

export const LocalDataStoreClear = () => {
  localStorage.clear();
};

export const getLocalSubmissions = () => {
  try {
    const raw = localStorage.getItem("submissions");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    // Ensure it's always an array of objects
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch {
    console.error("Failed to parse localStorage data");
    return [];
  }
};
