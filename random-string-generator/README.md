# Random String Generator

A basic React application that generates random strings. It demonstrates `useState`, `useCallback`, and `useEffect` hooks.

## Features

- Generate random strings instantly
- Choose string length from 4 to 32 characters
- Toggle uppercase letters, lowercase letters, numbers, and symbols
- Copy the generated string
- View the five most recent generated strings

## Hooks Used

- `useState` manages length, selected options, generated text, copy status, and history.
- `useCallback` memoizes string generation, option updates, clipboard copying, and character pool creation.
- `useEffect` generates a fresh string when the app loads or generation settings change.

## Run Locally

```bash
npm install
npm run dev
```

Then open the local URL shown in the terminal.

## Build

```bash
npm run build
```

## Upload to GitHub

Create a new GitHub repository and upload these project files, or push them with Git:

```bash
git init
git add .
git commit -m "Create random string generator"
git branch -M main
git remote add origin <your-repository-url>
git push -u origin main
```
