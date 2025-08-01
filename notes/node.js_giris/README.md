# node.js_giris

- Node.js, açık kaynaklı ve çapraz platform JavaScript çalışma ortamıdır. Neredeyse her türlü proje için popüler bir araçtır.
- Node.js, Google Chrome'un çekirdeği olan V8 JavaScript motorunu tarayıcı dışında çalıştırır. Bu, Node.js'in oldukça performanslı olmasını sağlar.
- Node.js uygulamaları, her isteğe yeni bir thread oluşturmadan tek bir işlemde çalışır. Node.js, standart kütüphanesinde yer alan asenkron G/Ç (girdi/çıktı) primaları sayesinde JavaScript kodunun bloklanmamasını sağlar. Ayrıca, Node.js kütüphaneleri genellikle bloklama yapmayan paradigmalar kullanılarak yazılmıştır; dolayısıyla bloklayıcı davranış, Node.js'te bir istisna olarak kabul edilir.
- Node.js, bir G/Ç işlemi gerçekleştirdiğinde (örneğin, ağdan okuma, veritabanına erişim ya da dosya sistemine erişim gibi), thread’i bloklamadan ve CPU döngülerini boşa harcamadan yanıt geldikçe işlemleri yeniden başlatır. Bu özellik, Node.js’in tek bir sunucu ile binlerce eş zamanlı bağlantıyı yönetmesini sağlar; thread eşzamanlılığını yönetme yükünü getirmeden.


Aşağıda, verilen açıklamanın özeti ve kodun nasıl çalıştırılacağına dair kısa bir rehber verilmiştir:

### Server.js Dosyası Oluşturma ve Çalıştırma

1. **Dosya Oluşturma**: Bu kodu `server.js` isimli bir dosyaya kaydedin. Eğer `.mjs` uzantısını kullanıyorsanız, dosyanızı `server.mjs` olarak kaydedin.
   
2. **Çalıştırma**:
   - Terminali açın.
   - `server.js` için: 
     ```bash
     node server.js
     ```

### Kodu Açıklama 

- **Http Modülü**: Kod, Node.js’in http modülünü dahil eder. Node.js’in standart kütüphanesi mükemmel bir ağ desteğine sahiptir.
  
- **createServer() Metodu**: Bu metod yeni bir HTTP sunucusu oluşturur ve döner. Sunucu, belirli bir port ve host adı üzerinde dinlemeye ayarlanmıştır. Sunucu hazır olduğunda, bir geri çağırma fonksiyonu çalıştırılır ve sunucunun çalıştığını bildirir.

- **İstek Olayı**: Yeni bir istek alındığında, `request` olayı tetiklenir. Bu olaya iki nesne gelir: `http.IncomingMessage` nesnesi olan isteği tanımlayan nesne ve `http.ServerResponse` nesnesi olan yanıta sahip nesne. 

  - **İstek Nesnesi (`request`)**: İsteği sağlayan bilgileri içerir. Basit örneğimizde bu bilgi kullanılmamakta, ancak istek başlıkları ve verilerine erişim sağlar.
  
  - **Yanıt Nesnesi (`response`)**: Yanıtı geri döndürmek için kullanılır.

- **Durum Kodu Ayarı**:
  ```javascript
  res.statusCode = 200; // Başarılı yanıt için durum kodu 200 olarak ayarlanır.
  ```

- **Başlık Ayarı**:
  ```javascript
  res.setHeader('Content-Type', 'text/plain'); // İçerik türü olarak 'text/plain' ayarlanır.
  ```

- **Yanıtı Tamamla**:
  ```javascript
  res.end('Hello World\n'); // Yanıtı sonlandırır ve içerik olarak 'Hello World' eklenir.
  ```