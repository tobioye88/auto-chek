import { Test, TestingModule } from '@nestjs/testing';
import { HackerNewsHelper } from '../../../helpers/hacker-news/hacker-news.helper';
import { IHackerNewsStory } from '../../../interfaces/hacker-new.interface';
import { WordService } from './word.service';

const mockStories = [
  {
    by: 'leereeves',
    id: 32312161,
    parent: 32311972,
    text: '&gt; Someone quoted Trump&#x27;s opinion, several of us pointed out that it&#x27;s not particularly novel or unique, and now we are being lectured about how absolutes are wrong?<p>I&#x27;m not talking about Trump&#x27;s opinion about Germany&#x27;s dependence on Russia, which, I agree, is &quot;not particularly novel or unique&quot;.<p>Why did you bring up the TPP, even though it&#x27;s irrelevant to this conversation, if you didn&#x27;t want to talk about it? Purely as a criticism of Trump (&quot;glass houses&quot;)?',
    time: 1659388725,
    type: 'comment',
  },
  {
    by: 'glorioushubris',
    id: 32312160,
    parent: 32306328,
    text: 'I remember reading this when it was published, as I was living in a college dorm at the time and strongly considered using this method to produce a master key. I didn&#x27;t, because I couldn&#x27;t think of anything I&#x27;d want to do with the master key once I had it. But I enjoyed knowing that I could make one if I&#x27;d wanted to.',
    time: 1659388722,
    type: 'comment',
  },
  {
    by: 'dragonwriter',
    id: 32312159,
    parent: 32311530,
    text: '&gt; Opendoor got $1.9B in funding for this business model. In ten rounds. Did none of those VCs do anything approximating due diligence? Or did they do it and just not care that it was basically an AI-washed version of a very old con?<p>“Brazenly breaking the law in a way that probably won&#x27;t get cracked down on until after we’ve made a profitable exit” doesn&#x27;t seem to business model VCs are at all loathe to fund.',
    time: 1659388720,
    type: 'comment',
  },
  {
    by: 'ZainRiz',
    descendants: 0,
    id: 32312158,
    score: 1,
    time: 1659388720,
    title: 'PyTorch Design Philosophy',
    type: 'story',
    url: 'https://pytorch.org/docs/master/community/design.html',
  },
  {
    by: 'bspear',
    dead: true,
    id: 32312157,
    parent: 32312051,
    time: 1659388707,
    type: 'comment',
  },
  {
    by: 'obarthelemy',
    id: 32312156,
    parent: 32310392,
    text: 'I had to uninstall the discord app for my Core i5 Windows PC because it would randomly peg the CPU at 100% and become mostly unresponsive (several seconds to register keystrokes...). Now it&#x27;s only a web tab I load when I need to.<p>I was relying on the Android app for notifications... but if it&#x27;s now becoming as bad as the Windows and the Web apps, that&#x27;s going to be an issue. I can&#x27;t uninstall it from everywhere, not a messaging app.',
    time: 1659388702,
    type: 'comment',
  },
  {
    by: 'oldgradstudent',
    id: 32312155,
    parent: 32310565,
    text: 'What exactly makes a food &quot;ultraprocessed&quot;?<p>Is Parmesan cheese ultra processed? or processed just right? What about red wine? Tofu? Coq au Vin?',
    time: 1659388702,
    type: 'comment',
  },
  {
    by: 'vivekar',
    dead: true,
    id: 32312154,
    score: 1,
    time: 1659388699,
    type: 'story',
  },
  {
    by: 'yakak',
    id: 32312153,
    parent: 32311008,
    text: 'I could buy a 6E Intel wifi card for next to nothing, yet it doesn&#x27;t seem to be possible to buy a consumer router with SFP+ or SFP28 fiber and 6E so I&#x27;m stuck as to how I am supposed to use these faster WIFI endpoints?',
    time: 1659388695,
    type: 'comment',
  },
  {
    by: 'thefounder',
    id: 32312152,
    parent: 32311524,
    text: '&gt;&gt; why not just slap your website in a webview<p>Because safari sucks and that makes webview suck too. It&#x27;s like asking why people don&#x27;t use ie6 for web apps.',
    time: 1659388694,
    type: 'comment',
  },
  {
    by: 'sammalloy',
    id: 32312151,
    parent: 32311528,
    text: '&gt; The Philippines are an example where corruption as well as high pop growth dragged down progress. China too, initially was too authoritarian and too ideological<p>One aspect about this topic that I’ve never seen discussed anywhere, is the bidirectional relationship between countries, such as how authoritarian and corrupt countries export their authoritarianism and corruption to other countries in the same way that the US exports their weapons, capitalism, entertainment, and soft power, but very rarely, if ever, their &quot;freedom&quot;, as if that’s the one thing, in spite of the excessive rhetoric, that isn’t fungible.<p>For an example of what I’m talking about, much of the political chaos and tendency towards authoritarianism in the US that we’ve seen in the post-9&#x2F;11 era, has been imported from autocratic and authoritarian regimes.  From what I’ve read, the first reports of massive online political trolling operations outside of Russia and China were first observed and reported on from the Philippines at the beginning of the Obama admin in the US.<p>Interviews with regional human rights groups at the time noted that the trolling operations in the Philippines were being used in the same way as repressive regimes in the Middle East had previously used them—to deliberately spread conspiracy theories so as to destabilize the information held by the electorate and to shift the power from independent media sources that provide checks and balances on power to authoritarian regimes which relied on the conspiracy theories to foment confusion and consolidate hegemony.<p>We saw the same thing occur in the US beginning in 2016, with the rise of Trumpism and its associated conspiracy theories known as QAnon.  Was it just a coincidence that their origin point was also the Philippines?',
    time: 1659388685,
    type: 'comment',
  },
  {
    by: 'misnome',
    id: 32312150,
    parent: 32311831,
    text: '“I lost the keys, but trust me I’m him”<p>Although _faking_ access to the keys should probably be automatically disqualifying.',
    time: 1659388684,
    type: 'comment',
  },
  {
    by: 'aidangrimshaw',
    descendants: 0,
    id: 32312149,
    score: 1,
    time: 1659388667,
    title: '2021 Taxes: open-source Edition',
    type: 'story',
    url: 'https://chandlerswift.com/2022/04/18/taxes',
  },
  {
    by: 'drenz',
    id: 32312148,
    parent: 32306920,
    text: 'Tanooki Labs | Experienced Full-Stack Rails and React Developer | Remote | Freelance\nTL;DR – All you can eat, flexible full-time or contract dev work and amazing products to work on.<p>Interested? Here’s the full story:<p>We are Tanooki Labs, a product and development studio based in New York City that works with entrepreneurs on early stage products.<p>We provide product-minded developers with fun projects to work on, as well as the flexibility and freedom to continue working on their own goals (be it recording an album, crafting your next app, or raising the newest member of your family).<p>We choose our clients and projects carefully, and every product we build requires us to tackle new and exciting challenges. We also reject the idea that software development has to feel like a grind. We work 35 hours per week, support flexible schedules, are family friendly, and work with both local and remote developers.<p>We’re looking for pragmatic developers who build with empathy for the users a deep understanding of the product we’re building and our client’s businesses an eye towards writing well architected code<p>You should have:<p>- a strong background in full-stack Ruby on Rails<p>- experience working in Javascript, especially React<p>- experience developing applications from the ground up<p>- experience with behavior-driven development and unit testing<p>- a product-minded focus when creating applications<p>- good communication skills in English and a location in North America<p>If that sounds like you, please apply here: <a href="https:&#x2F;&#x2F;tanooki-labs.workable.com&#x2F;jobs&#x2F;190522" rel="nofollow">https:&#x2F;&#x2F;tanooki-labs.workable.com&#x2F;jobs&#x2F;190522</a>',
    time: 1659388662,
    type: 'comment',
  },
  {
    by: 'nopeYouAreWrong',
    id: 32312147,
    parent: 32311013,
    text: 'Immediately made me think of this <a href="https:&#x2F;&#x2F;youtu.be&#x2F;XM0uZ9mfOUI" rel="nofollow">https:&#x2F;&#x2F;youtu.be&#x2F;XM0uZ9mfOUI</a>',
    time: 1659388653,
    type: 'comment',
  },
  {
    by: 'micromacrofoot',
    id: 32312146,
    parent: 32310909,
    text: 'In this analogy Disney is the Singaporean government. Disney can not directly enforce the death penalty, Singapore can. So the author wants you to imagine what Disneyland would be like if they could, and wants you to imagine Singapore as that.',
    time: 1659388651,
    type: 'comment',
  },
  {
    by: 'metadat',
    id: 32312145,
    parent: 32308888,
    text: '<a href="https:&#x2F;&#x2F;www.redox-os.org&#x2F;" rel="nofollow">https:&#x2F;&#x2F;www.redox-os.org&#x2F;</a>',
    time: 1659388649,
    type: 'comment',
  },
  {
    by: 'aj7',
    id: 32312144,
    parent: 32278880,
    text: 'That line is Southwest Airlines.',
    time: 1659388637,
    type: 'comment',
  },
  {
    by: 'tiborsaas',
    id: 32312143,
    parent: 32311921,
    text: 'I&#x27;m a 39 old nerd and I really have very little to hold me up here. Who says that building a social life is easy? I did that before too when I moved to the capital from my hometown at the age of 26, I barely knew anybody. I did that twice after that for shorter periods of time, totally works. Follow your interests and pals&#x2F;friends will come.',
    time: 1659388634,
    type: 'comment',
  },
  {
    by: 'tempsy',
    id: 32312142,
    parent: 32312078,
    text: 'I thought the trade off was largely understood by the seller eg you take a small discount in exchange for a very fast and reliable sales process where you can sell to Opendoor in days vs weeks&#x2F;months in a traditional sales process?',
    time: 1659388631,
    type: 'comment',
  },
  {
    by: 'morelisp',
    id: 32312141,
    parent: 32299276,
    text: 'There’s no special skill overlap between programming and repairing consumer electronics with parts from other consumer\nelectronics.',
    time: 1659388626,
    type: 'comment',
  },
  {
    by: 'xefttree',
    id: 32312140,
    parent: 32306920,
    text: 'Retool | Remote(currently) Hybrid (09&#x2F;2022) | Full-time<p>We enable developers to build internal tools remarkably fast: <a href="https:&#x2F;&#x2F;retool.com&#x2F;" rel="nofollow">https:&#x2F;&#x2F;retool.com&#x2F;</a>. Lovely to see some of our customers here!\nWe recently raised our series C2! <a href="https:&#x2F;&#x2F;news.ycombinator.com&#x2F;item?id=32264454" rel="nofollow">https:&#x2F;&#x2F;news.ycombinator.com&#x2F;item?id=32264454</a> Please checkout the career site <a href="https:&#x2F;&#x2F;retool.com&#x2F;careers&#x2F;" rel="nofollow">https:&#x2F;&#x2F;retool.com&#x2F;careers&#x2F;</a>',
    time: 1659388623,
    type: 'comment',
  },
  {
    by: 'yamrzou',
    descendants: 0,
    id: 32312139,
    score: 1,
    time: 1659388616,
    title: 'You Can’t Simply Decide to Be a Different Person',
    type: 'story',
    url: 'https://www.theatlantic.com/health/archive/2022/01/self-control-habit-new-years-resolutions/621200/',
  },
  {
    by: 'panick21_',
    id: 32312138,
    parent: 32299805,
    text: 'What is more interesting to me is asking the question based on first principles.<p>If you consider the global electricity and energy demand and wanted to meet it, what you produce the least amount of green house gases, use the least amount of land, require the least amount of mining.<p>If you actually do that nuclear wins easily witch suggest there is some other process at work that makes sure this is not translated into reality.',
    time: 1659388604,
    type: 'comment',
  },
  {
    by: 'idiotsecant',
    id: 32312137,
    parent: 32309465,
    text: 'There isn&#x27;t anything inherently &#x27;cleaner&#x27; about a large city surrounded by a couple of mirrors vs a few dozen smaller ones. It certainly is guaranteed to be more expensive, though!',
    time: 1659388598,
    type: 'comment',
  },
] as IHackerNewsStory[];

describe('WordService', () => {
  let wordService: WordService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [WordService],
    }).compile();

    wordService = app.get<WordService>(WordService);
  });

  it('should test getTopTenMostOccurringWordsInTitles', async () => {
    jest
      .spyOn(HackerNewsHelper, 'getLastStories')
      .mockResolvedValue(Promise.resolve(mockStories));

    expect(
      await wordService.getTopTenMostOccurringWordsInTitles(),
    ).toStrictEqual<any[]>([
      ['pytorch', 1],
      ['design', 1],
      ['philosophy', 1],
      ['2021', 1],
      ['taxes', 1],
      ['opensource', 1],
      ['edition', 1],
      ['you', 1],
      ['cant', 1],
      ['simply', 1],
    ]);
  });

  it('should test getTopTenMostOccurringWordsInTitles to return empty list', async () => {
    jest
      .spyOn(HackerNewsHelper, 'getLastStories')
      .mockRejectedValue({ message: 'Some server Error' });
    expect.assertions(1);

    try {
      await wordService.getTopTenMostOccurringWordsInTitles();
    } catch (e) {
      expect(e.message).toBe('Some server Error');
    }
  });

  it('should test getTopTenMostOccurringWordsInTitlesLastWeek', async () => {
    expect(
      await wordService.getTopTenMostOccurringWordsInTitlesLastWeek(),
    ).toStrictEqual<any[]>([]);
  });

  it('should test getTopTenMostOccurringWordsInTitlesLast600', async () => {
    expect(
      await wordService.getTopTenMostOccurringWordsInTitlesLast600(),
    ).toStrictEqual<any[]>([]);
  });
});
