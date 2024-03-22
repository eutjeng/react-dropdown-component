# User Selection Dropdown Component

This project includes a customizable dropdown component for selecting users from a dynamically loaded list. Employing React and TypeScript, the component features infinite scrolling capability to efficiently handle large datasets.

## Features

- Custom dropdown to select users
- Infinite scrolling for optimal performance with large lists
- Partial item rendering for efficient DOM management
- Strong typing with TypeScript for development reliability
- Code quality ensured with ESLint and Prettier

## Getting Started

Follow these instructions to set up your development environment and start using the User Selection Dropdown component.

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- Node.js (version 14 or above)
- npm or yarn (for managing packages)

### Installation

Clone the repository and install the required dependencies:

```bash
git clone https://github.com/eutjeng/react-dropdown-component.git
cd react-dropdown-component
npm install
```

### Running the Development Server

To launch the development server, run the following command:

```bash
npm start
```

This will make the application available at `http://localhost:8080`.

### Building for Production

To create an optimized production build:

```bash
npm run build
```

Compiled output will be placed in the `dist` directory.

## Configuration

### Initial User List Limit

To change the initial number of users fetched on component load, update the `INITIAL_LIST_LIMIT` constant in:

```
src/features/userSelect/lib/utils/constants.ts
```

Here's the code to adjust the limit:

```typescript
// Initial number of items to fetch and render
export const INITIAL_LIST_LIMIT = 50; // Change 50 to your preferred initial limit
```

### Code Quality Assurance

To ensure your code adheres to linting rules:

```bash
npm run lint
```

This will highlight any linting issues across your codebase.

For automatically fixing these linting issues where possible:

```bash
npm run lint:fix
```

## Usage

### Starting the Component

After completing the installation steps, you can start the component by running:

```bash
npm start
```

### Using the Dropdown

Implement the `<UserSelectDropdown />` component in your application to provide a user selection interface with an initial user list limit and infinite scrolling features.
