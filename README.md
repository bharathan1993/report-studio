# Report Studio

Report Studio is a powerful data querying and reporting application built with React, designed to help users efficiently query and analyze their billing and revenue data. This modern web application provides an intuitive interface for writing SQL queries, exploring data schemas, and visualizing results.

## Features

- **Interactive SQL Query Editor**: Write and execute SQL queries in a user-friendly editor
- **Schema Explorer**: Browse through available data objects and their fields with an expandable sidebar
- **Smart Search**: Search through schema objects and fields to quickly find what you need
- **Query Results Visualization**: View query results in a clean, tabular format
- **Save and Download**: Save your frequently used queries and download results for further analysis

## Core Components

### Data Objects
The application provides access to key business objects including:
- **Account**: Account Number, Account Balance, Auto Pay, Status, Currency, ID
- **Subscription**: Name, Initial Term, Status, Account Id
- **Payments**: Amount, Status, Payment Number, Account Id

### User Interface
- Modern, responsive design built with Tailwind CSS
- Interactive components using Radix UI primitives
- Clean and intuitive layout for optimal user experience

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Install dependencies:
```bash
cd report-studio-main
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Technology Stack

- **React**: Frontend library for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Radix UI**: Unstyled, accessible UI components
- **React Feather**: Icon library
- **Web Vitals**: Performance monitoring

## Development

### Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
