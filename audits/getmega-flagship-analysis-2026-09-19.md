# Getmega flagship analysis

19 September 2026 · Pre-writing analysis for the flagship case study. No copy, no redesign.

**How to read this.** Every claim is tagged. **FACT** means an artifact, a public source, the repo, or your own records say it. **INFERENCE** means I concluded it and you should confirm it. **MISSING** means no evidence exists anywhere I could reach and I did not invent it.

**What I studied.** The current page at `projects/getmega.html` (identical to `master` apart from two script-version lines, so this is also the live page). The original Notion-era page from git history (commit `bf07b0b`) and the Notion source page "Getmega Mobile App Flows" (edited 2 June 2026). All 24 image files in `assets/images/getmega`, read individually. The Mega Poker page and the Notion freelance folder, because they turned out to be the same company. The 5 September Astra audit and the 14 September strategy doc. Public press on GetMega from 2021 (Entrackr, EquityPandit), Tracxn's company profile, and search snippets from Gutshot, AppBrain, and Instagram. I could not open the Figma files, YourStory, Gutshot, or AppBrain directly (403s), so anything from those three is a search snippet and is marked as such.

---

## 0. The verdict in five sentences

The page is a tour of six hundred screens when it should be an argument, and the argument is stronger than the page knows. Two things make Getmega the flagship and neither is on the page: the artifacts themselves show the two pivots (the dark poker-era screens are dated 2019 and 2020 in their own UI, the light social-era screens carry the March 2021 product), and the "Mega Poker" client who hired you in 2024 was Getmega, three years after you left. That second fact is the single strongest seniority and trust signal on the whole site, and the site currently presents it as an unrelated company. The two best artifacts, the thirteen-state card and the sit-flow diagram, sit at figure 17 and figure 1 under a photoreal stock mockup that shows none of your decisions. The one measured outcome (weekday DAU 15k to 25k) is at risk, because the public record shows a 200-influencer launch campaign in March 2021 and the page cannot currently say whether the loyalty loop shipped before or after it.

---

## 1. The finding that changes the brief: Mega Poker is Getmega

- **FACT (your own records):** the Notion folder Freelance / Finished contains three client pages: CEDA, Khiladi Pro, and **Getmega**. The Getmega freelance page is the brief for the 2024 work: "Revamp the Withdrawal flow", "Include self-transfer flow in instant and tds flows", "Add UPI flow", "Penny check flow", "Delayed summary page, 2 variants", a Figma file named "March'24 Designs". That is, item for item, the Mega Poker case study.
- **FACT (public):** the Instagram account @getmega is titled "Mega Poker". Search snippets from Gutshot Magazine describe "Mega Poker, formerly known as GetMega Poker". Tracxn lists the legal entity as Megashots Internet Private Limited, founded 2018, Bengaluru, founders Mayank Kumar and Lokesh Jangid.
- **INFERENCE:** the CEO who "came to me with a leak" in the Mega Poker study is the same CEO you had daily reviews with in 2019 to 2021. Confirm.
- **INFERENCE:** the engagement was a monthly retainer in short sprints rather than a single two-month block. The Notion "Meta Info" sub-page records hours per month and sprint length (and compensation, which must never be published). Reconcile with the "~2 months" on the page.
- **FACT:** nothing on the site connects the two. The Mega Poker meta block says "Client: Mega Poker". The homepage card and About timeline list it as a separate 2024 freelance client. The strategy doc's rehire count ("two of three freelance clients came back") undercounts: all three freelance clients who hired you once hired you again, and one of them was your former employer.

**What it means for scope.** Getmega and Mega Poker are one story in two acts, and the two pages currently compete (both lead with wallets, both explain three-wallet money, both have a wallet chapter). Once they are one story, the repetition dissolves: the 2019 to 2021 page owns systems, lifecycle, retention, and team; the 2024 page owns money in and money out. The Getmega page needs a short closing chapter, "Three years later they called back", that hands off to Mega Poker, and the Mega Poker page needs one honest line in its meta block. This is a scope decision you have to make before any copy is written, and it also changes the homepage cards and the About timeline.

**Also corrected by the public record (FACT):** the Mega Poker page says the company "shut its operations after India banned real-money online poker". The ban is the Promotion and Regulation of Online Gaming Act, enacted 21 August 2025. An AppBrain snippet dates the Mega Poker Game listing's removal from Google Play to 6 December 2024, eight months before the ban, and Tracxn shows the company active with revenue in the year to March 2025. Narrow the sentence to what you can source, or drop it.

---

## 2. What the project uniquely proves about you

Reconstructed from the artifacts, not from the prose.

### 2a. What the screens themselves prove (FACT)

1. **You designed the states nobody briefs.** The thirteen-state card board (Paid, Free, Live LB, Upcoming LB, Early bird, You Lost, You Won, Point rate, Joined and winning, Joined and losing, Declaring results, Entry closes soon, Ending soon). The MTT details page with a Registered state, a countdown, and a persistent green bar repeating the countdown. The cash history ledger with a "Processing" state, signed amounts, and a per-wallet label on every row. The payment page's dead end written as an instruction: "Low balance. You need ₹74 more." The sit flow with four branches and two cancel paths. This is the same capability the strategy doc identified as your real expertise, and here it is the densest on the site.
2. **You kept players from losing hands.** Three sibling mechanisms across the tournament surface: the leaderboard row pinned at the bottom that translates rank into "18 spots away from paid places"; the "Your Turn / Play" pill inside the stats sheet; the floating bubble with "Your turn to play" for multi-tabling. They are one idea in three places, and the page shows them in three different chapters without naming the idea.
3. **You built a retention mechanism, not a screen.** Hero task with a programmed swap, milestone ladder (20, 50, 200, 500 hands), a ₹1000 cashback paid as ten ₹100 daily claims across a week, scratch cards with three tiers and expiry dates, a scratch card handed out at the "Cash added successfully" high. The mechanism is legible from the screens alone.
4. **You presented alternatives at least once.** The state board's own note reads: "Design of Free/Paid Card may change according to which Free/Paid variation is chosen out of three options given." That is the only visible trace on the entire site of options offered to a stakeholder. It is one line in a corner of one image.
5. **You designed across two visual languages, which is what two pivots look like.** The artifacts date themselves. Dark navy poker era: MTT details "27 Aug 2019", scratch cards "Expires on 27 Jul 2020", cashback "13 Oct". Light social era: wallet with "Casual Game Passes" and "Trivia Game Passes", the referral flow with flame mascots, the paywall promising "Hang out with friends using audio/video" and "Explore casual & trivia games", the thirteen-state card carrying Carrom and Poker Mania. Public press dates the relaunch as a social, audio/video gaming platform to 15 March 2021. The page says "two pivots" six times and never shows one; the screens already do.
6. **You reworked layouts for landscape rather than letterboxing.** The lobby in landscape (countdown left, field right) and the rebuy panel with a side rail. Two screens, clearly the same design system, clearly different layouts.

### 2b. What the public record adds (FACT, verified today)

- 5 million registered users as of March 2021, Android only, from Entrackr and EquityPandit. This confirms the page's "5M+ downloads" as a public figure and dates it to the end of your tenure.
- The formal launch on 15 March 2021 ran a one-week campaign with more than 200 YouTube creators and expected one million new users from the campaign alone. This is the fact that puts the DAU claim at risk (section 5).
- Series A November 2019, Series B September 2021 ($15M, Hashed, Nexus, Accel). You were there for the run-up to the Series B.
- The company was in stealth until 2021. Your "two pivots" happened inside a stealth-mode company, which is why no press documents them. **INFERENCE:** one pivot is the move to social, audio/video-led gaming that the March 2021 relaunch made public. The other is not identifiable from outside. You have to name both.

### 2c. What it does not prove (MISSING, in every version)

- A single decision that changed because of a person or a test. Two years of daily CEO reviews and not one recorded reversal.
- What the "user research" behind the platform-hopping finding was: who ran it, what method, what it said.
- What "helped run the hiring pipeline" and "shape how the team worked" consisted of. No number of interviews, no design task, no ritual you introduced.
- What shipped versus what was designed. Every image is a Figma export. The app was public on the Play Store for two years and no production capture exists on the page.
- What the pragmatic multi-tabling feature that "we did ship" looked like. The concept is shown; the shipped thing that justifies the concept is not.

---

## 3. The strongest material, ranked

| Rank | Artifact or decision | Where it is now | Why it is strong |
|---|---|---|---|
| 1 | Thirteen-state card board (`4b854647_states.png`) | Fig. 17 of 23, chapter 5 | Systems thinking at a glance. Contains the only evidence of alternatives on the site. Light-era, so it does not look dated. |
| 2 | The 2024 return | Not on the page | Former employer hires you back to redesign the money flows. Seniority, trust, and collaboration in one fact. |
| 3 | Retention loop (Figs. 11 to 15) plus the DAU number | Chapter 4 | Research finding, mechanism, and the only measured outcome on the site. Needs its timeline pinned. |
| 4 | Sit flow diagram (`102b090c_Frame_427320186.png`) | Fig. 1 | Branch design with cancel paths, a "Max wait 17" state, a slider that shows wallet balance and chips at once. The only flow diagram on the site. |
| 5 | The turn-keeping trio (Figs. 7, 8, 18) | Split across two chapters | One principle, three surfaces. Interaction design that a poker player would recognise as correct. |
| 6 | Buy-in slider animation (Fig. 16) | Chapter 5 | The only animated artifact on the site; the strategy doc graded interaction A- on it. |
| 7 | Cash history ledger and payment page (Figs. 3, 4) | Chapter 2 | State and copy craft ("You need ₹74 more"). Now belongs to the 2024 story as the 2019 baseline. |
| 8 | Two eras in one image inventory | Unused | The pivot evidence, if you name the pivots. |

---

## 4. What is weak, generic, repetitive, unsupported, buried, or unnecessary

### Unsupported or at risk (fix before anything else)

- **"The loyalty loop was the engine."** The Notion source only said "played a key role". The page upgraded it to causation. The March 2021 relaunch campaign is a confounder the page cannot currently rule out. **MISSING:** launch month of the loyalty program, month of the 25k reading, and what else shipped in the window.
- **"User research explained the gap."** **MISSING:** any detail. The original Notion said "on inspection and user research", which reads as analytics plus conversations. Say what it was or say "we observed".
- **"Directly paved the way for the pragmatic multi-tabling feature we did ship."** **MISSING:** the shipped feature.
- **"Two pivots shipped without the design function becoming the bottleneck."** Nobody can check this and it sounds like a line from a review. Cut.
- **"Design team grew from 2 to 10."** The Notion page's own Team property says "Me, 2 more Product Designers, 3 Product Managers, 3 Engineers, CEO". Ten designers and three designers are both on record. **INFERENCE:** the property describes your immediate squad and ten is the eventual team. Resolve, because a reader who finds both will assume the bigger number is inflated.
- **"~600 screens."** Asserted three times, evidenced zero times. Either show a zoomed-out Figma page inventory or say "hundreds".
- **Placeholder arithmetic inside real-money screens (FACT, from the images).** MTT details: prize pool ₹4,00,000 but the rank payouts shown (1st ₹2,50,000; 2nd to 3rd ₹1,50,000; 4th to 5th ₹95,000) sum to ₹7,40,000. The portrait lobby shows prize pool ₹4,24,220 with 14 entries; the landscape lobby shows ₹5,450 with 12 entries for the same tournament. On a page that argues "every number labelled", a careful reviewer will do the sum. Fix the data or crop the figures.

### Buried

- The thirteen-state card is the seventeenth image on the page. The slider is the sixteenth. The strategy doc already said the A-grade evidence is in "a chapter called The craft file". Still true.
- The three-options note on the state board is legible only at full size and is never mentioned in the caption.
- The pivots are the headline of chapter 1 and have no artifact anywhere.

### Generic or template

- The hero is a photoreal three-phone mockup with a neon tube and a plant (`bb737df0_Getmega.jpg`, also the homepage thumbnail). **MISSING:** provenance. It is either a stock mockup template or an AI render; neither shows a decision. It should be replaced by the state board or the sit flow, which are yours.
- Chapter 1's five-item checklist (T-01 to T-05) is context dressed as findings, and T-02, T-03, T-04 are the three most important claims on the site given one sentence each.
- Six pull quotes: "the wallet is not a feature. It is the handshake", "a tournament is mostly waiting", "when the input is money, the thumb cannot be allowed to hide the number", and three more. Keep at most one.
- "The craft file", "An honest scorecard", "Fin.", "CH 05 / 06": the shared template furniture the strategy doc flagged.
- The "Six screens out of six hundred" section is a gallery. The referral screens are the most generic images on the page. The paywall pair is more interesting than the page realises: it is the social-era product and a growth experiment, and it belongs in the pivot story, not the gallery.

### Repetitive

- "Conduit between product and engineering" three times on the page. "Daily CEO reviews" three times. "Two pivots" six times. "600 screens" three times. Each of these is a claim that should appear once with evidence, not thrice as a refrain.
- The wallet chapter duplicates Mega Poker's Money In and Money Out chapters. With the two pages joined, this resolves by assignment rather than deletion.

### Unnecessary

- The outcome-data note above the contents. Here it actually has content (real numbers exist), so keep one sentence and drop the "Chapter 06 keeps the score honest" line.
- The multi-tabling concept at its current length. Keep it as one gallery item with its honesty note, unless the shipped feature can be recovered.

---

## 5. FACT / INFERENCE / MISSING ledger for the claims a recruiter will test

| Claim on the page | Status | Basis |
|---|---|---|
| Second product designer, 2019 to 2021, full time | FACT | Your supplied bio facts; Notion |
| Two pivots | FACT that the company changed direction (stealth to public social relaunch March 2021); MISSING which two | Press; artifacts show two visual eras |
| Daily CEO reviews | FACT asserted by you; no artifact | Notion and page |
| Team grew 2 to 10; helped run hiring | FACT asserted; INFERENCE on the 3 vs 10 discrepancy; MISSING specifics | Notion Team property vs body copy |
| 5M+ Play Store installs | FACT, public | Entrackr, EquityPandit, March 2021 |
| Weekday DAU 15k to 25k | FACT that these were the internal numbers you worked against; causation MISSING; window MISSING | Your assertion; March 2021 campaign is a confounder |
| Players platform-hop (research finding) | FACT asserted; method MISSING | Notion |
| Thirteen states | FACT | Board counted: thirteen labelled cards |
| Three card options presented | FACT | Note on the board itself |
| Slider lifts value on press | FACT | GIF |
| Multi-tabling concept never shipped; a pragmatic version did | FACT (concept); MISSING (shipped version) | Page |
| Landscape for Rummy and Pool | FACT (landscape layouts exist); Rummy and Pool as the reason is your assertion | Two landscape images |
| ~600 screens | MISSING | No inventory |
| Mega Poker is Getmega | FACT | Notion freelance folder; Instagram; Gutshot snippet |
| Mega Poker shut after the poker ban | CONTRADICTED as worded | Play listing removed December 2024; ban August 2025; Tracxn active FY25 |

---

## 6. Thesis and episodes

### Thesis

> I spent two years inside one real-money product as its second designer, through two changes of direction, designing the states nobody briefs: every stage of a tournament, every state of a contest card, every step of a loyalty loop, every branch of sitting down at a table. The company brought me back three years later to redesign the flows where its money moves.

The recruiter version, for a card or a summary block: *Two years in-house · second designer · one measured retention outcome · rehired by the same company in 2024.*

This narrows the strategy doc's stakes-based thesis to what this project alone can prove. Khiladipro proves an interface that works with nobody holding the phone. SEDP proves legibility of a dense public system. Getmega proves duration: what a designer does when they stay, and what a company does when that designer leaves.

### Episode 1: The retention push (research to mechanism to number)

What you knew: five million installs, fifteen thousand weekday players, players hop platforms. What you built: a loop with five visible parts (hero task, milestone ladder, drip claim, scratch tiers, scratch-at-deposit). What happened: weekday DAU rose to around 25k, team outcome, with the window stated. **Recovery needed:** the window, the research method, one alternative considered (for instance a streak system versus tasks), and one review that changed it. Without the window, the number becomes "activity rose during the rollout period", which is still usable.

### Episode 2: One card, thirteen states (and the three mechanisms that keep a player in the hand)

The systems story. Open on the board. Name the anchored core and the swappable slots. Show the three-options note as a caption and say what the three variations were if you can recover them. Then the siblings: pinned leaderboard row, Your Turn pill, floating bubble, as one principle applied three times. **Recovery needed:** what the card's absence cost before it existed (the scorecard already says "we paid for its absence as the team grew": paid how?), and the three Free/Paid variants.

### Episode 3: two candidates, pick after recovery

- **(a) Two eras in one product.** The pivot told through the artifacts: the 2019 dark tournament surface and the 2021 light social surface, with the paywall pair as the growth experiment of the second era. What you redesigned, what you rebuilt, what you retired. This is unique to this page and needs only naming: which two pivots, and one flow that was retired and why.
- **(b) The sit flow through its rounds.** The page says the foundational flow "went through many rounds of redesign." If two of those rounds survive in Figma, this becomes the site's first before/after that shows a decision changing. It is the higher-value episode and the less likely to be recoverable.

### Coda: 2024

Three paragraphs at most. The company called back. The brief was the withdrawal flow and the self-transfer offer. Link to the Mega Poker page, which owns the detail. Do not repeat the wallet.

---

## 7. Keep, cut, compress, restore, emphasise

**Keep as is.** The pronoun note in chapter 1 ("I" means flows I drove; "We" means the team). It is the most senior sentence on the page. The three "What I'd do differently" bullets about the component system, the responsible-play brief, and writing decisions down. The honesty note on the multi-tabling concept. The buy-in slider GIF. The turn-keeping screens.

**Cut.** The photoreal hero. Five of six pull quotes. The T-01 to T-05 checklist as a format (its facts move into the timeline strip below). The referral pair. "Two pivots shipped without the design function becoming the bottleneck." "Fin." The 600-screen refrain. The "engine" causation.

**Compress.** Chapter 2 (wallet and payments) to one figure and two sentences, framed as the 2019 baseline the 2024 work revisited. Chapter 3 (MTT) to the details page plus the turn-keeping trio; the lobby and rebuy screens go to the gallery. The multi-tabling concept to one gallery item. The scorecard's "Owned & shipped" list to the summary block at the top.

**Restore from the Notion source.** "Fish" alongside "whales": the research finding in the Notion version is sharper ("wherever they were getting good tournaments and noob players to crush") and more obviously a real finding than the page's tidied version. The Notion team line, once you resolve 3 versus 10.

**Emphasise.** The state board as the opening image. The three-options note. The 2024 return. The artifact dates as the timeline. The pronoun note.

---

## 8. Structure for a skim and for a deep read

```
Summary block (skim stop 1, ~10 s)
  Problem · Role: second product designer, full time · Team: N designers → 10, 3 PMs, 3 engineers, CEO
  Duration: 2019 to 2021, plus a 2024 return · Shipped: sit flow, MTT surface, wallet, loyalty loop, contest card
  Strongest defensible result: weekday DAU ~15k → ~25k after the loyalty loop (team outcome, window stated)

Opening artifact (skim stop 2)
  The thirteen-state board, full bleed, one caption naming the anchored core and the three options offered

Timeline strip (skim stop 3, replaces CH 01)
  2019 joins as 2nd designer → Aug 2019 MTT (dated in the UI) → 2020 rewards and scratch cards (dated) →
  Mar 2021 public relaunch as social gaming → 2021 leaves → 2024 called back
  Each stop carries one thumbnail. The two pivots are named here, once.

Episode 1  The retention push        (what I knew → what we considered → what I chose → what changed → the number, with its limit)
Episode 2  One card, thirteen states (+ the turn-keeping trio)
Episode 3  Two eras / the sit flow's rounds  (whichever recovery supports)

Team, in three lines
  2 → 10, hiring pipeline, daily CEO reviews: one concrete recovered episode each, or plain facts with no adjectives

Coda  Three years later they called back → Mega Poker page

Evidence gallery (collapsed)
  Wallet, payments, history · landscape lobby and rebuy · paywall pair · referral · multi-tabling concept with its note

Outcome, once, with its limit
Next case study
```

A recruiter who reads only the summary block, the opening artifact, the timeline strip, and the three episode headlines has the whole argument in under a minute. A design manager who reads the episodes gets input, alternative, decision, collaborator, evidence, and limit for each. Target length about six minutes, down from eleven.

---

## 9. Evidence, memories, and assets to recover before writing

Ordered by how much of the page depends on each.

1. **The Getmega / Mega Poker relationship.** Same CEO? Who reached out, and why you? Retainer or fixed engagement? Any message or brief that can be quoted with permission. This is the coda and the strongest line on the site.
2. **The retention timeline.** Month the loyalty program launched, month of the 25k reading, and whether the March 2021 creator campaign overlapped. Also what the research was. Decide the sentence only after this.
3. **The three Free/Paid card variants.** They are referenced on the board. If the Figma frames survive, they are the alternatives evidence for episode 2.
4. **The sit flow's earlier rounds.** Any surviving version of the flow before the one on the page. Decides episode 3.
5. **The two pivots, named.** What the company was doing before each, what it did after, which flows you retired. One retired flow with a sentence on why.
6. **One CEO-review reversal.** One morning where a decision went a different way than you proposed, or where you moved the CEO. The site has zero of these and this role had hundreds of chances.
7. **Team growth specifics.** How many designers you interviewed, the design task or process you wrote, one ritual you introduced. Resolve 3 versus 10.
8. **The shipped multi-tabling feature.** Screens or a description. Otherwise narrow the sentence.
9. **A production capture.** The app was public for two years. Old APK listings (com.mega.app on mirror sites), the GetMega YouTube and Instagram feeds from 2020 to 2021, or the Wayback Machine for getmega.com may hold shipped screenshots. One production image per era would make this the first page on the site with shipped work.
10. **Hero image provenance.** Stock template or AI. It goes either way; it needs to be labelled or replaced.
11. **Figure data fixes.** The MTT payout sum and the portrait/landscape prize pool mismatch, if you still have the Figma; otherwise crop.
12. **Source for the shutdown sentence** on the Mega Poker page, or narrow it to the December 2024 listing removal.

Do not publish anything from the Notion "Meta Info" or "Salary @ Getmega" pages. I read the first to check the engagement shape and did not use the rest.

---

## 10. The three highest-leverage next actions

1. **Decide the Getmega and Mega Poker scope together, today.** Confirm the relationship, decide that Getmega gets the coda and Mega Poker gets the honest client line, and update the rehire count everywhere it appears. This is a thirty-minute decision that changes the Getmega page, the Mega Poker page, the homepage cards, the About timeline, and the site's headline claim about clients coming back.
2. **Pin the retention timeline before writing a word of episode 1.** Launch month, DAU reading month, campaign overlap, research method. The flagship's only number either survives this or gets rewritten as a temporal statement. Either is fine; not knowing is not.
3. **Recover the alternatives: the three card variants and the sit flow's rounds, plus one CEO-review reversal.** These are the "changed my mind because of evidence or a person" proof that every page on the site lacks, and this project is the most likely place to find them because it had two years and a daily review.

---

## Where this departs from the 14 September strategy doc

- **The rehire count.** The doc said two of three freelance clients came back. All three did, and one of them was your former employer. The doc's thesis clause should change.
- **The wallet overlap.** The doc said Getmega should stop leading with the wallet because Mega Poker owns it. Agreed, but the reason is now that they are one company and the two pages divide one story, not that they compete.
- **Getmega's screens "look their age".** The dark 2019 screens do. The light 2021 screens and the state board do not. Lead with the latter and the concern goes away.
- **Mega Poker cut to four minutes.** Still right, but its framing changes from "a second wallet study" to "Getmega, act two", which makes the cut easier because the context lives on the Getmega page.
- **Everything else** in the doc's Getmega paragraph (two decision episodes, move the slider and the pill into the first minute, add one CEO-review decision, cut to six minutes) stands.

---

## Sources consulted outside the repo

Fetched and read: [Entrackr, September 2021](https://entrackr.com/2021/09/exclusive-south-korean-vc-firm-hashed-leads-15-mn-round-in-getmega/) · [EquityPandit, March 2021](https://www.equitypandit.com/gaming-startup-getmega-launched-targets-50-million-users/) · [Tracxn company profile](https://tracxn.com/d/companies/getmega/__oRyyUsxjADloLZuZiD9FyduN70UCZX6eJtP9wAU_Vho) · Notion pages "Getmega Mobile App Flows", "Getmega" (Freelance / Finished), "Finished", "Meta Info".

Search snippets only (page blocked or not opened): [Gutshot Magazine on Mega Poker](https://gutshotmagazine.com/poker/getmega/) · [AppBrain listing for Mega Poker Game](https://www.appbrain.com/app/mega-poker-game/com.play.megapoker.get.texasholdem) · [Instagram @getmega](https://www.instagram.com/getmega/?hl=en) · [YourStory, March 2021](https://yourstory.com/2021/03/youtube-users-influencer-tanmay-bhat-getmega-social-real-money-gaming-platform) · [PokerNews on the August 2025 ban](https://www.pokernews.com/news/2025/08/black-friday-for-indian-poker-sites-halt-deposits-in-wake-of-49495.htm) · [TechCrunch on the ban](https://techcrunch.com/2025/08/21/as-india-bans-real-money-games-dream-sports-mpl-start-pulling-the-plug).
