// Social proof rebuilt as data + native components rather than screenshots.
// Every figure here is transcribed from the source captures in `Brag Folder/`.
// Do not add a number that isn't verifiable from those.
//
// `href` is intentionally absent on most items: the original post URLs weren't
// supplied. Cards render without a source link and gain one the moment a URL
// is added — nothing is fabricated to fill the gap.

export type BragItem =
  | {
      kind: 'photo';
      id: string;
      tag: string;
      image: string;
      alt: string;
      /** Fixes the card's image box so one tall source can't dominate its
       *  column. 'wide' (16/9) suits screenshots that must not be side-cropped. */
      ratio: 'landscape' | 'portrait' | 'wide';
      title: string;
      caption: string;
      meta?: string;
      href?: string;
    }
  | {
      kind: 'post';
      id: string;
      tag: string;
      platform: 'x' | 'instagram';
      author: string;
      handle: string;
      date: string;
      text: string;
      note: string;
      stats: { label: string; value: string }[];
      href?: string;
    }
  | {
      kind: 'video';
      id: string;
      tag: string;
      image: string;
      alt: string;
      title: string;
      channel: string;
      duration: string;
      href?: string;
    }
  | {
      kind: 'course';
      id: string;
      tag: string;
      title: string;
      platform: string;
      kicker: string;
      role: string;
      cohosts: { name: string; role: string }[];
      href?: string;
    };

export const BRAG_ITEMS: BragItem[] = [
  {
    kind: 'photo',
    id: 'miami-check',
    tag: 'Hackathon',
    image: '/brag/check.webp',
    alt: 'Brian Cliette holding the $10,000 Build Day X Miami Hackathon winner cheque',
    ratio: 'landscape',
    title: '$10,000. First Place.',
    caption:
      'Build Day X Tour — Miami Hackathon, hosted by Tech Equity Collective (a Google initiative) and ACT House.',
    meta: 'December 3, 2023',
  },
  {
    kind: 'photo',
    id: 'deepinvent',
    tag: 'Competition',
    image: '/brag/deepinvent.webp',
    alt: 'Deepinvent #Deepinvent4Good Inventathon results board showing Brian Cliette in third place',
    // 16/9 matches the capture: a 4/3 box crops the outer podium cards away
    ratio: 'wide',
    title: 'Finalist.',
    caption:
      '#Deepinvent4Good Virtual Inventathon — a hybrid dual-functional magnetic-electro filter cartridge with smart sensing, adaptive regeneration and integrated PFAS/microplastic waste management.',
    meta: 'August 7–21, 2025',
  },
  {
    kind: 'post',
    id: 'agi-house',
    tag: 'Hackathon',
    platform: 'x',
    author: 'Alex Reibman',
    handle: '@AlexReibman',
    date: 'Oct 23, 2023',
    text: "SF's top AI hackers all came to a mansion to push the creative limits of art and music. These projects are next level. Tweeting my top picks from the Dreamscape Creativity Hackathon at @agihouse_org w/ @mantisVC @coatuemgmt",
    note: 'Coverage of the Dreamscape Creativity Hackathon at AGI House, San Francisco — where Brian competed.',
    stats: [
      { label: 'Views', value: '211.4K' },
      { label: 'Likes', value: '526' },
      { label: 'Reposts', value: '68' },
    ],
  },
  {
    kind: 'photo',
    id: 'act-house-stage',
    tag: 'Speaking',
    image: '/brag/stage.webp',
    alt: 'Brian Cliette presenting on stage with a microphone at the ACT House hackathon',
    ratio: 'portrait',
    title: 'On The Mic.',
    caption: 'Presenting at the ACT House 24-hour hackathon in Tulsa.',
    meta: 'November 2023',
  },
  {
    kind: 'course',
    id: 'maven',
    tag: 'Teaching',
    platform: 'Maven',
    kicker: 'Lightning Lab w/ AI Build Lab Community Leaders',
    title: 'Layoffs to 7-Fig AI Service Business',
    role: 'Founder, GTM Engineer',
    cohosts: [
      { name: 'Sara Davison', role: 'Founder, Agentic AI Growth Practitioner' },
      { name: 'Tyler Fisk', role: 'Founder, Agentic AI Growth Practitioner' },
    ],
  },
  {
    kind: 'video',
    id: 'penn-state',
    tag: 'Speaking',
    image: '/brag/pennstate.webp',
    alt: 'Panel discussion on stage at Penn State Startup Week',
    title: 'Strengthening Society: How Entrepreneurship Benefits Our World',
    channel: 'Penn State Startup Week — Invent Penn State',
    duration: '1:00:50',
  },
  {
    kind: 'photo',
    id: 'team-caviar',
    tag: 'Hackathon',
    image: '/brag/team-win.webp',
    alt: 'The winning Caviar team holding the $10,000 cheque',
    ratio: 'landscape',
    title: 'Team Caviar.',
    caption:
      '"1st Place Winner of $10,000: Caviar, a software platform enabling restaurant operators through automation and predictive AI." — ACT House',
    meta: 'Juan Zamudio · Whitney Sherrill · Brian Cliette · Hunter Christerpher',
  },
];

// Verbatim from the Kindle Cash Flow Mastermind training thread.
//
// Full names as they appear in the source thread, published at Brian's
// direction. If anyone asks to be removed, delete their entry here.
export const TESTIMONIALS = [
  {
    quote:
      'Just wanted to give you a shoutout for your awesome presentation at the KCF Live Event! Your insights were spot-on, and your speaking style kept me totally engaged. You’re a fantastic speaker — thanks for sharing your knowledge!',
    name: 'George-Adrian Mortu',
    role: 'Group Moderator',
  },
  {
    quote:
      'Brian is an excellent speaker; it is obvious he knows his stuff. He provides clear and concise information along with very valuable resources. I look forward to his next communique and presentation!',
    name: 'Craig Francis',
    role: 'Attendee',
  },
  {
    quote:
      'Your presentation was very eye opening and helped me to see beyond the small business that I thought I was building. There are so many ways to expand and grow and get better engagement.',
    name: 'Evelyn Earl',
    role: 'Attendee',
  },
  {
    quote:
      'This training was amazing! I am thinking about whole new avenues! I’m just starting, but am definitely coming back to the amazing, detailed, but so understandable info you provided!',
    name: 'Sheryl Laxson',
    role: 'Attendee',
  },
  {
    quote:
      'There is a wealth of knowledge and lots of tips for further research. The growth possibility both in business and personally is enormous. Mindset and action to be 1% better each day.',
    name: 'Rhoda Bryan',
    role: 'Attendee',
  },
] as const;

export const TESTIMONIAL_CONTEXT = {
  eyebrow: 'Speaking Feedback',
  headline: 'The Room After The Talk.',
  source: 'Kindle Cash Flow Mastermind',
  audience: '17,800-member publishing community',
};
