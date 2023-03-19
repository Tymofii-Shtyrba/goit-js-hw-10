// export default function fetchCountries(name) {
//   return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name.official,capital,population,languages,flags`).then(r => r.json).finally(console.log);
// }


export default function fetchCountries(name) {
  const URL = `https://restcountries.com/v3.1/name/${name}?fields=flags,name,capital,population,languages`;
  return fetch(URL).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })
}


// https://restcountries.com/v3.1/{service}?fields={field},{field},{field}
// https://restcountries.com/v3.1/all?fields=name,capital,currencies

// name.official - полное имя страны
// capital - столица
// population - население
// flags.svg - ссылка на изображение флага
// languages - массив языков