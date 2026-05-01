# Express Book Reviews Assignment - Tasks and Answers

## Task 1: githubrepo

Command:
```bash
curl -s https://api.github.com/repos/Saad-Chaoui/expressBookReviews | node -e 'let d="";process.stdin.on("data",c=>d+=c);process.stdin.on("end",()=>{const j=JSON.parse(d);console.log(JSON.stringify({full_name:j.full_name,fork:j.fork,parent:j.parent?j.parent.full_name:null},null,2));});'
```

Output:
```json
{
  "full_name": "Saad-Chaoui/expressBookReviews",
  "fork": true,
  "parent": "ibm-developer-skills-network/expressBookReviews"
}
```

## Task 2: getallbooks

Command:
```bash
curl -s http://localhost:5000/books | node -e 'let d="";process.stdin.on("data",c=>d+=c);process.stdin.on("end",()=>{console.log(JSON.stringify(JSON.parse(d),null,2));});'
```

Output:
```json
{
  "1": {
    "author": "Chinua Achebe",
    "title": "Things Fall Apart",
    "reviews": {}
  },
  "2": {
    "author": "Hans Christian Andersen",
    "title": "Fairy tales",
    "reviews": {}
  },
  "3": {
    "author": "Dante Alighieri",
    "title": "The Divine Comedy",
    "reviews": {}
  },
  "4": {
    "author": "Unknown ",
    "title": "The Epic Of Gilgamesh",
    "reviews": {}
  },
  "5": {
    "author": "Unknown ",
    "title": "The Book Of Job",
    "reviews": {}
  },
  "6": {
    "author": "Unknown",
    "title": "One Thousand and One Nights",
    "reviews": {}
  },
  "7": {
    "author": "Unknown",
    "title": "Njál's Saga",
    "reviews": {}
  },
  "8": {
    "author": "Jane Austen",
    "title": "Pride and Prejudice",
    "reviews": {}
  },
  "9": {
    "author": "Honoré de Balzac",
    "title": "Le Père Goriot",
    "reviews": {}
  },
  "10": {
    "author": "Samuel Beckett",
    "title": "Molloy, Malone Dies, The Unnamable, the trilogy",
    "reviews": {}
  }
}
```

## Task 3: getbooksbyISBN

Command:
```bash
curl -s http://localhost:5000/books/isbn/1 | node -e 'let d="";process.stdin.on("data",c=>d+=c);process.stdin.on("end",()=>{console.log(JSON.stringify(JSON.parse(d),null,2));});'
```

Output:
```json
{
  "author": "Chinua Achebe",
  "title": "Things Fall Apart",
  "reviews": {}
}
```

## Task 4: getbooksbyauthor

Command:
```bash
curl -s http://localhost:5000/books/author/unknown | node -e 'let d="";process.stdin.on("data",c=>d+=c);process.stdin.on("end",()=>{console.log(JSON.stringify(JSON.parse(d),null,2));});'
```

Output:
```json
{
  "4": {
    "author": "Unknown",
    "title": "The Epic Of Gilgamesh",
    "reviews": {}
  },
  "5": {
    "author": "Unknown",
    "title": "The Book Of Job",
    "reviews": {}
  },
  "6": {
    "author": "Unknown",
    "title": "One Thousand and One Nights",
    "reviews": {}
  },
  "7": {
    "author": "Unknown",
    "title": "Njál's Saga",
    "reviews": {}
  }
}
```

## Task 5: getbooksbytitle

Command:
```bash
curl -s http://localhost:5000/books/title/fall | node -e 'let d="";process.stdin.on("data",c=>d+=c);process.stdin.on("end",()=>{console.log(JSON.stringify(JSON.parse(d),null,2));});'
```

Output:
```json
{
  "1": {
    "author": "Chinua Achebe",
    "title": "Things Fall Apart",
    "reviews": {}
  }
}
```

## Task 6: getbookreview

Command:
```bash
curl -s http://localhost:5000/books/review/1 | node -e 'let d="";process.stdin.on("data",c=>d+=c);process.stdin.on("end",()=>{console.log(JSON.stringify(JSON.parse(d),null,2));});'
```

Output:
```json
{}
```

## Task 7: register

Command:
```bash
curl -s -X POST -H "Content-Type: application/json" -d '{"username":"courseraUser0426","password":"pass123"}' http://localhost:5000/register
```

Output:
```json
{
  "message": "User successfully registered"
}
```

## Task 8: login

Command:
```bash
curl -s -X POST -H "Content-Type: application/json" -d '{"username":"courseraUser0426","password":"pass123"}' http://localhost:5000/customer/login | node -e 'let d="";process.stdin.on("data",c=>d+=c);process.stdin.on("end",()=>{console.log(JSON.stringify(JSON.parse(d),null,2));});'
```

Output:
```json
{
  "message": "User successfully logged in",
  "token": "<JWT_TOKEN>"
}
```

## Task 9: reviewadded

Command:
```bash
curl -s -X PUT -H "Authorization: Bearer <JWT_TOKEN>" -H "Content-Type: application/json" -d '{"review":"Excellent classic read"}' http://localhost:5000/customer/review/1
```

Output:
```json
{
  "message": "Review added or updated successfully",
  "reviews": {
    "courseraUser0426": "Excellent classic read"
  }
}
```

## Task 10: deletereview

Command:
```bash
curl -s -X DELETE -H "Authorization: Bearer <JWT_TOKEN>" http://localhost:5000/customer/review/1
```

Output:
```json
{
  "message": "Review deleted successfully",
  "reviews": {}
}
```

## Task 11: general.js URL

Submission URL:

https://github.com/Saad-Chaoui/expressBookReviews/blob/main/final_project/router/general.js
