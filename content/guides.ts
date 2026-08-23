export type Guide = {
  slug: string;
  title: string;
  method: string;
  summary: string;
  difficulty: "Easy" | "Moderate" | "Fussy";
  dose: string;
  water: string;
  ratio: string;
  grind: string;
  temperature: string;
  totalTime: string;
  yield: string;
  gear: string[];
  steps: { at: string; title: string; body: string }[];
  troubleshooting: { problem: string; fix: string }[];
  pairsWith: string[];
  accent: string;
};

export const guides: Guide[] = [
  {
    slug: "v60-pour-over",
    title: "The V60, without the ceremony",
    method: "Pour-over",
    summary:
      "One cone, one filter, four pours. The clearest window into a light-roast coffee you can get for under thirty euros of equipment.",
    difficulty: "Moderate",
    dose: "22 g coffee",
    water: "360 g water",
    ratio: "1:16.4",
    grind: "Medium-fine — table salt",
    temperature: "94 °C / 201 °F",
    totalTime: "3:00 – 3:30",
    yield: "One large cup (320 ml)",
    gear: ["Hario V60 (size 02)", "Paper filters", "Gooseneck kettle", "Scale with timer", "Burr grinder"],
    steps: [
      {
        at: "0:00",
        title: "Rinse and preheat",
        body: "Fold the filter seam, seat it in the cone, and pour hot water through until the paper is soaked and the vessel below is warm. Dump that water. This removes papery taste and stops the brewer stealing heat from your first pour.",
      },
      {
        at: "0:00",
        title: "Bloom with 60 g",
        body: "Add the grounds, level the bed with a gentle tap, tare the scale, and start the timer as you pour 60 g of water in a tight spiral from the centre out. Everything should be wet within five seconds. Wait.",
      },
      {
        at: "0:45",
        title: "First main pour to 200 g",
        body: "Pour steadily in slow concentric circles, staying off the paper wall. You are aiming to finish this pour around 1:10 with the bed fully agitated but not turbulent.",
      },
      {
        at: "1:30",
        title: "Second pour to 280 g",
        body: "Wait for the water level to fall to roughly halfway down the slurry, then pour again. Keeping the bed topped up rather than letting it drain dry keeps the extraction even.",
      },
      {
        at: "2:00",
        title: "Final pour to 360 g",
        body: "One last pour, slightly faster, finishing with a small circle in the centre. Give the cone a single gentle swirl to flatten the bed so the grounds settle level rather than climbing the sides.",
      },
      {
        at: "3:00",
        title: "Drawdown and taste",
        body: "The last drips should land somewhere between 3:00 and 3:30. Swirl the carafe, let it sit two minutes — coffee lies to you when it is scalding — then drink.",
      },
    ],
    troubleshooting: [
      { problem: "Thin, sour, drains in under 2:30", fix: "Grind finer, or raise water temperature by 2 °C. Under-extracted." },
      { problem: "Bitter, drying, over 4:00", fix: "Grind coarser and pour more gently. You are stalling the bed." },
      { problem: "Tastes flat and muddled", fix: "Check your water. Distilled or heavily softened water makes coffee taste like nothing." },
    ],
    pairsWith: ["dawn-chorus", "cloud-cover"],
    accent: "#2E6157",
  },
  {
    slug: "aeropress",
    title: "AeroPress, the way we actually make it",
    method: "Immersion",
    summary:
      "Two minutes, one plunge, almost no way to ruin it. The recipe we give to anyone travelling, camping, or working in an office with a bad kettle.",
    difficulty: "Easy",
    dose: "16 g coffee",
    water: "230 g water",
    ratio: "1:14",
    grind: "Medium-fine — slightly finer than filter",
    temperature: "88 °C / 190 °F",
    totalTime: "2:00",
    yield: "One cup (200 ml)",
    gear: ["AeroPress", "Paper filter", "Scale", "Stirrer or spoon"],
    steps: [
      {
        at: "0:00",
        title: "Set up inverted",
        body: "Plunger in the chamber about a centimetre, standing upside down on a level surface. Rinse the filter in the cap but leave the cap off for now.",
      },
      {
        at: "0:00",
        title: "Add coffee and all the water",
        body: "16 g in, then pour the full 230 g in one confident go. Do not bloom, do not stage it. Immersion brewing does the work for you.",
      },
      {
        at: "0:15",
        title: "Stir three times",
        body: "Three swift stirs across the diameter, then screw the capped filter on. Any crust of dry grounds floating on top is unextracted coffee.",
      },
      {
        at: "1:30",
        title: "Flip and rest",
        body: "Flip onto your mug in one motion — hold both ends. Let it settle for fifteen seconds so the bed compacts before you apply pressure.",
      },
      {
        at: "1:45",
        title: "Press for 20 seconds",
        body: "Slow, even pressure with your body weight over the plunger, not your arms. Stop at the hiss. Pressing past it pulls bitter fines through the filter.",
      },
    ],
    troubleshooting: [
      { problem: "Harsh and hollow", fix: "Drop the water to 85 °C. AeroPress does not need boiling water and rarely benefits from it." },
      { problem: "Weak", fix: "Go to 18 g without changing the water. The ratio matters more than the grind here." },
      { problem: "Plunger is impossible to press", fix: "Too fine. Two clicks coarser." },
    ],
    pairsWith: ["slow-sunday", "half-light"],
    accent: "#5F7A4F",
  },
  {
    slug: "french-press",
    title: "French press that isn't sludge",
    method: "Immersion",
    summary:
      "The trick is a crust break and a long wait, not a plunge. Four minutes of effort spread across nine minutes of doing nothing.",
    difficulty: "Easy",
    dose: "60 g coffee",
    water: "1000 g water",
    ratio: "1:16.6",
    grind: "Coarse — sea salt",
    temperature: "96 °C / 205 °F",
    totalTime: "9:00",
    yield: "Four cups (850 ml)",
    gear: ["1 L French press", "Scale", "Two spoons", "Timer"],
    steps: [
      {
        at: "0:00",
        title: "Pour all the water",
        body: "Grounds in the preheated press, then all 1000 g poured briskly from height to saturate everything. Leave the plunger out.",
      },
      {
        at: "4:00",
        title: "Break the crust",
        body: "A raft of grounds will have formed on top. Stir it gently three times with a spoon — most of it sinks. This is the single step that separates good press coffee from bad.",
      },
      {
        at: "4:30",
        title: "Skim the foam",
        body: "Use two spoons to lift off the foam and floating grounds and discard them. That layer holds most of the bitterness and all of the silt.",
      },
      {
        at: "9:00",
        title: "Plunge barely, then pour",
        body: "Push the plunger down only to just below the surface — you are not filtering, you are holding the bed down. Pour slowly and stop before the last centimetre.",
      },
    ],
    troubleshooting: [
      { problem: "Muddy texture", fix: "You plunged all the way. Stop at the surface and decant immediately." },
      { problem: "Bitter after a while", fix: "Never leave brewed coffee sitting on the grounds. Decant the whole press into a carafe." },
      { problem: "Weak and watery", fix: "Coarse grind needs a stronger ratio. Try 65 g." },
    ],
    pairsWith: ["terracotta", "slow-sunday"],
    accent: "#B8853C",
  },
  {
    slug: "espresso-at-home",
    title: "Dialling in espresso at home",
    method: "Pressure",
    summary:
      "A framework rather than a recipe. Change one variable at a time, write it down, and you will land it in three shots instead of thirty.",
    difficulty: "Fussy",
    dose: "18 g in",
    water: "—",
    ratio: "1:2",
    grind: "Fine — adjust every session",
    temperature: "93 °C / 199 °F",
    totalTime: "25 – 30 s",
    yield: "36 g out",
    gear: ["Espresso machine", "Burr grinder with fine adjustment", "0.1 g scale", "Distribution tool", "Tamper"],
    steps: [
      {
        at: "Step 1",
        title: "Fix the dose",
        body: "18 g in a standard double basket, weighed every time. Do not change this while you are dialling in. A variable dose makes every other adjustment unreadable.",
      },
      {
        at: "Step 2",
        title: "Fix the yield",
        body: "Target 36 g in the cup — a 1:2 ratio. Put the cup on a scale and stop the shot by weight, not by eye and never by volume.",
      },
      {
        at: "Step 3",
        title: "Now move only the grind",
        body: "Too fast (under 22 s) means sour and thin: grind finer. Too slow (over 34 s) means bitter and ashy: grind coarser. One small adjustment per shot.",
      },
      {
        at: "Step 4",
        title: "Distribute before you tamp",
        body: "Most channelling is a distribution problem, not a tamping problem. Level the bed with a needle tool or a tap-and-settle, then tamp once, straight, firmly, and stop.",
      },
      {
        at: "Step 5",
        title: "Adjust the ratio last",
        body: "Once the time is in range, taste. Want more sweetness and body? Pull to 1:1.8. Want more clarity and acidity? Stretch to 1:2.4. Fresh roasts run faster — expect to grind finer as a bag ages past three weeks.",
      },
    ],
    troubleshooting: [
      { problem: "Shot sprays or squirts sideways", fix: "Channelling. Redistribute; check the basket is not overfilled." },
      { problem: "Blonde and sour at 30 s", fix: "Stale beans or a stalled grinder burr. Check the roast date first." },
      { problem: "Everything tastes ashy", fix: "Purge the group head and clean the basket. Rancid oils ruin good shots." },
    ],
    pairsWith: ["nightshift", "terracotta"],
    accent: "#A3552F",
  },
];

export function getGuide(slug: string) {
  return guides.find((g) => g.slug === slug);
}
