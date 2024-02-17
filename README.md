# Business Card Web App

This is a web application designed to create, manage, update, and delete digital business cards. Users can input their personal details such as name, description, interests, and social media links, and customize their cards according to their preferences. The application is built with a modern stack including React for the frontend, Tailwind CSS for styling, and Express.js for the backend. Data is stored in a MongoDB database, and validation is handled using Zod.

## Features

1. **Create Card:** Users can create a digital business card by providing their name, description, interests, and social media links.
2. **Retrieve All Cards:** Users can view a list of all created cards.
3. **Update Card:** Users have the ability to update their existing cards, modifying any of the provided details.
4. **Delete Card:** Users can delete their cards from the database.
5. **Dynamic Input Fields:** Users can add as many interests and social media links as they want, allowing for flexible customization of their cards.

## Technologies Used

- **Frontend:**
  - React: A JavaScript library for building user interfaces.
  - Tailwind CSS: A utility-first CSS framework for rapidly building custom designs.
  - Shadcn UI: A collection of reusable web component building blocks designed for accessibility, customization, and open-source collaboration.

- **Backend:**
  - Express.js: A web application framework for Node.js, providing a robust set of features for building backend for web and mobile applications.
  - Zod: A TypeScript-first schema declaration and validation library.

- **Database:**
  - MongoDB: A NoSQL database program, using JSON-like documents with schema.

## Installation

1. Clone the repository:
```
git clone https://github.com/mohammadashphak/business_card_app.git
```

2. Navigate to the backend directory and install dependencies:
```
cd backend
npm install
```

3. Navigate to the frontend directory and install dependencies:
```
cd ../frontend
npm install
```

4. Start the backend server:
```
npm run start
```

5. Start the frontend development server:
```
npm run dev
```

6. Access the application in your browser at `http://localhost:5173`.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/new-feature`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature/new-feature`).
6. Create a new Pull Request.