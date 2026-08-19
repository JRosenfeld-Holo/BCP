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
      /** Fixes the card's image box so one tall source can't dominate its column. */
      ratio: 'landscape' | 'portrait' | 'wide' | 'tall';
      /** Photos crop happily; screenshots must not — every pixel is content, so
       *  they letterbox with 'contain' instead of losing their edges. */
      fit?: 'cover' | 'contain';
      title: string;
      caption: string;
      meta?: string;
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
    };

export const BRAG_ITEMS: BragItem[] = [
  {
    kind: 'photo',
    id: 'miami-check',
    tag: 'Hackathon',
    image: '/brag/check.webp',
    alt: 'Brian Cliette holding the $10,000 Build Day X Miami Hackathon winner cheque in front of the Tech Equity Collective and ACT House backdrop',
    ratio: 'portrait',
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
    // 16/9 matches the capture; contain guarantees no podium card is clipped
    ratio: 'wide',
    fit: 'contain',
    title: 'Finalist.',
    caption:
      '#Deepinvent4Good Virtual Inventathon — a hybrid dual-functional magnetic-electro filter cartridge with smart sensing, adaptive regeneration and integrated PFAS/microplastic waste management.',
    meta: 'August 7–21, 2025',
  },
  {
    kind: 'photo',
    id: 'agi-house',
    tag: 'Hackathon',
    image: '/brag/tweet-agihouse.webp',
    alt: 'Post by Alex Reibman on X covering the Dreamscape Creativity Hackathon at AGI House, with an arrow marking Brian Cliette in the room',
    ratio: 'tall',
    fit: 'contain',
    title: '211.4K Views.',
    caption:
      'Coverage of the Dreamscape Creativity Hackathon at AGI House, San Francisco — with @mantisVC and Coatue. Brian competed.',
    meta: 'Alex Reibman · Oct 23, 2023 · 526 likes · 68 reposts',
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
    kind: 'photo',
    id: 'maven',
    tag: 'Teaching',
    image: '/brag/maven.webp',
    alt: 'Maven course card for “Layoffs to 7 Fig AI Service Business”, featuring Brian Cliette, Sara Davison and Tyler Fisk',
    ratio: 'wide',
    fit: 'contain',
    title: 'Maven Instructor.',
    caption:
      '“Layoffs to 7 Fig AI Service Business: How To Win In The New AI Economy” — a Lightning Lab with AI Build Lab community leaders.',
    meta: 'Brian Cliette · Founder, GTM Engineer',
  },
  {
    kind: 'photo',
    id: 'udemy',
    tag: 'Teaching',
    image: '/brag/udemy.webp',
    alt: 'Udemy instructor profile for Brian Cliette showing 59,872 total learners and 1,952 reviews',
    ratio: 'wide',
    fit: 'contain',
    title: '59,872 Learners.',
    caption: '30+ courses on Udemy, rated across 1,952 reviews.',
    meta: 'Udemy instructor profile',
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
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  source: 'LinkedIn' | 'Workshop feedback';
  /** LinkedIn profile photo. Absent for the workshop quotes, whose cards fall
   *  back to initials rather than inventing a face. */
  photo?: string;
};

// LinkedIn recommendations are transcribed from `Recommendations_Received.csv`
// (Brian's own LinkedIn data export). Long recommendations are trimmed to the
// strongest passage with an ellipsis; wording is otherwise untouched apart from
// obvious typos in the originals. Nothing is paraphrased or invented.
//
// Ordered by how much weight the name carries: accelerator directors and named
// clients first, workshop rooms after.
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "As the Director of Penn State's business accelerator, I'm always looking for individuals with deep expertise to share their knowledge with our startups… He got rave reviews from those in attendance and his session was the best attended of the series. It was such a success that I brought him back in the spring.",
    name: 'Lee Erickson',
    photo: '/testimonials/lee-erickson.webp',
    role: 'Chief Amplifier',
    company: 'Penn State University',
    source: 'LinkedIn',
  },
  {
    quote:
      "I brought Brian in to assist us in putting my company's digital marketing on the right track. Brian conducted extensive research which revealed key issues and opportunities… Brian helped us understand digital marketing and how to best utilize it to grow our brand.",
    name: 'Tim Talley',
    photo: '/testimonials/tim-talley.webp',
    role: 'Founder & CEO',
    company: 'U-Lace, LLC',
    source: 'LinkedIn',
  },
  {
    quote:
      'I had the privilege of working with Brian on the marketing team at Pixlee… he never ceased to amaze me with his endless amounts of knowledge and plans to execute tactics successfully. I truly consider Brian a mentor and would recommend Brian to any employer.',
    name: 'Lexy Wright',
    photo: '/testimonials/lexy-wright.webp',
    role: 'Head of GTM',
    company: 'Kintsugi',
    source: 'LinkedIn',
  },
  {
    quote:
      'Brian has presented on the topics of Facebook marketing, sales growth and overall startup hustle at the Happy Valley LaunchBox… I highly recommend Brian and would encourage anyone looking to work with him to be ready, because he is most certainly the REAL DEAL.',
    name: 'Jason Huber',
    photo: '/testimonials/jason-huber.webp',
    role: 'Startup Consultant, Happy Valley LaunchBox',
    company: 'Penn State University',
    source: 'LinkedIn',
  },
  {
    quote:
      'I had this wonderful opportunity to attend one of Brian’s AI mastery workshops. It was an eye opener and mindset shift for me on how to look at AI for its many beneficial aspects. His subject matter expertise and engaging teaching style made me see the different use cases in my day to day life where I can put it to use.',
    name: 'Shahana Amanshah',
    photo: '/testimonials/shahana-amanshah.webp',
    role: 'Portfolio Scrum Lead & Agile Coach',
    company: 'Blue Cross and Blue Shield',
    source: 'LinkedIn',
  },
  {
    quote:
      "Brian's exceptional expertise in chatbot development, coupled with his remarkable talent for conveying intricate ideas in a concise and comprehensible manner, truly sets him apart. He has a talent for breaking down the most intricate details into digestible insights that are valuable to both beginners and seasoned professionals.",
    name: 'Nehemiah Thompson',
    photo: '/testimonials/nehemiah-thompson.webp',
    role: 'Digital Portfolio Management',
    company: "Dave & Buster's",
    source: 'LinkedIn',
  },
  {
    quote:
      "Brian's expertise in simplifying complex technical concepts into easily digestible pieces is nothing short of remarkable… Brian is indeed worth every penny for his services. I highly recommend Brian Cliette for any speaking or teaching engagement in the tech domain.",
    name: 'Irma Davila',
    photo: '/testimonials/irma-davila.webp',
    role: 'Account Director',
    company: 'BI WORLDWIDE',
    source: 'LinkedIn',
  },
  {
    quote:
      'I recommend Brian for his deep knowledge and understanding of CRO!',
    name: 'Gor Gasparyan',
    photo: '/testimonials/gor-gasparyan.webp',
    role: 'Growth Marketing & AI Director',
    company: 'Passionate Agency',
    source: 'LinkedIn',
  },
  {
    quote:
      'Brian Cliette is an exceptional trainer and speaker, particularly in the field of artificial intelligence. Brian’s sessions are not just informative but remarkably engaging, simplifying complex AI concepts for a broad audience… He embodies the qualities of a servant leader.',
    name: 'Nilda G. Thomas, MBA',
    photo: '/testimonials/nilda-g-thomas-mba.webp',
    role: 'CEO & Chief AI Officer',
    company: 'Business AI Consulting LLC',
    source: 'LinkedIn',
  },
  {
    quote:
      "Brian possesses a unique ability to break down complex AI concepts into digestible, easy-to-understand segments, making the learning process not just informative but genuinely enjoyable… The skills and knowledge I gained from his class have been instrumental in my work.",
    name: 'Alicia Lyttle',
    photo: '/testimonials/alicia-lyttle.webp',
    role: 'Chief Executive Officer',
    company: 'AI InnoVision',
    source: 'LinkedIn',
  },
  {
    quote:
      'Brian offered me pointed advice on how to go about understanding my customer more deeply. Getting his insights on marketing strategies was very helpful and his depth of knowledge about creating a brand pushed me to think of things that I had not initially considered.',
    name: 'Yasina Somani',
    photo: '/testimonials/yasina-somani.webp',
    role: 'Lecturer (Assistant Professor)',
    company: 'University of Leeds',
    source: 'LinkedIn',
  },
  {
    quote:
      "Brian's no-code bots class was a rollercoaster of AI fun! He's like the Dumbledore of AI — making complex stuff simple and exciting… Need an AI guru who's as entertaining as he is enlightening? Brian's your guy.",
    name: 'Brigette Callahan',
    photo: '/testimonials/brigette-callahan.webp',
    role: 'Presentation Design Expert',
    company: 'Babilon Arts, Inc.',
    source: 'LinkedIn',
  },
  {
    quote:
      'I recently attended a two-day intensive AI Training Workshop led by Brian… If you are looking to get an AI coach to train your team, invite Brian to your organization. He demonstrated throughout the training sessions that his knowledge was of the practical variety rather than theoretical.',
    name: 'Ranya Rahim',
    photo: '/testimonials/ranya-rahim.webp',
    role: 'Digital Content Strategist',
    company: 'JR Language Translation Services',
    source: 'LinkedIn',
  },
  {
    quote:
      "If you're seeking a knowledgeable and inspiring AI trainer who can demystify the world of artificial intelligence, Brian Cliette is the ideal choice. Brian demonstrated a remarkable ability to blend theoretical knowledge with practical applications.",
    name: 'Khurram Shehzad, MBA',
    photo: '/testimonials/khurram-shehzad-mba.webp',
    role: 'Channel & Alliances Director',
    company: 'PROVEN',
    source: 'LinkedIn',
  },
  {
    quote:
      'Just wanted to give you a shoutout for your awesome presentation at the KCF Live Event! Your insights were spot-on, and your speaking style kept me totally engaged. You’re a fantastic speaker — thanks for sharing your knowledge!',
    name: 'George-Adrian Mortu',
    role: 'Group Moderator',
    company: 'Kindle Cash Flow Mastermind',
    source: 'Workshop feedback',
  },
  {
    quote:
      'Brian is an excellent speaker; it is obvious he knows his stuff. He provides clear and concise information along with very valuable resources. I look forward to his next communique and presentation!',
    name: 'Craig Francis',
    role: 'Attendee',
    company: 'Kindle Cash Flow Mastermind',
    source: 'Workshop feedback',
  },
  {
    quote:
      'Your presentation was very eye opening and helped me to see beyond the small business that I thought I was building. There are so many ways to expand and grow and get better engagement.',
    name: 'Evelyn Earl',
    role: 'Attendee',
    company: 'Kindle Cash Flow Mastermind',
    source: 'Workshop feedback',
  },
  {
    quote:
      'This training was amazing! I am thinking about whole new avenues! I’m just starting, but am definitely coming back to the amazing, detailed, but so understandable info you provided!',
    name: 'Sheryl Laxson',
    role: 'Attendee',
    company: 'Kindle Cash Flow Mastermind',
    source: 'Workshop feedback',
  },
  {
    quote:
      'There is a wealth of knowledge and lots of tips for further research. The growth possibility both in business and personally is enormous. Mindset and action to be 1% better each day.',
    name: 'Rhoda Bryan',
    role: 'Attendee',
    company: 'Kindle Cash Flow Mastermind',
    source: 'Workshop feedback',
  },
];

export const TESTIMONIAL_CONTEXT = {
  eyebrow: 'Testimonials',
  blurb: 'Accelerator directors, clients, colleagues and workshop rooms — in their words.',
  footnote: 'LinkedIn recommendations and post-training feedback.',
};
