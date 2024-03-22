# User Selection Dropdown Component

An advanced React component designed for selecting users from a dynamic and potentially large list. It incorporates modern development practices and tooling, leveraging React, TypeScript, infinite scrolling, and partial rendering for a performant and user-friendly experience.

## Features

- **Customizable Dropdown**: Users can be selected from a dropdown that supports dynamic loading of data.
- **Infinite Scrolling**: Implements efficient loading of data for handling large lists without performance degradation.
- **Partial Item Rendering**: Optimizes rendering performance by only updating the visible DOM elements.
- **TypeScript Support**: Utilizes strong typing for better code reliability and developer experience.
- **Code Quality Tools**: Integrates ESLint and Prettier for consistent code styling and quality assurance.

## Quick Start

Ensure the following tools are installed on your machine:

- Node.js (>= v14)
- npm or yarn

### Installation

Clone the repository and navigate into the project directory:

```bash
git clone https://github.com/eutjeng/react-dropdown-component.git
cd react-dropdown-component
```

Install project dependencies:

```bash
npm install
```

### Development Server

Start the local development server with hot reloading:

```bash
npm start
```

The application will be served at `http://localhost:8080`.

### Production Build

Generate a production-ready build in the `dist` directory:

```bash
npm run build
```

### Code Linting and Formatting

Run ESLint to identify and report on patterns in JavaScript:

```bash
npm run lint
```

Automatically fix code style issues using Prettier:

```bash
npm run lint:fix
```

## Configuration and Usage

### API and Pagination

Configure the API URL and initial pagination settings in `src/shared/utils/constants.ts`:

```typescript
export const API_URL = 'https://alanbase.vercel.app/api'; // Endpoint for user data retrieval
```

Update these constants as needed to align with your backend service.

### Initial User List Loading

Adjust the initial number of users loaded by modifying `INITIAL_LIST_LIMIT`, `INITIAL_PAGE_NUMBER` :

File: `src/features/userSelect/lib/utils/constants.ts`

```typescript
export const INITIAL_LIST_LIMIT = 50; // Default number of users fetched initially
export const INITIAL_PAGE_NUMBER = 0; // Starting page index for user data fetching
```

### Dropdown Integration

To add the `UserSelectDropdown` to your React application:

```jsx
import { UserSelectDropdown } from 'path-to-dropdown-component';

function App() {
  return (
    <div className="App">
      <UserSelectDropdown />
    </div>
  );
}

export default App;
```

Customize and extend the dropdown to fit your application's needs.

## Additional Notes

For more information, troubleshooting, or contributions, please refer to the [issues](https://github.com/eutjeng/react-dropdown-component/issues) section of this repository or submit a pull request.

---

Developed by Evgeny Geyer - [GitHub](https://github.com/eutjeng) | Licensed under MIT

Remember to tailor any specific parts as necessary, particularly if there are additional setup steps, features, or usage instructions relevant to the project that need to be included in the documentation.
