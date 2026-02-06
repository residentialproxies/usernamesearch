# UsernameSearch.io 🔍

A comprehensive username availability checker that searches across 400+ social media platforms and websites. Built with Next.js 14, TypeScript, and Tailwind CSS.

## ✨ Features

- **400+ Platform Support** - Check username availability across major social networks, developer platforms, and niche communities
- **Real-time Checking** - Instant availability status with concurrent API requests
- **AI Username Generator** - Powered by Google Gemini for creative username suggestions
- **Smart Ranking** - Results sorted by platform popularity using SimilarWeb data
- **Category Filtering** - Filter by Social Media, Development, Gaming, Professional, and more
- **Dark Mode** - Full dark/light theme support
- **API Access** - RESTful API for developers (Pro plan)
- **Responsive Design** - Mobile-first approach with excellent UX

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **API**: Next.js API Routes
- **AI**: Google Gemini API
- **Payment**: NowPayments (optional)
- **Deployment**: Cloudflare Workers (OpenNext) + D1

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/usernamesearch.io.git

# Navigate to project directory
cd usernamesearch.io

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Run development server
npm run dev
```

## 🔧 Environment Variables

Create a `.env.local` file with:

```env
# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# WhatsMyNameApp API key (required for logged-in checks)
WHATSMYNAME_API_KEY=your_whatsmyname_api_key

# Gemini AI API Key (for username generation)
GEMINI_API_KEY=your_gemini_api_key

# NowPayments (optional; required only if you enable Pro purchases)
NOWPAYMENTS_API_KEY=your_nowpayments_api_key
NOWPAYMENTS_IPN_SECRET=your_nowpayments_ipn_secret
```

## 📁 Project Structure

```
usernamesearch.io/
├── app/                 # Next.js App Router pages
│   ├── api/            # API routes
│   ├── tools/          # Tool pages
│   └── layout.tsx      # Root layout
├── components/         # React components
│   ├── ui/            # UI components (shadcn)
│   ├── layout/        # Layout components
│   └── search/        # Search components
├── lib/               # Core libraries
│   ├── services/      # Business logic
│   ├── data/          # Static data (sites.json)
│   └── utils/         # Utility functions
├── public/            # Static assets
└── agents/            # Development agent docs
```

## 🛠️ Development

### Running Locally

```bash
# Development mode with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

### API Endpoints

- `POST /api/check` - Check username availability
- `POST /api/generate` - Generate AI usernames
- `GET /api/sites` - Get supported sites list

## 📊 Features by Plan

### Free Plan
- Check 100+ popular platforms
- 10 searches per day
- Basic username availability
- Category filtering

### Pro Plan ($10)
- Check 400+ platforms
- 500 API requests
- Bulk checking
- Export results
- Priority support

### Enterprise
- Unlimited API requests
- Custom integrations
- White-label options
- SLA guarantee

## 🚢 Deployment

### Cloudflare Workers (OpenNext) + D1

```bash
# 1) Create D1 database (once)
wrangler d1 create usernamesearch-db

# 2) Apply migrations (once)
wrangler d1 migrations apply usernamesearch-db --remote

# 3) Build OpenNext worker
npm run build:cf

# 4) Deploy (requires wrangler auth + wrangler.jsonc configured)
npm run deploy
```

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [WhatsMyName Project](https://github.com/WebBreacher/WhatsMyName) for platform data
- [shadcn/ui](https://ui.shadcn.com/) for UI components
- [Cloudflare Workers](https://developers.cloudflare.com/workers/) for hosting

## 📧 Contact

- Website: [usernamesearch.io](https://usernamesearch.io)
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: support@usernamesearch.io

---

Built with ❤️ using Next.js and TypeScript
