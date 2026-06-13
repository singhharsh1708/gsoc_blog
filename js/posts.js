/* ==========================================================================
   Posts manifest — single source of truth for the blog.
   To add a new post: append an entry below. The homepage "Latest writing"
   section auto-shows the 3 most recent (by `date`), and the full Blog grid
   shows all of them with category filtering.
   ========================================================================== */

window.POSTS = [
  {
    slug: 'coding-weeks-3-4',
    title: 'GSoC Weeks 3–4: IMEX-RK Methods & the First Multirate Solvers',
    excerpt: 'Completing the IMEX-RK family (IMEX-SSP, BHR) on the generic stepper, then landing the first multirate solvers — MRAB, MIS2, and the first MRI-GARK methods.',
    date: '2026-06-13',
    readTime: '7 min read',
    category: 'gsoc',
    categoryLabel: 'GSoC',
  },
  {
    slug: 'coding-weeks-1-2',
    title: 'GSoC Weeks 1–2: Finishing the IMEX Tableau Refactor',
    excerpt: 'Hardening the generic SDIRK/IMEX stepper to behave identically to the bespoke kernels, reusing the ODE W matrix as a Jacobian, and landing the first ARS IMEX-RK methods.',
    date: '2026-05-31',
    readTime: '6 min read',
    category: 'gsoc',
    categoryLabel: 'GSoC',
  },
  {
    slug: 'community-bonding',
    title: 'GSoC Week 0: Community Bonding',
    excerpt: "Community bonding week of GSoC 2026 — first mentor meeting, understanding the codebase plan, and what I'm diving into.",
    date: '2026-05-18',
    readTime: '4 min read',
    category: 'gsoc',
    categoryLabel: 'GSoC',
  },
  {
    slug: 'gsoc-selection',
    title: 'Getting Selected for GSoC 2026 with SciML',
    excerpt: 'My journey from first Julia PR to becoming a GSoC contributor — 16+ merged PRs, the proposal process, and advice for future applicants.',
    date: '2026-05-07',
    readTime: '10 min read',
    category: 'gsoc',
    categoryLabel: 'GSoC',
  },
  {
    slug: 'imex-runge-kutta',
    title: 'Understanding IMEX Runge–Kutta Methods',
    excerpt: 'Double Butcher tableaus, SDIRK structure, order conditions, and stability — the mathematics behind implicit-explicit time integration.',
    date: '2026-05-07',
    readTime: '14 min read',
    category: 'numerical',
    categoryLabel: 'Numerical Methods',
  },
  {
    slug: 'refactoring-tableaus',
    title: 'Refactoring 3000+ Lines into Generic Tableaus',
    excerpt: "How we're replacing duplicated perform_step! code with type-parametric tableau dispatch — the architecture, migration strategy, and performance constraints.",
    date: '2026-05-07',
    readTime: '15 min read',
    category: 'gsoc',
    categoryLabel: 'GSoC',
  },
  {
    slug: 'perform-step',
    title: 'How perform_step! Works in OrdinaryDiffEq.jl',
    excerpt: 'An architectural walkthrough from the integration loop to cache dispatch, FSAL optimization, and adaptive step size control.',
    date: '2026-05-07',
    readTime: '16 min read',
    category: 'opensource',
    categoryLabel: 'Open Source',
  },
  {
    slug: 'zero-allocation-julia',
    title: 'Zero Allocation Programming in Julia',
    excerpt: 'Practical patterns for allocation-free numerical kernels — broadcast fusion, cache patterns, StaticArrays, @inbounds, and AllocCheck.jl.',
    date: '2026-05-07',
    readTime: '12 min read',
    category: 'julia',
    categoryLabel: 'Julia',
  },
  {
    slug: 'multirate-solvers',
    title: 'Building Multirate Solvers: MREIL, MIS & MRGARK',
    excerpt: 'Theory and implementation of multirate time integration — from MIS auxiliary ODEs to the MRGARK framework by Günther & Sandu.',
    date: '2026-05-07',
    readTime: '13 min read',
    category: 'numerical',
    categoryLabel: 'Numerical Methods',
  },
  {
    slug: 'lessons-sciml',
    title: 'Lessons from Contributing to SciML',
    excerpt: 'What 16+ merged PRs taught me about numerical testing, performance as correctness, incremental PRs, and scientific software culture.',
    date: '2026-05-07',
    readTime: '9 min read',
    category: 'opensource',
    categoryLabel: 'Open Source',
  },
];
