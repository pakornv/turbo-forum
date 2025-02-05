# Turbo Forum

## What's inside?

This repo includes the following packages/apps:

### Apps and Packages

- `api`: a [NestJS](https://nestjs.com/) app
- `web`: a [Next.js](https://nextjs.org/) app with [Tailwind CSS](https://tailwindcss.com/)
- `@repo/ui`: a stub React component library with [Tailwind CSS](https://tailwindcss.com/)
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json` used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

## Tech Stack

- **Backend Framework**: [NestJS 11](https://nestjs.com/)
- **Frontend Framework**: [Next.js 15](https://nextjs.org/)
- **Database**: [SQLite](https://www.sqlite.org/)
- **ORM**: [Drizzle](https://orm.drizzle.team/)
- **UI Library**: [React Aria Components](https://react-spectrum.adobe.com/react-aria/index.html/) with [Tailwind CSS v4](https://tailwindcss.com/)

## Getting Started

```bash
git clone https://github.com/pakornv/turbo-forum
cd turbo-forum
npm install
```

## Running Locally

Use the included setup script to create your `.env` file:

```bash
npm run setup
```

Then, run the database migrations and seed the database with a default user and team:

```bash
npm run db:migrate
npm run db:seed
```

This will create the following users

- Username: `johndoe`
- Username: `janedoe`

Finally, run NestJS and Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app in action.

> [!TIP]
> You can sign out from current user by enter url [http://localhost:3000/api/auth/signout](http://localhost:3000/api/auth/signout) in your browser

## Run Unit Test

```bash
npm run test
```
