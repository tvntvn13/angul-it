# ANGUL-IT

### Introduction

This project is a multiple-stage capctha app. Project is made with Angular 16,
and it's part of **Gritlab's** Java projects track.

##### Prerequisites

- Angular CLI
- npm or yarn

##### How to run:

- on dev server: _(server will start at https://127.0.0.1:4200)_

```bash
npm install
npm start
```

- build:

```bash
npm install
ng build --aot
```

- then go to dist/ folder and: _(server will start at https://127.0.0.1:4200)_

```bash
python3 -m http-server
```

##### Online:
- The app is also hosted [**here**](https://captcha-96d84.web.app/home)
---

### Captchas

---

##### Math Captcha

- User receives a random generated string representation of simple addition and
  deduction math problem
- Correct answer should be input as a number

##### Text Captcha

- User receives a random genrated sequence of letters and numbers
- Correct answer is case-insensitive

##### Image Captcha

- User receives a randomly chosen picture of an animal. User needs to select all
  squares that contain the animal

###### Notes:

###### _User can refresh the captchas as many times as they like, it won't effect the score_

---

### State

---

- App saves the state of users answers, and progression. These values are stored
  in local storage, and they are encrypted to obfuscate the data
- After completing a certain Captcha, the user can navigate backwards to that
  captcha

---

### Results

---

- After completing all 3 captchas, the user is presented with results page,
  showing their results

---

### Route-guarding

---

- All the routes except home and the 1st captcha, are locked. The rest of the
  captchas and the results page can only be accessed after completing all the
  captchas
