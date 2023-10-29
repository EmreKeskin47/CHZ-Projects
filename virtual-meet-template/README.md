# Virtual Meet Tempalte

Template for starting the Virtual Meet in CHZ network, using Moralis

## Configuration Process

Follow these steps to properly configure your environment for the application.

### Step 1: Environment File Setup

1. Navigate to the root directory of the project, ensuring you are at the top-level (same level as the `src` directory, not within it).
2. Create a new file and name it `.env.local`. This file will store important global settings required for the application to function correctly.

### Step 2: Environment Variables

Populate the `.env.local` file with the necessary environment variables. These are crucial for linking the application with your specific resources on Thirdweb. Below is a list of the required variables:

-   `NEXT_PUBLIC_MORALIS_API_KEY`: Your unique API key from Moralis.

### Step 3: Dependency Installation

Execute the following command in your terminal to install the project dependencies:

```sh
npm install
```

### Step 4: Launching the Development Server

To start the development server, run:

```sh
npm run dev
```
