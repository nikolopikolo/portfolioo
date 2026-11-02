# nikolopikolo — Developer Portfolio

მინიმალისტური, თანამედროვე და სრულად ადაპტური (responsive) Fullstack დეველოპერის პორტფოლიო. შექმნილია სუფთა HTML5, თანამედროვე CSS და მინიმალისტური JavaScript ტექნოლოგიებით, ზედმეტი ბიბლიოთეკების გარეშე.

- **GitHub პროფილი**: [https://github.com/nikolopikolo](https://github.com/nikolopikolo)

---

## მახასიათებლები

- **დიზაინის მიმართულება**: მინიმალისტური, ინდუსტრიული და სუფთა Dark Theme (Charcoal ფონი, მკაფიო თეთრი ტექსტი და ტერმინალის მდუმარე მწვანე აქცენტი).
- **არ შეიცავს AI-სტერეოტიპებს**: არ არის გამოყენებული ზედმეტი გრადიენტები, blur-ეფექტები, მცურავი ბურთები და ყალბი სტატისტიკა.
- **სრული ადაპტურობა (Mobile-First)**:
  - **375px (Mobile)**: ერთსვეტიანი სუფთა განლაგება, ხელმისაწვდომი ბურგერ მენიუ.
  - **768px (Tablet)**: გადასვლა ჰორიზონტალურ ნავიგაციაზე; პროექტები და უნარები ნაწილდება 2 სვეტად.
  - **1024px – 1280px+ (Desktop)**: პროექტები იშლება 3 სვეტად.
- **WIP პროექტების სექცია**: პროექტების ნაცვლად განთავსებულია გამორჩეული ინდუსტრიული WIP (Work In Progress) ბანერი პირდაპირი ბმულით `github.com/nikolopikolo`-ზე.
- **მზადაა GitHub Pages-ისთვის**: არ საჭიროებს build სისტემას, პირდაპირ ეშვება სტატიკურად.

---

## ფაილების სტრუქტურა

```
portfolioo/
├── index.html        # სემანტიკური HTML5 სტრუქტურა
├── css/
│   └── style.css     # CSS ცვლადები, ადაპტური წესები და სტილები
├── js/
│   └── main.js       # ბურგერ მენიუსა და ნავიგაციის ლოგიკა
└── README.md         # დოკუმენტაცია
```

---

## GitHub Pages-ზე ატვირთვა

1. ინიციალიზაცია და commit:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: developer portfolio"
   ```
2. შექმენით რეპოზიტორი GitHub-ზე და დააკავშირეთ:
   ```bash
   git remote add origin https://github.com/nikolopikolo/<repo-name>.git
   git branch -M main
   git push -u origin main
   ```
3. GitHub-ზე გადადით **Settings** > **Pages** > აირჩიეთ `main` branch და დააჭირეთ **Save**.
