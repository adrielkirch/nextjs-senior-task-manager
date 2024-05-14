# Landing Page Template built with Next JS 14+, Tailwind CSS 3 and TypeScript 

🚀 Landing Page theme written in Next.js, Tailwind CSS and TypeScript ⚡️ Made with developer experience first: Next.js, TypeScript, ESLint, Prettier, Husky, Lint-Staged, VSCode, Netlify, PostCSS, Tailwind CSS.

### DEMO

[![Nextjs Landing Page Template Screenshot](public/assets/images/nextjs-landing-page-screenshot.png?raw=true)](https://creativedesignsguru.com/demo/nextjs-landing-page/)

Check out our [live demo](https://creativedesignsguru.com/demo/nextjs-landing-page/).

### Features

Developer experience first:

- 🔥 [Next.js](https://nextjs.org) for Static Site Generator
- 🎨 Integrate with [Tailwind CSS](https://tailwindcss.com)
- 💅 PostCSS for processing Tailwind CSS and integrated to `styled-jsx`
- 🎉 Type checking [TypeScript](https://www.typescriptlang.org)
- ✅ Strict Mode for TypeScript and React 18
- ✏️ Linter with [ESLint](https://eslint.org) (default NextJS, NextJS Core Web Vitals and Airbnb configuration)
- 🛠 Code Formatter with [Prettier](https://prettier.io)
- 🦊 Husky for Git Hooks
- 🚫 Lint-staged for running linters on Git staged files
- 🗂 VSCode configuration: Debug, Settings, Tasks and extension for PostCSS, ESLint, Prettier, TypeScript
- 🤖 SEO metadata, JSON-LD and Open Graph tags with Next SEO
- ⚙️ [Bundler Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)
- 🖱️ One click deployment with Netlify (or manual deployment to any hosting services)
- 🌈 Include a FREE theme
- 💯 Maximize lighthouse score

Built-in feature from Next.js:

- ☕ Minify HTML & CSS
- 💨 Live reload
- ✅ Cache busting

### Included Components

- Navbar
- Hero
- Features
- CTA banner
- Footer

Find more components in our [premium NextJS themes](https://creativedesignsguru.com/category/nextjs/).

### Philosophy

- Minimal code
- SEO-friendly
- 🚀 Production-ready

### Requirements

- Node.js and npm

### Getting started

Run the following command on your local environment:

```
git clone --depth=1 https://github.com/ixartz/Next-JS-Landing-Page-Starter-Template.git my-project-name
cd my-project-name
npm install
```

Then, you can run locally in development mode with live reload:

```
npm run dev
```

Open http://localhost:3000 with your favorite browser to see your project. For your information, Next JS need to take some time to compile the project for your first time.


### Customization

You can easily configure the theme. Please change the following file:

- `public/apple-touch-icon.png`, `public/favicon.ico`, `public/favicon-16x16.png` and `public/favicon-32x32.png`: your favicon, you can generate from https://favicon.io/favicon-converter/
- `src/styles/global.css`: your CSS file using Tailwind CSS
- `utils/AppConfig.ts`: configuration file
- `src/pages/index.tsx`: the index page of the theme that uses the `Base` component
- `src/template/Base.tsx`: the `Base` component using component blocks
- `src/templates/*`: the list of component blocks
- `src/*`: other folders in src are the atomic components used by components blocks

Here is the layer:

- the entry point: `index.tsx` in `src/pages`
- the `Base` template: `Base.tsx` in `src/templates`
- use component blocks from `src/templates/*`
- use atomic components from `src/*`

### Deploy to production

You can see the results locally in production mode with:

```
$ npm run build
$ npm run start
```

The generated HTML and CSS files are minified (built-in feature from Next js). It will also removed unused CSS from [Tailwind CSS](https://tailwindcss.com).

You can create an optimized production build with:

```
npm run build-prod
```

Now, your theme is ready to be deployed. All generated files are located at `out` folder, which you can deploy with any hosting service.

### License

Licensed under the MIT License, Copyright © 2024

See [LICENSE](LICENSE) for more information.
