# Contributing to Quine Checkcup

👋 Welcome! We appreciate your interest in contributing to the repository. Whether you want to report a bug, suggest an enhancement, or contribute code, we're thrilled to have you as part of the community.

## Getting Started

0. Fork the repository.

1. Clone your forked repository to your local machine:

    ```bash
    git clone https://github.com/priyanshuverma-dev/quine-checkcup.git
    cd quine-checkcup
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
   
6. Create a branch for your changes:

    ```bash
    git checkout -b feature/your-feature
    ```

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

## Making Changes

- If you are fixing a bug, please provide steps to reproduce it.

- Ensure your code follows the project's coding standards.

- Write tests to cover your changes.


## Submitting Changes

1. Push your changes to your forked repository:

    ```bash
    git push origin feature/your-feature
    ```

2. Open a pull request against the main repository's `main` branch.

3. Provide a clear and concise description of your changes.

4. Ensure your pull request passes the automated CI checks.

## Code of Conduct

This project follows the [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to priyanshu.creator@hotmail.com.

## Questions and Discussions

If you have questions or want to discuss ideas, feel free to open an issue or join our community discussions.

Thank you for contributing!
