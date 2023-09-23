# Documentation of the WiiQare Project

[![codecov](https://codecov.io/gh/WiiQare/frontend/branch/main/graph/badge.svg?token=72SLV6EFSP)](https://codecov.io/gh/WiiQare/frontend)
[![Tests](https://github.com/WiiQare/frontend/actions/workflows/jest.js.yml/badge.svg)](https://github.com/WiiQare/frontend/actions/workflows/jest.js.yml)

This Next.js project is a web application developed for a healthcare company called WiiQare. Its aim is to provide a robust and user-friendly technological platform to meet the specific needs of the medical industry. Through this platform, expatriates can send money to their family members living in African countries for medical purposes.

## Main features

1. **Purchasing a health pass**: This allows expatriates to be able to send money to family members who will only use it for healthcare

2. **Secure payment**: The platform offers a very secure means of payment either by Credit Card with Stripe or with Stable Coin crypto

3. **Transaction history**: Transaction history and also the means to make quick transfers with a beneficiary history system

4. **Tracking System**: Everything sends health and tracked password to know where it is in its use.

5. **Contact the WiiQare team**: Ability to send and receive messages from the WiiQare team.

## Setup and Installation

To install and run this Next.js project locally, follow the steps below:

1. Clone the GitHub repository to your local machine using the following command:

   ```shell
   git clone https://github.com/WiiQare/frontend.git
   ```

2. Navigate to the project directory :

   ```shell
   cd frontend
   ```

3. Build Docker image

   ```sh
   docker build -t frontend .
   ```

4. Run Docker image

   ```sh
   docker run -p 3000:3000 frontend
   ```

5. Open `http://localhost:3000` in your favorite browser

## Project structure

The structure of the project is organized as follows :

- `/pages`: This directory contains the different pages of the Next.js application, such as the home page, login pages, appointment management pages, etc.
- `/components`: This directory contains reusable components used throughout the application, such as forms, maps, navigation bars, etc. In this file the structuring is that studied in chemistry starting from the smallest element to the largest:
  - `atoms` : For basic components linked to any page functionality. Ex: Dropdown, button, modal, etc.
  - `molecules` : It is the composition of atoms to form such a reusable component,
  - `organisms`: Organisms is the main component of a page.
- `/api`: This directory contains the files that define the API endpoints used by the application to communicate with the backend.
- `/styles`: This directory contains CSS files and global styles used for formatting the application.
- `/public`: This directory contains static files, such as images, icons, etc.

## Contribute

Contributions to this project are welcome. If you would like to contribute, please follow these steps:

1. Fork the project from GitHub.

2. Create a branch for your feature or fix.

3. Make your changes.

4. Submit a pull request to the main branch of the project.

We appreciate your contributions to improve this project and make it even more useful for the health sector.

## Warning

This project is intended for healthcare purposes and should not be used in production without proper evaluation and adaptation to meet specific healthcare data security and privacy requirements.

## License

This project is distributed under the GNU GENERAL PUBLIC LICENSE. For more information, please see the LICENSE file.
