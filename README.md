# AWS SNS register device function

A simple Firebase function to register mobile phone devices to AWS SNS. Act as a proxy between phone and AWS SNS to prevent storing keys inside the application directly.

## Prerequisites

- Node.js ^16.x
- AWS account
- Firebase project
- Firebase CLI `npm install -g firebase-tools`

## Installation

First, copy the environment variables template file and fill in the values.

```bash
cp .env.example .env
```

Then, install the dependencies.

```bash
npm install
```

## Deploy
If you are deploying for the first time, you need to login to Firebase first.

```bash
firebase login
```

Then, deploy the function and enjoy :smile:

```bash
firebase deploy
```

## Testing
To test simply launch the function locally using the firebase tools.

```bash
firebase emulators:start
```
