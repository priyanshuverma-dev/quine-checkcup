export async function GET() {
  const result = await fetch("https://pdp-gx93.onrender.com", {
    cache: "no-store",
  });
  const data = await result.json();

  return Response.json({ datetime: Date.now(), status: data.status });
}
