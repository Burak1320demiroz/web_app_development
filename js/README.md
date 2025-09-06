
# JavaScript Notları 

### Konsola Yazdırma

```javascript
console.log("Merhaba JavaScript!");
```

### Değişkenler

```javascript
var a = 10;      // eski kullanım
let b = 20;      // güncel kullanım
const c = 30;    // sabit değer
```

### Veri Türleri

```javascript
let sayi = 5;                // Number
let metin = "Ali";           // String
let dogruMu = true;          // Boolean
let liste = [1, 2, 3];       // Array
let kisi = {ad:"Ayşe"};      // Object
let bos = null;              // Null
let tanimsiz;                // Undefined
```

### Operatörler

```javascript
let x = 10, y = 3;
console.log(x + y); // Toplama
console.log(x - y); // Çıkarma
console.log(x * y); // Çarpma
console.log(x / y); // Bölme
console.log(x % y); // Kalan
```

### Koşullar

```javascript
let yas = 18;
if (yas >= 18) {
    console.log("Reşit");
} else {
    console.log("Reşit değil");
}
```

### Döngüler

```javascript
for (let i = 0; i < 5; i++) {
    console.log(i);
}

let j = 0;
while (j < 3) {
    console.log(j);
    j++;
}
```

### Fonksiyonlar

```javascript
function selam(isim) {
    return "Merhaba " + isim;
}
console.log(selam("Burak"));

const topla = (a, b) => a + b; // arrow function
```

### Diziler (Array)

```javascript
let sayilar = [1, 2, 3, 4];

sayilar.push(5);     // sona ekler
sayilar.pop();       // sondan siler
sayilar.shift();     // baştan siler
sayilar.unshift(0);  // başa ekler

sayilar.forEach(s => console.log(s)); // her elemanı yazdır
let kareler = sayilar.map(s => s * s);
let ciftler = sayilar.filter(s => s % 2 === 0);
let toplam = sayilar.reduce((a, b) => a + b, 0);
```

### Objeler

```javascript
let ogrenci = {
  ad: "Ali",
  yas: 20,
  dersler: ["Matematik", "Fizik"],
  bilgi: function() {
    return this.ad + " " + this.yas + " yaşında";
  }
};
console.log(ogrenci.bilgi());
```

### ES6 Özellikleri

```javascript
// Destructuring
let {ad, yas} = ogrenci;

// Spread
let dizi = [1, 2, 3];
let yeni = [...dizi, 4, 5];

// Rest
function topla(...sayilar) {
    return sayilar.reduce((a, b) => a + b);
}
```

### Hata Yakalama

```javascript
try {
  let sonuc = tanimsizDeger + 1;
} catch (hata) {
  console.log("Hata oluştu:", hata);
}
```

### DOM Seçiciler

```javascript
document.getElementById("id"); 
document.querySelector(".class"); 
document.querySelectorAll("p");
```

### İçerik ve Stil Değiştirme

```javascript
document.getElementById("baslik").innerHTML = "Yeni Başlık";
document.querySelector(".yazi").style.color = "blue";
document.querySelector(".kutu").classList.add("aktif");
```

### Eleman Oluşturma

```javascript
let yeniDiv = document.createElement("div");
yeniDiv.textContent = "Merhaba!";
document.body.appendChild(yeniDiv);
```

### Olaylar

```html
<button id="btn">Tıkla</button>
```

```javascript
document.getElementById("btn").addEventListener("click", () => {
    alert("Butona tıklandı!");
});
```

### Form İşlemleri

```html
<form id="form">
  <input type="text" id="isim" placeholder="Adınız">
  <button type="submit">Gönder</button>
</form>
```

```javascript
document.getElementById("form").addEventListener("submit", e => {
    e.preventDefault();
    let isim = document.getElementById("isim").value;
    console.log("Girilen isim:", isim);
});
```

### LocalStorage

```javascript
localStorage.setItem("kullanici", "Ali");
console.log(localStorage.getItem("kullanici"));
localStorage.removeItem("kullanici");
```

### Fetch API (Veri Çekme)

```javascript
fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.log("Hata:", err));
```

### Async / Await ile Fetch

```javascript
async function getir() {
    try {
        let res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
        let data = await res.json();
        console.log(data);
    } catch (err) {
        console.log("Hata:", err);
    }
}
getir();
```
