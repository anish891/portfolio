/**
 * Which AI crawlers may read the site.
 *
 * Search and "user asked for this page" bots are allowed, so the site can be found and cited in
 * ChatGPT, Claude, Perplexity and similar answers. Bots that collect pages to train models are
 * blocked. Google-Extended and Applebot-Extended are control tokens: blocking them stops use for
 * Gemini and Apple model training but does not affect Google Search, AI Overviews or Applebot search.
 */
export const ALLOWED_AI_CRAWLERS = [
  "OAI-SearchBot", // ChatGPT search index
  "ChatGPT-User", // a ChatGPT user opened the page
  "Claude-SearchBot", // Claude search index
  "Claude-User", // a Claude user opened the page
  "PerplexityBot", // Perplexity search index
  "Perplexity-User", // a Perplexity user opened the page
];

export const BLOCKED_TRAINING_CRAWLERS = [
  "GPTBot", // OpenAI training
  "ClaudeBot", // Anthropic training
  "anthropic-ai", // Anthropic training (older token)
  "Google-Extended", // Gemini training
  "Applebot-Extended", // Apple model training
  "CCBot", // Common Crawl, used by many training sets
  "Bytespider", // ByteDance
  "Meta-ExternalAgent", // Meta training
  "cohere-ai", // Cohere
];
