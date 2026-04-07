# News Dashboard

A modern news aggregation dashboard that automates news collection from multiple sources using n8n and displays them in a beautiful Next.js interface.

## Features

- 📰 **Multi-source news aggregation** - Fetches news from BBC, CNN, Al Jazeera, The Guardian, and more
- 🔄 **Automated workflow** - n8n workflow automatically fetches and processes news articles
- 🎨 **Beautiful dashboard** - Clean, responsive UI built with React and Tailwind CSS
- 🔍 **Advanced filtering** - Filter by status, source, and search by keywords
- 📊 **Statistics** - View article statistics and manage content
- 💾 **Supabase database** - Reliable data storage and real-time updates
- ⏰ **Auto-refresh** - Dashboard updates every 30 seconds

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Backend/Database**: Supabase
- **Automation**: n8n workflow
- **Deployment**: Vercel

## Prerequisites

- Node.js 18+ and npm
- Supabase account and project
- n8n instance (cloud or self-hosted)
- Environment variables setup

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd news-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Configure these variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   N8N_WEBHOOK_URL=your_n8n_webhook_url
   ```

## Setup Guide

### 1. Supabase Setup
- Create a new Supabase project
- Create a `posts` table with the following schema:
  ```sql
  - id (uuid, primary key)
  - created_at (timestamp)
  - published_at (timestamp)
  - source_url (text)
  - article_title (text)
  - teaser (text)
  - summary (text)
  - tags (text)
  - image_prompt (text)
  - source_site (text)
  - status (text: 'new' or 'published')
  ```

### 2. n8n Workflow
- Import the provided `n8n-workflow.json` into your n8n instance
- Configure the news source integrations (BBC, CNN, Al Jazeera, The Guardian)
- Set up Supabase connection in the workflow
- Enable the webhook trigger
- Copy the webhook URL to your environment variables

### 3. Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## Usage

### Getting News
1. Click the **"Get new news"** button on the dashboard
2. The n8n workflow is triggered via webhook
3. Articles are fetched from configured news sources
4. Data is stored in Supabase and displayed in the dashboard
5. The dashboard auto-refreshes every 30 seconds

### Filtering & Searching
- **Search**: Use the search bar to find articles by title or teaser
- **Status Filter**: View by "new" or "published" articles
- **Source Filter**: Filter articles by news source
- **Statistics**: View article counts and status breakdown

## Project Structure

```
news-dashboard/
├── app/
│   ├── layout.tsx          # Main layout component
│   ├── page.tsx            # Dashboard home page
│   ├── globals.css         # Global styles
│   ├── api/
│   │   └── trigger/        # Webhook to trigger n8n workflow
│   └── post/
│       └── [id]/           # Post detail page (if implemented)
├── components/
│   ├── PostCard.tsx        # News article card component
│   ├── FilterBar.tsx       # Filtering controls
│   ├── StatsBar.tsx        # Statistics display
│   └── CopyButton.tsx      # Copy to clipboard utility
├── lib/
│   ├── supabase.ts         # Supabase client initialization
│   └── types.ts            # TypeScript types
├── public/                 # Static assets
└── .env.local              # Environment variables (add to .gitignore)
```

## API Routes

### POST `/api/trigger`
Triggers the n8n workflow to fetch new articles.

**Response:**
```json
{
  "success": true,
  "message": "Workflow triggered"
}
```

## n8n Workflow

The n8n workflow handles:
1. Fetching articles from multiple news sources
2. Processing and cleaning article content
3. Storing data in Supabase
4. Error handling and logging

See `n8n-workflow.json` for the complete workflow configuration.

## Build & Deployment

### Build for Production
```bash
npm run build
npm run start
```

### Deploy to Vercel
```bash
vercel deploy
```

1. Connect your GitHub repository
2. Add environment variables in Vercel project settings
3. Deploy automatically on commits to main branch

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `N8N_WEBHOOK_URL` | n8n webhook URL to trigger workflow |

## Troubleshooting

### "Failed. Make sure n8n workflow is active"
- Verify n8n instance is running
- Check webhook URL is correct in environment variables
- Ensure workflow is enabled in n8n

### No posts appearing
- Check Supabase connection and database
- Verify n8n workflow is completing successfully
- Check browser console for errors

### Slow loading times
- Check Supabase query performance
- Monitor n8n workflow execution time
- Consider implementing pagination for large datasets

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Support

For issues and questions:
- Check the [Troubleshooting](#troubleshooting) section
- Open an issue on GitHub
- Review n8n and Supabase documentation

## Future Enhancements

- [ ] Post detail page with full article view
- [ ] Image generation using AI for articles
- [ ] User authentication and saved articles
- [ ] Article categorization and tagging
- [ ] RSS feed export
- [ ] Email notifications for new articles
- [ ] Dark mode support
- [ ] Multi-language support

---

**Last Updated**: April 2026
