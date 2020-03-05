const form = document.querySelector(".form");
const output = document.querySelector(".outputField");

form.addEventListener("submit", e => {
  e.preventDefault();

  const country = form.countries.value;
  getCountry(country);

  return country;
});

const getCountry = async country => {
  const ask = `https://api.openaq.org/v1/measurements?country=${country}&limit=10&order_by=value&sort=desc`;
  const response = await fetch(ask);
  const data = await response.json();

  console.log(country); // <-- zwraca undefine, dlaczego ?:(
  console.log(data);

  updateUi(data);
  return data;
};

const updateUi = async data => {
  for (let i = 0; i < data.results.length; i++) {
    const html = document.createElement("li");
    html.innerHTML = `
         
         <h4>Miasto: <a href="#">${data.results[i].city}</a> Pomiar zanieczyszczenia: <span>${data.results[i].value}</span></h4>
       `;
    output.append(html);
  }
};

// 1 - ogarnąć API openaq. OK
// 2 - pobrać dane z api i wyświetplić na stronie `${}`. OK
// 3 - pobrać dane do zapytania z inputa do zapytania API. OK
// 4 - stworzyć drugą funkcję z zapytaniem do API mediaWiki.
// 5 - wyświetlić dane z API na tronie. OK* wyświetla tylko dane z openaq, trzeba dodtać API mediawiki!
