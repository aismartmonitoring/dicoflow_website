# DicoFlow — Enterprise RIS/PACS Website

Enterprise product showcase website for the DicoFlow Radiology Information System & Picture Archiving and Communication System.

## Tech Stack

- **Next.js 15** (App Router, TypeScript, Turbopack)
- **React 19** with Framer Motion animations
- **Tailwind CSS 4** design system
- **Radix UI** accessible primitives

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customization

**Edit one file** before deployment:

```
src/config/site-config.ts
```

This controls: company name, legal entity, contact info, address, social links, admin settings, and more. All components read from this file.

## Sections

| # | Section | Description |
|---|---------|-------------|
| 1 | Header | Sticky nav with mega-dropdown, mobile drawer |
| 2 | Hero | Animated DICOM viewer mockup, stats bar |
| 3 | Trusted By | Infinite scrolling partner logos |
| 4 | Product Overview | Acquire → Process → Deliver flow |
| 5 | Tier Showcase | Interactive T1-T5 cards with UI mockups |
| 6 | Feature Deep Dive | 10-module tabbed interface |
| 7 | Workflow | 14-stage lifecycle visualization |
| 8 | DICOM Capabilities | Stats, modalities, pipeline |
| 9 | Compliance | HIPAA, NABH, IHE badges |
| 10 | Processing | 6 engine animated mockups |
| 11 | Viewer | Cornerstone3D mockup |
| 12 | Enterprise | Multi-branch, SLA, RBAC |
| 13 | Testimonials | Customer quotes |
| 14 | Pricing | 5-tier comparison table |
| 15 | Enquiry Form | Contact form → admin dashboard |
| 16 | Footer | Site-config driven |

## Admin Dashboard

Access at `/admin` with your `ADMIN_API_KEY`.

- View all enquiry submissions
- Search & filter
- Export CSV
- API: `GET /api/admin/enquiries` (header: `x-api-key`)

## Deployment

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for full guides:

- **Azure App Service** — `az webapp up`
- **AWS Elastic Beanstalk** — `eb deploy`
- **Google Cloud Run** — `gcloud run deploy`
- **Heroku** — `git push heroku main`
- **Docker** — `docker-compose up -d`
- **Vercel** — `vercel`

### Docker

```bash
ADMIN_API_KEY=your-key docker-compose up -d
```

### GitHub Actions

CI/CD pipeline at `.github/workflows/deploy.yml` supports Azure, AWS, GCP, and Heroku. Add your secrets to the repository settings.

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `ADMIN_API_KEY` | Yes | Admin dashboard access key |
| `NEXT_PUBLIC_COMPANY_NAME` | No | Override company name |
| `NEXT_PUBLIC_SITE_URL` | No | Canonical URL |

## Project Structure

```
src/
├── app/
│   ├── page.tsx          # Main page (all sections)
│   ├── layout.tsx        # Root layout with SEO
│   ├── admin/page.tsx    # Admin dashboard
│   └── api/
│       ├── health/       # Health check endpoint
│       ├── enquiry/      # POST enquiry submissions
│       └── admin/enquiries/ # GET admin enquiry list
├── components/           # All page sections
├── config/
│   └── site-config.ts    # ← Edit this before deployment
└── lib/
    ├── constants.ts      # All product data
    ├── types.ts          # TypeScript interfaces
    └── animations.ts     # Framer Motion variants
```

## License

Proprietary. All rights reserved.
