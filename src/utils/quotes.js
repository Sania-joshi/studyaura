export const motivationalQuotes = [
  { text: "You didn't come this far to only come this far.", author: "" },
  { text: "Rest if you must, but don't you quit.", author: "" },
  { text: "Fall in love with taking care of yourself — mind, body, and your grades.", author: "" },
  { text: "Be the energy you want to attract. Study with your whole heart.", author: "" },
  { text: "Discipline is choosing what you want most over what you want now.", author: "Abraham Lincoln" },
  { text: "Your future self is cheering you on right now. Don't let them down.", author: "" },
  { text: "Small steps every day. Big life someday.", author: "" },
  { text: "You are not behind. You are exactly where you need to be.", author: "" },
  { text: "Believe in yourself so loudly that your doubts go deaf.", author: "" },
  { text: "Today's effort is tomorrow's result. Start now.", author: "" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { text: "Push yourself, because no one else is going to do it for you.", author: "" },
  { text: "Great things never come from comfort zones.", author: "" },
  { text: "Dream bigger. Do bigger.", author: "" },
  { text: "The harder you work for something, the greater you'll feel when you achieve it.", author: "" },
  { text: "Wake up with determination. Go to bed with satisfaction.", author: "" },
  { text: "You don't have to be perfect. You just have to be trying.", author: "" },
  { text: "A little progress each day adds up to big results.", author: "Satya Nani" },
  { text: "Focus on being productive instead of busy.", author: "Tim Ferriss" },
  { text: "Your only limit is your mind.", author: "" },
  { text: "Study hard in silence. Let success make the noise.", author: "" },
];

export const princessMiniQuotes = [
  "Keep glowing, queen 👑",
  "You're doing amazing ✨",
  "Rest is productive too 🌸",
  "Your brain is beautiful 💕",
  "One page at a time 🌷",
  "Sparkle through the struggle ✨",
  "Grace under pressure 👑",
  "You've got this, darling 🌸",
];

export const ryuuMiniQuotes = [
  "A warrior never stops ⚡",
  "No rest until victory 🔥",
  "Grind now, shine later ⚔️",
  "Pain is temporary, glory is forever ⚡",
  "Execute with precision 🎯",
  "Weakness is a choice 🔥",
  "Level up or fall behind ⚔️",
  "Speed. Focus. Domination ⚡",
];

let lastQuoteIdx = -1;
export function getRandomQuote() {
  let idx;
  do {
    idx = Math.floor(Math.random() * motivationalQuotes.length);
  } while (idx === lastQuoteIdx);
  lastQuoteIdx = idx;
  return motivationalQuotes[idx];
}
