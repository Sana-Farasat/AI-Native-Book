# Implementation Plan: Physical AI & Humanoid Robotics Textbook

**Branch**: `001-create-textbook` | **Date**: 2025-12-11 | **Spec**: [specs/001-create-textbook/spec.md](../001-create-textbook/spec.md)
**Input**: Feature specification from `/specs/001-create-textbook/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Create a complete Docusaurus v3 textbook on "Physical AI & Humanoid Robotics" with custom dark purple theming, interactive components, 7 chapters with ROS 2 code examples, hardware guide, RAG chatbot using Gemini API, and PDF download functionality. The site will feature custom dark purple theming, professional presentation with 10/10 design quality, and all components required by the project constitution.

## Technical Context

**Language/Version**: TypeScript/JavaScript (for Docusaurus v3), Python 3.8+ (for ROS 2 code examples)
**Primary Dependencies**: Docusaurus v3 (classic template), MDX v3, @docusaurus/module-type-aliases, @docusaurus/plugin-content-docs, @docusaurus/plugin-content-pages, @docusaurus/plugin-client-redirects, @docusaurus/plugin-google-analytics, @docusaurus/plugin-google-gtag, @docusaurus/plugin-sitemap, @docusaurus/theme-classic, @docusaurus/theme-common, @docusaurus/theme-search-algolia, @docusaurus/types, @mdx-js/react, clsx, prism-react-renderer, react, react-dom
**Storage**: Static file storage via GitHub Pages
**Testing**: Jest for JavaScript components, manual testing of ROS 2 code examples in simulation environment
**Target Platform**: Web application (GitHub Pages hosting)
**Project Type**: Web application
**Performance Goals**: Fast load times with optimized images, 90%+ Lighthouse scores, all content loads within 3 seconds on average connection
**Constraints**: Must be compatible with Docusaurus v3, support mobile responsiveness, integrate with Algolia DocSearch, support Urdu language translation
**Scale/Scope**: Single textbook with 7 chapters, 2 bonus pages (hardware guide, RAG chatbot), interactive components, estimated 5,500-6,000 words total

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

For the Physical AI and Humanoid Robotics textbook project, ensure all plans comply with these constitutional principles:
- All content must cite primary sources only (official NVIDIA docs, ROS 2 documentation, IEEE/arXiv papers, Unitree/Robotis GitHub repos, Isaac Sim tutorials, or official textbooks)
- All technical claims must be verified against the cited primary sources before writing
- APA 7th edition citation format required for both in-text and References section
- Zero plagiarism - every sentence must be paraphrased in original words
- Each chapter must contain at least 2–3 visual elements: screenshots, diagrams, architecture figures, or Mermaid flowcharts
- Content must be engaging and student-friendly for university students and hackathon participants
- All content must use MDX format only (so code blocks, tabs, admonitions, and interactive components render perfectly in Docusaurus)
- Include runnable ROS 2 Python code snippets with proper syntax highlighting
- Minimum 15 high-quality sources required across the entire book (at least 10 must be peer-reviewed papers or official NVIDIA/ROS documentation)
- All content must be compatible with Docusaurus v3 (classic template), MDX v3, dark mode enabled, Algolia DocSearch, responsive for mobile
- Deployment to GitHub Pages (username.github.io repo) with GitHub Actions CI/CD
- All code examples must be tested and verified to run correctly

## Project Structure

### Documentation (this feature)

```text
specs/001-create-textbook/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
frontend/
├── docusaurus.config.ts      # Docusaurus configuration with custom theme, i18n, Algolia
├── package.json              # Dependencies including Docusaurus and custom theme packages
├── tsconfig.json             # TypeScript configuration
├── sidebars.ts               # Auto-generated sidebar with all 7 chapters + bonus pages
├── static/
│   ├── img/                  # All images, logos, and visual elements
│   │   ├── logo.svg          # Custom humanoid robot + brain logo
│   │   ├── hero-bg.jpg       # Hero section background image
│   │   ├── module-cards/     # Images for each of the 7 module cards
│   │   │   ├── module1.jpg
│   │   │   ├── module2.jpg
│   │   │   ├── module3.jpg
│   │   │   ├── module4.jpg
│   │   │   ├── module5.jpg
│   │   │   ├── module6.jpg
│   │   │   └── module7.jpg
│   │   └── social/           # Social media icons
│   │       ├── youtube.svg
│   │       ├── twitter.svg
│   │       ├── linkedin.svg
│   │       └── github.svg
│   └── pdf/                  # PDF generation assets
├── src/
│   ├── components/           # Reusable React components
│   │   ├── Homepage/         # Homepage-specific components
│   │   │   ├── Hero/         # Hero section component
│   │   │   ├── ModuleCards/  # Module cards with hover effects
│   │   │   └── index.tsx     # Main homepage component
│   │   ├── Chapter/          # Chapter-specific components
│   │   │   ├── QuizButtons/  # Quiz and summary buttons for each chapter
│   │   │   └── index.tsx     # Main chapter component
│   │   ├── Navbar/           # Custom navbar component
│   │   ├── Footer/           # Custom footer component
│   │   ├── RAGChatbot/       # RAG chatbot component with Gemini API integration
│   │   └── UI/               # General UI components
│   ├── pages/                # Custom pages (overrides Docusaurus default pages)
│   │   └── index.mdx         # Custom homepage with hero and module cards
│   ├── theme/                # Custom theme components
│   │   ├── Navbar/           # Custom navbar with dark purple theming
│   │   ├── Footer/           # Custom footer with Panaversity/Panacloud branding
│   │   ├── MDXComponents/    # Custom MDX components for interactive elements
│   │   ├── Layout/           # Custom layout with dark purple theme
│   │   └── prism-*.js        # Custom syntax highlighting for code examples
│   └── css/
│       ├── custom.css        # Custom styles for dark purple theme
│       └── colors.css        # Color variables for the theme
├── i18n/
│   ├── en/                   # English translation files
│   │   ├── docusaurus-plugin-content-docs/
│   │   │   └── current/
│   │   │       ├── sidebars.json
│   │   │       └── navbar.json
│   │   └── code.json         # Common translation strings
│   └── ur/                   # Urdu translation files
│       ├── docusaurus-plugin-content-docs/
│       │   └── current/
│       │       ├── sidebars.json
│       │       └── navbar.json
│       └── code.json         # Common translation strings
├── docs/                     # MDX content for all 7 chapters + bonus pages
│   ├── 01-introduction-to-physical-ai/
│   │   ├── index.md          # Introduction chapter with visual elements and code
│   │   └── lab-exercise.mdx  # Hands-on lab with ROS 2 code examples
│   ├── 02-ros2-deep-dive/
│   │   ├── index.md          # ROS 2 chapter with visual elements and code
│   │   └── lab-exercise.mdx  # Hands-on lab with ROS 2 code examples
│   ├── 03-digital-twins/
│   │   ├── index.md          # Digital twins chapter with visual elements and code
│   │   └── lab-exercise.mdx  # Hands-on lab with Gazebo/Isaac Sim examples
│   ├── 04-nvidia-isaac/
│   │   ├── index.md          # NVIDIA Isaac chapter with visual elements and code
│   │   └── lab-exercise.mdx  # Hands-on lab with Isaac examples
│   ├── 05-vision-language-action/
│   │   ├── index.md          # VLA models chapter with visual elements and code
│   │   └── lab-exercise.mdx  # Hands-on lab with VLA examples
│   ├── 06-real-humanoid-robots/
│   │   ├── index.md          # Real robots chapter with visual elements and code
│   │   └── lab-exercise.mdx  # Hands-on lab with hardware examples
│   ├── 07-capstone-project/
│   │   ├── index.md          # Capstone chapter with visual elements and code
│   │   └── lab-exercise.mdx  # Hands-on lab with capstone examples
│   ├── hardware-guide.md     # Hardware guide with cost tables and options
│   └── chatbot.md            # RAG chatbot page with Gemini API integration
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Actions workflow for GitHub Pages deployment
└── blog/                     # Optional blog posts (if needed)
```

**Structure Decision**: Single web application targeting GitHub Pages with custom Docusaurus v3 theme. The structure separates content (docs/), custom components (src/components/), theme customizations (src/theme/), translations (i18n/), and static assets (static/). This approach allows for maximum customization while maintaining Docusaurus's content management capabilities.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
