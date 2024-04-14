# Checkcup

Checkcup is a website monitoring tool that fetches the status of websites along with screenshots and active status. It is built using Next.js for the frontend and Puppeteer with Browserless in the backend.

## Features

- Fetches website status including HTTP status code, response time, and active status.
- Captures screenshots of websites for visual verification.
- Supports monitoring multiple websites simultaneously.

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/your-username/quine-checkcup.git
   ```

2. Install dependencies:

   ```
   cd checkcup
   bun install
   ```

3. Configure environment variables:

   Create a `.env` file in the root directory and provide the following variables:

   ```
   DATABASE_URL=your_database_url
   NEXT_PUBLIC_URL=server_url
   ```

   Replace `your_database_url` with the URL of your MongoDB database.
   Replace `server_url` with the URL of your server.

4. Install dependencies for the `server` directory:

   ```
   cd server
   bun install
   ```

5. Configure environment variables for the `server` directory:

   Create a `.env` file in the `server` directory and provide the following variables:

   ```
   BROWSERLESS_URL=browserless_url
   ```

   Replace `browserless_url` with the URL of your Browserless instance.

## Usage

1. Start the server:

   ```
   cd server
   bun run dev
   ```

2. Generate Prisma client:

   ```
   bunx prisma generate
   ```

3. Start the development server:

   ```
   bun run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`.

5. Enter the URLs of the websites you want to monitor and click on the "Check Status" button.

6. View the status, response time, and screenshot of each website.

## Deployment

To deploy Checkcup to production, follow these steps:

1. Build the Next.js app:

   ```
   bun run build
   ```

2. Start the production server:

   ```
   bun start
   ```

3. Visit the deployed URL to access Checkcup.

4. To deploy the server, follow the same steps as above in server directory.

## Technologies Used

- Next.js
- Puppeteer
- Browserless

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
