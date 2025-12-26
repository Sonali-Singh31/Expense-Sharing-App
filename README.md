# Expense Sharing Application
A robust backend system built with Node.js, TypeScript, and Prisma 7. This application allows users to manage shared expenses within groups using sophisticated split logic (Equal, Exact, and Percentage).

# Getting Started

Prerequisites
* Node.js (v18 or higher)

* PostgreSQL (Running locally on port 5432 or 5433)

* npm or yarn

Installation & Setup
1. Clone the repository and install dependencies:

    Bash
    npm install

2. Configure Environment Variables: Create a .env file in the root directory and add the following:

    Code snippet
    PORT=3000
    DATABASE_URL="postgresql://postgres:YOUR_ENCODED_PASSWORD@localhost:5432/expense_db?schema=public"
    JWT_SECRET="your_generated_random_secret"

Note: If your password has special characters like @ or !, encode them (e.g., @ becomes %40).

3. Initialize the Database: Push your schema to PostgreSQL and generate the Prisma Client:

    Bash
    npx prisma db push
    npx prisma generate

4. Start the Development Server:

    Bash
    npm run dev
    The server will be live at http://localhost:3000

# Project Architecture

Tech Stack
* Language: TypeScript

* Runtime: Node.js (Express.js)

* ORM: Prisma 7 with Driver Adapters

* Database: PostgreSQL

* Security: JWT for Authentication & bcrypt for password hashing

Database Schema
* User: Stores authentication and profile data.

* Group: Manages collections of users who share expenses.

* Expense: Records the total bill and payment details.

* Split: Detailed breakdown of how much each user owes for a specific expense.

# How it Works (Core Features)

1. Authentication
    * Users register with an email and password.

    * Login returns a JWT Token which must be sent in the Authorization header as a Bearer token for all other requests.

2. Group Management
    * Users can create groups and add members via their User IDs.

    * This prevents "orphaned" expenses by enforcing a groupId relationship.

3. Expense Splitting Logic
The SplitService handles three mandatory split types:

    * EQUAL: Automatically divides the total by the number of participants.

    * EXACT: Users specify the exact amount for each person; must sum to the total.

    * PERCENTAGE: Users specify percentages; must sum to 100%.

4. Balance Tracking & History
    * Real-time Totals: Queries the Split table to show users "What they owe" vs "What they are owed".

    * History: Retrieve all expenses for a group to see past transactions.