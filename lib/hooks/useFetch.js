const useFetch = async (url, method, body = null) => {
  const headers = {};
  if (body) headers["content-type"] = "application/json";

  const res = await global.fetch(url, {
    body: body ? JSON.stringify(body) : null,
    method,
    headers,
  });

  return res.json();
};

export default useFetch;
