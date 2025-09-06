# HTML Temel Notlar

### 1. HTML Yapısı

```html
<!DOCTYPE html>
<html>
<head>
    <title>Sayfa Başlığı</title>
</head>
<body>
    Buraya sayfanın içeriği gelir.
</body>
</html>
```

* `<!DOCTYPE html>` → HTML5 olduğunu belirtir.
* `<html>` → Sayfanın en dış etiketi.
* `<head>` → Başlık, meta, stil, script gibi bilgiler buraya yazılır.
* `<body>` → Asıl görünen içerik burada bulunur.

---

### 2. Başlıklar ve Paragraflar

```html
<h1>En büyük başlık</h1>
<h2>İkinci seviye başlık</h2>
<h3>Üçüncü seviye başlık</h3>
<p>Bu bir paragraf örneğidir.</p>
```

* `h1` → En büyük başlık.
* `h2`–`h6` → Küçük başlıklar.
* `p` → Paragraf.

---

### 3. Yazı Biçimlendirme

```html
<b>Kalın yazı</b>
<i>İtalik yazı</i>
<u>Altı çizili</u>
<mark>Vurgulu yazı</mark>
<small>Küçük yazı</small>
```

* `b` → Kalın.
* `i` → İtalik.
* `u` → Altı çizili.
* `mark` → Fosforlu.
* `small` → Küçük yazı.

---

### 4. Linkler

```html
<a href="https://www.google.com">Google</a>
<a href="sayfa.html" target="_blank">Yeni sekmede aç</a>
```

* `href` → Link adresi.
* `target="_blank"` → Yeni sekmede açar.

---

### 5. Resimler

```html
<img src="resim.jpg" alt="Açıklama" width="200" height="150">
```

* `src` → Resim yolu.
* `alt` → Resim yüklenmezse görünen metin.
* `width` / `height` → Boyut.

---

### 6. Listeler

```html
<ul>
  <li>Liste 1</li>
  <li>Liste 2</li>
</ul>

<ol>
  <li>Sıralı liste 1</li>
  <li>Sıralı liste 2</li>
</ol>
```

* `ul` → Noktalı liste.
* `ol` → Numaralı liste.
* `li` → Liste elemanı.

---

### 7. Tablolar

```html
<table border="1">
  <tr>
    <th>Ad</th>
    <th>Soyad</th>
  </tr>
  <tr>
    <td>Ali</td>
    <td>Yılmaz</td>
  </tr>
</table>
```

* `table` → Tablo.
* `tr` → Satır.
* `th` → Başlık hücresi.
* `td` → Normal hücre.

---

### 8. Formlar

```html
<form action="gonder.php" method="post">
  <label>Ad:</label>
  <input type="text" name="ad">
  
  <label>Şifre:</label>
  <input type="password" name="sifre">
  
  <input type="submit" value="Gönder">
</form>
```

* `form` → Kullanıcıdan veri alır.
* `input type="text"` → Metin kutusu.
* `input type="password"` → Şifre kutusu.
* `input type="submit"` → Gönder butonu.

---

### 9. Video ve Ses

```html
<video width="320" height="240" controls>
  <source src="video.mp4" type="video/mp4">
</video>

<audio controls>
  <source src="ses.mp3" type="audio/mpeg">
</audio>
```

* `video` → Video ekler.
* `audio` → Ses ekler.
* `controls` → Oynatma kontrolü ekler.

---

### 10. Div ve Span

```html
<div style="background-color: lightgray;">Bu bir div</div>
<span style="color: red;">Bu kırmızı yazı</span>
```

* `div` → Büyük blok oluşturur.
* `span` → Küçük alanları biçimlendirmek için kullanılır.
