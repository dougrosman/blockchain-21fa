# Session 01 - 9/7/21

## Agenda

### Morning

1. Fill out [introductory survey](https://forms.gle/J3cy3QTPAkDBhTn79)
2. Greetings and Introductions
3. Syllabus Overview
4. **Break**
5. Course Overview: From Doge to DAOs
6. What the heck is a blockchain?

### Afternoon

1. Setting up our tools
   1. Use Firefox or Chrome, no Safari or Edge
   2. Install the [MetaMask plugin/browser extension](https://metamask.io/) and create an account and wallet
   3. Add your MetaMask wallet address to this [Google Doc](https://docs.google.com/document/d/1cSG_7wc2ZxakW5AQsfg7-Se_rLnSV-tfDZKyISfvlGI/edit?usp=sharing)
   5. Download my contract code here: [MyToken.sol](code/session01/ERC20Workshop/MyToken.sol)
2. Create your own Cryptocurrency workshop
   1. Rai Token
   2. Workshop Explanation
   3. Create Tokens
   4. Share tokens with each other
3. Go over assignments for the week.

### Assignments

#### **1. READ: [Artists Re:Thinking the Blockchain (download free PDF)](http://torquetorque.net/wp-content/uploads/ArtistsReThinkingTheBlockchain.pdf) (submit responses to Canvas)**

Task: Read the following excerpts and write down at least 3 things:

   1. What is a term you encountered that you would like explained further?
   2. What is a question you have after reading any of these?
   3. What is a comment you have about something you read?

Read: **A Quasi Proto Preface + Introduction** (pg. 9-34)
Read: **FinBook: Literary Content as Digital Commodity** (41-49)
Read: **Love on the Block – Max Dovey** (251-259)

Note: The first note in this chapter reads as follows: *"In practice, we do not use the blockchain, but we would invite the reader to imagine that we do, as it makes the technical development significantly easier, without materially affecting the experience."* (Use this as a guiding principle for this class. Meaning, you don't to materially use a blockchain in order to conceptually use a blockchain)

#### **2. DO: The aesthetics of exchange.**

**Due:** September 14.

* Presentations will take place at the end of the afternoon session.
* Slideshow PDFs due on Canvas by 11:59pm on that Tuesday.

**The afternoon portion of class on September 14 will be dedicated to working on these tokens and presentations.** Feel free to do as much (or as little) of the assignment as you'd like before then, but you will have two full hours on Tuesday to mint your tokens and create your slideshows. ***I highly recommend at least reading through the assignment guidelines, and having an idea of what you're going to make when you arrive to class.***

##### **Summary**

* Create and mint your own cryptocurrency in the form of an ERC20 token.
* Create a 3-4 minute slideshow presentation to explain the purpose of your token and convince us why it matters (or doesn't).
* Present your slideshow at the end of our second class on Tuesday, September 14.

##### **Assignment goals**

1. Consider how money in general functions as a technology, and what the affordances of that technology might be.
2. Consider the aesthetic dimensions of a currency, and how a currency can be an engine for constructing new economies, cultures, and communities.
3. Consider how the "rules" of a currency can be programmed into code.
4. Consider what it means to create an alternative currency *within* our current economic system, and what it means to create a currency to *replace* our economic system.

##### **Part 1: Create your cryptocurrency**

Based on the ERC20 workshop we did in class on September 7 (visit the Session 01 page for guides), create a new ERC20 token with its own custom attributes. Think of these attributes as aesthetic dimensions:

1. **Token Name** (Can be as long as you want, but really long names will likely be cut off in MetaMask)
2. **Token Symbol** (3 or 4 characters, all caps. Like a stock ticker. For example: **BTC** (Bitcoin), **ETH** (Ethereum), **DOGE** (Dogecoin)
3. **Total amount** (anywhere between 0 and...a really huge number. See the template contract for details).
4. **Decimal places** (a number between 0-18. 18 is the default for ERC20 tokens)
5. **Fixed Supply**? (true means you can't mint any more of your token in the future, false means you can mint more of your token in the future)

The following are prompts to consider when creating your token. The "rules" you define for your currency shape its impact; how will those rules support your token's purpose/goal? Answers to some of these might not make themselves known until you start making the thing.

1. What is the stated goal of your token, and how do its properties support that goal?
2. What are the implications of your token, and how might they support or detract from the token's goals (for example, how might [Poop Coin](https://decrypt.co/11533/theres-now-a-literal-shitcoin-to-track-san-francisco-street-poop), a token whose goal is to solve the public defecation problem in San Francisco, *actually* affect things?)
3. Who can receive the token?
4. Who can distribute the token?
5. **What must happen for tokens to be created/distributed (“Proof-of-X”)? (required)**
6. In what “reality” does this token exist?
   1. **Contemporary reality** - I imagine this token entering the world as we know it today
   2. **Speculative dystopia** - I imagine the token in an imagined dystopia/the token creates or adds to the dystopia
   3. **Speculative utopia** - I imagine the token in an imagined utopia/the token creates or adds to the utopia
   4. **Other.**

##### **Part 2: Create a slideshow and present your token**

*Before our next class, I will create a sample slideshow for reference.*

* Create a slideshow in Google Slides/Keynote/Powerpoint to accompany a 3-4 minute presentation. Be prepared to share your screen and present your slides from your computer. Presentation order will be chosen at random.
* Don't think of this as a class presentation where you explain what you did for the assignment. Rather, consider that the token you are presenting actually exists, and you are not only explaining its features and purpose, but why your token matters (or doesn't). Shill us your token!
* Pretend you're attending a cryptocurrency convention, or an arts festival, or maybe you're just some person on the street with a microphone and a portable projector and screen. Create your own context.
* Your slideshow must include:
  * Your **Token Name**
  * Your **Token Symbol**
  * The **Contract Address** (e.g. 0x94574930F275952a5E80B995384165D01D484dBB)
  * A **QR code** for the contract address (I will show this in class)
  * The **Total Supply**
  * Whether or not it has a Fixed Supply
  * An explanation of your **Proof-of-X** "algorithm" that explains how tokens are created/acquired/distributed.
  * A one-sentence **statement of purpose**
  * A **logo** graphic for your token
  * Any images, videos, GIFs, audio, text, etc. that help explain the features of your token, how it's meant to function, and why it should matter to us.

##### **Thoughts before starting this assignment**

* Have fun with this assignment! Treat this as a performance piece, if you'd like. Make it weird, make it poetic, make it realistic, whatever. Your token, your rules.
* Avoid perfection! The time frame for this project means you cannot possibly consider all the implications of your token. Just put something out there. Don't overthink it! (we'll have plenty of time this semester for overthinking things)
* Avoid perfection! Your slideshow presentation can be super rough and aesthetically unappealing (slideshow presentations are inherently aesthetically unappealing, after all). The idea comes first :)
* Consider involving your audience!
* If the purpose of an alternative currency seems cloudy to you, consider already existing alternative currencies, and how they incentivize certain behaviors, or facilitate the function of certain contexts (e.g. poker chips in a casino, Monopoly money, World of Warcraft Gold, Travel Rewards points on your credit card, Starbucks rewards points, etc.)

##### **Helpful resources/inspiration**

* [coinmarketcap.com](https://coinmarketcap.com) — There are literally thousands upon thousands of existing cryptocurrencies. CoinMarketCap lists of 6500+ "verified" currencies. Scroll through these and click on any that sound interesting to you. Protip: the further you get from the front page, the more strange some of these currencies get.
* [23 Weird, Gimmicky, Straight-Up Silly Cryptocurrencies (PC Mag)](https://www.pcmag.com/news/23-weird-gimmicky-straight-up-silly-cryptocurrencies)

##### **How to submit this assignment**

Export or download your slideshow presentation as PDF, and upload the PDF to Canvas.
