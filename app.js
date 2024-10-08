// Generera en 256-bitars (32-byte) slumpmässig nyckel
const keyArray = new Uint8Array(32); // 32 byte = 256 bitar
window.crypto.getRandomValues(keyArray);

// Konvertera till en hex-sträng för att använda med CryptoJS
const secretKey = Array.from(keyArray, (byte) =>
  byte.toString(16).padStart(2, "0")
).join("");

// Personuppgifter att kryptera
const personalData = {
  name: "Fredrik",
  surName: "Hänninen",
  address: "Barnhemsgatan 3",
  postalCode: "506 48",
  city: "Borås",
  birth: "1987-02-27",
  phone: "070 635 87 72",
  email: "hanninenfredrik@gmail.com",
};

// Kryptera varje fält i personuppgifterna
const encryptedData = {};
Object.keys(personalData).forEach((key) => {
  encryptedData[key] = CryptoJS.AES.encrypt(
    personalData[key],
    secretKey
  ).toString();
});

// Dekryptera och visa varje fält på webbsidan
Object.keys(encryptedData).forEach((key) => {
  const decryptedBytes = CryptoJS.AES.decrypt(encryptedData[key], secretKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);

  // Hitta elementet med motsvarande id och fyll i dekrypterad data
  const targetElement = document.getElementById(key);

  if (targetElement) {
    if (key === "phone") {
      const formattedPhone = `+46${decryptedText.replace(/^0/, "").replace(/ /g, "")}`;
      targetElement.innerHTML = `<a href="tel:${formattedPhone}">${decryptedText}</a>`;
    } else if (key === "email") {
      targetElement.innerHTML = `<a href="mailto:${decryptedText}">${decryptedText}</a>`;
    } else if (key === "address") {
      targetElement.outerHTML = `<a href="https://www.hitta.se/kartan!~57.75313,12.94996,14z/tr!i=TJl3cbpC">${decryptedText}<p id="postalCode"></p>
        <p id="city"></p</a>`;
    } else {
      targetElement.textContent = decryptedText;
    }
  }
});

const presentationHeader = document.querySelector("#presentationHeader");
console.log(presentationHeader);
presentationHeader.innerHTML = "<h2>PRESENTATION</h2>";

document.querySelector("#p1").innerHTML =
  "Jag har jobbat inom verkstadsindustrin i 15 år och kan hantera det mesta som kan förväntas på en industri. Det senaste avbrottet jag hade från industrin, var när jag studerade till personaladministratör på Komvux.";

document.querySelector("#p2").innerHTML =
  "<strong>2013-2014</strong> Genom min personaladministratörutbildning lärde jag mig bl.a. projektarbete, vikten av servicekänsla, vad som menas med företagets ansikte utåt, att använda Microsoft Officepaketet till fullo, arbetsrelaterade lagar, vikten av kommunikation (intern, extern), Företagsekonomi, bokföring och mycket mera.";

document.querySelector("#p3").innerHTML =
  "<strong>2010-2022</strong> Under året jag läst på Komvux har jag varit tjänstledig från min anställning på Autotube i Ulricehamn. Arbetsuppgifterna under min tid på företaget har varit bl.a. att köra och programmera robotceller (svets- och hanteringsrobotar), mycket truckkörning både inne och utomhus med bl.a. ledstaplarare och dieseltruck. Svetsning med Mag och Tig, borra, slipa, kapa, fräsa och svarva mm. Administrativa uppgifter så som att stämpla ut jobb och artiklar i ASW, skriva instruktioner till svetsjobb och programbackup mm. Har även genomgått robotutbildning på Motoman hanterings- och svetsrobot i Kalmar.";
