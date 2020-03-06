const form = document.querySelector(".form");
const output = document.querySelector(".outputField");

form.addEventListener("submit", e => {
  e.preventDefault();

  const country = form.countries.value;
  getCountry(country);

  return country;
});

// tablica lub obiekt z czterema krajami jako klucze i prefixem jako wartość
// funcja, która sprawdza wartość inputa z tablicą i jeśli dopasuje klucz przypisuje wartość do zmiennej i ją zwraca
// ====================================================================
// const countryPrefix = {
//   Poland: "PL",
//   Italy: "IT",
//   France: "FR"
// };

// const countryToPrefix = country => {
//   console.log(country);
// };
// countryToPrefix(country);

// =====================================================================

const getCountry = async country => {
  const ask = `https://api.openaq.org/v1/measurements?country=${country}&limit=10&order_by=value&sort=desc&parameter=pm25`;
  const response = await fetch(ask);
  const data = await response.json();

  console.log(data);

  updateUi(data);
  return data;
};

const updateUi = async data => {
  for (let i = 0; i < data.results.length; i++) {
    const html = document.createElement("li.list");
    html.innerHTML = `
         
         <div class="templetResult"><h4>${i +
           1}). Miasto: </h4><h4><a href="#" class="upp">${
      data.results[i].city
    }</a></h4><h4>Pomiar stężenia pyłów ${
      data.results[i].parameter
    }: </h4><span>${data.results[i].value.toFixed(2)}</span> <p>µg/m³</p></div)
       `;
    output.append(html);
  }
};

// 1 - ogarnąć API openaq. OK
// 2 - pobrać dane z api i wyświetplić na stronie `${}`. OK
// 3 - pobrać dane do zapytania z inputa do zapytania API. OK
// 4 - wyświetlić dane z API na stronie. OK
// 5 - przetłumaczyć wartość inputa na prefix danego kraju
// 6 - stworzyć drugą funkcję z zapytaniem do API mediaWiki.
// 7 - wyświetla dane API mediawiki!
