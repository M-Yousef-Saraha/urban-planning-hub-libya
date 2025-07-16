# Welcome to your Lovable project

## Library Document Request System

This project now includes a comprehensive library system where users can:

### Features
- **Document Catalog**: Browse available documents with search and filtering
- **Request System**: Users can request documents via a detailed form
- **Email Integration**: Automatic email notifications for both users and administrators
- **Categories**: Documents organized by type (guides, laws, standards, reports, maps, studies)
- **Responsive Design**: Works seamlessly on all devices

### How it Works
1. Users browse the digital library section
2. They can search and filter documents by category
3. When they find a document they need, they click "طلب الوثيقة" (Request Document)
4. A detailed form opens where they provide:
   - Personal information (name, email, phone)
   - Purpose of request
   - Urgency level
   - Additional notes
5. Upon submission, the system:
   - Sends a confirmation email to the user
   - Notifies administrators about the new request
   - Processes the request within 24 hours
   - Emails the document to the user

### Technical Implementation
- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS with RTL support
- **Email Service**: Modular email service with HTML templates
- **State Management**: React hooks for form handling
- **Notifications**: Toast notifications for user feedback

### Backend Integration
To make this fully functional, you'll need to:
1. Set up a backend API endpoint at `/api/send-document`
2. Integrate with an email service (SendGrid, AWS SES, etc.)
3. Store document requests in a database
4. Implement document storage and retrieval system
5. Add authentication for admin panel

## Project info

**URL**: https://lovable.dev/projects/04fe7e34-1d2d-4b75-b73f-f0133e924f4c

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/04fe7e34-1d2d-4b75-b73f-f0133e924f4c) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/04fe7e34-1d2d-4b75-b73f-f0133e924f4c) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
