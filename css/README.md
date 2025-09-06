# CSS Temel Notları

### 1. Arka Plan ve Renkler

```css
background-color: red;       /* Elemanın arka planını kırmızı yapar */
color: white;                /* Yazı rengini beyaz yapar */
background-image: url("resim.jpg");  /* Arka plana resim ekler */
background-repeat: no-repeat;        /* Resmin tekrar etmesini engeller */
background-size: cover;              /* Resim tüm alanı kaplayacak şekilde ölçeklenir */
```

### 2. Yazı Stilleri

```css
font-family: Arial, sans-serif;  /* Yazı tipini Arial yapar */
font-size: 18px;                 /* Yazının boyutunu 18px yapar */
font-weight: bold;               /* Yazıyı kalın yapar */
font-style: italic;              /* Yazıyı italik yapar */
text-decoration: underline;      /* Yazının altını çizer */
text-align: center;              /* Yazıyı ortalar */
line-height: 1.5;                /* Satır aralığını ayarlar */
letter-spacing: 2px;             /* Harfler arası boşluk ekler */
word-spacing: 5px;               /* Kelimeler arası boşluk ekler */
```

### 3. Boyutlandırma

```css
width: 200px;         /* Genişliği 200px yapar */
height: 100px;        /* Yüksekliği 100px yapar */
max-width: 500px;     /* Maksimum genişlik 500px olur */
min-height: 300px;    /* Minimum yükseklik 300px olur */
```

### 4. Boşluklar

```css
margin: 20px;             /* Tüm kenarlardan 20px boşluk bırakır */
margin-top: 10px;         /* Üstten boşluk */
margin-bottom: 15px;      /* Alttan boşluk */
margin-left: 30px;        /* Soldan boşluk */
margin-right: 30px;       /* Sağdan boşluk */

padding: 10px;            /* İç boşluk */
padding-top: 5px;         /* Üstten iç boşluk */
padding-bottom: 5px;      /* Alttan iç boşluk */
```

### 5. Kenarlıklar

```css
border: 2px solid black;          /* 2px kalınlıkta siyah kenarlık ekler */
border-radius: 10px;              /* Köşeleri yuvarlatır */
border-top: 5px dashed red;       /* Üst kenarlık kırmızı ve kesik çizgi */
border-bottom: 3px dotted blue;   /* Alt kenarlık mavi ve noktalı */
```

### 6. Kutular ve Gölgeler

```css
box-shadow: 2px 2px 10px gray;  /* Kutunun arkasına gölge ekler */
overflow: hidden;               /* Taşan içeriği gizler */
overflow-y: scroll;             /* Dikey kaydırma çubuğu ekler */
```

### 7. Görünürlük

```css
display: block;    /* Blok halinde gösterir (div gibi) */
display: inline;   /* Satır içinde gösterir (span gibi) */
display: flex;     /* Flexbox düzenini etkinleştirir */
display: grid;     /* Grid düzenini etkinleştirir */
display: none;     /* Elemanı gizler */

visibility: hidden; /* Eleman görünmez olur ama yer kaplar */
```

### 8. Konumlandırma

```css
position: static;    /* Varsayılan konumlandırma */
position: relative;  /* Kendi normal yerine göre ayarlar */
position: absolute;  /* En yakın kapsayıcıya göre konumlanır */
position: fixed;     /* Sayfada sabitlenir, kaydırmada hareket etmez */
position: sticky;    /* Kaydırmada belli yerde sabitlenir */

top: 20px;    /* Yukarıdan 20px boşluk */
left: 10px;   /* Soldan 10px boşluk */
right: 15px;  /* Sağdan 15px boşluk */
bottom: 5px;  /* Aşağıdan 5px boşluk */
z-index: 10;  /* Katman sırası (yüksek olursa önde görünür) */
```

### 9. Flexbox Düzeni

```css
display: flex;                  /* Flexbox düzenini başlatır */
justify-content: flex-start;    /* Elemanları sola yaslar */
justify-content: flex-end;      /* Elemanları sağa yaslar */
justify-content: center;        /* Ortalar */
justify-content: space-between; /* Elemanlar arasında boşluk bırakır */
justify-content: space-around;  /* Elemanların etrafında eşit boşluk bırakır */

align-items: flex-start;  /* Elemanları yukarı hizalar */
align-items: center;      /* Ortalar */
align-items: flex-end;    /* Aşağı hizalar */
```

### 10. Grid Düzeni

```css
display: grid;
grid-template-columns: 1fr 1fr 1fr; /* 3 sütun oluşturur */
grid-template-rows: auto auto;      /* 2 satır oluşturur */
gap: 20px;                          /* Hücreler arasında boşluk */
```

### 11. Transition ve Animasyon

```css
transition: all 0.3s ease;      /* Animasyonlu geçiş */
transform: scale(1.1);          /* Elemanı %10 büyütür */
transform: rotate(45deg);       /* Elemanı 45 derece döndürür */
transform: translateX(20px);    /* Sağa kaydırır */
```