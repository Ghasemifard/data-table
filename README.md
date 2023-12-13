# Data Table App

This project is a data table application developed using Next.js with TypeScript. It serves as an interview task, displaying user data fetched from an API using React Query. The table is rendered using the `tanstack-table` library, and Tailwind CSS is used for styling.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [Learn More](#learn-more)
- [Deploy on Vercel](#deploy-on-Vercel)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Ghasemifard/data-table.git

   cd data-table

   npm install







This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Usage

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.


## Project Structure

The project structure follows the conventions of Next.js:

├── app/
│   |
│   ├── page.tsx  # Main page
│   ├── layout.tsx      # Layout component
│   ├── globals.css      # Global styles
├── components/
│   ├── DataTable.tsx   # Component for displaying data table
│   ├── Columns.tsx     # Component for column headers
├── utils/
│   ├── fetchData.tsx   # Utility for fetching data
├── common/
│   ├── ReactQueryProvider.tsx  # Provider for React Query Client



## Dependencies
Next.js
TypeScript
tanstack-table
Tailwind CSS
React Query


## Contributing
Feel free to contribute to this project. If you find any issues or have improvements, open an issue or submit a pull request.



## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

this project deployed on Vercel:



The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
