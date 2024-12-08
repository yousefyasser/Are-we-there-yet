# Are We There Yet?

## Table of Contents

- [Motivation](#motivation)
- [Build Status](#build-status)
- [Code Style](#code-style)
- [Deployment](#deployment)
- [Tech/Framework Used](#techframework-used)
- [Features](#features)
- [Code Examples](#code-examples)
- [Installation](#installation)
- [API References](#api-references)
- [Tests](#tests)
- [How to Use](#how-to-use)
- [Contribute](#contribute)
- [Credits](#credits)
- [License](#license)

## Motivation

The "Are We There Yet?" project aims to create a virtual trip planner that simplifies the process of planning and booking trips. By leveraging modern technologies such as MongoDB, JWT, Cloudinary, and Stripe, this project provides a seamless and secure experience for users to manage their travel plans. The motivation behind this project is to offer a comprehensive solution that addresses common pain points in trip planning, such as booking management, payment processing, and document handling, all while ensuring user data security and ease of use.

## Build Status

## Code Style

[![Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://prettier.io/)

This project uses Prettier for code formatting. Below is the Prettier configuration used:

```json
{
  "tabWidth": 2,
  "printWidth": 120,
  "trailingComma": "es5",
  "arrowParens": "always",
  "semi": true,
  "singleQuote": true
}
```

### File Structure

    ├── assets
    |
    ├── backend
    │   ├── src
    │   |   ├── config
    │   |   ├── constants
    │   |   ├── controllers
    │   |   ├── database
    │   |   |   ├── models
    │   |   ├── exceptions
    │   |   ├── middlewares
    │   │   |   ├── auth
    │   |   ├── routes
    │   |   ├── services
    │   |   ├── types
    │   |   ├── app.ts
    │   |   ├── server.ts
    │   ├── tests
    |   ├── .env
    |   ├── .gitignore
    |   ├── package.json
    |   ├── tsconfig.json
    |   ├── tsconfig.test.json
    |
    ├── frontend
    │   ├── components
    │   ├── lib
    │   ├── modules
    │   |   ├── Activity
    │   |   ├── Admin
    │   |   ├── Advertiser
    │   |   ├── Auth
    │   |   ├── Booking
    │   |   ├── Category
    │   |   ├── shared
    │   |   ├── etc.
    ├── .gitignore
    ├── README.md
    ├── .ignore
    ├── .prettierrc

#### Backend .env template

    # Server Port
    PORT=8000

    # MongoDB Connection URI
    MONGO_URI=mongodb+srv:<username>:<password>@<cluster-url>/<database>

    # JWT Token Secret
    TOKEN_SECRET=your_token_secret

    # Cloudinary Configuration
    CLOUDINARY_URL=cloudinary://<api

    STRIPE_SECRET_KEY=your_stripe_secret_key
    # Email Credentials
    EMAIL=your_email
    PASSWORD=your_email_password

### Branch naming convention

    backend/root -> deployed to production
    backend/dev -> where all the development happens. Our code is merged here before being deployed to production
    backend/feat/feature -> where you work on your feature

    frontend/root -> deployed to production
    frontend/dev -> where all the development happens. Our code is merged here before being deployed to production
    frontend/feat/feature -> where you work on your feature

## Screenshots

## Tech/Framework Used

- Node.js
- Express
- React
- MongoDB
- TypeScript

- Tailwind CSS
- JWT
- Jest
- Stripe
- Cloudinary
- Nodemailer
- Render

## Features

- **User Authentication:** Secure user authentication using JWT.
- **Booking Management:** Easy and efficient booking management system.
- **Payment Processing:** Seamless payment processing with Stripe integration.
- **Cloud Storage:** Store and manage documents and images using Cloudinary.
- **Responsive Design:** User-friendly and responsive design for all devices.
- **Admin Dashboard:** Comprehensive admin dashboard for managing users, bookings, and more.
- **Email Notifications:** Automated email notifications for booking confirmations and updates.
- **Search and Filter:** Advanced search and filter options for finding trips and activities.
- **Unit Testing:** Robust unit testing with Jest to ensure code quality and reliability.

## Code Examples

## Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name

   ```

2. **Install dependencies:**

   ```sh
   cd backend
   npm install
   cd ../frontend
   npm install

   ```

3. Set up your `.env` file in the backend folder
   create a `.env` file in the backend folder and add the following:

   ```sh
   # Server Port
    PORT=8000

    # MongoDB Connection URI
    MONGO_URI=mongodb+srv:<username>:<password>@<cluster-url>/<database>

    # JWT Token Secret
    TOKEN_SECRET=your_token_secret

    # Cloudinary Configuration
    CLOUDINARY_URL=cloudinary://<api

    STRIPE_SECRET_KEY=your_stripe_secret_key
    # Email Credentials
    EMAIL=your_email
    PASSWORD=your_email_password
   ```

4. **Run the app:**
   ```sh
   cd backend
   npm start
   cd ../frontend
   npm start
   ```

## Deployment

This project is deployed on Render.
You can access it at [Are We There Yet](https://are-we-there-yet-mirror-1.onrender.com/).

## API References

## Tests

## How to Use

1. **Sign Up / Log In:**

   - Visit the website and create a new account or log in with your existing credentials.

2. **Browse Trips:**

   - Explore the available trips and activities. Use the search and filter options to find trips that match your preferences.

3. **Book a Trip:**

   - Select a trip and proceed to book it. Fill in the required details and make the payment using the integrated Stripe payment gateway.

4. **Manage Bookings:**

   - View and manage your bookings from your user dashboard. You can cancel or reschedule your bookings as per the cancellation policy.

5. **Admin Dashboard:**

   - If you are an admin, access the admin dashboard to manage users, bookings, and other administrative tasks.

6. **Receive Notifications:**

   - Check your email for booking confirmations and updates. Ensure that you have provided a valid email address.

7. **Upload Documents:**

   - Use the Cloudinary integration to upload and manage documents and images related to your trips.

8. **Unit Testing:**
   - Run unit tests to ensure the reliability and quality of the codebase. Use the following command to run tests:
     ```sh
     npm run test
     ```

By following these steps, you can effectively use the "Are We There Yet?" application to plan and manage your trips.

## Contribute

We welcome contributions to enhance the "Are We There Yet?" project. Here are some ways you can contribute:

1. **Report Bugs:**

   - If you encounter any bugs or issues, please report them by creating an issue on the GitHub repository.

2. **Suggest Enhancements:**

   - Have ideas to improve the project? Suggest new features or enhancements by opening an issue. Some potential enhancements include:
     - Real-time currency conversion to provide accurate pricing for users from different countries.
     - Integration with additional payment gateways to offer more payment options.
     - Improved search and filter functionality to help users find trips more easily.
     - Enhanced user profile management with more customization options.
     - Adding multi-language support to cater to users from different regions.

3. **Submit Pull Requests:**

   - If you have implemented a bug fix or a new feature, submit a pull request. Please ensure your code follows the project's coding standards and includes appropriate tests.

4. **Improve Documentation:**

   - Help us improve the documentation by adding more detailed instructions, code examples, or clarifying existing content.

5. **Write Tests:**
   - Contribute by writing unit tests to increase the test coverage and ensure the reliability of the codebase.

### How to Contribute

1. **Fork the Repository:**

   - Fork the repository to your GitHub account.

2. **Clone the Repository:**

   - Clone the forked repository to your local machine:
     ```sh
     git clone https://github.com/Advanced-computer-lab-2024/Are-we-there-yet
     cd Are-we-there-yet
     ```

3. **Create a Branch:**

   - Create a new branch for your feature or bug fix:
     ```sh
     git checkout -b feature/your-feature-name
     ```

4. **Make Changes:**

   - Make your changes to the codebase.

5. **Commit Changes:**

   - Commit your changes with a descriptive commit message:
     ```sh
     git commit -m "feat: <your-feature-name>"
     ```
   - Please ensure your commit messages follow the conventional commit format. For example:
     - feat: Add new feature
     - fix: Correct typo in file
     - refactor: Refactor code for better performance
     - test: Add unit tests for component

6. **Push Changes:**

   - Push your changes to your forked repository:
     ```sh
     git push origin feature/your-feature-name
     ```

7. **Submit a Pull Request:**
   - Go to the original repository on GitHub and submit a pull request.

We appreciate your contributions and look forward to collaborating with you to improve the "Are We There Yet?" project.

## Credits

- [Nada Abdel-Fattah](https://github.com/Nada-abdelfattah): Product Manager (Supervising TA)

---

- [Abdelrahman Mohammed](https://github.com/Sherlemious)
- [Ahmed Gado](https://github.com/Hamada-Gado)
- [Marwan Mohamed Elsisi](https://github.com/MarwanSiSi)
- [MoGamal2](https://github.com/MoGamal2)
- [Mostafa Hisham Hamdy](https://github.com/mostafahisham03)
- [Mohamed Ahmed El Sawy](https://github.com/Sawy03)
- [Omar Goba](https://github.com/Omar-Goba)
- [RasheedAtia](https://github.com/RasheedAtia)
- [Seifeldin Khaled](https://github.com/SeifAbbas)
- [Yousef Yasser](https://github.com/yousefyasser)

### Aid Used

#### Documentation

- [ExpresJs](https://expressjs.com/)
- [MongoDB](https://docs.mongodb.com/)
- [React](https://reactjs.org/)
- [Stripe](docs.stripe.com)
- [axios](https://axios-http.com/docs/intro)

#### Video tutorials

| Description | Link                                                                                         |
| ----------- | -------------------------------------------------------------------------------------------- |
| Google Maps | [How to load Maps JavaScript API in React](https://youtu.be/PfZ4oLftItk?si=i8vNiaWh-pBzvdad) |

## License

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
