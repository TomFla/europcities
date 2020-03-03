const getCity = async () => {
  const baseURI =
    "https://api.openaq.org/v1/measurements?country=PL&limit=10&order_by=value&sort=desc";

  const response = await fetch(baseURI);
  const data = await response.json();

  console.log(data);
};
getCity();

// 1 - ogarnąć API openaq.
// 2 - pobrać dane z api i wyświetplić na stronie `${}`.
// 3 - pobrać dane do zapytania z inputa do zapytania API.
// 4 - stworzyć drugą funkcję z zapytaniem do API mediaWiki.
// 5 - wyświetlić dane z API na tronie.
