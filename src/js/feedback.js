// 1. Form ve depo anahtarını tanımlıyoruz
const form = document.querySelector('.feedback-form');
const localStorageKey = 'feedback-form-state';

// 2. Sayfa yüklendiğinde depoyu kontrol et (GÖREV 2)
const savedData = JSON.parse(localStorage.getItem(localStorageKey));

if (savedData) {
  form.elements.email.value = savedData.email ?? '';
  form.elements.message.value = savedData.message ?? '';
}

// 3. Input olayını dinle (Delegasyon ile) (GÖREV 1)
form.addEventListener('input', event => {
  const { name, value } = event.target;

  // Mevcut depodaki veriyi al veya boş bir obje oluştur
  const currentState = JSON.parse(localStorage.getItem(localStorageKey)) ?? {};

  // Sadece değişen alanı güncelle (trim kullanarak boşlukları temizle)
  currentState[name] = value.trim();

  // Güncel nesneyi depoya kaydet
  localStorage.setItem(localStorageKey, JSON.stringify(currentState));
});

// 4. Submit olayını yönet (GÖREV 3)
form.addEventListener('submit', event => {
  event.preventDefault();

  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();

  // Her iki alan da dolu mu kontrol et
  if (email === '' || message === '') {
    alert('Lütfen tüm alanları doldurun!');
    return;
  }

  // Konsola yazdır
  console.log({ email, message });

  // Depoyu ve formu temizle
  localStorage.removeItem(localStorageKey);
  form.reset();
});
