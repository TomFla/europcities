const form = document.querySelector(".form");
const templet = document.querySelector(".cityLi");
let list = null;

let prefix;

form.addEventListener("submit", e => {
  e.preventDefault();

  const country = form.countries.value.trim();

  if (country === "Poland") {
    prefix = "PL";
  } else if (country === "Deutchland") {
    prefix = "DE";
  } else if (country === "Italy") {
    prefix = "IT";
  } else if (country === "Austria") {
    prefix = "AU";
  }
  // Needs to be change into object in some time :)
  getCountry(prefix);
  form.reset();
  return prefix;
});

const getCountry = async prefix => {
  const ask = `https://api.openaq.org/v1/measurements?country=${prefix}&limit=10&order_by=value&sort=desc&parameter=pm25`;
  const response = await fetch(ask);
  const data = await response.json();

  updateUi(data);
  return data;
};

const updateUi = async data => {
  clearUi(list);

  for (let i = 0; i < data.results.length; i++) {
    const html = document.createElement("li");
    html.innerHTML = `
         
         <div class="templetResult"><h4>${i +
           1}). Miasto: </h4><h4><a href="#" class="upp">${
      data.results[i].city
    }</a></h4><h4>Pomiar stężenia pyłów ${
      data.results[i].parameter
    }: </h4><span>${data.results[i].value.toFixed(2)}</span> <p>µg/m³</p></div)
       `;
    templet.append(html);
  }
  list = document.querySelectorAll("li");
};

const clearUi = () => {
  if (list) {
    list.forEach(item => {
      item.remove();
    });
  }
};

// 1 - ogarnąć API openaq. OK
// 2 - pobrać dane z api i wyświetplić na stronie `${}`. OK
// 3 - pobrać dane do zapytania z inputa do zapytania API. OK
// 4 - wyświetlić dane z API na stronie. OK
// 5 - przetłumaczyć wartość inputa na prefix danego kraju OK
// 6 - stworzyć drugą funkcję z zapytaniem do API mediaWiki.
// 7 - wyświetla dane API mediawiki!
