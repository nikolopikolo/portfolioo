# nikolopikolo — Developer Portfolio (Geolab Homework)

მინიმალისტური, თანამედროვე და სრულად ადაპტური (responsive) Fullstack დეველოპერის პორტფოლიო ინტეგრირებული REST API ფუნქციონალით (Geolab დავალება).

- **GitHub პროფილი**: [https://github.com/nikolopikolo](https://github.com/nikolopikolo)

---

## განხორციელებული დავალებები (Tasks)

### 1. ადაპტური მობილური ნავიგაცია (Mobile Navigation)
- დესკტოპზე (>= 768px) შენარჩუნებულია ჰორიზონტალური ნავიგაციის ზოლი.
- მობილურ ეკრანებზე (< 768px, მათ შორის 320px, 375px, 425px) გამოჩნდება ხელმისაწვდომი ჰამბურგერ მენიუ.
- ჰამბურგერ ღილაკზე დაჭერით იხსნება/იხურება მენიუ.
- მენიუს ნებისმიერ ბმულზე დაჭერით გვერდი გადადის შესაბამის სექციაზე და მენიუ ავტომატურად იხურება.
- მენიუს გახსნა/დახურვა მხარდაჭერილია კლავიატურის <kbd>Escape</kbd> ღილაკით და გარედან დაწკაპუნებით.
- გამოიყენება ARIA ატრიბუტები (`aria-expanded`, `aria-controls`, `aria-label`).

### 2. თანამშრომლების სექცია (Employees Section)
- ნავიგაციაში დამატებულია პუნქტი **თანამშრომლები (Employees)** (`#employees`).
- მონაცემები დინამიკურად იტვირთება API-დან: `https://jsonplaceholder.typicode.com/users` `fetch()`-ისა და `async/await`-ის გამოყენებით.
- გამოდის 10-ვე მომხმარებელი ადაპტური ბარათების სახით (სახელი, იუზერნეიმი, ელ-ფოსტა, ტელეფონი, კომპანიის სახელი, ვებსაიტი).
- გამოყენებულია უსაფრთხო DOM მანიპულაცია (`document.createElement`, `textContent`) `innerHTML`-ის ნაცვლად.
- რეალიზებულია ჩატვირთვის (Loading spinner) და შეცდომის (Error state) შეტყობინებები.
- განლაგება ადაპტურია: 1 სვეტი მობილურზე, 2 სვეტი ტაბლეტზე, 3 სვეტი დესკტოპზე.

### 3. პოსტების სექცია და "Load More" (Posts Section)
- ნავიგაციაში დამატებულია პუნქტი **პოსტები (Posts)** (`#posts`).
- მონაცემები იტვირთება API-დან: `https://jsonplaceholder.typicode.com/posts`.
- საწყის ეტაპზე იტვირთება და ჩნდება პირველი 6 პოსტი (სათაური და ტექსტი).
- დამატებულია ღილაკი **მეტის ჩატვირთვა (Load More)**, რომელზე დაჭერითაც გვერდის გადატვირთვის გარეშე იტვირთება და ემატება შემდეგი 6 პოსტი.
- დამუშავებულია Loading და Error სტატუსები.

### 4. პროექტები (Projects)
- წარმოდგენილია დასრულებული პროექტი **PixelGallery** (Android / Wear OS Development) Kotlin-ზე შექმნილი Google Pixel Watch 3-ისთვის, პირდაპირი GitHub ბმულით (`https://github.com/nikolopikolo/PixelGallery`).

### 5. კოდის ხარისხი და ადაპტურობა
- პროექტი იყენებს სემანტიკურ HTML5-ს, სუფთა CSS-ს და მოდულარულ `script.js` ფაილს.
- საიტი ტესტირებულია 320px, 375px, 425px, 768px და 1024px+ რეზოლუციებზე ჰორიზონტალური სქროლის გარეშე.

---

## ფაილების სტრუქტურა

```
portfolioo/
├── index.html        # სემანტიკური HTML5 სტრუქტურა და ჩაშენებული CSS სტილები
├── script.js         # JavaScript: მენიუ, scrollspy, თანამშრომლები და პოსტების API
└── README.md         # დოკუმენტაცია
```

---

## GitHub Pages-ზე ატვირთვა

```bash
git add .
git commit -m "Complete Geolab homework: mobile nav, employees API, posts with load more"
git push origin main
```
