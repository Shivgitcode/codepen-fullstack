export const fetchData = async () => {
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/codepen`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (response.ok) {
    const data = await response.json();
    console.log(data);
    return data;
  } else {
    const data = await response.json();
    return data;
  }
};
