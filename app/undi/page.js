import PlaceLists from "./placelists";

export const revalidate = 0; 
async function getData() {
  const res = await fetch(process.env.URL + "/api/tempat", {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  return data;
}
export default async function Undi() {
  const tempat = await getData();

  return (
    <div>
      <PlaceLists tempat={tempat} />
    </div>
  );
}
