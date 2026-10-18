# FlexiShop - Modern E-Commerce Platform

FlexiShop is a modern e-commerce platform built with Next.js, React, and Tailwind CSS. It features a curated selection of tech, fashion, and lifestyle products with a focus on clean design and user experience.

## Features

### 🏠 Home Page
- **Hero Section** - Eye-catching welcome banner with call-to-action
- **Category Showcase** - Quick access to Tech, Phones, and Fashion categories
- **Best Sellers** - Featured product grid with large product cards
- **Benefits Section** - Highlights shipping, security, and satisfaction guarantees
- **Newsletter Signup** - Email subscription for exclusive deals
- **Customer Reviews** - Social proof with customer testimonials

### 🛍️ Products Page
- **Advanced Filters** - Filter by categories and colors
- **Search Functionality** - Full-text product search
- **Sort Options** - Sort by price, name, and recency
- **Responsive Grid** - Adapts to mobile, tablet, and desktop
- **Product Cards** - Rich product information with images and pricing

### 📦 Product Detail Page
- **Image Gallery** - Desktop and mobile optimized galleries
- **Product Information** - Detailed specs, description, and pricing
- **Variant Selection** - Choose product options (colors, sizes, etc.)
- **Customer Reviews** - Display average rating and individual reviews
- **Review Form** - Submit new reviews with star ratings
- **Add to Cart** - One-click purchase functionality

### 🛒 Cart & Checkout
- **Cart Modal** - Slide-out cart panel with item management
- **Quantity Controls** - Adjust quantities on the fly
- **Price Calculation** - Automatic subtotal, tax, and total calculation
- **Shipping Display** - Shows calculated shipping at checkout
- **One-Click Checkout** - Seamless transition to payment

### 🔐 Authentication
- **Login Page** - User login interface
- **Signup Page** - New user registration with full details
- **Guest Checkout** - Option to checkout without creating an account
- **Form Validation** - Real-time validation and error messages

## Tech Stack

- **Frontend**: Next.js 15.5.6, React 19.2.0, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **State Management**: React Context API, React Hook Form
- **Animations**: Framer Motion, Motion React
- **Commerce**: Salesforce Commerce Cloud (SFCC) SDK
- **Icons**: Lucide React
- **Utilities**: Zod (validation), nuqs (URL state)

## Getting Started

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd flexishop
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Environment Setup**
   
   The application works in two modes:
   
   **Mock Mode** (Default - no setup required):
   - Uses pre-defined mock product data
   - Perfect for development and demo purposes
   - No API credentials needed
   
   **Live Mode** (Optional - requires SFCC credentials):
   Create a `.env.local` file with your Salesforce Commerce Cloud credentials:
   \`\`\`env
   SFCC_CLIENT_ID=your_client_id
   SFCC_ORGANIZATIONID=your_org_id
   SFCC_SECRET=your_secret
   SFCC_SHORTCODE=your_shortcode
   SFCC_SITEID=your_site_id
   SFCC_REVALIDATION_SECRET=your_revalidation_secret
   \`\`\`

4. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

5. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000)

## Project Structure

\`\`\`
flexishop/
├── app/
│   ├── page.tsx              # Home page
│   ├── auth/                 # Authentication pages
│   ├── shop/                 # Products listing
│   ├── product/[handle]/     # Product detail
│   └── layout.tsx            # Root layout
├── components/
│   ├── home/                 # Home page components
│   ├── cart/                 # Cart functionality
│   ├── layout/               # Navigation & layout
│   ├── products/             # Product components
│   └── ui/                   # shadcn/ui components
├── lib/
│   ├── sfcc/                 # Commerce Cloud integration
│   ├── utils.ts              # Utility functions
│   └── constants.ts          # App constants
└── public/                   # Static assets
\`\`\`

## Key Features

### 🎨 Design System
- Clean, minimalist aesthetic
- Consistent spacing and typography
- Responsive design that works on all devices
- Accessible components following WCAG guidelines

### 🔄 State Management
- React Context for cart state
- Optimistic UI updates for better UX
- URL-based filter state for shareable links

### ⚡ Performance
- Server-side rendering with Next.js
- Incremental static regeneration (ISR)
- Image optimization
- Code splitting and lazy loading

### 📱 Responsive Design
- Mobile-first approach
- Breakpoints for tablet and desktop
- Touch-friendly interface
- Fast page transitions

## Commerce Integration

### Mock Mode (Development)
The application includes comprehensive mock data for:
- 20+ Products across multiple categories
- 5 Product collections (Tech, Fashion, Lifestyle, etc.)
- Realistic pricing and descriptions
- Product variants and options

### Live Mode (Production)
Connect to Salesforce Commerce Cloud for:
- Real product catalog
- Live inventory management
- Order processing
- Payment integration

## Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Landing page with hero and featured products |
| `/shop` | Products | All products with filters and search |
| `/shop/:collection` | Products | Filtered by category |
| `/product/:handle` | Product Detail | Individual product with reviews |
| `/auth` | Authentication | Login and signup forms |
| `/cart` | Cart | (Modal - accessible from any page) |

## Customization

### Branding
- Update `app/layout.tsx` metadata for site title/description
- Modify colors in `app/globals.css` design tokens
- Update logo in `components/layout/header/logo-svg.tsx`

### Navigation
- Edit `navItems` in `components/layout/header/index.tsx`
- Add/remove categories in `lib/sfcc/mock/collections.ts`

### Products
- Update mock data in `lib/sfcc/mock/products.ts`
- Configure SFCC integration in `lib/sfcc/index.ts`

## Features Coming Soon

- User accounts and order history
- Wishlist functionality
- Product reviews moderation
- Advanced search filters
- Inventory management
- Email notifications
- Social login integration

## Support

For questions or issues, please open an issue in the repository or contact the development team.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

Built with Next.js and Tailwind CSS. Designed for modern e-commerce.
