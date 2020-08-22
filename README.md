This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />

### `npm run zip`

Creates a zip file `extension.zip` from the `build` folder.

## Release Workflow

- [ ] Update `CHANGELOG.md` with notes for the new release version.
- [ ] Create a tag `git tag -a v1.0.0` with release notes from `CHANGELOG.md`.
- [ ] Push the tag `git push --tags`.
- [ ] Draft a new release on [GitHub](https://github.com/naush/chrome-ext-example/releases).
- [ ] Run `npm run build` and `npm run zip` to create a `extension.zip` file.
- [ ] Upload `v1.0.0.zip` to [Chrome Web Store](https://chrome.google.com/webstore).

## Credit

- Icons made by [Icongeek26](https://www.flaticon.com/authors/icongeek26) from [www.flaticon.com](www.flaticon.com)
- [Example of playing audio in Javascript](https://gist.github.com/xem/670dec8e70815842eb95)
