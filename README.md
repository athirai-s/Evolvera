# AI Pathfinder

A minimalistic, attractive 3-step web app that helps users discover AI tools based on their persona and profession.

## Features

- **Persona Selection**: Choose from 6 fun persona types
- **Role-based Recommendations**: Get AI tools tailored to your specific profession  
- **Latest AI News**: Aggregated updates from major AI companies and communities
- **Time Tracking**: Track time spent with different AI tools
- **Persona Insights**: See how you compare to others with your persona
- **Overlay Demo**: Mock Chrome overlay showing contextual AI suggestions

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **OpenAI API** for tool recommendations
- **RSS parsing** for news aggregation

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   Add your OpenAI API key to `.env.local`:
   ```
   OPENAI_API_KEY=your-openai-api-key-here
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                 # Next.js app directory
│   ├── api/            # API routes
│   │   ├── tools/      # OpenAI tool recommendations
│   │   └── news/       # RSS news aggregation
│   ├── plan/           # Main recommendations page
│   ├── role/           # Role selection page
│   ├── overlay-demo/   # Chrome overlay demo
│   └── page.tsx        # Persona selection page
├── components/         # Reusable React components
├── types/             # TypeScript type definitions
└── lib/               # Utility functions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## API Endpoints

### POST /api/tools
Generates AI tool recommendations based on persona and role using OpenAI.

### GET /api/news  
Aggregates latest AI news from multiple RSS feeds and Hacker News.

## Design Principles

- **Minimal & Clean**: White background, generous whitespace
- **Tailwind-first**: No external UI libraries
- **Mobile-responsive**: Works great on all screen sizes
- **Accessible**: Proper focus states and semantic HTML

## License

MIT License - see LICENSE file for details.