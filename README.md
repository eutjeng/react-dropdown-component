# User Selection Dropdown Component

This project includes a customizable dropdown component for selecting users from a dynamically loaded list. Employing React and TypeScript, the component features an infinite scrolling capability to efficiently handle large datasets.

## Features

- Custom dropdown to select users.
- Infinite scrolling for optimal performance with extensive lists.
- Partial item rendering to manage resource-intensive DOM operations.
- Strongly typed with TypeScript for reliable code.
- Ensured code quality with ESLint and Prettier.

## Getting Started

## Configuration

### Initial User List Limit

To adjust the initial number of users loaded by the User Select feature, you can modify the `INITIAL_LIST_LIMIT` constant. This constant determines how many user records are fetched when the user dropdown is initialized.

Location of the constant:
`src/features/userSelect/lib/utils/constants.ts`

Code snippet:

```typescript
// Fixed height in REM for each item
export const ITEM_HEIGHT_IN_REM = 2;
// Items to render outside the viewport for smoother scrolling
export const INITIAL_LIST_LIMIT = 50;
```

### Prerequisites

Ensure you have the following installed on your system:

- Node.js (version 14 or above)
- npm or yarn

### Installation

Clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd <project-directory>
npm install
```

### Development

To start the development server:

```bash
npm start
```

The application will be available at `http://localhost:8080`.

### Building for Production

To create a production build:

```bash
npm run build
```

The output will be in the `dist` directory.

### Code Linting

To check the code for any linting errors:

```bash
npm run lint
```

To automatically fix linting errors:

```bash
npm run lint:fix
```
