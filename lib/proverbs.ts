export interface Proverb {
  somali: string
  english: string
  context?: string
}

export const proverbs: Proverb[] = [
  {
    somali: "Af daboolan, dahab waaye.",
    english: "A closed mouth is gold.",
    context: "Silence is often more valuable than speaking, especially when one has nothing constructive to say."
  },
  {
    somali: "Gacmo wada jir bey wax ku gooyaan.",
    english: "Hands together cut things.",
    context: "Unity is strength; difficult tasks become easier when people work together."
  },
  {
    somali: "Intaadan falin, ka fiirso.",
    english: "Think before you act.",
    context: "Consider the consequences of your actions before proceeding."
  },
  {
    somali: "Rag waa shaah, dumarna waa sheekadiisa.",
    english: "Men are tea, women are the conversation.",
    context: "Highlighting the complementary nature of men and women in social settings."
  },
  {
    somali: "Beeni raad ma leh.",
    english: "A lie has no footprint.",
    context: "Lies are fleeting and leave no lasting evidence or legacy."
  },
  {
    somali: "Aqoon la'aan waa iftiin la'aan.",
    english: "Lack of knowledge is lack of light.",
    context: "Education and knowledge illuminate one's path in life."
  }
]

export function getDailyProverb(): Proverb {
  // Use the day of the year to pick a proverb
  const start = new Date(new Date().getFullYear(), 0, 0);
  const diff = Number(new Date()) - Number(start);
  const oneDay = 1000 * 60 * 60 * 24;
  const day = Math.floor(diff / oneDay);
  
  return proverbs[day % proverbs.length];
}
