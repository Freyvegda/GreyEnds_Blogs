export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorAvatar: string;
  date: string;
  tags: string[];
  readTime: string;
  coverImage?: string;
}

export const mockBlogs: Blog[] = [
  {
    id: '1',
    title: 'Starting Fresh: My First Step into Blogging',
    excerpt: 'Hello and welcome to my very first blog post! After approximately 17 half-written drafts, three existential crises, and one dramatic Google search ("does the world really need another blog?"), I\'ve f...',
    content: `Hello and welcome to my very first blog post! After approximately 17 half-written drafts, three existential crises, and one dramatic Google search ("does the world really need another blog?"), I've finally decided to hit publish.

## Why Start a Blog?

I've always been fascinated by the power of written words. There's something magical about translating thoughts into sentences that others can read and connect with. Plus, I figured if I'm going to overthink everything anyway, I might as well share it with the world.

## What to Expect

This blog will be a mix of personal reflections, random musings, and maybe some helpful content thrown in. I'm not claiming to be an expert at anything—except perhaps overthinking—but I'm excited to share this journey with you.

## The Journey Ahead

Starting something new is always terrifying and exciting in equal measure. But here's to taking that first step, hitting publish, and seeing where this adventure takes us.

Thank you for being here at the beginning. Let's see where this goes!`,
    author: 'FreyVagda',
    authorAvatar: 'FV',
    date: 'June 25, 2025',
    tags: ['#firstblog', '#real', '#blogbeginning'],
    readTime: '3 min read'
  },
  {
    id: '2',
    title: 'The Art of Finding Inspiration in Everyday Moments',
    excerpt: 'Sometimes the most profound insights come from the simplest observations. Today, I watched a leaf fall from a tree and realized something about letting go...',
    content: `Sometimes the most profound insights come from the simplest observations. Today, I watched a leaf fall from a tree and realized something about letting go.

## The Falling Leaf

It wasn't dramatic. There was no wind, no storm. The leaf just... let go. It had served its purpose, and now it was time to move on. Such a simple act, yet so full of meaning.

## What We Can Learn

We often hold onto things—relationships, jobs, habits—long after they've served their purpose. We're afraid of what comes next, afraid of the fall. But what if, like that leaf, we trusted the process?

## Embracing Change

Change is the only constant in life. The sooner we accept this, the easier it becomes to flow with life rather than against it. Every ending is also a beginning.`,
    author: 'FreyVagda',
    authorAvatar: 'FV',
    date: 'June 28, 2025',
    tags: ['#inspiration', '#mindfulness', '#reflection'],
    readTime: '4 min read'
  },
  {
    id: '3',
    title: 'Coffee, Code, and Contemplation',
    excerpt: 'My morning routine has become a sacred ritual. It involves coffee (obviously), some coding, and a lot of thinking. Here\'s why this combination works so well...',
    content: `My morning routine has become a sacred ritual. It involves coffee (obviously), some coding, and a lot of thinking. Here's why this combination works so well for me.

## The Perfect Morning

There's something about the quiet of early morning that makes it perfect for creative work. The world is still asleep, and you have this precious window of uninterrupted time.

## Why This Works

1. **Coffee**: The ritual of making coffee signals to my brain that it's time to wake up and focus
2. **Code**: Starting with a creative activity gets the mind engaged
3. **Contemplation**: Taking breaks to think deeply about what I'm building

## The Power of Routine

Having a consistent morning routine has transformed my productivity and mental health. It's not about being rigid—it's about creating a framework that supports your best work.`,
    author: 'FreyVagda',
    authorAvatar: 'FV',
    date: 'July 2, 2025',
    tags: ['#productivity', '#routine', '#coding'],
    readTime: '5 min read'
  },
  {
    id: '4',
    title: 'Lessons from a Year of Writing',
    excerpt: 'It\'s been a year since I started this blog, and I\'ve learned so much. Here are the biggest lessons about writing, creativity, and showing up consistently...',
    content: `It's been a year since I started this blog, and I've learned so much. Here are the biggest lessons about writing, creativity, and showing up consistently.

## Consistency Over Perfection

The biggest lesson? Just show up. Not every post will be a masterpiece, and that's okay. The act of writing regularly is more important than writing perfectly.

## Finding Your Voice

It took months to find my authentic voice. At first, I was trying to sound like other bloggers I admired. But the magic happened when I started writing like myself.

## The Community

The most unexpected joy has been connecting with readers. Your comments, messages, and stories have enriched this journey more than I could have imagined.

## Looking Ahead

Here's to another year of writing, learning, and growing together. Thank you for being part of this journey.`,
    author: 'FreyVagda',
    authorAvatar: 'FV',
    date: 'July 10, 2025',
    tags: ['#writing', '#reflection', '#anniversary'],
    readTime: '6 min read'
  },
  {
    id: '5',
    title: 'The Beauty of Slow Living',
    excerpt: 'In a world that\'s constantly rushing, I\'ve been experimenting with slowing down. Here\'s what I\'ve discovered about the art of slow living...',
    content: `In a world that's constantly rushing, I've been experimenting with slowing down. Here's what I've discovered about the art of slow living.

## What is Slow Living?

Slow living isn't about doing everything at a snail's pace. It's about being intentional with your time and energy. It's about savoring moments instead of rushing through them.

## My Experiment

For the past month, I've been practicing slow living principles:
- Taking time to actually taste my food
- Walking instead of driving when possible
- Having conversations without checking my phone
- Reading physical books instead of scrolling

## The Results

The impact has been profound. I feel more present, less anxious, and more connected to the world around me. Time feels more abundant, even though I'm technically doing less.

## Try It Yourself

You don't have to overhaul your entire life. Start small. Pick one activity today and do it slowly, with full attention. Notice how it feels.`,
    author: 'FreyVagda',
    authorAvatar: 'FV',
    date: 'July 15, 2025',
    tags: ['#slowliving', '#mindfulness', '#lifestyle'],
    readTime: '5 min read'
  }
];
