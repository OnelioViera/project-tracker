# AutoCAD Project Tracker

A modern project tracking application built with Next.js, shadcn/ui, and MongoDB Atlas for managing Lindsay Precast Design Projects.

## Features

- ✅ Create, read, update, and delete projects
- ✅ Manage custom product types
- ✅ Filter projects by status
- ✅ Track deadlines, clients, and notes
- ✅ Beautiful, modern UI with shadcn/ui components
- ✅ MongoDB Atlas integration for persistent storage
- ✅ Responsive design

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Styling**: Tailwind CSS
- **Database**: MongoDB Atlas
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (free tier works great)
- npm or yarn package manager

### 1. Clone or navigate to the project

```bash
cd project-tracker
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account or sign in
3. Create a new cluster (free tier is fine)
4. Click "Connect" → "Connect your application"
5. Copy your connection string
6. Replace `<password>` with your database user password
7. Replace `<database>` with your database name (e.g., `project-tracker`)

### 4. Configure environment variables

Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your MongoDB connection string:

```
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/project-tracker?retryWrites=true&w=majority
```

### 5. Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Managing Projects

1. **Add a Project**: Click "New Project" button
2. **Edit a Project**: Click the edit icon on any project card
3. **Delete a Project**: Click the trash icon on any project card
4. **Filter Projects**: Use the filter buttons to view projects by status

### Managing Product Types

1. Click "Manage Products" button
2. Add new product types using the input field
3. Delete product types (will remove from all projects)
4. Product types are automatically sorted alphabetically

### Project Statuses

- **Draft**: Initial state for new projects
- **In Review**: Projects under review
- **Revision Needed**: Projects requiring changes
- **Approved**: Approved projects
- **Complete**: Finished projects

## Project Structure

```
project-tracker/
├── app/
│   ├── api/
│   │   ├── projects/          # Project CRUD endpoints
│   │   └── product-types/     # Product type CRUD endpoints
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Main application page
├── components/
│   └── ui/                    # shadcn/ui components
├── lib/
│   ├── db.ts                  # Database helpers
│   ├── mongodb.ts             # MongoDB connection
│   └── utils.ts               # Utility functions
├── types/
│   └── index.ts               # TypeScript types
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## API Routes

### Projects

- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create a new project
- `GET /api/projects/[id]` - Get a specific project
- `PUT /api/projects/[id]` - Update a project
- `DELETE /api/projects/[id]` - Delete a project

### Product Types

- `GET /api/product-types` - Get all product types
- `POST /api/product-types` - Create a new product type
- `DELETE /api/product-types/[id]` - Delete a product type

## Building for Production

```bash
npm run build
npm start
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add your `MONGODB_URI` environment variable
4. Deploy!

### Other Platforms

This app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- AWS Amplify
- Digital Ocean App Platform

## Customization

### Adding More Fields

1. Update the `Project` type in `types/index.ts`
2. Update the API routes in `app/api/projects/`
3. Update the form in `app/page.tsx`

### Changing Statuses

Edit the `STATUSES` array in `types/index.ts` to add or modify project statuses.

### Styling

- Modify `app/globals.css` for global styles
- Update `tailwind.config.ts` for Tailwind customization
- Adjust color schemes in the CSS variables

## Troubleshooting

### MongoDB Connection Issues

- Verify your connection string is correct
- Check that your IP address is whitelisted in MongoDB Atlas
- Ensure your database user has the correct permissions

### Build Errors

- Clear `.next` folder: `rm -rf .next`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.

