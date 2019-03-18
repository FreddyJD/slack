# Serverless Slack

"Slack is a collaboration hub for work, no matter what work you do. It’s a place where conversations happen, decisions are made, and information is always at your fingertips. With Slack, your team is better connected." - Slack website 

⇒ Demo |  https://slack-ci0m9eatz.now.sh/

![image](https://i.imgur.com/e8Ynx97.png)


## Installation

Bash scripts 

```bash

npm install 

```
/src/firebase.js file 

```JavaScript
import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";


var config = {
    apiKey: "XXXXXX",
    authDomain: "sXXXXX.XXXXXX.com",
    databaseURL: "https://XXXXXX.com",
    projectId: "sXXXXXXX",
    storageBucket: "xXXXXXX2XXXXappspXXot.com/",
    messagingSenderId: "XXXXXXXXXXX"
};
firebase.initializeApp(config);

export default firebase;
```
Start commands

```bash

 npm start 

```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
