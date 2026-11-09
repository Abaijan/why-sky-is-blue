/**
 * Scene timeline and narration text (from the script).
 * Durations are in seconds and follow the script's timecodes.
 * Change `duration` here if you re-time the voice-over.
 *
 * Voice-over: put files public/audio/<id>.mp3 and set USE_AUDIO = true.
 */
export const USE_AUDIO = true;

export type SceneMeta = {
  id: string;
  title: string;
  duration: number; // seconds
  paras: string[];
};

export const SCENES: SceneMeta[] = [
  {
    id: "01-hook",
    title: "The same sky, two colors",
    duration: 43,
    paras: [
      "Look up. On a clear day, the sky is a deep, perfect blue. Now wait a few hours. Same sky, same air, same Sun, and suddenly the whole horizon is burning orange and red.",
      "Nothing was repainted. Nobody flipped a switch. So what changed?",
      "It turns out both colors, the blue at noon and the red at sunset, come from exactly the same trick of physics. And once you understand it, you will never look at the sky the same way again.",
      "Today we will go inside a ray of sunlight and follow it all the way down to your eyes. We will find out why the sky is blue, why it isn't violet, why sunsets glow red, and why the sunset on Mars is blue. Let's get started.",
    ],
  },
  {
    id: "02-white-light",
    title: "Sunlight is every color",
    duration: 60,
    paras: [
      "Our story starts 93 million miles away, at the Sun. The light it sends us looks white, or maybe a little yellow. But it isn't one color. In 1666, a young Isaac Newton let a thin beam of sunlight pass through a glass prism, and out came a rainbow: red, orange, yellow, green, blue, violet.",
      "Newton's big idea was that the prism didn't add those colors. They were already hiding inside the white light. The glass simply spread them apart.",
      "So sunlight is a mixture of every color at once. And each color is really a wave, with its own length. Red light has long waves, about 700 nanometers from crest to crest. That is roughly a hundred times thinner than a human hair. Violet light has the shortest waves, about 400. Blue sits near the short end, around 450.",
      "Remember that: red is long, blue is short. It is the whole secret.",
    ],
  },
  {
    id: "03-air",
    title: "The air is not empty",
    duration: 42.88,
    paras: [
      "Now the light has to cross space and enter our atmosphere. And here is the part people forget: air is not nothing.",
      "A single breath holds more than ten billion trillion molecules. Nearly four out of every five are nitrogen, and most of the rest is oxygen. These molecules are tiny, over a thousand times smaller than the wavelength of visible light.",
      "Picture the atmosphere as an ocean of invisible little obstacles. It stretches about sixty miles up, but roughly three quarters of all the air is packed into the lowest six miles or so. Every beam of sunlight has to swim through it. And when light meets a molecule, something interesting happens.",
    ],
  },
  {
    id: "04-scattering",
    title: "Rayleigh scattering",
    duration: 95.76,
    paras: [
      "When a light wave passes a molecule, it shakes the electrons inside it. Those jiggling electrons then give the light off again, sending a little of it in a new direction. Scientists call this scattering.",
      "But here is the key. Molecules don't scatter all colors equally. Short waves get kicked around much more than long waves. In the 1870s, the British physicist Lord Rayleigh worked out exactly how much. The amount of scattering goes up with the fourth power of how short the wavelength is.",
      "That sounds abstract, so let's make it concrete. Blue light has a wavelength about one and a half times shorter than red. Raise that to the fourth power, and you get this: blue light is scattered roughly six times more strongly than red light.",
      "Six times. That is a huge difference.",
      "So here is what happens to a beam of sunlight crossing the sky. The red, orange and yellow light mostly slip straight through, heading in a straight line from the Sun to the ground. But the blue light keeps bouncing off molecules and flying off in every direction, again and again.",
      "Now, when you look at a patch of sky away from the Sun, no light is coming directly at you. Everything you see there is scattered light, and most of that scattered light is blue. It reaches your eyes from every direction. The whole sky glows.",
      "That is why the sky is blue. It isn't a color of the air, like paint. It is sunlight, thrown around the sky.",
      "And no, the sky is not blue because it reflects the ocean. That is a very common myth. The ocean is blue for its own reason: water absorbs red light.",
    ],
  },
  {
    id: "05-violet",
    title: "Why not violet?",
    duration: 51.68,
    paras: [
      "But wait. Violet light has an even shorter wavelength than blue. By Rayleigh's rule, it should scatter even more. So why isn't the sky violet?",
      "There are two reasons, and they add up.",
      "First, the Sun doesn't give off equal amounts of every color. It puts out less violet than blue, and part of the shortest-wavelength light is lost high up in the atmosphere before it reaches us.",
      "Second, and this one is about you: your eyes. Human eyes have three kinds of color-sensing cells, tuned to red, green and blue, and they respond poorly to violet. So the scattered light, which is a blend of every color but strongest in the blues, lands in your brain as sky blue. A slightly pale, whitish blue rather than a deep violet.",
      "In other words, the color of the sky is partly physics and partly biology. A creature with different eyes might see a very different sky.",
    ],
  },
  {
    id: "06-horizon-clouds",
    title: "Pale horizons and white clouds",
    duration: 50,
    paras: [
      "If you look carefully, the sky isn't one uniform blue. It is deepest straight overhead and paler, almost white, near the horizon. Why?",
      "Near the horizon you are looking through much more air. The blue light is scattered again and again along the way, and scattered light of other colors from all along your line of sight is added in. Mix all those colors together, and you get something closer to white.",
      "Clouds are white for a related reason. Cloud droplets are huge compared with air molecules, tens of thousands of times bigger, and bigger than the wavelength of light. Droplets that large scatter every color about equally. Equal amounts of red, green and blue add up to white. Scientists call this Mie scattering, after the German physicist Gustav Mie.",
      "So the same sunlight can look blue or white, depending on one thing: the size of what it hits.",
    ],
  },
  {
    id: "07-sunset",
    title: "Why the sunset is red",
    duration: 43.26,
    paras: [
      "Now let's move the Sun. As evening comes, the Sun sinks toward the horizon, and the journey of its light changes. At noon, sunlight comes almost straight down through the thinnest part of the atmosphere. At sunset, it arrives at a shallow angle, and that means traveling through far more air. Along the horizon, the path is roughly forty times longer than straight overhead.",
      "Remember what happens to blue light in air: it keeps getting scattered out of the beam. Over a short path, plenty of blue still makes it through. But over a path forty times longer, almost all of the blue and much of the green has been scattered away. Only the long waves are left in the beam that reaches your eyes: orange and red.",
      "That is the answer to our second question. A sunset is red for the same reason the sky is blue. The blue light didn't vanish. It was scattered out of the beam on the way to you. Somewhere else on Earth, that scattered blue is lighting up a morning sky for people who are just waking up.",
      "And you can watch the transition happen. As the Sun drops, yellow becomes orange, orange becomes red, and the sky overhead slowly darkens from blue to deep indigo.",
    ],
  },
  {
    id: "08-great-sunsets",
    title: "What makes a spectacular sunset",
    duration: 60,
    paras: [
      "Some sunsets are pale and forgettable. Others set the whole sky on fire. What is the difference?",
      "The best sunsets usually need two ingredients. First, clean, clear air near the horizon, so the red light can travel far. Second, clouds at high altitude. They catch the red light from below, even after the Sun has dipped out of sight on the ground, and they glow orange, pink and crimson.",
      "Tiny particles in the air can help too. Dust, smoke and sea salt scatter some of the remaining light and can deepen the colors. After the huge eruption of Krakatoa in 1883, ash high in the atmosphere turned sunsets blood red around the world for months. Some researchers think that sky may have inspired the fiery background of Edvard Munch's painting The Scream.",
      "And just after the Sun disappears, the sky can turn deep blue again. Photographers call it the blue hour. One reason is the ozone layer, which absorbs some orange and red light and leaves the twilight sky even bluer.",
    ],
  },
  {
    id: "09-other-worlds",
    title: "Skies on other worlds",
    duration: 42.44,
    paras: [
      "The same physics explains skies on other worlds. On the Moon there is almost no atmosphere, so there is nothing to scatter the sunlight. Even at the middle of the lunar day, the sky is black, and the Sun blazes in it.",
      "On Mars, the sky is different again. The air is thin but full of fine reddish dust. In the daytime that dust scatters and absorbs light so the sky glows a dusty butterscotch color. But at sunset, something strange happens: the area around the Sun turns blue. Images from NASA's rovers show a pale blue glow around the setting Sun, because Martian dust particles scatter blue light mostly forward, toward the viewer.",
      "So on Earth, the sky is blue and the sunset is red. On Mars, the sky is red-brown and the sunset is blue. Same physics, different ingredients.",
    ],
  },
  {
    id: "10-outro",
    title: "Recap",
    duration: 40.16,
    paras: [
      "Let's recap. Sunlight is a mix of every color. When it hits air molecules, short blue waves are scattered about six times more strongly than long red ones, so blue light fills the sky from every direction. At sunset the light travels through about forty times more air, the blue is scattered away, and the red is what is left.",
      "Two colors, one explanation. And that is the beautiful thing about science: one simple idea can explain a bright blue noon and a blazing red evening.",
      "Next time you catch a sunset, remember: you aren't looking at the color of the Sun. You are looking at what the atmosphere left behind. Thanks for watching, and tell me in the comments what you would like us to open up next.",
    ],
  },
];

export const TOTAL_SECONDS = SCENES.reduce((a, s) => a + s.duration, 0);
