# Node.js'e Giriş: Basit Anlatım

Node.js, JavaScript'i sunucu tarafında çalıştırmamızı sağlayan bir çalışma ortamıdır (runtime).

## Basit Bir Node.js Uygulaması

1. Yeni bir dosya oluşturun (örneğin `app.js`)
2. İçine şu kodu yazın:

```javascript
// Modül yükleme (http modülü dahili gelir)
const http = require('http');

// Sunucu oluşturma
const server = http.createServer((req, res) => {
  // İstek geldiğinde yapılacaklar
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Merhaba Node.js Dünyası!\n');
});

// Sunucuyu belirli bir portta dinlemeye başlatma
server.listen(3000, () => {
  console.log('Sunucu http://localhost:3000 adresinde çalışıyor...');
});
```

3. Terminalde `node app.js` komutunu çalıştırın
4. Tarayıcınızda `http://localhost:3000` adresini açın

## Temel Modüller
Node.js ile gelen bazı dahili modüller:
- `fs`: Dosya sistemi işlemleri
- `path`: Dosya yolu işlemleri
- `http`: HTTP sunucusu oluşturma
- `events`: Event yönetimi
