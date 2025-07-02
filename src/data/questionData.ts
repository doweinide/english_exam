import type { Chapter, QuestionSet } from '@/types/question';

/**
 * 初始化题集的ID和标题
 * @param data 原始题库数据
 * @returns 初始化后的题库数据
 */
function initQuestionSetsData(data: Chapter[]): Chapter[] {
  // 深拷贝数据，避免修改原始数据
  const newData = JSON.parse(JSON.stringify(data)) as Chapter[];

  // 记录每种类型的题集数量
  const typeCounter: Record<string, number> = {
    reading: 0,
    cloze: 0,
    translation: 0,
  };

  // 遍历所有章节和题集
  newData.forEach((chapter, chapterIndex) => {
    // 更新章节ID（如果需要）
    if (!chapter.id) {
      chapter.id = `chapter${chapterIndex + 1}`;
    }

    // 遍历题集并更新ID和标题
    chapter.questionSets.forEach(set => {
      // 根据类型计数
      typeCounter[set.type]++;

      // 更新ID
      set.id = `${set.type}${typeCounter[set.type]}`;

      // 更新标题
      const typeText =
        set.type === 'reading'
          ? '阅读理解'
          : set.type === 'cloze'
            ? '完形填空'
            : '英译汉';
      set.title = `${typeText} 第${typeCounter[set.type]}篇`;
    });
  });

  return newData;
}

// 示例题库数据
const rawQuestionData: Chapter[] = [
  {
    id: 'chapter1',
    title: '第一套题',
    description: '包含阅读理解和完形填空',
    questionSets: [
      {
        id: 'chapter1-reading2',
        title: '阅读理解 2',
        description: '关于美国100美元纸币重新设计的阅读理解',
        type: 'reading',
        article: {
          id: 'article2',
          title: 'Redesign of the $100 Bill',
          titleCN: '100美元纸币的重新设计',
          content: `The U.S. Treasury Department has redesigned the $100 bill, and has begun releasing the new currency recently. Treasury Department spent nearly 10 years on the redesign and has added a number of state-of-the-art features: micro printing, color-shifting ink, a polymer(聚合物) security thread. The most striking change, however, is the enlargement of Benjamin Franklin's portrait: he now dominates the bill like a movie star in a newspaper advertisement.
    The money we carry around is so familiar that whenever a new bill or coin is introduced, it creates a ripple(波动) in our ordinary lives. But not much more than a ripple, and since few people use $100 bills regularly, most Americans greet the arrival of the new note with no stronger emotion than curiosity.
    Some foreigners, by contrast, have become clearly worried by the news of its arrival. Around the world, U.S. currency—and the $100 bill in particular—is often treated as the ultimate repository(贮藏所) of value. The Federal Reserve estimates that two-thirds of all U.S. cash circulates outside the United States. In nations where inflation is high and where there are few credible banking institutions—from Latin America to Africa—people save and conduct business in $100 bills. And with the U.S issuing new $100 bills, many abroad are worrying that the ones they already have are about to become worthless.
    The fear is most widespread in Russia. The Russian Central Bank estimates that somewhere between $15 billion and $20 billion of U.S. currency is in Russia, about 80% of it in the form of $100 bills. Everyone from small savers to businessmen to members of Mafia(黑手党) relies on hundreds, so the changes in the bill are causing high anxiety. Many Russians have already changed their meager(微不足道) supply of $100 bills into smaller U.S. notes. But over the next few years Treasury plans to redesign every note except the $1 bill.`,
          contentCN: `美国财政部重新设计了100美元纸币，最近已开始发行新货币。财政部在重新设计上花费了近10年时间，并增加了许多先进的特征：微缩印刷、变色油墨、聚合物安全线。然而，最引人注目的变化是本杰明·富兰克林肖像的放大：他现在像报纸广告中的电影明星一样占据了纸币的主导地位。
    我们随身携带的钱是如此熟悉，以至于每当引入新的纸币或硬币时，它都会在我们的日常生活中引起一阵波动。但也只是一阵波动而已，而且由于很少有人经常使用100美元纸币，大多数美国人对新纸币的到来只是感到好奇，没有更强烈的情绪。
    相比之下，一些外国人对它到来的消息明显感到担忧。在世界各地，美元——尤其是100美元纸币——常常被视为价值的最终贮藏所。美联储估计，所有美元现金的三分之二在美国境外流通。在通货膨胀高且可靠银行机构少的国家——从拉丁美洲到非洲——人们用100美元纸币储蓄和进行商业活动。随着美国发行新的100美元纸币，许多外国人担心他们现有的纸币即将变得一文不值。
    这种担忧在俄罗斯最为普遍。俄罗斯中央银行估计，俄罗斯有150亿至200亿美元的美元货币，其中约80%是100美元纸币的形式。从小储户到商人再到黑手党成员，每个人都依赖100美元纸币，所以纸币的变化引起了高度焦虑。许多俄罗斯人已经把他们少量的100美元纸币换成了较小面额的美元纸币。但在接下来的几年里，财政部计划重新设计除1美元纸币以外的每一种纸币。`,
        },
        questions: [
          {
            id: 'q2-1',
            type: 'reading',
            text: 'The redesign of the $100 bill has added all the following state-of-the-art features EXCEPT_______.',
            textCN:
              '100美元纸币的重新设计增加了以下所有先进特征，除了_______。',
            options: [
              {
                id: 'q2-1-A',
                text: 'a polymer security thread',
                textCN: '聚合物安全线',
              },
              {
                id: 'q2-1-B',
                text: "the enlargement of Benjamin Franklin's portrait",
                textCN: '本杰明·富兰克林肖像的放大',
              },
              {
                id: 'q2-1-C',
                text: 'the portrait of a famous movie star',
                textCN: '一位著名电影明星的肖像',
              },
              { id: 'q2-1-D', text: 'color-shifting ink', textCN: '变色油墨' },
            ],
            correctOptionId: 'q2-1-C',
            explanation:
              '文中提到重新设计增加的特征有微缩印刷、变色油墨、聚合物安全线以及本杰明·富兰克林肖像的放大，没有提到著名电影明星的肖像。',
          },
          {
            id: 'q2-2',
            type: 'reading',
            text: 'Which of the following statements is TRUE concerning the releasing of the new $100 bill?',
            textCN: '关于新100美元纸币的发行，以下哪项陈述是正确的？',
            options: [
              {
                id: 'q2-2-A',
                text: 'Most Americans exhibit no stronger emotion than curiosity.',
                textCN: '大多数美国人表现出的情绪不超过好奇。',
              },
              {
                id: 'q2-2-B',
                text: 'It has caused great disturbance among Americans.',
                textCN: '它在美国人中引起了很大的干扰。',
              },
              {
                id: 'q2-2-C',
                text: 'Most Americans show a great interest in its new design.',
                textCN: '大多数美国人对它的新设计表现出极大的兴趣。',
              },
              {
                id: 'q2-2-D',
                text: 'All Americans feel only curious about it.',
                textCN: '所有美国人对此只感到好奇。',
              },
            ],
            correctOptionId: 'q2-2-A',
            explanation:
              '文中提到few people use $100 bills regularly, most Americans greet the arrival of the new note with no stronger emotion than curiosity，即大多数美国人只是好奇。',
          },
          {
            id: 'q2-3',
            type: 'reading',
            text: 'The fear of the new $100 bill is most widespread in those countries where_____.',
            textCN: '对新100美元纸币的担忧在那些_____的国家最为普遍。',
            options: [
              {
                id: 'q2-3-A',
                text: 'the economic situation is unstable',
                textCN: '经济形势不稳定',
              },
              {
                id: 'q2-3-B',
                text: 'two-thirds of all U.S. cash circulates',
                textCN: '三分之二的美元现金流通',
              },
              {
                id: 'q2-3-C',
                text: 'the old $100 bills will become more valuable',
                textCN: '旧的100美元纸币将变得更有价值',
              },
              {
                id: 'q2-3-D',
                text: 'there are too many old $100 bills circulating',
                textCN: '有太多旧的100美元纸币在流通',
              },
            ],
            correctOptionId: 'q2-3-A',
            explanation:
              '文中提到In nations where inflation is high and where there are few credible banking institutions—from Latin America to Africa—people save and conduct business in $100 bills. And with the U.S issuing new $100 bills, many abroad are worrying that the ones they already have are about to become worthless.说明在经济形势不稳定的国家这种担忧最普遍。',
          },
          {
            id: 'q2-4',
            type: 'reading',
            text: 'Which of the following is TRUE concerning U. S. currency in Russia?',
            textCN: '关于俄罗斯的美元货币，以下哪项是正确的？',
            options: [
              {
                id: 'q2-4-A',
                text: 'The Russian Central bank has $15 billion to $20 billion of U.S. currency.',
                textCN: '俄罗斯中央银行有150亿至200亿美元的美元货币。',
              },
              {
                id: 'q2-4-B',
                text: 'About 80% of U.S. currency in Russia is in the form of $100 bills.',
                textCN: '俄罗斯约80%的美元货币是100美元纸币的形式。',
              },
              {
                id: 'q2-4-C',
                text: '80% of the $100 bills circulating outside the U.S. are in Russia.',
                textCN: '在美国境外流通的100美元纸币有80%在俄罗斯。',
              },
              {
                id: 'q2-4-D',
                text: 'There is a widespread fear in Russia that U.S. currency will be devalued.',
                textCN: '俄罗斯普遍担心美元会贬值。',
              },
            ],
            correctOptionId: 'q2-4-B',
            explanation:
              '文中提到The Russian Central Bank estimates that somewhere between $15 billion and $20 billion of U.S. currency is in Russia, about 80% of it in the form of $100 bills. 所以B正确。',
          },
          {
            id: 'q2-5',
            type: 'reading',
            text: 'Why have many Russians changed their $100 bills into smaller notes?',
            textCN:
              '为什么许多俄罗斯人把他们的100美元纸币换成了较小面额的纸币？',
            options: [
              {
                id: 'q2-5-A',
                text: 'Small savers, businessmen and members of Mafia prefer smaller U.S. notes to $100 bills.',
                textCN:
                  '小储户、商人和黑手党成员更喜欢较小面额的美元纸币而不是100美元纸币。',
              },
              {
                id: 'q2-5-B',
                text: 'The U.S. Treasury Department plans to redesign all notes except the $1 bill.',
                textCN: '美国财政部计划重新设计除1美元纸币以外的所有纸币。',
              },
              {
                id: 'q2-5-C',
                text: 'They are afraid that their $100 bills will lose their value.',
                textCN: '他们担心他们的100美元纸币会失去价值。',
              },
              {
                id: 'q2-5-D',
                text: 'They have only a small supply of $100 bills.',
                textCN: '他们只有少量的100美元纸币。',
              },
            ],
            correctOptionId: 'q2-5-C',
            explanation:
              '文中提到And with the U.S issuing new $100 bills, many abroad are worrying that the ones they already have are about to become worthless. Many Russians have already changed their meager(微不足道) supply of $100 bills into smaller U.S. notes. 说明他们担心100美元纸币会贬值。',
          },
        ],
      },
      {
        id: 'chapter1-reading1',
        title: '阅读理解 1',
        description: '关于医院饮食问题的阅读理解',
        type: 'reading',
        article: {
          id: 'article1',
          title: 'Hospital Food Issues',
          titleCN: '医院饮食问题',
          content: `Patients have been saying it for years: Hospital food is poorly prepared and totally lacking in flavor. Now a distinguished nutritionist (营养学家) adds a more serious complaint. Dr. Charles E. Butterworth Jr., director of the nutrition program at the University of Alabama in Birmingham and chairman of the A.M.A.'s Council on Foods and Nutrition, charges that hospital diets are often inadequate to maintain a patient's health—and sometimes so bad as to actually worsen it. "I suspect," writes Butterworth in Nutrition Today, "that one of the largest pockets of unrecognized bad nutrition in America exists not in the poor areas, but in the private rooms and wards of our big city hospitals."
    The evidence for Butterworth's charge was gathered on visits to a number of hospitals and from a more intensive study in one of the institutions associated with the University of Alabama's medical center. He found that hospitals and doctors frequently slight nutritional needs. Some institutions allow surgery to be performed without first building patients up for the severe test, then compound the error after the operation by ignoring good nutrition and relying solely on antibiotics (抗生素) to guard against infection.
    All too often, the postoperative neglect continues until the patient reaches an advanced state of malnutrition (营养不良). Of 80 patients studied at the University of Alabama, 14 were put in hospital for more than three weeks without receiving vitamin supplements, although their symptoms suggested that they might have been undernourished.
    One surgery patient in Butterworth's study grew steadily weaker, declining in a hospital for 50 days until the doctors realized that he was suffering from a severe protein deficiency; only then did they begin giving him the extra nutrition he needed to recover. He was more fortunate than another patient who received no vitamin supplements during 35 days in the intensive-care unit after open-heart surgery. He lost more than 30 pounds, developed irreversible malnutrition and died.`,
          contentCN: `病人多年来一直在说：医院的食物准备得很差，完全没有味道。现在，一位杰出的营养学家又提出了一个更严重的抱怨。阿拉巴马大学伯明翰分校营养项目主任、美国医学协会食品与营养委员会主席小查尔斯·E·巴特沃思博士指责说，医院的饮食往往不足以维持病人的健康，有时甚至糟糕到实际上会使病情恶化。巴特沃思在《今日营养》杂志上写道：“我怀疑，美国最大的未被认识到的营养不良群体之一，不在贫困地区，而在我们大城市医院的私人病房和普通病房里。”
    巴特沃思指控的证据是通过走访多家医院以及对阿拉巴马大学医学中心相关机构之一进行更深入的研究收集到的。他发现医院和医生经常忽视营养需求。一些机构在没有先让病人增强体质以应对严峻考验的情况下就进行手术，然后在手术后又忽视良好的营养，仅仅依靠抗生素来预防感染，从而使错误更加严重。
    术后的忽视常常持续到病人达到严重营养不良的状态。在阿拉巴马大学研究的80名病人中，有14人住院超过三周没有接受维生素补充，尽管他们的症状表明他们可能营养不良。
    巴特沃思研究中的一名外科病人病情逐渐恶化，在医院里住了50天，直到医生意识到他患有严重的蛋白质缺乏症；直到那时，他们才开始给他所需的额外营养以恢复健康。他比另一名在心脏直视手术后在重症监护病房35天没有接受维生素补充的病人幸运。那名病人体重减轻了30多磅，患上了不可逆转的营养不良并死亡。`,
        },
        questions: [
          {
            id: 'q1-1',
            type: 'reading',
            text: 'Why does Dr. Charles E. Butterworth Jr. accuse hospitals of their diets?',
            textCN: '为什么小查尔斯·E·巴特沃思博士指责医院的饮食？',
            options: [
              {
                id: 'q1-1-A',
                text: 'Because there is not enough nutrition in hospital food and the poor taste has aroused a lot of complaints.',
                textCN: '因为医院食物营养不足，味道差引发了很多抱怨。',
              },
              {
                id: 'q1-1-B',
                text: "Because the hospital diets lack necessary nutrition to maintain and restore patients' health.",
                textCN: '因为医院饮食缺乏维持和恢复病人健康所需的营养。',
              },
              {
                id: 'q1-1-C',
                text: "Because hospital cooks lack the sense of responsibility and the food they cook worsens patients' health.",
                textCN:
                  '因为医院厨师缺乏责任感，他们做的食物会使病人健康恶化。',
              },
              {
                id: 'q1-1-D',
                text: 'Because the diets vary hugely between private wards in big hospitals and ordinary wards in small ones.',
                textCN: '因为大医院私人病房和小医院普通病房的饮食差异很大。',
              },
            ],
            correctOptionId: 'q1-1-B',
            explanation:
              "根据原文第一段第三句，...charges that hospital diets are often inadequate to maintain a patient's health—and sometimes so bad as to actually worsen it. Butterworth博士指责医院的饮食不足以维持病人的健康，有时甚至更糟糕。charge和accuse的意思都是表示“控告、指责”，所以选B。",
          },
          {
            id: 'q1-2',
            type: 'reading',
            text: 'How did Butterworth obtain the necessary evidence for his charges?',
            textCN: '巴特沃思是如何为他的指责获取必要的证据的？',
            options: [
              {
                id: 'q1-2-A',
                text: 'By pretending to be a patient in the hospital.',
                textCN: '通过在医院假装成病人。',
              },
              {
                id: 'q1-2-B',
                text: 'By doing a lot of research near the hospital.',
                textCN: '通过在医院附近做大量研究。',
              },
              {
                id: 'q1-2-C',
                text: 'By paying visits to hospitals and conducting research in a medical institution.',
                textCN: '通过走访医院并在一个医疗机构进行研究。',
              },
              {
                id: 'q1-2-D',
                text: 'By seeking information from his own patients.',
                textCN: '通过从他自己的病人那里寻求信息。',
              },
            ],
            correctOptionId: 'q1-2-C',
            explanation:
              "根据原文第二段第一句，The evidence for Butterworth's charge was gathered on visits to a number of hospitals and from a more intensive study in one of the institutions... Butterworth博士通过对一些医院的观察和对其中一个医护中心的仔细研究来为他的指责收集证据，所以选C。",
          },
          {
            id: 'q1-3',
            type: 'reading',
            text: 'How do hospitals and doctors respond to patients in terms of nutrition?',
            textCN: '医院和医生在营养方面如何对待病人？',
            options: [
              {
                id: 'q1-3-A',
                text: 'They ignore the provision of nutritional supplements for their patients.',
                textCN: '他们忽视给病人提供营养补充剂。',
              },
              {
                id: 'q1-3-B',
                text: 'They wait for their patients to ask for nutritional supplements after the operation.',
                textCN: '他们在手术后等待病人要求提供营养补充剂。',
              },
              {
                id: 'q1-3-C',
                text: "They depend on antibiotics to strengthen their patients' immune system after an operation.",
                textCN: '他们在手术后依靠抗生素来增强病人的免疫系统。',
              },
              {
                id: 'q1-3-D',
                text: 'They provide vitamin supplements to their patients to protect them from being infected.',
                textCN: '他们给病人提供维生素补充剂以保护他们不被感染。',
              },
            ],
            correctOptionId: 'q1-3-A',
            explanation:
              '根据原文第二段和第三段， Some institutions allow surgery to be performed without first building patients up for the severe test, then compound the error after the operation by ignoring good nutrition and relying solely on antibiotics (抗生素) to guard against infection. All too often, the postoperative neglect continues until the patient reaches an advanced state of malnutrition (营养不良). 可知一些机构在给病人实施外科手术前，根本没有先给病人补充营养来增强体质，术后也忽视病人的营养补充，只是依赖抗生素来预防感染，直到病人出现营养不良的严重状况才会引起注意。总体来讲，院方和医生都忽视病人的营养问题，所以选A。',
          },
          {
            id: 'q1-4',
            type: 'reading',
            text: 'What happened to the surgery patient studied by Butterworth?',
            textCN: '巴特沃思研究的外科病人发生了什么事？',
            options: [
              {
                id: 'q1-4-A',
                text: 'He was fortunate because he was treated for 50 days, longer than another patient mentioned.',
                textCN:
                  '他很幸运，因为他接受了50天的治疗，比提到的另一个病人时间长。',
              },
              {
                id: 'q1-4-B',
                text: 'He lost 30 pounds and suffered severe malnutrition before he was sent to the intensive-care unit.',
                textCN:
                  '他在被送往重症监护病房之前体重减轻了30磅，患有严重营养不良。',
              },
              {
                id: 'q1-4-C',
                text: 'He received no vitamin supplements and died from serious protein deficiency after a heart surgery.',
                textCN:
                  '他在心脏手术后没有接受维生素补充，死于严重的蛋白质缺乏症。',
              },
              {
                id: 'q1-4-D',
                text: 'He was finally provided with nutritious supplements after a long time of malnutrition.',
                textCN: '他在长期营养不良后终于得到了营养补充剂。',
              },
            ],
            correctOptionId: 'q1-4-D',
            explanation:
              "根据原文第四段，第一句提到，One surgery patient in Butterworth's study grew steadily weaker, declining in a hospital for 50 days until the doctors realized that he was suffering from a severe protein deficiency; only then did they begin giving him the extra nutrition he needed to recover. 可知病人在医院待了50天，情况越来越糟，直到这时医生才意识到他严重缺乏蛋白质，才给他额外的营养来帮助他康复，所以选D。",
          },
          {
            id: 'q1-5',
            type: 'reading',
            text: 'What does the word "irreversible" probably mean in the last paragraph?',
            textCN: '最后一段中的“irreversible”一词可能是什么意思？',
            options: [
              { id: 'q1-5-A', text: 'Uncorrectable.', textCN: '不可纠正的。' },
              { id: 'q1-5-B', text: 'Severe.', textCN: '严重的。' },
              { id: 'q1-5-C', text: 'Complicated.', textCN: '复杂的。' },
              { id: 'q1-5-D', text: 'Fatal.', textCN: '致命的。' },
            ],
            correctOptionId: 'q1-5-A',
            explanation:
              '结合语境，我们可知这位病人在接受心内直视手术之后，体重减轻了30磅，直到最后死亡。由此说明他的营养不良状况已经到了最严重的程度，无法改变。reverse的意思是“反转、颠倒”，加上后缀-ible表示“能够”，再加上前缀ir-表示否定含义，与选项A的uncorrectable（不能纠正的）意思相近，所以选A。',
          },
        ],
      },
      {
        id: 'chapter1-reading1',
        title: '阅读理解 1',
        description: '关于网络成瘾的阅读理解',
        type: 'reading',
        article: {
          id: 'article1',
          title: 'The Distraction addiction',
          titleCN: '分心成瘾',
          content: `Alex Pang's amusing new book The Distraction addiction addresses those of us who feel panic without a cellphone or computer. And that, he claims, is pretty much all of us. When we're not online, where we spend four months annually, we're engaged in the stressful work of trying to get online.
    The Distraction Addiction is not framed as a self-help book. It's a thoughtful examination of the dangers of our computing overdose and a historical overview of how technological advances change consciousness. A "professional futurist", Pang urges an approach which he calls "contemplative (沉思的) computing." He asks that you pay full attention to "how your mind and body interact with computers and how your attention and creativity are influenced by technology."
    Pang's first job is to free you from the common misconception that doing two things at once allows you to get more done. What is commonly called multitasking is , in fact, switch-tasking, and its harmful effects on productivity are well documented. Pang doesn't advocate returning to a pre-Internet world. Instead, he asks you to "take a more ecological (生态的) view of your relationships with technologies and look for ways devices or media may be making specific tasks easier or faster but at the same time making your work and life harder."
    The Distraction Addiction is particularly fascinating on how technologies have changed certain fields of labor—often for the worse. For architects, computer-aided design has become essential but in some ways has cheapened the design process. As one architect puts it, "Architecture is first and foremost about thinking… and drawing is a more productive way of thinking" than computer-aided design. Somewhat less amusing are Pang's solutions for kicking the Internet habit. He recommends the usual behavior-modification approaches, familiar to anyone who has completed a quit-smoking program. Keep logs to study your online profile and decide what you can knock out, download a program like Freedom that locks you out of your browser, or take a "digital Sabbath (安息日)." "Unless you're a reporter or emergency-department doctor, you'll discover that your world doesn't fall apart when you go offline.`,
          contentCN: `亚历克斯·彭有趣的新作《分心成瘾》针对的那些离开手机或电脑就感到恐慌的人，他声称，几乎所有人都是如此。当我们不在线时（我们每年有四个月的时间处于在线状态），我们就会忙于努力上网的紧张工作。
    《分心成瘾》并不是一本自助书籍。它是对我们过度使用电脑的危害进行的深入思考，以及对技术进步如何改变意识的历史概述。作为一名“专业未来学家”，彭倡导一种他称之为“沉思计算”的方法。他要求你充分关注“你的身心如何与电脑互动，以及你的注意力和创造力如何受到技术的影响”。
    彭的首要任务是让你摆脱一个常见的误解，即同时做两件事能让你完成更多工作。实际上，通常所说的多任务处理就是切换任务，而且它对工作效率的有害影响已有充分记录。彭并不主张回到没有互联网的世界。相反，他要求你“对你与技术的关系采取更具生态性的观点，寻找设备或媒体可能使特定任务变得更容易或更快，但同时也使你的工作和生活变得更艰难的方式”。
    《分心成瘾》特别有趣的是它探讨了技术如何改变某些劳动领域——而且往往是变得更糟。对于建筑师来说，计算机辅助设计已经变得至关重要，但在某些方面却降低了设计过程的价值。正如一位建筑师所说：“建筑首先是关于思考……而绘图是一种比计算机辅助设计更有效的思考方式”。彭戒除网瘾的解决方案就没那么有趣了。他推荐了常见的行为修正方法，任何完成过戒烟计划的人都很熟悉这些方法。记录日志以研究你的在线资料，决定你可以剔除哪些内容，下载一个像Freedom这样的程序，它会锁定你的浏览器，或者进行“数字安息日”。“除非你是记者或急诊科医生，否则你会发现当你离线时，你的世界并不会崩溃。`,
        },
        questions: [
          {
            id: 'q1-1',
            type: 'reading',
            text: "Alex Pang's new book is aimed for readers who ________.",
            textCN: '亚历克斯·彭的新书面向什么样的读者？',
            options: [
              {
                id: 'q1-1-A',
                text: 'find their work online stressful',
                textCN: '发现在线工作有压力',
              },
              {
                id: 'q1-1-B',
                text: 'go online mainly for entertainment',
                textCN: '上网主要是为了娱乐',
              },
              {
                id: 'q1-1-C',
                text: 'are fearful about using the cellphone or computer',
                textCN: '害怕使用手机或电脑',
              },
              {
                id: 'q1-1-D',
                text: 'can hardly tear themselves away from the Internet',
                textCN: '几乎离不开网络',
              },
            ],
            correctOptionId: 'q1-1-D',
            explanation:
              "由文章第一段第一句“Alex Pang's amusing new book The Distraction Addiction addresses those of us who feel panic without a cellphone or computer.”可知，亚历克斯·彭的新书针对的是那些离开手机或电脑就感到恐慌的人，即几乎离不开网络的人，所以答案是D。",
          },
          {
            id: 'q1-2',
            type: 'reading',
            text: 'What does Alex Pang try to do in his new book?',
            textCN: '亚历克斯·彭在新书中试图做什么？',
            options: [
              {
                id: 'q1-2-A',
                text: 'Offer advice on how to use the Internet efficiently.',
                textCN: '提供如何有效使用互联网的建议。',
              },
              {
                id: 'q1-2-B',
                text: 'Warn people of the possible dangers of Internet use.',
                textCN: '警告人们使用互联网可能存在的危险。',
              },
              {
                id: 'q1-2-C',
                text: 'Predict the trend of future technological development.',
                textCN: '预测未来技术发展的趋势。',
              },
              {
                id: 'q1-2-D',
                text: 'Examine the influence of technology on human mind.',
                textCN: '审视技术对人类思维的影响。',
              },
            ],
            correctOptionId: 'q1-2-D',
            explanation:
              "根据文章第二段第二句“It's a thoughtful examination of the dangers of our computing overdose and a historical overview of how technological advances change consciousness.”可知，这本书是对人们过度使用电脑危害的深入审视，以及对技术发展如何改变意识的历史概述，也就是审视技术对人类思维的影响，所以答案是D。",
          },
          {
            id: 'q1-3',
            type: 'reading',
            text: 'What is the common view on multitasking?',
            textCN: '人们对多任务工作的普遍看法是什么？',
            options: [
              {
                id: 'q1-3-A',
                text: 'It enables people to work more efficiently.',
                textCN: '它能使人们工作更高效。',
              },
              {
                id: 'q1-3-B',
                text: 'It is a way quite similar to switch-tasking.',
                textCN: '它是一种与切换任务非常相似的方式。',
              },
              {
                id: 'q1-3-C',
                text: "It makes people's work and life even harder.",
                textCN: '它使人们的工作和生活更加艰难。',
              },
              {
                id: 'q1-3-D',
                text: "It distracts people's attention from useful work.",
                textCN: '它使人们的注意力从有用的工作中分散。',
              },
            ],
            correctOptionId: 'q1-3-A',
            explanation:
              "由文章第三段第一句“Pang's first job is to free you from the common misconception that doing two things at once allows you to get more done.”可知，人们普遍认为同时做两件事能让完成更多工作，也就是能使工作更高效，所以答案是A。",
          },
          {
            id: 'q1-4',
            type: 'reading',
            text: 'What does the author think of computer-aided design?',
            textCN: '作者对于计算机辅助设计的观点是什么？',
            options: [
              {
                id: 'q1-4-A',
                text: 'It considerably cuts down the cost of building design.',
                textCN: '它大大降低了建筑设计的成本。',
              },
              {
                id: 'q1-4-B',
                text: "It somewhat restrains architects's productive thinking.",
                textCN: '它在某种程度上限制了建筑师的创造性思维。',
              },
              {
                id: 'q1-4-C',
                text: "It is indispensable in architects' work process.",
                textCN: '它在建筑师的工作过程中是不可或缺的。',
              },
              {
                id: 'q1-4-D',
                text: 'It can free architects from laborious drawing.',
                textCN: '它可以使建筑师从繁琐的绘图中解脱出来。',
              },
            ],
            correctOptionId: 'q1-4-B',
            explanation:
              "根据文章第四段“For architects, computer-aided design has become essential but in some ways has cheapened the design process. As one architect puts it, 'Architecture is first and foremost about thinking… and drawing is a more productive way of thinking' than computer-aided design.”可知，计算机辅助设计在某些方面降低了设计过程的价值，限制了建筑师的创造性思维，所以答案是B。",
          },
          {
            id: 'q1-5',
            type: 'reading',
            text: "What is Alex Pang's recommendation for Internet users?",
            textCN: '亚历克斯·彭对于网络用户的建议是什么？',
            options: [
              {
                id: 'q1-5-A',
                text: 'They use the Internet as little as possible.',
                textCN: '他们应尽可能少用互联网。',
              },
              {
                id: 'q1-5-B',
                text: 'They keep a record of their computer use time.',
                textCN: '他们记录下使用电脑的时间。',
              },
              {
                id: 'q1-5-C',
                text: 'They exercise self-control over their time online.',
                textCN: '他们对自己的上网时间进行自我控制。',
              },
              {
                id: 'q1-5-D',
                text: 'They entertain themselves online on off-days only.',
                textCN: '他们只在休息日上网娱乐。',
              },
            ],
            correctOptionId: 'q1-5-C',
            explanation:
              "由文章第四段倒数第三句“Somewhat less amusing are Pang's solutions for kicking the Internet habit. He recommends the program. Keep logs to study your online profile and decide what you can knock out, download a program like Freedom that locks you out of your browser, or take a 'digital Sabbath.'”可知，彭建议网民记录上网习惯，找出可剔除的内容，或者进行“数字安息日”，也就是对上网时间进行自我控制，所以答案是C。",
          },
        ],
      },
      {
        id: 'chapter1-reading2',
        title: '阅读理解 2',
        description: '关于全球变暖对经济和政治影响的阅读理解',
        type: 'reading',
        article: {
          id: 'article2',
          title: 'The Impact of Global Warming on Economy and Politics',
          titleCN: '全球变暖对经济和政治的影响',
          content: `Global warming will not only devastate agriculture in developing countries, it will undermine economic and political stability to a far greater extent than previously imagined, according to a new study.
        "The link between high temperatures and poor growth is much stronger than we'd realised,"says Benjamin Olken, an economist at the Massachusetts Institute of Technology. Crucially, says Olken, his team's study is the first to link climate change with economic growth—as opposed to output—which will have a bigger long-term effect on a country's fortunes. High temperatures could even undermine scientific productivity, say Olken's team. If they are correct, the economic gulf between rich and poor nations will widen dramatically in the 21st century.
        The team looked at how temperatures affected economic growth in the past 50 years. While rich economies seemed resilient to temperature rises, the GDP of poor countries dropped by 1 percent in years when those temperatures rose 1 ℃ or more above the regional average.
        The number of scientific papers—a measure of innovation—also fell in poor countries in hot years, as did economic investment in the region. Breakdown in government was more likely, as were political coups (政变). Olken says his results fit with other studies showing that high temperatures increase civil unrest, and that drought can lead to political instability. The results were presented last week at a meeting of the American Economics Association in San Francisco.
        Slowing growth rates would have cumulative effects that studies might miss if they were only focusing on specific issues such as the impact of drought on food supply, Olken says. If global temperatures rise as predicted, the economic gap between rich and poor nations will have doubled a decade from now. In 50 years' time the gap will have widened 12-fold.
        The study's breadth and emphasis on growth is welcome but the results need to be treated with caution, economist Eric Strobl of the École Polytechnique in Paris, France, told New Scientist. He points out that Olken failed to find a link between rainfall and economic growth that previous work on agriculture suggests should exist.
        Richard Tol of the Economic and Social Research Institute in Dublin, Ireland, adds that poor nations often suffer from corruption, a factor that Olken's analysis did not explicitly control for.`,
          contentCN: `一项新研究表明，全球变暖不仅会破坏发展中国家的农业，还会在比此前想象大得多的程度上破坏经济和政治稳定。
        麻省理工学院的经济学家本杰明·奥尔肯说：“高温与经济增长缓慢之间的联系比我们意识到的要紧密得多。”奥尔肯指出，关键在于他的团队的研究首次将气候变化与经济增长联系起来——与产量不同，经济增长对一个国家的命运有更大的长期影响。奥尔肯的团队说，高温甚至可能破坏科学生产力。如果他们是正确的，贫富国家之间的经济差距将在21世纪急剧扩大。
        该团队研究了过去50年气温如何影响经济增长。虽然富裕经济体似乎对气温上升有弹性，但在气温比区域平均水平高出1摄氏度或更多的年份，贫穷国家的国内生产总值下降了1%。
        在炎热年份，贫穷国家的科学论文数量（衡量创新的一个指标）也会下降，该地区的经济投资也是如此。政府垮台的可能性更大，政治政变也是如此。奥尔肯说，他的结果与其他研究结果相符，这些研究表明高温会加剧内乱，干旱会导致政治不稳定。研究结果上周在旧金山举行的美国经济协会会议上公布。
        奥尔肯说，增长放缓会产生累积效应，如果研究只关注干旱对粮食供应的影响等具体问题，可能会忽略这些效应。如果全球气温如预测的那样上升，贫富国家之间的经济差距将在十年后翻倍。50年后，差距将扩大12倍。
        法国巴黎综合理工学院的经济学家埃里克·施特罗布尔告诉《新科学家》杂志，这项研究的广度和对增长的关注是值得欢迎的，但结果需要谨慎对待。他指出，奥尔肯没有发现降雨量与经济增长之间的联系，而此前关于农业的研究表明这种联系应该存在。
        爱尔兰都柏林经济和社会研究所的理查德·托尔补充说，贫穷国家经常受到腐败的困扰，这是奥尔肯的分析没有明确控制的一个因素。`,
        },
        questions: [
          {
            id: 'q2-1',
            type: 'reading',
            text: 'About the output and the relationship between the economic growth and climate change, Olken thinks ________.',
            textCN:
              '关于产量以及经济增长与气候变化之间的关系，奥尔肯认为________。',
            options: [
              {
                id: 'q2-1-A',
                text: "the former is more important to a country's boom",
                textCN: '前者对一个国家的繁荣更重要',
              },
              {
                id: 'q2-1-B',
                text: "the former determines a country's economic growth",
                textCN: '前者决定一个国家的经济增长',
              },
              {
                id: 'q2-1-C',
                text: "the latter's effect on a country's boom is more profound",
                textCN: '后者对一个国家繁荣的影响更深远',
              },
              {
                id: 'q2-1-D',
                text: "the latter is the most important factor influencing a country's development",
                textCN: '后者是影响一个国家发展的最重要因素',
              },
            ],
            correctOptionId: 'q2-1-C',
            explanation:
              '第2段最后一句提到，奥肯的团队发现，和产量相比气候变化与经济增长之间的关系对一个国家的繁荣有着更大的长期影响。据此可知C)项与文意相符，profound对应原文中的bigger long-term。',
          },
          {
            id: 'q2-2',
            type: 'reading',
            text: 'If high temperatures can really destroy scientific productivity, what will happen in 21st century?',
            textCN: '如果高温真的能破坏科学生产力，21世纪会发生什么？',
            options: [
              {
                id: 'q2-2-A',
                text: 'The speed of economy becoming instable will be faster than imagined.',
                textCN: '经济变得不稳定的速度将比想象的更快。',
              },
              {
                id: 'q2-2-B',
                text: 'More civil unrest will appear in the world.',
                textCN: '世界上会出现更多的内乱。',
              },
              {
                id: 'q2-2-C',
                text: 'Some governments will be more likely to fall apart.',
                textCN: '一些政府更有可能瓦解。',
              },
              {
                id: 'q2-2-D',
                text: 'There will be extremely big economic gap between rich and poor countries.',
                textCN: '贫富国家之间将出现极大的经济差距。',
              },
            ],
            correctOptionId: 'q2-2-D',
            explanation:
              '第3段首句提到，奥肯团队成员认为高温甚至可以摧毁科学生产力，接下来第2句说如果他们是正确的，那么贫富国之间的经济差距本世纪将显著拉大。四个选项中与文意符合的只有D)项，是对第3段第2句中the economic gulf… will widen的同义转述，其他几项文中均未提到。',
          },
          {
            id: 'q2-3',
            type: 'reading',
            text: 'Considering high temperatures, what can be inferred from the passage?',
            textCN: '考虑到高温，从文章中可以推断出什么？',
            options: [
              {
                id: 'q2-3-A',
                text: "Olken's team think high temperatures inevitably lead to poor economic growth.",
                textCN: '奥尔肯的团队认为高温必然导致经济增长缓慢。',
              },
              {
                id: 'q2-3-B',
                text: "Olken's team considered poor countries'economy dropped with temperatures rising.",
                textCN: '奥尔肯的团队认为贫穷国家的经济随着气温上升而下降。',
              },
              {
                id: 'q2-3-C',
                text: "The number of scientific papers in hot years determines whether a country's economy is strong.",
                textCN: '炎热年份的科学论文数量决定一个国家的经济是否强劲。',
              },
              {
                id: 'q2-3-D',
                text: "The study of high temperatures'effect on economy should be put in the first place.",
                textCN: '对高温对经济影响的研究应该放在首位。',
              },
            ],
            correctOptionId: 'q2-3-B',
            explanation:
              '文中第2段第1句说，高温与缓慢增长之间的关系要比认识到的更紧密，并未说高温必然导致经济增长缓慢，故排除A)项。由第3段最后两句及整篇文章有关奥肯团队的观点可知，贫穷国家随着气温的升高，经济出现了下滑的趋势，故B)项正确。文章第4段提到，在高温的年份里，发展中国家科学论文的数量减少了，并未说其决定一个国家经济的强弱，故排除C)项。D)项文中未提到。',
          },
          {
            id: 'q2-4',
            type: 'reading',
            text: "What's Eric Strobl's attitude towards the results of Olken team's study?",
            textCN: '埃里克·施特罗布尔对奥尔肯团队的研究结果持什么态度？',
            options: [
              { id: 'q2-4-A', text: 'Critical.', textCN: '批评的。' },
              {
                id: 'q2-4-B',
                text: 'Not entirely sure.',
                textCN: '不完全确定。',
              },
              { id: 'q2-4-C', text: 'Totally agreed.', textCN: '完全同意。' },
              { id: 'q2-4-D', text: 'Optimistic.', textCN: '乐观的。' },
            ],
            correctOptionId: 'q2-4-B',
            explanation:
              '文章倒数第2段提到，法国巴黎综合理工大学的经济学家埃里克•施特罗布尔认为要谨慎对待奥肯团队的研究结果，并指出奥肯团队的研究结果没有涉及到降雨量对经济的影响。由此可推断，埃里克对奥肯团队的研究结果不是完全地肯定，故B)项正确。',
          },
          {
            id: 'q2-5',
            type: 'reading',
            text: 'What information may Richard Tol want to express?',
            textCN: '理查德·托尔可能想表达什么信息？',
            options: [
              {
                id: 'q2-5-A',
                text: "Corruption may be also a factor affecting poor countries'economy growth.",
                textCN: '腐败也可能是影响贫穷国家经济增长的一个因素。',
              },
              {
                id: 'q2-5-B',
                text: "Olken's study should include the factor of corruption.",
                textCN: '奥尔肯的研究应该包括腐败因素。',
              },
              {
                id: 'q2-5-C',
                text: "Corruption is the main factor leading to poor countries'poor growth.",
                textCN: '腐败是导致贫穷国家经济增长缓慢的主要因素。',
              },
              {
                id: 'q2-5-D',
                text: 'Rich countries usually suffer little corruption.',
                textCN: '富裕国家通常很少受到腐败的影响。',
              },
            ],
            correctOptionId: 'q2-5-A',
            explanation:
              '文章最后一段提到，理查德•托尔补充道，贫穷的国家常常受到腐败的危害，这也是奥肯的分析中没有明确提到的，由此可推断腐败也是影响贫穷国家经济增长的因素，故A)项正确。其他几项都不能从托尔的话中得出。',
          },
        ],
      },
      {
        id: 'chapter1-reading1',
        title: '阅读理解 1',
        description: '关于气候变化与移民关系的阅读理解',
        type: 'reading',
        article: {
          id: 'article1',
          title: 'Climate Migration',
          titleCN: '气候移民',
          content: `Hundreds of millions of people live in places that are easy to get hurt because of climate change. They face extreme weather conditions such as drought and floods, or they live in low-lying (低洼的) coastal areas that are threatened by rising sea levels.
    But this does not mean they will all migrate.
    Fears of millions of "climate refugees" crossing national borders are not supported by evidence on the ground. The poorest and weakest people will often find it impossible to move, as they lack the necessary funds and social support. Those who can migrate will be more likely to make short-term and short-distance movements than permanent long-term ones. Overall, long-distance international migration will be the least likely option.
    What can we learn from the past? In northern Mali, the drought of 1983-1985 affected local migration patterns, with an increase in temporary and short-distance movement and a decrease in long-term, intercontinental (洲际) movement.
    Unfortunately, most governments and international agencies tend to see migration as a problem that needs to be controlled instead of a key part of the solution.
    Policymakers must see it as a vital adaptation to climate change rather than as an unwanted consequence or a failure to adapt. This means that poorer nations need to prepare for climate change at home by building up basic facilities and services in small towns located in rural areas that could become destination centers for local migrants (移民). Richer countries should provide poorer nations with financial support to help them adapt to climate change, which can either reduce the need for migration or enable it to proceed in a way that is sound and sustainable.
    People have always used their mobility (流动性) as a means to protect themselves and escape from poverty. The problem is not that people want to move, but that many of the weakest people do not have the resources or livelihood (生计) options that will enable them to do so in a way that maintains their security. It is worth remembering that supporting migrants can ultimately help reduce the numbers of refugees.`,
          contentCN: `数亿人生活在因气候变化而容易受到伤害的地方。他们面临着干旱和洪水等极端天气条件，或者生活在受到海平面上升威胁的低洼沿海地区。
    但这并不意味着他们都会迁移。
    对数百万“气候难民”跨越国界的担忧并没有得到实际证据的支持。最贫穷和最脆弱的人往往会发现迁移是不可能的，因为他们缺乏必要的资金和社会支持。那些能够迁移的人更有可能进行短期和短距离的迁移，而不是长期的迁移。总体而言，长途国际迁移将是最不可能的选择。
    我们能从过去中学到什么？在马里北部，1983 - 1985年的干旱影响了当地的迁移模式，临时和短距离迁移增加，而长期的洲际迁移减少。
    不幸的是，大多数政府和国际机构倾向于将迁移视为一个需要控制的问题，而不是解决方案的关键部分。
    政策制定者必须将其视为对气候变化的重要适应，而不是不想要的后果或适应失败。这意味着较贫穷的国家需要在国内通过在农村地区的小城镇建设基础设施和服务来为气候变化做准备，这些小城镇可能成为当地移民的目的地中心。较富裕的国家应该向较贫穷的国家提供财政支持，以帮助它们适应气候变化，这既可以减少迁移的需求，也可以使迁移以合理和可持续的方式进行。
    人们一直将他们的流动性作为保护自己和摆脱贫困的手段。问题不在于人们想要迁移，而是许多最脆弱的人没有资源或生计选择，无法以维持其安全的方式迁移。值得记住的是，支持移民最终有助于减少难民数量。`,
        },
        questions: [
          {
            id: 'q1-1',
            type: 'reading',
            text: 'What does "this" in Paragraph 2 refer to?',
            textCN: '第二段中的“this”指的是什么？',
            options: [
              {
                id: 'q1-1-A',
                text: "The fact that there are climate changes threatening people's lives.",
                textCN: '存在气候变化威胁人们生命的事实。',
              },
              {
                id: 'q1-1-B',
                text: 'The fact that drought and floods happen more frequently.',
                textCN: '干旱和洪水更频繁发生的事实。',
              },
              {
                id: 'q1-1-C',
                text: 'The fact that sea levels near coastal areas are rising.',
                textCN: '沿海地区海平面上升的事实。',
              },
              {
                id: 'q1-1-D',
                text: 'The fact that millions of people want to be relocated.',
                textCN: '数百万人想要重新安置的事实。',
              },
            ],
            correctOptionId: 'q1-1-A',
            explanation:
              '文章第一段的主题句表明Hundreds of millions of people live in places that are easy to get hurt because of climate change，第二段中的this在这里指的是前面提到的气候变化威胁人们的生活这一事实，所以选A。',
          },
          {
            id: 'q1-2',
            type: 'reading',
            text: 'According to the passage, climate change ________.',
            textCN: '根据文章，气候变化________。',
            options: [
              {
                id: 'q1-2-A',
                text: 'does not cause any kind of migration',
                textCN: '不会导致任何形式的迁移',
              },
              {
                id: 'q1-2-B',
                text: 'often causes long-distance international migration',
                textCN: '经常导致长途国际迁移',
              },
              {
                id: 'q1-2-C',
                text: 'often causes permanent short-distance movements',
                textCN: '经常导致永久性的短距离迁移',
              },
              {
                id: 'q1-2-D',
                text: 'does not cause large scale migration across borders',
                textCN: '不会导致大规模的跨境迁移',
              },
            ],
            correctOptionId: 'q1-2-D',
            explanation:
              '第二段提到this does not mean they will all migrate，第三段段末又提到Overall, long-distance international migration will be the least likely option，所以选D。',
          },
          {
            id: 'q1-3',
            type: 'reading',
            text: 'What can be inferred from the sentence "Unfortunately, most governments and international agencies tend to see migration as a problem that needs to be controlled instead of a key part of the solution?"(Para. 5)',
            textCN:
              '从第五段“不幸的是，大多数政府和国际机构倾向于将迁移视为一个需要控制的问题，而不是解决方案的关键部分”这句话可以推断出什么？',
            options: [
              {
                id: 'q1-3-A',
                text: 'Migration should be strictly limited.',
                textCN: '迁移应该被严格限制。',
              },
              {
                id: 'q1-3-B',
                text: "Migrants can't deal with climate change.",
                textCN: '移民无法应对气候变化。',
              },
              {
                id: 'q1-3-C',
                text: 'Migrants should be aided and supported.',
                textCN: '移民应该得到帮助和支持。',
              },
              {
                id: 'q1-3-D',
                text: 'Migration will result in many problems.',
                textCN: '迁移会导致许多问题。',
              },
            ],
            correctOptionId: 'q1-3-C',
            explanation:
              '作者认为移民应该是一个解决方法并应该得到支持，最后一段最后一句说It is worth remembering that supporting migrants can ultimately help reduce the numbers of refugees，所以选C。',
          },
          {
            id: 'q1-4',
            type: 'reading',
            text: 'What should poor nations do to prepare for climate change?',
            textCN: '贫困国家应该如何为气候变化做准备？',
            options: [
              {
                id: 'q1-4-A',
                text: 'To develop basic facilities and services in small towns.',
                textCN: '在小城镇发展基础设施和服务。',
              },
              {
                id: 'q1-4-B',
                text: 'To encourage industrial centers to be built in rural areas.',
                textCN: '鼓励在农村地区建设工业中心。',
              },
              {
                id: 'q1-4-C',
                text: 'To cancel restriction for migration.',
                textCN: '取消对迁移的限制。',
              },
              {
                id: 'q1-4-D',
                text: 'To support short-term migration.',
                textCN: '支持短期迁移。',
              },
            ],
            correctOptionId: 'q1-4-A',
            explanation:
              '根据题干内容定位到文章第六段第二句，poorer nations need to prepare for climate change at home by building up basic facilities and services in small towns，所以选A。',
          },
          {
            id: 'q1-5',
            type: 'reading',
            text: "What's the subject of the passage?",
            textCN: '这篇文章的主题是什么？',
            options: [
              {
                id: 'q1-5-A',
                text: 'Migration patterns.',
                textCN: '迁移模式。',
              },
              {
                id: 'q1-5-B',
                text: 'Security maintenance.',
                textCN: '安全维护。',
              },
              {
                id: 'q1-5-C',
                text: 'Climate migration.',
                textCN: '气候移民。',
              },
              {
                id: 'q1-5-D',
                text: 'Migration problems.',
                textCN: '迁移问题。',
              },
            ],
            correctOptionId: 'q1-5-C',
            explanation:
              '文章开头主要讲气候变化导致居住环境恶化，以及这一问题与移民之间的关系，最后一段结论部分最后一句说支持移民是最终减少难民的方法，由此可见本篇的主题是移民问题，所以选C。',
          },
        ],
      },

      {
        id: 'chapter2-cloze1',
        title: '完形填空 2',
        description: '关于双语教育的完形填空',
        type: 'cloze',
        questions: [
          {
            id: 'c2-1',
            type: 'cloze',
            text: 'Too many people accept the idea that children should (75)_____ their home language and learn only in English.',
            textCN: '太多人认同儿童应该(75)_____母语、只学英语的观点。',
            options: [
              { id: 'c2-1-A', text: 'forget', textCN: '忘记' },
              { id: 'c2-1-B', text: 'master', textCN: '掌握' },
              { id: 'c2-1-C', text: 'practice', textCN: '练习' },
              { id: 'c2-1-D', text: 'teach', textCN: '教授' },
            ],
            correctOptionId: 'c2-1-A',
            explanation:
              '“forget”意为“忘记”，与后文“只学英语”形成对比，体现作者反对忽视母语的教育观念。',
          },
          {
            id: 'c2-2',
            type: 'cloze',
            text: 'Such policies have put language-minority children at a (76)_____ and caused them a lot of harm.',
            textCN: '此类政策让语言少数群体儿童处于(76)_____，并造成诸多伤害。',
            options: [
              { id: 'c2-2-A', text: 'disadvantage', textCN: '劣势' },
              { id: 'c2-2-B', text: 'advantage', textCN: '优势' },
              { id: 'c2-2-C', text: 'balance', textCN: '平衡' },
              { id: 'c2-2-D', text: 'risk', textCN: '风险' },
            ],
            correctOptionId: 'c2-2-A',
            explanation:
              '“disadvantage”意为“劣势”，与“caused harm”（造成伤害）呼应，说明单一语言政策对少数群体的负面影响。',
          },
          {
            id: 'c2-3',
            type: 'cloze',
            text: 'I believe that the learning of other languages, including English, is (77)_____.',
            textCN: '我认为学习包括英语在内的其他语言是(77)_____。',
            options: [
              { id: 'c2-3-A', text: 'beneficial', textCN: '有益的' },
              { id: 'c2-3-B', text: 'harmful', textCN: '有害的' },
              { id: 'c2-3-C', text: 'unnecessary', textCN: '不必要的' },
              { id: 'c2-3-D', text: 'difficult', textCN: '困难的' },
            ],
            correctOptionId: 'c2-3-A',
            explanation:
              '“beneficial”意为“有益的”，与前文作者支持双语教育的立场一致，强调多语言学习的积极意义。',
          },
          {
            id: 'c2-4',
            type: 'cloze',
            text: 'studies indicate that their thinking is more (78)_____ than those of monolingual individuals.',
            textCN: '研究表明，他们的思维比单语者更(78)_____。',
            options: [
              { id: 'c2-4-A', text: 'flexible', textCN: '灵活的' },
              { id: 'c2-4-B', text: 'rigid', textCN: '僵化的' },
              { id: 'c2-4-C', text: 'simple', textCN: '简单的' },
              { id: 'c2-4-D', text: 'slow', textCN: '缓慢的' },
            ],
            correctOptionId: 'c2-4-A',
            explanation:
              '“flexible”意为“灵活的”，与双语者思维优势的常见研究结论相符，体现多语言对认知能力的促进。',
          },
          {
            id: 'c2-5',
            type: 'cloze',
            text: 'Being proficient in a language includes more than simply being able to (79)_____ the language.',
            textCN: '精通一门语言不仅包括简单的(79)_____能力。',
            options: [
              { id: 'c2-5-A', text: 'speak', textCN: '说' },
              { id: 'c2-5-B', text: 'hear', textCN: '听' },
              { id: 'c2-5-C', text: 'read', textCN: '读' },
              { id: 'c2-5-D', text: 'write', textCN: '写' },
            ],
            correctOptionId: 'c2-5-A',
            explanation:
              '“speak”意为“说”，与后文“读、写、批判性思考”形成能力层级对比，强调语言应用的全面性。',
          },
          {
            id: 'c2-6',
            type: 'cloze',
            text: 'it also means being able to read, write, and think (80)_____ in it.',
            textCN: '还意味着能够用其阅读、写作和(80)_____思考。',
            options: [
              { id: 'c2-6-A', text: 'critically', textCN: '批判性地' },
              { id: 'c2-6-B', text: 'superficially', textCN: '表面地' },
              { id: 'c2-6-C', text: 'casually', textCN: '随意地' },
              { id: 'c2-6-D', text: 'slowly', textCN: '缓慢地' },
            ],
            correctOptionId: 'c2-6-A',
            explanation:
              '“critically”意为“批判性地”，与“read, write”构成高阶语言能力组合，体现语言学习的深度要求。',
          },
          {
            id: 'c2-7',
            type: 'cloze',
            text: 'The length of time depends on many factors including the (81)_____ for well-developed concepts...',
            textCN: '时间长短取决于诸多因素，包括对成熟概念的(81)_____……',
            options: [
              { id: 'c2-7-A', text: 'need', textCN: '需求' },
              { id: 'c2-7-B', text: 'desire', textCN: '欲望' },
              { id: 'c2-7-C', text: 'refusal', textCN: '拒绝' },
              { id: 'c2-7-D', text: 'ability', textCN: '能力' },
            ],
            correctOptionId: 'c2-7-A',
            explanation:
              '“need”意为“需求”，“the need for well-developed concepts”指对成熟概念体系的需求，符合二语习得中母语基础影响学习时长的逻辑。',
          },
          {
            id: 'c2-8',
            type: 'cloze',
            text: 'This (82)_____ often takes more than three years.',
            textCN: '这一(82)_____通常需要三年以上。',
            options: [
              { id: 'c2-8-A', text: 'process', textCN: '过程' },
              { id: 'c2-8-B', text: 'result', textCN: '结果' },
              { id: 'c2-8-C', text: 'goal', textCN: '目标' },
              { id: 'c2-8-D', text: 'problem', textCN: '问题' },
            ],
            correctOptionId: 'c2-8-A',
            explanation:
              '“process”意为“过程”，指代前文“掌握第二语言的时间”，强调语言习得是持续性的阶段。',
          },
          {
            id: 'c2-9',
            type: 'cloze',
            text: 'Children in general are not cognitively (83)_____ to think abstractly...',
            textCN: '总体而言，儿童在认知上尚未(83)_____进行抽象思考……',
            options: [
              { id: 'c2-9-A', text: 'ready', textCN: '准备好的' },
              { id: 'c2-9-B', text: 'unwilling', textCN: '不愿意的' },
              { id: 'c2-9-C', text: 'eager', textCN: '渴望的' },
              { id: 'c2-9-D', text: 'afraid', textCN: '害怕的' },
            ],
            correctOptionId: 'c2-9-A',
            explanation:
              '“ready”意为“准备好的”，与“until after six or seven years”（直到六七岁后）呼应，说明儿童认知发展的阶段性。',
          },
          {
            id: 'c2-10',
            type: 'cloze',
            text: 'It is unfortunate and (84)_____ that because of false rumours...',
            textCN: '不幸且(84)_____的是，由于虚假传言……',
            options: [
              { id: 'c2-10-A', text: 'tragic', textCN: '悲惨的' },
              { id: 'c2-10-B', text: 'funny', textCN: '有趣的' },
              { id: 'c2-10-C', text: 'normal', textCN: '正常的' },
              { id: 'c2-10-D', text: 'hopeful', textCN: '有希望的' },
            ],
            correctOptionId: 'c2-10-A',
            explanation:
              '“tragic”意为“悲惨的”，与“unfortunate”（不幸的）构成语义递进，强化对错误政策后果的批判语气。',
          },
        ],
      },
      {
        id: 'chapter3-cloze1',
        title: '完形填空 3',
        description: '关于全球变暖的完形填空',
        type: 'cloze',
        questions: [
          {
            id: 'c3-1',
            type: 'cloze',
            text: 'we have experienced a 20,000-year-long warming as the last ice age ended and the ice (85)_____ away.',
            textCN:
              '随着上一个冰河时代结束，冰层(85)_____，我们经历了长达两万年的变暖过程。',
            options: [
              { id: 'c3-1-A', text: 'melted', textCN: '融化' },
              { id: 'c3-1-B', text: 'formed', textCN: '形成' },
              { id: 'c3-1-C', text: 'grew', textCN: '增长' },
              { id: 'c3-1-D', text: 'froze', textCN: '冻结' },
            ],
            correctOptionId: 'c3-1-A',
            explanation:
              '“melted”意为“融化”，与冰河时代结束后的气候变暖逻辑一致，表明冰层因升温而消融。',
          },
          {
            id: 'c3-2',
            type: 'cloze',
            text: 'we have already reached temperatures that are in (86)_____ with other minimum-ice periods.',
            textCN: '我们已达到与其他冰层最少时期(86)_____的温度。',
            options: [
              { id: 'c3-2-A', text: 'line', textCN: '一致' },
              { id: 'c3-2-B', text: 'contrast', textCN: '对比' },
              { id: 'c3-2-C', text: 'conflict', textCN: '冲突' },
              { id: 'c3-2-D', text: 'isolation', textCN: '孤立' },
            ],
            correctOptionId: 'c3-2-A',
            explanation:
              '“in line with”为固定搭配，意为“与……一致”，说明当前温度与历史上冰层最少时期的温度水平相当。',
          },
          {
            id: 'c3-3',
            type: 'cloze',
            text: 'We are (87)_____ to a predicted worldwide increase in temperatures.',
            textCN: '我们正在(87)_____全球气温预计的上升。',
            options: [
              { id: 'c3-3-A', text: 'contributing', textCN: '促成' },
              { id: 'c3-3-B', text: 'objecting', textCN: '反对' },
              { id: 'c3-3-C', text: 'adapting', textCN: '适应' },
              { id: 'c3-3-D', text: 'responding', textCN: '回应' },
            ],
            correctOptionId: 'c3-3-A',
            explanation:
              '“contributing to”意为“促成”，体现人类活动对全球变暖的推动作用，符合主流科学观点。',
          },
          {
            id: 'c3-4',
            type: 'cloze',
            text: 'a predicted worldwide increase in temperatures (88)_____ between 1℃ and 6℃ over the next 100 years.',
            textCN: '预计未来100年全球气温将(88)_____1到6摄氏度。',
            options: [
              { id: 'c3-4-A', text: 'ranging', textCN: '范围在' },
              { id: 'c3-4-B', text: 'decreasing', textCN: '减少' },
              { id: 'c3-4-C', text: 'staying', textCN: '保持' },
              { id: 'c3-4-D', text: 'stopping', textCN: '停止' },
            ],
            correctOptionId: 'c3-4-A',
            explanation:
              '“ranging between...and...”意为“在……到……范围内”，用于描述气温上升幅度的预测区间。',
          },
          {
            id: 'c3-5',
            type: 'cloze',
            text: 'The warming will be more (89)_____ in some areas, less in others.',
            textCN: '变暖在某些地区会更(89)_____，在其他地区则较弱。',
            options: [
              { id: 'c3-5-A', text: 'dramatic', textCN: '显著的' },
              { id: 'c3-5-B', text: 'subtle', textCN: '微妙的' },
              { id: 'c3-5-C', text: 'slow', textCN: '缓慢的' },
              { id: 'c3-5-D', text: 'stable', textCN: '稳定的' },
            ],
            correctOptionId: 'c3-5-A',
            explanation:
              '“dramatic”意为“显著的”，与“less”形成对比，说明全球变暖的区域差异明显。',
          },
          {
            id: 'c3-6',
            type: 'cloze',
            text: 'Likewise, the (90)_____ of this warming will be very different depending on where you are.',
            textCN: '同样，变暖的(90)_____因地区而异。',
            options: [
              { id: 'c3-6-A', text: 'impact', textCN: '影响' },
              { id: 'c3-6-B', text: 'cause', textCN: '原因' },
              { id: 'c3-6-C', text: 'solution', textCN: '解决方案' },
              { id: 'c3-6-D', text: 'history', textCN: '历史' },
            ],
            correctOptionId: 'c3-6-A',
            explanation:
              '“impact”意为“影响”，后文“沿海地区担心海平面上升”等内容具体说明变暖的影响因区域不同而变化。',
          },
          {
            id: 'c3-7',
            type: 'cloze',
            text: 'Siberia and northern Canada may become more habitable and (91)_____ for humans.',
            textCN: '西伯利亚和加拿大北部可能变得更宜居、对人类更(91)_____。',
            options: [
              { id: 'c3-7-A', text: 'appealing', textCN: '有吸引力的' },
              { id: 'c3-7-B', text: 'dangerous', textCN: '危险的' },
              { id: 'c3-7-C', text: 'crowded', textCN: '拥挤的' },
              { id: 'c3-7-D', text: 'unfriendly', textCN: '不友好的' },
            ],
            correctOptionId: 'c3-7-A',
            explanation:
              '“appealing”意为“有吸引力的”，与“more habitable”（更宜居）并列，说明温度升高可能改善高纬度地区的居住条件。',
          },
          {
            id: 'c3-8',
            type: 'cloze',
            text: 'it will likely get warmer, on (92)_____, everywhere.',
            textCN: '总体而言，各地可能(92)_____变暖。',
            options: [
              { id: 'c3-8-A', text: 'average', textCN: '平均' },
              { id: 'c3-8-B', text: 'purpose', textCN: '故意' },
              { id: 'c3-8-C', text: 'time', textCN: '时间' },
              { id: 'c3-8-D', text: 'duty', textCN: '责任' },
            ],
            correctOptionId: 'c3-8-A',
            explanation:
              '“on average”为固定搭配，意为“平均而言”，强调全球范围内的整体变暖趋势，不排除局部区域的差异。',
          },
          {
            id: 'c3-9',
            type: 'cloze',
            text: 'Some scientists (93)_____ that the changes we are seeing fall within the range of random variation.',
            textCN: '一些科学家(93)_____我们观察到的变化属于无规律波动范围。',
            options: [
              { id: 'c3-9-A', text: 'maintain', textCN: '坚持认为' },
              { id: 'c3-9-B', text: 'doubt', textCN: '怀疑' },
              { id: 'c3-9-C', text: 'deny', textCN: '否认' },
              { id: 'c3-9-D', text: 'forget', textCN: '忘记' },
            ],
            correctOptionId: 'c3-9-A',
            explanation:
              '“maintain”意为“坚持认为”，用于表述部分科学家的观点，即认为当前变暖属于自然波动，与后文“这种解释越来越罕见”形成对比。',
          },
          {
            id: 'c3-10',
            type: 'cloze',
            text: 'we have just had an unremarkable string of warm years (94)_____.',
            textCN: '我们(94)_____只是经历了一连串普通的暖年。',
            options: [
              { id: 'c3-10-A', text: 'recently', textCN: '最近' },
              { id: 'c3-10-B', text: 'gradually', textCN: '逐渐地' },
              { id: 'c3-10-C', text: 'historically', textCN: '从历史上看' },
              { id: 'c3-10-D', text: 'accidentally', textCN: '偶然地' },
            ],
            correctOptionId: 'c3-10-A',
            explanation:
              '“recently”意为“最近”，与“we have just had”（我们刚刚经历）时态一致，指近期的暖年现象。',
          },
        ],
      },
      {
        id: 'chapter4-cloze1',
        title: '完形填空 4',
        description: '关于部落生活与城市生活对比的完形填空',
        type: 'cloze',
        questions: [
          {
            id: 'c4-1',
            type: 'cloze',
            text: 'Their (95)_____ was to show them the importance of development.',
            textCN: '他们的(95)_____是向他们展示发展的重要性。',
            options: [
              { id: 'c4-1-A', text: 'objective', textCN: '目标' },
              { id: 'c4-1-B', text: 'dream', textCN: '梦想' },
              { id: 'c4-1-C', text: 'hobby', textCN: '爱好' },
              { id: 'c4-1-D', text: 'habit', textCN: '习惯' },
            ],
            correctOptionId: 'c4-1-A',
            explanation:
              '“objective”意为“目标”，符合语境，指学生们去部落的目的是展示发展的重要性。',
          },
          {
            id: 'c4-2',
            type: 'cloze',
            text: 'However, they were (96)_____ to see their life style from close quarters.',
            textCN: '然而，他们(96)_____地近距离看到他们的生活方式。',
            options: [
              { id: 'c4-2-A', text: 'shocked', textCN: '震惊的' },
              { id: 'c4-2-B', text: 'bored', textCN: '无聊的' },
              { id: 'c4-2-C', text: 'tired', textCN: '疲惫的' },
              { id: 'c4-2-D', text: 'angry', textCN: '愤怒的' },
            ],
            correctOptionId: 'c4-2-A',
            explanation:
              '“shocked”意为“震惊的”，表明学生们对部落生活方式感到意外，符合上下文逻辑。',
          },
          {
            id: 'c4-3',
            type: 'cloze',
            text: 'their time was (97)_____ by the sun, the moon and finally the seasons.',
            textCN: '他们的时间被太阳、月亮，最终被季节(97)_____。',
            options: [
              { id: 'c4-3-A', text: 'controlled', textCN: '控制' },
              { id: 'c4-3-B', text: 'wasted', textCN: '浪费' },
              { id: 'c4-3-C', text: 'saved', textCN: '节省' },
              { id: 'c4-3-D', text: 'changed', textCN: '改变' },
            ],
            correctOptionId: 'c4-3-A',
            explanation:
              '“controlled”意为“控制”，说明部落居民的时间受自然现象支配，与“公鸡叫醒他们”的描述呼应。',
          },
          {
            id: 'c4-4',
            type: 'cloze',
            text: 'the importance of time management and the (98)_____ of the watch.',
            textCN: '时间管理的重要性和手表的(98)_____。',
            options: [
              { id: 'c4-4-A', text: 'impact', textCN: '影响' },
              { id: 'c4-4-B', text: 'size', textCN: '尺寸' },
              { id: 'c4-4-C', text: 'color', textCN: '颜色' },
              { id: 'c4-4-D', text: 'brand', textCN: '品牌' },
            ],
            correctOptionId: 'c4-4-A',
            explanation:
              '“impact”意为“影响”，指学生想说明手表对生活的作用，与“时间管理”形成语义关联。',
          },
          {
            id: 'c4-5',
            type: 'cloze',
            text: 'The whole tribe had no (99)_____ of any product.',
            textCN: '整个部落没有任何产品的(99)_____。',
            options: [
              { id: 'c4-5-A', text: 'shortage', textCN: '短缺' },
              { id: 'c4-5-B', text: 'use', textCN: '使用' },
              { id: 'c4-5-C', text: 'love', textCN: '热爱' },
              { id: 'c4-5-D', text: 'name', textCN: '名字' },
            ],
            correctOptionId: 'c4-5-A',
            explanation:
              '“shortage”意为“短缺”，与后文“部落男性一起寻找食物和蜂蜜”呼应，表明物资自给自足。',
          },
          {
            id: 'c4-6',
            type: 'cloze',
            text: 'the children were (100)_____ walking into the forest without fear.',
            textCN: '孩子们(100)_____地走进森林，毫无畏惧。',
            options: [
              { id: 'c4-6-A', text: 'confident', textCN: '自信的' },
              { id: 'c4-6-B', text: 'afraid', textCN: '害怕的' },
              { id: 'c4-6-C', text: 'shy', textCN: '害羞的' },
              { id: 'c4-6-D', text: 'quiet', textCN: '安静的' },
            ],
            correctOptionId: 'c4-6-A',
            explanation:
              '“confident”意为“自信的”，与“without fear”（毫无畏惧）语义一致，体现孩子对森林的熟悉。',
          },
          {
            id: 'c4-7',
            type: 'cloze',
            text: 'Tribal people were much (101)_____ than these guys.',
            textCN: '部落居民比这些学生(101)_____得多。',
            options: [
              { id: 'c4-7-A', text: 'healthier', textCN: '更健康的' },
              { id: 'c4-7-B', text: 'weaker', textCN: '更虚弱的' },
              { id: 'c4-7-C', text: 'thinner', textCN: '更瘦弱的' },
              { id: 'c4-7-D', text: 'fatter', textCN: '更肥胖的' },
            ],
            correctOptionId: 'c4-7-A',
            explanation:
              '“healthier”意为“更健康的”，与“能连续行走数小时”的描述呼应，对比城市学生的身体状态。',
          },
          {
            id: 'c4-8',
            type: 'cloze',
            text: 'could walk for hours without (102)_____.',
            textCN: '能连续行走数小时而不(102)_____。',
            options: [
              { id: 'c4-8-A', text: 'exhaustion', textCN: '疲惫' },
              { id: 'c4-8-B', text: 'joy', textCN: '喜悦' },
              { id: 'c4-8-C', text: 'pain', textCN: '疼痛' },
              { id: 'c4-8-D', text: 'hope', textCN: '希望' },
            ],
            correctOptionId: 'c4-8-A',
            explanation:
              '“exhaustion”意为“疲惫”，“without exhaustion”表示“不感到疲惫”，强调部落居民的体力优势。',
          },
          {
            id: 'c4-9',
            type: 'cloze',
            text: 'The people who went to change the tribe, (103)_____ realized the robotic life...',
            textCN:
              '那些去改变部落的人，(103)_____意识到自己在城市中的机械生活……',
            options: [
              { id: 'c4-9-A', text: 'finally', textCN: '最终' },
              { id: 'c4-9-B', text: 'first', textCN: '首先' },
              { id: 'c4-9-C', text: 'hardly', textCN: '几乎不' },
              { id: 'c4-9-D', text: 'never', textCN: '从未' },
            ],
            correctOptionId: 'c4-9-A',
            explanation:
              '“finally”意为“最终”，表示在经历部落生活后，学生们才产生对城市生活的反思，符合故事发展逻辑。',
          },
          {
            id: 'c4-10',
            type: 'cloze',
            text: 'Instead of changing the tribe, they came back (104)_____.',
            textCN: '他们没有改变部落，反而回来时(104)_____。',
            options: [
              { id: 'c4-10-A', text: 'changed', textCN: '改变' },
              { id: 'c4-10-B', text: 'same', textCN: '相同的' },
              { id: 'c4-10-C', text: 'alone', textCN: '独自的' },
              { id: 'c4-10-D', text: 'late', textCN: '迟到的' },
            ],
            correctOptionId: 'c4-10-A',
            explanation:
              '“changed”意为“改变”，与“Instead of changing the tribe”（而非改变部落）形成转折，表明学生自身观念的转变。',
          },
        ],
      },
    ],
  },
  {
    id: 'chapter2',
    title: '第二套题',
    description: '包含阅读理解和完形填空',
    questionSets: [
      {
        id: 'chapter1-reading2',
        title: '阅读理解 2',
        description: '关于美国高科技公司技术工人短缺的阅读理解',
        type: 'reading',
        article: {
          id: 'article2',
          title: 'The Shortage of Skilled Workers in the US',
          titleCN: '美国技术工人短缺',
          content: `Despite a cooling of the economy, high technology companies are still crying out for skilled workers. The Information Technology Association of America projects that more than 800,000 technology jobs will go unfilled next year. The lack of qualified workers poses a huge threat to the US economy.
      
      The most commonly cited reason for this state of affairs is that the country's agrarian-age education system, separated from the needs of the business world, fails to prepare students in the primary and secondary grades for twenty-first-century work. Yet an inadequate and outmoded education system is only part of the problem. A less tangible but equally powerful cause is an antique classification system that divides the workforce into two camps: white-collar knowledge workers and blue-collar manual labourers.
      
      Blue-collar workers emerged in the United States during the Industrial Age as work migrated from farms to factories. White-collar office workers became a significant class in the twentieth century, outnumbering their blue-collar brethren by mid-century. But the white or blue paradigm has clearly outlived its utility. Corporations increasingly require a new layer of knowledge worker: a highly skilled multi-disciplinarian who combines the mind of the white-collar worker with the hands of the blue-collar employee. Armed with a solid grounding in mathematics and science (physics, chemistry, and biology), these "gold-collar" workers—so named for their contributions to their companies and to the economy, as well as for their personal earning ability—apply that knowledge to technology. Of course, the gold-collar worker already exists in a wide range of jobs across a wide range of businesses: think of the maintenance technician who tests and repairs aircraft systems at American Airlines; the network administrator who manages systems and network operations at P&G; the advanced-manufacturing technician at Intel.
      
      But until American business recognises these people as a new class of worker, one whose collar is neither blue nor white, demands that schools do a better job of preparing employees for the twenty-first-century workforce will be futile.`,
          contentCN: `尽管经济有所降温，但高科技公司仍在迫切需要技术工人。美国信息技术协会预计，明年将有超过80万个技术岗位空缺。合格工人的短缺对美国经济构成了巨大威胁。
      
      造成这种情况最常被提及的原因是，该国的农业时代教育体系与商业世界的需求脱节，未能让中小学学生为21世纪的工作做好准备。然而，不充分和过时的教育体系只是问题的一部分。一个不太明显但同样强大的原因是一种古老的分类系统，该系统将劳动力分为两个阵营：白领知识工作者和蓝领体力劳动者。
      
      蓝领工人在美国工业时代出现，当时工作从农场转移到工厂。白领办公室工作人员在20世纪成为一个重要的阶层，到本世纪中叶，他们的数量超过了蓝领同胞。但白色或蓝色的模式显然已经过时。企业越来越需要新的一层知识工作者：一个高度熟练的多学科人才，他们将白领工作者的思维与蓝领员工的双手结合起来。这些“金领”工人凭借扎实的数学和科学（物理、化学和生物学）基础，将这些知识应用于技术领域。当然，金领工人已经存在于广泛的企业中的各种工作岗位上：想想美国航空公司测试和维修飞机系统的维修技术员；宝洁公司管理系统和网络运营的网络管理员；英特尔公司的先进制造技术员。
      
      但在美国企业将这些人视为一个新的工人阶层之前，即一个衣领既不是蓝色也不是白色的阶层，要求学校更好地为21世纪的劳动力培养员工的需求将是徒劳的。`,
        },
        questions: [
          {
            id: 'q2-1',
            type: 'reading',
            text: 'What effects may the insufficiency of qualified workers have, according to the passage?',
            textCN: '根据文章，合格工人的不足可能会有什么影响？',
            options: [
              {
                id: 'q2-1-A',
                text: 'It decreases the costs of high technology companies.',
                textCN: '它降低了高科技公司的成本。',
              },
              {
                id: 'q2-1-B',
                text: 'It emphasises the importance of unfilled jobs.',
                textCN: '它强调了未填补工作的重要性。',
              },
              {
                id: 'q2-1-C',
                text: 'It hinders the development of the US economy.',
                textCN: '它阻碍了美国经济的发展。',
              },
              {
                id: 'q2-1-D',
                text: 'It accelerates the collapse of the old education system.',
                textCN: '它加速了旧教育体系的崩溃。',
              },
            ],
            correctOptionId: 'q2-1-C',
            explanation:
              'The last sentence of the first paragraph states that the lack of qualified workers poses a huge threat to the US economy, which means it hinders the development of the US economy.',
          },
          {
            id: 'q2-2',
            type: 'reading',
            text: 'According to the passage, what leads to the lack of qualified workers in the US?',
            textCN: '根据文章，美国合格工人短缺的原因是什么？',
            options: [
              {
                id: 'q2-2-A',
                text: 'The disadvantages of the agrarian-age education system.',
                textCN: '农业时代教育体系的弊端。',
              },
              {
                id: 'q2-2-B',
                text: 'The shortage of work opportunities due to the declining economy.',
                textCN: '由于经济衰退导致的工作机会短缺。',
              },
              {
                id: 'q2-2-C',
                text: 'The cooling of American economy.',
                textCN: '美国经济的降温。',
              },
              {
                id: 'q2-2-D',
                text: 'Both the education system and the workforce classification.',
                textCN: '教育体系和劳动力分类。',
              },
            ],
            correctOptionId: 'q2-2-D',
            explanation:
              'The second paragraph mentions that the commonly cited reason is the agrarian-age education system, and yet there is another cause, an antique classification system. So both the education system and the workforce classification lead to the lack of qualified workers.',
          },
          {
            id: 'q2-3',
            type: 'reading',
            text: 'The gold-collar workers differ from their white-collar and blue-collar counterparts in that they ________.',
            textCN:
              '金领工人与他们的白领和蓝领同行的不同之处在于他们________。',
            options: [
              {
                id: 'q2-3-A',
                text: 'do better in combining their contributions and earning ability',
                textCN: '在结合他们的贡献和赚钱能力方面做得更好',
              },
              {
                id: 'q2-3-B',
                text: 'have the knowledge and engage in labour work as well',
                textCN: '既有知识又从事体力劳动',
              },
              {
                id: 'q2-3-C',
                text: 'can apply their knowledge to technology',
                textCN: '能够将他们的知识应用于技术',
              },
              {
                id: 'q2-3-D',
                text: 'enjoy different salary from others',
                textCN: '享受与其他人不同的薪水',
              },
            ],
            correctOptionId: 'q2-3-B',
            explanation:
              "In the third paragraph, it is stated that the 'gold-collar' workers are highly skilled multi-disciplinarians who combine the mind of the white-collar worker with the hands of the blue-collar employee, meaning they have knowledge and engage in labour work.",
          },
          {
            id: 'q2-4',
            type: 'reading',
            text: 'The demands for gold-collar workers will not be satisfied if ________.',
            textCN: '如果________，对金领工人的需求将无法得到满足。',
            options: [
              {
                id: 'q2-4-A',
                text: 'they are not regarded as a new class of worker',
                textCN: '他们不被视为一个新的工人阶层',
              },
              {
                id: 'q2-4-B',
                text: 'the schools do not make an effort to cultivate their students',
                textCN: '学校不努力培养他们的学生',
              },
              {
                id: 'q2-4-C',
                text: 'the American business does not fund the schools',
                textCN: '美国企业不给学校提供资金',
              },
              {
                id: 'q2-4-D',
                text: 'there is no appropriate education system',
                textCN: '没有合适的教育体系',
              },
            ],
            correctOptionId: 'q2-4-A',
            explanation:
              'The last paragraph indicates that until American business recognises these people as a new class of worker, the demands will be futile, so if they are not regarded as a new class of worker, the demands for gold-collar workers will not be satisfied.',
          },
          {
            id: 'q2-5',
            type: 'reading',
            text: 'The best title for the passage may be ________.',
            textCN: '这篇文章的最佳标题可能是________。',
            options: [
              {
                id: 'q2-5-A',
                text: 'The Cooling of the US Economy',
                textCN: '美国经济的降温',
              },
              {
                id: 'q2-5-B',
                text: 'The Training of Gold-collar workers',
                textCN: '金领工人的培训',
              },
              {
                id: 'q2-5-C',
                text: 'The Shortage of Technology Jobs',
                textCN: '技术工作岗位的短缺',
              },
              {
                id: 'q2-5-D',
                text: 'Gold-collar Workers in Need',
                textCN: '急需金领工人',
              },
            ],
            correctOptionId: 'q2-5-D',
            explanation:
              "The passage mainly focuses on the shortage of gold-collar workers, including the reasons and the situation, so 'Gold-collar Workers in Need' best概括全文.",
          },
        ],
      },
      {
        id: 'chapter1-reading1',
        title: '阅读理解 1',
        description: '关于父亲参与对孩子学业影响的阅读理解',
        type: 'reading',
        article: {
          id: 'article1',
          title: "The Role of Father in Child's Academic Progress",
          titleCN: '父亲在孩子学业进步中的作用',
          content: `A father's relationship to his child's current and future academic success and the level of his or her development in academic potential and scholastic achievement are both factors with some rather interesting implications that educators are beginning to study and appraise. As a matter of fact, "life with father" has been discovered to be a very important factor in determining a child's progress or lack of progress in school.
      A recent survey of over 16,000 children made by the National Child Development Study in London revealed that children whose fathers came to school conferences and accompanied their children on outing did measurably better in school than those children whose fathers were not involved in those activities. The study, which monitored children born during a week in March, 1992, from the time of their birth through the years of their early schooling, further revealed that the children of actively involved fathers scored much higher in reading and maths than those children whose only involved parent was the mother. The purpose of the study was to evaluate the role played by father in the raising of a child. It indicated a much higher level of parental involvement by the father than had been anticipated. Over 66% of the fathers were said to have played a major role in parental responsibility.
      The study also suggested that the greatest level of paternal parenting took place in the families of only child. As the number of children and financial obligations increases, the father's apparent interest and involvement with the children decreased. However, no matter what the size or financial condition of the family, a father's active participation in the child's development made a definite difference in the child's progress.
      The study further revealed that while the frequency of overnight absences reflected a corresponding deficiency (缺陷) of the child's level in maths and reading, a father's employment on night shifts appeared to have little effect on the child's academic progress. The data from the study was obtained primarily through interviews from parents, teachers and physicians. The information evaluating the level of the fathers' parenting performance was elicited (探出) primarily from the admittedly subjective observations of their wives.`,
          contentCN: `父亲与孩子当前和未来的学业成功以及孩子学术潜力和学业成就的发展水平之间的关系，是教育工作者开始研究和评估的两个具有相当有趣含义的因素。事实上，“与父亲一起生活”已被发现是决定孩子在学校进步与否的一个非常重要的因素。
      伦敦国家儿童发展研究对16000多名儿童进行的一项最新调查显示，父亲参加学校会议并陪孩子外出的孩子在学校的表现明显优于父亲不参与这些活动的孩子。这项研究对1992年3月某一周出生的孩子从出生到早期上学期间进行了监测，进一步表明，父亲积极参与的孩子在阅读和数学方面的得分比只有母亲参与的孩子高得多。这项研究的目的是评估父亲在抚养孩子中所起的作用。研究表明，父亲的参与程度比预期的要高得多。据说超过66%的父亲在养育孩子方面发挥了重要作用。
      研究还表明，最高水平的父亲养育发生在独生子女家庭。随着孩子数量和经济负担的增加，父亲对孩子的明显兴趣和参与度会下降。然而，无论家庭规模或经济状况如何，父亲对孩子发展的积极参与对孩子的进步都有明显的影响。
      研究进一步表明，虽然夜间缺勤的频率反映了孩子在数学和阅读水平上的相应缺陷，但父亲上夜班似乎对孩子的学业进步影响不大。该研究的数据主要通过对家长、教师和医生的访谈获得。评估父亲养育表现水平的信息主要是从他们妻子公认的主观观察中得出的。`,
        },
        questions: [
          {
            id: 'q1-1',
            type: 'reading',
            text: 'The main discovery made in the study was that ________.',
            textCN: '研究的主要发现是________。',
            options: [
              {
                id: 'q1-1-A',
                text: 'children in large families tend to do poorly in school',
                textCN: '大家庭的孩子往往在学校表现不佳',
              },
              {
                id: 'q1-1-B',
                text: "a father's influence played a significant role in the level of the child's academic progress",
                textCN: '父亲的影响在孩子的学业进步水平中起着重要作用',
              },
              {
                id: 'q1-1-C',
                text: 'mothers were subjective in evaluating the roles played by fathers',
                textCN: '母亲在评价父亲所起的作用时是主观的',
              },
              {
                id: 'q1-1-D',
                text: 'there is a correlation between socioeconomic status and scholastic achievement',
                textCN: '社会经济地位和学业成就之间存在关联',
              },
            ],
            correctOptionId: 'q1-1-B',
            explanation:
              '文章中作为分论点的第2~4段分别对国家儿童发展研究所做的调查进行了说明。综合这3段的结果得出的结论也正是文章开头第2句所提到的主旨：父亲的参与对孩子在学业上进步起着至关重要的作用。 B)正是对此句的同义转述。A)是对第3段第2句话的过度推理；C)是对文章末句的归纳，并不是研究得出的主要发现；D)在文中没有提及。',
          },
          {
            id: 'q1-2',
            type: 'reading',
            text: 'The data accumulated was obtained through ________.',
            textCN: '积累的数据是通过________获得的。',
            options: [
              {
                id: 'q1-2-A',
                text: 'observation by social psychologists',
                textCN: '社会心理学家的观察',
              },
              {
                id: 'q1-2-B',
                text: 'conversations with mothers of the children',
                textCN: '与孩子母亲的交谈',
              },
              {
                id: 'q1-2-C',
                text: "interviews, school records and physicians' reports",
                textCN: '访谈、学校记录和医生报告',
              },
              {
                id: 'q1-2-D',
                text: 'observations of fathers with their children',
                textCN: '对父亲和孩子的观察',
              },
            ],
            correctOptionId: 'q1-2-C',
            explanation:
              '文章第4段的倒数第2句谈到了数据的来源：主要是通过同父母、老师及医生面谈来获得的，C)正好概括了这三方面的内容。',
          },
          {
            id: 'q1-3',
            type: 'reading',
            text: 'All of the children studied _______.',
            textCN: '所有被研究的孩子________。',
            options: [
              {
                id: 'q1-3-A',
                text: 'attended the same school',
                textCN: '上同一所学校',
              },
              {
                id: 'q1-3-B',
                text: 'were in the same socioeconomic class',
                textCN: '处于相同的社会经济阶层',
              },
              {
                id: 'q1-3-C',
                text: 'were at the same age',
                textCN: '年龄相同',
              },
              { id: 'q1-3-D', text: 'knew each other', textCN: '互相认识' },
            ],
            correctOptionId: 'q1-3-C',
            explanation:
              '文章第2段第2句提到被研究的孩子都是1992年3月同一个星期内出生的，所以这些孩子的年龄是一样的，故答案为C)。',
          },
          {
            id: 'q1-4',
            type: 'reading',
            text: 'According to the passage, children who probably progress academically were ______.',
            textCN: '根据文章，可能在学业上取得进步的孩子是______。',
            options: [
              {
                id: 'q1-4-A',
                text: 'those whose mothers gave them the most affection',
                textCN: '那些母亲给予他们最多关爱的孩子',
              },
              {
                id: 'q1-4-B',
                text: 'those whose fathers worked the night shift',
                textCN: '那些父亲上夜班的孩子',
              },
              {
                id: 'q1-4-C',
                text: 'those who had no brothers or sisters',
                textCN: '那些没有兄弟姐妹的孩子',
              },
              {
                id: 'q1-4-D',
                text: 'from one-parent families',
                textCN: '来自单亲家庭的孩子',
              },
            ],
            correctOptionId: 'q1-4-C',
            explanation:
              '全文强调的是父亲的参与对孩子学习表现的积极影响，而没有提到母亲的关心对孩子学习的影响，故排除A)；由文章末段可知，父亲上夜班对孩子的学习进步没有多大影响，排除B)；D)在文章中没有提到，但是从文章强调父母尤其是父亲对孩子的关注可知，单亲家庭的影响不会是积极的。文章第3段首句谈到，独生子女家庭中父亲参与孩子活动的程度最高，结合已知的“父亲的参与对孩子的学习进步有推动作用”可推断C)“那些没有兄弟姐妹的孩子”正确。',
          },
          {
            id: 'q1-5',
            type: 'reading',
            text: 'Evidence indicated that a high percentage of fathers were involved in the parenting process which amounted to _______.',
            textCN:
              '证据表明，很大比例的父亲参与了养育过程，这一比例达到了_______。',
            options: [
              {
                id: 'q1-5-A',
                text: 'about two-thirds of the fathers involved in the study',
                textCN: '参与研究的父亲的大约三分之二',
              },
              {
                id: 'q1-5-B',
                text: 'slightly less than half of the fathers studied',
                textCN: '略少于所研究父亲的一半',
              },
              {
                id: 'q1-5-C',
                text: 'more than three-quarters of all the fathers',
                textCN: '超过所有父亲的四分之三',
              },
              {
                id: 'q1-5-D',
                text: 'a little less than one hundred percent of all fathers',
                textCN: '略少于所有父亲的百分之百',
              },
            ],
            correctOptionId: 'q1-5-A',
            explanation:
              '从文章第2段末句可知，调查表明，66%以上的父亲在承担照料孩子方面发挥着重要作用，A)中的two-thirds是对over 66%的同义转述。',
          },
        ],
      },
      {
        id: 'chapter1-reading1',
        title: '阅读理解 1',
        description: '关于微波炉使用与碳排放的阅读理解',
        type: 'reading',
        article: {
          id: 'article1',
          title: 'The Carbon Emissions of Microwaves',
          titleCN: '微波炉的碳排放',
          content: `Popping food into the microwave for a couple of minutes may seem utterly harmless, but Europe's stock of these quick-cooking ovens emit as much carbon as nearly 7 million cars, a new study has found. And the problem is growing. With costs falling and kitchen appliances becoming “status” items, owners are throwing away microwaves after an average of eight years. This is pushing sales of new microwaves which are expected to reach 135 million annually in the EU by the end of the decade.
      A study by the University of Manchester calculated the emissions of CO2 the main greenhouse gas responsible for climate change—at every stage of microwaves, from manufacture to waste disposal. “It is electricity consumption by microwaves that has the biggest impact on the environment,” say the authors. The authors also calculate that the emissions from using 19 microwaves over a year are the same as those from using a car. According to the same study, efforts to reduce consumption should focus on improving consumer awareness and behaviour. For example, consumers could use appliances in a more efficient way by adjusting the time of cooking to the type of food.
      However, David Reay, professor of carbon management, argues that, although microwaves use a great deal of energy, their emissions are minor compared to those from cars. In the UK alone, there are around 30 million cars. These cars emit more than all the microwaves in the EU. Backing this up, recent data show that passenger cars in the UK emitted 69 million tons of CO2 in 2015. This is 10 times the amount this new microwave oven study estimates for annual emissions for all the microwave ovens in the EU. Further, the energy used by microwaves is lower than any other form of cooking. Among common kitchen appliances used for cooking, microwaves are the most energy efficient, followed by a stove and finally a standard oven. Thus, rising microwave sales could be seen as a positive thing.`,
          contentCN: `把食物放进微波炉加热几分钟可能看上去完全无害，但是一项新研究发现，欧洲的这些快速烹饪炉具释放的碳相当于近700万辆小轿车的碳排放量。而且这个问题正在加剧。随着成本的下降和厨房用具成为“社会地位”的象征，用户们在平均使用八年后就会扔掉微波炉。这推动了新型微波炉的销量，预计到本年代结束前，欧盟每年的新型微波炉销售量将达到1.35亿。
      曼彻斯特大学的一项研究计算了微波炉从制造到废弃处理的每个阶段的二氧化碳排放量，二氧化碳是导致气候变化的主要温室气体。“微波炉的电力消耗对环境的影响最大，”作者说。作者还计算出，一年使用19台微波炉的排放量与使用一辆汽车的排放量相同。根据同一项研究，减少消耗的努力应该集中在提高消费者的意识和行为上。例如，消费者可以根据食物的种类调整烹饪时间，以更有效的方式使用电器。
      然而，碳管理教授大卫·雷伊认为，尽管微波炉消耗大量能源，但与汽车的排放量相比，它们的排放量微不足道。仅在英国，就有大约3000万辆汽车。这些汽车排放的二氧化碳比欧盟所有微波炉排放的总和还要多。最近的数据支持了这一点，2015年英国的乘用车排放了6900万吨二氧化碳。这是这项新的微波炉研究估计的欧盟所有微波炉年排放量的10倍。此外，微波炉使用的能源比任何其他烹饪方式都要低。在常见的用于烹饪的厨房用具中，微波炉是最节能的，其次是炉灶，最后是标准烤箱。因此，微波炉销量的上升可以被视为一件好事。`,
        },
        questions: [
          {
            id: 'q1-1',
            type: 'reading',
            text: 'What is the finding of the new study?',
            textCN: '这项新研究的发现是什么？',
            options: [
              {
                id: 'q1-1-A',
                text: 'Quick-cooking microwave ovens have become more popular.',
                textCN: '快速烹饪微波炉变得越来越受欢迎。',
              },
              {
                id: 'q1-1-B',
                text: 'The frequent use of microwaves may do harm to our health.',
                textCN: '频繁使用微波炉可能对我们的健康有害。',
              },
              {
                id: 'q1-1-C',
                text: 'CO2 emissions constitute a major threat to the environment.',
                textCN: '二氧化碳排放对环境构成重大威胁。',
              },
              {
                id: 'q1-1-D',
                text: 'The use of microwaves emits more CO2 than people think.',
                textCN: '微波炉的使用排放的二氧化碳比人们想象的要多。',
              },
            ],
            correctOptionId: 'q1-1-D',
            explanation:
              '由题干中的 the new study定位到首段第一句。定位句指出，把食物放进微波炉加热几分钟可能看上去完全无害，但是一项新研究发现，欧洲的这些快速烹饪炉具释放的碳相当于近700万辆小轿车的碳排放量。该句中的转折连词but体现出前后分句的关系，前半句是对微波炉的积极评价，后半句则为消极评价，通过对比可以看出微波炉的碳排放量是高于人们想象的，故答案为D)“微波炉的使用释放出比人们想象中更多的二氧化碳”。选项A)“快速烹饪微波炉变得越发受欢迎”，首段中虽然提到微波炉的销量在增长，但并非新研究的发现，不符合题干信息，故排除。文中未提及微波炉的使用对健康造成的伤害，故排除。B)“频繁使用微波炉会对我们的健康造成伤害”。虽然文中多次提及二氧化碳的排放问题，但并未指出这是对环境的最大威胁，故排除C)“二氧化碳排放构成了对环境的最大威胁”。',
          },
          {
            id: 'q1-2',
            type: 'reading',
            text: 'Why are the sales of microwaves expected to rise?',
            textCN: '为什么微波炉的销量预计会上升？',
            options: [
              {
                id: 'q1-2-A',
                text: 'They are becoming more affordable.',
                textCN: '它们变得更实惠了。',
              },
              {
                id: 'q1-2-B',
                text: 'They have a shorter life cycle than other appliances.',
                textCN: '它们的生命周期比其他电器短。',
              },
              {
                id: 'q1-2-C',
                text: 'They are getting much easier to operate.',
                textCN: '它们变得更容易操作。',
              },
              {
                id: 'q1-2-D',
                text: 'They take less time to cook than other appliances.',
                textCN: '它们比其他电器烹饪时间更短。',
              },
            ],
            correctOptionId: 'q1-2-A',
            explanation:
              '由题干中的 the sales of microwaves和expected to rise定位到首段末句。定位句指出，这推动了新型微波炉的销量，预计到本年代结束前，欧盟每年的新型微波炉的销售量能达到1.35亿。而上一句指出了推动销量的主要原因:成本的降低和厨房用具变成体现“社会地位”的物品，在使用8年后，使用者们会扔掉微波炉。由此可知，其中一个原因是成本的降低，即微波炉价格的降低，故答案为A)“它们变得更容易让人们负担得起”。文中第一段提及了使用者们会在平均8年的使用时间后扔掉微波炉，但并未和其他器具的使用时间进行比较，故可排除B)“它们比其他用具有着更短的生命周期”。原文中未提及C)“它们更容易操作”和D)“它们比其他用具花费更少的时间去烹饪”，故排除。',
          },
          {
            id: 'q1-3',
            type: 'reading',
            text: 'What recommendation does the study by the University of Manchester make?',
            textCN: '曼彻斯特大学的研究提出了什么建议？',
            options: [
              {
                id: 'q1-3-A',
                text: 'Cooking food of different varieties.',
                textCN: '烹饪不同种类的食物。',
              },
              {
                id: 'q1-3-B',
                text: "Improving microwave users' habits.",
                textCN: '改善微波炉使用者的习惯。',
              },
              {
                id: 'q1-3-C',
                text: 'Eating less to cut energy consumption.',
                textCN: '少吃以减少能源消耗。',
              },
              {
                id: 'q1-3-D',
                text: 'Using microwave ovens less frequently.',
                textCN: '减少微波炉的使用频率。',
              },
            ],
            correctOptionId: 'q1-3-B',
            explanation:
              '答案为B)。由题干中的 the study by the University of Manchester定位到第二段最后两句。定位句指出，降低消耗的努力应聚焦在改进消费者的意识和行为上。比如，消费者们可以根据食物种类调整烹饪时间，用一种更有效的方式来使用这些器具。由此可推断答案为B)“改进微波炉使用者的习惯”。第二段最后一句举例说明如何改变消费者的习惯，其中提到了调整烹饪时间，但未提及改变使用频率或是烹饪的食物种类，更未提及让消费者吃得更少等建议，故可排除A)“烹饪不同种类的食物”、C)“少吃来减少能量消耗”和D)“减少微波炉的使用频率”。',
          },
          {
            id: 'q1-4',
            type: 'reading',
            text: 'What does Professor David Reay try to argue?',
            textCN: '大卫·雷伊教授试图论证什么？',
            options: [
              {
                id: 'q1-4-A',
                text: 'There are far more emissions from cars than from microwaves.',
                textCN: '汽车的排放量比微波炉多得多。',
              },
              {
                id: 'q1-4-B',
                text: 'People should be persuaded into using passenger cars less often.',
                textCN: '应该劝说人们少用乘用车。',
              },
              {
                id: 'q1-4-C',
                text: 'The UK produces less CO2 than many other countries in the EU.',
                textCN: '英国的二氧化碳排放量比欧盟其他许多国家都少。',
              },
              {
                id: 'q1-4-D',
                text: 'More data are needed to show whether microwaves are harmful.',
                textCN: '需要更多数据来证明微波炉是否有害。',
              },
            ],
            correctOptionId: 'q1-4-A',
            explanation:
              '答案为A)。由题干中的 Professor David Reay和 argue定位到第三段第一句。定位句提到，碳管理方面的教授大卫·雷伊认为，尽管微波炉使用大量能量，它们的排放量和汽车相比微乎其微。也就是说汽车的碳排放量要远大于微波炉，故答案为A)。文章第三段第三句虽然提到英国的客车在2015年排放了6，900万吨二氧化碳，但并未建议人们少使用小客车，故排除B)“应该劝说人们更少地使用小客车”。文章并未提及C)“英国比欧盟的其他很多国家产生更少的二氧化碳”和D)“需要更多的数据来证明微波炉是否有害”，故排除。',
          },
          {
            id: 'q1-5',
            type: 'reading',
            text: 'What does Professor David Reay think of the use of microwaves?',
            textCN: '大卫·雷伊教授对微波炉的使用有什么看法？',
            options: [
              {
                id: 'q1-5-A',
                text: 'It will become less popular in the coming decades.',
                textCN: '在未来几十年里它将变得不那么受欢迎。',
              },
              {
                id: 'q1-5-B',
                text: 'It makes everyday cooking much more convenient.',
                textCN: '它使日常烹饪更加方便。',
              },
              {
                id: 'q1-5-C',
                text: 'It plays a positive role in environmental protection.',
                textCN: '它在环境保护中发挥着积极作用。',
              },
              {
                id: 'q1-5-D',
                text: 'It consumes more power than conventional cooking.',
                textCN: '它比传统烹饪消耗更多的能量。',
              },
            ],
            correctOptionId: 'q1-5-C',
            explanation:
              '答案为C)。由题干中的 Professor David Reay和the use of microwaves定位到最后一段最后两句。定位句指出，在所有常见的厨房烹饪用具中，微波炉是最节能的，其次是炉灶，最后是标准的烤箱。这样一来，提高微波炉的销量可以被视为一种积极的举措。由定位句可知，微波炉是最节能的，也就是碳排放量最小，对环境危害最小，故答案为C)“它在环保方面起到一个积极的作用”。选项A)“在未来的几十年中它将变得不再受欢迎”和B)“它让每天的烹饪变得更容易”，文中没有提及，故排除。由定位句可知，微波炉是最节能的，其次是炉子，最后是标准的烤箱，D)“它比传统的烹饪消耗更多的能量”和文义不符，故排除。',
          },
        ],
      },
      {
        id: 'chapter1-reading1',
        title: '阅读理解 1',
        description: '关于学前教育的阅读理解',
        type: 'reading',
        article: {
          id: 'article1',
          title: 'Pre-K Education',
          titleCN: '学前教育',
          content: `The most important thing in the news last week was the rising discussion in Nashville about the educational needs of children. The shorthand (简写) educators use for this is "pre-K"—meaning instruction before kindergarten—and the big idea is to prepare 4-year-olds and even younger kids to be ready to succeed on their K-12 journey.
      But it gets complicated. The concept has multiple forms, and scholars and policymakers argue about the shape, scope and cost of the ideal program.
      The federal Head Start program, launched 50 years ago, has served more than 30 million children. It was based on concepts developed at Vanderbilt University's Peabody College by Susan Gray, the legendary pioneer in early childhood education research.
      A new Peabody study of the Tennessee Voluntary Pre-K program reports that pre-K works, but the gains are not sustained through the third grade. It seems to me this highlights quality issues in elementary schools more than pre-K, and indicates longer-term success must connect pre-K with all the other issues related to educating a child.
      Pre-K is controversial. Some critics say it is a luxury and shouldn't be free to families able to pay. Pre-K advocates insist it is proven and will succeed if integrated with the rest of the child's schooling. I lean toward the latter view.
      This is, in any case, the right conversation to be having now as Mayor Megan Barry takes office. She was the first candidate to speak out for strong pre-K programming. The important thing is for all of us to keep in mind the real goal and the longer, bigger picture.
      The weight of the evidence is on the side of pre-K that early intervention (干预) works. What government has not yet found is the political will to put that understanding into full practice with a sequence of smart schooling that provides the early foundation.
      For this purpose, our schools need both the talent and the organization to educate each child who arrives at the schoolhouse door. Some show up ready, but many do not at this critical time when young brains are developing rapidly.`,
          contentCN: `上周新闻中最重要的事情是纳什维尔关于儿童教育需求的讨论日益激烈。教育工作者使用的简写是“学前教育”——指幼儿园之前的教育——其主要理念是让4岁甚至更小的孩子为他们的K-12学习之旅做好准备。
      但事情变得复杂了。这个概念有多种形式，学者和政策制定者就理想项目的形式、范围和成本进行争论。
      联邦政府的“启智计划”于50年前启动，已经为超过3000万儿童提供了服务。它基于范德堡大学皮博迪学院由苏珊·格雷（幼儿教育研究的传奇先驱）提出的理念。
      皮博迪对田纳西州自愿学前教育项目的一项新研究报告称，学前教育是有效的，但这种成效到三年级时就无法持续了。在我看来，这更多地凸显了小学的质量问题，而不是学前教育的问题，这表明长期的成功必须将学前教育与教育孩子的所有其他问题联系起来。
      学前教育存在争议。一些批评者说它是一种奢侈品，对于有能力支付的家庭不应该免费。学前教育的倡导者坚持认为它已经得到证实，如果与孩子的其他学校教育相结合就会成功。我倾向于后一种观点。
      无论如何，随着梅根·巴里市长上任，现在进行这样的讨论是正确的。她是第一个为强有力的学前教育项目发声的候选人。重要的是我们所有人都要牢记真正的目标和更长远、更宏观的图景。
      有充分的证据表明学前教育早期干预是有效的。政府尚未找到的是将这种认识通过一系列提供早期基础的明智教育全面付诸实践的政治意愿。
      为此，我们的学校需要有人才和组织来教育每一个来到学校门口的孩子。在这个幼童大脑快速发育的关键时期，有些孩子准备好了，但很多孩子没有。`,
        },
        questions: [
          {
            id: 'q1-1',
            type: 'reading',
            text: 'What does the author say about pre-kindergarten education?',
            textCN: '作者对学前教育有什么看法？',
            options: [
              {
                id: 'q1-1-A',
                text: 'It should cater to the needs of individual children.',
                textCN: '它应该满足个别孩子的需求。',
              },
              {
                id: 'q1-1-B',
                text: "It is essential to a person's future academic success.",
                textCN: '它对一个人未来的学业成功至关重要。',
              },
              {
                id: 'q1-1-C',
                text: 'Scholars and policymakers have different opinions about it.',
                textCN: '学者和政策制定者对此有不同的看法。',
              },
              {
                id: 'q1-1-D',
                text: "Parents regard it as the first phase of children's development.",
                textCN: '家长将其视为孩子发展的第一阶段。',
              },
            ],
            correctOptionId: 'q1-1-C',
            explanation:
              '文章第二段第二句指出这种理念形式多样，学者和政策制定者就理想方案的形式、范围及成本等产生了分歧，所以学者和政策制定者对此有不同看法，答案选C。',
          },
          {
            id: 'q1-2',
            type: 'reading',
            text: 'What does the new Peabody study find?',
            textCN: '皮博迪的新研究发现了什么？',
            options: [
              {
                id: 'q1-2-A',
                text: 'Pre-K achievements usually do not last long.',
                textCN: '学前教育的成果通常不会持续很长时间。',
              },
              {
                id: 'q1-2-B',
                text: 'The third grade marks a new phase of learning.',
                textCN: '三年级标志着一个新的学习阶段。',
              },
              {
                id: 'q1-2-C',
                text: "The third grade is critical to children's development.",
                textCN: '三年级对孩子的发展至关重要。',
              },
              {
                id: 'q1-2-D',
                text: 'Quality has not been the top concern of pre-K programs.',
                textCN: '质量并不是学前教育项目最关心的问题。',
              },
            ],
            correctOptionId: 'q1-2-A',
            explanation:
              '文章第四段第一句提到这项研究指出学前教育是有用的，但其效果不会持续到三年级，即学前教育的成果通常不会持续很长时间，答案选A。',
          },
          {
            id: 'q1-3',
            type: 'reading',
            text: 'When does the author think pre-K works the best?',
            textCN: '作者认为学前教育在什么时候效果最好？',
            options: [
              {
                id: 'q1-3-A',
                text: 'When it is accessible to kids of all families.',
                textCN: '当所有家庭的孩子都能接受时。',
              },
              {
                id: 'q1-3-B',
                text: "When it is made part of kids' education.",
                textCN: '当它成为孩子教育的一部分时。',
              },
              {
                id: 'q1-3-C',
                text: 'When it is no longer considered a luxury.',
                textCN: '当它不再被视为奢侈品时。',
              },
              {
                id: 'q1-3-D',
                text: 'When it is made fun and enjoyable to kids.',
                textCN: '当它让孩子们觉得有趣和愉快时。',
              },
            ],
            correctOptionId: 'q1-3-B',
            explanation:
              '文章第四段最后一句作者认为学前教育要想取得长久的成效，必须与其它教育问题结合起来，也就是当它成为孩子教育的一部分时效果最好，答案选B。',
          },
          {
            id: 'q1-4',
            type: 'reading',
            text: 'What do we learn about Mayor Megan Barry?',
            textCN: '关于梅根·巴里市长我们了解到什么？',
            options: [
              {
                id: 'q1-4-A',
                text: 'She knows the real goal of education.',
                textCN: '她知道教育的真正目标。',
              },
              {
                id: 'q1-4-B',
                text: 'She is a mayor of insight and vision.',
                textCN: '她是一位有洞察力和远见的市长。',
              },
              {
                id: 'q1-4-C',
                text: 'She has once run a pre-K program.',
                textCN: '她曾经管理过一个学前教育项目。',
              },
              {
                id: 'q1-4-D',
                text: 'She is a firm supporter of pre-K.',
                textCN: '她是学前教育的坚定支持者。',
              },
            ],
            correctOptionId: 'q1-4-D',
            explanation:
              '文章第六段第二句表明她是首个为学前项目强烈发声的候选人，即她支持学前教育这个项目，答案选D。',
          },
          {
            id: 'q1-5',
            type: 'reading',
            text: "What does the author think is critical to kids' education?",
            textCN: '作者认为对孩子的教育至关重要的是什么？',
            options: [
              { id: 'q1-5-A', text: 'Teaching method.', textCN: '教学方法。' },
              { id: 'q1-5-B', text: "Kids' interest.", textCN: '孩子的兴趣。' },
              {
                id: 'q1-5-C',
                text: 'Early intervention.',
                textCN: '早期干预。',
              },
              {
                id: 'q1-5-D',
                text: "Parents' involvement.",
                textCN: '家长的参与。',
              },
            ],
            correctOptionId: 'q1-5-C',
            explanation:
              '文章第七段第一句提到有充分的证据表明学前教育早期干预是有效的，所以作者认为早期干预对孩子的教育至关重要，答案选C。',
          },
        ],
      },
      {
        id: 'chapter1-reading1',
        title: '阅读理解 1',
        description: '关于2015年美国房地产趋势的阅读理解',
        type: 'reading',
        article: {
          id: 'article1',
          title: 'Real Estate Trends in 2015',
          titleCN: '2015年房地产趋势',
          content: `Urbanization—migration away from the suburbs to the city center will be the biggest real estate trend in 2015, according to a new report.
      The report says America's urbanization will continue to be the most significant issue affecting the industry, as cities across the country imitate the walkability and transit-oriented development making cities like New York and San Francisco so successful.
      As smaller cities copy the model of these "24-hour cities," more affordable versions of these places will be created. The report refers to this as the coming of the "18-hour city, and uses the term to refer to cities like Houston, Austin, Charlotte, and Nashville, which are "positioning themselves as highly competitive, in terms of livability, employment offerings, and recreational and cultural facilities."
      Another trend that looks significant in 2015 is that America's largest population group, Millennials (千禧一代), will continue to put off buying a house. Apartments will retain their appeal for a while for Millennials, haunted by what happened to home-owning parents.
      This trend will continue into the 2020s, the report projects. After that, survey respondents disagree over whether this generation will follow in their parents’ footsteps，moving to the suburbs to raise families, or will choose to remain in the city center.
      Another issue affecting real estate in the coming year will be America's falling infrastructure. Most roads, bridges, transit, water systems, the electric grid, and communications networks were installed 50 to 100 years ago, and they are largely taken for granted until they fail.
      The report's writers state that America's failure to invest in infrastructure impacts not only the health of the real-estate market, but also our ability to remain globally competitive.
      Apart from the specific trends highlighted above, which cause some investors to worry, the report portrays an overall optimism borne by the recent healthy real-estate "upcycle" and improving economy. Seventy-four percent of the respondents surveyed report a "good to excellent" expectation of real-estate profitability in 2015. While excessive optimism can promote bad investment patterns, resulting in a real-estate "bubble," the report's writers downplay that potential outcome in that it has not yet occurred.`,
          contentCN: `根据一份新报告，城市化——从郊区向市中心迁移将是2015年最大的房地产趋势。
      该报告称，美国的城市化将继续成为影响该行业的最重要问题，因为全国的城市都在模仿纽约和旧金山等城市的可步行性和以交通为导向的发展模式，这些城市因此非常成功。
      随着小城市效仿这些“24小时城市”的模式，将会出现更多价格亲民的此类城市。该报告将此称为“18小时城市”的到来，并用这个词来指代休斯顿、奥斯汀、夏洛特和纳什维尔等城市，这些城市“在宜居性、就业机会以及娱乐和文化设施方面将自己定位为极具竞争力的城市”。
      2015年另一个显著的趋势是，美国最大的人口群体——千禧一代将继续推迟买房。受拥有房产的父母所经历事情的影响，公寓在一段时间内仍将对千禧一代有吸引力。
      该报告预计，这一趋势将持续到2020年代。在那之后，调查受访者对于这一代人是否会追随父母的脚步，搬到郊区组建家庭，还是会选择留在市中心存在分歧。
      明年影响房地产的另一个问题将是美国不断恶化的基础设施。大多数道路、桥梁、交通、供水系统、电网和通信网络都是在50到100年前安装的，在它们出现故障之前，人们基本上都认为它们是理所当然的。
      该报告的作者指出，美国在基础设施投资方面的失败不仅影响房地产市场的健康，也影响我们在全球保持竞争力的能力。
      除了上述引起一些投资者担忧的具体趋势外，该报告描绘了近期房地产“上升周期”和经济改善所带来的总体乐观情绪。74%的受访受访者对2015年房地产盈利能力的预期为“良好到优秀”。虽然过度乐观可能会促进不良投资模式，导致房地产“泡沫”，但该报告的作者淡化了这种潜在结果，因为它尚未发生。`,
        },
        questions: [
          {
            id: 'q1-1',
            type: 'reading',
            text: 'According to the new report, real estate development in 2015 will witness________________.',
            textCN: '根据新的报告，2015年的房地产发展将会见证 。',
            options: [
              {
                id: 'q1-1-A',
                text: 'an accelerating speed',
                textCN: '加速发展',
              },
              {
                id: 'q1-1-B',
                text: 'a shift to city centers',
                textCN: '向市中心转移',
              },
              {
                id: 'q1-1-C',
                text: 'a new focus on small cities',
                textCN: '对小城市的新关注',
              },
              {
                id: 'q1-1-D',
                text: 'an ever-increasing demand',
                textCN: '不断增长的需求',
              },
            ],
            correctOptionId: 'q1-1-B',
            explanation:
              '根据题干中的real estate development in 2015可以定位到第一段，Urbanization—migration away from the suburbs to the city center will be the biggest real estate trend in 2015, according to a new report. 意为，根据一份新的报告，从郊区迁移到城市中心的城市化将是2015年房地产业的最大发展趋势。所以2015年房地产发展将会见证向市中心转移，故选B。',
          },
          {
            id: 'q1-2',
            type: 'reading',
            text: 'What characterizes "24-hour cities" like New York?',
            textCN: '像纽约这样的“24小时城市”有什么特点?',
            options: [
              {
                id: 'q1-2-A',
                text: 'People can live without private cars.',
                textCN: '人们可以不用私家车生活。',
              },
              {
                id: 'q1-2-B',
                text: 'People are generally more competitive.',
                textCN: '人们通常更有竞争力。',
              },
              {
                id: 'q1-2-C',
                text: 'People can enjoy services around the clock.',
                textCN: '人们可以全天候享受服务。',
              },
              {
                id: 'q1-2-D',
                text: 'People are in harmony with the environment.',
                textCN: '人们与环境和谐相处。',
              },
            ],
            correctOptionId: 'q1-2-A',
            explanation:
              '根据题干中的New York可以定位到第二段，The report says America’s urbanization will continue to be the most significant issue affecting the industry, as cities across the country imitate the walkability and transit-oriented development making cities like New York and San Francisco so successful. 意为，报告说，美国的城市化将会继续成为影响这个行业的最重要的因素，因为全国的城市都在模仿像纽约和旧金山这样成功的城市的可步行性和公共交通导向的发展。可知，“24小时城市”的特点是可步行和公共交通导向，也就意味着人们可以不用私家车生活，故选A。',
          },
          {
            id: 'q1-3',
            type: 'reading',
            text: 'Why are Millennials reluctant to buy a house?',
            textCN: '为什么千禧一代不愿意买房子?',
            options: [
              {
                id: 'q1-3-A',
                text: 'They can only afford small apartments.',
                textCN: '他们只能买得起小公寓。',
              },
              {
                id: 'q1-3-B',
                text: 'The house prices are currently too high.',
                textCN: '目前房价太高。',
              },
              {
                id: 'q1-3-C',
                text: "Their parents' bad experience still haunts them.",
                textCN: '他们父母的糟糕经历仍然困扰着他们。',
              },
              {
                id: 'q1-3-D',
                text: 'They feel attached to the suburban environment.',
                textCN: '他们留恋郊区环境。',
              },
            ],
            correctOptionId: 'q1-3-C',
            explanation:
              '根据题干内容定位到第四段第二句，Apartments will retain their appeal for a while for Millennials, haunted by what happened to home-owning parents. 意为，受父母买房经历的影响，公寓在一段时间内将保持对千禧一代的吸引力。所以千禧一代不愿意买房是因为他们父母的糟糕经历仍然困扰着他们，故选C。',
          },
          {
            id: 'q1-4',
            type: 'reading',
            text: 'What might hinder real estate development in the U. S.?',
            textCN: '什么会阻碍美国房地产的发展?',
            options: [
              {
                id: 'q1-4-A',
                text: 'The continuing economic recession in the country.',
                textCN: '该国持续的经济衰退。',
              },
              {
                id: 'q1-4-B',
                text: 'The lack of confidence on the part of investors.',
                textCN: '投资者缺乏信心。',
              },
              {
                id: 'q1-4-C',
                text: 'The fierce global competition.',
                textCN: '激烈的全球竞争。',
              },
              {
                id: 'q1-4-D',
                text: 'The worsening infrastructure.',
                textCN: '不断恶化的基础设施。',
              },
            ],
            correctOptionId: 'q1-4-D',
            explanation:
              '根据题干内容可以定位到第七段，The report’s writers state that America’s failure to invest in infrastructure impacts not only the health of the real-estate market, but also our ability to remain globally competitive. 意为，该报告的作者指出，美国在基础设施投资上的失败不仅影响了房地产市场的健康发展，还影响了我们保持全球竞争力的能力。所以不断恶化的基础设施会阻碍美国房地产的发展，故选D。',
          },
          {
            id: 'q1-5',
            type: 'reading',
            text: 'How do most of the respondents in the survey feel about the U. S. real-estate market in 2015?',
            textCN: '大多数受访者对2015年美国房地产市场的看法如何?',
            options: [
              { id: 'q1-5-A', text: 'Pessimistic.', textCN: '悲观。' },
              { id: 'q1-5-B', text: 'Hopeful.', textCN: '充满希望。' },
              { id: 'q1-5-C', text: 'Cautious.', textCN: '谨慎。' },
              { id: 'q1-5-D', text: 'Uncertain.', textCN: '不确定。' },
            ],
            correctOptionId: 'q1-5-B',
            explanation:
              '根据题干内容可以定位到最后一段第二句，Seventy-four percent of the respondents surveyed report a “good to excellent” expectation of real-estate profitability in 2015. 意为，在接受调查的受访者中，有74%的人对2015年的房地产盈利预期“很好”。所以大多数受访者对2015年美国房地产市场充满希望，故选B。',
          },
        ],
      },
      {
        id: 'chapter1-reading1',
        title: '阅读理解 1',
        description: '关于电子书使读者不再孤立的阅读理解',
        type: 'reading',
        article: {
          id: 'article1',
          title: 'E-books Make Readers Less Isolated',
          titleCN: '电子书使读者不再孤立',
          content: `Volumes have been written about technology's ability to connect people. But burying one's nose in a book has always been somewhat isolating—with its unspoken assertion that the reader does not want to be disturbed. So what about a device that occupies the evolving intersection (交集) between? "Strangers constantly ask about it," Michael Hughes, a communications associate at Johns Hopkins Bloomberg School of Public Health in Baltimore, said of his iPad, which he uses to read a mix of novels and nonfiction. "It's almost like having a new baby." An iPad owner for four months, Mr. Hughes said people were much more likely to approach him now than when he toted (携带) a book. "People approach me and ask to see it, to touch it, how much I like it," he said. "That rarely happens with dead-tree books."
      With the price of e-readers coming down, sales of the small devices are rising. Last month, Amazon reported that so far this year, Kindle sales had tripled over last year's, when Amazon cut Kindle's price in June to $189 from $259, over the next month Amazon sold 180 e-books for every 100 hardcovers. Social manners surrounding the act of reading alone in public may be changing along with increased popularity. Suddenly, the lone, unapproachable reader at the corner table seems less alone. Given that some e-readers can display books while connecting online, there's a chance the former bookworm is already plugged into a conversation somewhere, said Paul Levinson, professor of Communication and Media Studies at Fordham University.
      "I think, historically, there has been a stigma (耻辱) attached to the bookworm, and that actually came from the not-untrue notion that, if you were reading, you weren't socializing with other people," Dr. Levinson said. "But the e-reader changes that also because e-readers are connected to bigger systems." For many, e-readers are today's must-have accessory, eating into old notions of what being bookish might have meant. "Buying literature has become cool again," he said.`,
          contentCN: `关于科技连接人们的能力，已经有很多著作论述。但埋头读书在某种程度上总是有些孤立——因为它不言而喻地表明读者不想被打扰。那么，一种占据了两者之间不断演变的交集的设备呢？巴尔的摩约翰霍普金斯大学彭博公共卫生学院的传播学助理迈克尔·休斯谈到他用来阅读小说和非虚构作品的iPad时说：“陌生人经常问起它。”“这几乎就像有了一个新生儿。”休斯先生拥有iPad四个月了，他说现在人们比他带着书的时候更愿意接近他。“人们走近我，要求看看它，摸摸它，问我有多喜欢它，”他说。“这种情况很少发生在纸质书上。”
      随着电子阅读器价格的下降，这种小设备的销量在上升。上个月，亚马逊报告称，今年到目前为止，Kindle的销量比去年增长了两倍，去年6月亚马逊将Kindle的价格从259美元降至189美元，在接下来的一个月里，亚马逊每卖出100本精装书就能卖出180本电子书。随着电子阅读器越来越受欢迎，围绕在公共场合独自阅读的社交礼仪可能也在发生变化。突然之间，角落里那个孤独、难以接近的读者似乎不再那么孤独了。福特汉姆大学传播学和媒体研究教授保罗·莱文森说，鉴于一些电子阅读器可以在联网的同时显示书籍，以前的书虫有可能已经在某个地方参与到一场对话中了。
      “我认为，从历史上看，书虫一直有一种耻辱感，这实际上源于一个并非不正确的观念，即如果你在读书，你就没有和其他人社交，”莱文森博士说。“但电子阅读器也改变了这一点，因为电子阅读器与更大的系统相连。”对许多人来说，电子阅读器是当今必备的配件，它正在侵蚀关于书呆子的旧观念。“购买文学作品又变得很酷了，”他说。`,
        },
        questions: [
          {
            id: 'q1-1',
            type: 'reading',
            text: 'Why does the author say that readers are somewhat isolated?',
            textCN: '为什么作者说读者在某种程度上是孤立的？',
            options: [
              {
                id: 'q1-1-A',
                text: "Because they imply that they don't want to be disturbed.",
                textCN: '因为他们暗示他们不想被打扰。',
              },
              {
                id: 'q1-1-B',
                text: 'Because they like to bury their faces in the books.',
                textCN: '因为他们喜欢埋头读书。',
              },
              {
                id: 'q1-1-C',
                text: 'Because they are lonely people in nature.',
                textCN: '因为他们本质上是孤独的人。',
              },
              {
                id: 'q1-1-D',
                text: 'Because they make contact with others.',
                textCN: '因为他们与他人接触。',
              },
            ],
            correctOptionId: 'q1-1-A',
            explanation:
              "文章提到But burying one's nose in a book has always been somewhat isolating—with its unspoken assertion that the reader does not want to be disturbed，说明读者孤立是因为读书暗示不想被打扰。",
          },
          {
            id: 'q1-2',
            type: 'reading',
            text: "What can we conclude from Michael Hughes' words?",
            textCN: '从迈克尔·休斯的话中我们可以得出什么结论？',
            options: [
              {
                id: 'q1-2-A',
                text: 'People are curious about him.',
                textCN: '人们对他好奇。',
              },
              {
                id: 'q1-2-B',
                text: 'He has just had a new baby.',
                textCN: '他刚有了一个新生儿。',
              },
              {
                id: 'q1-2-C',
                text: 'He never uses his iPad to read.',
                textCN: '他从不使用iPad阅读。',
              },
              {
                id: 'q1-2-D',
                text: 'People come to him to ask about his iPad.',
                textCN: '人们来找他询问他的iPad。',
              },
            ],
            correctOptionId: 'q1-2-D',
            explanation:
              '文中提到Strangers constantly ask about it以及People approach me and ask to see it等，说明人们来找他询问iPad。',
          },
          {
            id: 'q1-3',
            type: 'reading',
            text: 'What is new in the e-readers compared with the former bookworms?',
            textCN: '与以前的书虫相比，电子阅读器有什么新特点？',
            options: [
              {
                id: 'q1-3-A',
                text: 'They can read alone in public.',
                textCN: '他们可以在公共场合独自阅读。',
              },
              {
                id: 'q1-3-B',
                text: 'They are the lonely, unapproachable readers.',
                textCN: '他们是孤独、难以接近的读者。',
              },
              {
                id: 'q1-3-C',
                text: 'They can launch a conversation while reading.',
                textCN: '他们可以在阅读时发起对话。',
              },
              {
                id: 'q1-3-D',
                text: 'They like talking while reading.',
                textCN: '他们喜欢边读边聊。',
              },
            ],
            correctOptionId: 'q1-3-C',
            explanation:
              "文中提到Given that some e-readers can display books while connecting online, there's a chance the former bookworm is already plugged into a conversation somewhere，说明电子阅读器能在阅读时发起对话。",
          },
          {
            id: 'q1-4',
            type: 'reading',
            text: "What is the author's attitude toward e-books?",
            textCN: '作者对电子书的态度是什么？',
            options: [
              { id: 'q1-4-A', text: 'Positive.', textCN: '积极的。' },
              { id: 'q1-4-B', text: 'Negative.', textCN: '消极的。' },
              { id: 'q1-4-C', text: 'Indifferent.', textCN: '漠不关心的。' },
              { id: 'q1-4-D', text: 'Biased.', textCN: '有偏见的。' },
            ],
            correctOptionId: 'q1-4-A',
            explanation:
              '文章提到电子阅读器销量上升，改变了读书孤立的情况等，说明作者态度是积极的。',
          },
          {
            id: 'q1-5',
            type: 'reading',
            text: 'What is the main idea of the passage?',
            textCN: '这篇文章的主要观点是什么？',
            options: [
              {
                id: 'q1-5-A',
                text: 'E-books are reviving again.',
                textCN: '电子书正在再次复兴。',
              },
              {
                id: 'q1-5-B',
                text: 'E-books become less expensive.',
                textCN: '电子书变得更便宜。',
              },
              {
                id: 'q1-5-C',
                text: 'Readers are not alone anymore.',
                textCN: '读者不再孤单。',
              },
              {
                id: 'q1-5-D',
                text: 'E-books make readers less isolated.',
                textCN: '电子书使读者不再那么孤立。',
              },
            ],
            correctOptionId: 'q1-5-D',
            explanation:
              '文章围绕电子书让读者不再孤立展开，如人们因电子书接近读者，电子阅读器改变读书孤立的状况等。',
          },
        ],
      },
      {
        id: 'chapter5-cloze1',
        title: '完形填空 5',
        description: '关于尝试中医治疗咳嗽的完形填空',
        type: 'cloze',
        questions: [
          {
            id: 'c5-1',
            type: 'cloze',
            text: "No matter how many different (75)_____ I tried, I still couldn't get rid of the cough.",
            textCN: '无论尝试多少种不同的(75)_____，我始终无法摆脱咳嗽。',
            options: [
              { id: 'c5-1-A', text: 'remedies', textCN: '疗法' },
              { id: 'c5-1-B', text: 'doctors', textCN: '医生' },
              { id: 'c5-1-C', text: 'foods', textCN: '食物' },
              { id: 'c5-1-D', text: 'books', textCN: '书籍' },
            ],
            correctOptionId: 'c5-1-A',
            explanation:
              '“remedies”意为“疗法”，与“tried”搭配，指尝试各种治疗咳嗽的方法，符合语境。',
          },
          {
            id: 'c5-2',
            type: 'cloze',
            text: 'Not only did it (76)_____ my teaching but also my life as a whole.',
            textCN: '它不仅(76)_____我的教学，还影响了我的整个生活。',
            options: [
              { id: 'c5-2-A', text: 'inconvenience', textCN: '妨碍' },
              { id: 'c5-2-B', text: 'improve', textCN: '改善' },
              { id: 'c5-2-C', text: 'start', textCN: '开始' },
              { id: 'c5-2-D', text: 'end', textCN: '结束' },
            ],
            correctOptionId: 'c5-2-A',
            explanation:
              '“inconvenience”意为“妨碍”，与“咳嗽影响生活”的逻辑一致，表明咳嗽对教学和生活造成不便。',
          },
          {
            id: 'c5-3',
            type: 'cloze',
            text: 'a student came up to me and (77)_____ traditional Chinese medicine.',
            textCN: '一个学生走近我并(77)_____中医。',
            options: [
              { id: 'c5-3-A', text: 'recommended', textCN: '推荐' },
              { id: 'c5-3-B', text: 'criticized', textCN: '批评' },
              { id: 'c5-3-C', text: 'sold', textCN: '售卖' },
              { id: 'c5-3-D', text: 'ignored', textCN: '忽视' },
            ],
            correctOptionId: 'c5-3-A',
            explanation:
              '“recommended”意为“推荐”，指学生建议作者尝试中医，与后文“决定尝试”形成连贯逻辑。',
          },
          {
            id: 'c5-4',
            type: 'cloze',
            text: 'I was (78)_____ because I knew so little about it.',
            textCN: '我很(78)_____，因为我对其知之甚少。',
            options: [
              { id: 'c5-4-A', text: 'hesitant', textCN: '犹豫的' },
              { id: 'c5-4-B', text: 'excited', textCN: '兴奋的' },
              { id: 'c5-4-C', text: 'confident', textCN: '自信的' },
              { id: 'c5-4-D', text: 'angry', textCN: '愤怒的' },
            ],
            correctOptionId: 'c5-4-A',
            explanation:
              '“hesitant”意为“犹豫的”，与“对中医了解少且从未尝试过”的描述呼应，体现作者的迟疑态度。',
          },
          {
            id: 'c5-5',
            type: 'cloze',
            text: "my cough got so much (79)_____ that I couldn't sleep at night.",
            textCN: '我的咳嗽变得如此(79)_____，以至于晚上无法入睡。',
            options: [
              { id: 'c5-5-A', text: 'worse', textCN: '更严重的' },
              { id: 'c5-5-B', text: 'better', textCN: '更好的' },
              { id: 'c5-5-C', text: 'quieter', textCN: '更安静的' },
              { id: 'c5-5-D', text: 'faster', textCN: '更快的' },
            ],
            correctOptionId: 'c5-5-A',
            explanation:
              '“worse”意为“更严重的”，与“无法入睡”的结果对应，说明咳嗽加剧促使作者尝试中医。',
          },
          {
            id: 'c5-6',
            type: 'cloze',
            text: 'both of which were new (80)_____ to me.',
            textCN: '两者对我而言都是新的(80)_____。',
            options: [
              { id: 'c5-6-A', text: 'experiences', textCN: '经历' },
              { id: 'c5-6-B', text: 'problems', textCN: '问题' },
              { id: 'c5-6-C', text: 'hobbies', textCN: '爱好' },
              { id: 'c5-6-D', text: 'goals', textCN: '目标' },
            ],
            correctOptionId: 'c5-6-A',
            explanation:
              '“experiences”意为“经历”，指中医的“把脉”和“看舌苔”是作者在西医中未接触过的新体验。',
          },
          {
            id: 'c5-7',
            type: 'cloze',
            text: 'I was a little (81)_____ at first because he used a tool to scrape my skin.',
            textCN: '起初我有点(81)_____，因为他用工具刮我的皮肤。',
            options: [
              { id: 'c5-7-A', text: 'scared', textCN: '害怕的' },
              { id: 'c5-7-B', text: 'happy', textCN: '快乐的' },
              { id: 'c5-7-C', text: 'bored', textCN: '无聊的' },
              { id: 'c5-7-D', text: 'hungry', textCN: '饥饿的' },
            ],
            correctOptionId: 'c5-7-A',
            explanation:
              '“scared”意为“害怕的”，与“用工具刮皮肤”的行为对应，体现初次体验刮痧时的紧张情绪。',
          },
          {
            id: 'c5-8',
            type: 'cloze',
            text: 'the (82)_____ strokes started to produce a relieving effect.',
            textCN: '(82)_____的刮拭开始产生缓解效果。',
            options: [
              { id: 'c5-8-A', text: 'pressured', textCN: '有压力的' },
              { id: 'c5-8-B', text: 'gentle', textCN: '温柔的' },
              { id: 'c5-8-C', text: 'quick', textCN: '快速的' },
              { id: 'c5-8-D', text: 'slow', textCN: '缓慢的' },
            ],
            correctOptionId: 'c5-8-A',
            explanation:
              '“pressured”意为“有压力的”，指刮痧时带有压力的手法，与“产生缓解效果”的结果逻辑一致。',
          },
          {
            id: 'c5-9',
            type: 'cloze',
            text: 'my body and mind began to (83)_____ deeper into relaxation.',
            textCN: '我的身心开始(83)_____更深的放松状态。',
            options: [
              { id: 'c5-9-A', text: 'sink', textCN: '陷入' },
              { id: 'c5-9-B', text: 'rise', textCN: '上升' },
              { id: 'c5-9-C', text: 'jump', textCN: '跳跃' },
              { id: 'c5-9-D', text: 'run', textCN: '奔跑' },
            ],
            correctOptionId: 'c5-9-A',
            explanation:
              '“sink”意为“陷入”，“sink into relaxation”表示“进入放松状态”，符合刮痧后身心舒缓的语境。',
          },
          {
            id: 'c5-10',
            type: 'cloze',
            text: 'my cough started to (84)_____.',
            textCN: '我的咳嗽开始(84)_____。',
            options: [
              { id: 'c5-10-A', text: 'lessen', textCN: '减轻' },
              { id: 'c5-10-B', text: 'worsen', textCN: '恶化' },
              { id: 'c5-10-C', text: 'return', textCN: '返回' },
              { id: 'c5-10-D', text: 'stop', textCN: '停止' },
            ],
            correctOptionId: 'c5-10-A',
            explanation:
              '“lessen”意为“减轻”，与“几周后完全消失”形成时间上的递进，表明咳嗽逐渐好转。',
          },
        ],
      },
      {
        id: 'chapter6-cloze1',
        title: '完形填空 6',
        description: '关于杀虫剂与环境污染的完形填空',
        type: 'cloze',
        questions: [
          {
            id: 'c6-1',
            type: 'cloze',
            text: 'We have seen that they now (85)_____ soil, water, and food.',
            textCN: '我们已经知道，它们如今(85)_____土壤、水和食物。',
            options: [
              { id: 'c6-1-A', text: 'pollute', textCN: '污染' },
              { id: 'c6-1-B', text: 'clean', textCN: '清洁' },
              { id: 'c6-1-C', text: 'fertilize', textCN: '施肥' },
              { id: 'c6-1-D', text: 'preserve', textCN: '保护' },
            ],
            correctOptionId: 'c6-1-A',
            explanation:
              '“pollute”意为“污染”，与后文“使溪流无鱼、花园林地无声无鸟”的环境破坏结果一致，体现杀虫剂对生态的危害。',
          },
          {
            id: 'c6-2',
            type: 'cloze',
            text: 'make our gardens and woodlands (86)_____ and birdless.',
            textCN: '使我们的花园和林地(86)_____且无鸟。',
            options: [
              { id: 'c6-2-A', text: 'silent', textCN: '寂静的' },
              { id: 'c6-2-B', text: 'lively', textCN: '生机勃勃的' },
              { id: 'c6-2-C', text: 'noisy', textCN: '嘈杂的' },
              { id: 'c6-2-D', text: 'colorful', textCN: '多彩的' },
            ],
            correctOptionId: 'c6-2-A',
            explanation:
              '“silent”意为“寂静的”，与“birdless”（无鸟的）并列，描述杀虫剂导致的生物灭绝现象，突显环境死寂。',
          },
          {
            id: 'c6-3',
            type: 'cloze',
            text: 'Can he escape a pollution that is now so thoroughly (87)_____ throughout our world?',
            textCN: '他能否逃脱如今在世界范围内如此彻底(87)_____的污染？',
            options: [
              { id: 'c6-3-A', text: 'distributed', textCN: '分布' },
              { id: 'c6-3-B', text: 'collected', textCN: '收集' },
              { id: 'c6-3-C', text: 'hidden', textCN: '隐藏' },
              { id: 'c6-3-D', text: 'created', textCN: '创造' },
            ],
            correctOptionId: 'c6-3-A',
            explanation:
              '“distributed”意为“分布”，强调污染在全球范围的广泛性，说明人类无法逃避，呼应前文“彻底污染”的表述。',
          },
          {
            id: 'c6-4',
            type: 'cloze',
            text: 'We know that even single (88)_____ to these chemicals can cause severe poisoning.',
            textCN:
              '我们知道，即使单次(88)_____这些化学物质，若剂量足够大，也会导致严重中毒。',
            options: [
              { id: 'c6-4-A', text: 'exposure', textCN: '接触' },
              { id: 'c6-4-B', text: 'avoidance', textCN: '避免' },
              { id: 'c6-4-C', text: 'love', textCN: '热爱' },
              { id: 'c6-4-D', text: 'study', textCN: '研究' },
            ],
            correctOptionId: 'c6-4-A',
            explanation:
              '“exposure”意为“接触”，“exposure to chemicals”为固定搭配，指人体接触杀虫剂，符合“剂量足够大导致中毒”的逻辑。',
          },
          {
            id: 'c6-5',
            type: 'cloze',
            text: 'others exposed to (89)_____ quantities of pesticides.',
            textCN: '其他接触(89)_____剂量杀虫剂的人。',
            options: [
              { id: 'c6-5-A', text: 'sufficient', textCN: '足够的' },
              { id: 'c6-5-B', text: 'small', textCN: '小的' },
              { id: 'c6-5-C', text: 'limited', textCN: '有限的' },
              { id: 'c6-5-D', text: 'harmless', textCN: '无害的' },
            ],
            correctOptionId: 'c6-5-A',
            explanation:
              '“sufficient”意为“足够的”，与前文“剂量足够大导致中毒”呼应，说明接触足够剂量杀虫剂会造成急性伤害。',
          },
          {
            id: 'c6-6',
            type: 'cloze',
            text: 'pesticides that (90)_____ pollute our world.',
            textCN: '杀虫剂(90)_____污染我们的世界。',
            options: [
              { id: 'c6-6-A', text: 'invisibly', textCN: '无形地' },
              { id: 'c6-6-B', text: 'obviously', textCN: '明显地' },
              { id: 'c6-6-C', text: 'quickly', textCN: '快速地' },
              { id: 'c6-6-D', text: 'slowly', textCN: '缓慢地' },
            ],
            correctOptionId: 'c6-6-A',
            explanation:
              '“invisibly”意为“无形地”，与“延迟效应”和“少量吸收”的语境一致，说明杀虫剂对环境的污染是潜移默化的。',
          },
          {
            id: 'c6-7',
            type: 'cloze',
            text: 'the biological effects of (91)_____ are cumulative over long periods.',
            textCN: '（91）_____的生物效应会长期累积。',
            options: [
              { id: 'c6-7-A', text: 'chemicals', textCN: '化学物质' },
              { id: 'c6-7-B', text: 'plants', textCN: '植物' },
              { id: 'c6-7-C', text: 'animals', textCN: '动物' },
              { id: 'c6-7-D', text: 'humans', textCN: '人类' },
            ],
            correctOptionId: 'c6-7-A',
            explanation:
              '“chemicals”意为“化学物质”，此处特指前文讨论的杀虫剂，说明其生物效应具有累积性，符合公共卫生官员的观点。',
          },
          {
            id: 'c6-8',
            type: 'cloze',
            text: 'For these very reasons the danger is easily (92)_____.',
            textCN: '正因如此，危险很容易被(92)_____。',
            options: [
              { id: 'c6-8-A', text: 'ignored', textCN: '忽视' },
              { id: 'c6-8-B', text: 'noticed', textCN: '注意到' },
              { id: 'c6-8-C', text: 'emphasized', textCN: '强调' },
              { id: 'c6-8-D', text: 'understood', textCN: '理解' },
            ],
            correctOptionId: 'c6-8-A',
            explanation:
              '“ignored”意为“忽视”，与“人类天性忽视未来灾难”的表述一致，说明累积性污染因缺乏明显症状而被轻视。',
          },
          {
            id: 'c6-9',
            type: 'cloze',
            text: 'shake off what may seem to us a (93)_____ of future disaster.',
            textCN: '摆脱在我们看来可能是未来灾难的(93)_____。',
            options: [
              { id: 'c6-9-A', text: 'threat', textCN: '威胁' },
              { id: 'c6-9-B', text: 'gift', textCN: '礼物' },
              { id: 'c6-9-C', text: 'solution', textCN: '解决方案' },
              { id: 'c6-9-D', text: 'chance', textCN: '机会' },
            ],
            correctOptionId: 'c6-9-A',
            explanation:
              '“threat”意为“威胁”，“threat of disaster”表示“灾难的威胁”，符合“人类逃避未来潜在危险”的心理描述。',
          },
          {
            id: 'c6-10',
            type: 'cloze',
            text: 'yet some of their worst enemies slowly approach them (94)_____.',
            textCN: '然而，一些最危险的敌人正缓慢地(94)_____靠近他们。',
            options: [
              { id: 'c6-10-A', text: 'unnoticed', textCN: '未被注意到' },
              { id: 'c6-10-B', text: 'welcomed', textCN: '受欢迎地' },
              { id: 'c6-10-C', text: 'feared', textCN: '害怕地' },
              { id: 'c6-10-D', text: 'loved', textCN: '喜爱地' },
            ],
            correctOptionId: 'c6-10-A',
            explanation:
              '“unnoticed”意为“未被注意到”，与“缓慢靠近”和“隐形污染”的主题呼应，强调杀虫剂危害的隐蔽性。',
          },
        ],
      },
      {
        id: 'chapter7-cloze1',
        title: '完形填空 7',
        description: '关于手机铃音的完形填空',
        type: 'cloze',
        questions: [
          {
            id: 'c7-1',
            type: 'cloze',
            text: "ringtones can be (95)_____ to suit the owner's personal taste.",
            textCN: '手机铃音可以(95)_____以适应主人的个人喜好。',
            options: [
              { id: 'c7-1-A', text: 'personalized', textCN: '个性化' },
              { id: 'c7-1-B', text: 'ignored', textCN: '忽视' },
              { id: 'c7-1-C', text: 'rejected', textCN: '拒绝' },
              { id: 'c7-1-D', text: 'forgotten', textCN: '忘记' },
            ],
            correctOptionId: 'c7-1-A',
            explanation:
              '“personalized”意为“个性化”，与“适应个人喜好”的语境一致，体现手机铃音可根据用户需求定制的特点。',
          },
          {
            id: 'c7-2',
            type: 'cloze',
            text: 'There are (96)_____ two different types of ringtones.',
            textCN: '(96)_____有两种不同类型的手机铃音。',
            options: [
              { id: 'c7-2-A', text: 'typically', textCN: '通常' },
              { id: 'c7-2-B', text: 'rarely', textCN: '很少' },
              { id: 'c7-2-C', text: 'hardly', textCN: '几乎不' },
              { id: 'c7-2-D', text: 'never', textCN: '从未' },
            ],
            correctOptionId: 'c7-2-A',
            explanation:
              '“typically”意为“通常”，说明“两种类型”是常见的分类方式，符合下文对单音和复音铃音的介绍。',
          },
          {
            id: 'c7-3',
            type: 'cloze',
            text: 'It is likely that future cellphones will be (97)_____ of producing musical ringtones of CD quality.',
            textCN: '未来的手机很可能(97)_____产生CD音质的音乐铃音。',
            options: [
              { id: 'c7-3-A', text: 'capable', textCN: '能够' },
              { id: 'c7-3-B', text: 'short', textCN: '短缺' },
              { id: 'c7-3-C', text: 'full', textCN: '充满' },
              { id: 'c7-3-D', text: 'proud', textCN: '骄傲' },
            ],
            correctOptionId: 'c7-3-A',
            explanation:
              '“capable”意为“能够”，“be capable of”为固定搭配，指手机具备产生高质量铃音的能力，符合对未来技术的展望。',
          },
          {
            id: 'c7-4',
            type: 'cloze',
            text: 'offer ringtones, pictures or even games to (98)_____ onto your cellphone.',
            textCN: '提供铃音、图片甚至游戏(98)_____到你的手机上。',
            options: [
              { id: 'c7-4-A', text: 'download', textCN: '下载' },
              { id: 'c7-4-B', text: 'upload', textCN: '上传' },
              { id: 'c7-4-C', text: 'delete', textCN: '删除' },
              { id: 'c7-4-D', text: 'save', textCN: '保存' },
            ],
            correctOptionId: 'c7-4-A',
            explanation:
              '“download”意为“下载”，指从网站将内容传输到手机，与“onto your cellphone”的方向一致，符合用户获取铃音的常见操作。',
          },
          {
            id: 'c7-5',
            type: 'cloze',
            text: 'some allow you to (99)_____ specific ringtones.',
            textCN: '一些网站允许你(99)_____特定的铃音。',
            options: [
              { id: 'c7-5-A', text: 'purchase', textCN: '购买' },
              { id: 'c7-5-B', text: 'steal', textCN: '偷窃' },
              { id: 'c7-5-C', text: 'borrow', textCN: '借用' },
              { id: 'c7-5-D', text: 'find', textCN: '找到' },
            ],
            correctOptionId: 'c7-5-A',
            explanation:
              '“purchase”意为“购买”，与“subscriptions”（订阅）形成对比，说明不同网站的收费模式，符合商业逻辑。',
          },
          {
            id: 'c7-6',
            type: 'cloze',
            text: 'When you (100)_____ a ringtone, make sure that it will work with your cellular model phone.',
            textCN: '当你(100)_____一个铃音时，确保它适用于你的手机型号。',
            options: [
              { id: 'c7-6-A', text: 'locate', textCN: '找到' },
              { id: 'c7-6-B', text: 'lose', textCN: '丢失' },
              { id: 'c7-6-C', text: 'change', textCN: '改变' },
              { id: 'c7-6-D', text: 'sell', textCN: '售卖' },
            ],
            correctOptionId: 'c7-6-A',
            explanation:
              '“locate”意为“找到”，指用户在网站上找到心仪的铃音后，需确认兼容性，符合下载前的操作流程。',
          },
          {
            id: 'c7-7',
            type: 'cloze',
            text: 'be sure that the website has the (101)_____ to distribute the ringtone.',
            textCN: '确保网站有(101)_____分发该铃音。',
            options: [
              { id: 'c7-7-A', text: 'permission', textCN: '许可' },
              { id: 'c7-7-B', text: 'ability', textCN: '能力' },
              { id: 'c7-7-C', text: 'money', textCN: '金钱' },
              { id: 'c7-7-D', text: 'time', textCN: '时间' },
            ],
            correctOptionId: 'c7-7-A',
            explanation:
              '“permission”意为“许可”，与“copyright”（版权）呼应，强调网站需获得艺术家授权才能合法分发铃音，符合知识产权保护的主题。',
          },
          {
            id: 'c7-8',
            type: 'cloze',
            text: 'And (102)_____, consumers will wish to compose personalized ringtones.',
            textCN: '并且(102)_____，消费者希望创作个性化铃音。',
            options: [
              { id: 'c7-8-A', text: 'frequently', textCN: '经常' },
              { id: 'c7-8-B', text: 'seldom', textCN: '很少' },
              { id: 'c7-8-C', text: 'never', textCN: '从未' },
              { id: 'c7-8-D', text: 'hardly', textCN: '几乎不' },
            ],
            correctOptionId: 'c7-8-A',
            explanation:
              '“frequently”意为“经常”，表明用户自主创作铃音是常见需求，与后文“偶尔可通过按键编程”形成频率上的补充说明。',
          },
          {
            id: 'c7-9',
            type: 'cloze',
            text: 'Software is also (103)_____ that allows consumers to create their own ringtones.',
            textCN: '也有(103)_____软件允许消费者创建自己的铃音。',
            options: [
              { id: 'c7-9-A', text: 'available', textCN: '可用的' },
              { id: 'c7-9-B', text: 'expensive', textCN: '昂贵的' },
              { id: 'c7-9-C', text: 'difficult', textCN: '困难的' },
              { id: 'c7-9-D', text: 'useless', textCN: '无用的' },
            ],
            correctOptionId: 'c7-9-A',
            explanation:
              '“available”意为“可用的”，说明存在供用户创作铃音的软件，与“软件在电脑上运行”的描述连贯，体现技术可行性。',
          },
          {
            id: 'c7-10',
            type: 'cloze',
            text: 'it can be (104)_____ to the phone via a data cable.',
            textCN: '它可以通过数据线(104)_____到手机。',
            options: [
              { id: 'c7-10-A', text: 'transferred', textCN: '传输' },
              { id: 'c7-10-B', text: 'broken', textCN: '损坏' },
              { id: 'c7-10-C', text: 'stolen', textCN: '偷窃' },
              { id: 'c7-10-D', text: 'found', textCN: '找到' },
            ],
            correctOptionId: 'c7-10-A',
            explanation:
              '“transferred”意为“传输”，指通过数据线将电脑中制作好的铃音传到手机，符合数据传输的技术场景，与“via a data cable”搭配恰当。',
          },
        ],
      },
    ],
  },
  {
    id: 'chapter3',
    title: '第3套题',
    description: '包含阅读理解和完形填空',
    questionSets: [
      {
        id: 'chapter1-reading1',
        title: '阅读理解 1',
        description: '关于大学教育现状及改进建议的阅读理解',
        type: 'reading',
        article: {
          id: 'article1',
          title:
            'The Current Situation and Suggestions of University Education',
          titleCN: '大学教育的现状及建议',
          content: `Recently I attended several meetings where we talked about ways to retain students and keep younger faculty members from going elsewhere.
    　　It seems higher education has become an industry of meeting-holders whose task it is to "solve" problems—real or imagined. And in my position as a professor at three different colleges, the actual problems in educating our young people and older students have deepened, while the number of people hired—not to teach but to hold meetings—has increased significantly. Every new problem creates a new job for an administrative fixer. Take our Center for Teaching Excellence. Contrary to its title, the center Is a clearing house (信息交流中心) for using technology in classrooms and In online courses. It's an administrative sham (欺诈) of the kind that has multiplied over the last 30 years.
    　　I offer a simple proposition in response: Many of our problems—class attendance,  educational success, student happiness and well-being might be improved by cutting down the bureaucratic (官僚的) mechanisms and meetings and instead hiring an army of good teachers. If we replaced half of our administrative staff with classroom teachers, we might actually get a majority of our classes back to 20 or fewer students per teacher. This would be an environment in which teachers and students actually knew each other.
    　　The teachers must be free to teach in their own way—the curriculum should be flexible enough so that they can use their individual talents to achieve the goals of the course. Additionally, they should be allowed to teach, and be rewarded for doing it well. Teachers are not people who are great at and consumed by research and happen to appear in a classroom. Good teaching and research are not exclusive, but they are also not automatic companions. Teaching is an art and a craft, talent and practice; it is not something that just anyone can be good at. It is utterly confusing to me that people do not recognize this, despite the fact that pretty much anyone who has been a student cm tell the difference between their best and worst teachers.`,
          contentCN: `最近我参加了几次会议，讨论了如何留住学生以及防止年轻教师流失到其他地方。
    　　高等教育似乎已经变成了一个由会议组织者组成的行业，他们的任务是“解决”问题——无论是真实的还是想象中的。以我在三所不同大学担任教授的经历来看，在教育年轻学生和年长学生方面的实际问题日益严重，而被雇佣来——不是教学而是开会——的人数却大幅增加。每一个新问题都会为行政解决人员创造一份新工作。以我们的卓越教学中心为例。与它的名称相反，这个中心是一个在课堂和在线课程中使用技术的信息交流中心。这是一种在过去30年里不断增加的行政欺诈行为。
    　　作为回应，我提出一个简单的建议：我们的许多问题——课堂出勤率、教育成功率、学生的幸福和安康——可以通过减少官僚机制和会议，转而雇佣一大批优秀教师来得到改善。如果我们用课堂教师取代一半的行政人员，我们实际上可能会使大多数班级的学生人数回到每位教师20人或更少。这将是一个教师和学生真正相互了解的环境。
    　　教师必须能够自由地以自己的方式教学——课程应该足够灵活，以便他们能够利用自己的个人才能实现课程目标。此外，他们应该被允许教学，并因教学出色而得到奖励。教师不是那些擅长研究并沉迷于研究，只是碰巧出现在课堂上的人。好的教学和研究不是相互排斥的，但它们也不是必然相伴的。教学是一门艺术和手艺，需要天赋和实践；这不是任何人都能擅长的事情。让我完全困惑的是，人们没有认识到这一点，尽管几乎每个当过学生的人都能分辨出他们最好和最差的老师之间的区别。`,
        },
        questions: [
          {
            id: 'q1-1',
            type: 'reading',
            text: 'What does the author say about present-day universities?',
            textCN: '作者对当今大学有什么看法？',
            options: [
              {
                id: 'q1-1-A',
                text: 'They are effectively tackling real, or imagined problems.',
                textCN: '他们正在有效地解决真实的或想象中的问题。',
              },
              {
                id: 'q1-1-B',
                text: 'They often fail to combine teaching with research.',
                textCN: '他们经常未能将教学与研究结合起来。',
              },
              {
                id: 'q1-1-C',
                text: 'They are over-burdened with administrative staff.',
                textCN: '他们行政人员负担过重。',
              },
              {
                id: 'q1-1-D',
                text: 'They lack talent to fix their deepening problems.',
                textCN: '他们缺乏解决日益严重问题的人才。',
              },
            ],
            correctOptionId: 'q1-1-C',
            explanation:
              '文章第二段第二句提到And in my position as a professor at three different colleges, the actual problems in educating our young people and older students have deepened, while the number of people hired—not to teach but to hold meetings—has increased significantly. 意思是，在我担任教授的三所不同学校里，实际的教育问题随着行政人员雇用的数量增加而加深。由此推断，当今大学的行政人员过多，所以答案是C。',
          },
          {
            id: 'q1-2',
            type: 'reading',
            text: 'According to the author, what kind of people do universities lack most?',
            textCN: '根据作者的说法，大学最缺乏什么样的人？',
            options: [
              {
                id: 'q1-2-A',
                text: 'Good classroom teachers.',
                textCN: '优秀的课堂教师。',
              },
              {
                id: 'q1-2-B',
                text: 'Efficient administrators.',
                textCN: '高效的行政人员。',
              },
              {
                id: 'q1-2-C',
                text: 'Talented researchers.',
                textCN: '有才华的研究人员。',
              },
              {
                id: 'q1-2-D',
                text: 'Motivated students.',
                textCN: '有动力的学生。',
              },
            ],
            correctOptionId: 'q1-2-A',
            explanation:
              '文章第三段首句提到Many of our problems—class attendance, educational success, student happiness and well-being might be improved by cutting down the bureaucratic mechanisms and meetings and instead hiring an army of good teachers. 意思是，我们的很多问题都可以通过简化行政机制，雇用更多优秀教师来解决。所以答案是A。',
          },
          {
            id: 'q1-3',
            type: 'reading',
            text: 'What does the author imply about the classes at present?',
            textCN: '作者对目前的班级有什么暗示？',
            options: [
              {
                id: 'q1-3-A',
                text: "They facilitate students' independent learning.",
                textCN: '它们促进学生的自主学习。',
              },
              {
                id: 'q1-3-B',
                text: 'They help students form closer relationships.',
                textCN: '它们帮助学生建立更紧密的关系。',
              },
              {
                id: 'q1-3-C',
                text: 'They have more older students than before.',
                textCN: '它们比以前有更多的年长学生。',
              },
              {
                id: 'q1-3-D',
                text: 'They are much bigger than is desirable.',
                textCN: '它们的规模比理想的要大得多。',
              },
            ],
            correctOptionId: 'q1-3-D',
            explanation:
              '文章第三段第二句提到If we replaced half of our administrative staff with classroom teachers, we might actually get a majority of our classes back to 20 or fewer students per teacher. 意思是，如果我们用授课教师来替换一半的行政人员，我们或许真的能将大部分班级的学生人数降回到20名或更少。由此可知，作者暗示目前班级人数过多，所以答案是D，“人数远比理想的状态要多的多。”',
          },
          {
            id: 'q1-4',
            type: 'reading',
            text: 'What does the author think of teaching ability?',
            textCN: '作者对教学能力有什么看法？',
            options: [
              {
                id: 'q1-4-A',
                text: 'It requires talent and practice.',
                textCN: '它需要天赋和实践。',
              },
              {
                id: 'q1-4-B',
                text: 'It is closely related to research.',
                textCN: '它与研究密切相关。',
              },
              {
                id: 'q1-4-C',
                text: "It is a chief factor affecting students' learning.",
                textCN: '它是影响学生学习的主要因素。',
              },
              {
                id: 'q1-4-D',
                text: 'It can be acquired through persistent practice.',
                textCN: '它可以通过持续实践获得。',
              },
            ],
            correctOptionId: 'q1-4-A',
            explanation:
              '文章第四段倒数第二句提到，Teaching is an art and a craft, talent and practice; it is not something that just anyone can be good at. 意思是，教学是一门艺术和手艺，是天分和实践的集合；不是任何人都能做好的。所以答案是A，“需要天分和实践。”',
          },
          {
            id: 'q1-5',
            type: 'reading',
            text: "What is the author's suggestion for improving university teaching?",
            textCN: '作者对改进大学教学有什么建议？',
            options: [
              {
                id: 'q1-5-A',
                text: 'Creating an environment for teachers to share their teaching experiences.',
                textCN: '为教师创造一个分享教学经验的环境。',
              },
              {
                id: 'q1-5-B',
                text: 'Hiring more classroom teachers and allowing them to teach in their own way.',
                textCN: '雇佣更多的课堂教师，并允许他们以自己的方式教学。',
              },
              {
                id: 'q1-5-C',
                text: 'Using high technology in classrooms and promoting exchange of intonation.',
                textCN: '在课堂上使用高科技并促进语调交流。',
              },
              {
                id: 'q1-5-D',
                text: 'Cutting down meetings and encouraging administrative staff to go to classrooms.',
                textCN: '减少会议并鼓励行政人员去教室。',
              },
            ],
            correctOptionId: 'q1-5-B',
            explanation:
              '文章第三段提到许多问题可以通过聘请更多授课教师来解决，第四段指出了教师应该有自由选择自己的授课风格。综合推断，因此答案是B，”应该聘用更多教师，并允许他们有自己的教学风格。',
          },
        ],
      },
      {
        id: 'chapter1-reading1',
        title: '阅读理解 1',
        description: '关于传统杂货店与现代超市经理职责变化的阅读理解',
        type: 'reading',
        article: {
          id: 'article1',
          title: 'The Changing Role of the Shop Manager',
          titleCN: '商店经理角色的转变',
          content: `The old fashioned general store is fast disappearing. This is, perhaps, a pity, because shopping today seems to lack that personal element which existed when the shopkeeper knew all his regular customers personally. He could, for instance, remember which brand of tea Mrs. Smith usually bought or what sort of washing powder Mrs. Jones preferred. Not only was the shop a center of buying and selling, but a social meeting place.
    A prosperous general store might have employed four or five assistants, and so there were very few problems in management as far as the staff was concerned. But now that the supermarket has replaced the general store, the job of the manager has changed completely. The modern supermarket manager has to cope with a staff of as many as a hundred, apart from all the other everyday problems of running a large business.
    Every morning the manager must, like the commander of an army division, carry out an inspection of his store to make sure that everything is ready for the business of the day. He must see that everything is running smoothly. He will have to give advice and make decisions as problems arise; and he must know how to get his huge staff to work efficiently with their respective responsibilities. No matter what he has to do throughout the day, however, the supermarket manager must be ready for any emergency that may arise. They say in the trade that you are not really an experienced supermarket manager until you have dealt with a flood, a fire, a birth and a death in your store.`,
          contentCN: `传统杂货店正在迅速消失。这或许是一种遗憾，因为如今的购物似乎缺少了一种个人元素，而这种元素在店主认识所有老顾客时是存在的。例如，他能记得史密斯夫人通常买哪种品牌的茶，或者琼斯夫人更喜欢哪种洗衣粉。商店不仅是买卖的中心，也是一个社交场所。
    一家繁荣的杂货店可能雇佣了四五名店员，所以就员工而言，管理上几乎没有什么问题。但现在超市取代了杂货店，经理的工作发生了彻底的变化。现代超市经理除了要处理经营大企业的所有日常问题外，还要应对多达一百名员工。
    每天早上，经理必须像一个师的指挥官一样，对他的商店进行检查，以确保一切都为当天的营业做好准备。他必须确保一切顺利进行。当问题出现时，他必须提供建议并做出决策；他必须知道如何让他庞大的员工高效地履行各自的职责。然而，无论他一整天要做什么，超市经理都必须为可能出现的任何紧急情况做好准备。业内人士说，直到你在店里处理过洪水、火灾、出生和死亡事件，你才算是一个真正有经验的超市经理。`,
        },
        questions: [
          {
            id: 'q1-1',
            type: 'reading',
            text: 'The main purpose of the passage is to show _______.',
            textCN: '这篇文章的主要目的是展示_______。',
            options: [
              {
                id: 'q1-1-A',
                text: 'how the supermarket has replaced the old general store',
                textCN: '超市是如何取代传统杂货店的',
              },
              {
                id: 'q1-1-B',
                text: 'how the old fashioned general store is fast disappearing',
                textCN: '传统杂货店是如何迅速消失的',
              },
              {
                id: 'q1-1-C',
                text: 'how supermarket managers deal with problems every morning',
                textCN: '超市经理每天早上如何处理问题',
              },
              {
                id: 'q1-1-D',
                text: 'how the role of the shop manager has undergone an overall change',
                textCN: '商店经理的角色是如何发生全面变化的',
              },
            ],
            correctOptionId: 'q1-1-D',
            explanation:
              '文章主要讲述了杂货店经理到超市经理角色的巨大转变，D选项符合文意。',
          },
          {
            id: 'q1-2',
            type: 'reading',
            text: 'It is a pity that there are fewer old general stores now because _______.',
            textCN: '现在传统杂货店越来越少很遗憾，因为_______。',
            options: [
              {
                id: 'q1-2-A',
                text: 'there is less trading business',
                textCN: '交易业务减少了',
              },
              {
                id: 'q1-2-B',
                text: 'there used to be more social activities in the old days',
                textCN: '过去有更多的社交活动',
              },
              {
                id: 'q1-2-C',
                text: 'supermarket managers have more problems',
                textCN: '超市经理有更多问题',
              },
              {
                id: 'q1-2-D',
                text: 'there is less personal contact between managers and customers',
                textCN: '经理和顾客之间的个人接触减少了',
              },
            ],
            correctOptionId: 'q1-2-D',
            explanation:
              '文章提到现在购物缺少个人元素，即经理和顾客之间的个人接触减少了，所以选D。',
          },
          {
            id: 'q1-3',
            type: 'reading',
            text: 'Who are Mrs. Smith and Mrs. Jones mentioned in the first paragraph?',
            textCN: '第一段中提到的史密斯夫人和琼斯夫人是谁？',
            options: [
              {
                id: 'q1-3-A',
                text: 'People representing any of the regular customers of the old general store.',
                textCN: '代表传统杂货店任何老顾客的人。',
              },
              { id: 'q1-3-B', text: 'Shop assistants.', textCN: '店员。' },
              {
                id: 'q1-3-C',
                text: "Friends of the shop manager's.",
                textCN: '商店经理的朋友。',
              },
              {
                id: 'q1-3-D',
                text: 'Two regular customers of the store.',
                textCN: '商店的两个老顾客。',
              },
            ],
            correctOptionId: 'q1-3-A',
            explanation:
              '文中提到史密斯夫人和琼斯夫人是为了说明店主能认识老顾客，她们代表的是传统杂货店的老顾客，A选项正确。',
          },
          {
            id: 'q1-4',
            type: 'reading',
            text: 'How has the job of the store manager changed?',
            textCN: '商店经理的工作发生了怎样的变化？',
            options: [
              {
                id: 'q1-4-A',
                text: "He doesn't sell tea or washing powder any more.",
                textCN: '他不再卖茶或洗衣粉了。',
              },
              {
                id: 'q1-4-B',
                text: 'He has a much larger staff to take care of and more daily problems to handle.',
                textCN: '他要照顾的员工多得多，要处理的日常问题也更多。',
              },
              {
                id: 'q1-4-C',
                text: 'He must try hard to remember the names of the regular customers.',
                textCN: '他必须努力记住老顾客的名字。',
              },
              {
                id: 'q1-4-D',
                text: 'He has to give advice and make decisions when problems arise.',
                textCN: '当问题出现时，他必须提供建议并做出决策。',
              },
            ],
            correctOptionId: 'q1-4-B',
            explanation:
              '文章提到现代超市经理要应对多达一百名员工和经营大企业的日常问题，B选项符合。',
          },
          {
            id: 'q1-5',
            type: 'reading',
            text: 'The author compared the supermarket manager to_______.',
            textCN: '作者将超市经理比作_______。',
            options: [
              { id: 'q1-5-A', text: 'a military leader', textCN: '军事领袖' },
              { id: 'q1-5-B', text: 'a school inspector', textCN: '学校督学' },
              {
                id: 'q1-5-C',
                text: 'traffic supervisor',
                textCN: '交通监督员',
              },
              {
                id: 'q1-5-D',
                text: 'an orchestra conductor',
                textCN: '管弦乐队指挥',
              },
            ],
            correctOptionId: 'q1-5-A',
            explanation:
              '文中提到经理像一个师的指挥官一样进行商店检查，所以比作军事领袖，选A。',
          },
        ],
      },
      {
        id: 'chapter1-reading1',
        title: '阅读理解 1',
        description: '关于团队智慧的阅读理解',
        type: 'reading',
        article: {
          id: 'article1',
          title: 'What Makes a Group Intelligent',
          titleCN: '是什么让一个团队变得聪明',
          content: `What makes a group intelligent? You might think a group's IQ would be simply the average intelligence of the group's members, or perhaps the intelligence of the team's smartest participant. But researchers who study groups have found that this isn't so.
    Rather, a group's intelligence emerges from the interactions that go on within the group. A team's intelligence can be measured, and like an individual's IQ score, it can accurately predict the team's performance on a wide variety of tasks. And just as an individual's intelligence is expandable, a group's intelligence can also be increased. Here are five suggestions on how to guide the development of smart teams:
    Choose team members carefully. The smartest groups are composed of people who are good at reading one another's social cues, according to a study led by Carnegie Mellon University professor Anita Williams Woolley and published in the journal Science.
    Talk about the "how". Many members of teams don't like to spend time talking about "process", preferring to get right down to work—but Woolley notes that groups who take the time to discuss how they will work together are ultimately more efficient and effective.
    Share the floor. In the most intelligent teams, found Woolley, members take turns speaking. Participants who dominate the discussion or who hang back and don't say much bring down the intelligence of the group. Alex Sandy Pentland, an MIT professor who studies group dynamics, has found that in smart teams, members connect directly with one another—not just with the team leader—and they're constantly engaging in "back channel" or side conversations that supplement the main discussion.
    Boost informal social connections among members. The smartest teams spend a lot of time communicating outside of formal meetings, says Pentland. He tells of a call center where team members' coffee breaks were staggered across the workday. Changing the schedule so that all members had a coffee break at the same time led them to do their work more efficiently and feel more satisfied with their jobs.
    Be open to external influences. In the most successful groups, Pentland discovered, team members regularly take off on their own to explore and discover. They then bring that information back to the group, stimulate the group's work with fresh insights from the world outside the conference room.`,
          contentCN: `是什么让一个团队变得聪明？你可能会认为一个团队的智商仅仅是团队成员平均智力水平，或者也许是团队中最聪明成员的智力。但研究团队的研究人员发现并非如此。
    相反，一个团队的智慧来自于团队内部的互动。一个团队的智慧是可以衡量的，就像一个人的智商分数一样，它可以准确地预测团队在各种任务中的表现。而且，正如个人的智力是可以扩展的一样，一个团队的智慧也可以提高。以下是关于如何引导聪明团队发展的五条建议：
    谨慎选择团队成员。根据卡内基梅隆大学教授安妮塔·威廉姆斯·伍利领导并发表在《科学》杂志上的一项研究，最聪明的团队是由善于解读彼此社交线索的人组成的。
    谈论“如何做”。许多团队成员不喜欢花时间谈论“过程”，而是更喜欢直接投入工作——但伍利指出，那些花时间讨论如何合作的团队最终会更高效。
    分享发言权。伍利发现，在最聪明的团队中，成员们轮流发言。主导讨论或退缩而不多说话的参与者会降低团队的智慧。麻省理工学院研究群体动态的教授亚历克斯·桑迪·彭特兰发现，在聪明的团队中，成员们直接相互联系——而不仅仅是与团队领导——他们不断地进行“后台”或附带对话，以补充主要讨论。
    加强成员之间的非正式社交联系。彭特兰说，最聪明的团队在正式会议之外花很多时间交流。他讲述了一个呼叫中心的例子，在那里团队成员的咖啡休息时间在工作日是错开的。改变时间表，让所有成员同时喝咖啡休息，使他们工作更高效，对工作更满意。
    对外部影响持开放态度。彭特兰发现，在最成功的团队中，团队成员经常自己去探索和发现。然后他们把这些信息带回团队，用会议室之外的新鲜见解激发团队的工作。`,
        },
        questions: [
          {
            id: 'q1-1',
            type: 'reading',
            text: "What do we learn about a team's intelligence?",
            textCN: '关于团队的智慧我们了解到了什么？',
            options: [
              {
                id: 'q1-1-A',
                text: 'It equals the total intelligence of the team members.',
                textCN: '它等于团队成员的总智力。',
              },
              {
                id: 'q1-1-B',
                text: 'It determines the interactions among the team members.',
                textCN: '它决定了团队成员之间的互动。',
              },
              {
                id: 'q1-1-C',
                text: "It can help measure an individual's IQ score in the team.",
                textCN: '它可以帮助衡量团队中个人的智商分数。',
              },
              {
                id: 'q1-1-D',
                text: "It can help predict the team's performance on various tasks.",
                textCN: '它可以帮助预测团队在各种任务中的表现。',
              },
            ],
            correctOptionId: 'q1-1-D',
            explanation:
              "文中提到“A team's intelligence can be measured, and like an individual's IQ score, it can accurately predict the team's performance on a wide variety of tasks.”，说明团队智慧能帮助预测团队在各种任务中的表现。",
          },
          {
            id: 'q1-2',
            type: 'reading',
            text: 'According to the fourth paragraph, members of smart teams _________.',
            textCN: '根据第四段，聪明团队的成员_________。',
            options: [
              {
                id: 'q1-2-A',
                text: 'tend to get down to work immediately',
                textCN: '倾向于立即开始工作',
              },
              {
                id: 'q1-2-B',
                text: 'pay attention to choosing team members',
                textCN: '注意选择团队成员',
              },
              {
                id: 'q1-2-C',
                text: 'are willing to spend time discussing their work process',
                textCN: '愿意花时间讨论他们的工作流程',
              },
              {
                id: 'q1-2-D',
                text: "have a clear understanding of each other's social status",
                textCN: '清楚了解彼此的社会地位',
              },
            ],
            correctOptionId: 'q1-2-C',
            explanation:
              '第四段提到“Woolley notes that groups who take the time to discuss how they will work together are ultimately more efficient and effective.”，说明聪明团队的成员愿意花时间讨论工作流程。',
          },
          {
            id: 'q1-3',
            type: 'reading',
            text: 'What has Alex Sandy Pentland found in the fifth paragraph?',
            textCN: '亚历克斯·桑迪·彭特兰在第五段中发现了什么？',
            options: [
              {
                id: 'q1-3-A',
                text: 'Group dynamics can be expanded by the group dominator.',
                textCN: '群体动态可以由群体主导者扩展。',
              },
              {
                id: 'q1-3-B',
                text: "Side conversations may bring down a group's intelligence.",
                textCN: '附带对话可能会降低团队的智慧。',
              },
              {
                id: 'q1-3-C',
                text: 'The absence of the team leader does harm to the main discussion.',
                textCN: '团队领导的缺席对主要讨论有害。',
              },
              {
                id: 'q1-3-D',
                text: "A group's intelligence is related to members' direct communication.",
                textCN: '团队的智慧与成员的直接沟通有关。',
              },
            ],
            correctOptionId: 'q1-3-D',
            explanation:
              "第五段提到“Alex Sandy Pentland, an MIT professor who studies group dynamics, has found that in smart teams, members connect directly with one another—not just with the team leader—and they're constantly engaging in 'back channel' or side conversations that supplement the main discussion.”，说明团队的智慧与成员的直接沟通有关。",
          },
          {
            id: 'q1-4',
            type: 'reading',
            text: 'What can be inferred from the case of the call center?',
            textCN: '从呼叫中心的案例中可以推断出什么？',
            options: [
              {
                id: 'q1-4-A',
                text: 'Team members should be guaranteed coffee breaks on working days.',
                textCN: '团队成员在工作日应该有咖啡休息时间。',
              },
              {
                id: 'q1-4-B',
                text: 'Informal social connections among members establish more efficient work.',
                textCN: '成员之间的非正式社交联系建立了更高效的工作。',
              },
              {
                id: 'q1-4-C',
                text: 'It is unnecessary for team leaders to hold informal meetings with members.',
                textCN: '团队领导没有必要与成员举行非正式会议。',
              },
              {
                id: 'q1-4-D',
                text: 'Coffee breaks at different times make members more satisfied with their jobs.',
                textCN: '不同时间的咖啡休息让成员对工作更满意。',
              },
            ],
            correctOptionId: 'q1-4-B',
            explanation:
              '呼叫中心的案例提到改变咖啡休息时间，让成员同时休息，使工作更高效，成员对工作更满意，说明成员之间的非正式社交联系建立了更高效的工作。',
          },
          {
            id: 'q1-5',
            type: 'reading',
            text: "By saying 'Be open to external influences' (Para. 7), the author suggests _________.",
            textCN:
              '通过说“对外部影响持开放态度”（第7段），作者建议_________。',
            options: [
              {
                id: 'q1-5-A',
                text: 'team members are willing to explore and discover on their own',
                textCN: '团队成员愿意自己去探索和发现',
              },
              {
                id: 'q1-5-B',
                text: "team leaders can improve their teams' work with some fresh ideas",
                textCN: '团队领导可以用一些新想法改进他们团队的工作',
              },
              {
                id: 'q1-5-C',
                text: 'smart teams absorb new insights from the world outside the meeting room',
                textCN: '聪明的团队从会议室之外的世界吸收新见解',
              },
              {
                id: 'q1-5-D',
                text: 'smart teams often hold a brainstorming session outside the conference room',
                textCN: '聪明的团队经常在会议室之外举行头脑风暴会议',
              },
            ],
            correctOptionId: 'q1-5-C',
            explanation:
              "第七段提到“team members regularly take off on their own to explore and discover. They then bring that information back to the group, stimulate the group's work with fresh insights from the world outside the conference room.”，说明作者建议聪明的团队从会议室之外的世界吸收新见解。",
          },
        ],
      },
      {
        id: 'chapter1-reading1',
        title: '阅读理解 1',
        description: '关于皮肤癌遗传因素的阅读理解',
        type: 'reading',
        article: {
          id: 'article1',
          title: 'Skin Cancer and Genetics',
          titleCN: '皮肤癌与遗传',
          content: `Want to reduce your risk of skin cancer? Wear sun screen, of course. But two new studies suggest that choosing your relatives carefully could also be helpful.
    One found that having an identical (同卵的) twin with melanoma (黑色素瘤) increased a person's own risk of developing the disease much more than having a fraternal (异卵的) twin with this type of skin cancer. The other found that having a brother or sister, or a parent with one of several different types of non-melanoma skin cancer increased risk as well.
    Several studies have suggested melanoma and other skin cancers run in families, but it can be difficult to tell the difference between the influence of genes and environment. In the Australian study, Dr. Sri N. Shekar of the University of Queensland and his colleagues attempted to do so by looking at twin pairs in which at least one brother or sister had been diagnosed with melanoma.
    They searched through thousands of cases of melanoma reported in Queensland and New South Wales and found 125 twin pairs. In four of the 27 identical twin pairs, both had melanoma, while three of the 98 fraternal twin pairs had both been diagnosed with the deadly skin cancer. Based on these numbers, having an identical twin with melanoma increased a person's own risk of the disease nearly 10-fold.
    This suggests, the researchers say, that some of the increased melanoma risk can be attributed to genes, in particular interactions between genes. They estimate that genes account for about half of the differences in risk between two people.
    In the second study, Dr. Shehnaz K. Hussain of the University of California and colleagues looked at the Swedish Family-Cancer Database to estimate the risk for several types of skin cancer among brothers or sisters and children of people diagnosed with these diseases.
    They found that people with a brother or sister, or a parent diagnosed with some types of skin cancer were more likely to develop skin cancers of various types, not just the ones their relatives had. When tumors occurred at parts of the body more likely to have been exposed to the sun, the family risk was stronger.`,
          contentCN: `想降低患皮肤癌的风险吗？当然要涂防晒霜。但两项新研究表明，谨慎选择你的亲属也可能会有帮助。
    一项研究发现，有一个患黑色素瘤的同卵双胞胎，会比有一个患这种皮肤癌的异卵双胞胎，使一个人自身患这种疾病的风险增加更多。另一项研究发现，有一个患几种不同类型非黑色素瘤皮肤癌之一的兄弟姐妹或父母，也会增加患病风险。
    几项研究表明黑色素瘤和其他皮肤癌在家族中具有遗传性，但很难区分基因和环境的影响。在澳大利亚的研究中，昆士兰大学的斯里·N·谢卡尔博士和他的同事们试图通过研究至少有一个兄弟姐妹被诊断患有黑色素瘤的双胞胎来进行区分。
    他们在昆士兰和新南威尔士州报告的数千例黑色素瘤病例中进行搜索，发现了125对双胞胎。在27对同卵双胞胎中，有4对两人都患有黑色素瘤，而在98对异卵双胞胎中，有3对两人都被诊断患有这种致命的皮肤癌。根据这些数字，有一个患黑色素瘤的同卵双胞胎会使一个人自身患这种疾病的风险增加近10倍。
    研究人员说，这表明黑色素瘤风险的增加部分可以归因于基因，特别是基因之间的相互作用。他们估计基因在两人患病风险差异中约占一半。
    在第二项研究中，加利福尼亚大学的谢赫纳兹·K·侯赛因博士和同事们查看了瑞典家庭癌症数据库，以估计被诊断患有这些疾病的人的兄弟姐妹和孩子患几种皮肤癌的风险。
    他们发现，有一个患某种皮肤癌的兄弟姐妹或父母的人，更有可能患各种类型的皮肤癌，而不仅仅是他们亲属所患的那种。当肿瘤发生在身体更容易暴露在阳光下的部位时，家族风险更强。`,
        },
        questions: [
          {
            id: 'q1-1',
            type: 'reading',
            text: 'Based on the statistics in Para. 4, it can be inferred that ________.',
            textCN: '根据第4段中的统计数据，可以推断出________。',
            options: [
              {
                id: 'q1-1-A',
                text: 'skin cancer can be infectious among family members',
                textCN: '皮肤癌在家庭成员之间可能具有传染性',
              },
              {
                id: 'q1-1-B',
                text: 'most people who have twin brothers or sisters will have a certain type of skin cancer',
                textCN: '大多数有双胞胎兄弟姐妹的人会患某种皮肤癌',
              },
              {
                id: 'q1-1-C',
                text: 'people having twin brothers are more likely to have skin cancer than those who have twin sisters',
                textCN: '有双胞胎兄弟的人比有双胞胎姐妹的人更容易患皮肤癌',
              },
              {
                id: 'q1-1-D',
                text: 'people having identical twin brothers or sisters are more likely to have skin cancer than those who have none',
                textCN: '有同卵双胞胎兄弟姐妹的人比没有的人更容易患皮肤癌',
              },
            ],
            correctOptionId: 'q1-1-D',
            explanation:
              "根据第四段研究数字，文章已经下了结论having an identical twin with melanoma increased a person's own risk of the disease nearly 10-fold（一个人的同卵双胞胎兄弟姐妹患有黑色素瘤，那么这个人患病机率将增加十倍），由此判断选项D为正确答案。",
          },
          {
            id: 'q1-2',
            type: 'reading',
            text: 'According to the passage, deadly skin cancer is caused by ________.',
            textCN: '根据文章，致命的皮肤癌是由________引起的。',
            options: [
              { id: 'q1-2-A', text: 'gene', textCN: '基因' },
              { id: 'q1-2-B', text: 'environment', textCN: '环境' },
              {
                id: 'q1-2-C',
                text: 'exposure to the sun',
                textCN: '暴露在阳光下',
              },
              {
                id: 'q1-2-D',
                text: 'identical twins with melanoma',
                textCN: '患有黑色素瘤的同卵双胞胎',
              },
            ],
            correctOptionId: 'q1-2-A',
            explanation:
              '文章第三段说以往研究表明皮肤癌run in families（在家族内流传），但是后面又说很难说明到底是由genes and environment（基因还是环境）引起，但文章第五段说研究表明皮肤癌的原因can be attributed to genes（可以归于遗传因素），所以选A。',
          },
          {
            id: 'q1-3',
            type: 'reading',
            text: 'In the second study, Dr. Hussain found ________.',
            textCN: '在第二项研究中，侯赛因博士发现________。',
            options: [
              {
                id: 'q1-3-A',
                text: 'that different types of skin cancer are mainly due to the environment',
                textCN: '不同类型的皮肤癌主要是由环境引起的',
              },
              {
                id: 'q1-3-B',
                text: 'that family members could develop more than one type of skin cancer',
                textCN: '家庭成员可能会患不止一种类型的皮肤癌',
              },
              {
                id: 'q1-3-C',
                text: 'that exposure to the sun is beneficial to skin cancer prevention',
                textCN: '暴露在阳光下对预防皮肤癌有益',
              },
              {
                id: 'q1-3-D',
                text: 'that family members tend to develop the same type of skin cancer',
                textCN: '家庭成员倾向于患同一种类型的皮肤癌',
              },
            ],
            correctOptionId: 'q1-3-B',
            explanation:
              '由人名Hussain可以定位在文章最后一段第一句They found that people with a brother or sister, or a parent diagnosed with some types of skin cancer were more likely to develop skin cancers of various types, not just the ones their relatives had. 意为，他们发现有兄弟姐妹的人，或者是父母被诊断患有某种皮肤癌的人，更容易得各种皮肤癌，不仅限于他们的亲属所患有的皮肤癌，与选项B的内容相符，所以选B。',
          },
          {
            id: 'q1-4',
            type: 'reading',
            text: 'It can be inferred from the passage that ________.',
            textCN: '从文章中可以推断出________。',
            options: [
              {
                id: 'q1-4-A',
                text: "the research by Dr. Hussain goes against Dr. Shekar's findings",
                textCN: '侯赛因博士的研究与谢卡尔博士的发现相悖',
              },
              {
                id: 'q1-4-B',
                text: 'parents who have identical twins are most likely to be victims of skin cancer',
                textCN: '有同卵双胞胎的父母最有可能成为皮肤癌的受害者',
              },
              {
                id: 'q1-4-C',
                text: 'Australia has the richest database of twins family in the world',
                textCN: '澳大利亚拥有世界上最丰富的双胞胎家庭数据库',
              },
              {
                id: 'q1-4-D',
                text: 'interaction between genes may partially account for developing skin cancer',
                textCN: '基因之间的相互作用可能部分解释了患皮肤癌的原因',
              },
            ],
            correctOptionId: 'q1-4-D',
            explanation:
              '文章第五段说some of the increased melanoma risk can be attributed to genes, in particular interactions between genes ，即一些黑色素瘤病症，也就是皮肤病可以归因于基因的影响，尤其是基因之间的交互作用，与选项D的内容相符，所以选D。',
          },
          {
            id: 'q1-5',
            type: 'reading',
            text: 'What is the main idea of the passage?',
            textCN: '这篇文章的主要思想是什么？',
            options: [
              {
                id: 'q1-5-A',
                text: 'Melanoma is a type of deadly skin cancer.',
                textCN: '黑色素瘤是一种致命的皮肤癌。',
              },
              {
                id: 'q1-5-B',
                text: 'Researchers found that skin cancer can be inherited.',
                textCN: '研究人员发现皮肤癌可以遗传。',
              },
              {
                id: 'q1-5-C',
                text: 'Both environment and genes cause the risk of skin cancer.',
                textCN: '环境和基因都会导致患皮肤癌的风险。',
              },
              {
                id: 'q1-5-D',
                text: 'Australian scientists made a breakthrough in the treatment of skin cancer.',
                textCN: '澳大利亚科学家在皮肤癌治疗方面取得了突破。',
              },
            ],
            correctOptionId: 'q1-5-B',
            explanation:
              '整篇文章都在叙述皮肤癌的诱因，研究结果表明第一，一个人的同卵双胞胎兄弟姐妹患有黑色素瘤，那么这个人患病机率将增加十倍；第二，皮肤癌发病原因可以归于遗传因素，或者基因之间的交互作用；第三，如果一个人的父母或兄弟姐妹患有黑色素瘤，那么这个人可能患有不同类型的病症；综上所述，皮肤癌诱因的关键词是家族、血缘、基因等等，由此推断皮肤癌是可以遗传的，所以选B。',
          },
        ],
      },
      {
        id: 'chapter1-reading1',
        title: '阅读理解 1',
        description: '关于儿童在法庭作证的阅读理解',
        type: 'reading',
        article: {
          id: 'article1',
          title: 'Children as Witnesses in Court',
          titleCN: '儿童在法庭作证',
          content: `Going to court can be frightening, especially if you are a child. You may have to stand up in the witness box, and swear to tell the truth and answer questions in front of a crowd of adults. It would be even more frightening if you were the victim of a crime and you had to sit in the same courtroom as the person accused of attacking you, for instance.
    So the law in Britain has made it easier for children to act as witnesses. Children are allowed to tell what they know, from another room in the same courthouse. This way they do not have to face all those people in the courtroom.
    It works on a closed-circuit television link, which means that the TV only operates inside the court. The child witness sits in a room with a social worker in front of a TV camera. Everyone in the courtroom can see the child on a TV screen, but the child can only see the judge and the lawyers who will ask him or her questions. The system has been so successful that will be extended to more courts this year.
    Another way to make it easy for a child to act as witness is to set up a screen in the courtroom around the witness box so that the child cannot see the defendant.
    Information given by children can be very important to a court trial, but before 1988 the law did not really recognizes that children told the truth. It stated that anything a child said in court had to be supported by other evidence in the case.`,
          contentCN: `上法庭可能会很可怕，尤其是如果你还是个孩子。你可能得站在证人席上，发誓说出真相，并在一群成年人面前回答问题。例如，如果你是犯罪的受害者，不得不和被指控袭击你的人坐在同一个法庭里，那就更可怕了。
    所以英国的法律让孩子们更容易成为证人。孩子们可以在同一法院的另一个房间里说出他们所知道的事情。这样他们就不必面对法庭上的所有人了。
    它通过闭路电视连接运行，这意味着电视只在法庭内运行。儿童证人坐在一个房间里，和一名社会工作者一起面对电视摄像机。法庭上的每个人都可以在电视屏幕上看到孩子，但孩子只能看到法官和会问他或她问题的律师。这个系统非常成功，今年将推广到更多的法庭。
    让孩子更容易成为证人的另一种方法是在法庭上围绕证人席设置一个屏风，这样孩子就看不到被告了。
    孩子们提供的信息对法庭审判可能非常重要，但在1988年之前，法律并没有真正认识到孩子们会说出真相。法律规定，孩子在法庭上说的任何话都必须有案件中的其他证据支持。`,
        },
        questions: [
          {
            id: 'q1-1',
            type: 'reading',
            text: 'A child witness, if he were the victim of the crime, would be frightened most by______.',
            textCN: '儿童证人，如果他是犯罪的受害者，最害怕的会是______。',
            options: [
              {
                id: 'q1-1-A',
                text: 'all the questions he had to answer',
                textCN: '他必须回答的所有问题',
              },
              {
                id: 'q1-1-B',
                text: 'the crowd of adults he had to face',
                textCN: '他必须面对的一群成年人',
              },
              {
                id: 'q1-1-C',
                text: 'the judge and the lawyers',
                textCN: '法官和律师',
              },
              {
                id: 'q1-1-D',
                text: 'the person accused of attacking him',
                textCN: '被指控袭击他的人',
              },
            ],
            correctOptionId: 'q1-1-D',
            explanation:
              "根据第一段最后一句'It would be even more frightening if you were the victim of a crime and you had to sit in the same courtroom as the person accused of attacking you, for instance.'可知，如果孩子是犯罪受害者，最害怕的是被指控袭击他的人。",
          },
          {
            id: 'q1-2',
            type: 'reading',
            text: 'The most important point of the new system that made things easier for a child witness is that________.',
            textCN: '新系统让儿童证人更容易的最重要一点是________。',
            options: [
              {
                id: 'q1-2-A',
                text: 'he does not see the defendant',
                textCN: '他看不到被告',
              },
              {
                id: 'q1-2-B',
                text: 'he speaks in front of a TV camera',
                textCN: '他在电视摄像机前讲话',
              },
              {
                id: 'q1-2-C',
                text: 'he is in another room in the same courthouse',
                textCN: '他在同一法院的另一个房间里',
              },
              {
                id: 'q1-2-D',
                text: 'everyone in the courtroom can see the child',
                textCN: '法庭上的每个人都能看到孩子',
              },
            ],
            correctOptionId: 'q1-2-A',
            explanation:
              "根据第四段'Another way to make it easy for a child to act as witness is to set up a screen in the courtroom around the witness box so that the child cannot see the defendant.'可知，新系统让儿童证人更容易的最重要一点是孩子看不到被告。",
          },
          {
            id: 'q1-3',
            type: 'reading',
            text: 'What does the author think of the new system according to the third paragraph? ',
            textCN: '根据第三段，作者对新系统有什么看法？',
            options: [
              { id: 'q1-3-A', text: 'Not very good.', textCN: '不是很好。' },
              { id: 'q1-3-B', text: 'Very successful.', textCN: '非常成功。' },
              {
                id: 'q1-3-C',
                text: 'Just an experiment.',
                textCN: '只是一个实验。',
              },
              {
                id: 'q1-3-D',
                text: 'Hardly acceptable.',
                textCN: '几乎不可接受。',
              },
            ],
            correctOptionId: 'q1-3-B',
            explanation:
              "根据第三段最后一句'The system has been so successful that will be extended to more courts this year.'可知，作者认为新系统非常成功。",
          },
          {
            id: 'q1-4',
            type: 'reading',
            text: "Has the law always recognized the importance of children's information in court? ",
            textCN: '法律一直都认可儿童在法庭上提供信息的重要性吗？',
            options: [
              { id: 'q1-4-A', text: 'No.', textCN: '不' },
              { id: 'q1-4-B', text: 'Yes.', textCN: '是的' },
              {
                id: 'q1-4-C',
                text: 'Not until 1988.',
                textCN: '直到1988年才认可',
              },
              {
                id: 'q1-4-D',
                text: 'Before 1988, yes.',
                textCN: '1988年之前，认可',
              },
            ],
            correctOptionId: 'q1-4-C',
            explanation:
              "根据最后一段'Information given by children can be very important to a court trial, but before 1988 the law did not really recognizes that children told the truth.'可知，直到1988年法律才真正认可儿童在法庭上提供信息的重要性。",
          },
          {
            id: 'q1-5',
            type: 'reading',
            text: 'The word "case" in the last paragraph means______. ',
            textCN: '最后一段中的“case”一词的意思是______。',
            options: [
              {
                id: 'q1-5-A',
                text: 'a particular situation',
                textCN: '一种特殊情况',
              },
              {
                id: 'q1-5-B',
                text: 'a particular incident',
                textCN: '一个特定事件',
              },
              { id: 'q1-5-C', text: 'a trial', textCN: '一场审判' },
              { id: 'q1-5-D', text: 'a box', textCN: '一个盒子' },
            ],
            correctOptionId: 'q1-5-C',
            explanation:
              "根据最后一段'It stated that anything a child said in court had to be supported by other evidence in the case.'可知，这里的“case”指的是一场审判。",
          },
        ],
      },
      {
        id: 'chapter1-reading1',
        title: '阅读理解 1',
        description: '关于绿色屋顶的阅读理解',
        type: 'reading',
        article: {
          id: 'article1',
          title: 'Green Roofs',
          titleCN: '绿色屋顶',
          content: `Filling roofs with plants and dirt can help pull a modest amount of heat-trapping carbon dioxide (二氧化碳) out of the atmosphere, found by a new study.
    While green roofs certainly won't solve the global warming problem, their ability to absorb greenhouse gases—even just a little bit—supports the case for planting them on city buildings, despite extra costs on the front end, said lead researcher Kristin Getter, of Michigan State University in East Lansing.
    "The key to fighting global warming is capturing carbon from the atmosphere and storing it in new reservoirs that weren't storing carbon before," Getter said. "In the whole scheme of things, green roofs are not the one answer to sequestering carbon, but they will certainly help."
    Green roofs offer a long list of known benefits. They lower air-conditioning costs in the summer by absorbing and reflecting heat. They lower heating costs in the winter by adding extra isolation.
    Green roofs appeal to cities because they soak up rainwater, making excess storm-water less likely to flood sewage (下水道) systems and increase sewage treatment costs. Plant-filled roofs make urban areas less likely to become heat islands. They reduce air pollution and noise pollution. And plants, even when it's several stories up, provides living places for animals.
    A green roof's ability to sequester carbon lasts only a year or two. At that point, the amount of carbon emitted by the decay of soil and plant material balances out the carbon taken in by photosynthesis (光合作用). Still, that's two extra years of balances that make a green roof potentially worthwhile, said David Sailor, an engineer at Portland State University in Oregon.
    His models estimate a nine-year delay before the energy savings of a green roof balance the money and energy required to build it. Those costs can be up to twice as high as what it takes to build a traditional roof. The new study lowers the estimated payback time to seven years.`,
          contentCN: `一项新研究发现，在屋顶种植植物并覆盖泥土有助于从大气中吸收一定量的温室气体二氧化碳。
    东兰辛市密歇根州立大学的首席研究员克里斯汀·格特表示，虽然绿色屋顶肯定无法解决全球变暖问题，但它们吸收温室气体的能力——即使只是一点点——也支持在城市建筑上种植绿色屋顶的理由，尽管前期成本会增加。
    “应对全球变暖的关键是从大气中捕获碳并将其储存在以前没有储存碳的新储存库中，”格特说。“从整体情况来看，绿色屋顶并不是解决碳隔离问题的唯一答案，但它们肯定会有所帮助。”
    绿色屋顶有一系列已知的好处。它们在夏天通过吸收和反射热量来降低空调成本。它们在冬天通过增加额外的隔热来降低供暖成本。
    绿色屋顶对城市有吸引力，因为它们能吸收雨水，使多余的雨水不太可能淹没污水处理系统并增加污水处理成本。种满植物的屋顶使城市地区不太可能成为热岛。它们减少了空气污染和噪音污染。而且即使在几层楼高的地方，植物也为动物提供了栖息地。
    绿色屋顶隔离碳的能力只持续一两年。到那时，土壤和植物材料腐烂所排放的碳量与光合作用吸收的碳量相平衡。不过，俄勒冈州波特兰州立大学的工程师大卫·赛勒说，这额外的两年平衡使得绿色屋顶可能是值得的。
    他的模型估计，绿色屋顶节省的能源要九年才能平衡建造它所需的资金和能源。这些成本可能高达建造传统屋顶成本的两倍。这项新研究将估计的投资回收期缩短到了七年。`,
        },
        questions: [
          {
            id: 'q1-1',
            type: 'reading',
            text: 'According to Kristin Getter, why are green roofs planted in cities?',
            textCN: '根据克里斯汀·格特的说法，为什么在城市种植绿色屋顶？',
            options: [
              {
                id: 'q1-1-A',
                text: 'Because it can solve the global warming problem.',
                textCN: '因为它可以解决全球变暖问题。',
              },
              {
                id: 'q1-1-B',
                text: 'Because it can absorb the carbon dioxide.',
                textCN: '因为它可以吸收二氧化碳。',
              },
              {
                id: 'q1-1-C',
                text: 'Because it can make the building roof more beautiful.',
                textCN: '因为它可以使建筑屋顶更美观。',
              },
              {
                id: 'q1-1-D',
                text: 'Because it can save money for repairing building roofs.',
                textCN: '因为它可以节省建筑屋顶维修费用。',
              },
            ],
            correctOptionId: 'q1-1-B',
            explanation:
              "本题主要考查把握事实和细节的能力。题干的意思是：Kristin Getter认为，为什么要在城市安装绿色屋顶？根据题干中的人名Kristin Getter把答案定位在文章第一段，原文说green roofs certainly won't solve the global warming problem（尽管绿色屋顶不能解决全球变暖问题），their ability to absorb greenhouse gases...supports the case for planting them on city buildings（但它们能吸收二氧化碳，这理由就足以支持在城市建筑上安装绿色屋顶的想法），所以选B。",
          },
          {
            id: 'q1-2',
            type: 'reading',
            text: 'What is the key to fighting the global warming problem according to the passage?',
            textCN: '根据文章内容，与全球变暖问题抗争的关键是什么？',
            options: [
              {
                id: 'q1-2-A',
                text: 'To reduce carbon dioxide emission.',
                textCN: '减少二氧化碳排放。',
              },
              {
                id: 'q1-2-B',
                text: 'To build more green roofs.',
                textCN: '建造更多绿色屋顶。',
              },
              {
                id: 'q1-2-C',
                text: 'To take carbon out of the atmosphere and save it.',
                textCN: '从大气中获取碳并储存起来。',
              },
              {
                id: 'q1-2-D',
                text: 'To reduce carbon dioxide usage.',
                textCN: '减少二氧化碳使用。',
              },
            ],
            correctOptionId: 'q1-2-C',
            explanation:
              "本题主要考查把握事实和细节的能力。题干的意思是：根据文章内容，什么是与全球变暖问题抗争的关键？根据题干the key to fighting the global warming定位到文章第三段第一句话The key to fighting global warming is capturing carbon from the atmosphere and storing it in new reservoirs that weren't storing carbon before，即，与全球变暖问题抗争的关键是获取大气中的碳，并且把它储存下来，其中capturing与take carbon out of the atmosphere意思相近，storing it与save it意思相近，所以选C。",
          },
          {
            id: 'q1-3',
            type: 'reading',
            text: 'What does the word "sequester" mean in the sentence "In the whole scheme of things, green roofs are not the one answer to sequestering carbon...?" (Para. 3)',
            textCN:
              '在句子‘从整体情况来看，绿色屋顶并不是解决碳隔离问题的唯一答案……’（第3段）中，‘sequester’一词是什么意思？',
            options: [
              { id: 'q1-3-A', text: 'Remove.', textCN: '分离、移开' },
              { id: 'q1-3-B', text: 'Decompose.', textCN: '分解' },
              { id: 'q1-3-C', text: 'Decay.', textCN: '衰退' },
              { id: 'q1-3-D', text: 'Recirculate.', textCN: '再流通' },
            ],
            correctOptionId: 'q1-3-A',
            explanation:
              '本题主要考查学生根据上下文推测语义的能力。第三段中前面提到capturing carbon from the atmosphere and storing it，即从大气中获取二氧化碳并且把它们储存起来，这也就是后面提到的the whole scheme of things，由此推断句中的sequestering carbon指的就是‘把二氧化碳从大气中分离出来’，sequester与remove意思相同，都指‘分离、移开’，所以选A。其他选项也可以采用排除法排除，decompose的意思是‘分解’，decay的意思是‘衰退’，recirculate的意思是‘再流通’。',
          },
          {
            id: 'q1-4',
            type: 'reading',
            text: "According to David Sailor, if building a traditional roof costs $312, how much is a green roof's cost?",
            textCN:
              '根据大卫·赛勒的说法，如果建造一个传统屋顶花费312美元，那么一个绿色屋顶的成本是多少？',
            options: [
              { id: 'q1-4-A', text: '$312.', textCN: '312美元。' },
              { id: 'q1-4-B', text: '$624.', textCN: '624美元。' },
              { id: 'q1-4-C', text: '$2,184.', textCN: '2184美元。' },
              { id: 'q1-4-D', text: '$156.', textCN: '156美元。' },
            ],
            correctOptionId: 'q1-4-B',
            explanation:
              '本题主要考查推断隐含意义的能力。题干的意思是：David Sailor认为，如果传统的屋顶需要花费312美元，那么绿色屋顶要花费多少钱？原文并没有具体的数字信息，而是在最后一段提到Those costs can be up to twice as high as what it takes to build a traditional roof（绿色屋顶的花费是传统屋顶的两倍），由此可以计算出312美元的两倍是624美元，所以选B。',
          },
          {
            id: 'q1-5',
            type: 'reading',
            text: "What's the main idea of the passage?",
            textCN: '这篇文章的主要思想是什么？',
            options: [
              {
                id: 'q1-5-A',
                text: 'How to fight the global warming problem.',
                textCN: '如何应对全球变暖问题。',
              },
              {
                id: 'q1-5-B',
                text: "A green roof's ability to absorb carbon dioxide.",
                textCN: '绿色屋顶吸收二氧化碳的能力。',
              },
              {
                id: 'q1-5-C',
                text: 'The benefits and cost of a green roof.',
                textCN: '绿色屋顶的好处和成本。',
              },
              {
                id: 'q1-5-D',
                text: "A green roof's ability to soak up rainwater.",
                textCN: '绿色屋顶吸收雨水的能力。',
              },
            ],
            correctOptionId: 'q1-5-C',
            explanation:
              '本题主要考查把握主题及中心思想的能力。首先可以看出整篇文章都是在谈绿色屋顶，文章还提到了绿色屋顶一定有帮助（certainly help），还有一系列的好处（Green roofs offer a long list of known benefits），对城市也有吸引力（Green roofs appeal to cities），最后还提到了Those costs（即屋顶的花费）。综合上述信息，所以选C（绿色屋顶的好处和花费）。',
          },
        ],
      },
      {
        id: 'chapter11-cloze1',
        title: '完形填空 11',
        description: '关于感恩节的完形填空',
        type: 'cloze',
        questions: [
          {
            id: 'c11-1',
            type: 'cloze',
            text: 'Thanksgiving Day has a special (75)_____ for Americans.',
            textCN: '感恩节对美国人有着特殊的(75)_____。',
            options: [
              { id: 'c11-1-A', text: 'significance', textCN: '意义' },
              { id: 'c11-1-B', text: 'origin', textCN: '起源' },
              { id: 'c11-1-C', text: 'problem', textCN: '问题' },
              { id: 'c11-1-D', text: 'name', textCN: '名字' },
            ],
            correctOptionId: 'c11-1-A',
            explanation:
              '“significance”意为“意义”，与“追溯到首批移民”的历史背景呼应，体现感恩节对美国人的特殊文化意义。',
          },
          {
            id: 'c11-2',
            type: 'cloze',
            text: 'Their ship, the Mayflower, had (76)_____ to go to Virginia.',
            textCN: '他们的“五月花”号船原本(76)_____前往弗吉尼亚。',
            options: [
              { id: 'c11-2-A', text: 'intended', textCN: '打算' },
              { id: 'c11-2-B', text: 'failed', textCN: '失败' },
              { id: 'c11-2-C', text: 'refused', textCN: '拒绝' },
              { id: 'c11-2-D', text: 'forgot', textCN: '忘记' },
            ],
            correctOptionId: 'c11-2-A',
            explanation:
              '“intended”意为“打算”，与“最终在更北处登陆”形成对比，说明航行计划与实际结果的差异。',
          },
          {
            id: 'c11-3',
            type: 'cloze',
            text: 'After some weeks of (77)_____ they decided to remain where they were.',
            textCN: '经过数周的(77)_____，他们决定留在原地。',
            options: [
              { id: 'c11-3-A', text: 'exploring', textCN: '探索' },
              { id: 'c11-3-B', text: 'resting', textCN: '休息' },
              { id: 'c11-3-C', text: 'fighting', textCN: '战斗' },
              { id: 'c11-3-D', text: 'dancing', textCN: '跳舞' },
            ],
            correctOptionId: 'c11-3-A',
            explanation:
              '“exploring”意为“探索”，指移民对新土地的考察，符合“决定留下”的决策逻辑。',
          },
          {
            id: 'c11-4',
            type: 'cloze',
            text: 'when they stepped ashore in this (78)_____ alien world.',
            textCN: '当他们踏上这片(78)_____陌生的土地时。',
            options: [
              { id: 'c11-4-A', text: 'utterly', textCN: '完全地' },
              { id: 'c11-4-B', text: 'slightly', textCN: '轻微地' },
              { id: 'c11-4-C', text: 'gradually', textCN: '逐渐地' },
              { id: 'c11-4-D', text: 'finally', textCN: '最终' },
            ],
            correctOptionId: 'c11-4-A',
            explanation:
              '“utterly”意为“完全地”，强调新世界对移民而言的陌生感，与“完全孤立”的处境呼应。',
          },
          {
            id: 'c11-5',
            type: 'cloze',
            text: 'totally isolated from any outside (79)_____.',
            textCN: '完全孤立于任何外部(79)_____。',
            options: [
              { id: 'c11-5-A', text: 'assistance', textCN: '帮助' },
              { id: 'c11-5-B', text: 'enemy', textCN: '敌人' },
              { id: 'c11-5-C', text: 'market', textCN: '市场' },
              { id: 'c11-5-D', text: 'friend', textCN: '朋友' },
            ],
            correctOptionId: 'c11-5-A',
            explanation:
              '“assistance”意为“帮助”，与“孤立”搭配，说明移民缺乏外部支援的困境。',
          },
          {
            id: 'c11-6',
            type: 'cloze',
            text: 'some of whom were (80)_____.',
            textCN: '其中一些人是(80)_____。',
            options: [
              { id: 'c11-6-A', text: 'hostile', textCN: '敌对的' },
              { id: 'c11-6-B', text: 'friendly', textCN: '友好的' },
              { id: 'c11-6-C', text: 'brave', textCN: '勇敢的' },
              { id: 'c11-6-D', text: 'weak', textCN: '虚弱的' },
            ],
            correctOptionId: 'c11-6-A',
            explanation:
              '“hostile”意为“敌对的”，与“增加日常生活困难”呼应，说明部分印第安人带来的威胁。',
          },
          {
            id: 'c11-7',
            type: 'cloze',
            text: 'the vast (81)_____ of forests gave them a hope.',
            textCN: '广阔的森林(81)_____给了他们希望。',
            options: [
              { id: 'c11-7-A', text: 'stretches', textCN: '地带' },
              { id: 'c11-7-B', text: 'problems', textCN: '问题' },
              { id: 'c11-7-C', text: 'costs', textCN: '成本' },
              { id: 'c11-7-D', text: 'secrets', textCN: '秘密' },
            ],
            correctOptionId: 'c11-7-A',
            explanation:
              '“stretches”意为“地带”，“vast stretches of forests”指广阔的森林区域，为移民提供了生存资源。',
          },
          {
            id: 'c11-8',
            type: 'cloze',
            text: "the nation's forefathers not only (82)_____ the first severe winter.",
            textCN: '国家的先驱者不仅(82)_____第一个严冬。',
            options: [
              { id: 'c11-8-A', text: 'survived', textCN: '幸存' },
              { id: 'c11-8-B', text: 'enjoyed', textCN: '享受' },
              { id: 'c11-8-C', text: 'caused', textCN: '导致' },
              { id: 'c11-8-D', text: 'forgot', textCN: '忘记' },
            ],
            correctOptionId: 'c11-8-A',
            explanation:
              '“survived”意为“幸存”，与“看到次年秋收”形成递进，说明移民挺过严冬的艰难历程。',
          },
          {
            id: 'c11-9',
            type: 'cloze',
            text: 'as Thanksgiving Day (the fourth Thursday of November) (83)_____.',
            textCN: '随着感恩节（11月第四个星期四）(83)_____。',
            options: [
              { id: 'c11-9-A', text: 'approaches', textCN: '临近' },
              { id: 'c11-9-B', text: 'ends', textCN: '结束' },
              { id: 'c11-9-C', text: 'starts', textCN: '开始' },
              { id: 'c11-9-D', text: 'continues', textCN: '继续' },
            ],
            correctOptionId: 'c11-9-A',
            explanation:
              '“approaches”意为“临近”，指每年感恩节到来时，学校会讲述相关历史故事，符合时间逻辑。',
          },
          {
            id: 'c11-10',
            type: 'cloze',
            text: 'enjoy a (84)_____ dinner for roast turkey.',
            textCN: '享用一顿烤火鸡的(84)_____晚餐。',
            options: [
              { id: 'c11-10-A', text: 'traditional', textCN: '传统的' },
              { id: 'c11-10-B', text: 'new', textCN: '新的' },
              { id: 'c11-10-C', text: 'strange', textCN: '奇怪的' },
              { id: 'c11-10-D', text: 'small', textCN: '小的' },
            ],
            correctOptionId: 'c11-10-A',
            explanation:
              '“traditional”意为“传统的”，与“烤火鸡”搭配，体现感恩节晚餐的文化传统延续。',
          },
        ],
      },
      {
        id: 'chapter12-cloze1',
        title: '完形填空 12',
        description: '关于新发明发展阶段的完形填空',
        type: 'cloze',
        questions: [
          {
            id: 'c12-1',
            type: 'cloze',
            text: 'When initially (85)_____ into the market, the process of adoption is slow.',
            textCN: '当最初(85)_____市场时，采用过程很缓慢。',
            options: [
              { id: 'c12-1-A', text: 'introduced', textCN: '引入' },
              { id: 'c12-1-B', text: 'removed', textCN: '移除' },
              { id: 'c12-1-C', text: 'hidden', textCN: '隐藏' },
              { id: 'c12-1-D', text: 'found', textCN: '发现' },
            ],
            correctOptionId: 'c12-1-A',
            explanation:
              '“introduced”意为“引入”，与“进入市场”的语境一致，指新发明首次被推向市场时的阶段特征。',
          },
          {
            id: 'c12-2',
            type: 'cloze',
            text: 'The early (86)_____ are expensive and hard to use.',
            textCN: '早期的(86)_____昂贵且难以使用。',
            options: [
              { id: 'c12-2-A', text: 'models', textCN: '型号' },
              { id: 'c12-2-B', text: 'prices', textCN: '价格' },
              { id: 'c12-2-C', text: 'users', textCN: '用户' },
              { id: 'c12-2-D', text: 'markets', textCN: '市场' },
            ],
            correctOptionId: 'c12-2-A',
            explanation:
              '“models”意为“型号”，指新发明的早期产品型号，与“昂贵且难用”的描述匹配，符合首阶段特征。',
          },
          {
            id: 'c12-3',
            type: 'cloze',
            text: 'The economic impact is (87)_____ small.',
            textCN: '经济影响(87)_____较小。',
            options: [
              { id: 'c12-3-A', text: 'relatively', textCN: '相对地' },
              { id: 'c12-3-B', text: 'extremely', textCN: '极其' },
              { id: 'c12-3-C', text: 'surprisingly', textCN: '令人惊讶地' },
              { id: 'c12-3-D', text: 'dangerously', textCN: '危险地' },
            ],
            correctOptionId: 'c12-3-A',
            explanation:
              '“relatively”意为“相对地”，强调首阶段经济影响是相较于后续阶段较小，而非绝对意义上的极小，符合发展逻辑。',
          },
          {
            id: 'c12-4',
            type: 'cloze',
            text: 'the invention is rapidly (88)_____ by a large number of people.',
            textCN: '发明被大量人群迅速(88)_____。',
            options: [
              { id: 'c12-4-A', text: 'adopted', textCN: '采用' },
              { id: 'c12-4-B', text: 'rejected', textCN: '拒绝' },
              { id: 'c12-4-C', text: 'ignored', textCN: '忽视' },
              { id: 'c12-4-D', text: 'stolen', textCN: '偷窃' },
            ],
            correctOptionId: 'c12-4-A',
            explanation:
              '“adopted”意为“采用”，与“爆炸式阶段”的特征呼应，指发明被大量人群快速接受和使用。',
          },
          {
            id: 'c12-5',
            type: 'cloze',
            text: 'there was a(an) (89)_____ acceleration in auto production.',
            textCN: '汽车生产出现了(89)_____的加速。',
            options: [
              { id: 'c12-5-A', text: 'dramatic', textCN: '显著的' },
              { id: 'c12-5-B', text: 'slow', textCN: '缓慢的' },
              { id: 'c12-5-C', text: 'gradual', textCN: '逐渐的' },
              { id: 'c12-5-D', text: 'slight', textCN: '轻微的' },
            ],
            correctOptionId: 'c12-5-A',
            explanation:
              '“dramatic”意为“显著的”，与“从190万到450万”的数据增长呼应，体现汽车生产在爆炸阶段的迅猛加速。',
          },
          {
            id: 'c12-6',
            type: 'cloze',
            text: 'This boom was accompanied by all sorts of other (90)_____ activities.',
            textCN: '这一繁荣伴随着各种其他(90)_____活动。',
            options: [
              { id: 'c12-6-A', text: 'essential', textCN: '必要的' },
              { id: 'c12-6-B', text: 'unnecessary', textCN: '不必要的' },
              { id: 'c12-6-C', text: 'strange', textCN: '奇怪的' },
              { id: 'c12-6-D', text: 'funny', textCN: '有趣的' },
            ],
            correctOptionId: 'c12-6-A',
            explanation:
              '“essential”意为“必要的”，指道路建设、炼油厂等是汽车普及的基础配套活动，符合“汽车国家”的客观需求。',
          },
          {
            id: 'c12-7',
            type: 'cloze',
            text: 'the same pattern is repeated again and again with (91)_____.',
            textCN: '相同的模式在(91)_____上不断重复。',
            options: [
              { id: 'c12-7-A', text: 'innovations', textCN: '创新' },
              { id: 'c12-7-B', text: 'problems', textCN: '问题' },
              { id: 'c12-7-C', text: 'traditions', textCN: '传统' },
              { id: 'c12-7-D', text: 'habits', textCN: '习惯' },
            ],
            correctOptionId: 'c12-7-A',
            explanation:
              '“innovations”意为“创新”，指前文所述的三阶段模式在各类新发明（创新）中普遍存在，符合历史案例的总结。',
          },
          {
            id: 'c12-8',
            type: 'cloze',
            text: 'The construction of the electrical system (92)_____ an enormous early investment.',
            textCN: '电力系统的建设(92)_____巨大的早期投资。',
            options: [
              { id: 'c12-8-A', text: 'required', textCN: '需要' },
              { id: 'c12-8-B', text: 'avoided', textCN: '避免' },
              { id: 'c12-8-C', text: 'wasted', textCN: '浪费' },
              { id: 'c12-8-D', text: 'saved', textCN: '节省' },
            ],
            correctOptionId: 'c12-8-A',
            explanation:
              '“required”意为“需要”，强调电力系统建设对早期投资的客观需求，与“发电和配电能力”的投入描述一致。',
          },
          {
            id: 'c12-9',
            type: 'cloze',
            text: 'an enormous early (93)_____ in generation and distribution capacity.',
            textCN: '在发电和配电能力方面的巨大早期(93)_____。',
            options: [
              { id: 'c12-9-A', text: 'investment', textCN: '投资' },
              { id: 'c12-9-B', text: 'success', textCN: '成功' },
              { id: 'c12-9-C', text: 'failure', textCN: '失败' },
              { id: 'c12-9-D', text: 'dream', textCN: '梦想' },
            ],
            correctOptionId: 'c12-9-A',
            explanation:
              '“investment”意为“投资”，与“required”（需要）搭配，指电力系统建设需要大量资金投入，符合基础设施建设的特点。',
          },
          {
            id: 'c12-10',
            type: 'cloze',
            text: 'which quickly brought radios into almost half of all (94)_____ by 1930.',
            textCN: '到1930年，这迅速将收音机带入几乎一半的(94)_____。',
            options: [
              { id: 'c12-10-A', text: 'households', textCN: '家庭' },
              { id: 'c12-10-B', text: 'offices', textCN: '办公室' },
              { id: 'c12-10-C', text: 'schools', textCN: '学校' },
              { id: 'c12-10-D', text: 'stores', textCN: '商店' },
            ],
            correctOptionId: 'c12-10-A',
            explanation:
              '“households”意为“家庭”，指收音机在爆炸阶段快速普及到美国家庭，与“从1924年几乎没有到1930年近一半”的数据对比呼应，体现消费端的 adoption 过程。',
          },
        ],
      },
      {
        id: 'chapter13-cloze1',
        title: '完形填空 13',
        description: '关于性别寿命差异与进化理论的完形填空',
        type: 'cloze',
        questions: [
          {
            id: 'c13-1',
            type: 'cloze',
            text: 'But one striking piece of inequality has been (95)_____: lifespan.',
            textCN: '但有一项显著的不平等被(95)_____：寿命。',
            options: [
              { id: 'c13-1-A', text: 'overlooked', textCN: '忽视' },
              { id: 'c13-1-B', text: 'noticed', textCN: '注意到' },
              { id: 'c13-1-C', text: 'discussed', textCN: '讨论' },
              { id: 'c13-1-D', text: 'solved', textCN: '解决' },
            ],
            correctOptionId: 'c13-1-A',
            explanation:
              '“overlooked”意为“忽视”，与“女权主义者有诸多抱怨但忽略寿命差异”的转折关系呼应，突出该不平等未被重视。',
          },
          {
            id: 'c13-2',
            type: 'cloze',
            text: 'In this area, women have the (96)_____ hand.',
            textCN: '在这一领域，女性拥有(96)_____。',
            options: [
              { id: 'c13-2-A', text: 'upper', textCN: '优势' },
              { id: 'c13-2-B', text: 'lower', textCN: '劣势' },
              { id: 'c13-2-C', text: 'same', textCN: '相同' },
              { id: 'c13-2-D', text: 'small', textCN: '小' },
            ],
            correctOptionId: 'c13-2-A',
            explanation:
              '“upper hand”为固定搭配，意为“优势”，指女性在寿命上比男性更长，符合全球范围内的普遍现象。',
          },
          {
            id: 'c13-3',
            type: 'cloze',
            text: 'Why they should do so is not (97)_____ obvious.',
            textCN: '为何如此并非(97)_____显而易见。',
            options: [
              { id: 'c13-3-A', text: 'immediately', textCN: '立即' },
              { id: 'c13-3-B', text: 'never', textCN: '从未' },
              { id: 'c13-3-C', text: 'always', textCN: '总是' },
              { id: 'c13-3-D', text: 'surprisingly', textCN: '令人惊讶地' },
            ],
            correctOptionId: 'c13-3-A',
            explanation:
              '“immediately”意为“立即”，说明寿命差异的原因并非一眼可见，需要进一步分析，与后文探讨理论形成逻辑衔接。',
          },
          {
            id: 'c13-4',
            type: 'cloze',
            text: 'But the same is true in many other (98)_____ from lions to antelope.',
            textCN: '但同样的情况在许多其他(98)_____中也存在，从狮子到羚羊。',
            options: [
              { id: 'c13-4-A', text: 'species', textCN: '物种' },
              { id: 'c13-4-B', text: 'countries', textCN: '国家' },
              { id: 'c13-4-C', text: 'families', textCN: '家庭' },
              { id: 'c13-4-D', text: 'groups', textCN: '群体' },
            ],
            correctOptionId: 'c13-4-A',
            explanation:
              '“species”意为“物种”，与“狮子、羚羊”等举例呼应，说明性别寿命差异在多种动物中普遍存在，扩大论述范围。',
          },
          {
            id: 'c13-5',
            type: 'cloze',
            text: 'One theory is that males must (99)_____ for female attention.',
            textCN: '一种理论认为雄性必须(99)_____雌性的关注。',
            options: [
              { id: 'c13-5-A', text: 'compete', textCN: '竞争' },
              { id: 'c13-5-B', text: 'wait', textCN: '等待' },
              { id: 'c13-5-C', text: 'ask', textCN: '询问' },
              { id: 'c13-5-D', text: 'pay', textCN: '支付' },
            ],
            correctOptionId: 'c13-5-A',
            explanation:
              '“compete”意为“竞争”，指雄性为求偶而竞争，与后文“雌性不受此压力”形成对比，符合进化生物学中的性选择理论。',
          },
          {
            id: 'c13-6',
            type: 'cloze',
            text: 'the effect will be especially (100)_____ in those varieties.',
            textCN: '这种效应在那些物种中会特别(100)_____。',
            options: [
              { id: 'c13-6-A', text: 'evident', textCN: '明显' },
              { id: 'c13-6-B', text: 'weak', textCN: '微弱' },
              { id: 'c13-6-C', text: 'strange', textCN: '奇怪' },
              { id: 'c13-6-D', text: 'funny', textCN: '有趣' },
            ],
            correctOptionId: 'c13-6-A',
            explanation:
              '“evident”意为“明显”，指雄性竞争越激烈的物种，寿命差异越显著，与“反之则减弱”的逻辑对应，体现理论的可验证性。',
          },
          {
            id: 'c13-7',
            type: 'cloze',
            text: "an animal's (101)_____ lifespan is set by how long it can escape predation.",
            textCN: '动物的(101)_____寿命由其能避免被捕食的时间决定。',
            options: [
              { id: 'c13-7-A', text: 'maximum', textCN: '最大' },
              { id: 'c13-7-B', text: 'average', textCN: '平均' },
              { id: 'c13-7-C', text: 'minimum', textCN: '最小' },
              { id: 'c13-7-D', text: 'ideal', textCN: '理想' },
            ],
            correctOptionId: 'c13-7-A',
            explanation:
              '“maximum”意为“最大”，指物种的最长寿命由环境威胁决定，与“进化分配资源”的论述一致，强调生存压力对寿命的限制。',
          },
          {
            id: 'c13-8',
            type: 'cloze',
            text: 'damaging (102)_____ by others of its kind.',
            textCN: '同类间的破坏性(102)_____。',
            options: [
              { id: 'c13-8-A', text: 'aggression', textCN: '攻击' },
              { id: 'c13-8-B', text: 'help', textCN: '帮助' },
              { id: 'c13-8-C', text: 'cooperation', textCN: '合作' },
              { id: 'c13-8-D', text: 'communication', textCN: '交流' },
            ],
            correctOptionId: 'c13-8-A',
            explanation:
              '“aggression”意为“攻击”，与“捕食、疾病、事故”并列，指同类间的伤害也是影响寿命的环境威胁因素，符合生物学语境。',
          },
          {
            id: 'c13-9',
            type: 'cloze',
            text: 'Those resources should be (103)_____ to reproduction.',
            textCN: '这些资源应被(103)_____于繁殖。',
            options: [
              { id: 'c13-9-A', text: 'devoted', textCN: '投入' },
              { id: 'c13-9-B', text: 'wasted', textCN: '浪费' },
              { id: 'c13-9-C', text: 'stolen', textCN: '偷窃' },
              { id: 'c13-9-D', text: 'saved', textCN: '节省' },
            ],
            correctOptionId: 'c13-9-A',
            explanation:
              '“devoted”意为“投入”，指当生存威胁大时，生物会将资源优先用于繁殖而非长寿，符合“自然选择”的进化逻辑。',
          },
          {
            id: 'c13-10',
            type: 'cloze',
            text: 'the more (104)_____ the outside world is, the shorter the lifespan.',
            textCN: '外界越(104)_____，寿命越短。',
            options: [
              { id: 'c13-10-A', text: 'threatening', textCN: '危险' },
              { id: 'c13-10-B', text: 'safe', textCN: '安全' },
              { id: 'c13-10-C', text: 'beautiful', textCN: '美丽' },
              { id: 'c13-10-D', text: 'peaceful', textCN: '和平' },
            ],
            correctOptionId: 'c13-10-A',
            explanation:
              '“threatening”意为“危险”，与“寿命越短”形成因果关系，总结生存环境威胁程度与寿命的负相关，呼应前文理论。',
          },
        ],
      },
    ],
  },
  {
    id: 'chapter4',
    title: '第4套题',
    description: '包含阅读理解和完形填空',
    questionSets: [
      {
        id: 'chapter1-reading1',
        title: '阅读理解 1',
        description: '关于百事公司产品政策调整的阅读理解',
        type: 'reading',
        article: {
          id: 'article1',
          title: "PepsiCo's Policy Change",
          titleCN: '百事公司的政策变化',
          content: `PepsiCo is to spend billions of dollars to develop drinks and snacks and reformulate existing ones with lower sugar, salt and fat, as consumers demand healthier options and regulatory pressure intensifies amid an obesity epidemic.
The maker of Mountain Dew and Gatorade has been one of the earlier movers in the industry to offer products with reduced levels of unhealthy ingredients—PepsiCo claims a packet of its chips now contains less salt than a slice of white bread. However, its new 10-year plan makes clear it believes it still has a long way to go.
Shifting eating habits, including a sharp drop in consumption of sparkling drinks, have forced radical change on the industry. But those shifts have yet to be reflected in record obesity levels, which stand at 36.5% overall in the US.
Indra Nooyi, PepsiCo chairman, said the plan to make its products healthier was important for the company's growth. But on the subject of obesity, she pointed out that consumers' lifestyles have changed significantly, with many people being more sedentary not least because more time is spent in front of computers. She said PepsiCo's contribution was to produce healthier snacks that still tasted good.
"Society has to change its habits," she added. "We can't do much to alter sedentary lifestyles, but we can provide consumers with great-tasting products, low in salt, sugar and fat. In the past we had to have a taste trade-off. But we're breaking that trade-off."
PepsiCo's plan for its foods and drinks is based on guidelines from the World Health Organisation, which last week backed using taxes on sparkling drinks to reduce sugar consumption. Initiatives also include efforts to reduce its environmental impact, water consumption and materials used in packaging by 2025.
PepsiCo did not say exactly how much it planned to invest to reach its goals. However, Dr Mehmood Khan, chief scientific officer, said the company had doubled research and development spending in the past five years and was "committed to sustaining investment", adding that companies cannot cost-cut their way to increasing sales. PepsiCo's research and development budget in 2015 was $754 million.`,
          contentCN: `百事公司将花费数十亿美元开发饮料和零食，并重新配方现有产品，降低糖、盐和脂肪含量，因为消费者需要更健康的选择，且在肥胖症流行的背景下监管压力加大。
激浪和佳得乐的制造商是该行业较早行动的企业之一，提供不健康成分含量较低的产品——百事公司称其一包薯片现在含有的盐比一片白面包还少。然而，其新的10年计划明确表明，它认为自己还有很长的路要走。
饮食习惯的改变，包括汽水消费量的大幅下降，迫使该行业发生了根本性的变化。但这些变化尚未反映在创纪录的肥胖水平上，美国的肥胖率总体达到36.5%。
百事公司董事长英德拉·努伊表示，使产品更健康的计划对公司的发展很重要。但在肥胖问题上，她指出消费者的生活方式发生了很大变化，许多人久坐不动，尤其是因为花在电脑前的时间更多。她说百事公司的贡献是生产出仍然美味的更健康的零食。
“社会必须改变其习惯，”她补充道。“我们无法对久坐不动的生活方式做太多改变，但我们可以为消费者提供美味的产品，低盐、低糖和低脂肪。过去我们必须在口味上做出权衡。但我们正在打破这种权衡。”
百事公司的食品和饮料计划基于世界卫生组织的指导方针，该组织上周支持对汽水征税以减少糖的消费。举措还包括到2025年努力减少其对环境的影响、用水量和包装材料的使用。
百事公司没有确切说明为实现其目标计划投资多少。然而，首席科学官梅赫穆德·汗博士表示，该公司在过去五年中研发支出翻了一番，并“致力于持续投资”，并补充说公司不能通过削减成本来增加销售额。百事公司2015年的研发预算为7.54亿美元。`,
        },
        questions: [
          {
            id: 'q1-1',
            type: 'reading',
            text: 'Why is PepsiCo making a policy change?',
            textCN: '百事公司为什么要进行政策改变？',
            options: [
              {
                id: 'q1-1-A',
                text: 'To win support from the federal government.',
                textCN: '为了赢得联邦政府的支持。',
              },
              {
                id: 'q1-1-B',
                text: 'To be more competitive in the global market.',
                textCN: '为了在全球市场更具竞争力。',
              },
              {
                id: 'q1-1-C',
                text: 'To satisfy the growing needs for healthy foods.',
                textCN: '为了满足对健康食品日益增长的需求。',
              },
              {
                id: 'q1-1-D',
                text: 'To invest more wisely in the soft drink industry.',
                textCN: '为了在软饮料行业更明智地投资。',
              },
            ],
            correctOptionId: 'q1-1-C',
            explanation:
              '文章第一句提到‘PepsiCo is to spend billions of dollars to develop drinks and snacks and reformulate existing ones with lower sugar, salt and fat, as consumers demand healthier options and regulatory pressure intensifies amid an obesity epidemic.’说明百事公司政策改变是因为消费者对健康食品有需求。',
          },
          {
            id: 'q1-2',
            type: 'reading',
            text: 'Why does PepsiCo plan to alter its products, according to Indra Nooyi?',
            textCN: '根据英德拉·努伊的说法，百事公司为什么计划改变其产品？',
            options: [
              {
                id: 'q1-2-A',
                text: "To ensure the company's future development.",
                textCN: '为了确保公司的未来发展。',
              },
              {
                id: 'q1-2-B',
                text: "To adapt to its customers' changed taste.",
                textCN: '为了适应其客户变化的口味。',
              },
              {
                id: 'q1-2-C',
                text: "To help improve its consumers' lifestyles.",
                textCN: '为了帮助改善其消费者的生活方式。',
              },
              {
                id: 'q1-2-D',
                text: 'To break the trade -off in its product design.',
                textCN: '为了打破其产品设计中的权衡。',
              },
            ],
            correctOptionId: 'q1-2-A',
            explanation:
              "文中提到‘PepsiCo chairman, said the plan to make its products healthier was important for the company's growth.’说明改变产品是为了公司未来发展。",
          },
          {
            id: 'q1-3',
            type: 'reading',
            text: 'What does PepsiCo think it will have to do in the future?',
            textCN: '百事公司认为它未来必须做什么？',
            options: [
              {
                id: 'q1-3-A',
                text: 'Invest more to develop new snacks.',
                textCN: '投入更多资金开发新零食。',
              },
              {
                id: 'q1-3-B',
                text: 'Reduce levels of obesity in the US.',
                textCN: '降低美国的肥胖水平。',
              },
              {
                id: 'q1-3-C',
                text: "Change consumers' eating habits.",
                textCN: '改变消费者的饮食习惯。',
              },
              {
                id: 'q1-3-D',
                text: 'Keep on improving its products.',
                textCN: '继续改进其产品。',
              },
            ],
            correctOptionId: 'q1-3-D',
            explanation:
              '从文中百事公司的举措以及相关表述可知，其会继续改进产品，如开发和重新配方产品等。',
          },
          {
            id: 'q1-4',
            type: 'reading',
            text: 'What does Indra Nooyi say about the obesity epidemic?',
            textCN: '英德拉·努伊对肥胖流行有什么看法？',
            options: [
              {
                id: 'q1-4-A',
                text: 'It is mainly caused by overconsumption of snacks.',
                textCN: '它主要是由零食消费过量引起的。',
              },
              {
                id: 'q1-4-B',
                text: 'It results from high sugar and salt consumption.',
                textCN: '它是由高糖和高盐消费导致的。',
              },
              {
                id: 'q1-4-C',
                text: "It is attributable to people's changed lifestyles.",
                textCN: '它归因于人们生活方式的改变。',
              },
              {
                id: 'q1-4-D',
                text: 'It has a lot to do with longer working hours.',
                textCN: '它与更长的工作时间有很大关系。',
              },
            ],
            correctOptionId: 'q1-4-C',
            explanation:
              "文中提到‘But on the subject of obesity, she pointed out that consumers' lifestyles have changed significantly, with many people being more sedentary not least because more time is spent in front of computers.’说明她认为肥胖流行归因于生活方式改变。",
          },
          {
            id: 'q1-5',
            type: 'reading',
            text: 'What has PepsiCo been doing to achieve its objective?',
            textCN: '百事公司为实现其目标一直在做什么？',
            options: [
              {
                id: 'q1-5-A',
                text: "Studying WHO's guidelines.",
                textCN: '研究世界卫生组织的指导方针。',
              },
              {
                id: 'q1-5-B',
                text: 'Increasing its research funding.',
                textCN: '增加其研发资金。',
              },
              {
                id: 'q1-5-C',
                text: 'Expanding its market overseas.',
                textCN: '拓展其海外市场。',
              },
              {
                id: 'q1-5-D',
                text: 'Cutting its production costs.',
                textCN: '削减其生产成本。',
              },
            ],
            correctOptionId: 'q1-5-B',
            explanation: `文中提到‘Dr Mehmood Khan, chief scientific officer, said the company had doubled research and development spending in the past five years and was "committed to sustaining investment"’说明百事公司通过增加研发资金来实现目标。`,
          },
        ],
      },
      {
        id: 'chapter1-reading1',
        title: '阅读理解 1',
        description: '关于情人节的阅读理解',
        type: 'reading',
        article: {
          id: 'article1',
          title: "Valentine's Day",
          titleCN: '情人节',
          content: `February 14th is a complicated but interesting holiday. First of all, Valentine's Day is not a holiday from work. No one gets a day off. On Valentine's Day people usually send romantic cards to someone they love or want to be loved. The cards are called“valentines”. They are very colorful, often decorated with hearts, flowers or birds, and have humorous or loving words printed inside. The basic message is always “Be My Valentine”, “Be MY Sweet Heart” or “Lover”. A valentine may be anonymous(匿名的) and is sometimes signed, “Guess who”. The person receiving it has to guess who sent it. This can lead to interesting speculation（揣测）. And that's half the fun of valentines.
The loving message might be carried by a heart-shaped box of chocolate candies, or by a bunch of flowers tied with red ribbon. But in whatever form, the message is the same ---“Will you be my valentine?”
One of the symbols of St. Valentine's Day is the Roman god of Love, called Cupid. Cupid is often pictured on the card, as a winged infant not wearing any clothes, ready to shoot his arrow into a heart. He would shoot an arrow of love into a person's heart to make the person fall in love immediately, maybe with the first person to come along. Sometimes one arrow would go through two hearts, holding them together. On February 14th not only do we have pictures of the non-Christian Cupid, the Roman god of love but we also have pictures of the Christian St. Valentine.
It is from the Christians that we get the stories about Valentine's Day that most people have come to believe. One story is about a Christian man whose name sounded something like “Valentine”. He lived around 250 A.D. At that time the Roman Emperor Claudius refused to allow any Roman soldiers to get married for any reason whatsoever. Christian couples came to Valentine to be married, so Valentine would marry them in a Christian way. He was discovered and put in prison by the Emperor. One tradition says that he wrote notes to his friends by making on leaves and then throwing them out the window of his prison. The leaves were shaped like a heart.`,
          contentCN: `2月14日是一个复杂但有趣的节日。首先，情人节不是工作日放假的节日。没有人会放假。在情人节，人们通常会给他们爱或想要被爱的人寄浪漫的卡片。这些卡片被称为“情人节卡片”。它们色彩鲜艳，常常装饰有心形、花朵或鸟类，并印有幽默或爱意的话语。基本信息总是“做我的情人”、“做我的甜心”或“爱人”。情人节卡片可能是匿名的，有时会署名“猜猜是谁”。收到它的人必须猜出是谁寄的。这会引发有趣的猜测。而这也是情人节卡片乐趣的一半。
爱的信息可能会装在一个心形的巧克力糖果盒里，或者用红色丝带系着的一束花来传递。但无论以何种形式，信息都是一样的——“你愿意做我的情人吗？”
圣瓦伦丁节的象征之一是罗马爱神丘比特。丘比特经常被画在卡片上，是一个没有穿衣服的有翅膀的婴儿，准备把他的箭射进一颗心里。他会把一支爱之箭射进一个人的心里，让这个人立刻坠入爱河，也许是和第一个出现的人。有时一支箭会穿过两颗心，把它们连在一起。在2月14日，我们不仅有非基督教的爱神丘比特的画像，还有基督教的圣瓦伦丁的画像。
我们从基督教徒那里得到了大多数人所相信的关于情人节的故事。一个故事是关于一个名字听起来有点像“瓦伦丁”的基督教徒。他生活在公元250年左右。当时，罗马皇帝克劳狄乌斯以任何理由都拒绝允许任何罗马士兵结婚。基督教夫妇来找瓦伦丁结婚，所以瓦伦丁会以基督教的方式为他们主持婚礼。他被皇帝发现并关进了监狱。一个传统说法是，他在树叶上写字，然后从监狱的窗户扔出去给他的朋友们。树叶的形状像一颗心。`,
        },
        questions: [
          {
            id: 'q1-1',
            type: 'reading',
            text: 'Judging from the context, what happens on February 14th?',
            textCN: '从上下文判断，2月14日会发生什么？',
            options: [
              {
                id: 'q1-1-A',
                text: 'People get a day off.',
                textCN: '人们放假一天。',
              },
              {
                id: 'q1-1-B',
                text: 'People usually send romantic cards.',
                textCN: '人们通常会寄浪漫的卡片。',
              },
              {
                id: 'q1-1-C',
                text: 'People make new friends by sending cards.',
                textCN: '人们通过寄卡片结交新朋友。',
              },
              {
                id: 'q1-1-D',
                text: 'People visit their relatives.',
                textCN: '人们拜访他们的亲戚。',
              },
            ],
            correctOptionId: 'q1-1-B',
            explanation:
              "文章提到“On Valentine's Day people usually send romantic cards to someone they love or want to be loved.”，说明2月14日人们通常会寄浪漫卡片。",
          },
          {
            id: 'q1-2',
            type: 'reading',
            text: "According to the text, what is half the fun of Valentine's Day?",
            textCN: '根据文章，情人节乐趣的一半是什么？',
            options: [
              {
                id: 'q1-2-A',
                text: "Receiving the Valentine's card.",
                textCN: '收到情人节卡片。',
              },
              {
                id: 'q1-2-B',
                text: "Guessing who sends the Valentine's card to you.",
                textCN: '猜测是谁给你寄情人节卡片。',
              },
              {
                id: 'q1-2-C',
                text: 'Having a wonderful dinner.',
                textCN: '享用一顿丰盛的晚餐。',
              },
              {
                id: 'q1-2-D',
                text: 'Spending time with your lover.',
                textCN: '和你的爱人在一起。',
              },
            ],
            correctOptionId: 'q1-2-B',
            explanation:
              "文中提到“A valentine may be anonymous(匿名的) and is sometimes signed, “Guess who”. The person receiving it has to guess who sent it. This can lead to interesting speculation（揣测）. And that's half the fun of valentines.”，可知情人节乐趣的一半是猜测是谁寄的卡片。",
          },
          {
            id: 'q1-3',
            type: 'reading',
            text: 'What do the loving messages have in common?',
            textCN: '爱的信息有什么共同之处？',
            options: [
              { id: 'q1-3-A', text: 'Love.', textCN: '爱。' },
              { id: 'q1-3-B', text: 'Friendship.', textCN: '友谊。' },
              { id: 'q1-3-C', text: 'Congratulations.', textCN: '祝贺。' },
              { id: 'q1-3-D', text: 'Greetings.', textCN: '问候。' },
            ],
            correctOptionId: 'q1-3-A',
            explanation:
              '文章说“The loving message might be carried by a heart-shaped box of chocolate candies, or by a bunch of flowers tied with red ribbon. But in whatever form, the message is the same ---“Will you be my valentine?””，所以爱的信息共同点是爱。',
          },
          {
            id: 'q1-4',
            type: 'reading',
            text: 'What does Cupid look like?',
            textCN: '丘比特长什么样？',
            options: [
              {
                id: 'q1-4-A',
                text: 'Cupid is a handsome man with brown eyes.',
                textCN: '丘比特是一个有着棕色眼睛的英俊男人。',
              },
              {
                id: 'q1-4-B',
                text: 'Cupid is female angel.',
                textCN: '丘比特是女天使。',
              },
              {
                id: 'q1-4-C',
                text: 'Cupid is an infant with a pair of wings, not wearing anything.',
                textCN: '丘比特是一个有一对翅膀、没穿衣服的婴儿。',
              },
              {
                id: 'q1-4-D',
                text: 'Cupid is one of the symbols of St. Valentine’s Day, the Roman god of Love.',
                textCN: '丘比特是圣瓦伦丁节的象征之一，罗马爱神。',
              },
            ],
            correctOptionId: 'q1-4-C',
            explanation:
              '文中提到“Cupid is often pictured on the card, as a winged infant not wearing any clothes, ready to shoot his arrow into a heart.”，可知丘比特是有翅膀、没穿衣服的婴儿。',
          },
          {
            id: 'q1-5',
            type: 'reading',
            text: 'What do we know from the fourth paragraph?',
            textCN: '我们从第四段知道了什么？',
            options: [
              {
                id: 'q1-5-A',
                text: "The story about the origin of Valentine's Day.",
                textCN: '关于情人节起源的故事。',
              },
              {
                id: 'q1-5-B',
                text: "The way couples celebrate Valentine's Day.",
                textCN: '情侣庆祝情人节的方式。',
              },
              {
                id: 'q1-5-C',
                text: 'The reason why people use a heart-shaped box of chocolate candies.',
                textCN: '人们使用心形巧克力糖果盒的原因。',
              },
              {
                id: 'q1-5-D',
                text: 'The way people show their love to others.',
                textCN: '人们向他人表达爱的方式。',
              },
            ],
            correctOptionId: 'q1-5-A',
            explanation:
              '第四段主要讲述了情人节起源的故事，提到了一个叫瓦伦丁的基督教徒为情侣主持婚礼而被皇帝关进监狱等情节。',
          },
        ],
      },
      {
        id: 'chapter1-reading1',
        title: '阅读理解 1',
        description: '关于学生心理健康问题及应对措施的阅读理解',
        type: 'reading',
        article: {
          id: 'article1',
          title: 'Mental Health Problems among Students',
          titleCN: '学生心理健康问题',
          content: `Three children in every classroom have a diagnosable mental health condition. Half of these are behavioral disorders, while one third are emotional disorders such as stress, anxiety and depression, which often become outwardly apparent through self-harm. There was an astonishing 52 per cent jump in hospital admissions for children and young people who had harmed themselves between 2009 and 2015.
Schools and teachers have consistently reported the scale of the problem since 2009. Last year, over half of teachers reported that more of their pupils experience mental health problems than in the past. But teachers also consistently report how ill-equipped they feel to meet pupils' mental health needs, and often cite a lack of training, expertise and support from the National Health Service (英国国家医疗服务体系).
Part of the reason for the increased pressure on schools is that there are now fewer 'early intervention (干预)' and low-level mental health services based in the community. Cuts to local authority budgets since 2010 have resulted in a significant decline of these services, despite strong evidence of their effectiveness in preventing crises further down the line.
The only way to break the pressures on both mental health services and schools is to reinvest in early intervention services inside schools.
There are strong arguments for why schools are best placed to provide metal health services. Schools see young people more than any other service, which gives them a unique ability to get to hard-to-reach children and young people and build meaningful relationships with them over time. Recent studies have shown that children and young people largely prefer to see a counsellor in school rather than in an outside environment. young people have reported that for low-level conditions such as stress and anxiety, a clinical setting can sometimes be daunting (令人却步的).
There are already examples of innovative schools which combine mental health and wellbeing provision with a strong academic curriculum. This• will, though, require a huge cultural shift. Politicians, policymakers, commissioners and school leaders must be brave enough to make the leap towards reimagining schools as providers of health as well as education services.`,
          contentCN: `每个教室里有三个孩子被诊断出患有心理健康问题。其中一半是行为障碍，而三分之一是情绪障碍，如压力、焦虑和抑郁，这些往往通过自我伤害而明显表现出来。在2009年至2015年期间，因自我伤害而住院的儿童和年轻人人数惊人地跃升了52%。
自2009年以来，学校和教师一直在持续报告这个问题的规模。去年，超过一半的教师报告说，他们的学生中经历心理健康问题的比过去更多。但教师们也一直报告说，他们觉得自己在满足学生心理健康需求方面能力不足，并且经常提到缺乏英国国家医疗服务体系的培训、专业知识和支持。
学校压力增加的部分原因是，现在社区中基于“早期干预”和低水平心理健康服务的数量减少了。自2010年以来地方当局预算的削减导致了这些服务的大幅下降，尽管有强有力的证据表明它们在预防危机方面的有效性。
打破心理健康服务和学校压力的唯一方法是对学校内部的早期干预服务进行再投资。
有充分的理由说明为什么学校最适合提供心理健康服务。学校比任何其他服务机构都更经常地接触年轻人，这使它们有独特的能力接触到难以接触到的儿童和年轻人，并随着时间的推移与他们建立有意义的关系。最近的研究表明，儿童和年轻人在很大程度上更喜欢在学校里看辅导员，而不是在外部环境中。年轻人报告说，对于压力和焦虑等低水平状况，临床环境有时可能会令人生畏。
已经有一些创新学校的例子，它们将心理健康和幸福保障与强大的学术课程相结合。然而，这将需要巨大的文化转变。政治家、政策制定者、专员和学校领导必须有足够的勇气朝着将学校重新想象为健康和教育服务提供者的方向迈进。`,
        },
        questions: [
          {
            id: 'q1-1',
            type: 'reading',
            text: 'What are teachers complaining about?',
            textCN: '老师们在抱怨什么？',
            options: [
              {
                id: 'q1-1-A',
                text: 'There are too many students requiring special attention.',
                textCN: '有太多需要特别关注的学生。',
              },
              {
                id: 'q1-1-B',
                text: 'They are under too much stress counselling needy students.',
                textCN: '他们在辅导需要关爱的学生方面承受了太大的压力。',
              },
              {
                id: 'q1-1-C',
                text: 'Schools are inadequately equipped to implement any intervention.',
                textCN: '学校没有足够的能力来实施任何干预措施。',
              },
              {
                id: 'q1-1-D',
                text: "They lack the necessary resources to address pupils' mental problems.",
                textCN: '他们缺乏解决学生心理问题的必要资源。',
              },
            ],
            correctOptionId: 'q1-1-D',
            explanation:
              '文中提到But teachers also consistently report how ill-equipped they feel to meet pupils’ mental health needs, and often cite a lack of training, expertise and support from the National Health Service (英国国家医疗服务体系），说明老师们抱怨的是他们缺乏解决学生心理问题的必要资源',
          },
          {
            id: 'q1-2',
            type: 'reading',
            text: 'What do we learn from the passage about community health services in Britain?',
            textCN: '我们从这篇关于英国社区卫生服务的文章中学到了什么？',
            options: [
              {
                id: 'q1-2-A',
                text: 'They have deteriorated due to budget cuts.',
                textCN: '由于预算削减，它们情况恶化了。',
              },
              {
                id: 'q1-2-B',
                text: "They facilitate local residents' everyday lives.",
                textCN: '它们方便了当地居民的日常生活。',
              },
              {
                id: 'q1-2-C',
                text: 'They prove ineffective in helping mental patients.',
                textCN: '事实证明，它们在帮助有心理问题的病人方面是无效的。',
              },
              {
                id: 'q1-2-D',
                text: 'They cover preventative care for the local residents.',
                textCN: '社区问世服务包括对当地居民的预防性护理',
              },
            ],
            correctOptionId: 'q1-2-A',
            explanation:
              '文中提到Cuts to local authority budgets since 2010 have resulted in a significant decline of these services，说明由于预算削减，社区卫生服务情况恶化了',
          },
          {
            id: 'q1-3',
            type: 'reading',
            text: 'Where does the author suggest mental health services be placed?',
            textCN: '作者建议在哪里提供精神健康服务？',
            options: [
              { id: 'q1-3-A', text: 'At home.', textCN: '在家。' },
              { id: 'q1-3-B', text: 'At school.', textCN: '在学校。' },
              { id: 'q1-3-C', text: 'In hospitals.', textCN: '在医院。' },
              { id: 'q1-3-D', text: 'In communities.', textCN: '在社区。' },
            ],
            correctOptionId: 'q1-3-B',
            explanation:
              '文中提到Recent studies have shown that children and young people largely prefer to see a counsellor in school rather than in an outside environment，说明作者建议在学校提供精神健康服务',
          },
          {
            id: 'q1-4',
            type: 'reading',
            text: 'What do we learn from the recent studies?',
            textCN: '我们可以从最近的研究中学到什么？',
            options: [
              {
                id: 'q1-4-A',
                text: 'Students prefer to rely on peers to relieve stress and anxiety.',
                textCN: '学生更喜欢依靠同龄人来缓解压力和焦虑。',
              },
              {
                id: 'q1-4-B',
                text: 'Young people are keen on building meaningful relationships.',
                textCN: '年轻人热衷于建立有意义的关系。',
              },
              {
                id: 'q1-4-C',
                text: 'Students are more comfortable seeking counselling in school.',
                textCN: '学生在学校寻求辅导更自在。',
              },
              {
                id: 'q1-4-D',
                text: 'Young people benefit from various kinds of outdoor activities.',
                textCN: '年轻人从各种户外活动中受益。',
              },
            ],
            correctOptionId: 'q1-4-C',
            explanation:
              '文中提到Recent studies have shown that children and young people largely prefer to see a counsellor in school rather than in an outside environment. Young people have reported that for low-level conditions such as stress and anxiety, a clinical setting can sometimes be daunting (令人却步的），说明学生在学校寻求辅导更自在',
          },
          {
            id: 'q1-5',
            type: 'reading',
            text: 'What does the author mean by a cultural shift (Para. 6)?',
            textCN: '作者所说的文化转变是什么意思（第六段）？',
            options: [
              {
                id: 'q1-5-A',
                text: "Simplification of schools' academic curriculums.",
                textCN: '简化学校的学术课程。',
              },
              {
                id: 'q1-5-B',
                text: "Parents' involvement in schools' policy-making.",
                textCN: '家长参与学校决策。',
              },
              {
                id: 'q1-5-C',
                text: "A change in teachers' attitudes to mental health.",
                textCN: '老师对心理健康态度的转变。',
              },
              {
                id: 'q1-5-D',
                text: 'A change in the conception of what schools are.',
                textCN: '对学校观念的转变。',
              },
            ],
            correctOptionId: 'q1-5-D',
            explanation:
              '文中提到Politicians, policymakers, commissioners and school leaders must be brave enough to make the leap towards reimagining schools as providers of health as well as education services，说明文化转变是对学校观念的转变',
          },
        ],
      },
      {
        article: {
          content:
            'Apparently everyone knows that global warming only makes climate more extreme. A hot, dry summer has triggered another flood of such claims. And, while many interests are at work, one of the players that benefits the most from this story are the media: the notion of "extreme" climate simply makes for more compelling news.\n\nConsider Paul Krugman, writing breathlessly in The New York Times about the "rising incidence of extreme events." He claims that global warming caused the current drought in America\'s Midwest, and that supposedly record-high corn prices could cause a global food crisis.\n\nBut the United Nations climate panel\'s latest assessment tells us precisely the opposite: For "North America, there is medium confidence that there has been an overall slight tendency towards less dryness." Moreover, there is no way that Krugman could have identified this drought as being caused by global warming without a time machine: Climate models estimate that such detection will be possible by 2048, at the earliest.\n\nAnd, fortunately, this year\'s drought appears unlikely to cause a food crisis, as global rice and wheat supplies remain plentiful. Moreover, Krugman overlooks inflation: Prices have increased six-fold since 1969, so, while corn futures (期货) did set a record of about $8 per bushel (蒲式耳) in late July, the inflation-adjusted price of corn was higher throughout most of the 1970s, reaching $16 in 1974.\n\nFinally, Krugman conveniently forgets that concerns about global warming are the main reason that corn prices have skyrocketed since 2005. Nowadays 40 percent of corn grown in the United States is used to produce ethanol (乙醇), which does absolutely nothing for the climate, but certainly distorts the price of corn—at the expense of many of the world\'s poorest people.\n\nBill McKibben similarly worries in The Guardian about the Midwest drought and corn prices. He confidently tells us that raging wildfires from New Mexico and Colorado to Siberia are "exactly" what the early stages of global warming look like.\n\nIn fact, the latest overview of global wildfire incidence suggests that fire intensity has declined over the past 70 years and is now close to its preindustrial level.\n\nWhen well-meaning campaigners want us to pay attention to global warming, they often end up pitching beyond the facts. And, while this may seem justified by a noble goal, such "policy by panic" tactics rarely work, and often backfire.\n\nRemember how, in the wake of Hurricane Katrina in 2005, Al Gore claimed that we were in store for ever more destructive hurricanes? Since then, hurricane incidence has dropped off the charts. Exaggerated claims merely fuel public distrust and disengagement.\n\nThat is unfortunate, because global warming is a real problem, and we do need to address it.',
          contentCN:
            '显然，每个人都知道全球变暖只会使气候更加极端。炎热干燥的夏天引发了又一波此类说法。而且，虽然有许多利益相关方在起作用，但从这个故事中获益最大的参与者之一是媒体：“极端”气候的概念 simply makes for more compelling news。\n\n以保罗·克鲁格曼为例，他在《纽约时报》上气喘吁吁地写道，“极端事件的发生率不断上升”。他声称全球变暖导致了美国中西部目前的干旱，而且据称创纪录的玉米价格可能引发全球粮食危机。\n\n但联合国气候小组的最新评估告诉我们恰恰相反：对于“北美，有中等信心认为总体上有略微减少干旱的趋势”。此外，如果没有时间机器，克鲁格曼不可能确定这场干旱是由全球变暖引起的：气候模型估计，最早要到2048年才有可能进行这样的探测。\n\n而且，幸运的是，今年的干旱似乎不太可能引发粮食危机，因为全球大米和小麦供应仍然充足。此外，克鲁格曼忽略了通货膨胀：自1969年以来价格已经上涨了六倍，所以，虽然玉米期货在7月下旬确实创下了每蒲式耳约8美元的纪录，但经通货膨胀调整后的玉米价格在20世纪70年代的大部分时间里都更高，在1974年达到了16美元。\n\n最后，克鲁格曼 conveniently forgets 自2005年以来对全球变暖的担忧是玉米价格飙升的主要原因。如今，美国种植的40%的玉米用于生产乙醇，这对气候毫无益处，但肯定扭曲了玉米价格——以世界上许多最贫穷的人为代价。\n\n比尔·麦吉本在《卫报》上同样担心中西部的干旱和玉米价格。他自信地告诉我们，从新墨西哥州和科罗拉多州到西伯利亚的熊熊野火“正是”全球变暖早期阶段的样子。\n\n事实上，关于全球野火发生率的最新综述表明，在过去70年里火灾强度有所下降，现在已接近工业化前的水平。\n\n当善意的活动家希望我们关注全球变暖时，他们往往最终夸大其词。而且，虽然这可能因一个高尚的目标而显得合理，但这种“恐慌政策”策略很少奏效，而且往往适得其反。\n\n还记得2005年卡特里娜飓风过后，阿尔·戈尔声称我们将面临越来越具破坏性的飓风吗？从那时起，飓风发生率已经大幅下降。夸大其词只会加剧公众的不信任和冷漠。\n\n这很不幸，因为全球变暖是一个现实问题，我们确实需要解决它。',
          id: 'article2',
          title: "The Media's Coverage of Extreme Weather and Global Warming",
          titleCN: '媒体对极端天气和全球变暖的报道',
        },
        description: '关于全球变暖与极端天气相关的阅读理解',
        id: 'chapter1-reading2',
        questions: [
          {
            correctOptionId: 'q2-1-A',
            explanation:
              'A)。首段第2句说，从中（根据下文可知，是从极端气候中）获益最大的是媒体，因为极端气候的说法可以制造出更多吸引人的新闻，A项是对本句冒号后的内容的同义转述，故A项为本题答案。其他三项原文中均未提及，故可排除。',
            id: 'q2-1',
            options: [
              {
                id: 'q2-1-A',
                text: "They can attract people's attention to their reports.",
                textCN: '他们可以吸引人们对他们报道的关注。',
              },
              {
                id: 'q2-1-B',
                text: 'They can choose from a greater variety of topics.',
                textCN: '他们可以从更多样化的主题中选择。',
              },
              {
                id: 'q2-1-C',
                text: 'They can make themselves better known.',
                textCN: '他们可以让自己更出名。',
              },
              {
                id: 'q2-1-D',
                text: 'They can give voice to different views.',
                textCN: '他们可以表达不同的观点。',
              },
            ],
            text: 'In what way do the media benefit from extreme weather?',
            textCN: '媒体从极端天气中以何种方式受益？',
            type: 'reading',
          },
          {
            correctOptionId: 'q2-2-D',
            explanation:
              'D)。第2段提到保罗•克鲁格曼关于极端天气的言论，第3段对其言论进行了分析，指出联合国气候委员会的评估认为情况与克鲁格曼所说的可能正好相反，接着第3段第3句指出，在没有时间机器的情况下（原本就不可能有时间机器），克鲁格曼根本不可能确定这种干旱是由全球变暖引起的，由此可见，作者认为克鲁格曼的言论根本不可能被证实，故D项符合文意。文中第3段第3句说，没有时间机器克鲁格曼根本不可能确定这种干旱是由全球变暖引起的，作者其实是想说因为根本不可能有时间机器，所以克鲁格曼也无从得知干旱是由全球变暖引起的，A项显然曲解了原文。B项是由文中的Climate models设置的干扰项。文中说，这种结论最早也要到2048年才能被证实，表示一种假设状态，而不是说2048年就能被证实，故C项不符合文意，予以排除。',
            id: 'q2-2',
            options: [
              {
                id: 'q2-2-A',
                text: 'A time machine is needed to testify to its truth.',
                textCN: '需要一台时间机器来证明其真实性。',
              },
              {
                id: 'q2-2-B',
                text: 'It is based on an erroneous climate model.',
                textCN: '它基于一个错误的气候模型。',
              },
              {
                id: 'q2-2-C',
                text: 'It will eventually get proof in 2048.',
                textCN: '它最终将在2048年得到证明。',
              },
              {
                id: 'q2-2-D',
                text: 'There is no way to prove its validity.',
                textCN: '没有办法证明其有效性。',
              },
            ],
            text: "What is the author's comment on Krugman's claim about the current drought in America's Midwest?",
            textCN: '作者对克鲁格曼关于美国中西部当前干旱的说法有何评论？',
            type: 'reading',
          },
          {
            correctOptionId: 'q2-3-B',
            explanation:
              'B)。第5段说，对全球气候变暖的担心是自2005年以来谷物价格飞涨的主要原因，因为正是由于这种担心才促使人们将40%的玉米用来生产乙醇，从而扭曲了玉米的价格，B项是对文中40 percent of corn grown… is used to produce ethanol的同义转述，故B项为本题答案。文中并没有提到发展中国家的粮食需求增加，故A项的说法没有依据。文中第4段首句提到，全球大米和小麦依旧供应充足，由此可见粮食产量并没有下降，故C项的说法与原文不符，予以排除。D项是将文中的inflation, skyrocketed等信息进行拼凑设置的干扰项。',
            id: 'q2-3',
            options: [
              {
                id: 'q2-3-A',
                text: 'Demand for food has been rising in the developing countries.',
                textCN: '发展中国家对粮食的需求一直在增加。',
              },
              {
                id: 'q2-3-B',
                text: 'A considerable portion of corn is used to produce green fuel.',
                textCN: '相当一部分玉米被用于生产绿色燃料。',
              },
              {
                id: 'q2-3-C',
                text: 'Climate change has caused corn yields to drop markedly.',
                textCN: '气候变化导致玉米产量大幅下降。',
              },
              {
                id: 'q2-3-D',
                text: 'Inflation rates have been skyrocketing since the 1970s.',
                textCN: '自20世纪70年代以来，通货膨胀率一直在飙升。',
              },
            ],
            text: 'What is the chief reason for the rise in corn prices according to the author?',
            textCN: '根据作者的说法，玉米价格上涨的主要原因是什么？',
            type: 'reading',
          },
          {
            correctOptionId: 'q2-4-C',
            explanation:
              'C)。第7段说，有关全球森林大火发生率的最新综述显示，在过去的70年里，火灾强度下降了，而且目前已接近工业化之前的水平；C项中的has dropped对应文中的has declined，另外，has dropped greatly是对is now close to its preindustrial level的概括，故C项符合文意。文中第7段说，在过去的70年里火灾强度下降了，由此可见，A项的说法与原文正好相反，予以排除。B项属于张冠李戴，将比尔•麦吉本的看法说成是作者的看法。D项是将保罗•克鲁格曼所认为与气候变暖有关的干旱错误地与森林火灾联系起来，属于理解混乱，故排除。',
            id: 'q2-4',
            options: [
              {
                id: 'q2-4-A',
                text: 'It has got worse with the rise in extreme weathers.',
                textCN: '随着极端天气的增加，情况变得更糟。',
              },
              {
                id: 'q2-4-B',
                text: 'It signals the early stages of global warming.',
                textCN: '它标志着全球变暖的早期阶段。',
              },
              {
                id: 'q2-4-C',
                text: 'It has dropped greatly.',
                textCN: '它大幅下降了。',
              },
              {
                id: 'q2-4-D',
                text: 'It is related to drought.',
                textCN: '它与干旱有关。',
              },
            ],
            text: 'What does the author say about global wildfire incidence over the past 70 years?',
            textCN: '作者对过去70年全球野火发生率有何看法？',
            type: 'reading',
          },
          {
            correctOptionId: 'q2-5-B',
            explanation:
              'B)。第9段末句指出，夸大其词（exaggerated claims）只会加重公众的不信任感和疏离感；接着第10段承接上段指出，那是不幸的（that is unfortunate），因为全球变暖是一个真实存在的问题，需要解决。that即指上段末提到的Exaggerated claims带来的负面影响，由此可知夸大其词对于全球变暖问题来说是不幸的，即不利于解决全球变暖问题，故答案为B项。文中第8段末句说，这种“恐慌政策”的策略几乎不会起到什么作用，可见，“恐慌政策”并不能提高公众意识，故排除A项。文中第9段末句说，夸大其词会积聚公众的不信任感，但并没有说是对科学的不信任，C项属于过度理解，故排除。D项的说法毫无依据，也应排除。',
            id: 'q2-5',
            options: [
              {
                id: 'q2-5-A',
                text: 'They are strategies to raise public awareness.',
                textCN: '它们是提高公众意识的策略。',
              },
              {
                id: 'q2-5-B',
                text: 'They do a disservice to addressing the problem.',
                textCN: '它们对解决问题没有帮助。',
              },
              {
                id: 'q2-5-C',
                text: 'They aggravate public distrust about science.',
                textCN: '它们加剧了公众对科学的不信任。',
              },
              {
                id: 'q2-5-D',
                text: 'They create confusion about climate change.',
                textCN: '它们造成了对气候变化的困惑。',
              },
            ],
            text: 'What does the author think of the exaggerated claims in the media about global warming?',
            textCN: '作者对媒体关于全球变暖的夸大说法有何看法？',
            type: 'reading',
          },
        ],
        title: '阅读理解 2',
        type: 'reading',
      },
      {
        article: {
          content:
            "One of the most contentious (有争议的) issues in the vast literature about alcohol consumption has been the consistent finding that those who don't drink tend to die sooner than those who do. The standard Alcoholics Anonymous (匿名戒互助会) explanation for this finding is that many of those who show up as abstainers (戒酒者) in such research are actually former hard-core drunks who had already incurred health problems associated with drinking.\n\nBut a new paper in the journal Alcoholism: Clinical and Experimental Research suggests that—for reasons that aren't entirely clear—abstaining from alcohol does tend to increase one's risk of dying, even when you exclude former problem drinkers. The most shocking part: Abstainers' mortality rates are higher than those of heavy drinkers.\n\nModerate drinking, which is defined as one to three drinks per day, is associated with the lowest mortality rates in alcohol studies. Moderate alcohol use (especially when the beverage of choice is red wine) is thought to improve heart health, circulation and sociability, which can be important because people who are isolated don't have as many family members and friends who can notice and help treat health problems.\n\nBut why would abstaining from alcohol lead to a shorter life? It's true that those who abstain from alcohol tend to be from lower socioeconomic classes, since drinking can be expensive. And people of lower socioeconomic status have more life stressors—job and child-care worries that might not only keep them from the bottle but also cause stress-related illnesses over long periods. (They also don't get the stress-reducing benefits of a drink or two after work.)\n\nBut even after controlling for nearly all imaginable variables—socioeconomic status, level of physical activity, number of close friends, quality of social support and so on—the researchers (a six-member team led by psychologist Charles Holahan of the University of Texas at Austin) found that over a 20-year period, mortality rates were highest for those who were not current drinkers, regardless of whether they used to be alcoholics, second highest for heavy drinkers and lowest for moderate drinkers.",
          contentCN:
            '在大量关于饮酒的文献中，最具争议的问题之一是一直以来的发现：不饮酒的人往往比饮酒的人更早死亡。戒酒互助会对这一发现的标准解释是，在这类研究中表现为戒酒者的许多人实际上是曾经的酗酒者，他们已经出现了与饮酒相关的健康问题。\n\n但《酒精中毒：临床与实验研究》杂志上的一篇新论文表明，出于不完全清楚的原因，即使排除曾经有饮酒问题的人，戒酒确实会增加死亡风险。最令人震惊的是：戒酒者的死亡率高于酗酒者。\n\n适度饮酒，定义为每天饮用一至三杯酒，在酒精研究中与最低死亡率相关。适度饮酒（尤其是当选择的饮料是红酒时）被认为有助于改善心脏健康、血液循环和社交能力，这可能很重要，因为孤独的人没有那么多家人和朋友能够注意到并帮助治疗健康问题。\n\n但是为什么戒酒会导致寿命缩短呢？确实，戒酒的人往往来自社会经济阶层较低的群体，因为饮酒可能很昂贵。社会经济地位较低的人有更多的生活压力源——工作和育儿方面的担忧，这些不仅可能使他们不饮酒，还可能长期导致与压力相关的疾病。（他们下班后也无法从一两杯酒中获得减轻压力的好处。）\n\n但即使在控制了几乎所有可想象的变量——社会经济地位、身体活动水平、亲密朋友的数量、社会支持的质量等等之后，研究人员（由德克萨斯大学奥斯汀分校的心理学家查尔斯·霍拉汉领导的六人团队）发现，在20年的时间里，不饮酒者的死亡率最高，无论他们以前是否酗酒，酗酒者的死亡率次之，适度饮酒者的死亡率最低。',
          id: 'article2',
          title: 'Alcohol Consumption and Mortality',
          titleCN: '饮酒与死亡率',
        },
        description: '关于饮酒与死亡率关系的阅读理解',
        id: 'chapter1-reading2',
        questions: [
          {
            correctOptionId: 'q2-1-B',
            explanation:
              'The standard Alcoholics Anonymous explanation for this finding is that many of those who show up as abstainers in such research are actually former hard-core drunks who had already incurred health problems associated with drinking.',
            id: 'q2-1',
            options: [
              {
                id: 'q2-1-A',
                text: "Because people who don't drink are desperately lonely.",
                textCN: '因为不饮酒的人极度孤独。',
              },
              {
                id: 'q2-1-B',
                text: "Because people who don't drink had health problems owing to drinking.",
                textCN: '因为不饮酒的人因饮酒而有健康问题。',
              },
              {
                id: 'q2-1-C',
                text: "Because people who don't drink have more life stresses.",
                textCN: '因为不饮酒的人有更多的生活压力。',
              },
              {
                id: 'q2-1-D',
                text: "Because people who don't drink had health problems irrelevant to drinking.",
                textCN: '因为不饮酒的人有与饮酒无关的健康问题。',
              },
            ],
            text: "According to the Alcoholics Anonymous, why do people who don't drink tend to die sooner than those who do?",
            textCN:
              '根据戒酒互助会的说法，为什么不饮酒的人往往比饮酒的人更早死亡？',
            type: 'reading',
          },
          {
            correctOptionId: 'q2-2-D',
            explanation:
              "The new paper suggests that abstaining from alcohol does tend to increase one's risk of dying, and the most shocking part is that Abstainers' mortality rates are higher than those of heavy drinkers.",
            id: 'q2-2',
            options: [
              {
                id: 'q2-2-A',
                text: 'abstaining from alcohol can make people lead a happier life',
                textCN: '戒酒可以使人们过上更幸福的生活',
              },
              {
                id: 'q2-2-B',
                text: 'the mortality rates of former problem drinkers is the highest',
                textCN: '曾经有饮酒问题的人的死亡率最高',
              },
              {
                id: 'q2-2-C',
                text: 'researchers have explained the reason why abstainers face a high risk',
                textCN: '研究人员已经解释了戒酒者面临高风险的原因',
              },
              {
                id: 'q2-2-D',
                text: 'compared with the abstainers, heavy drinkers are at a lower risk of death',
                textCN: '与戒酒者相比，酗酒者的死亡风险较低',
              },
            ],
            text: 'According to the new paper in the journal Alcoholism: Clinical and Experimental Research, ________.',
            textCN:
              '根据《酒精中毒：临床与实验研究》杂志上的新论文，________。',
            type: 'reading',
          },
          {
            correctOptionId: 'q2-3-A',
            explanation:
              'Moderate drinking is defined as one to three drinks per day.',
            id: 'q2-3',
            options: [
              {
                id: 'q2-3-A',
                text: 'People who have less than three drinks per day.',
                textCN: '每天饮酒少于三杯的人。',
              },
              {
                id: 'q2-3-B',
                text: 'People whose drink of choice is red wine.',
                textCN: '选择红酒作为饮品的人。',
              },
              {
                id: 'q2-3-C',
                text: 'People who only drink with family members.',
                textCN: '只与家人一起饮酒的人。',
              },
              {
                id: 'q2-3-D',
                text: 'People who drink to improve their health.',
                textCN: '为了改善健康而饮酒的人。',
              },
            ],
            text: 'Which of the following can be considered as moderate drinkers?',
            textCN: '以下哪项可以被视为适度饮酒者？',
            type: 'reading',
          },
          {
            correctOptionId: 'q2-4-C',
            explanation:
              'Those who abstain from alcohol tend to be from lower socioeconomic classes and have more life stressors which might not only keep them from the bottle but also cause stress-related illnesses over long periods.',
            id: 'q2-4',
            options: [
              {
                id: 'q2-4-A',
                text: 'Because people who abstain from alcohol are in lower status.',
                textCN: '因为戒酒的人社会地位较低。',
              },
              {
                id: 'q2-4-B',
                text: 'Because abstaining from alcohol is a very painful experience.',
                textCN: '因为戒酒是一种非常痛苦的经历。',
              },
              {
                id: 'q2-4-C',
                text: 'Because people abstaining from alcohol tend to face more stresses.',
                textCN: '因为戒酒的人往往面临更多压力。',
              },
              {
                id: 'q2-4-D',
                text: 'Because people who abstain from alcohol have incurred health problems.',
                textCN: '因为戒酒的人已经出现了健康问题。',
              },
            ],
            text: 'Why would abstaining from alcohol lead to a shorter life?',
            textCN: '为什么戒酒会导致寿命缩短？',
            type: 'reading',
          },
          {
            correctOptionId: 'q2-5-A',
            explanation:
              'The researchers found that over a 20-year period, mortality rates were highest for those who were not current drinkers, regardless of whether they used to be alcoholics',
            id: 'q2-5',
            options: [
              {
                id: 'q2-5-A',
                text: "Those who didn't drink over a 20-year period.",
                textCN: '在20年期间不饮酒的人。',
              },
              {
                id: 'q2-5-B',
                text: 'Those who drunk for more than 20 years.',
                textCN: '饮酒超过20年的人。',
              },
              {
                id: 'q2-5-C',
                text: 'Those who were heavy drinkers.',
                textCN: '酗酒者。',
              },
              {
                id: 'q2-5-D',
                text: 'Those who were moderate drinkers.',
                textCN: '适度饮酒者。',
              },
            ],
            text: 'According to the last paragraph, what kind of people had the highest mortality rates?',
            textCN: '根据最后一段，哪种人死亡率最高？',
            type: 'reading',
          },
        ],
        title: '阅读理解 2',
        type: 'reading',
      },
      {
        id: 'chapter1-reading1',
        title: '阅读理解 1',
        description: '关于交通信号灯及相关技术的阅读理解',
        type: 'reading',
        article: {
          id: 'article1',
          title: 'Traffic Lights and Signal Guru',
          titleCN: '交通信号灯与信号大师',
          content: `Traffic lights are crucial tools for regulating traffic flow. They are not, however, perfect. At unmanaged junctions, a pattern of stop-go movement can still be frustrating and burns more fuel than a smooth passage would. Creating such a smooth passage means adjusting a vehicle's speed so that it always arrives at the lights when they are green. That is theoretically possible, but practically hard. Roadside signs wired to traffic lights may help, but they have not been widely deployed. Now scientists have an idea that could make the process cheaper and more effective. Instead of a hardwired network of signs, they promote to use mobile-phone apps.

For a driver to benefit, he must load the special software, dubbed Signal Guru, into his phone and then mount it on a special bracket attached to the inside of his car's windscreen, with the camera lens pointing forwards. Signal Guru is designed to detect traffic lights and track their status as red, amber or green. It broadcasts this information to other phones in the area that are fitted with the same software, and—if there are enough of them—the phones thus each know the status of most of the lights around town. Using this information, Signal Guru is able to calculate the traffic-light schedule for the region and suggest the speed at which a driver should travel in order to avoid running into red lights.

Tests in Cambridge, Massachusetts, where five drivers were asked to follow the same route for three hours, and in Singapore, where eight drivers were asked to follow one of two routes for 30 minutes, revealed that Signal Guru was capable of predicting traffic-light activity with an accuracy of 98.2% and 96.3% respectively, in the two cities. This was particularly impressive because in Cambridge the lights shifted, roughly half-way through the test, from their off-peak schedule to their afternoon-traffic schedule, while in Singapore lights are adaptive, using detectors embedded (嵌入) under the road to determine how much traffic is around and thus when a signal should change. Fuel consumption fell, too by about 20%. Signal Guru thus reduces both frustration and fuel use, and makes commuting a slightly less horrible experience.`,
          contentCN: `交通信号灯是调节交通流量的关键工具。然而，它们并不完美。在无管理的路口，走走停停的模式仍然令人沮丧，而且比顺畅通行消耗更多燃料。创造这样的顺畅通行意味着调整车辆速度，以便总是在绿灯亮起时到达信号灯处。这在理论上是可能的，但实际上很难。与交通信号灯相连的路边标志可能会有帮助，但它们尚未得到广泛应用。现在科学家们有了一个想法，这可以使这个过程更便宜、更有效。他们提倡使用手机应用程序，而不是硬连线的标志网络。

为了让司机受益，他必须将名为“信号大师”的特殊软件加载到手机中，然后将其安装在汽车挡风玻璃内侧的一个特殊支架上，摄像头镜头向前。“信号大师”旨在检测交通信号灯并跟踪它们的状态，即红灯、黄灯或绿灯。它将此信息广播到该区域内安装了相同软件的其他手机上，如果有足够多的手机，那么每部手机就都知道城镇周围大多数信号灯的状态。利用这些信息，“信号大师”能够计算出该区域的交通信号灯时间表，并建议司机应该行驶的速度，以避免闯红灯。

在马萨诸塞州的剑桥进行了测试，五名司机被要求沿着同一路线行驶三个小时；在新加坡进行了测试，八名司机被要求沿着两条路线之一行驶30分钟。测试显示，在这两个城市，“信号大师”预测交通信号灯活动的准确率分别为98.2%和96.3%。这尤其令人印象深刻，因为在剑桥，测试进行到大约一半时，信号灯从非高峰时间表切换到了下午交通时间表，而在新加坡，信号灯是自适应的，使用埋设在道路下的探测器来确定周围有多少交通流量，从而确定信号何时应该改变。燃料消耗也下降了约20%。因此，“信号大师”减少了挫折感和燃料消耗，并使通勤体验稍微不那么糟糕。`,
        },
        questions: [
          {
            id: 'q1-1',
            type: 'reading',
            text: 'What can drivers do if they want to pass unmanaged junctions smoothly?',
            textCN: '如果司机想要顺利通过无管理的路口，他们可以怎么做？',
            options: [
              {
                id: 'q1-1-A',
                text: 'They can do nothing but wait until traffic lights turn green.',
                textCN: '他们只能等待，直到交通信号灯变绿。',
              },
              {
                id: 'q1-1-B',
                text: 'They can help traffic police to regulate traffic flow.',
                textCN: '他们可以帮助交警调节交通流量。',
              },
              {
                id: 'q1-1-C',
                text: 'They can drive through the red lights if nobody is around.',
                textCN: '如果周围没有人，他们可以闯红灯。',
              },
              {
                id: 'q1-1-D',
                text: 'They can adjust the speed in time for the green lights.',
                textCN: '他们可以及时调整速度以赶上绿灯。',
              },
            ],
            correctOptionId: 'q1-1-D',
            explanation:
              "根据文章内容‘Creating such a smooth passage means adjusting a vehicle's speed so that it always arrives at the lights when they are green.’可知，司机想要顺利通过无管理的路口，可以调整速度以赶上绿灯，所以选D。",
          },
          {
            id: 'q1-2',
            type: 'reading',
            text: 'Roadside signs have not been widely deployed probably because ________.',
            textCN: '路边标志没有得到广泛应用可能是因为________。',
            options: [
              {
                id: 'q1-2-A',
                text: 'they are less effective in bad weather',
                textCN: '它们在恶劣天气下效果较差',
              },
              {
                id: 'q1-2-B',
                text: 'it takes more money to install them',
                textCN: '安装它们需要更多的钱',
              },
              {
                id: 'q1-2-C',
                text: 'it is hard to wire them to traffic lights',
                textCN: '将它们与交通信号灯连线很困难',
              },
              {
                id: 'q1-2-D',
                text: 'they take up too much space',
                textCN: '它们占用太多空间',
              },
            ],
            correctOptionId: 'q1-2-B',
            explanation:
              '文中提到‘Now scientists have an idea that could make the process cheaper and more effective. Instead of a hardwired network of signs, they promote to use mobile-phone apps.’说明科学家认为使用手机应用程序可以使过程更便宜、更有效，由此可推断路边标志没有广泛应用可能是因为安装它们花费更多，所以选B。',
          },
          {
            id: 'q1-3',
            type: 'reading',
            text: 'What do we learn about Signal Guru from the second paragraph?',
            textCN: '从第二段我们了解到关于‘信号大师’的什么信息？',
            options: [
              {
                id: 'q1-3-A',
                text: 'It can design a daily traffic-light schedule in a specific region.',
                textCN: '它可以设计特定区域的每日交通信号灯时间表。',
              },
              {
                id: 'q1-3-B',
                text: 'It is intended to keep track of traffic jams in the morning rush hour.',
                textCN: '它旨在跟踪早高峰时段的交通堵塞情况。',
              },
              {
                id: 'q1-3-C',
                text: 'It enables phones to share information of the status of traffic lights.',
                textCN: '它使手机能够共享交通信号灯状态信息。',
              },
              {
                id: 'q1-3-D',
                text: 'It works as a brake that slows down the car when traffic lights are red.',
                textCN: '当交通信号灯为红灯时，它起到刹车作用使汽车减速。',
              },
            ],
            correctOptionId: 'q1-3-C',
            explanation:
              '根据第二段中‘It broadcasts this information to other phones in the area that are fitted with the same software, and—if there are enough of them—the phones thus each know the status of most of the lights around town.’可知，‘信号大师’能让手机共享交通信号灯状态信息，所以选C。',
          },
          {
            id: 'q1-4',
            type: 'reading',
            text: 'What did tests in Cambridge and Singapore reveal?',
            textCN: '在剑桥和新加坡的测试揭示了什么？',
            options: [
              {
                id: 'q1-4-A',
                text: 'Signal Guru can forecast the status of traffic lights with great accuracy.',
                textCN: '‘信号大师’能非常准确地预测交通信号灯的状态。',
              },
              {
                id: 'q1-4-B',
                text: 'Drivers in Singapore follow traffic rules better than those in Cambridge.',
                textCN: '新加坡的司机比剑桥的司机更遵守交通规则。',
              },
              {
                id: 'q1-4-C',
                text: 'Traffic lights in Cambridge work better than those in Singapore.',
                textCN: '剑桥的交通信号灯比新加坡的交通信号灯工作得更好。',
              },
              {
                id: 'q1-4-D',
                text: 'Traffic lights in Cambridge are more adaptive in off-peak hours.',
                textCN: '剑桥的交通信号灯在非高峰时段更具适应性。',
              },
            ],
            correctOptionId: 'q1-4-A',
            explanation:
              '由第三段中‘Tests in Cambridge, Massachusetts, where five drivers were asked to follow the same route for three hours, and in Singapore, where eight drivers were asked to follow one of two routes for 30 minutes, revealed that Signal Guru was capable of predicting traffic-light activity with an accuracy of 98.2% and 96.3% respectively, in the two cities.’可知，测试表明‘信号大师’能非常准确地预测交通信号灯的状态，所以选A。',
          },
          {
            id: 'q1-5',
            type: 'reading',
            text: 'What is the main idea of the passage?',
            textCN: '这篇文章的主要观点是什么？',
            options: [
              {
                id: 'q1-5-A',
                text: 'Traffic lights turn out to be not perfect all the time.',
                textCN: '交通信号灯并非一直都是完美的。',
              },
              {
                id: 'q1-5-B',
                text: 'Phones with Signal Guru can be a great help to drivers.',
                textCN: '装有‘信号大师’的手机对司机有很大帮助。',
              },
              {
                id: 'q1-5-C',
                text: 'Drivers are often stuck at unmanaged junctions.',
                textCN: '司机经常在无管理的路口被困住。',
              },
              {
                id: 'q1-5-D',
                text: 'Cities in developed countries need Signal Guru badly.',
                textCN: '发达国家的城市非常需要‘信号大师’。',
              },
            ],
            correctOptionId: 'q1-5-B',
            explanation:
              '文章主要介绍了‘信号大师’这款手机应用程序，它能帮助司机预测交通信号灯状态，减少挫折感和燃料消耗，对司机有很大帮助，所以选B。',
          },
        ],
      },
      {
        id: 'chapter14-cloze1',
        title: '完形填空 14',
        description: '关于女性健康权益的完形填空',
        type: 'cloze',
        questions: [
          {
            id: 'c14-1',
            type: 'cloze',
            text: 'Republicans in Congress are (75)_____ in a frenzied effort to repeal and replace the ACA.',
            textCN: '国会中的共和党人正(75)_____于疯狂努力废除和取代ACA。',
            options: [
              { id: 'c14-1-A', text: 'engaged', textCN: '参与' },
              { id: 'c14-1-B', text: 'avoided', textCN: '避免' },
              { id: 'c14-1-C', text: 'stopped', textCN: '停止' },
              { id: 'c14-1-D', text: 'finished', textCN: '完成' },
            ],
            correctOptionId: 'c14-1-A',
            explanation:
              '“engaged”意为“参与”，“be engaged in”为固定搭配，指共和党人正忙于推动废除ACA的行动，符合“疯狂努力”的语境。',
          },
          {
            id: 'c14-2',
            type: 'cloze',
            text: 'under the latest (76)_____ of this plan.',
            textCN: '根据该计划的最新(76)_____。',
            options: [
              { id: 'c14-2-A', text: 'version', textCN: '版本' },
              { id: 'c14-2-B', text: 'problem', textCN: '问题' },
              { id: 'c14-2-C', text: 'benefit', textCN: '利益' },
              { id: 'c14-2-D', text: 'rule', textCN: '规则' },
            ],
            correctOptionId: 'c14-2-A',
            explanation:
              '“version”意为“版本”，指ACA废除计划的最新迭代版本，与“最新”搭配，体现政策变动的阶段性。',
          },
          {
            id: 'c14-3',
            type: 'cloze',
            text: 'These cuts (77)_____ to affect women more than men.',
            textCN: '这些削减(77)_____对女性的影响超过男性。',
            options: [
              { id: 'c14-3-A', text: 'threaten', textCN: '威胁' },
              { id: 'c14-3-B', text: 'help', textCN: '帮助' },
              { id: 'c14-3-C', text: 'want', textCN: '想要' },
              { id: 'c14-3-D', text: 'hope', textCN: '希望' },
            ],
            correctOptionId: 'c14-3-A',
            explanation:
              '“threaten”意为“威胁”，指医保削减对女性健康构成实质性威胁，与“失去基本医保、削减孕产护理”等具体影响呼应。',
          },
          {
            id: 'c14-4',
            type: 'cloze',
            text: 'cutting maternity care or (78)_____ limiting reproductive rights.',
            textCN: '削减孕产护理或(78)_____限制生殖权利。',
            options: [
              { id: 'c14-4-A', text: 'sharply', textCN: '大幅地' },
              { id: 'c14-4-B', text: 'slightly', textCN: '轻微地' },
              { id: 'c14-4-C', text: 'gradually', textCN: '逐渐地' },
              { id: 'c14-4-D', text: 'hardly', textCN: '几乎不' },
            ],
            correctOptionId: 'c14-4-A',
            explanation:
              '“sharply”意为“大幅地”，强调对生殖权利限制的程度严重，与“削减”并列，突出政策对女性权益的剧烈冲击。',
          },
          {
            id: 'c14-5',
            type: 'cloze',
            text: 'Current events are just the latest (79)_____ in a long history of male-centric medicine.',
            textCN: '当前事件只是长期以男性为中心的医学史中最新的(79)_____。',
            options: [
              { id: 'c14-5-A', text: 'insult', textCN: '侮辱' },
              { id: 'c14-5-B', text: 'honor', textCN: '荣誉' },
              { id: 'c14-5-C', text: 'success', textCN: '成功' },
              { id: 'c14-5-D', text: 'progress', textCN: '进步' },
            ],
            correctOptionId: 'c14-5-A',
            explanation:
              '“insult”意为“侮辱”，指当前政策是对女性健康权益的又一次伤害，与“以男性为中心的医学史”呼应，体现长期不平等。',
          },
          {
            id: 'c14-6',
            type: 'cloze',
            text: 'which (80)_____ the inclusion of women and minorities in final-stage trials.',
            textCN: '该法案(80)_____在最终阶段试验中纳入女性和少数族裔。',
            options: [
              { id: 'c14-6-A', text: 'required', textCN: '要求' },
              { id: 'c14-6-B', text: 'forbade', textCN: '禁止' },
              { id: 'c14-6-C', text: 'suggested', textCN: '建议' },
              { id: 'c14-6-D', text: 'ignored', textCN: '忽视' },
            ],
            correctOptionId: 'c14-6-A',
            explanation:
              '“required”意为“要求”，指1993年法案强制规定试验必须纳入女性和少数族裔，与“此前女性被主动排除”形成对比。',
          },
          {
            id: 'c14-7',
            type: 'cloze',
            text: 'women were actively (81)_____ from such tests.',
            textCN: '女性被主动(81)_____于此类试验之外。',
            options: [
              { id: 'c14-7-A', text: 'excluded', textCN: '排除' },
              { id: 'c14-7-B', text: 'included', textCN: '包括' },
              { id: 'c14-7-C', text: 'invited', textCN: '邀请' },
              { id: 'c14-7-D', text: 'welcomed', textCN: '欢迎' },
            ],
            correctOptionId: 'c14-7-A',
            explanation:
              '“excluded”意为“排除”，与“担心女性荷尔蒙周期干扰结果”的原因呼应，说明过去试验对女性的系统性排斥。',
          },
          {
            id: 'c14-8',
            type: 'cloze',
            text: 'The (82)_____ meant women did not know how drugs would affect them.',
            textCN: '这种(82)_____意味着女性不知道药物会如何影响她们。',
            options: [
              { id: 'c14-8-A', text: 'omission', textCN: ' 遗漏' },
              { id: 'c14-8-B', text: 'inclusion', textCN: '包括' },
              { id: 'c14-8-C', text: 'success', textCN: '成功' },
              { id: 'c14-8-D', text: 'failure', textCN: '失败' },
            ],
            correctOptionId: 'c14-8-A',
            explanation:
              '“omission”意为“遗漏”，指将女性排除在试验外的行为，导致女性缺乏药物影响的数据，符合“不知道药物如何影响她们”的结果。',
          },
          {
            id: 'c14-9',
            type: 'cloze',
            text: 'these (83)_____ are part of a larger war on women’s health.',
            textCN: '这些(83)_____是更大规模女性健康之战的一部分。',
            options: [
              { id: 'c14-9-A', text: 'attacks', textCN: '攻击' },
              { id: 'c14-9-B', text: 'defenses', textCN: '防御' },
              { id: 'c14-9-C', text: 'protections', textCN: '保护' },
              { id: 'c14-9-D', text: 'supports', textCN: '支持' },
            ],
            correctOptionId: 'c14-9-A',
            explanation:
              '“attacks”意为“攻击”，与“战争”呼应，指废除ACA等行为是对女性健康权益的系统性攻击，体现作者的批判立场。',
          },
          {
            id: 'c14-10',
            type: 'cloze',
            text: 'it’s (84)_____ to put women first.',
            textCN: '将女性放在首位是(84)_____。',
            options: [
              { id: 'c14-10-A', text: 'critical', textCN: '至关重要的' },
              { id: 'c14-10-B', text: 'unimportant', textCN: '不重要的' },
              { id: 'c14-10-C', text: 'strange', textCN: '奇怪的' },
              { id: 'c14-10-D', text: 'funny', textCN: '有趣的' },
            ],
            correctOptionId: 'c14-10-A',
            explanation:
              '“critical”意为“至关重要的”，强调在女性健康权益受威胁的背景下，将女性置于首位的紧迫性，与“必须抵制这种攻击”的呼吁呼应。',
          },
        ],
      },
      {
        id: 'chapter15-cloze1',
        title: '完形填空 15',
        description: '关于美国互联网服务速度与消费者投诉的完形填空',
        type: 'cloze',
        questions: [
          {
            id: 'c15-1',
            type: 'cloze',
            text: "New York's Attorney General's office (85)_____ an investigation in the fall.",
            textCN: '纽约总检察长办公室在秋季(85)_____一项调查。',
            options: [
              { id: 'c15-1-A', text: 'launched', textCN: '发起' },
              { id: 'c15-1-B', text: 'cancelled', textCN: '取消' },
              { id: 'c15-1-C', text: 'delayed', textCN: '推迟' },
              { id: 'c15-1-D', text: 'completed', textCN: '完成' },
            ],
            correctOptionId: 'c15-1-A',
            explanation:
              '“launched”意为“发起”，与“调查”搭配，指总检察长办公室启动对宽带速度的调查，符合政府机构行为逻辑。',
          },
          {
            id: 'c15-2',
            type: 'cloze',
            text: 'as fast as the providers (86)_____ it is.',
            textCN: '是否如提供商(86)_____的那样快。',
            options: [
              { id: 'c15-2-A', text: 'claim', textCN: '宣称' },
              { id: 'c15-2-B', text: 'deny', textCN: '否认' },
              { id: 'c15-2-C', text: 'doubt', textCN: '怀疑' },
              { id: 'c15-2-D', text: 'prove', textCN: '证明' },
            ],
            correctOptionId: 'c15-2-A',
            explanation:
              '“claim”意为“宣称”，指调查聚焦于运营商是否如实提供其宣称的网速，与“消费者应获得承诺速度”的后文呼应。',
          },
          {
            id: 'c15-3',
            type: 'cloze',
            text: 'saying consumers (87)_____ to get the speeds they were promised.',
            textCN: '称消费者(87)_____获得他们被承诺的速度。',
            options: [
              { id: 'c15-3-A', text: 'deserved', textCN: '应得' },
              { id: 'c15-3-B', text: 'hated', textCN: '讨厌' },
              { id: 'c15-3-C', text: 'failed', textCN: '失败' },
              { id: 'c15-3-D', text: 'stopped', textCN: '停止' },
            ],
            correctOptionId: 'c15-3-A',
            explanation:
              '“deserved”意为“应得”，强调消费者有权利获得运营商承诺的服务质量，体现调查的正义性和消费者权益立场。',
          },
          {
            id: 'c15-4',
            type: 'cloze',
            text: "it wouldn't be the first time a telecom provider got into (88)_____ over broadband speeds.",
            textCN: '这不会是电信提供商首次因宽带速度陷入(88)_____。',
            options: [
              { id: 'c15-4-A', text: 'trouble', textCN: '麻烦' },
              { id: 'c15-4-B', text: 'success', textCN: '成功' },
              { id: 'c15-4-C', text: 'agreement', textCN: '协议' },
              { id: 'c15-4-D', text: 'competition', textCN: '竞争' },
            ],
            correctOptionId: 'c15-4-A',
            explanation:
              '“trouble”意为“麻烦”，指运营商因未兑现网速承诺而陷入法律或舆论纠纷，与后文AT&T被罚款的案例呼应。',
          },
          {
            id: 'c15-5',
            type: 'cloze',
            text: 'the Federal Communications Commission fined AT&T $100 million over (89)_____ that the carrier secretly reduced wireless speeds.',
            textCN:
              '联邦通信委员会因(89)_____AT&T秘密降低无线速度而罚款1亿美元。',
            options: [
              { id: 'c15-5-A', text: 'accusations', textCN: '指控' },
              { id: 'c15-5-B', text: 'praises', textCN: '赞扬' },
              { id: 'c15-5-C', text: 'reports', textCN: '报告' },
              { id: 'c15-5-D', text: 'wishes', textCN: '愿望' },
            ],
            correctOptionId: 'c15-5-A',
            explanation:
              '“accusations”意为“指控”，指AT&T被指控在用户消耗一定数据后秘密降速，罚款是对该指控的处理结果，符合监管逻辑。',
          },
          {
            id: 'c15-6',
            type: 'cloze',
            text: 'after customers consumed a certain amount of (90)_____.',
            textCN: '在用户消耗一定量的(90)_____后。',
            options: [
              { id: 'c15-6-A', text: 'data', textCN: '数据' },
              { id: 'c15-6-B', text: 'time', textCN: '时间' },
              { id: 'c15-6-C', text: 'money', textCN: '金钱' },
              { id: 'c15-6-D', text: 'energy', textCN: '能源' },
            ],
            correctOptionId: 'c15-6-A',
            explanation:
              '“data”意为“数据”，与“无线速度”和“流量上限”的语境一致，指AT&T在用户使用一定数据后降速，符合电信行业常见问题。',
          },
          {
            id: 'c15-7',
            type: 'cloze',
            text: 'media and telecom giant Comcast is the most (91)_____ provider.',
            textCN: '媒体和电信巨头康卡斯特是最(91)_____的提供商。',
            options: [
              { id: 'c15-7-A', text: 'hated', textCN: '被讨厌的' },
              { id: 'c15-7-B', text: 'liked', textCN: '被喜欢的' },
              { id: 'c15-7-C', text: 'respected', textCN: '被尊敬的' },
              { id: 'c15-7-D', text: 'forgotten', textCN: '被遗忘的' },
            ],
            correctOptionId: 'c15-7-A',
            explanation:
              '“hated”意为“被讨厌的”，与“12,000条客户投诉”呼应，说明康卡斯特因服务问题成为最遭消费者反感的提供商，体现用户不满情绪。',
          },
          {
            id: 'c15-8',
            type: 'cloze',
            text: 'many (92)_____ to its monthly data cap and overage charges.',
            textCN: '许多投诉(92)_____其每月数据上限和超额费用。',
            options: [
              { id: 'c15-8-A', text: 'relating', textCN: '涉及' },
              { id: 'c15-8-B', text: 'adding', textCN: '增加' },
              { id: 'c15-8-C', text: 'turning', textCN: '转向' },
              { id: 'c15-8-D', text: 'responding', textCN: '回应' },
            ],
            correctOptionId: 'c15-8-A',
            explanation:
              '“relating”意为“涉及”，“relate to”表示“与…相关”，指大部分投诉与数据上限和超额收费问题相关，解释了用户不满的具体原因。',
          },
          {
            id: 'c15-9',
            type: 'cloze',
            text: "Some Americans are getting so (93)_____ with Internet providers they're just giving up.",
            textCN:
              '一些美国人对互联网提供商如此(93)_____，以至于他们干脆放弃。',
            options: [
              { id: 'c15-9-A', text: 'frustrated', textCN: '沮丧的' },
              { id: 'c15-9-B', text: 'satisfied', textCN: '满意的' },
              { id: 'c15-9-C', text: 'pleased', textCN: '高兴的' },
              { id: 'c15-9-D', text: 'surprised', textCN: '惊讶的' },
            ],
            correctOptionId: 'c15-9-A',
            explanation:
              '“frustrated”意为“沮丧的”，指用户因长期遭遇网速慢、收费不合理等问题而感到失望，进而放弃使用，符合“放弃”的行为逻辑。',
          },
          {
            id: 'c15-10',
            type: 'cloze',
            text: 'the number of Americans with high-speed Internet at home today (94)_____ fell during the last two years.',
            textCN: '如今美国家庭高速互联网用户数量在过去两年(94)_____下降。',
            options: [
              { id: 'c15-10-A', text: 'actually', textCN: '实际上' },
              { id: 'c15-10-B', text: 'hardly', textCN: '几乎不' },
              { id: 'c15-10-C', text: 'gradually', textCN: '逐渐地' },
              { id: 'c15-10-D', text: 'suddenly', textCN: '突然地' },
            ],
            correctOptionId: 'c15-10-A',
            explanation:
              '“actually”意为“实际上”，强调尽管美国互联网速度提升，但用户数量不增反降的事实，与“人们仍抱怨网速慢”的开篇形成反差，突显问题严重性。',
          },
        ],
      },
      {
        id: 'chapter15-cloze1',
        title: '完形填空 15',
        description: '关于关节疼痛与缓解产品的完形填空',
        type: 'cloze',
        questions: [
          {
            id: 'c15-1',
            type: 'cloze',
            text: 'Sports fatigue, arthritis and aging can all cause wear and tear on your joints (95)_____ to discomfort and painful joints.',
            textCN:
              '运动疲劳、关节炎和衰老都会导致关节磨损，(95)_____不适和关节疼痛。',
            options: [
              { id: 'c15-1-A', text: 'leading', textCN: '导致' },
              { id: 'c15-1-B', text: 'reducing', textCN: '减少' },
              { id: 'c15-1-C', text: 'adapting', textCN: '适应' },
              { id: 'c15-1-D', text: 'returning', textCN: '返回' },
            ],
            correctOptionId: 'c15-1-A',
            explanation:
              '“leading”意为“导致”，“leading to”为固定搭配，指前文因素会引发关节疼痛的结果，符合因果逻辑。',
          },
          {
            id: 'c15-2',
            type: 'cloze',
            text: 'Every single (96)_____ your body makes puts pressure on your joints.',
            textCN: '你身体的每一个(96)_____都会给关节带来压力。',
            options: [
              { id: 'c15-2-A', text: 'movement', textCN: '动作' },
              { id: 'c15-2-B', text: 'muscle', textCN: '肌肉' },
              { id: 'c15-2-C', text: 'bone', textCN: '骨头' },
              { id: 'c15-2-D', text: 'tissue', textCN: '组织' },
            ],
            correctOptionId: 'c15-2-A',
            explanation:
              '“movement”意为“动作”，与“身体活动”语境匹配，指任何动作都会对关节产生压力，体现关节持续受力的状态。',
          },
          {
            id: 'c15-3',
            type: 'cloze',
            text: 'Up, down, side to side your joints are (97)_____ strained.',
            textCN: '上下左右，你的关节(97)_____处于紧张状态。',
            options: [
              { id: 'c15-3-A', text: 'constantly', textCN: '持续地' },
              { id: 'c15-3-B', text: 'rarely', textCN: '很少地' },
              { id: 'c15-3-C', text: 'accidentally', textCN: '偶然地' },
              { id: 'c15-3-D', text: 'purposely', textCN: '故意地' },
            ],
            correctOptionId: 'c15-3-A',
            explanation:
              '“constantly”意为“持续地”，强调关节在各种动作中始终承受压力，与前文“每一个动作”形成呼应，突出关节负担的持续性。',
          },
          {
            id: 'c15-4',
            type: 'cloze',
            text: 'Even people with (98)_____ joint pain suffer through activities they once loved.',
            textCN:
              '即使是有(98)_____关节疼痛的人，也会在曾经热爱的活动中受苦。',
            options: [
              { id: 'c15-4-A', text: 'occasional', textCN: '偶尔的' },
              { id: 'c15-4-B', text: 'severe', textCN: '严重的' },
              { id: 'c15-4-C', text: 'chronic', textCN: '慢性的' },
              { id: 'c15-4-D', text: 'terminal', textCN: '晚期的' },
            ],
            correctOptionId: 'c15-4-A',
            explanation:
              '“occasional”意为“偶尔的”，指疼痛并非持续存在，但仍会影响日常活动，与“曾经热爱的活动”形成对比，说明疼痛对生活质量的影响。',
          },
          {
            id: 'c15-5',
            type: 'cloze',
            text: 'Some people (99)_____ painful joints are just part of life.',
            textCN: '有些人(99)_____关节疼痛只是生活的一部分。',
            options: [
              { id: 'c15-5-A', text: 'assume', textCN: '认为' },
              { id: 'c15-5-B', text: 'deny', textCN: '否认' },
              { id: 'c15-5-C', text: 'doubt', textCN: '怀疑' },
              { id: 'c15-5-D', text: 'forget', textCN: '忘记' },
            ],
            correctOptionId: 'c15-5-A',
            explanation:
              '“assume”意为“认为”，指部分人将关节疼痛视为不可避免的生活常态，反映出对关节健康的忽视，为后文新发现的重要性做铺垫。',
          },
          {
            id: 'c15-6',
            type: 'cloze',
            text: 'However, (100)_____ discovery is changing everything.',
            textCN: '然而，(100)_____发现正在改变一切。',
            options: [
              { id: 'c15-6-A', text: 'a breakthrough', textCN: '一项突破性的' },
              { id: 'c15-6-B', text: 'an ordinary', textCN: '一项普通的' },
              { id: 'c15-6-C', text: 'a failed', textCN: '一项失败的' },
              { id: 'c15-6-D', text: 'a secret', textCN: '一项秘密的' },
            ],
            correctOptionId: 'c15-6-A',
            explanation:
              '“a breakthrough”意为“一项突破性的”，强调该发现具有创新性和重要性，与“改变一切”的语境相符，突出新疗法的革命性意义。',
          },
          {
            id: 'c15-7',
            type: 'cloze',
            text: 'a new compound of all-natural ingredients that (101)_____ to relieve joint pain.',
            textCN: '一种全天然成分的新化合物，(101)_____缓解关节疼痛。',
            options: [
              { id: 'c15-7-A', text: 'promises', textCN: '有望' },
              { id: 'c15-7-B', text: 'refuses', textCN: '拒绝' },
              { id: 'c15-7-C', text: 'fails', textCN: '失败' },
              { id: 'c15-7-D', text: 'hesitates', textCN: '犹豫' },
            ],
            correctOptionId: 'c15-7-A',
            explanation:
              '“promises”意为“有望”，指该化合物在缓解疼痛、改善灵活性等方面具有积极前景，体现科研成果的应用价值，与“突破性发现”相呼应。',
          },
          {
            id: 'c15-8',
            type: 'cloze',
            text: 'includes ingredients with clinical (102)_____ nothing short of amazing.',
            textCN: '其成分的临床(102)_____简直令人惊叹。',
            options: [
              { id: 'c15-8-A', text: 'trials', textCN: '试验' },
              { id: 'c15-8-B', text: 'errors', textCN: '错误' },
              { id: 'c15-8-C', text: 'costs', textCN: '成本' },
              { id: 'c15-8-D', text: 'delays', textCN: '延迟' },
            ],
            correctOptionId: 'c15-8-A',
            explanation:
              '“trials”意为“试验”，“clinical trials”指临床试验，说明该产品经过科学验证，“令人惊叹”的结果为其有效性提供支持，增强可信度。',
          },
          {
            id: 'c15-9',
            type: 'cloze',
            text: 'unlike most joint relievers, the results are almost (103)_____.',
            textCN: '与大多数关节缓解剂不同，效果几乎是(103)_____。',
            options: [
              { id: 'c15-9-A', text: 'immediate', textCN: '立即的' },
              { id: 'c15-9-B', text: 'slow', textCN: '缓慢的' },
              { id: 'c15-9-C', text: 'temporary', textCN: '暂时的' },
              { id: 'c15-9-D', text: 'imaginary', textCN: '想象的' },
            ],
            correctOptionId: 'c15-9-A',
            explanation:
              '“immediate”意为“立即的”，强调该产品见效快，与“大多数缓解剂”形成对比，突出其优势，符合消费者对快速缓解疼痛的需求。',
          },
          {
            id: 'c15-10',
            type: 'cloze',
            text: "After trying many of the joint relief products on the (104)_____, we've found huge differences in quality.",
            textCN:
              '在尝试了市场上许多关节缓解产品后，我们发现质量上有巨大差异。',
            options: [
              { id: 'c15-10-A', text: 'market', textCN: '市场' },
              { id: 'c15-10-B', text: 'farm', textCN: '农场' },
              { id: 'c15-10-C', text: 'internet', textCN: '互联网' },
              { id: 'c15-10-D', text: 'blackboard', textCN: '黑板' },
            ],
            correctOptionId: 'c15-10-A',
            explanation:
              '“market”意为“市场”，“on the market”为固定搭配，指市面上的产品，说明对比范围广泛，进而凸显该产品的质量优势，逻辑连贯。',
          },
        ],
      },
    ],
  },
  {
    id: 'chapter5',
    title: '第5套题',
    description: '包含阅读理解和完形填空',
    questionSets: [
      {
        id: 'chapter1-reading1',
        title: '阅读理解 1',
        description: '关于预防儿童肥胖的阅读理解',
        type: 'reading',
        article: {
          id: 'article1',
          title: 'Preventing Obesity in Young Children',
          titleCN: '预防幼儿肥胖',
          content: `Simply increasing physical activity levels alone is unlikely to reduce body weight in young children, and therefore will probably not prevent obesity (肥胖), although it may set the stage for a healthier lifestyle, the results of a study conducted in Scotland suggest.
    　　Instead, a combination of increased physical activity and other lifestyle changes like sticking to a healthy diet may be needed to prevent the tide of obesity.
    　　"Many children are obese, even at preschool age," Dr. John J. Reilly from the University of Glasgow and colleagues noted in the British Medical Journal. Given the general lack of evidence on appropriate ways to prevent obesity in this age group, Reilly's team enrolled 545 children from 36 nursery schools in the "Movement and Activity Glasgow Intervention (干涉) in Children" or MAGIC trial.
    　　The trial was specifically designed to see if an increase in activity could reduce body mass index (体质指数). Each week for 24 weeks roughly half of the preschoolers, who were an average of 4.2 years old at entry, participated in three 30-minute active play while at nursery school and their parents were encouraged to increase the children' activity levels at home. The other half of the children, serving as controls (对照组), followed their usual nursery school schedule.
    　　According to the researchers, the physical activity intervention had no significant effect on body mass index or on measures of physical activity and inactive behaviors of the children.
    　　However, compared with control children, intervention children showed greater gains in movement skills, which, the researchers say, may foster (助长) confidence in physical ability, perhaps increasing the probability of future participation in physical activity or sports.
    　　Summing up, Reilly and colleagues suggest that "successful interventions to prevent obesity in early childhood may require changes not just at nursery, school and home, but in the wider environment. Changes in other behaviors, including diet, may also be necessary.`,
          contentCN: `苏格兰一项研究结果表明，仅增加体育活动水平不太可能降低幼儿体重，因此可能无法预防肥胖，尽管这可能为更健康的生活方式奠定基础。
    　　相反，可能需要将增加体育活动与其他生活方式改变（如坚持健康饮食）相结合，以阻止肥胖趋势。
    　　格拉斯哥大学的约翰·J·赖利博士及其同事在《英国医学杂志》上指出：“许多儿童即使在学龄前就已肥胖。”鉴于普遍缺乏关于该年龄组预防肥胖的适当方法的证据，赖利的团队在“儿童运动与活动格拉斯哥干预（MAGIC）试验”中招募了来自36所幼儿园的545名儿童。
    　　该试验专门设计用于观察活动增加是否能降低体质指数。在24周的时间里，每周大约一半的学龄前儿童（入学时平均年龄为4.2岁）在幼儿园参加三次30分钟的积极游戏，同时鼓励他们的父母在家中提高孩子的活动水平。另一半儿童作为对照组，遵循他们通常的幼儿园时间表。
    　　根据研究人员的说法，体育活动干预对儿童的体质指数或体育活动及不活动行为的测量没有显著影响。
    　　然而，与对照组儿童相比，干预组儿童在运动技能方面有更大的进步，研究人员称，这可能会增强对身体能力的信心，也许会增加未来参与体育活动或运动的可能性。
    　　总之，赖利及其同事建议：“成功预防幼儿肥胖的干预措施可能不仅需要在幼儿园、学校和家庭进行改变，还需要在更广泛的环境中进行改变。其他行为的改变，包括饮食，也可能是必要的。”`,
        },
        questions: [
          {
            id: 'q1-1',
            type: 'reading',
            text: 'According to the passage, what should people do to prevent obesity?',
            textCN: '根据文章，人们应该做什么来预防肥胖？',
            options: [
              {
                id: 'q1-1-A',
                text: 'Keep the same diet.',
                textCN: '保持相同的饮食。',
              },
              {
                id: 'q1-1-B',
                text: 'Play actively while at nursery school and keep a healthy diet.',
                textCN: '在幼儿园时积极玩耍并保持健康饮食。',
              },
              {
                id: 'q1-1-C',
                text: "Limit the children' activity levels at home.",
                textCN: '限制孩子在家的活动水平。',
              },
              {
                id: 'q1-1-D',
                text: 'Have confidence in preventing obesity.',
                textCN: '对预防肥胖有信心。',
              },
            ],
            correctOptionId: 'q1-1-B',
            explanation:
              '文章提到需要将增加体育活动与其他生活方式改变（如坚持健康饮食）相结合来预防肥胖，选项B符合。',
          },
          {
            id: 'q1-2',
            type: 'reading',
            text: 'According to the researchers, the physical activity intervention is ________.',
            textCN: '根据研究人员的说法，体育活动干预是________。',
            options: [
              {
                id: 'q1-2-A',
                text: "changing many children' inactive behaviors",
                textCN: '改变许多孩子不活动的行为',
              },
              {
                id: 'q1-2-B',
                text: 'of great effect on reducing body mass index',
                textCN: '对降低体质指数有很大效果',
              },
              {
                id: 'q1-2-C',
                text: 'improving the likelihood of future participation in sports',
                textCN: '提高未来参与运动的可能性',
              },
              {
                id: 'q1-2-D',
                text: 'of little effect on increasing confidence in physical ability',
                textCN: '对增强身体能力的信心影响不大',
              },
            ],
            correctOptionId: 'q1-2-C',
            explanation:
              '文中提到干预组儿童在运动技能方面有更大进步，可能会增加未来参与体育活动或运动的可能性，选项C正确。',
          },
          {
            id: 'q1-3',
            type: 'reading',
            text: 'Which of the following is true according to the passage?',
            textCN: '根据文章，以下哪项是正确的？',
            options: [
              {
                id: 'q1-3-A',
                text: 'The appropriate ways to prevent obesity at preschool age have not been discovered.',
                textCN: '尚未发现预防学龄前儿童肥胖的适当方法。',
              },
              {
                id: 'q1-3-B',
                text: 'Obesity prevention and a healthier lifestyle have no direct relationship.',
                textCN: '预防肥胖与更健康的生活方式没有直接关系。',
              },
              {
                id: 'q1-3-C',
                text: 'An increase in activity could reduce body mass index.',
                textCN: '活动增加可以降低体质指数。',
              },
              {
                id: 'q1-3-D',
                text: 'Successful interventions to prevent obesity in early childhood may require changes in many aspects of life.',
                textCN:
                  '成功预防幼儿肥胖的干预措施可能需要生活多个方面的改变。',
              },
            ],
            correctOptionId: 'q1-3-D',
            explanation:
              '文章最后提到成功预防幼儿肥胖的干预措施需要在多个方面改变，选项D正确。',
          },
          {
            id: 'q1-4',
            type: 'reading',
            text: 'What is this passage mainly about?',
            textCN: '这篇文章主要关于什么？',
            options: [
              {
                id: 'q1-4-A',
                text: 'How to balance the physical activity and schoolwork.',
                textCN: '如何平衡体育活动和学业。',
              },
              {
                id: 'q1-4-B',
                text: "How to arrange the children' usual nursery school schedule.",
                textCN: '如何安排孩子通常的幼儿园时间表。',
              },
              {
                id: 'q1-4-C',
                text: 'Exercise alone is unlikely to prevent obesity.',
                textCN: '仅运动不太可能预防肥胖。',
              },
              {
                id: 'q1-4-D',
                text: 'Obesity is very common among preschool children.',
                textCN: '肥胖在学龄前儿童中非常普遍。',
              },
            ],
            correctOptionId: 'q1-4-C',
            explanation:
              '文章主要讲述仅增加体育活动水平不太可能预防肥胖，选项C符合主旨。',
          },
          {
            id: 'q1-5',
            type: 'reading',
            text: 'According to the author, which of the following measures is crucial to prevent obesity for preschool children?',
            textCN:
              '根据作者的说法，以下哪项措施对预防学龄前儿童肥胖至关重要？',
            options: [
              {
                id: 'q1-5-A',
                text: 'Participating in the Glasgow Intervention Movement.',
                textCN: '参加格拉斯哥干预运动。',
              },
              {
                id: 'q1-5-B',
                text: 'Increasing exercise at nursery school.',
                textCN: '在幼儿园增加运动。',
              },
              {
                id: 'q1-5-C',
                text: 'Increasing exercises at home.',
                textCN: '在家增加运动。',
              },
              {
                id: 'q1-5-D',
                text: 'Combining increased physical activity with other lifestyle changes.',
                textCN: '将增加体育活动与其他生活方式改变相结合。',
              },
            ],
            correctOptionId: 'q1-5-D',
            explanation:
              '文章强调预防肥胖需要将增加体育活动与其他生活方式改变相结合，选项D正确。',
          },
        ],
      },
      {
        id: 'chapter1-reading1',
        title: '阅读理解 1',
        description: '关于Loihi芯片模仿生物大脑嗅觉功能的阅读理解',
        type: 'reading',
        article: {
          id: 'article1',
          title: "The Loihi Chip's Olfactory Function",
          titleCN: 'Loihi芯片的嗅觉功能',
          content: `Researchers for Cornell University and Intel produced a chip called Loihi that reportedly makes computers think like biological brains, according to Daily Mail.
    The researchers created the circuit on the chip, mirroring organic circuits found in the olfactory bulbs (嗅球) of a dogs brain, which is how they process their sense of smell. The Loihi chip can identify a specific odor on the first try and even tell other background smells, said Intel, according to Daily Mail.
    The chip can even detect smells humans emit when sick with a disease—which vary depending on the illness—and smells linked to environmental gases and drugs. The key to sniffer dogs isn’t their olfactory system alone, but their incredible ability to remember—this is why they’re trained. Similarly, the artificial intelligence of the chip is trained to identify different smells and remember them, so that next time, it knows.
    The chip processes information just like mammal brains by using electrical signals to process smells. When a person smells something, the air molecules interact with nasal receptors that forward signals to the olfactory bulb in the brain. Then brain translates the signals to identify which smell it's experiencing, based on memories of previous experiences with the specific smell.
    "We are developing a method for Loihi to mimic (模仿) what happens In your brain when you smell something," said Senior Research Scientist in Intels Lab, Nabil Imam, in a statement, according to Daily Mail. Imam added that the work “demonstrates Loihi’s potential to provide important sensing capabilities that could benefit various industries.”
    So far, the researchers have trained it on ten harmful smells. It can be installed on robots in airports to help identify hazardous objects, or integrated with sensors in power plants or hospitals to detect dangerous gases.
    Similar biotechnology has seen the implementation in grasshoppers recently outfitted with computer chips to sniff-out bombs. However, this negatively affects their lifespan, limiting their use.
    While sniffer dogs might one day be out of a job, the circuits using Al to mimic the process of smell bring us one step closer to recreating the human sensory system in artificial intelligence.`,
          contentCN: `据《每日邮报》报道，康奈尔大学和英特尔的研究人员制造了一种名为Loihi的芯片，据说它能让计算机像生物大脑一样思考。
    研究人员在芯片上创建了电路，模仿狗大脑嗅球中发现的有机电路，这就是它们处理嗅觉的方式。据《每日邮报》报道，英特尔表示，Loihi芯片可以在第一次尝试时识别特定的气味，甚至能分辨出其他背景气味。
    该芯片甚至可以检测人类生病时散发的气味——这些气味因疾病而异——以及与环境气体和药物相关的气味。嗅探犬的关键不仅仅在于它们的嗅觉系统，还在于它们惊人的记忆能力——这就是它们接受训练的原因。同样，芯片的人工智能也经过训练，能够识别不同的气味并记住它们，这样下次它就知道了。
    该芯片通过使用电信号来处理气味，其处理信息的方式与哺乳动物的大脑相同。当一个人闻到某种东西时，空气分子与鼻受体相互作用，鼻受体将信号转发到大脑中的嗅球。然后，大脑根据对特定气味的先前体验的记忆，将信号转化为识别它正在经历的是哪种气味。
    英特尔实验室的高级研究科学家纳比尔·伊玛姆在一份声明中说：“我们正在开发一种方法，让Loihi模仿你闻到东西时大脑中发生的事情。” 伊玛姆补充说，这项工作 “展示了Loihi提供重要传感能力的潜力，这可能会使各个行业受益。”
    到目前为止，研究人员已经对它进行了十种有害气味的训练。它可以安装在机场的机器人上，以帮助识别危险物品，或者与发电厂或医院的传感器集成，以检测危险气体。
    类似的生物技术最近在装有计算机芯片以嗅出炸弹的蚱蜢身上得到了应用。然而，这对它们的寿命有负面影响，限制了它们的使用。
    虽然有一天嗅探犬可能会失业，但使用人工智能模仿嗅觉过程的电路让我们离在人工智能中重建人类感官系统又近了一步。`,
        },
        questions: [
          {
            id: 'q1-1',
            type: 'reading',
            text: 'What do we learn about Loihi?',
            textCN: '关于Loihi我们了解到了什么？',
            options: [
              {
                id: 'q1-1-A',
                text: 'It is a high-tech device that produces computer chips',
                textCN: '它是一种生产计算机芯片的高科技设备',
              },
              {
                id: 'q1-1-B',
                text: 'It is a computer program that aids creating the circuit',
                textCN: '它是一个有助于创建电路的计算机程序',
              },
              {
                id: 'q1-1-C',
                text: 'It is a chip that uses AI technology to identify a smell',
                textCN: '它是一种使用人工智能技术识别气味的芯片',
              },
              {
                id: 'q1-1-D',
                text: "It is a dog's biological organ to process its sense of smell",
                textCN: '它是狗处理嗅觉的生物器官',
              },
            ],
            correctOptionId: 'q1-1-C',
            explanation:
              '文章开头提到Cornell University and Intel produced a chip called Loihi that reportedly makes computers think like biological brains以及后文对芯片识别气味等功能的描述，可知Loihi是一种使用人工智能技术识别气味的芯片。',
          },
          {
            id: 'q1-2',
            type: 'reading',
            text: 'What does the author think are crucial to sniffer dogs?',
            textCN: '作者认为对嗅探犬来说什么是至关重要的？',
            options: [
              {
                id: 'q1-2-A',
                text: 'Agility and intelligence.',
                textCN: '敏捷性和智力。',
              },
              {
                id: 'q1-2-B',
                text: 'Stamina and flexibility',
                textCN: '耐力和灵活性',
              },
              {
                id: 'q1-2-C',
                text: 'Sensitivity and information processing',
                textCN: '敏感性和信息处理',
              },
              {
                id: 'q1-2-D',
                text: 'Olfactory system and memory capacity',
                textCN: '嗅觉系统和记忆能力',
              },
            ],
            correctOptionId: 'q1-2-D',
            explanation:
              '文中提到The key to sniffer dogs isn’t their olfactory system alone, but their incredible ability to remember，说明作者认为嗅觉系统和记忆能力对嗅探犬至关重要。',
          },
          {
            id: 'q1-3',
            type: 'reading',
            text: 'How does the human sense of smell work?',
            textCN: '人类的嗅觉是如何工作的？',
            options: [
              {
                id: 'q1-3-A',
                text: 'The nose decodes smells and makes judgments',
                textCN: '鼻子解码气味并做出判断',
              },
              {
                id: 'q1-3-B',
                text: 'The brain processes smell signals and identifies it',
                textCN: '大脑处理气味信号并识别它',
              },
              {
                id: 'q1-3-C',
                text: 'The air molecules interact with the olfactory bulb.',
                textCN: '空气分子与嗅球相互作用。',
              },
              {
                id: 'q1-3-D',
                text: 'The nasal receptors translate signals into a specific smell',
                textCN: '鼻受体将信号转化为特定的气味',
              },
            ],
            correctOptionId: 'q1-3-B',
            explanation:
              "根据文中When a person smells something, the air molecules interact with nasal receptors that forward signals to the olfactory bulb in the brain. Then brain translates the signals to identify which smell it's experiencing可知人类嗅觉工作过程是大脑处理气味信号并识别它。",
          },
          {
            id: 'q1-4',
            type: 'reading',
            text: 'What have the researchers done with Loihi?',
            textCN: '研究人员对Loihi做了什么？',
            options: [
              {
                id: 'q1-4-A',
                text: 'Trained it on 20 harmful smells',
                textCN: '用20种有害气味训练它',
              },
              {
                id: 'q1-4-B',
                text: 'Applied it to various industries',
                textCN: '将它应用于各个行业',
              },
              {
                id: 'q1-4-C',
                text: 'Installed it on robots to help identify bombs',
                textCN: '将它安装在机器人上以帮助识别炸弹',
              },
              {
                id: 'q1-4-D',
                text: 'Tried to make it work like the human brain',
                textCN: '试图使它像人类大脑一样工作',
              },
            ],
            correctOptionId: 'q1-4-D',
            explanation: `文中提到"We are developing a method for Loihi to mimic (模仿) what happens In your brain when you smell something,"说明研究人员试图使Loihi像人类大脑一样工作。`,
          },
          {
            id: 'q1-5',
            type: 'reading',
            text: 'What is the defect in applying biotechnology to grasshoppers?',
            textCN: '将生物技术应用于蚱蜢的缺陷是什么？',
            options: [
              {
                id: 'q1-5-A',
                text: 'They are less sensitive than sniffer dogs',
                textCN: '它们比嗅探犬不敏感',
              },
              {
                id: 'q1-5-B',
                text: 'The harm to their life limits their application.',
                textCN: '对它们生命的伤害限制了它们的应用。',
              },
              {
                id: 'q1-5-C',
                text: 'They are in danger for being exposed to bombs',
                textCN: '它们因接触炸弹而处于危险之中',
              },
              {
                id: 'q1-5-D',
                text: 'The sensory system in them is under severe threat',
                textCN: '它们的感官系统受到严重威胁',
              },
            ],
            correctOptionId: 'q1-5-B',
            explanation:
              '文中提到Similar biotechnology has seen the implementation in grasshoppers recently outfitted with computer chips to sniff-out bombs. However, this negatively affects their lifespan, limiting their use.说明对蚱蜢生命的伤害限制了其应用。',
          },
        ],
      },
      {
        id: 'chapter1-reading1',
        title: '阅读理解 1',
        description: '关于美国铁路发展的阅读理解',
        type: 'reading',
        article: {
          id: 'article1',
          title: 'The Development of Railroads in the United States',
          titleCN: '美国铁路的发展',
          content: `A rapid means of long-distance transportation became a necessity for the United States as settlement spread ever farther westward. The early trains were impractical curiosities, and for a long time the railroad companies met with troublesome mechanical problems. The most serious ones were the construction of rails able to bear the load, and the development of a safe, effective stopping system. Once these were solved, the railroad was established as the best means of land transportation. By 1860 there were thousands of miles of railroads crossing the eastern mountain ranges and reaching westward to the Mississippi. There were also regional southern and western lines.
    The high point in railroad building came with the construction of the first transcontinental system. 1) In 1862 Congress authorized two western railroad companies to build lines from Nebraska westward and from California eastward to a meeting point, so as to complete a transcontinental crossing linking the Atlantic seaboard with the Pacific. The Government helped the railroads generously with money and land. Actual work on this project began four years later. The Central Pacific Company, starting from California, used Chinese labor, while the Union Pacific employed crews of Irish laborers. The two groups worked at remarkable speed, each trying to cover a greater distance than the other. In 1869 they met at a place called Promontory which is now the state of Utah. Many visitors came there for the great occasion. There were joyous celebrations all over the country, with parades and the ringing of church bells to honor the great achievement.
    The railroad was very important in encouraging westward movement. It helped build up industry and farming by moving raw materials and by distributing products rapidly to distant markets. In linking towns and people to one another it helped unify the United States.`,
          contentCN: `随着美国的定居点不断向西扩展，一种快速的长途运输方式成为了必需品。早期的火车是不切实际的新奇事物，在很长一段时间里，铁路公司都遇到了麻烦的机械问题。最严重的问题是建造能够承受负荷的铁轨，以及开发一种安全、有效的制动系统。一旦这些问题得到解决，铁路就被确立为最佳的陆地运输方式。到1860年，有成千上万英里的铁路穿过东部山脉，向西延伸到密西西比河。还有南部和西部的区域线路。
    铁路建设的高潮是第一条横贯大陆的铁路系统的建成。1862年，国会授权两家西部铁路公司修建从内布拉斯加向西和从加利福尼亚向东到一个会合点的线路，以便完成一条连接大西洋沿岸和太平洋的横贯大陆的通道。政府在资金和土地方面慷慨地帮助了铁路公司。这项工程的实际工作在四年后开始。中央太平洋公司从加利福尼亚开始，使用中国劳工，而联合太平洋公司雇佣了爱尔兰劳工队伍。两组人工作速度惊人，每组都试图比另一组覆盖更长的距离。1869年，他们在一个现在叫做普罗蒙特里的地方会合，这个地方现在是犹他州。许多游客为了这个盛大的场合来到那里。全国各地都举行了欢乐的庆祝活动，有游行和教堂钟声，以纪念这一伟大成就。
    铁路在鼓励西进运动方面非常重要。它通过运输原材料和将产品迅速分销到遥远的市场，帮助建立了工业和农业。在将城镇和人们相互连接起来的过程中，它有助于统一美国。`,
        },
        questions: [
          {
            id: 'q1-1',
            type: 'reading',
            text: 'What most likely made people think about a transcontinental railroad?',
            textCN: '最有可能促使人们考虑修建横贯大陆铁路的是什么？',
            options: [
              {
                id: 'q1-1-A',
                text: 'The possibility of government support for such a task.',
                textCN: '政府支持这项任务的可能性。',
              },
              {
                id: 'q1-1-B',
                text: 'The need to explore Utah.',
                textCN: '探索犹他州的需要。',
              },
              {
                id: 'q1-1-C',
                text: 'The need to connect the east coast with the west.',
                textCN: '连接东海岸和西海岸的需要。',
              },
              {
                id: 'q1-1-D',
                text: 'The need to develop the railroad industry in the west.',
                textCN: '发展西部铁路工业的需要。',
              },
            ],
            correctOptionId: 'q1-1-C',
            explanation:
              '文中提到1862年国会授权修建连接大西洋沿岸和太平洋的横贯大陆铁路，说明连接东西海岸的需求促使人们考虑修建这样的铁路。',
          },
          {
            id: 'q1-2',
            type: 'reading',
            text: "The major problems with America's railroad system in the mid-19th century lay in______.",
            textCN: '19世纪中叶美国铁路系统的主要问题在于______。',
            options: [
              {
                id: 'q1-2-A',
                text: 'poor quality rails and unreliable stopping systems',
                textCN: '铁轨质量差和制动系统不可靠',
              },
              {
                id: 'q1-2-B',
                text: 'lack of financial support for development',
                textCN: '缺乏发展资金支持',
              },
              {
                id: 'q1-2-C',
                text: 'limited railroad lines',
                textCN: '铁路线路有限',
              },
              {
                id: 'q1-2-D',
                text: 'lack of a transcontinental railroad',
                textCN: '缺乏横贯大陆的铁路',
              },
            ],
            correctOptionId: 'q1-2-A',
            explanation:
              '文中明确提到最严重的问题是建造能承受负荷的铁轨和开发安全有效的制动系统，即铁轨质量和制动系统问题。',
          },
          {
            id: 'q1-3',
            type: 'reading',
            text: 'The construction of the transcontinental railroad took_______.',
            textCN: '横贯大陆铁路的建设耗时_______。',
            options: [
              { id: 'q1-3-A', text: '9 years', textCN: '9年' },
              { id: 'q1-3-B', text: '7 year', textCN: '7年' },
              { id: 'q1-3-C', text: '4 year', textCN: '4年' },
              { id: 'q1-3-D', text: '3 years', textCN: '3年' },
            ],
            correctOptionId: 'q1-3-D',
            explanation:
              '1862年授权，四年后开始实际工作，1869年建成，所以建设耗时3年。',
          },
          {
            id: 'q1-4',
            type: 'reading',
            text: 'The building of the first transcontinental system_______.',
            textCN: '第一条横贯大陆铁路系统的建成_______。',
            options: [
              {
                id: 'q1-4-A',
                text: 'brought about a rapid growth of industry and farming in the west',
                textCN: '促进了西部工业和农业的快速发展',
              },
              {
                id: 'q1-4-B',
                text: 'attracted many visitors to the construction sites',
                textCN: '吸引了许多游客到建筑工地',
              },
              {
                id: 'q1-4-C',
                text: 'attracted laborers from Europe',
                textCN: '吸引了来自欧洲的劳工',
              },
              {
                id: 'q1-4-D',
                text: 'encouraged people to travel all over the country',
                textCN: '鼓励人们到全国各地旅行',
              },
            ],
            correctOptionId: 'q1-4-A',
            explanation:
              '文中提到铁路通过运输原材料和分销产品帮助建立了西部的工业和农业，促进了其快速发展。',
          },
          {
            id: 'q1-5',
            type: 'reading',
            text: 'The best title for this passage would be______.',
            textCN: '这篇文章的最佳标题是______。',
            options: [
              {
                id: 'q1-5-A',
                text: 'Settlements Spread Westward',
                textCN: '定居点向西扩展',
              },
              {
                id: 'q1-5-B',
                text: 'The Coast-to-Coast Railroad: A Vital Link',
                textCN: '横贯大陆的铁路：至关重要的纽带',
              },
              {
                id: 'q1-5-C',
                text: 'American Railroad History',
                textCN: '美国铁路历史',
              },
              {
                id: 'q1-5-D',
                text: 'The Importance of Railroads in the American Economy',
                textCN: '铁路在美国经济中的重要性',
              },
            ],
            correctOptionId: 'q1-5-B',
            explanation:
              '文章主要围绕第一条横贯大陆铁路的建设及其重要意义展开，它是连接东西海岸的关键纽带。',
          },
        ],
      },
      {
        id: 'chapter1-reading1',
        title: '阅读理解 1',
        description: '关于亨利·福特与美国汽车工业的阅读理解',
        type: 'reading',
        article: {
          id: 'article1',
          title: 'Henry Ford and the American Automobile',
          titleCN: '亨利·福特与美国汽车工业',
          content: `Detroit, America's Auto City, owes its rapid growth and one-time prosperity to automobile, and above all to Henry Ford.
    Henry Ford did not invent the automobile, but he was the first man to mass-produce it, and thus made it available to the ordinary man. Many automobiles were being built by hand at the turn of the century and were much too expensive for all but the wealthy. In 1903 Henry Ford's first mass-produced Model T cars cost $850. By the early 1920 he was able to reduce the price to $350. Between 1903 and 1927 Ford manufactured 15 million Model T Fords and earned a profit of $700 million. In 1927 he produced his sedan (轿车) Model A, which was much more comfortable than the open, windswept Model T.
    Henry Ford was himself a born mechanic and could build a car with his own hands. So he respected his workers and treated them well. In 1914, when the basic wage for an industrial worker in Detroit was $11 a week, Ford announced that he would pay his workers $5 a day. Ford believed in the dignity of work, and did not wish his men to become unpaid robots. He also built them a special town on the areas far away from the city center.
    Ford's basic wage of $5 a day caused not only a wage explosion in the city, but also a population explosion. Blacks from the south poured into the city, until there were almost as many blacks in Detroit as whites. Other industries connected with the automobile were attracted to Detroit, and more and more factories sprang up in and round the city.
    Henry Ford developed the idea of the assembly line. He proposed a system in which each worker would have a special job to do. Each worker needed to learn only one or two routine tasks. The really important part of Ford's idea was to bring the work to the worker. An automobile frame was put on a moving platform. As the frame moved past the workers, each worker could attach a single part. When the car reached the end of the line, it was completely assembled. With the increased production made possible by the assembly line, automobiles became much cheaper, and more and more people were able to afford them.
    Today it can be said that wheels run America. The majority of Americans would find it hard to imagine what life could be like without cars.`,
          contentCN: `底特律，美国的汽车城，其快速发展和曾经的繁荣归功于汽车，尤其是亨利·福特。
    亨利·福特没有发明汽车，但他是第一个大规模生产汽车的人，从而使普通人也能拥有汽车。在世纪之交，许多汽车是手工制造的，除了富人之外，对所有人来说都太贵了。1903年，亨利·福特的第一批大规模生产的T型车售价850美元。到20世纪20年代初，他能够将价格降至350美元。1903年至1927年间，福特生产了1500万辆T型福特车，获利7亿美元。1927年，他生产了轿车A型，比敞篷的、迎风的T型车舒适得多。
    亨利·福特本人是一个天生的机械师，能用自己的双手制造汽车。所以他尊重他的工人并善待他们。1914年，当底特律一名产业工人的基本工资是每周11美元时，福特宣布他将给工人每天支付5美元。福特相信工作的尊严，不希望他的工人成为没有报酬的机器人。他还在远离市中心的地方为他们建造了一个特别的城镇。
    福特每天5美元的基本工资不仅导致了该市的工资爆炸式增长，也导致了人口爆炸式增长。来自南方的黑人涌入这座城市，直到底特律的黑人几乎和白人一样多。与汽车相关的其他产业也被吸引到底特律，越来越多的工厂在城市及其周边涌现。
    亨利·福特提出了装配线的想法。他提出了一种系统，在这个系统中每个工人都有一项特殊的工作要做。每个工人只需要学习一两项常规任务。福特想法中真正重要的部分是把工作带给工人。一个汽车车架被放在一个移动的平台上。当车架经过工人时，每个工人可以安装一个零件。当汽车到达生产线的末端时，它就完全组装好了。由于装配线使产量增加，汽车变得便宜得多，越来越多的人能够买得起。
    今天可以说轮子驱动着美国。大多数美国人很难想象没有汽车的生活会是什么样。`,
        },
        questions: [
          {
            id: 'q1-1',
            type: 'reading',
            text: 'What is the best title for this passage?',
            textCN: '这篇文章的最佳标题是什么？',
            options: [
              {
                id: 'q1-1-A',
                text: 'Henry Ford and Detroit',
                textCN: '亨利·福特和底特律',
              },
              {
                id: 'q1-1-B',
                text: 'Henry Ford and His Model A',
                textCN: '亨利·福特和他的A型车',
              },
              {
                id: 'q1-1-C',
                text: 'Henry Ford and His Assembly Line',
                textCN: '亨利·福特和他的装配线',
              },
              {
                id: 'q1-1-D',
                text: 'Henry Ford and the American Automobile',
                textCN: '亨利·福特和美国汽车工业',
              },
            ],
            correctOptionId: 'q1-1-D',
            explanation:
              '文章内容围绕亨利·福特以及他所引领的美国汽车工业展开，所以选D。',
          },
          {
            id: 'q1-2',
            type: 'reading',
            text: 'The name of Henry Ford is closely linked to automobile because ________.',
            textCN: '亨利·福特的名字与汽车紧密相连是因为________。',
            options: [
              {
                id: 'q1-2-A',
                text: 'he was the first man to mass-produce it',
                textCN: '他是第一个大规模生产汽车的人',
              },
              {
                id: 'q1-2-B',
                text: 'he earned the biggest profit from it',
                textCN: '他从汽车中获得了最大的利润',
              },
              {
                id: 'q1-2-C',
                text: 'he invented the assembly line',
                textCN: '他发明了装配线',
              },
              {
                id: 'q1-2-D',
                text: 'he invented the automobile',
                textCN: '他发明了汽车',
              },
            ],
            correctOptionId: 'q1-2-A',
            explanation:
              '亨利·福特没有发明汽车，但是他却是第一位大批量生产汽车的人，从此让汽车进入千家万户，所以选A。',
          },
          {
            id: 'q1-3',
            type: 'reading',
            text: 'Henry Ford was himself a born mechanic (Para.3) means that ________.',
            textCN: '第三段中说亨利·福特本人是一个天生的机械师意味着________。',
            options: [
              {
                id: 'q1-3-A',
                text: 'he was born in a family of mechanics',
                textCN: '他出生在一个机械师家庭',
              },
              {
                id: 'q1-3-B',
                text: 'he was the hardest-working mechanic',
                textCN: '他是最努力工作的机械师',
              },
              {
                id: 'q1-3-C',
                text: 'he had a dream of becoming a mechanic',
                textCN: '他有成为一名机械师的梦想',
              },
              {
                id: 'q1-3-D',
                text: 'he had a gift for being a mechanic',
                textCN: '他有成为机械师的天赋',
              },
            ],
            correctOptionId: 'q1-3-D',
            explanation:
              'born意思是“天生的”，此句意思是亨利·福特是个天生的技工，与选项D的意思一致，所以选D。gift的意思是“天赋”。',
          },
          {
            id: 'q1-4',
            type: 'reading',
            text: 'Ford treated his workers well because ________.',
            textCN: '福特善待他的工人是因为________。',
            options: [
              {
                id: 'q1-4-A',
                text: 'he was very kind-hearted',
                textCN: '他非常心地善良',
              },
              {
                id: 'q1-4-B',
                text: 'he wanted to please them',
                textCN: '他想取悦他们',
              },
              { id: 'q1-4-C', text: 'he respected them', textCN: '他尊重他们' },
              {
                id: 'q1-4-D',
                text: 'he wanted them to work harder',
                textCN: '他想让他们更努力工作',
              },
            ],
            correctOptionId: 'q1-4-C',
            explanation:
              '根据原文第三段第二句，他尊重工人，而且对他们很好，所以选C。',
          },
          {
            id: 'q1-5',
            type: 'reading',
            text: 'The essential idea of the assembly line is ________.',
            textCN: '装配线的重要理念是________。',
            options: [
              {
                id: 'q1-5-A',
                text: 'to put Americans on wheel',
                textCN: '让美国人依赖汽车',
              },
              {
                id: 'q1-5-B',
                text: 'to bring the work to the worker',
                textCN: '把工作带给工人',
              },
              {
                id: 'q1-5-C',
                text: 'to get the workers to work less time',
                textCN: '让工人工作更少的时间',
              },
              {
                id: 'q1-5-D',
                text: 'to make each worker learn only one skill',
                textCN: '让每个工人只学习一项技能',
              },
            ],
            correctOptionId: 'q1-5-B',
            explanation:
              '根据原文第五段第四句，福特的这种想法最重要的是把工作带给工人，所以选B。',
          },
        ],
      },
      {
        id: 'chapter1-reading1',
        title: '阅读理解 1',
        description: '关于美国教育体制改革的阅读理解',
        type: 'reading',
        article: {
          id: 'article1',
          title: 'Reform of the Educational System in the US',
          titleCN: '美国教育体制改革',
          content: `In recent decades, the Nation has focused attention on the educational system, because of the growing importance of producing a trained and educated workforce. Many institutions, including government, private industry, and research organizations, are involved in improving the quality of education. The passage of the "No Child Left Behind Act" of 2001 established federal guidelines to ensure that all students in public elementary through secondary schools receive a high-quality education. Through this act, States are given some flexibility on how to spend the educational funds they are assigned. However, the Act requires standardized testing of all students in core subject areas. Students, teachers, and staff involved in education are held responsible for explaining the testing results, and teachers and teacher assistants must demonstrate that they are sufficiently qualified in the subjects or areas in which they teach. States are responsible for following these guidelines and can lose Federal funding if standards are not met. Despite this increased Federal role, States and local governments are still the most important regulators of public education. Many States had already begun to introduce performance standards individually prior to passage of the Act, and the Act still allows States a considerable amount of freedom of the implementation of its provisions.
    
    In an effort to promote reform in public education, many local and State governments have created public charter schools, in the belief that, by presenting students and their parents with a greater range of educational options, schools and students will be encouraged to strive (努力) for excellence. Charter schools, which usually are run by teachers and parents or, increasingly, by private firms, operate independently of the school system, set their own standards, and practice a variety of new teaching methods. Businesses strive to improve education by donating teaching equipment, lending personnel for teaching and advising, hosting visits to the workplace, and providing internship (实习) opportunities. Businesses also cooperate with educators to develop curricula that will provide students with the skills they need to cope with new technology in the workplace.`,
          contentCN: `近几十年来，由于培养训练有素和受过教育的劳动力的重要性日益增加，国家将注意力集中在教育系统上。许多机构，包括政府、私营企业和研究组织，都参与到提高教育质量的工作中。2001年通过的《不让一个孩子掉队法案》确立了联邦指导方针，以确保公立小学到中学的所有学生都能接受高质量的教育。通过这项法案，各州在如何使用分配给他们的教育资金方面有一定的灵活性。然而，该法案要求对所有学生进行核心学科领域的标准化测试。参与教育的学生、教师和工作人员有责任解释测试结果，教师和教师助理必须证明他们在所教授的学科或领域具备足够的资质。各州有责任遵守这些指导方针，如果不符合标准，可能会失去联邦资金。尽管联邦政府的作用有所增加，但州和地方政府仍然是公共教育最重要的监管者。在该法案通过之前，许多州已经开始单独引入绩效标准，该法案仍然允许各州在实施其条款方面有相当大的自由。
    
    为了推动公共教育改革，许多地方和州政府创建了公立特许学校，他们认为，通过为学生及其家长提供更广泛的教育选择，学校和学生将受到鼓励去追求卓越。特许学校通常由教师和家长运营，或者越来越多地由私人公司运营，独立于学校系统，设定自己的标准，并采用各种新的教学方法。企业通过捐赠教学设备、借调教学和咨询人员、安排参观工作场所以及提供实习机会来努力改善教育。企业还与教育工作者合作开发课程，为学生提供应对工作场所新技术所需的技能。`,
        },
        questions: [
          {
            id: 'q1-1',
            type: 'reading',
            text: 'Why do both the Nation and many institutions pay special attention to the improvement of educational system?',
            textCN: '为什么国家和许多机构都特别关注教育系统的改进？',
            options: [
              {
                id: 'q1-1-A',
                text: 'Because they have realized the importance of producing trained and educated workers.',
                textCN:
                  '因为他们已经意识到培养训练有素和受过教育的工人的重要性。',
              },
              {
                id: 'q1-1-B',
                text: 'Because they have been stuck in a sticky situation of lacking talented people.',
                textCN: '因为他们陷入了缺乏人才的困境。',
              },
              {
                id: 'q1-1-C',
                text: 'Because the present educational system is too old to meet the need of modern society.',
                textCN: '因为目前的教育系统太陈旧，无法满足现代社会的需求。',
              },
              {
                id: 'q1-1-D',
                text: 'Because they are responsible for the improvement of educational system.',
                textCN: '因为他们负责教育系统的改进。',
              },
            ],
            correctOptionId: 'q1-1-A',
            explanation:
              '文章第一段第一句中的内容提到由于受过训练和教育的劳动力的重要性与日俱增，国家已经把注意力集中在教育体制上了（the Nation has focused attention on the educational system, because of the growing importance of producing a trained and educated workforce），由此可以看出，在提高教育体制上引起了国家的特殊注意是因为国家已经意识到受过训练和教育的劳动力的重要性，所以选A。',
          },
          {
            id: 'q1-2',
            type: 'reading',
            text: 'What do we know about the "No Child Left Behind Act"?',
            textCN: '关于《不让一个孩子掉队法案》我们知道什么？',
            options: [
              {
                id: 'q1-2-A',
                text: 'The Act ensures that all students graduated from public elementary schools can attend secondary schools easily.',
                textCN: '该法案确保所有从公立小学毕业的学生都能轻松进入中学。',
              },
              {
                id: 'q1-2-B',
                text: 'The Act ensures that States have rights to spend the educational funds totally at their disposal.',
                textCN: '该法案确保各州有权完全自行支配教育资金。',
              },
              {
                id: 'q1-2-C',
                text: 'The Act requires that all students should take standardized testing in every subject.',
                textCN: '该法案要求所有学生在每个学科都要进行标准化测试。',
              },
              {
                id: 'q1-2-D',
                text: 'The Act requires that teachers and teacher assistants should be qualified for their job.',
                textCN: '该法案要求教师和教师助理应该胜任自己的工作。',
              },
            ],
            correctOptionId: 'q1-2-D',
            explanation:
              '文章第一段第六句中的内容谈及到了美国为了保证所有孩子都接受到高质量的教育，在2001年颁布的《不让一个孩子掉队法》，介绍了该法案的大致内容，其中提到教师和助理教师一定要表现出他们在所教的学科或领域十分胜任（...teachers and teacher assistants must demonstrate that they are sufficiently qualified in the subjects or areas in which they teach），由此可以看出，该法案要求教师和助理教师应该胜任自己的工作，所以选D。',
          },
          {
            id: 'q1-3',
            type: 'reading',
            text: 'What will happen if States fail to follow the standards set by the Act?',
            textCN: '如果各州不遵守该法案设定的标准会发生什么？',
            options: [
              {
                id: 'q1-3-A',
                text: 'They will not get funds from the Federal government.',
                textCN: '他们将得不到联邦政府的资金。',
              },
              {
                id: 'q1-3-B',
                text: 'They will lose their rights to regulate public education.',
                textCN: '他们将失去监管公共教育的权利。',
              },
              {
                id: 'q1-3-C',
                text: 'They will have to introduce performance standards by themselves.',
                textCN: '他们将不得不自己引入绩效标准。',
              },
              {
                id: 'q1-3-D',
                text: 'They will not have the rights to implement many provisions.',
                textCN: '他们将没有权利实施许多条款。',
              },
            ],
            correctOptionId: 'q1-3-A',
            explanation:
              '文章第一段第七句中的内容提到各州有责任遵循这些指导原则，如果没达到要求则会失去联邦政府的资金（States are responsible for following these guidelines and can lose Federal funding if standards are not met），由此可以看出，如果各州没有遵守法案所提出的要求，那么就会得不到联邦政府的资金，所以选A。',
          },
          {
            id: 'q1-4',
            type: 'reading',
            text: 'What is the educational idea behind establishing public charter schools?',
            textCN: '建立公立特许学校背后的教育理念是什么？',
            options: [
              {
                id: 'q1-4-A',
                text: 'Teaching will be more effective when students and parents are offered more educational choices.',
                textCN: '当为学生和家长提供更多教育选择时，教学将更有效。',
              },
              {
                id: 'q1-4-B',
                text: 'Establishment of charter schools is an essential step in educational reform.',
                textCN: '建立特许学校是教育改革的重要一步。',
              },
              {
                id: 'q1-4-C',
                text: 'The involvement of both students and parents will promote the improvement of education.',
                textCN: '学生和家长的参与将促进教育的改善。',
              },
              {
                id: 'q1-4-D',
                text: 'Private firms may play an important part in the reform in public education.',
                textCN: '私人公司可能在公共教育改革中发挥重要作用。',
              },
            ],
            correctOptionId: 'q1-4-A',
            explanation:
              '文章第二段第一句中的内容提到许多当地的州政府已经建立了公共特许学校，他们相信，通过给学生和他们的父母更广泛的教育选择权，学校和学生会努力追求更好（many local and State governments have created public charter schools, in the belief that, by presenting students and their parents with a greater range of educational options, schools and students will be encouraged to strive for excellence），由此可以推断出，建立公共特许学校的教育意义在于通过学生获得更多的教育选择权使教学很有效，所以选A。',
          },
          {
            id: 'q1-5',
            type: 'reading',
            text: 'What do businesses do to improve education quality?',
            textCN: '企业为提高教育质量做了什么？',
            options: [
              {
                id: 'q1-5-A',
                text: 'They donate teaching funds.',
                textCN: '他们捐赠教学资金。',
              },
              {
                id: 'q1-5-B',
                text: 'They provide jobs for students.',
                textCN: '他们为学生提供工作。',
              },
              {
                id: 'q1-5-C',
                text: 'They help educators improve curricula.',
                textCN: '他们帮助教育工作者改进课程。',
              },
              {
                id: 'q1-5-D',
                text: 'They offer teaching staff for free.',
                textCN: '他们免费提供教师。',
              },
            ],
            correctOptionId: 'q1-5-C',
            explanation:
              '文章第二段最后一句中的内容提到商业也会和教育工作者合作来提高课程质量（Businesses also cooperate with educators to develop curricula...），由此可以看出，商业方面在提高教育质量方面的做法，选项C符合文章原意，所以选C。',
          },
        ],
      },
      {
        id: 'chapter1-reading1',
        title: '阅读理解 1',
        description:
          '关于女权主义及弗吉尼亚·伍尔夫作品《一间自己的房间》的阅读理解',
        type: 'reading',
        article: {
          id: 'article1',
          title: "Feminism and Virginia Woolf's A Room of One's Own",
          titleCN: '女权主义与弗吉尼亚·伍尔夫的《一间自己的房间》',
          content: `The beginning of the 20th century was characterized by the wide spread of the feminist (女权主义的) movement, although suffragists (妇女政权论者) were mainly concerned with women's voting rights. In her work A Room of One's Own, Virginia Woolf emphasizes that women should have equal rights with men as to fiction writing. As the author acknowledges, in the patriarchal (父权制的) world females have little opportunities to reveal their individualities and freely express their thoughts. Clearly criticizing male dominance over women, the work uncovers social prejudices and mentions all barriers to female writing. Woolf holds that those women who want to be writers should reject any dependence and imposed social roles. In her opinion, females should not imitate males or their writing; recognizing gender differences, she insists on the formation of a female style of writing.
    　　In A Room of One's Own, Woolf strengthens a distinct subjective voice, uncovering a female search for herself and inner integrity. In this context, Woolf's essay is an attempt to create an image of a woman who finds a balance between opposites and who has enough resources to acquire her own room, where she can think and write. As Woolf implies "it is far more important to know how much money women had and how many rooms than to theorize about their capacities." For Woolf, such economic independence of women paves the way to freedom of thought and social equality. In A Room of One's Own Woolf definitely shows that "women's right to earn is the only right worth having."
    　　Unquestionably, this obsession (迷恋) with female economic independence was unusual for many feminists of the 1920s; however, Woolf depicts that real feminism is deeply rooted in all spheres of life. The author considers that the poverty results in poor education and wastes lives of women; in this regard, A Room of One's Own is a rebellion against social and political constraints (约束，限制), in general, and patriarchy, in particular.`,
          contentCN: `20世纪初的特点是女权运动广泛传播，尽管妇女政权论者主要关注妇女的投票权。在她的作品《一间自己的房间》中，弗吉尼亚·伍尔夫强调女性在小说写作方面应与男性享有平等权利。正如作者所承认的，在父权制世界中，女性几乎没有机会展现自己的个性并自由表达思想。这部作品明确批评了男性对女性的主导地位，揭示了社会偏见，并提及了女性写作的所有障碍。伍尔夫认为，那些想成为作家的女性应该拒绝任何依赖和强加的社会角色。在她看来，女性不应模仿男性或他们的写作；认识到性别差异，她坚持形成女性写作风格。
    　　在《一间自己的房间》中，伍尔夫强化了一种独特的主观声音，揭示了女性对自我和内在完整性的探索。在这种背景下，伍尔夫的文章试图塑造一个在对立之间找到平衡、有足够资源获得自己房间的女性形象，在那里她可以思考和写作。正如伍尔夫所暗示的：“了解女性拥有多少钱和多少房间远比理论化她们的能力重要得多。”对伍尔夫来说，女性的这种经济独立为思想自由和社会平等铺平了道路。在《一间自己的房间》中，伍尔夫明确表示：“女性的挣钱权利是唯一值得拥有的权利。”
    　　毫无疑问，这种对女性经济独立的痴迷对20世纪20年代的许多女权主义者来说是不寻常的；然而，伍尔夫描绘了真正的女权主义深深扎根于生活的各个领域。作者认为贫困导致女性教育水平低下并浪费了她们的生命；在这方面，《一间自己的房间》是对社会和政治约束，特别是父权制的一种反抗。`,
        },
        questions: [
          {
            id: 'q1-1',
            type: 'reading',
            text: 'Virginia Woolf was not a suffragist because she ________.',
            textCN: '弗吉尼亚·伍尔夫不是妇女政权论者，因为她________。',
            options: [
              {
                id: 'q1-1-A',
                text: 'advocated female rights',
                textCN: '主张女性权利',
              },
              {
                id: 'q1-1-B',
                text: "was concerned very much with women' voting rights",
                textCN: '非常关注女性的投票权',
              },
              {
                id: 'q1-1-C',
                text: 'emphasized that women can write fictions as well as men',
                textCN: '强调女性可以和男性一样写小说',
              },
              {
                id: 'q1-1-D',
                text: "was concerned with women' fiction writing rights rather than their voting rights",
                textCN: '关注女性的小说写作权利而不是投票权',
              },
            ],
            correctOptionId: 'q1-1-D',
            explanation:
              "文章开头提到‘although suffragists (妇女政权论者) were mainly concerned with women's voting rights. In her work A Room of One's Own, Virginia Woolf emphasizes that women should have equal rights with men as to fiction writing.’说明弗吉尼亚·伍尔夫关注的是女性小说写作权利而非投票权，所以她不是妇女政权论者。",
          },
          {
            id: 'q1-2',
            type: 'reading',
            text: "Which section should <A Room of One's Own> be put in the library bookshelf?",
            textCN: '《一间自己的房间》应该放在图书馆书架的哪个部分？',
            options: [
              { id: 'q1-2-A', text: 'Autobiography.', textCN: '自传' },
              { id: 'q1-2-B', text: 'Literary criticism.', textCN: '文学批评' },
              { id: 'q1-2-C', text: 'Fictional works.', textCN: '虚构作品' },
              { id: 'q1-2-D', text: 'Political comment.', textCN: '政治评论' },
            ],
            correctOptionId: 'q1-2-B',
            explanation:
              '文章主要围绕弗吉尼亚·伍尔夫对女性写作权利等的观点展开论述，属于文学批评范畴，所以应放在文学批评部分。',
          },
          {
            id: 'q1-3',
            type: 'reading',
            text: 'The words "herself" (Para.2) is not a wrong expression, and it most probably indicates ________.',
            textCN:
              '第二段中的‘herself’这个词没有错误，它最有可能表示________。',
            options: [
              {
                id: 'q1-3-A',
                text: 'independent being of the female',
                textCN: '女性的独立存在',
              },
              {
                id: 'q1-3-B',
                text: 'any female writer',
                textCN: '任何女性作家',
              },
              {
                id: 'q1-3-C',
                text: 'Virginia Woolf herself',
                textCN: '弗吉尼亚·伍尔夫本人',
              },
              {
                id: 'q1-3-D',
                text: 'feminist thoughts',
                textCN: '女权主义思想',
              },
            ],
            correctOptionId: 'q1-3-A',
            explanation:
              '根据前文提到的女性对自我和内在完整性的探索以及伍尔夫强调女性要拒绝依赖等内容，这里的‘herself’指女性的独立存在。',
          },
          {
            id: 'q1-4',
            type: 'reading',
            text: 'According to Virginia Woolf, ________ is most important for a woman who searches for inner integrity.',
            textCN:
              '根据弗吉尼亚·伍尔夫的观点，对于一个寻求内在完整性的女性来说，________是最重要的。',
            options: [
              {
                id: 'q1-4-A',
                text: 'striking a balance between opposites',
                textCN: '在对立之间找到平衡',
              },
              {
                id: 'q1-4-B',
                text: 'acquiring a room of her own',
                textCN: '获得自己的房间',
              },
              {
                id: 'q1-4-C',
                text: 'theorizing her capacity',
                textCN: '理论化她的能力',
              },
              {
                id: 'q1-4-D',
                text: 'seeking economic independence',
                textCN: '寻求经济独立',
              },
            ],
            correctOptionId: 'q1-4-D',
            explanation:
              '文中提到‘For Woolf, such economic independence of women paves the way to freedom of thought and social equality.’说明经济独立对寻求内在完整性的女性很重要。',
          },
          {
            id: 'q1-5',
            type: 'reading',
            text: 'The real feminism, in the view of Woolf, is deeply rooted in ________.',
            textCN: '在伍尔夫看来，真正的女权主义深深扎根于________。',
            options: [
              {
                id: 'q1-5-A',
                text: 'all spheres of life',
                textCN: '生活的各个领域',
              },
              { id: 'q1-5-B', text: 'poor education', textCN: '教育水平低下' },
              {
                id: 'q1-5-C',
                text: 'lack of particular interest in female',
                textCN: '对女性缺乏特别关注',
              },
              { id: 'q1-5-D', text: 'families only', textCN: '仅在家庭中' },
            ],
            correctOptionId: 'q1-5-A',
            explanation:
              '文章明确提到‘Woolf depicts that real feminism is deeply rooted in all spheres of life.’',
          },
        ],
      },
      {
        id: 'chapter15-cloze1',
        title: '完形填空 15',
        description: '关于父母收养孩子及子女感恩的完形填空',
        type: 'cloze',
        questions: [
          {
            id: 'c15-1',
            type: 'cloze',
            text: 'They were truly saints among ordinary people. They (75)_____ each of us from a life of poverty and loneliness.',
            textCN:
              '他们真是普通人中的圣人。他们(75)_____我们每个人脱离贫穷和孤独的生活。',
            options: [
              { id: 'c15-1-A', text: 'rescued', textCN: '拯救' },
              { id: 'c15-1-B', text: 'abandoned', textCN: '抛弃' },
              { id: 'c15-1-C', text: 'ignored', textCN: '忽视' },
              { id: 'c15-1-D', text: 'criticized', textCN: '批评' },
            ],
            correctOptionId: 'c15-1-A',
            explanation:
              '“rescued”意为“拯救”，“rescue...from...”为固定搭配，指父母将孩子从贫困孤独中拯救出来，符合“圣人”的形象及语境中收养孩子的善举。',
          },
          {
            id: 'c15-2',
            type: 'cloze',
            text: 'They were hardly able to (76)_____ themselves from bringing home more children to care for.',
            textCN: '他们几乎无法(76)_____自己从带回家更多孩子照顾的行为中。',
            options: [
              { id: 'c15-2-A', text: 'restrain', textCN: '抑制' },
              { id: 'c15-2-B', text: 'encourage', textCN: '鼓励' },
              { id: 'c15-2-C', text: 'persuade', textCN: '说服' },
              { id: 'c15-2-D', text: 'force', textCN: '强迫' },
            ],
            correctOptionId: 'c15-2-A',
            explanation:
              '“restrain”意为“抑制”，“restrain oneself from...”表示“抑制自己不做某事”，此处指父母难以抑制收养更多孩子的冲动，体现他们的爱心与责任感。',
          },
          {
            id: 'c15-3',
            type: 'cloze',
            text: 'If they had had the (77)_____, they certainly would have.',
            textCN: '如果他们有(77)_____，他们肯定会这么做。',
            options: [
              { id: 'c15-3-A', text: 'resources', textCN: '资源' },
              { id: 'c15-3-B', text: 'courage', textCN: '勇气' },
              { id: 'c15-3-C', text: 'permission', textCN: '许可' },
              { id: 'c15-3-D', text: 'chance', textCN: '机会' },
            ],
            correctOptionId: 'c15-3-A',
            explanation:
              '“resources”意为“资源”，指父母若有足够的经济或物质资源，会收养更多孩子，与前文“难以抑制收养行为”形成逻辑呼应，说明现实条件的限制。',
          },
          {
            id: 'c15-4',
            type: 'cloze',
            text: 'Most people do not realize how much they (78)_____ someone until they pass away.',
            textCN: '大多数人直到某人去世才意识到自己有多(78)_____他。',
            options: [
              { id: 'c15-4-A', text: 'appreciated', textCN: '感激' },
              { id: 'c15-4-B', text: 'hated', textCN: '憎恨' },
              { id: 'c15-4-C', text: 'feared', textCN: '害怕' },
              { id: 'c15-4-D', text: 'envied', textCN: '羡慕' },
            ],
            correctOptionId: 'c15-4-A',
            explanation:
              '“appreciated”意为“感激”，指人们通常在亲人离世后才意识到对其的感激之情，与后文子女主动向父母说“谢谢”形成对比，凸显珍惜当下的主题。',
          },
          {
            id: 'c15-5',
            type: 'cloze',
            text: `"My sisters and brothers and I did not want this to happen before we (79)_____ the words "Thank you" to our parents.`,
            textCN:
              '我和兄弟姐妹们不想在向父母(79)_____“谢谢”之前这种情况发生。',
            options: [
              { id: 'c15-5-A', text: 'uttered', textCN: '说出' },
              { id: 'c15-5-B', text: 'wrote', textCN: '写下' },
              { id: 'c15-5-C', text: 'forgot', textCN: '忘记' },
              { id: 'c15-5-D', text: 'recorded', textCN: '记录' },
            ],
            correctOptionId: 'c15-5-A',
            explanation:
              "“uttered”意为“说出”，强调亲口向父母表达感谢，与“words 'Thank you'”直接搭配，体现子女希望及时感恩的迫切心情。",
          },
          {
            id: 'c15-6',
            type: 'cloze',
            text: 'Although we have all grown up and (80)_____ about the country, we got back together to thank our parents.',
            textCN:
              '尽管我们都已长大并(80)_____全国各地，但我们还是聚在一起感谢父母。',
            options: [
              { id: 'c15-6-A', text: 'scattered', textCN: '分散' },
              { id: 'c15-6-B', text: 'gathered', textCN: '聚集' },
              { id: 'c15-6-C', text: 'stayed', textCN: '停留' },
              { id: 'c15-6-D', text: 'travelled', textCN: '旅行' },
            ],
            correctOptionId: 'c15-6-A',
            explanation:
              '“scattered”意为“分散”，指子女们分散在全国各地，与“got back together”形成对比，突出团聚感恩的不易与珍贵。',
          },
          {
            id: 'c15-7',
            type: 'cloze',
            text: 'My brother Tom (81)_____ the task of organizing the event.',
            textCN: '我哥哥汤姆(81)_____组织这次活动的任务。',
            options: [
              { id: 'c15-7-A', text: 'undertook', textCN: '承担' },
              { id: 'c15-7-B', text: 'avoided', textCN: '避免' },
              { id: 'c15-7-C', text: 'delayed', textCN: '推迟' },
              { id: 'c15-7-D', text: 'regretted', textCN: '后悔' },
            ],
            correctOptionId: 'c15-7-A',
            explanation:
              '“undertook”意为“承担”，“undertake the task”为固定搭配，指汤姆主动承担组织活动的责任，体现兄弟姐妹间的分工与协作。',
          },
          {
            id: 'c15-8',
            type: 'cloze',
            text: 'When we first caught a (82)_____ of them coming across the street, we all hid...',
            textCN:
              '当我们第一次(82)_____他们穿过街道走来时，我们都躲了起来...',
            options: [
              { id: 'c15-8-A', text: 'glimpse', textCN: '一瞥' },
              { id: 'c15-8-B', text: 'look', textCN: '看' },
              { id: 'c15-8-C', text: 'picture', textCN: '图片' },
              { id: 'c15-8-D', text: 'memory', textCN: '记忆' },
            ],
            correctOptionId: 'c15-8-A',
            explanation:
              '“glimpse”意为“一瞥”，“catch a glimpse of”为固定短语，指短暂看到父母，符合子女们悄悄准备惊喜时的情景，体现紧张又期待的心情。',
          },
          {
            id: 'c15-9',
            type: 'cloze',
            text: 'we all hid (83)_____ a big table.',
            textCN: '我们都躲在一张大桌子(83)_____。',
            options: [
              { id: 'c15-9-A', text: 'underneath', textCN: '下面' },
              { id: 'c15-9-B', text: 'on', textCN: '上面' },
              { id: 'c15-9-C', text: 'behind', textCN: '后面' },
              { id: 'c15-9-D', text: 'beside', textCN: '旁边' },
            ],
            correctOptionId: 'c15-9-A',
            explanation:
              '“underneath”意为“下面”，指子女们躲在桌子底下，与后文“leapt out”（跳出来）形成动作呼应，符合惊喜场景的空间逻辑。',
          },
          {
            id: 'c15-10',
            type: 'cloze',
            text: 'My brother Tom (84)_____ them with a card and we all hugged.',
            textCN: '我哥哥汤姆(84)_____他们一张卡片，我们都拥抱了他们。',
            options: [
              { id: 'c15-10-A', text: 'presented', textCN: '赠送' },
              { id: 'c15-10-B', text: 'stole', textCN: '偷' },
              { id: 'c15-10-C', text: 'borrowed', textCN: '借' },
              { id: 'c15-10-D', text: 'read', textCN: '读' },
            ],
            correctOptionId: 'c15-10-A',
            explanation:
              '“presented”意为“赠送”，“present sb. with sth.”为固定用法，指汤姆向父母赠送感谢卡片，是感恩行动的具体体现，符合温馨的家庭氛围。',
          },
        ],
      },
      {
        id: 'chapter15-cloze2',
        title: '完形填空 16',
        description: '关于虎鲸文化与遗传发展的完形填空',
        type: 'cloze',
        questions: [
          {
            id: 'c16-1',
            type: 'cloze',
            text: 'As one of the most (85)_____ predators（食肉动物), killer whales may not fit the (86)_____ of a cultured creature.',
            textCN:
              '作为最(85)_____的食肉动物之一，虎鲸可能不符合有文化生物的(86)_____。',
            options: [
              { id: 'c16-1-A', text: 'brutal', textCN: '凶猛的' },
              { id: 'c16-1-B', text: 'gentle', textCN: '温和的' },
              { id: 'c16-1-C', text: 'rare', textCN: '稀有的' },
              { id: 'c16-1-D', text: 'small', textCN: '小的' },
            ],
            correctOptionId: 'c16-1-A',
            explanation:
              '“brutal”意为“凶猛的”，与“食肉动物”身份匹配，且与后文“有文化生物”形成反差，突出虎鲸行为研究的突破性。',
          },
          {
            id: 'c16-2',
            type: 'cloze',
            text: 'As one of the most (85)_____ predators（食肉动物), killer whales may not fit the (86)_____ of a cultured creature.',
            textCN:
              '作为最(85)_____的食肉动物之一，虎鲸可能不符合有文化生物的(86)_____。',
            options: [
              { id: 'c16-2-A', text: 'image', textCN: '形象' },
              { id: 'c16-2-B', text: 'habit', textCN: '习惯' },
              { id: 'c16-2-C', text: 'diet', textCN: '饮食' },
              { id: 'c16-2-D', text: 'name', textCN: '名字' },
            ],
            correctOptionId: 'c16-2-A',
            explanation:
              '“image”意为“形象”，“fit the image”指符合某种形象，说明人们对虎鲸的固有认知与“有文化”相悖，为后文行为描述做铺垫。',
          },
          {
            id: 'c16-3',
            type: 'cloze',
            text: 'However, these beasts of the sea do display a vast range of highly (87)_____ behaviors that appear to be driving their genetic development.',
            textCN:
              '然而，这些海洋猛兽确实表现出一系列高度(87)_____的行为，这些行为似乎在推动它们的基因发展。',
            options: [
              { id: 'c16-3-A', text: 'refined', textCN: '复杂的' },
              { id: 'c16-3-B', text: 'simple', textCN: '简单的' },
              { id: 'c16-3-C', text: 'violent', textCN: '暴力的' },
              { id: 'c16-3-D', text: 'random', textCN: '随机的' },
            ],
            correctOptionId: 'c16-3-A',
            explanation:
              '“refined”意为“复杂的”，强调虎鲸行为的高度进化性，与“推动基因发展”形成因果关系，颠覆对其“单纯凶猛”的认知。',
          },
          {
            id: 'c16-4',
            type: 'cloze',
            text: 'The word “culture” comes from the Latin “colere,” which (88)_____ means “to cultivate.”',
            textCN: '“culture”一词源于拉丁语“colere”，(88)_____意为“培育”。',
            options: [
              { id: 'c16-4-A', text: 'literally', textCN: '字面地' },
              { id: 'c16-4-B', text: 'figuratively', textCN: '比喻地' },
              { id: 'c16-4-C', text: 'mistakenly', textCN: '错误地' },
              { id: 'c16-4-D', text: 'rarely', textCN: '很少地' },
            ],
            correctOptionId: 'c16-4-A',
            explanation:
              '“literally”意为“字面地”，指从词源角度直接解释词义，与“词源来自拉丁语”的语境匹配，体现文化定义的严谨性。',
          },
          {
            id: 'c16-5',
            type: 'cloze',
            text: 'In other words, it refers to anything that is (89)_____ or learnt, rather than instinctive or natural.',
            textCN:
              '换句话说，它指的是任何(89)_____或习得的东西，而不是本能或自然的。',
            options: [
              { id: 'c16-5-A', text: 'acquired', textCN: '获得的' },
              { id: 'c16-5-B', text: 'forgotten', textCN: '忘记的' },
              { id: 'c16-5-C', text: 'hidden', textCN: '隐藏的' },
              { id: 'c16-5-D', text: 'lost', textCN: '丢失的' },
            ],
            correctOptionId: 'c16-5-A',
            explanation:
              '“acquired”意为“获得的”，与“learnt”（习得的）并列，共同构成“文化”的定义，与“本能”形成对比，符合后文虎鲸学习行为的论述。',
          },
          {
            id: 'c16-6',
            type: 'cloze',
            text: 'the Eskimos of Greenland have developed certain genetic (90)_____ that help them digest and utilize this fat-rich diet',
            textCN:
              '格陵兰岛的爱斯基摩人已经形成了某些遗传(90)_____，帮助他们消化和利用这种高脂肪饮食',
            options: [
              { id: 'c16-6-A', text: 'adaptations', textCN: '适应' },
              { id: 'c16-6-B', text: 'defects', textCN: '缺陷' },
              { id: 'c16-6-C', text: 'diseases', textCN: '疾病' },
              { id: 'c16-6-D', text: 'mutations', textCN: '突变' },
            ],
            correctOptionId: 'c16-6-A',
            explanation:
              '“adaptations”意为“适应”，“genetic adaptations”指基因适应，与“消化高脂肪饮食”的功能匹配，体现文化（饮食方式）对基因的影响。',
          },
          {
            id: 'c16-7',
            type: 'cloze',
            text: 'thereby allowing them to (91)_____ in their cold climate.',
            textCN: '从而使他们能够在寒冷的气候中(91)_____。',
            options: [
              { id: 'c16-7-A', text: 'thrive', textCN: '繁荣' },
              { id: 'c16-7-B', text: 'suffer', textCN: '受苦' },
              { id: 'c16-7-C', text: 'starve', textCN: '挨饿' },
              { id: 'c16-7-D', text: 'freeze', textCN: '冻结' },
            ],
            correctOptionId: 'c16-7-A',
            explanation:
              '“thrive”意为“繁荣”，指爱斯基摩人通过基因适应在严寒中生存繁衍，与“高脂肪饮食适应”形成因果关系，体现文化与基因的良性互动。',
          },
          {
            id: 'c16-8',
            type: 'cloze',
            text: 'Like humans, killer whales have colonized a range of different (92)_____ across the globe, occupying every ocean basin on the planet',
            textCN:
              '像人类一样，虎鲸已经在全球范围内殖民了一系列不同的(92)_____，占据了地球上的每个海洋盆地',
            options: [
              { id: 'c16-8-A', text: 'habitats', textCN: '栖息地' },
              { id: 'c16-8-B', text: 'countries', textCN: '国家' },
              { id: 'c16-8-C', text: 'mountains', textCN: '山脉' },
              { id: 'c16-8-D', text: 'deserts', textCN: '沙漠' },
            ],
            correctOptionId: 'c16-8-A',
            explanation:
              '“habitats”意为“栖息地”，与“海洋盆地”对应，指虎鲸在不同海洋环境中的分布，为后文“不同捕猎技巧”做铺垫。',
          },
          {
            id: 'c16-9',
            type: 'cloze',
            text: 'with an empire that (93)_____ from pole to pole.',
            textCN: '其“帝国”(93)_____从极地到极地。',
            options: [
              { id: 'c16-9-A', text: 'extends', textCN: '延伸' },
              { id: 'c16-9-B', text: 'shrinks', textCN: '缩小' },
              { id: 'c16-9-C', text: 'disappears', textCN: '消失' },
              { id: 'c16-9-D', text: 'rotates', textCN: '旋转' },
            ],
            correctOptionId: 'c16-9-A',
            explanation:
              '“extends”意为“延伸”，“extend from pole to pole”指虎鲸分布范围极广，从极地延伸至另一极地，强调其栖息地的广泛性。',
          },
          {
            id: 'c16-10',
            type: 'cloze',
            text: "This, in turn, has a major effect on their diet, leading scientists to (94)_____ that the ability to learn population-specific hunting methods could be driving the animals' genetic development.",
            textCN:
              '这反过来又对它们的饮食产生重大影响，导致科学家(94)_____，学习特定种群捕猎方法的能力可能正在推动这些动物的基因发展。',
            options: [
              { id: 'c16-10-A', text: 'speculate', textCN: '推测' },
              { id: 'c16-10-B', text: 'deny', textCN: '否认' },
              { id: 'c16-10-C', text: 'prove', textCN: '证明' },
              { id: 'c16-10-D', text: 'ignore', textCN: '忽视' },
            ],
            correctOptionId: 'c16-10-A',
            explanation:
              '“speculate”意为“推测”，指科学家基于观察提出假设，与“可能正在推动”的不确定性表述匹配，体现科研结论的严谨性。',
          },
        ],
      },
      {
        id: 'chapter15-cloze3',
        title: '完形填空 17',
        description: '关于家庭聚餐对女孩体重控制行为影响的完形填空',
        type: 'cloze',
        questions: [
          {
            id: 'c17-1',
            type: 'cloze',
            text: 'New research shows girls who regularly have family meals are much less (95)_____ to adopt all kinds of extreme weight control (96)_____.',
            textCN:
              '最新研究表明，经常参加家庭聚餐的女孩更不(95)_____采取各种极端的体重控制(96)_____。',
            options: [
              { id: 'c17-1-A', text: 'likely', textCN: '可能的' },
              { id: 'c17-1-B', text: 'unlikely', textCN: '不可能的' },
              { id: 'c17-1-C', text: 'ready', textCN: '准备好的' },
              { id: 'c17-1-D', text: 'eager', textCN: '渴望的' },
            ],
            correctOptionId: 'c17-1-A',
            explanation:
              '“likely”意为“可能的”，“be less likely to”为固定搭配，表示“更不可能做某事”，符合研究结论中家庭聚餐对极端行为的抑制作用。',
          },
          {
            id: 'c17-2',
            type: 'cloze',
            text: 'New research shows girls who regularly have family meals are much less (95)_____ to adopt all kinds of extreme weight control (96)_____.',
            textCN:
              '最新研究表明，经常参加家庭聚餐的女孩更不(95)_____采取各种极端的体重控制(96)_____。',
            options: [
              { id: 'c17-2-A', text: 'behaviors', textCN: '行为' },
              { id: 'c17-2-B', text: 'ideas', textCN: '想法' },
              { id: 'c17-2-C', text: 'diets', textCN: '饮食' },
              { id: 'c17-2-D', text: 'goals', textCN: '目标' },
            ],
            correctOptionId: 'c17-2-A',
            explanation:
              '“behaviors”意为“行为”，与后文“催吐、使用泻药”等具体行为举例呼应，指极端的体重控制行为模式。',
          },
          {
            id: 'c17-3',
            type: 'cloze',
            text: 'The research...polled students aged 13 to 17 in 1999 who were (97)_____ up five years later.',
            textCN:
              '该研究……调查了1999年13至17岁的学生，并在五年后对他们进行(97)_____。',
            options: [
              { id: 'c17-3-A', text: 'followed', textCN: '跟踪' },
              { id: 'c17-3-B', text: 'called', textCN: '呼叫' },
              { id: 'c17-3-C', text: 'held', textCN: '持有' },
              { id: 'c17-3-D', text: 'given', textCN: '给予' },
            ],
            correctOptionId: 'c17-3-A',
            explanation:
              '“followed”意为“跟踪”，“follow up”为固定短语，指对研究对象进行后续追踪调查，体现研究的持续性和科学性。',
          },
          {
            id: 'c17-4',
            type: 'cloze',
            text: 'Regular family meals were found to have a protective effect (98)_____ of the girls’ age, weight, socio-economic status...',
            textCN:
              '研究发现，定期家庭聚餐具有保护作用，(98)_____女孩的年龄、体重、社会经济地位……',
            options: [
              { id: 'c17-4-A', text: 'regardless', textCN: '不管' },
              { id: 'c17-4-B', text: 'because', textCN: '因为' },
              { id: 'c17-4-C', text: 'full', textCN: '满的' },
              { id: 'c17-4-D', text: 'short', textCN: '短的' },
            ],
            correctOptionId: 'c17-4-A',
            explanation:
              '“regardless”意为“不管”，“regardless of”为固定搭配，指保护作用不受年龄、体重等因素影响，强调家庭聚餐作用的普遍性。',
          },
          {
            id: 'c17-5',
            type: 'cloze',
            text: 'Regular family meals were found to have a protective effect regardless of the girls’ age, weight, socio-economic status, dieting (99)_____ or relationship with her family.',
            textCN:
              '研究发现，定期家庭聚餐具有保护作用，不管女孩的年龄、体重、社会经济地位、节食(99)_____或与家人的关系如何。',
            options: [
              { id: 'c17-5-A', text: 'habits', textCN: '习惯' },
              { id: 'c17-5-B', text: 'problems', textCN: '问题' },
              { id: 'c17-5-C', text: 'success', textCN: '成功' },
              { id: 'c17-5-D', text: 'failure', textCN: '失败' },
            ],
            correctOptionId: 'c17-5-A',
            explanation:
              '“habits”意为“习惯”，“dieting habits”指节食习惯，与“年龄、体重”等并列，属于影响因素之一，体现研究变量的全面性。',
          },
          {
            id: 'c17-6',
            type: 'cloze',
            text: 'Experts say doctors should encourage families to have dinner at the table instead of on the couch in front of the television to (100)_____ against serious eating disorders.',
            textCN:
              '专家表示，医生应鼓励家庭在餐桌上而非电视机前的沙发上用餐，以(100)_____严重的饮食失调。',
            options: [
              { id: 'c17-6-A', text: 'protect', textCN: '保护' },
              { id: 'c17-6-B', text: 'prevent', textCN: '预防' },
              { id: 'c17-6-C', text: 'treat', textCN: '治疗' },
              { id: 'c17-6-D', text: 'diagnose', textCN: '诊断' },
            ],
            correctOptionId: 'c17-6-A',
            explanation:
              '“protect”意为“保护”，“protect against”为固定搭配，指通过正确用餐方式预防饮食失调，强调主动性和前瞻性。',
          },
          {
            id: 'c17-7',
            type: 'cloze',
            text: 'When adolescents are feeling that they’re not coping they turn to something that they can control and food is something (101)_____ and accessible for them to control.',
            textCN:
              '当青少年感到无法应对时，他们会转向可以控制的事物，而食物是他们可以控制的(101)_____且容易获得的东西。',
            options: [
              { id: 'c17-7-A', text: 'available', textCN: '可获得的' },
              { id: 'c17-7-B', text: 'expensive', textCN: '昂贵的' },
              { id: 'c17-7-C', text: 'delicious', textCN: '美味的' },
              { id: 'c17-7-D', text: 'strange', textCN: '奇怪的' },
            ],
            correctOptionId: 'c17-7-A',
            explanation:
              '“available”意为“可获得的”，与“accessible”（容易接近的）并列，强调食物作为控制对象的便利性，解释青少年选择极端饮食控制的原因。',
          },
          {
            id: 'c17-8',
            type: 'cloze',
            text: 'It’s about young people feeling connected with their family and that builds self-esteem and sense of worth and that can (102)_____ very actively against someone developing an eating disorder.',
            textCN:
              '这关乎年轻人与家人的联结感，这能建立自尊和价值感，并且可以非常积极地(102)_____饮食失调的发生。',
            options: [
              { id: 'c17-8-A', text: 'work', textCN: '起作用' },
              { id: 'c17-8-B', text: 'fight', textCN: '战斗' },
              { id: 'c17-8-C', text: 'argue', textCN: '争论' },
              { id: 'c17-8-D', text: 'wait', textCN: '等待' },
            ],
            correctOptionId: 'c17-8-A',
            explanation:
              '“work”意为“起作用”，“work against”指“对……起抑制作用”，说明家庭联结通过提升自尊来预防饮食失调，体现作用机制的科学性。',
          },
          {
            id: 'c17-9',
            type: 'cloze',
            text: 'It is (103)_____ that they feel very ashamed of their eating habits and often won’t eat with other people.',
            textCN:
              '他们(103)_____会对自己的饮食习惯感到非常羞耻，并且常常不愿与他人一起用餐。',
            options: [
              { id: 'c17-9-A', text: 'typical', textCN: '典型的' },
              { id: 'c17-9-B', text: 'unusual', textCN: '不寻常的' },
              { id: 'c17-9-C', text: 'funny', textCN: '有趣的' },
              { id: 'c17-9-D', text: 'lucky', textCN: '幸运的' },
            ],
            correctOptionId: 'c17-9-A',
            explanation:
              '“typical”意为“典型的”，指饮食失调患者羞于与人共餐是常见现象，与专家分析的“家庭聚餐重要性缺失”形成因果关联。',
          },
          {
            id: 'c17-10',
            type: 'cloze',
            text: 'Perhaps it’s because they haven’t (104)_____ the importance of the family meal in their growing up.',
            textCN:
              '也许是因为他们在成长过程中没有(104)_____家庭聚餐的重要性。',
            options: [
              { id: 'c17-10-A', text: 'favorable', textCN: '有利的' },
              { id: 'c17-10-B', text: 'realized', textCN: '意识到' },
              { id: 'c17-10-C', text: 'ignored', textCN: '忽视' },
              { id: 'c17-10-D', text: 'doubted', textCN: '怀疑' },
            ],
            correctOptionId: 'c17-10-B',
            explanation:
              '“realized”意为“意识到”，指患者未意识到家庭聚餐的重要性，导致缺乏健康饮食观念的引导，解释其饮食问题的根源。',
          },
        ],
      },
    ],
  },
  {
    id: 'chapter6',
    title: '第6套题',
    description: '包含阅读理解和完形填空',
    questionSets: [
      {
        id: 'chapter1-reading1',
        title: '阅读理解 1',
        description: '关于经济衰退期公司应对策略的阅读理解',
        type: 'reading',
        article: {
          id: 'article1',
          title: 'Innovation Needed Even in Recessions',
          titleCN: '经济衰退期也需要创新',
          content: `A theme is emerging from the flood of recent corporate earnings reports: cost cuts are boosting profits. Investors are cheering, but they shouldn't. Even in these tough times, more CEOs should be talking about how they are seeking out investments, developing new technologies and making acquisitions.
    That's what will set their companies up for a stronger future. Intel Corp.'s former CEO Gordon Moore had it right when he said years ago that "you can't save your way out of a recession." He meant that even in the toughest times, companies have to spend money on new ideas. Recessions always end, Moore often said, and when they do, companies that embraced innovation (创新) during the downturn won't be stuck with obsolete products and services. Instead, they'll have new things to offer once demand picks up again.
    "Customers don't come out of recessions spending the way they did before," said Chunka Mui, who has studied how companies can capitalise on opportunities during crises at his Chicago-based consulting firm, The Devil's Advocate Group. "They demand something different."
    Surprisingly few companies are following Moore's advice of innovating during recessions. Many have been weakened by the pullback in consumer and business spending as well as tight credit conditions, which is making it harder for companies to get loans to fund their operations. That's driven some to hold cash and make drastic cost cuts. They're slashing (大幅度削减) jobs and wages and closing stores and factories.
    The aggressive cuts have allowed companies to exceed Wall Street's expectations for their earnings. In fact, the "good" news has sent the Dow Jones industrial average above 10,000 for the first time in a year. The problem is that too many companies are making widespread, not focused cuts. They're telling every division to cut 10 percent of their work force or slashing marketing dollars by the same amount companywide.
    "That is a quick way to rid a company of costs. But it doesn't help it get in a better position going forward", says Cesare Mainardi, managing director at the consulting firm Booz & Co. And co-author of the new book Cut Costs, Grow Stronger, "and a downturn like this should force people's hand".`,
          contentCN: `从最近大量的企业收益报告中出现了一个主题：成本削减正在提高利润。投资者在欢呼，但他们不应该这样。即使在这些艰难时期，更多的首席执行官应该谈论他们如何寻求投资、开发新技术和进行收购。
    这将使他们的公司为更强大的未来做好准备。英特尔公司的前首席执行官戈登·摩尔几年前说得对，他说“你不能靠节省开支走出衰退”。他的意思是，即使在最艰难的时期，公司也必须在新想法上花钱。摩尔常说，衰退总会结束，当衰退结束时，在经济低迷时期接受创新的公司不会被过时的产品和服务所束缚。相反，一旦需求再次回升，他们将有新的东西可以提供。
    “顾客走出衰退后的消费方式与以前不同了，” Chunka Mui说，他在芝加哥的咨询公司The Devil's Advocate Group研究了公司如何在危机期间利用机会。“他们需要不同的东西。”
    令人惊讶的是，很少有公司遵循摩尔在衰退期间创新的建议。许多公司因消费者和企业支出的回落以及信贷紧缩而被削弱，这使得公司更难获得贷款来为其运营提供资金。这促使一些公司持有现金并进行大幅成本削减。他们正在大幅削减工作岗位和工资，关闭商店和工厂。
    激进的削减使公司的收益超出了华尔街的预期。事实上，这个“好”消息使道琼斯工业平均指数一年来首次突破10000点。问题是，太多公司进行的是广泛的削减，而不是有针对性的削减。他们要求每个部门削减10%的员工，或者在全公司范围内削减相同比例的营销费用。
    “这是一种让公司迅速削减成本的方法。但它无助于公司在未来获得更好的地位，” 博思艾伦咨询公司的董事总经理Cesare Mainardi说。他也是新书《削减成本，变得更强》的合著者，“这样的衰退应该迫使人们采取行动”。`,
        },
        questions: [
          {
            id: 'q1-1',
            type: 'reading',
            text: 'What does the author think companies should do during a recession?',
            textCN: '作者认为公司在经济衰退期间应该做什么？',
            options: [
              {
                id: 'q1-1-A',
                text: 'Cut jobs and wages so as to save more money.',
                textCN: '削减工作岗位和工资以节省更多资金。',
              },
              {
                id: 'q1-1-B',
                text: 'Seek ways to make the company go forward.',
                textCN: '寻求使公司前进的方法。',
              },
              {
                id: 'q1-1-C',
                text: 'Try hard to get loans to fund their operations.',
                textCN: '努力获得贷款以资助其运营。',
              },
              {
                id: 'q1-1-D',
                text: 'Motivate the employees by raising the salaries.',
                textCN: '通过提高工资来激励员工。',
              },
            ],
            correctOptionId: 'q1-1-B',
            explanation:
              '根据题干内容定位到首段第三句，Even in these tough times, more CEOs should be talking about how they are seeking out investments, developing new technologies and making acquisitions. 即使在这些艰难的时期，更多的首席执行官们应该讨论如何寻求投资、发展新技术以及进行收购。由此推断，作者认为在目前的经济危机下，各公司应该寻求使公司发展前进的路子。B项符合文意，故为答案。A与首段第2句意思相反。C是根据第4段第2句设的干扰项。D项属于过度推断。',
          },
          {
            id: 'q1-2',
            type: 'reading',
            text: "According to Gordon Moore, when the recession ends, companies that didn't innovate will _________.",
            textCN:
              '根据戈登·摩尔的说法，当经济衰退结束时，没有创新的公司将会_________。',
            options: [
              {
                id: 'q1-2-A',
                text: 'enjoy faster development with the money saved',
                textCN: '用节省的钱享受更快的发展',
              },
              {
                id: 'q1-2-B',
                text: 'set up more factories as consumer demand grows',
                textCN: '随着消费者需求增长建立更多工厂',
              },
              {
                id: 'q1-2-C',
                text: 'be hindered by out-of-date products and services',
                textCN: '被过时的产品和服务所阻碍',
              },
              {
                id: 'q1-2-D',
                text: 'attract more customers with traditional products',
                textCN: '用传统产品吸引更多客户',
              },
            ],
            correctOptionId: 'q1-2-C',
            explanation:
              "根据题干内容定位到第二段倒数第二句，Recessions always end, Moore often said, and when they do, companies that embraced innovation (创新) during the downturn won't be stuck with obsolete products and services. 摩尔常说，当危机过去时，曾经在低迷时期奉行革新的公司将不会被过时的产品和服务所困住。反过来可推断，在经济危机时不进行革新的公司会被过时的产品和服务所拖累，故答案为C，同时排除B。由该段第2句可知，摩尔不提倡节约成本，故排除A。D项内容属于主观臆断。",
          },
          {
            id: 'q1-3',
            type: 'reading',
            text: 'How do consumers change after the economic crisis?',
            textCN: '经济危机后消费者如何改变？',
            options: [
              {
                id: 'q1-3-A',
                text: 'They lose confidence in the market.',
                textCN: '他们对市场失去信心。',
              },
              {
                id: 'q1-3-B',
                text: 'They start to live within their means.',
                textCN: '他们开始量入为出。',
              },
              {
                id: 'q1-3-C',
                text: 'They have different ways of spending.',
                textCN: '他们有不同的消费方式。',
              },
              {
                id: 'q1-3-D',
                text: 'They try to avoid unnecessary expenditure.',
                textCN: '他们尽量避免不必要的开支。',
              },
            ],
            correctOptionId: 'q1-3-C',
            explanation:
              '根据题干内容定位到第三段，"Customers don\'t come out of recessions spending the way they did before," said Chunka Mui, who has studied how companies can capitalise on opportunities during crises at his Chicago-based consulting firm, The Devil\'s Advocate Group. "They demand something different." 顾客不会在衰退结束后还保留和以前一样的消费方式，他们需要不同的东西。显然，答案为C。对市场失去信心和量入为出应该是在衰退期间顾客的表现，而非衰退后，故排除A和B。D是文中所提到的衰退期间许多公司的做法，而非顾客的，故排除。',
          },
          {
            id: 'q1-4',
            type: 'reading',
            text: "What's Cesare Mainardi's opinion about companies' large-scale cuts?",
            textCN: 'Cesare Mainardi对公司大规模裁员的看法是什么？',
            options: [
              {
                id: 'q1-4-A',
                text: "They do no good to companies' future development.",
                textCN: '它们对公司的未来发展没有好处。',
              },
              {
                id: 'q1-4-B',
                text: 'They help the companies out of the crisis quickly.',
                textCN: '它们帮助公司迅速摆脱危机。',
              },
              {
                id: 'q1-4-C',
                text: 'They are the only way to get the expected profits.',
                textCN: '它们是获得预期利润的唯一途径。',
              },
              {
                id: 'q1-4-D',
                text: 'They force the employees to work much harder.',
                textCN: '它们迫使员工更加努力工作。',
              },
            ],
            correctOptionId: 'q1-4-A',
            explanation:
              '根据题干内容定位到文章末段段首，"That is a quick way to rid a company of costs. But it doesn\'t help it get in a better position going forward", 意为，“那是一种使公司快速降低成本的方法。但它不会帮助公司获得有利位置更好地前进”。第1句中的that和第2句的第一个it都是指上段末提到的公司大范围裁员或减少营销费用，而A则是对it doesn\'t help…going forward的同义转述，故选A。',
          },
          {
            id: 'q1-5',
            type: 'reading',
            text: 'What can be the best title for this passage?',
            textCN: '这篇文章的最佳标题是什么？',
            options: [
              {
                id: 'q1-5-A',
                text: 'Recession Not as Bad as Expected',
                textCN: '衰退没有预期的那么糟糕',
              },
              {
                id: 'q1-5-B',
                text: 'Ways to Save You Out of the Crisis',
                textCN: '摆脱危机的方法',
              },
              {
                id: 'q1-5-C',
                text: 'Financial Crisis Spreading the World',
                textCN: '金融危机蔓延全球',
              },
              {
                id: 'q1-5-D',
                text: 'Innovation Needed Even in Recessions',
                textCN: '经济衰退期也需要创新',
              },
            ],
            correctOptionId: 'q1-5-D',
            explanation:
              '文章首段即点明，在危机时期公司的投资者不应为削减成本能盈利而高兴，而应革新，寻求公司发展的新途径，接下来的两段则分析为什么要在经济衰退期进行革新，最后三段则说明很多公司在经济衰退期不革新而是大幅裁员和削减营销费用的坏处。由此不难看出，本文都是围绕经济衰退期应该进行革新这一主题而论述。四个标题中，与这一主题最符合的标题是D。',
          },
        ],
      },
      {
        id: 'chapter1-reading1',
        title: '阅读理解 1',
        description: '关于移民的阅读理解',
        type: 'reading',
        article: {
          id: 'article1',
          title: 'Birds of Passage',
          titleCN: '候鸟式移民',
          content: `A century ago, the immigrants from across the Atlantic included settlers and sojourners. Along with the many folks looking to make a permanent home in the United States came those who had no intention to stay, and who would make some money and then go home. Between 1908 and 1915, about 7 million people arrived while about 2 million departed. About a quarter of all Italian immigrants, for example, eventually returned to Italy for good. They even had an affectionate nickname,"uccelli di passaggio", birds of passage.
    
    Today, we are much more rigid about immigrants. We divide newcomers into two categories: legal or illegal, good or bad. We hail them as Americans in the making, or brand them as aliens (外国的) fit for deportation (驱逐出境). That framework has contributed mightily to our broken immigration system and the long political paralysis over how to fix it. We don't need more categories, but we need to change the way we think about categories. We need to look beyond strict definitions of legal and illegal. To start, we can recognise the new birds of passage, those living and thriving in the gray areas. We might then begin to solve our immigration challenges.
    
    Crop pickers, violinists, construction workers, entrepreneurs, engineers, home health-care aides and particle physicists are among today's birds of passage. They are energetic participants in a global economy driven by the flow of work, money and ideas. They prefer to come and go as opportunity calls them. They can manage to have a job in one place and a family in another.  
    
    With or without permission, they straddle (横跨) laws, jurisdictions and identities with ease. We need them to imagine the United States as a place where they can be productive for a while without committing themselves to staying forever. We need them to feel that home can be both here and there and that they can belong to two nations honourably.
    
    Accommodating this new world of people in motion will require new attitudes on both sides of the immigration battle. Looking beyond the culture war logic of right or wrong means opening up the middle ground and understanding that managing immigration today requires multiple paths and multiple outcomes, including some that are not easy to accomplish legally in the existing system.`,
          contentCN: `一个世纪前，跨越大西洋的移民包括定居者和旅居者。除了许多希望在美国永久定居的人之外，还有一些人无意留下，他们会赚些钱然后回家。在1908年至1915年期间，约有700万人抵达，而约200万人离开。例如，所有意大利移民中约有四分之一最终永久回到了意大利。他们甚至有一个亲切的昵称：“uccelli di passaggio”，即候鸟式移民。
    
    如今，我们对移民的态度更加僵化。我们将新移民分为两类：合法或非法、好或坏。我们要么将他们视为正在形成的美国人，要么将他们视为适合被驱逐出境的外国人。这种框架极大地导致了我们破碎的移民系统以及在如何修复它方面长期的政治瘫痪。我们不需要更多的类别，而是需要改变我们思考类别的方式。我们需要超越合法和非法的严格定义。首先，我们可以认识到新的候鸟式移民，那些在灰色地带生活和繁荣的人。然后，我们或许可以开始解决我们的移民挑战。
    
    农作物采摘工、小提琴家、建筑工人、企业家、工程师、家庭医疗护理助手和粒子物理学家都属于当今的候鸟式移民。他们是由工作、金钱和思想流动驱动的全球经济中的积极参与者。他们更喜欢随机会的召唤来来去去。他们可以设法在一个地方工作，在另一个地方安家。
    
    无论是否得到许可，他们都能轻松跨越法律、司法管辖区和身份。我们需要他们将美国想象成一个他们可以在一段时间内富有成效而不必承诺永远留下来的地方。我们需要他们觉得家可以在这里也可以在那里，并且他们可以光荣地属于两个国家。
    
    适应这个流动的新世界的人们需要移民斗争双方都有新的态度。超越对错的文化战争逻辑意味着开辟中间地带，并理解如今管理移民需要多种途径和多种结果，包括一些在现有系统中难以合法实现的结果。`,
        },
        questions: [
          {
            id: 'q1-1',
            type: 'reading',
            text: 'According to the passage, "birds of passage" refers to those who ________.',
            textCN: '根据文章，“候鸟式移民”指的是那些________的人。',
            options: [
              {
                id: 'q1-1-A',
                text: 'immigrate across the Atlantic',
                textCN: '跨越大西洋移民',
              },
              {
                id: 'q1-1-B',
                text: 'leave their home countries for good',
                textCN: '永远离开他们的祖国',
              },
              {
                id: 'q1-1-C',
                text: 'stay in a foreign country temporarily',
                textCN: '暂时留在外国',
              },
              {
                id: 'q1-1-D',
                text: 'find permanent jobs overseas',
                textCN: '在海外找到永久工作',
              },
            ],
            correctOptionId: 'q1-1-C',
            explanation:
              '第1段第2句提到，移民美国的人群中包括那些并不打算留下来、赚些钱就回家的人，接着第3句和第4句分别以某一时期来了又离开的人口数据和意大利为例指出，这类人不在少数，最后引用这类人的绰号，表明这类人就是birds of passage，因此本题可以反推回去，birds of passage指的就是C)所说的这类人。文中第1句说横穿大西洋的移民中有定居者也有旅居者，因此A)的范围比birds of passage大。选项B)和D)都与birds of passage所指的人群正好相反，故排除。',
          },
          {
            id: 'q1-2',
            type: 'reading',
            text: 'It is implied in the second paragraph that the current immigration system in the US ________.',
            textCN: '第二段暗示了美国目前的移民系统________。',
            options: [
              {
                id: 'q1-2-A',
                text: 'needs new immigrant categories',
                textCN: '需要新的移民类别',
              },
              {
                id: 'q1-2-B',
                text: 'has loosened control over immigrants',
                textCN: '对移民放松了控制',
              },
              {
                id: 'q1-2-C',
                text: 'should be adopted to meet challenges',
                textCN: '应该被采用以应对挑战',
              },
              {
                id: 'q1-2-D',
                text: 'has been fixed via political means',
                textCN: '已经通过政治手段修复',
              },
            ],
            correctOptionId: 'q1-2-C',
            explanation:
              '第2段第2、3句具体描述了当下美国移民体系的特点，即对新近移民进行分类，接着第4句指出这种形式的分类导致移民体系被破坏以及执政者的不作为，第5句之后则介绍了我们应该如何改变才能应对种种移民问题，由此可以推测，本段暗示了当今的移民体系应该被改变才能应对移民问题，故C)正确。第2段第5句说我们不需要更多的分类，故A)可以排除。第2段没有提到美国放松了对移民的控制，故排除B)。第2段第4句说当今的移民体系导致执政者在修复移民体系问题上的不作为，故D)也与原文不符。',
          },
          {
            id: 'q1-3',
            type: 'reading',
            text: "According to the author, what do today's birds of passage want?",
            textCN: '根据作者的说法，当今的候鸟式移民想要什么？',
            options: [
              {
                id: 'q1-3-A',
                text: 'Financial incentives.',
                textCN: '经济激励。',
              },
              {
                id: 'q1-3-B',
                text: 'A global recognition.',
                textCN: '全球认可。',
              },
              {
                id: 'q1-3-C',
                text: 'Opportunities to get regular jobs.',
                textCN: '获得正规工作的机会。',
              },
              {
                id: 'q1-3-D',
                text: 'The freedom to stay and leave.',
                textCN: '来去自由。',
              },
            ],
            correctOptionId: 'q1-3-D',
            explanation:
              '原文第3段首先列举了当今birds of passage所包含的一些人群，接着第3句说这些birds of passage喜欢在机会召唤他们的时候来去自如，因此可知，D)所述的正是birds of passage想要的。第3段第2句说birds of passage受到工作、金钱和观念的驱使，但并没有说金钱的激励是他们想要的，故排除A)。选项B)和C)属于无中生有，可予以排除。',
          },
          {
            id: 'q1-4',
            type: 'reading',
            text: 'What does the author suggest do in the end of the passage?',
            textCN: '作者在文章结尾建议做什么？',
            options: [
              {
                id: 'q1-4-A',
                text: 'Force all illegal immigrants to leave US for good.',
                textCN: '迫使所有非法移民永远离开美国。',
              },
              {
                id: 'q1-4-B',
                text: 'Abolish the current immigrant managing system.',
                textCN: '废除当前的移民管理系统。',
              },
              {
                id: 'q1-4-C',
                text: "Treat today's birds of passage with legal tolerance.",
                textCN: '以法律宽容对待当今的候鸟式移民。',
              },
              {
                id: 'q1-4-D',
                text: 'Introduce stricter immigration quotas in America.',
                textCN: '在美国引入更严格的移民配额。',
              },
            ],
            correctOptionId: 'q1-4-C',
            explanation:
              '文中最后一段末句提到，要允许移民保留自己的文化，并明白如今的移民管理需要多条途径和多种结果，包括一些在现存的体系下不容易合法达成的结果，由此可以推断，作者是想建议人们要宽容地对待移民，所以本题选C)。其他三个选项都与作者的意图不符，予以排除。',
          },
          {
            id: 'q1-5',
            type: 'reading',
            text: 'The author intends to tell us that it is a big mistake to ________.',
            textCN: '作者想告诉我们，________是一个大错误。',
            options: [
              {
                id: 'q1-5-A',
                text: 'be tolerant towards illegal immigrants',
                textCN: '对非法移民宽容',
              },
              {
                id: 'q1-5-B',
                text: 'give permanent residence to aliens',
                textCN: '给外国人永久居留权',
              },
              {
                id: 'q1-5-C',
                text: 'link specific migrants to specific jobs',
                textCN: '将特定移民与特定工作联系起来',
              },
              {
                id: 'q1-5-D',
                text: 'see all immigrants as legal or illegal',
                textCN: '将所有移民视为合法或非法',
              },
            ],
            correctOptionId: 'q1-5-D',
            explanation:
              '文中第1段指出，以前的移民制度较为宽松，第2段讲如今的移民制度较为严苛，移民往往被分为合法与非法两类。第3~5段指出，新时期下的移民问题需要有新的对待移民的态度，将移民分为合法与非法两类的做法应该摈弃。由此可知，作者想要表达的是将所有移民划分为合法与非法两类是个错误，故答案为D)。',
          },
        ],
      },
      {
        article: {
          content:
            "An American study has shown a link between activity on the surface of the sun and weather conditions on Earth. Scientists say small changes in the sun's brightness can produce effects on Earth similar to two weather events in warm waters of the Pacific Ocean. The two events are commonly known as La Nina and El Nino. Reports say the study may lead to better predictions of temperatures, rainfall (降雨) and the intensity of weather systems. Scientists measure solar activity by counting dark areas on the sun's surface. These sun spots produce bursts of energy. Other scientists have shown that sun spot activity can be measured in periods of time that last about eleven years. The total energy reaching Earth from the sun rises and falls by just one tenth of one percent across this solar cycle. In the new study, scientists examined more than one hundred years of ocean temperature records. They also used computer programs designed to reproduce the world's climate. They found the highest levels of solar activity cause small, but far-reaching effects on weather systems around the world. These periods of high activity are known as solar maximum. Gerald Meehl was the lead writer of a report about the study. He says his team showed the effects of a new process to understand what happens in the Pacific's warm waters where there is a maximum of solar activity. Professor Meehl works for the National Center for Atmospheric Research in Boulder, Colorado. The center organized and helped to pay for the study. The findings were published recently in the Journal of Climate. The report says that, at maximum activity, the small increase in sunshine over several years causes a small temperature increase in Earth's atmosphere. This is especially true in cloud-free areas of the Pacific. The extra heat is enough to cause ocean waters to evaporate ( 蒸发) into the air. This wet air is then carried by trade winds to the normally rainy areas of the western Pacific, near the Equator (赤道). This creates more rainfall. The trade winds become stronger as the process gets repeated. This keeps the eastern Pacific cooler and drier than normal.",
          contentCN:
            '一项美国研究表明，太阳表面活动与地球天气状况之间存在联系。科学家们表示，太阳亮度的微小变化会对地球产生类似于太平洋暖水区两种天气事件的影响。这两种事件通常被称为拉尼娜和厄尔尼诺。报告称，这项研究可能会导致对温度、降雨和天气系统强度的更好预测。科学家们通过计算太阳表面的暗区来测量太阳活动。这些太阳黑子会产生能量爆发。其他科学家表明，太阳黑子活动可以在大约持续11年的时间段内进行测量。在这个太阳周期中，到达地球的太阳总能量仅上升和下降千分之一。在这项新研究中，科学家们检查了100多年的海洋温度记录。他们还使用了旨在重现世界气候的计算机程序。他们发现，太阳活动的最高水平会对全球天气系统产生微小但深远的影响。这些高活动时期被称为太阳活动极大期。杰拉尔德·米尔是一篇关于这项研究的报告的主要作者。他说，他的团队展示了一个新过程的影响，以了解在太阳活动最多的太平洋暖水区发生了什么。米尔教授在科罗拉多州博尔德的国家大气研究中心工作。该中心组织并帮助资助了这项研究。研究结果最近发表在《气候杂志》上。报告称，在活动极大期，几年内阳光的小幅增加会导致地球大气温度小幅上升。在太平洋无云地区尤其如此。额外的热量足以使海水蒸发到空气中。然后，这种潮湿的空气被信风带到西太平洋靠近赤道的通常多雨地区。这会带来更多降雨。随着这个过程的重复，信风变得更强。这使得东太平洋比正常情况更凉爽、更干燥。',
          id: 'article1',
          title: "The Link between Solar Activity and Earth's Weather",
          titleCN: '太阳活动与地球天气之间的联系',
        },
        description: '关于太阳活动与地球天气状况关系的阅读理解',
        id: 'chapter1-reading1',
        questions: [
          {
            correctOptionId: 'q1-1-D',
            explanation:
              '文章第一段最后一句说Reports say the study may lead to better predictions of temperatures, rainfall and the intensity of weather systems（此项研究能够更好地预测温度和降雨以及整个气候系统变化的强度），所以选D。',
            id: 'q1-1',
            options: [
              {
                id: 'q1-1-A',
                text: 'A connection between activity of the sun and climate of the Earth.',
                textCN: '太阳活动与地球气候之间的联系。',
              },
              {
                id: 'q1-1-B',
                text: 'A truth that tiny changes of the solar brightness could affect the Pacific Ocean.',
                textCN: '太阳亮度的微小变化会影响太平洋的事实。',
              },
              {
                id: 'q1-1-C',
                text: 'Two events known as La Nina and El Nino in warm waters of the Pacific Ocean.',
                textCN: '太平洋暖水区的拉尼娜和厄尔尼诺这两个事件。',
              },
              {
                id: 'q1-1-D',
                text: 'More precise predictions of the climate and the intensity of weather system.',
                textCN: '对气候和天气系统强度的更精确预测。',
              },
            ],
            text: 'What may people get from the American study mentioned in the passage?',
            textCN: '人们能够从文章中提到的美国研究中得知什么？',
            type: 'reading',
          },
          {
            correctOptionId: 'q1-2-B',
            explanation:
              '根据题干的solar cycle定位到文章的第二段，第二段第二句提到Other scientists have shown that sun spot activity can be measured in periods of time that last about eleven years（太阳黑子活动的周期大约为11年），approximately意思是“大约”，与about意思相近，所以选B。',
            id: 'q1-2',
            options: [
              { id: 'q1-2-A', text: 'One thousand years.', textCN: '一千年。' },
              {
                id: 'q1-2-B',
                text: 'Approximately 11 years.',
                textCN: '大约11年。',
              },
              {
                id: 'q1-2-C',
                text: 'More than 100 years.',
                textCN: '超过100年。',
              },
              {
                id: 'q1-2-D',
                text: 'Less than 10 years.',
                textCN: '不到10年。',
              },
            ],
            text: 'According to the passage, how long is a solar cycle?',
            textCN: '根据文章，太阳活动的周期是多长时间？',
            type: 'reading',
          },
          {
            correctOptionId: 'q1-3-C',
            explanation:
              '根据题干solar maximum可以把答案信息定位在第三段最后一句These periods of high activity are known as solar maximum，本句是结论性的句子，意思是这就是被人们所熟知的太阳活动高峰期。一般情况下前面是具体的叙述和解释，后面是结论，所以前面一句They found the highest levels of solar activity cause small, but far-reaching effects on weather systems around the world中the highest levels of solar activity就是太阳活动高峰期，所以选C。',
            id: 'q1-3',
            options: [
              {
                id: 'q1-3-A',
                text: 'It is the period of time of the general sun spot activity.',
                textCN: '它是太阳黑子活动的一般时间段。',
              },
              {
                id: 'q1-3-B',
                text: 'It is the year when the solar energy reaching Earth rises.',
                textCN: '它是到达地球的太阳能上升的年份。',
              },
              {
                id: 'q1-3-C',
                text: 'It is the period of the highest levels of activity of the sun.',
                textCN: '它是太阳活动最高水平的时期。',
              },
              {
                id: 'q1-3-D',
                text: 'It is the year when sunshine increases.',
                textCN: '它是阳光增加的年份。',
              },
            ],
            text: 'What is solar maximum?',
            textCN: '太阳活动高峰期是什么？',
            type: 'reading',
          },
          {
            correctOptionId: 'q1-4-D',
            explanation:
              "根据Gerald Meehl可以把信息定位在第四段，第二句说his team showed the effects of a new process to understand what happens in the Pacific's warm waters where there is a maximum of solar activity（太阳活动的高峰对太平洋的影响），但是第五段也是这项研究的发现The report says that, at maximum activity, the small increase in sunshine over several years causes a small temperature increase in Earth's atmosphere（太阳活动对地球大气的影响），所以选D（太阳活动对太平洋和地球气候的影响）。",
            id: 'q1-4',
            options: [
              {
                id: 'q1-4-A',
                text: 'A maximum of solar activity happened in Pacific Ocean which is turning warm.',
                textCN: '太阳活动的最大值发生在正在变暖的太平洋。',
              },
              {
                id: 'q1-4-B',
                text: 'A new method to measure the level and intensity of solar activity.',
                textCN: '一种测量太阳活动水平和强度的新方法。',
              },
              {
                id: 'q1-4-C',
                text: 'The reason why the Pacific Ocean water is getting warmer and warmer.',
                textCN: '太平洋海水越来越暖和的原因。',
              },
              {
                id: 'q1-4-D',
                text: "The impact of solar activity on the Pacific and the whole planet's climate.",
                textCN: '太阳活动对太平洋和整个地球气候的影响。',
              },
            ],
            text: 'According to Gerald Meehl, what did his team show in their findings?',
            textCN: 'Gerald Meehl认为，他的团队在研究中发现了什么？',
            type: 'reading',
          },
          {
            correctOptionId: 'q1-5-A',
            explanation:
              '文章最后一段谈到了太平洋东部的问题，要通过对最后一段的内容进行分析，首先热量使水蒸发（ocean waters to evaporate），然后水气被信风吹到太平洋西部带来降雨（carried by trade winds），随着这一现象的加剧和重复，使得太平洋东部变得更凉爽更干燥（This keeps the eastern Pacific cooler and drier than normal）。综合来看，与选项A的内容吻合，所以选A（由于日照增加而蒸发的水气使太平洋东部变得凉爽而干燥）。',
            id: 'q1-5',
            options: [
              {
                id: 'q1-5-A',
                text: 'The evaporated water caused by increased sunshine cools and dries the eastern Pacific.',
                textCN: '由于日照增加而蒸发的水气使太平洋东部变得凉爽而干燥。',
              },
              {
                id: 'q1-5-B',
                text: 'The wet air carried from the western to eastern Pacific cools and dries the eastern Pacific.',
                textCN:
                  '从西太平洋带到东太平洋的潮湿空气使东太平洋变得凉爽而干燥。',
              },
              {
                id: 'q1-5-C',
                text: 'The trade wind from the western Pacific cools and dries the eastern Pacific.',
                textCN: '来自西太平洋的信风使东太平洋变得凉爽而干燥。',
              },
              {
                id: 'q1-5-D',
                text: 'The wet air carried from the Equator to western Pacific cools and dries the eastern Pacific.',
                textCN:
                  '从赤道带到西太平洋的潮湿空气使东太平洋变得凉爽而干燥。',
              },
            ],
            text: 'What does the report state about how the solar maximum affects the eastern Pacific?',
            textCN: '报告说太阳活动高峰期对太平洋东部有何影响？',
            type: 'reading',
          },
        ],
        title: '阅读理解 1',
        type: 'reading',
      },
      {
        id: 'chapter1-reading1',
        title: '阅读理解 1',
        description: '关于美国高校对学生支持情况的阅读理解',
        type: 'reading',
        article: {
          id: 'article1',
          title: 'Higher Education in America',
          titleCN: '美国的高等教育',
          content: `When students arrive on campus with their parents, both parties often assume that the school will function in loco parentis, watching over its young charges, providing assistance when needed. Colleges and universities present themselves as supportive learning communities—as extended families, in a way. And indeed, for many students they become a home away from home. This is why graduates often use another Latin term, alma mater, meaning "nourishing mother". Ideally, the school nurtures its students, guiding them toward adulthood. Lifelong friendships are formed, teachers become mentors (导师), and the academic experience is complemented by rich social interaction. For some students, however, the picture is less rosy. For a significant number, the challenges can become overwhelming.
    
    　　In reality, administrators at American colleges and universities are often obliged to focus as much on the generation of revenue as on the new generation of students. A troubled or even severely disturbed student can easily fall through the cracks. Public institutions in particular are often faced with tough choices about which student support services to fund, and how to manage such things as soaring health-care costs for faculty and staff. Private schools are feeling the pinch as well. Ironically, although tuition and fees can increase as much as 6.6 percent in a single year, as they did in 2007, the high cost of doing business at public and private institutions means that students are not necessarily receiving more support in return for increased tuition and fees. To compound the problem, students may be reluctant to seek help even when they desperately need it.
    
    　　Unfortunately, higher education is sometimes more of an information delivery system than a responsive, collaborative process. Just as colleges are sometimes ill equipped to respond to the challenges posed by college life. Although they arrive on campus with high expectations, some students struggle with chronic shyness, learning disabilities, addiction, or eating disorders. Still others suffer from acute loneliness, mental illness, or even rage.
    
    　　We have created cities of youth in which students can pass through unnoticed, their voices rarely heard, their faces rarely seen. As class size grows in response to budget cuts, it becomes even less likely that troubled students, or even severely disturbed students, will be noticed. When they're not, the results can be tragic.`,
          contentCN: `当学生和他们的父母来到校园时，双方通常都认为学校会扮演替代父母的角色，照顾年幼的学生，在需要时提供帮助。学院和大学将自己呈现为支持性的学习社区——在某种程度上就像大家庭。事实上，对许多学生来说，它们成了第二个家。这就是为什么毕业生经常使用另一个拉丁术语“母校”，意思是“滋养的母亲”。理想情况下，学校培养学生，引导他们走向成年。终身友谊得以建立，教师成为导师，学术经历因丰富的社交互动而得到补充。然而，对一些学生来说，情况就没那么乐观了。对相当一部分学生来说，挑战可能变得难以承受。
    
    　　实际上，美国学院和大学的管理人员往往不得不既关注创收，又关注新一代学生。一个有问题甚至严重困扰的学生很容易被忽视。特别是公立机构经常面临艰难的选择，要为哪些学生支持服务提供资金，以及如何管理诸如教职员工不断飙升的医疗保健成本等问题。私立学校也感到压力很大。具有讽刺意味的是，尽管学费在一年内可能上涨高达6.6%，就像2007年那样，但公立和私立机构高昂的运营成本意味着学生不一定能因学费上涨而得到更多支持。更糟糕的是，即使学生迫切需要帮助，他们也可能不愿意寻求帮助。
    
    　　不幸的是，高等教育有时更像是一个信息传递系统，而不是一个响应式的、协作式的过程。就像学院有时没有能力应对大学生活带来的挑战一样。尽管他们带着很高的期望来到校园，但一些学生却在长期的害羞、学习障碍、成瘾或饮食失调中挣扎。还有一些人则遭受着严重的孤独、精神疾病甚至愤怒。
    
    　　我们创造了青年之城，在那里学生可以 unnoticed 地走过，他们的声音很少被听到，他们的脸很少被看到。随着班级规模因预算削减而增加，有问题的学生，甚至是严重困扰的学生被注意到的可能性变得更小。当他们没有被注意到时，结果可能是悲惨的。`,
        },
        questions: [
          {
            id: 'q1-1',
            type: 'reading',
            text: 'How do many students feel about colleges and universities?',
            textCN: '许多学生对学院和大学有什么感觉？',
            options: [
              { id: 'q1-1-A', text: 'Admiring.', textCN: '钦佩的。' },
              { id: 'q1-1-B', text: 'Disappointed.', textCN: '失望的。' },
              { id: 'q1-1-C', text: 'Indifferent.', textCN: '冷漠的。' },
              { id: 'q1-1-D', text: 'Affectionate.', textCN: '深情的。' },
            ],
            correctOptionId: 'q1-1-D',
            explanation:
              '文章提到And indeed, for many students they become a home away from home. This is why graduates often use another Latin term, alma mater, meaning "nourishing mother".说明学生对学校有感情。',
          },
          {
            id: 'q1-2',
            type: 'reading',
            text: "What's the ideal image of colleges and universities?",
            textCN: '学院和大学的理想形象是什么？',
            options: [
              {
                id: 'q1-2-A',
                text: 'They are places where academic requirements are loose.',
                textCN: '它们是学术要求宽松的地方。',
              },
              {
                id: 'q1-2-B',
                text: 'They are places where students can have colourful social experience.',
                textCN: '它们是学生可以有丰富多彩社交经历的地方。',
              },
              {
                id: 'q1-2-C',
                text: 'They nurture students and guide them to grow into adults.',
                textCN: '它们培养学生并引导他们成长为成年人。',
              },
              {
                id: 'q1-2-D',
                text: 'They teach students how to spend their youth time best.',
                textCN: '它们教学生如何最好地度过他们的青年时光。',
              },
            ],
            correctOptionId: 'q1-2-C',
            explanation:
              '文中提到Ideally, the school nurtures its students, guiding them toward adulthood.',
          },
          {
            id: 'q1-3',
            type: 'reading',
            text: 'Why do American colleges and universities often neglect troubled or even severely disturbed students?',
            textCN: '为什么美国的学院和大学经常忽视有问题甚至严重困扰的学生？',
            options: [
              {
                id: 'q1-3-A',
                text: 'They view academic management as their only task.',
                textCN: '他们将学术管理视为唯一任务。',
              },
              {
                id: 'q1-3-B',
                text: "They don't have so much energy or money to focus on the needs of students.",
                textCN: '他们没有那么多精力或资金来关注学生的需求。',
              },
              {
                id: 'q1-3-C',
                text: "They don't care about the students' psychological health.",
                textCN: '他们不关心学生的心理健康。',
              },
              {
                id: 'q1-3-D',
                text: 'They focus mainly on improving the salaries for faculty and staff.',
                textCN: '他们主要关注提高教职员工的工资。',
              },
            ],
            correctOptionId: 'q1-3-B',
            explanation:
              '文中提到In reality, administrators at American colleges and universities are often obliged to focus as much on the generation of revenue as on the new generation of students. Public institutions in particular are often faced with tough choices about which student support services to fund, and how to manage such things as soaring health-care costs for faculty and staff.说明学校因资金和精力问题忽视学生。',
          },
          {
            id: 'q1-4',
            type: 'reading',
            text: 'Which of the following information can be got from the third paragraph?',
            textCN: '从第三段可以得到以下哪条信息？',
            options: [
              {
                id: 'q1-4-A',
                text: 'Private schools in America never feel that they are short of money.',
                textCN: '美国的私立学校从不觉得自己缺钱。',
              },
              {
                id: 'q1-4-B',
                text: 'American students receive more support as tuition and fees increase.',
                textCN: '随着学费上涨，美国学生得到更多支持。',
              },
              {
                id: 'q1-4-C',
                text: 'American colleges and universities fail to respond to and help students in time sometimes.',
                textCN: '美国的学院和大学有时不能及时回应和帮助学生。',
              },
              {
                id: 'q1-4-D',
                text: 'American college students seek help only when they suffer from serious psychological illness.',
                textCN: '美国大学生只有在患有严重心理疾病时才寻求帮助。',
              },
            ],
            correctOptionId: 'q1-4-C',
            explanation:
              '第三段提到Unfortunately, higher education is sometimes more of an information delivery system than a responsive, collaborative process.说明学校不能及时回应和帮助学生。',
          },
          {
            id: 'q1-5',
            type: 'reading',
            text: "What's the author's attitude towards American higher education?",
            textCN: '作者对美国高等教育的态度是什么？',
            options: [
              { id: 'q1-5-A', text: 'Critical.', textCN: '批评的。' },
              { id: 'q1-5-B', text: 'Neutral.', textCN: '中立的。' },
              { id: 'q1-5-C', text: 'Praising.', textCN: '赞扬的。' },
              { id: 'q1-5-D', text: 'Uninterested.', textCN: '不感兴趣的。' },
            ],
            correctOptionId: 'q1-5-A',
            explanation:
              '文章指出了美国高等教育存在的忽视学生等问题，所以作者态度是批评的。',
          },
        ],
      },
      {
        id: 'chapter1-reading1',
        title: '阅读理解 1',
        description: '关于科学领域性别偏见的阅读理解',
        type: 'reading',
        article: {
          id: 'article1',
          title: 'Gender Bias in Sciences',
          titleCN: '科学领域的性别偏见',
          content: `As in many other fields, gender bias is widespread in the sciences. Men score higher starting salaries, have more mentoring (指导), and have better odds of being hired. Studies show they're also perceived as more competent than women in STEM (Science, Technology, Engineering, and Mathematics) fields. And new research reveals that men are more likely to receive excellent letters of recommendation, too.
    "Say, you know, this is the best student I've ever had," says Kuheli Dutt, a social scientist and diversity officer at Columbia University's Lamont campus. "Compare those excellent letters with a merely good letter: 'The candidate was productive, or intelligent, or a solid scientist or something that's clearly solid praise,' but nothing that singles out the candidate as exceptional or one of a kind." Dutt and her colleagues studied more than 1,200 letters of recommendation for postdoctoral positions in geoscience. They were all edited for gender and other identifying information, so Dutt and her team could assign them a score without knowing the gender of the student. They found that female applicants were only half as likely to get outstanding letters, compared with their male counterparts. That includes letters of recommendation from all over the world, and written by, yes, men and women. The findings are in the journal Nature Geoscience.
    Dutt says they were not able to evaluate the actual scientific qualifications of the applicants using the data in the files. But she says the results still suggest women in geoscience are at a potential disadvantage from the very beginning of their careers starting with those less than outstanding letters of recommendation.
    "We're not trying to assign blame or criticize anyone or call anyone consciously sexist. Rather, the point is to use the results of this study to open up meaningful dialogues on implicit gender bias, be it at a departmental level or an institutional level or even a discipline level." Which may lead to some recommendations for the letter writers themselves.`,
          contentCN: `和许多其他领域一样，性别偏见在科学领域也很普遍。男性起薪更高，得到更多指导，被聘用的几率也更大。研究表明，在STEM（科学、技术、工程和数学）领域，他们也被认为比女性更有能力。新的研究还表明，男性也更有可能收到优秀的推荐信。
    “比如说，你知道，这是我见过的最好的学生，”哥伦比亚大学拉蒙特校区的社会科学家兼多元化官员库赫利·达特说。“把那些优秀的推荐信和一封普通的推荐信比较一下：‘这个候选人很有成果，或者很聪明，或者是一个可靠的科学家，或者是一些明显是实实在在的赞扬，但没有任何东西能让这个候选人脱颖而出或与众不同。’”达特和她的同事研究了1200多封地球科学博士后职位的推荐信。所有推荐信都经过编辑，去除了性别和其他识别信息，这样达特和她的团队就可以在不知道学生性别的情况下给它们打分。他们发现，与男性申请者相比，女性申请者获得优秀推荐信的可能性只有一半。这包括来自世界各地的推荐信，而且是的，有男性和女性写的推荐信。这些发现发表在《自然地球科学》杂志上。
    达特说，他们无法利用文件中的数据评估申请者的实际科学资格。但她说，这些结果仍然表明，地球科学领域的女性从职业生涯一开始就可能处于劣势，从那些不太出色的推荐信开始。
    “我们不是试图指责或批评任何人，也不是说任何人有意识地存在性别歧视。相反，关键是利用这项研究的结果，就隐性性别偏见展开有意义的对话，无论是在部门层面、机构层面，甚至是学科层面。”这可能会给推荐信撰写者本人带来一些建议。`,
        },
        questions: [
          {
            id: 'q1-1',
            type: 'reading',
            text: 'What do we learn about applicants to postdoctoral positions in geosciences?',
            textCN: '在地球科学的博士后研究中，我们了解到什么?',
            options: [
              {
                id: 'q1-1-A',
                text: 'There are many more men applying than women.',
                textCN: '男性申请者比女性申请者多',
              },
              {
                id: 'q1-1-B',
                text: 'Chances for women to get the positions are scarce.',
                textCN: '女性获得博士后的机会很稀少',
              },
              {
                id: 'q1-1-C',
                text: 'More males than females are likely to get outstanding letters of recommendation.',
                textCN: '男性比女性更可能获得优秀的推荐信',
              },
              {
                id: 'q1-1-D',
                text: 'Male applicants have more interest in these positions than their female counterparts.',
                textCN: '男性申请者对这些岗位的兴趣比女性更高',
              },
            ],
            correctOptionId: 'q1-1-C',
            explanation:
              '由题干关键词 applicants to postdoctoral positions in geosciences 定位到第一段第一句：Female applicants to postdoctoral positions in geosciences were nearly half as likely to receive excellent letters of recommendation, compared with their male counterparts. 意思是，和男性申请者相比，女性在申请地球科学博士后时，其获得优秀推荐信的几率大概是男性的一半，也就是说，“男性比女性更可能获得优秀的推荐信”，故答案为C。选项A，“男性申请者比女性申请者多”和选项D，“男性申请者对这些岗位的兴趣比女性更高”文中均没有提及，故排除A、D；选项B，“女性获得博士后的机会很稀少”，文中只是说女性获得优秀推荐信的几率大概是男性的一半，并未提到获得博士后的情况，故排除B。',
          },
          {
            id: 'q1-2',
            type: 'reading',
            text: 'What do studies about men and women in scientific research show?',
            textCN: '在科学研究中，关于男人和女人的研究表明了什么?',
            options: [
              {
                id: 'q1-2-A',
                text: 'Women engaged in postdoctoral work are quickly catching up.',
                textCN: '从事博士后工作的女性正在迅速赶超',
              },
              {
                id: 'q1-2-B',
                text: 'Fewer women are applying for postdoctoral positions due to gender bias.',
                textCN: '由于性别偏见，申请博士后的女性较少',
              },
              {
                id: 'q1-2-C',
                text: 'Men are believed to be better able to excel in STEM disciplines.',
                textCN: '人们相信，男性在STEM学科中更有优势',
              },
              {
                id: 'q1-2-D',
                text: 'Women who are keenly interested in STEM fields are often exceptional.',
                textCN: '对STEM领域特别感兴趣的女性通常会很杰出',
              },
            ],
            correctOptionId: 'q1-2-C',
            explanation:
              "由题干关键词 studies 和 show 定位到第二段第三句：Studies show they're also perceived as more competent than women in STEM (Science, Technology, Engineering, and Mathematics) fields. 意思是，在STEM（科学、技术、工程和数学）领域，他们也被认为比女性更有能力。由此可见，研究表明男性更擅长STEM学科，选项C中的 better able to excel 是对原文 more competent 的同义改写，故答案为C，“人们相信，男性在STEM学科中更有优势”。选项A，“从事博士后工作的女性正在迅速赶超”和选项D，“对STEM领域特别感兴趣的女性通常会很杰出”文中均未提到，故排除A、D；选项B，“由于性别偏见，申请博士后的女性较少”，原文只是说与男性申请者相比，女性申请者获得的优秀推荐信较少，并没有说申请博士后的女性较少，故排除B。",
          },
          {
            id: 'q1-3',
            type: 'reading',
            text: 'What do the studies find about the recommendation letters for women applicants?',
            textCN: '这些研究对女性申请人的推荐信有什么发现？',
            options: [
              {
                id: 'q1-3-A',
                text: 'They are hardly ever supported by concrete examples.',
                textCN: '它们几乎没有具体实例的支持',
              },
              {
                id: 'q1-3-B',
                text: 'They contain nothing that distinguishes the applicants.',
                textCN: '它们没有包含使她们脱颖而出的内容',
              },
              {
                id: 'q1-3-C',
                text: 'They provide objective information without exaggeration.',
                textCN: '它们毫不夸张地提供客观信息',
              },
              {
                id: 'q1-3-D',
                text: 'They are often filled with praise for exceptional applicants.',
                textCN: '它们经常对杰出的申请者充满溢美之词',
              },
            ],
            correctOptionId: 'q1-3-B',
            explanation: `由题干和各选项定位到第三段："Compare those excellent letters with a merely good letter: 'The candidate was productive, or intelligent, or a solid scientist or something that's clearly solid praise,' but nothing that singles out the candidate as exceptional or one of a kind." 意思是，凯海琳•达特说，优秀的推荐信一般会这样写：这是我带过的最好的学生，将优秀的推荐信与一封“还不错”的推荐信进行对比，后者会写：该申请者效率高或很聪明，是个理智的科学家等这种明显生硬的赞扬，但这并没有让申请者从众多申请人中脱颖而出。结合上文女性获得优秀推荐信的几率大概是男性的一半这一研究结果可以推断，女性收到的往往不是优秀的推荐信，而是“还不错”的推荐信，“这些推荐信没有包含使她们脱颖而出的内容”，故答案为B。选项A，“它们几乎没有具体实例的支持”，选项C，“它们毫不夸张地提供客观信息”和选项D，“它们经常对杰出的申请者充满溢美之词”文中均未提到，也无从推断，故排除。"
        `,
          },
          {
            id: 'q1-4',
            type: 'reading',
            text: 'What did Dutt and her colleagues do with the more than 1,200 letters of recommendation?',
            textCN: '达特和她的同事们对1200多封推荐信做了什么?',
            options: [
              {
                id: 'q1-4-A',
                text: 'They asked unbiased scholars to evaluate them.',
                textCN: '他们请没有偏见的学者对它们进行评价',
              },
              {
                id: 'q1-4-B',
                text: 'They invited women professionals to edit them.',
                textCN: '他们邀请女性专业人员进行编辑',
              },
              {
                id: 'q1-4-C',
                text: 'They assigned them randomly to reviewers.',
                textCN: '他们把推荐信任意分发给审阅人',
              },
              {
                id: 'q1-4-D',
                text: 'They deleted all information about gender.',
                textCN: '他们删除了所有关于性别的信息',
              },
            ],
            correctOptionId: 'q1-4-D',
            explanation:
              '由题干关键词 Dutt and her colleagues 和 more than 1,200 letters of recommendation 定位至第四段第一、二句：Dutt and her colleagues studied more than 1,200 letters of recommendation for postdoctoral positions in geoscience. They were all edited for gender and other identifying information, so Dutt and her team could assign them a score without knowing the gender of the student. 意思是，达特和同事们研究了1200多封申请地球科学博士后的推荐信，这些推荐信中所有有关性别和其他的识别信息都被编辑过，这样达特和她的团队在不知道学生性别的情况下为推荐信打分数。由此可见，“他们删除了所有关于性别的信息”，故答案为D。选项A，“他们请没有偏见的学者对它们进行评价”原文没有提到，故排除；选项B，“他们邀请女性专业人员进行编辑”，定位段第二句前半句说达特和同事们对推荐信中所有有关性别和其他识别的信息进行了编辑，没有说这些人员是否为女性专业人员，故排除B；选项C，“他们把推荐信任意分发给审阅人”，第二句后半句只是说达特及其团队在不知道学生性别的情况下为推荐信评分，并未提及是否任意分发，故排除C。',
          },
          {
            id: 'q1-5',
            type: 'reading',
            text: 'What does Dutt aim to do with her study?',
            textCN: '达特的研究目的是什么',
            options: [
              {
                id: 'q1-5-A',
                text: "Raise recommendation writers' awareness of gender bias in their letters.",
                textCN: '提高写推荐信的人对性别偏见的认识',
              },
              {
                id: 'q1-5-B',
                text: 'Open up fresh avenues for women post-doctors to join in research work.',
                textCN: '为女性博士后开辟从事研究工作的新途径',
              },
              {
                id: 'q1-5-C',
                text: 'Alert women researchers to all types of gender bias in the STEM disciplines.',
                textCN: '提醒女性研究人员在STEM学科中存在各种性别偏见',
              },
              {
                id: 'q1-5-D',
                text: "Start a public discussion on how to raise women's status in academic circles.",
                textCN: '就如何提高女性在学术界的地位展开公开讨论',
              },
            ],
            correctOptionId: 'q1-5-A',
            explanation: `由题干关键词 aim 定位到文章最后一段："... the point is to use the results of this study toopen up meaningful dialogues on implicit gender bias，be it at a departmental level or an institutional level or even a discipline level." Which may lead to some recommendations for the letter writers themselves. 意思是，达特的研究目的是利用这项研究结果对隐含的性别偏见开启有意义的对话，无论是在部门层面，还是在机构层面，甚至是在学科层面，这可以给写推荐信的人提供一些建议。由此可推断，达特的研究是为了“提高写推荐信的人对性别偏见的认识”，故答案为A。选项B，“为女性博士后开辟从事研究工作的新途径”和选项C，“提醒女性研究人员在STEM学科中存在各种性别偏见”文中没有提到，故排除B、C；选项D，“就如何提高女性在学术界的地位展开公开讨论”，最后一段第二句提到了研究的目的是通过研究结果展开隐含的性别偏见的对话，从而为写推荐信的人提供一些建议，而不是讨论如何提高女性在学术界的地位，故排除D。"
        `,
          },
        ],
      },
      {
        id: 'chapter1-reading1',
        title: '阅读理解 1',
        description: '关于不同种族学生混住情况的阅读理解',
        type: 'reading',
        article: {
          id: 'article1',
          title: 'Interracial Lodging',
          titleCN: '不同种族学生混住',
          content: `Several recent studies have found that being randomly (随机地) assigned to a roommate of another race can lead to increased tolerance but also to a greater likelihood (可能性) of conflict.
    Recent reports found that lodging with a student of a different race may decrease prejudice and compel students to engage in more ethnically diverse friendships.
    An Ohio State University study also found that black students living with a white roommate saw higher academic success throughout their college careers. Researchers believe this may be caused by social pressure.
    In a New York Times article, Sam Boakye—the only black student on his freshman year floor—said that "if you're surrounded by whites, you have something to prove."
    Researchers also observed problems resulting from pairing interracial students in residences.
    According to two recent studies, randomly assigned roommates of different races are more likely to experience conflicts so strained that one roommate will move out.
    An Indiana University study found that interracial roommates were three times as likely as two white roommates to no longer live together by the end of the semester.
    Grace Kao, a professor at Penn said she was not surprised by the findings. "This may be the first time that some of these students have interacted, and lived, with someone of a different race," she said.
    At Penn, students are not asked to indicate race when applying for housing.
    "One of the great things about freshman housing is that, with some exceptions, the process throws you together randomly," said Undergraduate Assembly Chairman Alec Webley. "This is the definition of integration."
    "I've experienced roommate conflicts between interracial students that have both broken down stereotypes and reinforced stereotypes," said one Penn resident advisor (RA). The RA of two years added that while some conflicts "provided more multicultural acceptance and melding (融合)," there were also "jarring cultural confrontations."
    The RA said that these conflicts have also occurred among roommates of the same race.
    Kao said she cautions against forming any generalizations based on any one of the studies, noting that more background characteristics of the students need to be studied and explained.`,
          contentCN: `最近的几项研究发现，被随机分配与不同种族的室友住在一起，可能会增加容忍度，但也会增加冲突的可能性。
    最近的报告发现，与不同种族的学生住在一起可能会减少偏见，并促使学生建立更多种族多样化的友谊。
    俄亥俄州立大学的一项研究还发现，与白人室友住在一起的黑人学生在整个大学生涯中取得了更高的学业成就。研究人员认为，这可能是由社会压力造成的。
    在《纽约时报》的一篇文章中，大一学年楼层上唯一的黑人学生山姆·博阿凯说：“如果你周围都是白人，你就有东西要证明。”
    研究人员还观察到不同种族学生同住宿舍所产生的问题。
    根据最近的两项研究，随机分配的不同种族室友更有可能经历紧张的冲突，以至于其中一个室友会搬出去。
    印第安纳大学的一项研究发现，不同种族的室友在学期结束时不再住在一起的可能性是两个白人室友的三倍。
    宾夕法尼亚大学的教授格蕾丝·考说，她对这些发现并不感到惊讶。她说：“这可能是这些学生中的一些人第一次与不同种族的人互动和生活。”
    在宾夕法尼亚大学，学生申请住房时不需要表明种族。
    本科学生会主席亚历克·韦布利说：“大一新生住房的一大好处是，除了一些例外情况，这个过程会把你们随机地安排在一起。这就是融合的定义。”
    一位宾夕法尼亚大学的宿舍顾问说：“我经历过不同种族学生之间的室友冲突，这些冲突既打破了刻板印象，又强化了刻板印象。”这位有两年经验的宿舍顾问补充说，虽然有些冲突“带来了更多的多元文化接受和融合”，但也有“激烈的文化对抗”。
    这位宿舍顾问说，这些冲突也发生在同种族的室友之间。
    考说，她提醒不要基于任何一项研究就形成任何一概而论的结论，并指出需要对学生的更多背景特征进行研究和解释。`,
        },
        questions: [
          {
            id: 'q1-1',
            type: 'reading',
            text: 'What can we learn from some recent studies?',
            textCN: '我们可以从最近的一些研究中学到什么？',
            options: [
              {
                id: 'q1-1-A',
                text: 'Conflicts between students of different races are unavoidable.',
                textCN: '不同种族学生之间的冲突是不可避免的。',
              },
              {
                id: 'q1-1-B',
                text: 'Students of different races are prejudiced against each other.',
                textCN: '不同种族的学生相互存在偏见。',
              },
              {
                id: 'q1-1-C',
                text: 'Interracial lodging does more harm than good.',
                textCN: '不同种族学生混住弊大于利。',
              },
              {
                id: 'q1-1-D',
                text: 'Interracial lodging may have diverse outcomes.',
                textCN: '不同种族学生混住可能有不同的结果。',
              },
            ],
            correctOptionId: 'q1-1-D',
            explanation:
              '文章引述相关研究结果，前四段说明了不同种族学生混住的好处，即增强忍耐力（increased tolerance）、减少偏见并促使学生的朋友圈更具有种族多样性（decrease prejudice and compel students to engage in more ethnically diverse friendships）、学习成绩更好（higher academic success）等。从第五段开始说明其弊端（problems resulting from pairing interracial students in residences)。综合来看，不同种族学生同室混住利弊皆有，所以选D。',
          },
          {
            id: 'q1-2',
            type: 'reading',
            text: "What does Sam Boakye's remark mean?",
            textCN: '山姆·博阿凯的话是什么意思？',
            options: [
              {
                id: 'q1-2-A',
                text: 'White students tend to look down upon their black peers.',
                textCN: '白人学生往往看不起他们的黑人同龄人。',
              },
              {
                id: 'q1-2-B',
                text: 'Black students can compete with their white peers academically.',
                textCN: '黑人学生在学业上可以与他们的白人同龄人竞争。',
              },
              {
                id: 'q1-2-C',
                text: 'Black students feel somewhat embarrassed among white peers during the freshman year.',
                textCN: '黑人学生在大一期间在白人同龄人中会感到有些尴尬。',
              },
              {
                id: 'q1-2-D',
                text: 'Being surrounded by white peers motivates a black student to work harder to succeed.',
                textCN: '被白人同龄人包围会激励黑人学生更加努力地取得成功。',
              },
            ],
            correctOptionId: 'q1-2-D',
            explanation:
              "文章第四段中，Sam Boakye提到，如果周围白人多，你就会想证明自己的能力（if you're surrounded by whites, you have something to prove）。也就是说白人能成为黑人努力、成功的动力，选项D中motivate意思是“激励、激发”，与原文内容吻合，所以选D。",
          },
          {
            id: 'q1-3',
            type: 'reading',
            text: 'What does the Indiana University study show?',
            textCN: '印第安纳大学的研究表明了什么？',
            options: [
              {
                id: 'q1-3-A',
                text: 'Interracial roommates are more likely to fall out.',
                textCN: '不同种族的室友更容易闹翻。',
              },
              {
                id: 'q1-3-B',
                text: 'Few white students like sharing a room with a black peer.',
                textCN: '很少有白人学生喜欢和黑人同龄人合住一个房间。',
              },
              {
                id: 'q1-3-C',
                text: "Roommates of different races just don't get along.",
                textCN: '不同种族的室友就是相处不来。',
              },
              {
                id: 'q1-3-D',
                text: "Assigning students' lodging randomly is not a good policy.",
                textCN: '随机分配学生住宿不是一个好政策。',
              },
            ],
            correctOptionId: 'q1-3-C',
            explanation:
              '从题干信息定位于文章第七段，说这一研究发现不同种族混住的室友学期末不再住一起的可能性是两个白人室友不再同住可能性的三倍（interracial roommates were three times as likely as two white roommates to no longer live together by the end of the semester）。也就是说不同种族的学生相处不太融洽，选项A中fall out意思是“闹翻”，所以选C。',
          },
          {
            id: 'q1-4',
            type: 'reading',
            text: 'What does Alec Webley consider to be the "definition of integration"?',
            textCN: '亚历克·韦布利认为什么是“融合的定义”？',
            options: [
              {
                id: 'q1-4-A',
                text: 'Students of different races are required to share a room.',
                textCN: '不同种族的学生被要求合住一个房间。',
              },
              {
                id: 'q1-4-B',
                text: 'Interracial lodging is arranged by the school for freshmen.',
                textCN: '学校为新生安排不同种族学生混住。',
              },
              {
                id: 'q1-4-C',
                text: 'Lodging is assigned to students of different races without exception.',
                textCN: '毫无例外，住宿被分配给不同种族的学生。',
              },
              {
                id: 'q1-4-D',
                text: 'The school randomly assigns roommates without regard to race.',
                textCN: '学校不考虑种族随机分配室友。',
              },
            ],
            correctOptionId: 'q1-4-D',
            explanation:
              '文章第十段提到了Alec Webley说这就是融合的定义（This is the definition of integration）。根据语法，此句中的this就是指前句出现的内容，即新生住宿申请的一大好处是，除少数例外，整个申请过程把大家随机地安排在一起（One of the great things about freshman housing is that, with some exceptions, the process throws you together randomly）。采用排除法，所以选D。',
          },
          {
            id: 'q1-5',
            type: 'reading',
            text: 'What does Grace Kao say about interracial lodging?',
            textCN: '格蕾丝·考对不同种族学生混住有什么看法？',
            options: [
              {
                id: 'q1-5-A',
                text: 'It is unscientific to make generalizations about it without further study.',
                textCN: '在没有进一步研究的情况下对其进行一概而论是不科学的。',
              },
              {
                id: 'q1-5-B',
                text: 'Schools should be cautious when making decisions about student lodging.',
                textCN: '学校在做出学生住宿决定时应该谨慎。',
              },
              {
                id: 'q1-5-C',
                text: "Students' racial background should be considered before lodging is assigned.",
                textCN: '在分配住宿之前应该考虑学生的种族背景。',
              },
              {
                id: 'q1-5-D',
                text: 'Experienced resident advisors should be assigned to handle the problems.',
                textCN: '应该分配有经验的宿舍顾问来处理这些问题。',
              },
            ],
            correctOptionId: 'q1-5-A',
            explanation:
              '根据题干中人名定位于文章第八段和最后一段。其中第八段Grace Kao说她对研究结果并不感到惊讶（she was not surprised by the findings），最后一段中Grace Kao提醒大家不要基于以上研究结果形成任何泛化的结论（she cautions against forming any generalizations based on any one of the studies），同时强调需要进一步分析、研究学生们的背景特点（more background characteristics of the students need to be studied and explained），与选项A的内容一致，所以选A。',
          },
        ],
      },
      {
        id: 'chapter15-cloze4',
        title: '完形填空 18',
        description: '关于密码安全与易被盗用现象的完形填空',
        type: 'cloze',
        questions: [
          {
            id: 'c18-1',
            type: 'cloze',
            text: 'Passwords that (75)_____ no imagination or distinctiveness are easy prey for information pirates.',
            textCN:
              '那些(75)_____缺乏想象力或独特性的密码，很容易成为信息盗窃者的目标。',
            options: [
              { id: 'c18-1-A', text: 'show', textCN: '显示' },
              { id: 'c18-1-B', text: 'have', textCN: '拥有' },
              { id: 'c18-1-C', text: 'need', textCN: '需要' },
              { id: 'c18-1-D', text: 'require', textCN: '要求' },
            ],
            correctOptionId: 'c18-1-A',
            explanation:
              '“show”意为“显示”，“show no imagination”指密码表现出缺乏想象力，符合“易被盗用”的语境，强调密码本身的特征。',
          },
          {
            id: 'c18-2',
            type: 'cloze',
            text: 'A (76)_____ analysis of 28,000 passwords recently stolen from a popular U.S. website...',
            textCN:
              '一项对从美国某热门网站窃取的2.8万个密码的(76)_____分析显示...',
            options: [
              { id: 'c18-2-A', text: 'statistical', textCN: '统计的' },
              { id: 'c18-2-B', text: 'physical', textCN: '物理的' },
              { id: 'c18-2-C', text: 'chemical', textCN: '化学的' },
              { id: 'c18-2-D', text: 'biological', textCN: '生物的' },
            ],
            correctOptionId: 'c18-2-A',
            explanation:
              '“statistical”意为“统计的”，“statistical analysis”指统计分析，与“2.8万个密码”的大数据样本匹配，体现研究方法的科学性。',
          },
          {
            id: 'c18-3',
            type: 'cloze',
            text: 'A statistical analysis...posted on the Internet (77)_____ that people often do the easy thing.',
            textCN:
              '一项统计分析……发布在互联网上，(77)_____人们常选择简单的方式设置密码。',
            options: [
              { id: 'c18-3-A', text: 'reveals', textCN: '揭示' },
              { id: 'c18-3-B', text: 'hides', textCN: '隐藏' },
              { id: 'c18-3-C', text: 'denies', textCN: '否认' },
              { id: 'c18-3-D', text: 'questions', textCN: '质疑' },
            ],
            correctOptionId: 'c18-3-A',
            explanation:
              '“reveals”意为“揭示”，指分析结果揭露了人们设置简单密码的现象，与“研究发现”的逻辑一致，突出结论的客观性。',
          },
          {
            id: 'c18-4',
            type: 'cloze',
            text: 'It (78)_____ that 16 percent took a first name as a password...',
            textCN: '研究(78)_____，16%的人用名字作为密码...',
            options: [
              { id: 'c18-4-A', text: 'found', textCN: '发现' },
              { id: 'c18-4-B', text: 'doubted', textCN: '怀疑' },
              { id: 'c18-4-C', text: 'forgot', textCN: '忘记' },
              { id: 'c18-4-D', text: 'remembered', textCN: '记住' },
            ],
            correctOptionId: 'c18-4-A',
            explanation:
              '“found”意为“发现”，指研究得出的具体数据结论，与“16%”的统计结果直接对应，体现研究的实证性。',
          },
          {
            id: 'c18-5',
            type: 'cloze',
            text: 'often their (79)_____ or one of their children...',
            textCN: '通常是他们(79)_____的名字或孩子的名字...',
            options: [
              { id: 'c18-5-A', text: 'own', textCN: '自己的' },
              { id: 'c18-5-B', text: "enemy's", textCN: '敌人的' },
              { id: 'c18-5-C', text: "friend's", textCN: '朋友的' },
              { id: 'c18-5-D', text: "stranger's", textCN: '陌生人的' },
            ],
            correctOptionId: 'c18-5-A',
            explanation:
              '“own”意为“自己的”，“their own”指用户自己的名字，与“孩子的名字”并列，说明常见的密码设置习惯，体现密码的私密性缺失。',
          },
          {
            id: 'c18-6',
            type: 'cloze',
            text: `For those using English keyboards, "QWERTY," was popular. (80)_____, "AZERTY" scored with people using European keyboards.`,
            textCN:
              '对于使用英文键盘的人来说，“QWERTY”很受欢迎。(80)_____，使用欧洲键盘的人喜欢“AZERTY”。',
            options: [
              { id: 'c18-6-A', text: 'Likewise', textCN: '同样地' },
              { id: 'c18-6-B', text: 'However', textCN: '然而' },
              { id: 'c18-6-C', text: 'Therefore', textCN: '因此' },
              { id: 'c18-6-D', text: 'Otherwise', textCN: '否则' },
            ],
            correctOptionId: 'c18-6-A',
            explanation:
              '“Likewise”意为“同样地”，表示两种键盘布局下的密码模式具有相似性，前后句形成并列关系，体现密码设置的规律性。',
          },
          {
            id: 'c18-7',
            type: 'cloze',
            text: `"The word "password," or easy to guess variations like "password1" (81)_____ for four percent."`,
            textCN:
              '“password”这个词，或“password1”等容易猜到的变体(81)_____4%。',
            options: [
              { id: 'c18-7-A', text: 'accounted', textCN: '占' },
              { id: 'c18-7-B', text: 'paid', textCN: '支付' },
              { id: 'c18-7-C', text: 'waited', textCN: '等待' },
              { id: 'c18-7-D', text: 'looked', textCN: '看' },
            ],
            correctOptionId: 'c18-7-A',
            explanation:
              '“accounted”意为“占”，“account for”为固定搭配，指该类密码在样本中的比例，与“16%”“14%”等数据表述一致，保持统计口径的统一。',
          },
          {
            id: 'c18-8',
            type: 'cloze',
            text: `Three percent of the passwords expressed (82)_____ like "I don't care," "Whatever,"..."`,
            textCN: '3%的密码表达了(82)_____，如“我不在乎”“随便”...',
            options: [
              { id: 'c18-8-A', text: 'attitudes', textCN: '态度' },
              { id: 'c18-8-B', text: 'stories', textCN: '故事' },
              { id: 'c18-8-C', text: 'facts', textCN: '事实' },
              { id: 'c18-8-D', text: 'dreams', textCN: '梦想' },
            ],
            correctOptionId: 'c18-8-A',
            explanation:
              '“attitudes”意为“态度”，与“我不在乎”等表述匹配，指密码中反映出的用户心理状态，说明密码设置的随意性。',
          },
          {
            id: 'c18-9',
            type: 'cloze',
            text: 'advises that to better protect against (83)_____ intrusions...',
            textCN: '建议为了更好地防范(83)_____入侵...',
            options: [
              { id: 'c18-9-A', text: 'cyber', textCN: '网络' },
              { id: 'c18-9-B', text: 'physical', textCN: '物理' },
              { id: 'c18-9-C', text: 'natural', textCN: '自然' },
              { id: 'c18-9-D', text: 'emotional', textCN: '情感' },
            ],
            correctOptionId: 'c18-9-A',
            explanation:
              '“cyber”意为“网络”，“cyber intrusions”指网络入侵，与“密码被盗”的场景直接相关，体现建议的针对性。',
          },
          {
            id: 'c18-10',
            type: 'cloze',
            text: 'Choose a password that is longer than eight characters with one (84)_____ letter and one symbol.',
            textCN:
              '选择一个长度超过8个字符，包含一个(84)_____字母和一个符号的密码。',
            options: [
              { id: 'c18-10-A', text: 'capital', textCN: '大写' },
              { id: 'c18-10-B', text: 'small', textCN: '小写' },
              { id: 'c18-10-C', text: 'foreign', textCN: '外国' },
              { id: 'c18-10-D', text: 'local', textCN: '本地' },
            ],
            correctOptionId: 'c18-10-A',
            explanation:
              '“capital”意为“大写”，“capital letter”指大写字母，与“符号”共同构成复杂密码的要素，符合增强密码安全性的专业建议，提升破解难度。',
          },
        ],
      },
      {
        id: 'chapter15-cloze5',
        title: '完形填空 19',
        description: '关于生物适应性与生态环境关系的完形填空',
        type: 'cloze',
        questions: [
          {
            id: 'c19-1',
            type: 'cloze',
            text: 'And animals that get (85)_____ to cold climates will die if they move to the tropics.',
            textCN: '而适应寒冷气候的动物如果搬到热带就会死亡。',
            options: [
              { id: 'c19-1-A', text: 'used', textCN: '习惯' },
              { id: 'c19-1-B', text: 'related', textCN: '相关' },
              { id: 'c19-1-C', text: 'opposed', textCN: '反对' },
              { id: 'c19-1-D', text: 'addicted', textCN: '沉迷' },
            ],
            correctOptionId: 'c19-1-A',
            explanation:
              '“used”意为“习惯”，“get used to”为固定搭配，表示“适应”，与前文“热带动物到寒冷气候会死亡”形成对比，说明动物对特定环境的适应性。',
          },
          {
            id: 'c19-2',
            type: 'cloze',
            text: 'Many plants, too, will die if they are removed from the place where they (86)_____ grow and are moved into an unfamiliar soil.',
            textCN:
              '许多植物如果被从它们(86)_____生长的地方移到不熟悉的土壤中也会死亡。',
            options: [
              { id: 'c19-2-A', text: 'normally', textCN: '正常地' },
              { id: 'c19-2-B', text: 'rarely', textCN: '很少地' },
              { id: 'c19-2-C', text: 'suddenly', textCN: '突然地' },
              { id: 'c19-2-D', text: 'temporarily', textCN: '临时地' },
            ],
            correctOptionId: 'c19-2-A',
            explanation:
              '“normally”意为“正常地”，指植物在原本适宜的环境中自然生长，与“不熟悉的土壤”形成对比，强调环境改变对植物生存的影响。',
          },
          {
            id: 'c19-3',
            type: 'cloze',
            text: 'Almost every species is adapted to life in a particular place by its organs and their functions and by (87)_____ habits.',
            textCN:
              '几乎每个物种都通过其器官及其功能和(87)_____习性适应特定地方的生活。',
            options: [
              { id: 'c19-3-A', text: 'permanent', textCN: '永久的' },
              { id: 'c19-3-B', text: 'temporary', textCN: '临时的' },
              { id: 'c19-3-C', text: 'strange', textCN: '奇怪的' },
              { id: 'c19-3-D', text: 'changing', textCN: '变化的' },
            ],
            correctOptionId: 'c19-3-A',
            explanation:
              '“permanent”意为“永久的”，指物种长期形成的固定习性，与“器官功能”共同构成适应特定环境的因素，体现适应性的稳定性。',
          },
          {
            id: 'c19-4',
            type: 'cloze',
            text: 'The specialized adaptation has great advantages, for it (88)_____ many organisms to survive under different conditions.',
            textCN:
              '这种专门的适应具有很大优势，因为它(88)_____许多生物在不同条件下生存。',
            options: [
              { id: 'c19-4-A', text: 'enables', textCN: '使能够' },
              { id: 'c19-4-B', text: 'forbids', textCN: '禁止' },
              { id: 'c19-4-C', text: 'forces', textCN: '强迫' },
              { id: 'c19-4-D', text: 'advises', textCN: '建议' },
            ],
            correctOptionId: 'c19-4-A',
            explanation:
              '“enables”意为“使能够”，“enable...to...”为固定用法，指适应性让生物具备在不同环境生存的能力，解释“专门适应”的优势所在。',
          },
          {
            id: 'c19-5',
            type: 'cloze',
            text: 'It also has disadvantages, for it means that the life of most species is controlled by (89)_____ conditions.',
            textCN:
              '它也有缺点，因为这意味着大多数物种的生命受(89)_____条件控制。',
            options: [
              { id: 'c19-5-A', text: 'local', textCN: '当地的' },
              { id: 'c19-5-B', text: 'global', textCN: '全球的' },
              { id: 'c19-5-C', text: 'ideal', textCN: '理想的' },
              { id: 'c19-5-D', text: 'extreme', textCN: '极端的' },
            ],
            correctOptionId: 'c19-5-A',
            explanation:
              '“local”意为“当地的”，指物种依赖特定地域的环境条件，与“专门适应”形成因果关系，说明适应性导致物种对局部环境的依赖性。',
          },
          {
            id: 'c19-6',
            type: 'cloze',
            text: 'Living things are not (90)_____ over the earth freely; most species have definite habits for living places.',
            textCN:
              '生物并非自由(90)_____在地球上；大多数物种对栖息地有明确的习性。',
            options: [
              { id: 'c19-6-A', text: 'scattered', textCN: '分散' },
              { id: 'c19-6-B', text: 'gathered', textCN: '聚集' },
              { id: 'c19-6-C', text: 'hidden', textCN: '隐藏' },
              { id: 'c19-6-D', text: 'protected', textCN: '保护' },
            ],
            correctOptionId: 'c19-6-A',
            explanation:
              '“scattered”意为“分散”，指生物并非随意分布，与“有明确栖息地”形成对比，体现生态分布的规律性，为后文“生态学研究”做铺垫。',
          },
          {
            id: 'c19-7',
            type: 'cloze',
            text: 'This means finding out how an organism survives and (91)_____ in certain surroundings.',
            textCN: '这意味着了解生物体如何在特定环境中生存和(91)_____。',
            options: [
              { id: 'c19-7-A', text: 'reproduces', textCN: '繁殖' },
              { id: 'c19-7-B', text: 'dies', textCN: '死亡' },
              { id: 'c19-7-C', text: 'hides', textCN: '隐藏' },
              { id: 'c19-7-D', text: 'travels', textCN: '旅行' },
            ],
            correctOptionId: 'c19-7-A',
            explanation:
              '“reproduces”意为“繁殖”，与“生存”并列，构成生物在环境中延续的基本方式，是生态学研究的核心内容之一，体现生命循环的完整性。',
          },
          {
            id: 'c19-8',
            type: 'cloze',
            text: 'Most living things are (92)_____ to their environment.',
            textCN: '大多数生物是其环境的(92)_____。',
            options: [
              { id: 'c19-8-A', text: 'slaves', textCN: '奴隶' },
              { id: 'c19-8-B', text: 'masters', textCN: '主人' },
              { id: 'c19-8-C', text: 'creators', textCN: '创造者' },
              { id: 'c19-8-D', text: 'enemies', textCN: '敌人' },
            ],
            correctOptionId: 'c19-8-A',
            explanation:
              '“slaves”意为“奴隶”，比喻生物对环境的依赖性，与后文“少数生物能改变环境”形成对比，突出大多数物种受环境制约的现实。',
          },
          {
            id: 'c19-9',
            type: 'cloze',
            text: 'Some can (93)_____ certain features of their environment to suit themselves...',
            textCN: '有些生物可以(93)_____环境的某些特征来适应自己...',
            options: [
              { id: 'c19-9-A', text: 'alter', textCN: '改变' },
              { id: 'c19-9-B', text: 'ignore', textCN: '忽视' },
              { id: 'c19-9-C', text: 'accept', textCN: '接受' },
              { id: 'c19-9-D', text: 'copy', textCN: '复制' },
            ],
            correctOptionId: 'c19-9-A',
            explanation:
              '“alter”意为“改变”，指生物主动调整环境以适应自身需求，与“海狸筑坝”的例子匹配，体现生物对环境的反作用。',
          },
          {
            id: 'c19-10',
            type: 'cloze',
            text: 'many birds and insects can build elaborate nests to provide (94)_____ for their young.',
            textCN:
              '许多鸟类和昆虫可以建造精巧的巢穴，为它们的幼崽提供(94)_____。',
            options: [
              { id: 'c19-10-A', text: 'shelter', textCN: '庇护所' },
              { id: 'c19-10-B', text: 'food', textCN: '食物' },
              { id: 'c19-10-C', text: 'toys', textCN: '玩具' },
              { id: 'c19-10-D', text: 'light', textCN: '光线' },
            ],
            correctOptionId: 'c19-10-A',
            explanation:
              '“shelter”意为“庇护所”，指巢穴为幼崽提供保护，符合生物筑巢的基本功能，与“精巧的巢穴”形成目的关联，体现生存策略的专业性。',
          },
        ],
      },
      {
        id: 'chapter15-cloze6',
        title: '完形填空 20',
        description: '关于小企业在线存在重要性的完形填空',
        type: 'cloze',
        questions: [
          {
            id: 'c20-1',
            type: 'cloze',
            text: 'Majority of website visitors are from the English speaking population (95)_____ to the high levels of Internet penetration in that category.',
            textCN:
              '大多数网站访问者来自英语国家人群，(95)_____该群体的互联网普及率很高。',
            options: [
              { id: 'c20-1-A', text: 'due', textCN: '由于' },
              { id: 'c20-1-B', text: 'despite', textCN: '尽管' },
              { id: 'c20-1-C', text: 'without', textCN: '没有' },
              { id: 'c20-1-D', text: 'against', textCN: '反对' },
            ],
            correctOptionId: 'c20-1-A',
            explanation:
              '“due”意为“由于”，“due to”为固定搭配，表示因果关系，说明英语国家访问者多是因为互联网普及率高，符合逻辑语境。',
          },
          {
            id: 'c20-2',
            type: 'cloze',
            text: 'The research data in the US about online connectivity (96)_____ the following facts...',
            textCN: '美国关于网络连接的研究数据(96)_____以下事实...',
            options: [
              { id: 'c20-2-A', text: 'reveals', textCN: '揭示' },
              { id: 'c20-2-B', text: 'hides', textCN: '隐藏' },
              { id: 'c20-2-C', text: 'creates', textCN: '创造' },
              { id: 'c20-2-D', text: 'ignores', textCN: '忽视' },
            ],
            correctOptionId: 'c20-2-A',
            explanation:
              '“reveals”意为“揭示”，指研究数据展现出具体事实，与后文罗列的统计数据匹配，体现数据的客观性和说服力。',
          },
          {
            id: 'c20-3',
            type: 'cloze',
            text: 'which may help to understand the importance of the web presence for businesses, (97)_____ the small enterprise.',
            textCN:
              '这可能有助于理解企业，(97)_____是小企业，在线存在的重要性。',
            options: [
              { id: 'c20-3-A', text: 'especially', textCN: '尤其' },
              { id: 'c20-3-B', text: 'exclusively', textCN: '唯一地' },
              { id: 'c20-3-C', text: 'hardly', textCN: '几乎不' },
              { id: 'c20-3-D', text: 'merely', textCN: '仅仅' },
            ],
            correctOptionId: 'c20-3-A',
            explanation:
              '“especially”意为“尤其”，强调在所有企业中，小企业更需要关注在线存在，突出论述重点，符合文本强调小企业的语境。',
          },
          {
            id: 'c20-4',
            type: 'cloze',
            text: 'In 2004 online population was 801 million (98)_____.',
            textCN: '2004年，(98)_____在线人口为8.01亿。',
            options: [
              { id: 'c20-4-A', text: 'worldwide', textCN: '全球' },
              { id: 'c20-4-B', text: 'locally', textCN: '本地' },
              { id: 'c20-4-C', text: 'nationally', textCN: '全国' },
              { id: 'c20-4-D', text: 'regionally', textCN: '地区' },
            ],
            correctOptionId: 'c20-4-A',
            explanation:
              '“worldwide”意为“全球”，指在线人口的统计范围是全世界，与后文“美国占近2亿”形成整体与部分的关系，符合数据描述逻辑。',
          },
          {
            id: 'c20-5',
            type: 'cloze',
            text: 'Of this US alone (99)_____ for close to 200 million.',
            textCN: '其中仅美国就(99)_____近2亿。',
            options: [
              { id: 'c20-5-A', text: 'accounts', textCN: '占' },
              { id: 'c20-5-B', text: 'prepares', textCN: '准备' },
              { id: 'c20-5-C', text: 'searches', textCN: '搜索' },
              { id: 'c20-5-D', text: 'waits', textCN: '等待' },
            ],
            correctOptionId: 'c20-5-A',
            explanation:
              '“accounts”意为“占”，“account for”为固定搭配，用于表示比例，指美国在线人口在全球中的占比，与前文“36%使用英语”形成数据呼应。',
          },
          {
            id: 'c20-6',
            type: 'cloze',
            text: 'This means the web presence for any business is necessary if you want to (100)_____ in promoting your products and services...',
            textCN:
              '这意味着，如果您想在推广产品和服务方面(100)_____，任何企业的在线存在都是必要的。',
            options: [
              { id: 'c20-6-A', text: 'succeed', textCN: '成功' },
              { id: 'c20-6-B', text: 'fail', textCN: '失败' },
              { id: 'c20-6-C', text: 'stop', textCN: '停止' },
              { id: 'c20-6-D', text: 'hesitate', textCN: '犹豫' },
            ],
            correctOptionId: 'c20-6-A',
            explanation:
              '“succeed”意为“成功”，“succeed in doing”为固定用法，指在线存在是企业推广成功的必要条件，符合文本强调在线存在重要性的核心观点。',
          },
          {
            id: 'c20-7',
            type: 'cloze',
            text: 'to a population who can (101)_____ them and also willing to buy them online.',
            textCN: '面向能够(101)_____并愿意在线购买产品和服务的人群。',
            options: [
              { id: 'c20-7-A', text: 'afford', textCN: '负担得起' },
              { id: 'c20-7-B', text: 'refuse', textCN: '拒绝' },
              { id: 'c20-7-C', text: 'dislike', textCN: '不喜欢' },
              { id: 'c20-7-D', text: 'steal', textCN: '偷窃' },
            ],
            correctOptionId: 'c20-7-A',
            explanation:
              '“afford”意为“负担得起”，与前文“家庭网络用户通常富裕”对应，指目标群体有经济能力购买产品，体现在线推广的精准性。',
          },
          {
            id: 'c20-8',
            type: 'cloze',
            text: 'The household that did not own a computer or who were not (102)_____ to the web...',
            textCN: '没有电脑或未(102)_____网络的家庭...',
            options: [
              { id: 'c20-8-A', text: 'connected', textCN: '连接' },
              { id: 'c20-8-B', text: 'lost', textCN: '丢失' },
              { id: 'c20-8-C', text: 'broken', textCN: '损坏' },
              { id: 'c20-8-D', text: 'fixed', textCN: '固定' },
            ],
            correctOptionId: 'c20-8-A',
            explanation:
              '“connected”意为“连接”，“be connected to the web”指接入网络，与“没有电脑”并列，描述未上网家庭的特征，为后文对比做铺垫。',
          },
          {
            id: 'c20-9',
            type: 'cloze',
            text: 'What this (103)_____ for a small business owner is that they are better off...',
            textCN: '这对小企业主(103)_____是，他们最好...',
            options: [
              { id: 'c20-9-A', text: 'means', textCN: '意味着' },
              { id: 'c20-9-B', text: 'denies', textCN: '否认' },
              { id: 'c20-9-C', text: 'doubts', textCN: '怀疑' },
              { id: 'c20-9-D', text: 'ignores', textCN: '忽视' },
            ],
            correctOptionId: 'c20-9-A',
            explanation:
              '“means”意为“意味着”，指前文数据和分析对小企业主的启示，引出具体建议，体现文本的指导意义。',
          },
          {
            id: 'c20-10',
            type: 'cloze',
            text: 'they are better off (104)_____ their products to people who were online.',
            textCN: '他们最好向在线人群(104)_____产品。',
            options: [
              { id: 'c20-10-A', text: 'promoting', textCN: '推广' },
              { id: 'c20-10-B', text: 'hiding', textCN: '隐藏' },
              { id: 'c20-10-C', text: 'stealing', textCN: '偷窃' },
              { id: 'c20-10-D', text: 'destroying', textCN: '破坏' },
            ],
            correctOptionId: 'c20-10-A',
            explanation:
              '“promoting”意为“推广”，“promote products”指推销产品，与前文“promoting your products”呼应，强调在线推广是小企业的最佳选择，符合全文主旨。',
          },
        ],
      },
    ],
  },
  {
    id: 'chapter7',
    title: '第7套题',
    description: '包含阅读理解和完形填空',
    questionSets: [
      {
        id: 'chapter1-reading1',
        title: '阅读理解 1',
        description: '关于父亲的情绪和行为对孩子影响的阅读理解',
        type: 'reading',
        article: {
          id: 'article1',
          title: "Don't automatically blame mom",
          titleCN: '不要一味责怪妈妈',
          content: `Don't automatically blame mom: A crying baby can be just as much the result of dad's state of mind, Dutch researchers report.
    　　Other studies have found that depression among mothers can be related to excessive crying, a common problem with newborns, but the researchers said that little was known about whether fathers' emotions and behavior also have an effect.
    　　"Up to now, almost all attention went to the prenatal (出生以前的) effects of motherly depression on child development, leading to the development of detection and treatment programs that focused on mental well-being of mothers," said lead researcher Dr. Mijke Berg, a psychiatrist (精神病医生) at the Erasmus Medical Center in Rotterdam.
    　　"This study showed the importance of taking paternal factors and well-being during pregnancy into account, next to motherly factors," she said.
    　　Berg's team gathered data on symptoms of depression among parents of 4,426 infants who were two months old.
    　　Overall, just 2.5 percent of the infants in the study fit the excessive crying criteria. But, the researchers found a 30 percent higher risk for depression among parents whose infant cried excessively.
    　　"This finding could not be attributed to co-existing depressive symptoms of the mother, which is already known to be a risk factor for excessive infant crying," Berg said. It could be related to genetics, a depressed father or, indirectly, through factors such as marital, family or economic stress, she said.
    　　In fact, a dad with symptoms of depression was twice as likely to have an infant who cried excessively as was a dad not depressed, the study found.
    　　"Fathers do matter, so care for the mental well-being of fathers during pregnancy," Berg said.
    　　Dr. Jon Shaw, a professor and director of child and adolescent psychiatry at the University of Miami, said that the study shows how depression can lead to infant's excessive crying.
    　　"This seems to be related perhaps to the enduring effects of fathers' depression on the family atmosphere, the parental relationship, child parenting (抚养) and, perhaps as the authors suggest, there may be a genetic factor involved," he said.`,
          contentCN: `荷兰研究人员报告称：不要一味责怪妈妈，婴儿哭闹可能同样是爸爸精神状态的结果。
    　　其他研究发现，母亲的抑郁可能与新生儿常见的过度哭闹有关，但研究人员表示，对于父亲的情绪和行为是否也有影响，人们知之甚少。
    　　鹿特丹伊拉斯谟医学中心的精神病医生、首席研究员米耶克·伯格博士说：“到目前为止，几乎所有的注意力都集中在母亲抑郁对孩子发育的产前影响上，这导致了专注于母亲心理健康的检测和治疗项目的发展。”
    　　她说：“这项研究表明，除了母亲因素外，还需要考虑父亲因素以及孕期父亲的幸福感。”
    　　伯格的团队收集了4426名两个月大婴儿的父母的抑郁症状数据。
    　　总体而言，研究中只有2.5%的婴儿符合过度哭闹的标准。但是，研究人员发现，婴儿过度哭闹的父母患抑郁症的风险要高30%。
    　　伯格说：“这一发现不能归因于母亲同时存在的抑郁症状，而母亲的抑郁症状已知是婴儿过度哭闹的一个风险因素。”她说，这可能与基因、抑郁的父亲有关，或者间接与婚姻、家庭或经济压力等因素有关。
    　　研究发现，事实上，有抑郁症状的父亲生出过度哭闹婴儿的可能性是没有抑郁症状父亲的两倍。
    　　伯格说：“父亲很重要，所以在孕期要关注父亲的心理健康。”
    　　迈阿密大学儿童和青少年精神病学教授兼主任乔恩·肖博士说，这项研究表明了抑郁是如何导致婴儿过度哭闹的。
    　　他说：“这可能与父亲的抑郁对家庭氛围、父母关系、育儿方式的持久影响有关，也许正如作者所暗示的，可能涉及一个基因因素。”`,
        },
        questions: [
          {
            id: 'q1-1',
            type: 'reading',
            text: 'According to the passage, people usually pay great attention to mental well-being of mothers because ________.',
            textCN: '根据文章，人们通常特别注意母亲的精神健康的原因是什么。',
            options: [
              {
                id: 'q1-1-A',
                text: 'they are the ones who give birth to their children',
                textCN: '她们是生孩子的人',
              },
              {
                id: 'q1-1-B',
                text: 'their states of mind will affect the growth of the children',
                textCN: '她们的精神状态会影响孩子的成长',
              },
              {
                id: 'q1-1-C',
                text: 'it has been proved that fathers have less influence on their children',
                textCN: '已经证明父亲对孩子的影响较小',
              },
              {
                id: 'q1-1-D',
                text: 'their husbands will not always stay with them while they are pregnant',
                textCN: '她们怀孕时丈夫不会一直陪着她们',
              },
            ],
            correctOptionId: 'q1-1-B',
            explanation:
              '根据题干内容定位到原文第三段，Up to now, almost all attention went to the prenatal (出生以前的) effects of motherly depression on child development, leading to the development of detection and treatment programs that focused on mental well-being of mothers，意为，一直以来几乎所有的研究重点都放在婴儿出生前母亲的忧郁对孩子发展所产生的影响，这就促使了一些检查和治疗母亲精神健康机构的发展。由此可知，人们之所以重视母亲的精神健康是因为他们认为这会影响到孩子的发展，与选项B的意思一致，所以选B。',
          },
          {
            id: 'q1-2',
            type: 'reading',
            text: "The research of Dr. Berg's team is to prove that ________.",
            textCN: 'Berg博士团队的研究是想证明什么。',
            options: [
              {
                id: 'q1-2-A',
                text: "paternal factors play a greater part in the effect on children's emotion",
                textCN: '父亲因素在对孩子情绪的影响中起更大作用',
              },
              {
                id: 'q1-2-B',
                text: "maternal factors do not influence children's emotion as we expected",
                textCN: '母亲因素对孩子情绪的影响并不像我们预期的那样',
              },
              {
                id: 'q1-2-C',
                text: "fathers' emotions and behavior will influence children's development",
                textCN: '父亲的情绪和行为会影响孩子的发展',
              },
              {
                id: 'q1-2-D',
                text: "mothers' emotions will possibly lead to excessive crying of their children",
                textCN: '母亲的情绪可能会导致孩子过度哭闹',
              },
            ],
            correctOptionId: 'q1-2-C',
            explanation:
              '根据题干内容定位到原文第四段，This study showed the importance of taking paternal factors and well-being during pregnancy into account, next to motherly factors，意为，这个研究表明母亲怀孕期间父亲的精神（paternal）因素的重要性，仅次于母亲的精神因素（next to motherly factors）的重要性。也就是说，Berg团队是想证明除母亲的精神因素之外，父亲的精神因素是否对婴儿发展有影响，结果证明这种影响是存在的，所以选C。',
          },
          {
            id: 'q1-3',
            type: 'reading',
            text: "Infants' excessive crying perhaps could be directly owing to the following factors except for _______.",
            textCN: '婴儿过度哭闹也许和下列哪项没有直接关系。',
            options: [
              {
                id: 'q1-3-A',
                text: 'family financial stress',
                textCN: '家庭经济压力',
              },
              { id: 'q1-3-B', text: 'family atmosphere', textCN: '家庭氛围' },
              {
                id: 'q1-3-C',
                text: 'relationship between parents',
                textCN: '父母关系',
              },
              { id: 'q1-3-D', text: 'parenting methods', textCN: '育儿方式' },
            ],
            correctOptionId: 'q1-3-A',
            explanation:
              '根据题干内容定位到原文第七段第二句，It could be related to genetics, a depressed father or, indirectly, through factors such as marital, family or economic stress，意为，婴儿的过度哭闹也许与基因或父亲的忧郁有关，与婚姻、家庭和经济压力有间接关系，这里的economic与选项A中的financial意思相近，所以选A。',
          },
          {
            id: 'q1-4',
            type: 'reading',
            text: 'According to the passage, which of the following statements is true?',
            textCN: '根据文章，下列哪项陈述是正确的？',
            options: [
              {
                id: 'q1-4-A',
                text: 'Babies whose parents are not in depression will not cry.',
                textCN: '父母没有抑郁的婴儿不会哭。',
              },
              {
                id: 'q1-4-B',
                text: 'Genetic factors might affect the mental health of infants.',
                textCN: '基因因素可能会影响婴儿的心理健康。',
              },
              {
                id: 'q1-4-C',
                text: 'Most newborns, especially 2-month-olds, will cry excessively.',
                textCN: '大多数新生儿，尤其是两个月大的婴儿，会过度哭闹。',
              },
              {
                id: 'q1-4-D',
                text: "A happy daddy will reduce the risk of their kids' getting mental illness.",
                textCN: '快乐的爸爸会降低孩子患精神疾病的风险。',
              },
            ],
            correctOptionId: 'q1-4-B',
            explanation:
              '原文第七段第二句说婴儿的过度哭闹也许与基因或父亲的忧郁有关，也就是基因会影响孩子的精神健康，所以选B。原文第六段说通过对4426名两岁孩子家长的研究，发现2.5%的孩子属于过度哭闹型，并不是所有的孩子都会过度哭闹，排除C。原文第八段说研究发现忧郁的父亲的孩子过度哭闹的几率要更大，是没有忧郁情况父亲的孩子的两倍，反过来说快乐的父亲会降低孩子过度哭闹的几率，并不是孩子得了精神疾病，排除D。',
          },
          {
            id: 'q1-5',
            type: 'reading',
            text: 'The passage is meant to ________.',
            textCN: '文章写作的目的是什么。',
            options: [
              {
                id: 'q1-5-A',
                text: 'praise highly the contribution made by mothers',
                textCN: '高度赞扬母亲所做的贡献',
              },
              {
                id: 'q1-5-B',
                text: "call on people to pay attention to infants' mental health",
                textCN: '呼吁人们关注婴儿的心理健康',
              },
              {
                id: 'q1-5-C',
                text: 'appeal to the public for concern about the welfare of fathers',
                textCN: '呼吁公众关注父亲的福利',
              },
              {
                id: 'q1-5-D',
                text: "encourage fathers to care more about their children's development",
                textCN: '鼓励父亲更多地关心孩子的发展',
              },
            ],
            correctOptionId: 'q1-5-C',
            explanation:
              '原文第三段说一直以来几乎所有的研究重点都放在婴儿出生前母亲的忧郁对孩子发展所产生的影响方面。由此可知，人们认为母亲的精神因素会影响到孩子的发展。第四段开始介绍Berg博士团队的研究结果，表明了母亲怀孕期间父亲的精神因素的重要性。第八段说研究发现忧郁的父亲的孩子过度哭闹的几率要更大。第九段Berg博士说父亲的精神因素的重要性很大，要重视母亲怀孕期间父亲的精神健康。总的来讲就是告诉人们不能忽略父亲的精神健康对婴儿发展所产生的影响，与选项C的意思一致，所以选C。',
          },
        ],
      },
      {
        id: 'chapter1-reading1',
        title: '阅读理解 1',
        description: '关于英国空气污染治理的阅读理解',
        type: 'reading',
        article: {
          id: 'article1',
          title: 'Air Pollution in the UK',
          titleCN: '英国的空气污染',
          content: `Cutting toxic levels of city air pollution to safer levels is simple, but not easy-it requires resolve. Yet, despite the key culprit (罪犯) in the UK being well known-diesel (柴油机的) vehicles-the government has been asleep at the wheel for years.
    Levels of nitrogen dioxide (二氧化氮) have been illegally high across much of the UK since 2010. In 2015 86% of major urban areas broke annual limits. Cutting this pollution means choking off diesel emissions and there is a wide range of effective measures available.
    Creating zones in city centres where polluting care are either banned or charged is important, while making cities safe for cycling cuts traffic too.
    Cleaner buses and taxis have an important role to play and change to the perverse taxes that encourage people to buy diesel over cleaner cars is needed. There is also some support for a revival of a scrappage scheme which saw dirty old bangers taken off the road.
    The environment and transport departments were well aware of all this and proposed many of these measures internally, only for the Treasury to reject most of them, arguing they “ would be politically very difficult, especially given the impacts on motorists.”
    Motorists happen to be particularly badly exposed to air pollution, but the real political difficulty for the government is two humiliating legal defeats in two years where judges ruled its air pollution plans were so bad they were illegal.
    Ministers have now been forced to come up with a third plan, but clean air zones and car tax changes take time to clean up the air. Yet the UK government is also in the slow lane when it comes to emergency measures.
    When foul air descended on Paris in December, officials there swung into action. Public transport was made free and the number of cars allowed on roads was restricted, alternately barring those with odd and even licence plates. In the UK, during the same December smog, the government sent a few tweets.
    At the root of the problem are diesel cars, which successive governments across Europe have utterly failed to ensure meet legal emissions limits when driving in real-world conditions on the road. The gaming of regulatory tests by carmakers was blown open by the Volkswagen scandal. The scandal of governments prioritising supposed driver freedom over the lungs and health of their citizens is only now playing out.`,
          contentCN: `将城市空气污染的有毒水平降低到更安全的水平很简单，但并不容易——这需要决心。然而，尽管英国的主要罪魁祸首——柴油车辆——众所周知，但政府多年来一直对此疏于应对。
    自2010年以来，英国大部分地区的二氧化氮水平一直非法超标。2015年，86%的主要城市地区突破了年度限值。减少这种污染意味着抑制柴油排放，并且有一系列有效的措施可供采用。
    在市中心设立污染车辆被禁止或收费的区域很重要，同时让城市对骑自行车者安全也能减少交通流量。
    更清洁的公交车和出租车可以发挥重要作用，并且需要改变那些鼓励人们购买柴油车而非更清洁汽车的不合理税收。也有人支持恢复一项报废计划，该计划曾让破旧的老爷车退出道路。
    环境和交通部门很清楚这一切，并在内部提出了许多这些措施，但财政部拒绝了其中的大部分，理由是这些措施“在政治上非常困难，特别是考虑到对驾车者的影响”。
    驾车者恰好特别容易受到空气污染的影响，但政府真正的政治难题是在两年内两次遭受耻辱的法律失败，法官裁定其空气污染计划非常糟糕，以至于违法。
    部长们现在被迫提出第三个计划，但清洁空气区和汽车税收变化需要时间来净化空气。然而，在应急措施方面，英国政府也进展缓慢。
    去年12月，当污浊的空气降临巴黎时，那里的官员立即采取了行动。公共交通免费，道路上允许行驶的汽车数量受到限制，轮流禁止单号和双号车牌的车辆上路。在英国，在同一个12月的雾霾期间，政府只是发了几条推文。
    问题的根源在于柴油车，欧洲各国政府一直未能确保柴油车在实际道路行驶条件下符合法定排放标准。汽车制造商对监管测试的作弊行为因大众汽车丑闻而曝光。政府将所谓的驾驶者自由置于公民的肺部和健康之上的丑闻现在才刚刚显现出来。`,
        },
        questions: [
          {
            id: 'q1-1',
            type: 'reading',
            text: 'What does the author think of fixing air pollution in the first paragraph？',
            textCN: '作者在第一段中对解决空气污染问题有什么看法？',
            options: [
              {
                id: 'q1-1-A',
                text: 'It is a piece of cake.',
                textCN: '这是小菜一碟。',
              },
              {
                id: 'q1-1-B',
                text: 'It needs political will.',
                textCN: '这需要政治意愿。',
              },
              {
                id: 'q1-1-C',
                text: 'It is the main problem.',
                textCN: '这是主要问题。',
              },
              {
                id: 'q1-1-D',
                text: 'It has a lone way to go.',
                textCN: '还有很长的路要走。',
              },
            ],
            correctOptionId: 'q1-1-B',
            explanation:
              '根据第一段第一句‘Cutting toxic levels of city air pollution to safer levels is simple, but not easy-it requires resolve.’可知，解决空气污染问题需要决心，即政治意愿。',
          },
          {
            id: 'q1-2',
            type: 'reading',
            text: 'The aim of those in favor of a scrappage scheme is ______.',
            textCN: '那些支持报废计划的人的目的是______。',
            options: [
              {
                id: 'q1-2-A',
                text: 'to reduce diesel emissions',
                textCN: '减少柴油排放',
              },
              {
                id: 'q1-2-B',
                text: 'to encourage the use of old cars',
                textCN: '鼓励使用旧汽车',
              },
              {
                id: 'q1-2-C',
                text: 'to retire low-end old vehicles',
                textCN: '淘汰低端旧车辆',
              },
              {
                id: 'q1-2-D',
                text: 'to cut own on traffic accidents',
                textCN: '减少交通事故',
              },
            ],
            correctOptionId: 'q1-2-A',
            explanation:
              '根据第四段‘There is also some support for a revival of a scrappage scheme which saw dirty old bangers taken off the road.’以及前文提到减少污染意味着抑制柴油排放可知，支持报废计划的目的是减少柴油排放。',
          },
          {
            id: 'q1-3',
            type: 'reading',
            text: 'It can be inferred from the passage that the Treasury______.',
            textCN: '从文章中可以推断出财政部______。',
            options: [
              {
                id: 'q1-3-A',
                text: 'was quite clear about the current situation of air pollution',
                textCN: '非常清楚空气污染的现状',
              },
              {
                id: 'q1-3-B',
                text: 'opposed almost every proposal about reducing air pollution',
                textCN: '几乎反对每一项关于减少空气污染的提议',
              },
              {
                id: 'q1-3-C',
                text: 'believed the anti-pollution measures to be unaffordable',
                textCN: '认为反污染措施负担不起',
              },
              {
                id: 'q1-3-D',
                text: 'made such objections partly due to the effects on drivers',
                textCN: '提出这些反对意见部分是由于对驾车者的影响',
              },
            ],
            correctOptionId: 'q1-3-D',
            explanation:
              '根据第五段‘The environment and transport departments were well aware of all this and proposed many of these measures internally, only for the Treasury to reject most of them, arguing they “ would be politically very difficult, especially given the impacts on motorists.”’可知，财政部拒绝大部分减少空气污染的提议，部分原因是考虑到对驾车者的影响。',
          },
          {
            id: 'q1-4',
            type: 'reading',
            text: 'Why do the UK ministers have to put forward a third air pollution plan?',
            textCN: '为什么英国部长们不得不提出第三个空气污染计划？',
            options: [
              {
                id: 'q1-4-A',
                text: 'Because drivers are suffering the most from sir pollution.',
                textCN: '因为驾车者受空气污染影响最大。',
              },
              {
                id: 'q1-4-B',
                text: 'Because the first two plans were found illegal by the judges.',
                textCN: '因为前两个计划被法官判定为非法。',
              },
              {
                id: 'q1-4-C',
                text: 'Because long-term solutions are ignored by the government.',
                textCN: '因为长期解决方案被政府忽视。',
              },
              {
                id: 'q1-4-D',
                text: 'Because emergency measures are falling behind.',
                textCN: '因为应急措施落后。',
              },
            ],
            correctOptionId: 'q1-4-B',
            explanation:
              '根据第六段‘Motorists happen to be particularly badly exposed to air pollution, but the real political difficulty for the government is two humiliating legal defeats in two years where judges ruled its air pollution plans were so bad they were illegal.Ministers have now been forced to come up with a third plan’可知，因为前两个计划被法官判定为非法，所以部长们不得不提出第三个计划。',
          },
          {
            id: 'q1-5',
            type: 'reading',
            text: 'Which of the following measures did the French government take when smog suddenly arrived in December?',
            textCN: '去年12月雾霾突然来袭时，法国政府采取了以下哪些措施？',
            options: [
              {
                id: 'q1-5-A',
                text: 'Establishing clean air zones.',
                textCN: '建立清洁空气区。',
              },
              {
                id: 'q1-5-B',
                text: 'Reforming car taxes.',
                textCN: '改革汽车税。',
              },
              {
                id: 'q1-5-C',
                text: 'Limiting vehicles based on license plate number.',
                textCN: '根据车牌号码限制车辆。',
              },
              {
                id: 'q1-5-D',
                text: 'Posting several announcements on Twitter.',
                textCN: '在推特上发布几条公告。',
              },
            ],
            correctOptionId: 'q1-5-C',
            explanation:
              '根据倒数第二段‘When foul air descended on Paris in December, officials there swung into action. Public transport was made free and the number of cars allowed on roads was restricted, alternately barring those with odd and even licence plates.’可知，法国政府采取的措施是根据车牌号码限制车辆。',
          },
        ],
      },
      {
        article: {
          content:
            "Banned by many schools and libraries when first published in 1951, The Catcher in the Rye has been courting controversy for half a century. J. D. Salinger's soul-searching novel of youthful alienation (精神错乱) has long since faced down its initially hostile reception. Nowadays it is one of the most frequently taught books in high school English classes in the United States.\n\nIn the deeply conservative early 1950s, many Americans were shocked by Catcher's explicit language and open treatment of delicate issues such as psychological instability (不稳定). Most of the controversy nowadays, however, concerns how the book and its hero are interpreted.\n\nHolden Caulfield is the 16-year-old schoolboy whose first-person narrative of his mental decline over several days forms the basic plot. Critics generally agree that he is the only substantial character in the novel. However, opinions are divided on the outcome of Holden's constant anger against the adult world.\n\nThe author has fueled controversy himself by remaining an isolated figure who has refused to comment on his work or publish anything further. Whatever his opinions, there is no doubt that the book that made him famous presents a challenge to readers who care to reflect on the emptiness and isolation of the human condition.\n\nAt the beginning of The Catcher in the Rye, Holden has just been kicked out of a boarding school. Having a few days to kill before returning home, he gets on a train to New York. There he spends his time wandering aimlessly from one brief encounter to another, getting progressively more disgusted with the adult world.\n\nHolden is eager for the innocence and simplicity of childhood, while at the same time doing a number of \"adult\" things. Eventually, with the help of his younger sister, he comes to the realization that children cannot be protected forever from the imperfections (不完美) of the adult world.\n\nLike The Adventure of Huckleberry Finn, The Catcher in the Rye is a coming-of-age novel. It is written in the language of its time, yet covers issues that are still relevant to young people today. It is likely to retain its status as a thought-provoking, if somewhat depressing, work for quite some time.",
          contentCN:
            '1951年《麦田里的守望者》这本书刚刚出版的时候许多学校和图书馆都禁读此书，同时此书在过去的五十年中受尽了非议和争论。J.D. 塞林格这部关于年轻人精神错乱的深刻小说，早已克服了最初的敌意。如今，它是美国高中英语课上最常被讲授的书籍之一。\n\n在20世纪50年代初极度保守的时期，许多美国人对《麦田里的守望者》中露骨的语言以及对心理不稳定等微妙问题的公开处理感到震惊。然而，如今大部分争议都集中在这本书及其主人公该如何解读上。\n\n霍尔顿·考尔菲德是一名16岁的学生，他以第一人称叙述了自己几天来的精神衰退，构成了基本情节。评论家们普遍认为他是小说中唯一重要的角色。然而，对于霍尔顿对成人世界持续愤怒的结果，人们看法不一。\n\n作者本人也加剧了争议，他一直是个孤立的人物，拒绝评论自己的作品，也不再发表任何东西。无论他的观点如何，毫无疑问，这本使他成名的书对那些愿意思考人类状况的空虚和孤独的读者构成了挑战。\n\n在《麦田里的守望者》开头，霍尔顿刚被一所寄宿学校开除。在回家前还有几天时间，他登上了去纽约的火车。在那里，他漫无目的地从一次短暂的邂逅游荡到另一次，对成人世界越来越厌恶。\n\n霍尔顿渴望童年的纯真和简单，同时又做着一些“成人”的事情。最终，在他妹妹的帮助下，他意识到孩子们不可能永远免受成人世界不完美的影响。\n\n和《哈克贝利·费恩历险记》一样，《麦田里的守望者》是一部成长小说。它用当时的语言写成，但涵盖的问题在今天对年轻人来说仍然很有意义。它很可能在相当长的一段时间内保持其发人深省的地位，尽管可能有点令人沮丧。',
          id: 'article1',
          title: 'The Catcher in the Rye',
          titleCN: '《麦田里的守望者》',
        },
        description: '关于《麦田里的守望者》的阅读理解',
        id: 'chapter1-reading1',
        questions: [
          {
            correctOptionId: 'q1-1-D',
            explanation:
              '文章第一段提到，1951年The Catcher in the Rye这本书刚刚出版的时候许多学校和图书馆都禁读此书，同时此书在过去的五十年中受尽了非议和争论。但是现在，在美国它却成了使用最频繁的教科书。由此看来，美国人对于此书的态度发生了很大的转变，所以选D。',
            id: 'q1-1',
            options: [
              {
                id: 'q1-1-A',
                text: 'Many professional critics still criticize The Catcher sharply.',
                textCN: '许多专业评论家仍然严厉批评《麦田里的守望者》。',
              },
              {
                id: 'q1-1-B',
                text: 'Some US high schools still ban the reading of The Catcher.',
                textCN: '一些美国高中仍然禁止阅读《麦田里的守望者》。',
              },
              {
                id: 'q1-1-C',
                text: 'The Catcher has been receiving constant positive comments.',
                textCN: '《麦田里的守望者》一直受到不断的积极评价。',
              },
              {
                id: 'q1-1-D',
                text: "Americans' attitude toward The Catcher has changed greatly.",
                textCN: '美国人对《麦田里的守望者》的态度发生了很大变化。',
              },
            ],
            text: 'What can be known from Paragraph 1?',
            textCN: '从第一段可以知道什么？',
            type: 'reading',
          },
          {
            correctOptionId: 'q1-2-C',
            explanation:
              '根据文章第二段最后一句话，Most of the controversy nowadays concerns how the book and its hero are interpreted，意为，现在争议的焦点在于对此书以及男主角的阐释上，所以选C。',
            id: 'q1-2',
            options: [
              {
                id: 'q1-2-A',
                text: 'the first-person narrative technique',
                textCN: '第一人称叙述技巧',
              },
              {
                id: 'q1-2-B',
                text: 'the treatment of detailed issues',
                textCN: '对细节问题的处理',
              },
              {
                id: 'q1-2-C',
                text: 'the interpretation of the hero',
                textCN: '对主人公的解读',
              },
              {
                id: 'q1-2-D',
                text: 'the use of explicit language',
                textCN: '露骨语言的使用',
              },
            ],
            text: 'There is still some disagreement on The Catcher about ________.',
            textCN: '关于《麦田里的守望者》仍然存在一些分歧的是________。',
            type: 'reading',
          },
          {
            correctOptionId: 'q1-3-B',
            explanation:
              '根据文章第四段第一句话，The author has fueled controversy himself by remaining an isolated figure who has refused to comment on his work or publish anything further，意为，作者，作为孤立的个体，没有为此书做任何评价，也没有再发表别的作品，这就更增加了对这本书的争议。其中fuel controversy与题干中的add to the controversy表达意思相近，另外选项B中的hid himself afterwards and remained silent与remaining an isolated figure who has refused to comment on his work表达意思一致，所以选B。',
            id: 'q1-3',
            options: [
              {
                id: 'q1-3-A',
                text: 'described the human society as a dark world',
                textCN: '将人类社会描述为一个黑暗的世界',
              },
              {
                id: 'q1-3-B',
                text: 'hid himself afterwards and remained silent',
                textCN: '后来隐藏自己并保持沉默',
              },
              {
                id: 'q1-3-C',
                text: 'defended his book firmly in various ways',
                textCN: '以各种方式坚定地为他的书辩护',
              },
              {
                id: 'q1-3-D',
                text: 'left an unanswered question in this book',
                textCN: '在这本书中留下了一个未回答的问题',
              },
            ],
            text: 'The author himself adds to the controversy of his book in that he ________.',
            textCN: '作者本人增加了他的书的争议，因为他________。',
            type: 'reading',
          },
          {
            correctOptionId: 'q1-4-D',
            explanation:
              '根据文章第六段第二句话，Eventually, with the help of his younger sister, he comes to the realization that children cannot be protected forever from the imperfections (不完美) of the adult world. 意为，最终，在他妹妹的帮助之下，他意识到孩子们不可能永远被不完美的成人世界保护，所以选D。',
            id: 'q1-4',
            options: [
              {
                id: 'q1-4-A',
                text: 'The conductor on the train.',
                textCN: '火车上的列车员。',
              },
              {
                id: 'q1-4-B',
                text: 'A passerby in New York.',
                textCN: '纽约的一个路人。',
              },
              {
                id: 'q1-4-C',
                text: "Holden's school master.",
                textCN: '霍尔顿的校长。',
              },
              {
                id: 'q1-4-D',
                text: "Holden's younger sister.",
                textCN: '霍尔顿的妹妹。',
              },
            ],
            text: 'According to the passage, who eventually helps Holden accept the reality of the adult world?',
            textCN: '根据文章，谁最终帮助霍尔顿接受了成人世界的现实？',
            type: 'reading',
          },
          {
            correctOptionId: 'q1-5-A',
            explanation:
              '根据文章最后一段最后一句话，It is likely to retain its status as a thought-provoking work for quite some time，意为，这本发人深省的书很可能在很长一段时间内保留此地位。由此可以推断此书在文学界很有可能占举足轻重的地位，所以选A。',
            id: 'q1-5',
            options: [
              {
                id: 'q1-5-A',
                text: 'It is likely to remain important in literature.',
                textCN: '它很可能在文学中仍然很重要。',
              },
              {
                id: 'q1-5-B',
                text: 'It is likely to become unpopular among the young.',
                textCN: '它很可能在年轻人中不受欢迎。',
              },
              {
                id: 'q1-5-C',
                text: 'It is likely to be revised in the modern language.',
                textCN: '它很可能会用现代语言进行修订。',
              },
              {
                id: 'q1-5-D',
                text: 'It is likely to be taught only in high schools.',
                textCN: '它很可能只在高中被教授。',
              },
            ],
            text: 'What would be the possible future of The Catcher?',
            textCN: '《麦田里的守望者》可能的未来会是怎样？',
            type: 'reading',
          },
        ],
        title: '阅读理解 1',
        type: 'reading',
      },
      {
        id: 'chapter1-reading1',
        title: '阅读理解 1',
        description: '关于糖、酒精和烟草征税以及食品行业应对措施的阅读理解',
        type: 'reading',
        article: {
          id: 'article1',
          title: 'Taxation on Sugar, Alcohol and Tobacco',
          titleCN: '糖、酒精和烟草的征税',
          content: `"Sugar, alcohol and tobacco," economist Adam Smith once wrote, "are commodities which are nowhere necessaries of life, which have become objects of almost universal consumption, and which are, therefore, extremely popular subjects of taxation."
    Two and a half centuries on, most countries impose some sort of tax on alcohol and tobacco. With surging obesity levels putting increasing strain on public health systems, governments around the world have begun to toy with the idea of taxing sugar as well.
    Whether such taxes work is a matter of debate. A preliminary review of Mexico's taxation found a fall in purchases of taxed drinks as well as a rise in sales if untaxed and healthier drinks. By contrast, a Danish tax on foods high in fats was abandoned a year after its introduction, amid claims that consumers were avoiding it by crossing the border to Germany to satisfy their desire for cheaper, fattier fare.
    The food industry has, in general, been firmly opposed to such direct government action. Nonetheless, the renewed focus on waistlines means that industry groups are under pressure to demonstrate their products are healthy as well as tasty.
    Over the past three decades, the industry has made some efforts to improve the quality of its offerings. For example, some drink manufactures have cut the amount of sugar in their beverages.
    Many of the reductions over the past 30 years have been achieved either by reducing the amount of sugar, salt or fat in a product, or by finding an alternative ingredient. More recently, however, some companies have been investing money in a more ambitious undertaking: learning how to adjust the fundamental make-up of the food they sell. For example, having salt on the outside, but none on the inside, reduces the salt content without changing the taste.
    While reformulating recipes (配方) is one way to improve public health, it should be part of a multi-sided approach. The key is to remember that there is not just one solution. To deal with obesity, a mixture of approaches-including reformulation, taxation and adjusting portion sizes-will be needed. There is no silver bullet.`,
          contentCN: `"经济学家亚当·斯密曾经写道：“糖、酒精和烟草，是任何地方都不是生活必需品的商品，它们已经成为几乎普遍消费的对象，因此，它们是极其受欢迎的征税对象。”
    两个半世纪过去了，大多数国家都对酒精和烟草征收某种税。随着肥胖水平的飙升给公共卫生系统带来越来越大的压力，世界各地的政府也开始考虑对糖征税。
    这种税收是否有效是一个有争议的问题。对墨西哥税收的初步审查发现，征税饮料的购买量下降，而未征税且更健康饮料的销量上升。相比之下，丹麦对高脂肪食品征收的税在实施一年后就被取消了，因为有说法称消费者通过越境到德国来避免缴纳该税，以满足他们对更便宜、脂肪含量更高食物的需求。
    食品行业总体上一直坚决反对政府的这种直接行动。尽管如此，对腰围的重新关注意味着行业团体面临压力，要证明他们的产品既健康又美味。
    在过去的三十年里，该行业已经做出了一些努力来提高其产品质量。例如，一些饮料制造商已经减少了饮料中的糖含量。
    在过去30年里，许多减少都是通过减少产品中的糖、盐或脂肪含量，或者通过找到替代成分来实现的。然而，最近一些公司一直在投资一项更雄心勃勃的事业：学习如何调整他们所销售食品的基本成分。例如，在外面加盐但里面不加盐，可以在不改变味道的情况下降低盐含量。
    虽然重新制定配方是改善公众健康的一种方法，但它应该是多方面方法的一部分。关键是要记住，没有单一的解决方案。要应对肥胖问题，需要多种方法的结合，包括重新配方、征税和调整份量大小。没有万灵药。`,
        },
        questions: [
          {
            id: 'q1-1',
            type: 'reading',
            text: 'What did Adam Smith say about sugar, alcohol and tobacco?',
            textCN: '亚当·斯密关于糖、酒精和烟草说了什么？',
            options: [
              {
                id: 'q1-1-A',
                text: 'They were profitable to manufacture.',
                textCN: '它们制造起来有利可图。',
              },
              {
                id: 'q1-1-B',
                text: 'They were in ever-increasing demand.',
                textCN: '它们的需求不断增加。',
              },
              {
                id: 'q1-1-C',
                text: 'They were subject to taxation almost everywhere.',
                textCN: '它们几乎在所有地方都要征税。',
              },
              {
                id: 'q1-1-D',
                text: 'They were no longer considered necessities of life.',
                textCN: '它们不再被视为生活必需品。',
              },
            ],
            correctOptionId: 'q1-1-C',
            explanation:
              "The first paragraph states that 'Sugar, alcohol and tobacco...are, therefore, extremely popular subjects of taxation.'",
          },
          {
            id: 'q1-2',
            type: 'reading',
            text: 'Why have many countries started to consider taxing sugar?',
            textCN: '为什么许多国家开始考虑对糖征税？',
            options: [
              {
                id: 'q1-2-A',
                text: 'They are under growing pressures to balance their national budgets.',
                textCN: '它们在平衡国家预算方面面临越来越大的压力。',
              },
              {
                id: 'q1-2-B',
                text: 'They find it ever harder to cope with sugar-induced health problems.',
                textCN: '它们发现应对糖引发的健康问题越来越困难。',
              },
              {
                id: 'q1-2-C',
                text: 'They practice of taxing alcohol and tobacco has proved both popular and profitable.',
                textCN: '对酒精和烟草征税的做法已被证明既受欢迎又有利可图。',
              },
              {
                id: 'q1-2-D',
                text: 'The sugar industry is overtaking alcohol and tobacco business in generating profit',
                textCN: '制糖业在盈利方面正在超过酒精和烟草业',
              },
            ],
            correctOptionId: 'q1-2-B',
            explanation:
              "The second paragraph mentions 'With surging obesity levels putting increasing strain on public health systems, governments around the world have begun to toy with the idea of taxing sugar as well.'",
          },
          {
            id: 'q1-3',
            type: 'reading',
            text: 'What do we learn about Danish taxation on fat-rich foods?',
            textCN: '关于丹麦对高脂肪食品的征税我们了解到什么？',
            options: [
              {
                id: 'q1-3-A',
                text: 'It did not work out as well as was expected.',
                textCN: '它没有达到预期的效果。',
              },
              {
                id: 'q1-3-B',
                text: 'It gave rise to a lot of problems on the border.',
                textCN: '它在边境引发了很多问题。',
              },
              {
                id: 'q1-3-C',
                text: 'It could not succeed without German cooperation.',
                textCN: '没有德国的合作它无法成功。',
              },
              {
                id: 'q1-3-D',
                text: 'It met with firm opposition from the food industry.',
                textCN: '它遭到了食品行业的坚决反对。',
              },
            ],
            correctOptionId: 'q1-3-A',
            explanation:
              "The third paragraph states 'By contrast, a Danish tax on foods high in fats was abandoned a year after its introduction, amid claims that consumers were avoiding it by crossing the border to Germany to satisfy their desire for cheaper, fattier fare.'",
          },
          {
            id: 'q1-4',
            type: 'reading',
            text: 'What is the more recent effort by food companies to make foods and drinks both healthy and tasty?',
            textCN: '食品公司为使食品和饮料既健康又美味所做的最新努力是什么？',
            options: [
              {
                id: 'q1-4-A',
                text: 'Replacing sugar or salt with alternative ingredients.',
                textCN: '用替代成分替代糖或盐。',
              },
              {
                id: 'q1-4-B',
                text: 'Setting a limit on the amount of sugar or salt in their products.',
                textCN: '对产品中的糖或盐含量设限。',
              },
              {
                id: 'q1-4-C',
                text: "Investing in research to find ways to adapt to consumers' needs.",
                textCN: '投资研究以找到适应消费者需求的方法。',
              },
              {
                id: 'q1-4-D',
                text: 'Adjusting the physical composition of their products.',
                textCN: '调整产品的物理成分。',
              },
            ],
            correctOptionId: 'q1-4-D',
            explanation:
              "The sixth paragraph mentions 'More recently, however, some companies have been investing money in a more ambitious undertaking: learning how to adjust the fundamental make-up of the food they sell.'",
          },
          {
            id: 'q1-5',
            type: 'reading',
            text: 'What does the author mean by saying, at the end of the passage, "There is no silver bullet"( Para 7)?',
            textCN:
              '作者在文章结尾说“There is no silver bullet”（第7段）是什么意思？',
            options: [
              {
                id: 'q1-5-A',
                text: 'There is no single easy quick solution to the problem.',
                textCN: '没有单一的简单快速解决问题的办法。',
              },
              {
                id: 'q1-5-B',
                text: 'There is no hope of success without public cooperation.',
                textCN: '没有公众合作就没有成功的希望。',
              },
              {
                id: 'q1-5-C',
                text: 'There is on hurry in finding ways to solve the obesity problem.',
                textCN: '在寻找解决肥胖问题的方法上没有紧迫感。',
              },
              {
                id: 'q1-5-D',
                text: "There is no effective way to reduce people's sugar consumption.",
                textCN: '没有有效的方法来减少人们的糖消费。',
              },
            ],
            correctOptionId: 'q1-5-A',
            explanation:
              "The last paragraph states 'While reformulating recipes(配方)is one way to improve public health, it should be part of a multi-sided approach. The key is to remember that there is not just one solution. To deal with obesity, a mixture of approaches-including reformulation, taxation and adjusting portion sizes-will be needed. There is no silver bullet.'",
          },
        ],
      },
      {
        id: 'chapter1-reading1',
        title: '阅读理解 1',
        description: '关于专业词汇的阅读理解',
        type: 'reading',
        article: {
          id: 'article1',
          title: 'Technical Vocabulary',
          titleCN: '专业词汇',
          content: `Every profession or trade, every art, and every science has its technical vocabulary. Different occupations, however, differ widely in the character of their special vocabularies. In trades and handicrafts, and other vocations, like farming and fishery, that have occupied great numbers of men from remote times, the technical vocabulary, is very old. It consists largely of native words, or of borrowed words that have worked themselves into the very fiber of our language.
    Hence, though highly technical in many particulars, these vocabularies are more familiar in sound, and more generally understood, than most other technicalities. The special dialects of law, medicine, divinity(神学), and philosophy have also, in their older strata(社会阶层), become pretty familiar to cultivated persons and have contributed much to the popular vocabulary. Yet every vocation still possesses a large body of technical terms that remain essentially foreign, even to educated speech. And the proportion has been much increased in the last fifty years, particularly in the various departments of natural and political science and in the mechanic arts. Here new term are coined with the greatest freedom and abandoned with indifference when they have served their turn. Most of the new coinages are confined to special discussions, and seldom get into general literature or conversation.
    Yet no profession is nowadays, as all professions once were, a close guild. The lawyer, the physician, the man of science, the divine, associated freely with his fellow-creatures, and does not meet them in a merely professional way. Furthermore, what is called "popular science" makes everybody acquainted with modern views and recent discoveries. Any important experiment, though made in a remote or provincial laboratory, is at once reported in the newspapers, and everybody is soon talking about it—as in the case of the Roentgen rays and wireless telegraphy(电信技术). Thus our common speech is always taking up new technical terms and making them commonplace.`,
          contentCN: `每个职业、行业、艺术和科学都有其专业词汇。然而，不同的职业在其特殊词汇的特点上有很大差异。在贸易、手工艺以及其他职业，如农业和渔业中，从远古时代起就有大量的人从事这些工作，其专业词汇非常古老。它主要由本土词汇或已经融入我们语言结构的外来词汇组成。
    因此，尽管这些词汇在许多方面具有高度的专业性，但在发音上更为熟悉，并且比大多数其他专业术语更易于理解。法律、医学、神学和哲学的特殊方言在其较古老的层次中，也已为有教养的人所熟知，并对大众词汇做出了很大贡献。然而，每个职业仍然拥有大量的专业术语，即使对受过教育的人来说，这些术语本质上仍然是陌生的。在过去的五十年里，这一比例有了很大的增加，特别是在自然科学、政治科学和机械艺术的各个领域。在这里，新术语被极其自由地创造出来，当它们完成使命后就被毫不留情地抛弃。大多数新造词都局限于特殊的讨论中，很少进入一般文学或日常对话。
    然而，如今没有一个职业像过去所有职业那样是一个封闭的行会。律师、医生、科学家、神职人员可以自由地与他的同伴交往，而不仅仅是以职业的方式与他们见面。此外，所谓的“大众科学”使每个人都了解现代观点和最新发现。任何重要的实验，即使是在偏远或地方实验室进行的，也会立即在报纸上报道，每个人很快就会谈论它——就像伦琴射线和无线电报的情况一样。因此，我们的日常用语总是在吸收新的专业术语并使其变得司空见惯。`,
        },
        questions: [
          {
            id: 'q1-1',
            type: 'reading',
            text: 'Special words used in technical discussion_______.',
            textCN: '技术讨论中使用的特殊词汇_______。',
            options: [
              { id: 'q1-1-A', text: 'never last long', textCN: '从不长久存在' },
              {
                id: 'q1-1-B',
                text: 'are considered artificial language speech',
                textCN: '被认为是人造语言',
              },
              {
                id: 'q1-1-C',
                text: 'should be confined to scientific fields',
                textCN: '应该局限于科学领域',
              },
              {
                id: 'q1-1-D',
                text: 'may become part of common speech',
                textCN: '可能成为日常用语的一部分',
              },
            ],
            correctOptionId: 'q1-1-D',
            explanation:
              '文章最后提到日常用语总是在吸收新的专业术语并使其变得司空见惯，所以技术讨论中使用的特殊词汇可能成为日常用语的一部分。',
          },
          {
            id: 'q1-2',
            type: 'reading',
            text: 'It is TRUE that_______.',
            textCN: '以下哪项是正确的？',
            options: [
              {
                id: 'q1-2-A',
                text: 'an educated person would be expected to know most technical terms',
                textCN: '一个受过教育的人应该知道大多数技术术语',
              },
              {
                id: 'q1-2-B',
                text: 'everyone is interested in scientific findings',
                textCN: '每个人都对科学发现感兴趣',
              },
              {
                id: 'q1-2-C',
                text: 'the average man often uses in his own vocabulary what was once technical language not meant for him',
                textCN:
                  '普通人经常在自己的词汇中使用曾经并非为他准备的技术语言',
              },
              {
                id: 'q1-2-D',
                text: 'various professions and occupations often interchange their dialects and jargons',
                textCN: '各种职业经常互换他们的方言和行话',
              },
            ],
            correctOptionId: 'q1-2-C',
            explanation:
              '根据文章内容，大众科学使每个人了解现代观点和发现，日常用语会吸收新的专业术语，所以普通人会在自己词汇中使用曾经的专业术语。',
          },
          {
            id: 'q1-3',
            type: 'reading',
            text: 'In recent years, there has been a marked increase in the number of technical terms in the terminology of_______.',
            textCN: '近年来，_______领域的术语中技术术语的数量有显著增加。',
            options: [
              { id: 'q1-3-A', text: 'farming', textCN: '农业' },
              { id: 'q1-3-B', text: 'sports', textCN: '体育' },
              { id: 'q1-3-C', text: 'government', textCN: '政府' },
              { id: 'q1-3-D', text: 'fishery', textCN: '渔业' },
            ],
            correctOptionId: 'q1-3-C',
            explanation:
              '文中提到在过去五十年里，自然科学、政治科学和机械艺术等领域技术术语比例增加，政府相关领域属于政治科学范畴。',
          },
          {
            id: 'q1-4',
            type: 'reading',
            text: 'The writer of the article was, no doubt_______.',
            textCN: '这篇文章的作者无疑是_______。',
            options: [
              { id: 'q1-4-A', text: 'a linguist', textCN: '一位语言学家' },
              { id: 'q1-4-B', text: 'an essayist', textCN: '一位散文家' },
              { id: 'q1-4-C', text: 'a scientist', textCN: '一位科学家' },
              { id: 'q1-4-D', text: 'an attorney', textCN: '一位律师' },
            ],
            correctOptionId: 'q1-4-A',
            explanation:
              '文章主要围绕专业词汇展开，涉及词汇的特点、发展等，所以作者很可能是语言学家。',
          },
          {
            id: 'q1-5',
            type: 'reading',
            text: "The author's main purpose of the passage is to_______.",
            textCN: '作者写这篇文章的主要目的是_______。',
            options: [
              {
                id: 'q1-5-A',
                text: 'describe a phenomenon',
                textCN: '描述一种现象',
              },
              { id: 'q1-5-B', text: 'be entertaining', textCN: '具有娱乐性' },
              { id: 'q1-5-C', text: 'argue a belief', textCN: '论证一种观点' },
              {
                id: 'q1-5-D',
                text: 'propose a solution',
                textCN: '提出一个解决方案',
              },
            ],
            correctOptionId: 'q1-5-A',
            explanation:
              '文章主要讲述了专业词汇的各种情况，如不同职业词汇特点、新术语的产生和发展等，是在描述一种现象。',
          },
        ],
      },
      {
        id: 'chapter1-reading1',
        title: '阅读理解 1',
        description: '关于可再生能源发展现状及面临问题的阅读理解',
        type: 'reading',
        article: {
          id: 'article1',
          title: 'Renewable Energy Development',
          titleCN: '可再生能源发展',
          content: `Almost150 years after photovoltaic(光电的) cells and wind turbines(涡轮机) were invented， they still generate only 7% of the world's electricity. Yet something remarkable is happening. From being secondary to the energy system just over a decade ago, they are now growing faster than any other energy source and their falling costs are making them competitive with fossil fuels. BP, an oil firm, expects renewables to account for half of the growth in global energy supply over the next 20 years. It is no longer far-fetched to think that the world is entering an era of clean, unlimited and cheap power.
            There is a problem, though. To get from here to there requires huge amounts of investment over the next few decades. Normally investors like putting their money into electricity because it offers reliable returns. Yet green energy has a dirty secret. The more it is used, the more it lowers the price of power from any source. That makes it hard to manage the transition to a carbon-free future, during which many generating technologies, clean and dirty, need to remain profitable if the lights are to stay on. Unless the market is fixed, subsidies to the industry will only grow.
            Policymakers are already seeing this inconvenient truth as a reason to put the brakes on renewable energy. In parts of Europe, investment in renewables is slowing as subsidies are cut back. However, the solution is not less wind and solar. It is to rethink how the world prices clean energy in order to make better use of it.
            At its heart, the problem Is that government-supported renewable energy has been imposed on a market designed in a different era. For much of the 20th century, electricity was made and moved by vertically integrated, state-controlled monopolies. From the 1980s onwards, many of these were broken up, privatized and liberalized, so that market forces could determine where best to invest. Today only about 6% of electricity users get their power from monopolies. Yet everywhere the pressure to decarbonize power supply has brought the state creeping back into markets. This is disruptive for three reasons. The first is the subsidy system itself. The other two are inherent to the nature of wind and solar: their intermittency and their very low running costs. All three help explain why power prices are low and public subsidies are addictive.`,
          contentCN: `在光伏电池和风力涡轮机发明近150年后，它们仍仅占全球电力的7%。然而，一些引人注目的事情正在发生。就在十多年前，它们在能源系统中还处于次要地位，如今它们的增长速度超过了任何其他能源，而且成本不断下降，这使它们能够与化石燃料竞争。英国石油公司预计，在未来20年里，可再生能源将占全球能源供应增长的一半。认为世界正在进入一个清洁、无限且廉价电力的时代，这已不再是牵强的想法。
            不过，有一个问题。要实现这一目标，在未来几十年需要大量投资。通常情况下，投资者喜欢把钱投入电力行业，因为它能提供可靠的回报。然而，绿色能源有一个不为人知的秘密。它使用得越多，就越会压低任何能源的电力价格。这使得向无碳未来的过渡变得困难，在此期间，如果要保证电力供应，许多发电技术，无论是清洁的还是污染的，都需要保持盈利。除非市场得到调整，否则对该行业的补贴只会增加。
            政策制定者已经将这个不便的事实视为放慢可再生能源发展的理由。在欧洲部分地区，随着补贴的削减，对可再生能源的投资正在放缓。然而，解决办法不是减少风能和太阳能。而是要重新思考世界如何为清洁能源定价，以便更好地利用它。
            问题的核心在于，政府支持的可再生能源被强加于一个为不同时代设计的市场。在20世纪的大部分时间里，电力由垂直整合、国家控制的垄断企业生产和输送。从20世纪80年代起，其中许多企业被拆分、私有化和自由化，以便市场力量能够决定最佳投资地点。如今，只有约6%的电力用户从垄断企业获取电力。然而，各地脱碳电力供应的压力已使国家悄悄重返市场。这具有破坏性，原因有三个。第一个是补贴制度本身。另外两个与风能和太阳能的性质有关：它们的间歇性和极低的运营成本。这三个因素共同解释了为什么电力价格低廉，以及公共补贴为何让人上瘾。`,
        },
        questions: [
          {
            id: 'q1-1',
            type: 'reading',
            text: 'Why can photovoltaic cells and wind turbines compete with fossil fuels?',
            textCN: '为什么光伏电池和风力涡轮机能够与化石燃料竞争？',
            options: [
              {
                id: 'q1-1-A',
                text: 'They are clean and unlimited.',
                textCN: '它们清洁且无限',
              },
              {
                id: 'q1-1-B',
                text: 'Their costs keep lowering down.',
                textCN: '它们的成本持续降低',
              },
              {
                id: 'q1-1-C',
                text: 'They can produce power more efficiently.',
                textCN: '它们能更高效地发电',
              },
              {
                id: 'q1-1-D',
                text: 'They receive more subsidies from the government.',
                textCN: '它们从政府获得更多补贴',
              },
            ],
            correctOptionId: 'q1-1-B',
            explanation:
              '文中提到‘From being secondary to the energy system just over a decade ago, they are now growing faster than any other energy source and their falling costs are making them competitive with fossil fuels.’，说明它们能与化石燃料竞争是因为成本不断下降。',
          },
          {
            id: 'q1-2',
            type: 'reading',
            text: 'What is the dirty secret of green energy?',
            textCN: '绿色能源的不为人知的秘密是什么？',
            options: [
              {
                id: 'q1-2-A',
                text: 'Its equipment requires frequent maintenance.',
                textCN: '其设备需要频繁维护',
              },
              {
                id: 'q1-2-B',
                text: 'It offers little reliable returns to the investors.',
                textCN: '它给投资者提供的可靠回报很少',
              },
              {
                id: 'q1-2-C',
                text: 'It costs a lot to transport the electricity it produces.',
                textCN: '运输其生产的电力成本很高',
              },
              {
                id: 'q1-2-D',
                text: 'Its use will reduce the price of power.',
                textCN: '它的使用会降低电力价格',
              },
            ],
            correctOptionId: 'q1-2-D',
            explanation:
              '文中明确指出‘Yet green energy has a dirty secret. The more it is used, the more it lowers the price of power from any source.’，即绿色能源使用越多，电力价格越低。',
          },
          {
            id: 'q1-3',
            type: 'reading',
            text: 'Why are policymakers unwilling to develop renewable energy?',
            textCN: '为什么政策制定者不愿意发展可再生能源？',
            options: [
              {
                id: 'q1-3-A',
                text: 'It needs a large amount of subsidies from the government.',
                textCN: '它需要政府大量补贴',
              },
              {
                id: 'q1-3-B',
                text: 'It is inconvenient to manufacture wind turbines and solar cells.',
                textCN: '制造风力涡轮机和太阳能电池不方便',
              },
              {
                id: 'q1-3-C',
                text: 'Green energy will bring negative influence on coal power plants.',
                textCN: '绿色能源会给煤电厂带来负面影响',
              },
              {
                id: 'q1-3-D',
                text: 'The government needs to subsidize many other public services.',
                textCN: '政府需要补贴许多其他公共服务',
              },
            ],
            correctOptionId: 'q1-3-A',
            explanation:
              '文中提到‘That makes it hard to manage the transition to a carbon-free future, during which many generating technologies, clean and dirty, need to remain profitable if the lights are to stay on. Unless the market is fixed, subsidies to the industry will only grow.’以及‘Policymakers are already seeing this inconvenient truth as a reason to put the brakes on renewable energy.’，说明政策制定者因绿色能源需要大量补贴而不愿发展。',
          },
          {
            id: 'q1-4',
            type: 'reading',
            text: 'What can be done to make better use of green energy?',
            textCN: '为了更好地利用绿色能源可以做些什么？',
            options: [
              {
                id: 'q1-4-A',
                text: 'To update generating technologies of green energy.',
                textCN: '更新绿色能源的发电技术',
              },
              {
                id: 'q1-4-B',
                text: 'To bring more private enterprises into the market.',
                textCN: '让更多民营企业进入市场',
              },
              {
                id: 'q1-4-C',
                text: 'To set a reasonable price on clean energy.',
                textCN: '为清洁能源设定合理价格',
              },
              {
                id: 'q1-4-D',
                text: 'To increase subsidies to green energy.',
                textCN: '增加对绿色能源的补贴',
              },
            ],
            correctOptionId: 'q1-4-C',
            explanation:
              '文中提到‘However, the solution is not less wind and solar. It is to rethink how the world prices clean energy in order to make better use of it.’，表明要为清洁能源合理定价以更好利用。',
          },
          {
            id: 'q1-5',
            type: 'reading',
            text: 'What is the problem with renewable energy in nature?',
            textCN: '可再生能源本质上的问题是什么？',
            options: [
              {
                id: 'q1-5-A',
                text: 'The market is designed in different times.',
                textCN: '市场是为不同时代设计的',
              },
              {
                id: 'q1-5-B',
                text: 'Monopolies still supply most of green power.',
                textCN: '垄断企业仍供应大部分绿色电力',
              },
              {
                id: 'q1-5-C',
                text: 'Market forces couldn’t determine where to invest.',
                textCN: '市场力量无法决定投资地点',
              },
              {
                id: 'q1-5-D',
                text: "Companies in this field can't remain profitable.",
                textCN: '该领域的公司无法保持盈利',
              },
            ],
            correctOptionId: 'q1-5-A',
            explanation:
              '文中指出‘At its heart, the problem Is that government-supported renewable energy has been imposed on a market designed in a different era.’，说明可再生能源面临的问题是市场是为不同时代设计的。',
          },
        ],
      },
      {
        id: 'chapter15-cloze7',
        title: '完形填空 21',
        description: '关于心绞痛症状与识别的完形填空',
        type: 'cloze',
        questions: [
          {
            id: 'c21-1',
            type: 'cloze',
            text: 'While people think that the problem is in their airways, it is often (75)_____ their heart.',
            textCN: '虽然人们认为问题出在呼吸道，但往往(75)_____是心脏问题。',
            options: [
              { id: 'c21-1-A', text: 'actually', textCN: '实际上' },
              { id: 'c21-1-B', text: 'hardly', textCN: '几乎不' },
              { id: 'c21-1-C', text: 'never', textCN: '从未' },
              { id: 'c21-1-D', text: 'rarely', textCN: '很少' },
            ],
            correctOptionId: 'c21-1-A',
            explanation:
              '“actually”意为“实际上”，用于纠正人们对疼痛来源的错误认知，强调心脏才是真正病因，符合医学事实与文本转折逻辑。',
          },
          {
            id: 'c21-2',
            type: 'cloze',
            text: 'The (76)_____, known as angina (心绞痛), reveals itself as pain behind the breastbone.',
            textCN: '这种(76)_____，即心绞痛，表现为胸骨后疼痛。',
            options: [
              { id: 'c21-2-A', text: 'condition', textCN: '状况' },
              { id: 'c21-2-B', text: 'solution', textCN: '解决方案' },
              { id: 'c21-2-C', text: 'treatment', textCN: '治疗' },
              { id: 'c21-2-D', text: 'cause', textCN: '原因' },
            ],
            correctOptionId: 'c21-2-A',
            explanation:
              '“condition”意为“状况”，指心绞痛这种疾病状态，与“known as angina”搭配准确，用于医学描述中对病症的定义。',
          },
          {
            id: 'c21-3',
            type: 'cloze',
            text: "It's an illness where the blood (77)_____ to the heart muscle is restricted.",
            textCN: '这种疾病会导致心肌的血液(77)_____受阻。',
            options: [
              { id: 'c21-3-A', text: 'flow', textCN: '流动' },
              { id: 'c21-3-B', text: 'pressure', textCN: '压力' },
              { id: 'c21-3-C', text: 'test', textCN: '测试' },
              { id: 'c21-3-D', text: 'cell', textCN: '细胞' },
            ],
            correctOptionId: 'c21-3-A',
            explanation:
              '“flow”意为“流动”，“blood flow”指血流，是医学术语中描述血液循环的标准表达，体现心绞痛“血流受阻”的病理机制。',
          },
          {
            id: 'c21-4',
            type: 'cloze',
            text: 'If not (78)_____ and treated in a timely manner, it can lead to a heart attack and death.',
            textCN: '如果不及时(78)_____和治疗，可能导致心脏病发作和死亡。',
            options: [
              { id: 'c21-4-A', text: 'recognized', textCN: '识别' },
              { id: 'c21-4-B', text: 'denied', textCN: '否认' },
              { id: 'c21-4-C', text: 'ignored', textCN: '忽视' },
              { id: 'c21-4-D', text: 'created', textCN: '创造' },
            ],
            correctOptionId: 'c21-4-A',
            explanation:
              '“recognized”意为“识别”，指及时察觉病症，与“治疗”并列，构成“早发现早治疗”的逻辑链条，强调早期诊断的重要性。',
          },
          {
            id: 'c21-5',
            type: 'cloze',
            text: 'It is (79)_____ described as a dull, wearing feeling of compression...',
            textCN: '这种疼痛(79)_____被描述为一种钝痛、持续性的压迫感...',
            options: [
              { id: 'c21-5-A', text: 'typically', textCN: '典型地' },
              { id: 'c21-5-B', text: 'strangely', textCN: '奇怪地' },
              { id: 'c21-5-C', text: 'rarely', textCN: '很少地' },
              { id: 'c21-5-D', text: 'accidentally', textCN: '偶然地' },
            ],
            correctOptionId: 'c21-5-A',
            explanation:
              '“typically”意为“典型地”，指这种疼痛描述符合心绞痛的常见症状，体现医学表述的规范性，为患者自我识别提供标准。',
          },
          {
            id: 'c21-6',
            type: 'cloze',
            text: 'Women often (80)_____ about lack of air.',
            textCN: '女性常(80)_____呼吸困难。',
            options: [
              { id: 'c21-6-A', text: 'complain', textCN: '抱怨' },
              { id: 'c21-6-B', text: 'argue', textCN: '争论' },
              { id: 'c21-6-C', text: 'dream', textCN: '梦想' },
              { id: 'c21-6-D', text: 'lie', textCN: '撒谎' },
            ],
            correctOptionId: 'c21-6-A',
            explanation:
              '“complain”意为“抱怨”，“complain about”指主诉症状，是医学文献中描述患者反馈的常用表达，体现女性患者的典型主诉差异。',
          },
          {
            id: 'c21-7',
            type: 'cloze',
            text: 'All those suffering say the pain comes suddenly and in (81)_____ but does not last for days on end.',
            textCN:
              '所有患者都表示疼痛突然发作且(81)_____出现，但不会持续数天。',
            options: [
              { id: 'c21-7-A', text: 'intervals', textCN: '间隔' },
              { id: 'c21-7-B', text: 'rows', textCN: '排' },
              { id: 'c21-7-C', text: 'groups', textCN: '组' },
              { id: 'c21-7-D', text: 'lines', textCN: '线' },
            ],
            correctOptionId: 'c21-7-A',
            explanation:
              '“intervals”意为“间隔”，“in intervals”指间歇性发作，与“不持续数天”形成对比，描述心绞痛的发作规律，是医学诊断的重要依据。',
          },
          {
            id: 'c21-8',
            type: 'cloze',
            text: 'Steady forms of angina are (82)_____ by exertion (努力，费力), like physical work or stress.',
            textCN: '稳定型心绞痛由体力劳动或压力等(82)_____诱发。',
            options: [
              { id: 'c21-8-A', text: 'prompted', textCN: '促使' },
              { id: 'c21-8-B', text: 'prevented', textCN: '预防' },
              { id: 'c21-8-C', text: 'cured', textCN: '治愈' },
              { id: 'c21-8-D', text: 'worsened', textCN: '恶化' },
            ],
            correctOptionId: 'c21-8-A',
            explanation:
              '“prompted”意为“促使”，指诱因引发心绞痛，符合“稳定型心绞痛因劳累诱发”的医学常识，与“休息后缓解”形成因果关系。',
          },
          {
            id: 'c21-9',
            type: 'cloze',
            text: 'Things are reversed in the more (83)_____, unstable form of the disease.',
            textCN: '在更(83)_____的不稳定型疾病中，情况则相反。',
            options: [
              { id: 'c21-9-A', text: 'dangerous', textCN: '危险的' },
              { id: 'c21-9-B', text: 'common', textCN: '常见的' },
              { id: 'c21-9-C', text: 'mild', textCN: '轻微的' },
              { id: 'c21-9-D', text: 'simple', textCN: '简单的' },
            ],
            correctOptionId: 'c21-9-A',
            explanation:
              '“dangerous”意为“危险的”，指不稳定型心绞痛因可能引发心肌梗死而更具危险性，与“稳定型”形成对比，强调其紧急程度。',
          },
          {
            id: 'c21-10',
            type: 'cloze',
            text: 'Both forms require a(n) (84)_____ trip to the doctor.',
            textCN: '两种类型都需要(84)_____就医。',
            options: [
              { id: 'c21-10-A', text: 'immediate', textCN: '立即的' },
              { id: 'c21-10-B', text: 'delayed', textCN: '延迟的' },
              { id: 'c21-10-C', text: 'unnecessary', textCN: '不必要的' },
              { id: 'c21-10-D', text: 'random', textCN: '随机的' },
            ],
            correctOptionId: 'c21-10-A',
            explanation:
              '“immediate”意为“立即的”，指无论哪种类型的心绞痛都需紧急就医，呼应前文“可能导致死亡”的严重性，强化及时诊疗的必要性。',
          },
        ],
      },
      {
        id: 'chapter15-cloze8',
        title: '完形填空 22',
        description: '关于噪音污染的经济成本与解决方案的完形填空',
        type: 'cloze',
        questions: [
          {
            id: 'c22-1',
            type: 'cloze',
            text: 'Airports are currently operating at less than (85)_____ because of noise regulations which restrict their hours of operation.',
            textCN: '由于限制运营时间的噪音法规，机场目前的运营低于(85)_____。',
            options: [
              { id: 'c22-1-A', text: 'capacity', textCN: '容量' },
              { id: 'c22-1-B', text: 'expectation', textCN: '期望' },
              { id: 'c22-1-C', text: 'control', textCN: '控制' },
              { id: 'c22-1-D', text: 'profit', textCN: '利润' },
            ],
            correctOptionId: 'c22-1-A',
            explanation:
              '“capacity”意为“容量”，“operating at less than capacity”指未达满负荷运营，与“限制运营时间”形成因果关系，体现噪音对机场效率的影响。',
          },
          {
            id: 'c22-2',
            type: 'cloze',
            text: 'One estimate is that noise (86)_____ reduce possible airport use by 20 percent.',
            textCN: '一项估计显示，噪音(86)_____使机场可用率降低20%。',
            options: [
              { id: 'c22-2-A', text: 'restrictions', textCN: '限制' },
              { id: 'c22-2-B', text: 'pollution', textCN: '污染' },
              { id: 'c22-2-C', text: 'levels', textCN: '水平' },
              { id: 'c22-2-D', text: 'effects', textCN: '影响' },
            ],
            correctOptionId: 'c22-2-A',
            explanation:
              '“restrictions”意为“限制”，呼应前文“noise regulations”，指噪音管控措施直接导致机场使用效率下降，数据化呈现经济损失。',
          },
          {
            id: 'c22-3',
            type: 'cloze',
            text: 'The (87)_____ cargo trade is especially affected by night restrictions.',
            textCN: '利润丰厚的货运贸易尤其受到夜间限制的影响。',
            options: [
              { id: 'c22-3-A', text: 'profitable', textCN: '盈利的' },
              { id: 'c22-3-B', text: 'international', textCN: '国际的' },
              { id: 'c22-3-C', text: 'domestic', textCN: '国内的' },
              { id: 'c22-3-D', text: 'local', textCN: '本地的' },
            ],
            correctOptionId: 'c22-3-A',
            explanation:
              '“profitable”意为“盈利的”，强调货运贸易的经济价值，说明夜间限制对高利润行业的冲击，突出噪音成本的严重性。',
          },
          {
            id: 'c22-4',
            type: 'cloze',
            text: 'In the case of airports, jet engines may be (88)_____ to reduce their noise level...',
            textCN: '就机场而言，喷气发动机可通过(88)_____来降低噪音水平...',
            options: [
              { id: 'c22-4-A', text: 'modified', textCN: '改造' },
              { id: 'c22-4-B', text: 'replaced', textCN: '替换' },
              { id: 'c22-4-C', text: 'abandoned', textCN: '废弃' },
              { id: 'c22-4-D', text: 'ignored', textCN: '忽视' },
            ],
            correctOptionId: 'c22-4-A',
            explanation:
              '“modified”意为“改造”，指对发动机进行技术改良以降噪，是可行性方案之一，与“安装隔音设备”形成并列解决方案。',
          },
          {
            id: 'c22-5',
            type: 'cloze',
            text: 'One estimate is that ＄5.7 billion would be required to (89)_____ all existing jet engines with noise control devices.',
            textCN:
              '一项估计显示，为所有现有喷气发动机(89)_____噪音控制设备需要57亿美元。',
            options: [
              { id: 'c22-5-A', text: 'equip', textCN: '配备' },
              { id: 'c22-5-B', text: 'remove', textCN: '移除' },
              { id: 'c22-5-C', text: 'sell', textCN: '出售' },
              { id: 'c22-5-D', text: 'design', textCN: '设计' },
            ],
            correctOptionId: 'c22-5-A',
            explanation:
              '“equip”意为“配备”，“equip...with...”为固定搭配，指为发动机安装降噪装置，量化改造成本，体现解决方案的经济投入。',
          },
          {
            id: 'c22-6',
            type: 'cloze',
            text: 'However, (90)_____ the current state of the art, even taking this step will not reduce noise levels at all points to (91)_____ values.',
            textCN:
              '然而，(90)_____当前的技术水平，即使采取这一步骤也无法将所有点的噪音水平降至(91)_____值。',
            options: [
              { id: 'c22-6-A', text: 'considering', textCN: '考虑到' },
              { id: 'c22-6-B', text: 'ignoring', textCN: '忽视' },
              { id: 'c22-6-C', text: 'improving', textCN: '改善' },
              { id: 'c22-6-D', text: 'changing', textCN: '改变' },
            ],
            correctOptionId: 'c22-6-A',
            explanation:
              '“considering”意为“考虑到”，指基于现有技术条件的限制，解释单一方案无法彻底解决问题的原因，体现论述的严谨性。',
          },
          {
            id: 'c22-7',
            type: 'cloze',
            text: 'However, considering the current state of the art, even taking this step will not reduce noise levels at all points to (91)_____ values.',
            textCN:
              '然而，考虑到当前的技术水平，即使采取这一步骤也无法将所有点的噪音水平降至(91)_____值。',
            options: [
              { id: 'c22-7-A', text: 'acceptable', textCN: '可接受的' },
              { id: 'c22-7-B', text: 'dangerous', textCN: '危险的' },
              { id: 'c22-7-C', text: 'unusual', textCN: '不寻常的' },
              { id: 'c22-7-D', text: 'illegal', textCN: '非法的' },
            ],
            correctOptionId: 'c22-7-A',
            explanation:
              '“acceptable”意为“可接受的”，指符合安全或环保标准的噪音值，与“需要多种方法结合”形成因果关系，强调问题的复杂性。',
          },
          {
            id: 'c22-8',
            type: 'cloze',
            text: 'An increase in airport capacity would (92)_____.',
            textCN: '机场容量的增加将会(92)_____。',
            options: [
              { id: 'c22-8-A', text: 'occur', textCN: '发生' },
              { id: 'c22-8-B', text: 'decrease', textCN: '减少' },
              { id: 'c22-8-C', text: 'stop', textCN: '停止' },
              { id: 'c22-8-D', text: 'delay', textCN: '延迟' },
            ],
            correctOptionId: 'c22-8-A',
            explanation:
              '“occur”意为“发生”，指降噪后机场可恢复满负荷运营，与“经济效益”呼应，体现解决方案带来的积极影响。',
          },
          {
            id: 'c22-9',
            type: 'cloze',
            text: 'Much research still needs to be done on the economic (93)_____ of noise reduction and noise effects.',
            textCN: '关于降噪和噪音影响的经济(93)_____仍需大量研究。',
            options: [
              { id: 'c22-9-A', text: 'aspects', textCN: '方面' },
              { id: 'c22-9-B', text: 'problems', textCN: '问题' },
              { id: 'c22-9-C', text: 'solutions', textCN: '解决方案' },
              { id: 'c22-9-D', text: 'benefits', textCN: '益处' },
            ],
            correctOptionId: 'c22-9-A',
            explanation:
              '“aspects”意为“方面”，指噪音经济影响的多个维度，与后文“健康、生产力、财产价值”等具体方面呼应，体现研究的全面性。',
          },
          {
            id: 'c22-10',
            type: 'cloze',
            text: '(94)_____, the cost of noise pollution control to the economy as a whole needs to be investigated.',
            textCN: '(94)_____，还需研究噪音污染控制对整体经济的成本。',
            options: [
              { id: 'c22-10-A', text: 'Furthermore', textCN: '此外' },
              { id: 'c22-10-B', text: 'However', textCN: '然而' },
              { id: 'c22-10-C', text: 'Therefore', textCN: '因此' },
              { id: 'c22-10-D', text: 'Otherwise', textCN: '否则' },
            ],
            correctOptionId: 'c22-10-A',
            explanation:
              '“Furthermore”意为“此外”，用于补充说明另一研究方向，与前文“已知影响”形成并列关系，强调研究的持续性和必要性。',
          },
        ],
      },
      {
        id: 'chapter15-cloze9',
        title: '完形填空 23',
        description: '关于美国婚姻观念与形式的完形填空',
        type: 'cloze',
        questions: [
          {
            id: 'c23-1',
            type: 'cloze',
            text: 'They believe that two people should marry for love, after a period of (95)_____ or courtships.',
            textCN: '他们认为两个人应该为爱而结婚，在一段(95)_____或求爱之后。',
            options: [
              { id: 'c23-1-A', text: 'dating', textCN: '约会' },
              { id: 'c23-1-B', text: 'working', textCN: '工作' },
              { id: 'c23-1-C', text: 'studying', textCN: '学习' },
              { id: 'c23-1-D', text: 'traveling', textCN: '旅行' },
            ],
            correctOptionId: 'c23-1-A',
            explanation:
              '“dating”意为“约会”，与“courtships（求爱）”并列，指婚前了解彼此的过程，符合美国“自由恋爱”的婚姻观念，体现婚姻前的情感培养阶段。',
          },
          {
            id: 'c23-2',
            type: 'cloze',
            text: 'During that period, the (96)_____ marriage partners are supposed to learn enough about each other...',
            textCN: '在那段时间里，(96)_____婚姻伴侣应该充分了解彼此...',
            options: [
              { id: 'c23-2-A', text: 'prospective', textCN: '未来的' },
              { id: 'c23-2-B', text: 'previous', textCN: '以前的' },
              { id: 'c23-2-C', text: 'current', textCN: '当前的' },
              { id: 'c23-2-D', text: 'ideal', textCN: '理想的' },
            ],
            correctOptionId: 'c23-2-A',
            explanation:
              '“prospective”意为“未来的”，指潜在的结婚对象，强调在约会阶段双方尚未结婚但有结婚意向，符合“决定是否建立婚姻”的语境。',
          },
          {
            id: 'c23-3',
            type: 'cloze',
            text: 'decide whether or not they will be able to build a (97)_____ marriage.',
            textCN: '决定他们是否能够建立一个(97)_____的婚姻。',
            options: [
              { id: 'c23-3-A', text: 'successful', textCN: '成功的' },
              { id: 'c23-3-B', text: 'short', textCN: '短暂的' },
              { id: 'c23-3-C', text: 'traditional', textCN: '传统的' },
              { id: 'c23-3-D', text: 'complex', textCN: '复杂的' },
            ],
            correctOptionId: 'c23-3-A',
            explanation:
              '“successful”意为“成功的”，指双方通过了解判断婚姻是否可行，体现“以爱为基础”的婚姻目标，即建立长久美满的关系。',
          },
          {
            id: 'c23-4',
            type: 'cloze',
            text: 'Today in America, it is common for people to live together as a way of (98)_____ for marriages.',
            textCN: '如今在美国，人们通常将同居作为(98)_____婚姻的一种方式。',
            options: [
              { id: 'c23-4-A', text: 'preparing', textCN: '准备' },
              { id: 'c23-4-B', text: 'avoiding', textCN: '避免' },
              { id: 'c23-4-C', text: 'delaying', textCN: '推迟' },
              { id: 'c23-4-D', text: 'ending', textCN: '结束' },
            ],
            correctOptionId: 'c23-4-A',
            explanation:
              '“preparing”意为“准备”，“preparing for marriages”指通过同居提前适应婚姻生活，符合美国现代婚姻观念中“试婚”的普遍现象，体现对婚姻的谨慎态度。',
          },
          {
            id: 'c23-5',
            type: 'cloze',
            text: 'The idea of an arranged marriage seems very (99)_____ indeed.',
            textCN: '包办婚姻的观念确实显得非常(99)_____。',
            options: [
              { id: 'c23-5-A', text: 'old-fashioned', textCN: '过时的' },
              { id: 'c23-5-B', text: 'modern', textCN: '现代的' },
              { id: 'c23-5-C', text: 'popular', textCN: '流行的' },
              { id: 'c23-5-D', text: 'practical', textCN: '实际的' },
            ],
            correctOptionId: 'c23-5-A',
            explanation:
              '“old-fashioned”意为“过时的”，与前文“自由恋爱”“同居试婚”形成对比，体现美国人对包办婚姻的传统认知，认为其不符合现代婚姻价值观。',
          },
          {
            id: 'c23-6',
            type: 'cloze',
            text: 'In the United States marriages are seldom (100)_____ arranged...',
            textCN: '在美国，婚姻很少(100)_____被包办...',
            options: [
              { id: 'c23-6-A', text: 'formally', textCN: '正式地' },
              { id: 'c23-6-B', text: 'secretly', textCN: '秘密地' },
              { id: 'c23-6-C', text: 'illegally', textCN: '非法地' },
              { id: 'c23-6-D', text: 'publicly', textCN: '公开地' },
            ],
            correctOptionId: 'c23-6-A',
            explanation:
              '“formally”意为“正式地”，指美国没有传统意义上的正式包办婚姻，与后文“非正式牵线”形成对比，说明美国婚姻安排的隐蔽性和非制度性。',
          },
          {
            id: 'c23-7',
            type: 'cloze',
            text: 'Because friends have such great influence, their (101)_____ of a dating partner is very important.',
            textCN:
              '因为朋友有如此大的影响力，他们对约会对象的(101)_____非常重要。',
            options: [
              { id: 'c23-7-A', text: 'approval', textCN: '认可' },
              { id: 'c23-7-B', text: 'disapproval', textCN: '不认可' },
              { id: 'c23-7-C', text: 'ignorance', textCN: '忽视' },
              { id: 'c23-7-D', text: 'doubt', textCN: '怀疑' },
            ],
            correctOptionId: 'c23-7-A',
            explanation:
              '“approval”意为“认可”，指朋友对伴侣的正面评价至关重要，呼应前文“朋友介绍对象”的场景，体现社交圈对婚姻的间接影响。',
          },
          {
            id: 'c23-8',
            type: 'cloze',
            text: 'Families also (102)_____ open and subtle pressures on their children to influence their...',
            textCN: '家庭也会对孩子(102)_____公开和微妙的压力来影响他们的...',
            options: [
              { id: 'c23-8-A', text: 'exert', textCN: '施加' },
              { id: 'c23-8-B', text: 'resist', textCN: '抵抗' },
              { id: 'c23-8-C', text: 'reduce', textCN: '减少' },
              { id: 'c23-8-D', text: 'ignore', textCN: '忽视' },
            ],
            correctOptionId: 'c23-8-A',
            explanation:
              '“exert”意为“施加”，“exert pressures”指家庭对子女婚姻施加影响，与“公开和微妙”搭配，说明影响方式的多样性，体现家庭在婚姻中的隐性作用。',
          },
          {
            id: 'c23-9',
            type: 'cloze',
            text: 'Families also exert open and subtle pressures on their children to influence their (103)_____ of marriage partners.',
            textCN:
              '家庭也会对孩子施加公开和微妙的压力来影响他们对婚姻伴侣的(103)_____。',
            options: [
              { id: 'c23-9-A', text: 'choices', textCN: '选择' },
              { id: 'c23-9-B', text: 'problems', textCN: '问题' },
              { id: 'c23-9-C', text: 'stories', textCN: '故事' },
              { id: 'c23-9-D', text: 'dreams', textCN: '梦想' },
            ],
            correctOptionId: 'c23-9-A',
            explanation:
              '“choices”意为“选择”，指家庭影响子女对伴侣的挑选，与“安排约会”“商业关系介绍”等具体行为呼应，体现家庭在婚姻决策中的干预。',
          },
          {
            id: 'c23-10',
            type: 'cloze',
            text: 'Since parents often assist their children (104)_____, they feel that they have the right to help...',
            textCN:
              '由于父母经常在(104)_____上帮助孩子，他们觉得自己有权帮助...',
            options: [
              { id: 'c23-10-A', text: 'financially', textCN: '经济上' },
              { id: 'c23-10-B', text: 'emotionally', textCN: '情感上' },
              { id: 'c23-10-C', text: 'mentally', textCN: '精神上' },
              { id: 'c23-10-D', text: 'legally', textCN: '法律上' },
            ],
            correctOptionId: 'c23-10-A',
            explanation:
              '“financially”意为“经济上”，指父母在物质层面支持子女，与“选择居住地点、购买家具”等具体经济行为对应，说明经济支持与家庭干预的因果关系。',
          },
        ],
      },
    ],
  },
  {
    id: 'chapter8',
    title: '第8套题',
    description: '包含阅读理解和完形填空',
    questionSets: [
      {
        id: 'chapter1-reading2',
        title: '阅读理解 2',
        description: '关于麦当劳面临的身份危机及应对措施的阅读理解',
        type: 'reading',
        article: {
          id: 'article2',
          title: "McDonald's Identity Crisis",
          titleCN: '麦当劳的身份危机',
          content: `McDonalds is having a bit of an identity crisis. Recently, the burger giant announced a 5. 2% drop in profits for the first three months of this year and a 1.7% decrease in same store sales in the US. President and CEO Don Thompson emphasized that MacDonald’s would be focusing on its core products, like its Big Mac, Egg McMuffin, and its famous French fries.
    
    Thompsons back-to-basics vow comes in response to the sort of menu creep the chain experienced last year, when it rolled out a seemingly endless stream of limited time offers, like its Mighty Wings, a steak and egg burrito(蛋卷饼), a steak breakfast sandwich and so on.
    
    It's vital that McDonald’s craft a consistent message, so customers’ expectations are met when they choose to eat there. When MacDonald’s first got off the ground in the 1940s, it had a nine-item menu made up of hamburger, cheeseburger, soft drinks, milk, coffee, potato chips, and a slice of pie. It built its iconic (标志性的) reputation on guaranteeing that these food and beverage items would have the same great taste no matter the MacDonald’s location at which they were served.
    
    Just as crucial, too much menu diversification, which McDonald’s has suffered from lately, leads to longer customer wait times in an industry built on speed.
    
    “What McDonald’s workers do inside those four walls is really impressive. Everyone has their time and place, and their entire job is done in two or three steps,” says Howard Penney, managing director at Hedgeye Risk Management. Adding more processes that come with a bigger menu, specifically the smoothie (奶昔) and espresso machines, has disrupted McDonald’s restaurants’ time and motion, he says. It takes a lot longer to make a smoothie than it does to pour a fountain Coke.
    
    "Everything they’ve done to become all things to all people has slowed service," Penney says
    
    Going back to its roots could be just what McDonald’s needs. After all, it seems like a long shot for the fast food giant to become the next Chipotle or Panera since, as Penney puts it, “the core McDonald’s customer is not looking for a wrap with a cucumber in it”.`,
          contentCN: `麦当劳正面临着一点身份危机。最近，这家汉堡巨头宣布今年前三个月利润下降5.2%，美国同店销售额下降1.7%。总裁兼首席执行官唐·汤普森强调，麦当劳将专注于其核心产品，如巨无霸、麦满分和著名的薯条。
    
    汤普森回归基础的誓言是对该连锁店去年经历的菜单扩张的回应，当时它推出了一系列似乎无穷无尽的限时优惠，比如麦辣鸡翅、牛排蛋卷饼、牛排早餐三明治等等。
    
    麦当劳打造一个一致的形象至关重要，这样当顾客选择在那里用餐时，他们的期望就能得到满足。20世纪40年代麦当劳刚起步时，它有一份九项的菜单，包括汉堡、芝士汉堡、软饮料、牛奶、咖啡、薯片和一片派。它通过保证无论在哪个麦当劳门店供应，这些食品和饮料都能有同样出色的味道，建立了其标志性的声誉。
    
    同样关键的是，麦当劳最近遭受的菜单过度多样化，在这个以速度为基础的行业中导致顾客等待时间更长。
    
    “麦当劳员工在店内的工作真的令人印象深刻。每个人都有自己的时间和位置，他们的整个工作只需两三个步骤就能完成，”Hedgeye风险管理公司的董事总经理霍华德·彭尼说。他说，增加更多与更大菜单相关的流程，特别是奶昔和意式浓缩咖啡机，打乱了麦当劳餐厅的时间和流程。制作一杯奶昔比倒一杯汽水要花费长得多的时间。
    
    “他们为满足所有人的需求所做的一切都减缓了服务速度，”彭尼说。
    
    回归本源可能正是麦当劳所需要的。毕竟，对于这家快餐巨头来说，要成为下一个Chipotle或Panera似乎希望渺茫，因为正如彭尼所说，“麦当劳的核心顾客并不想要里面有黄瓜的卷饼”。`,
        },
        questions: [
          {
            id: 'q2-1',
            type: 'reading',
            text: 'How will McDonald’s deal with the identity crisis it is facing?',
            textCN: '麦当劳将如何应对它所面临的身份危机？',
            options: [
              {
                id: 'q2-1-A',
                text: 'Stop offering new products for good',
                textCN: '永远停止提供新产品',
              },
              {
                id: 'q2-1-B',
                text: 'Go back to its main products',
                textCN: '回归其主要产品',
              },
              {
                id: 'q2-1-C',
                text: 'Work hard to make more profit.',
                textCN: '努力赚取更多利润。',
              },
              {
                id: 'q2-1-D',
                text: 'Promote its sales in the U.S',
                textCN: '促进其在美国的销售',
              },
            ],
            correctOptionId: 'q2-1-B',
            explanation:
              '文中提到总裁兼首席执行官唐·汤普森强调麦当劳将专注于其核心产品，即回归主要产品来应对危机。',
          },
          {
            id: 'q2-2',
            type: 'reading',
            text: 'What did McDonald’s do last year?',
            textCN: '麦当劳去年做了什么？',
            options: [
              {
                id: 'q2-2-A',
                text: 'It offered too many limited time items',
                textCN: '它提供了太多限时商品',
              },
              {
                id: 'q2-2-B',
                text: 'It limited its offers to some extent',
                textCN: '它在一定程度上限制了其优惠',
              },
              {
                id: 'q2-2-C',
                text: 'It adjusted the prices of many products',
                textCN: '它调整了许多产品的价格',
              },
              {
                id: 'q2-2-D',
                text: 'It barely diversified its menu',
                textCN: '它几乎没有使菜单多样化',
              },
            ],
            correctOptionId: 'q2-2-A',
            explanation:
              '文中提到汤普森回归基础的誓言是对去年菜单扩张的回应，当时推出了一系列似乎无穷无尽的限时优惠。',
          },
          {
            id: 'q2-3',
            type: 'reading',
            text: 'What was the result of McDonald’s menu diversification?',
            textCN: '麦当劳菜单多样化的结果是什么？',
            options: [
              {
                id: 'q2-3-A',
                text: 'McDonald’s made much profit from it.',
                textCN: '麦当劳从中获得了很多利润。',
              },
              {
                id: 'q2-3-B',
                text: "McDonald’s service couldn't be improved",
                textCN: '麦当劳的服务无法得到改善',
              },
              {
                id: 'q2-3-C',
                text: "Customers' expectations got met",
                textCN: '顾客的期望得到了满足',
              },
              {
                id: 'q2-3-D',
                text: 'Customers had to wait a longer time',
                textCN: '顾客不得不等待更长时间',
              },
            ],
            correctOptionId: 'q2-3-D',
            explanation: '文中提到太多菜单多样化导致顾客等待时间更长。',
          },
          {
            id: 'q2-4',
            type: 'reading',
            text: 'What slowed McDonald’s service according to Penney?',
            textCN: '根据彭尼的说法，是什么减缓了麦当劳的服务速度？',
            options: [
              {
                id: 'q2-4-A',
                text: "It wrongly tried to meet all people's needs",
                textCN: '它错误地试图满足所有人的需求',
              },
              {
                id: 'q2-4-B',
                text: 'It offered smoothie and espresso',
                textCN: '它提供了奶昔和意式浓缩咖啡',
              },
              {
                id: 'q2-4-C',
                text: 'Its employees worked less hard',
                textCN: '它的员工工作不那么努力',
              },
              {
                id: 'q2-4-D',
                text: 'It had much more customers',
                textCN: '它有更多的顾客',
              },
            ],
            correctOptionId: 'q2-4-A',
            explanation:
              '彭尼说他们为满足所有人的需求所做的一切都减缓了服务速度。',
          },
          {
            id: 'q2-5',
            type: 'reading',
            text: 'What can be inferred from the last paragraph?',
            textCN: '从最后一段可以推断出什么？',
            options: [
              {
                id: 'q2-5-A',
                text: 'McDonald’s can learn from Chipotle or Panera.',
                textCN: '麦当劳可以向Chipotle或Panera学习。',
              },
              {
                id: 'q2-5-B',
                text: 'McDonald’s will become the next Chipotle one day.',
                textCN: '麦当劳总有一天会成为下一个Chipotle。',
              },
              {
                id: 'q2-5-C',
                text: 'McDonald’s should always be what it was at first.',
                textCN: '麦当劳应该一直保持它最初的样子。',
              },
              {
                id: 'q2-5-D',
                text: 'McDonald’s does not need product innovation.',
                textCN: '麦当劳不需要产品创新。',
              },
            ],
            correctOptionId: 'q2-5-C',
            explanation:
              '最后一段提到回归本源可能正是麦当劳所需要的，暗示麦当劳应该保持最初的样子。',
          },
        ],
      },
      {
        id: 'chapter1-reading1',
        title: '阅读理解 1',
        description: '关于猫对物理和因果关系理解的阅读理解',
        type: 'reading',
        article: {
          id: 'article1',
          title: "Cats' Understanding of Physics and Cause and Effect",
          titleCN: '猫对物理和因果关系的理解',
          content: `The latest in cat research reveals that the lovely animal seems to have a basic grasp on both the laws of physics and the ins and outs of cause and effect.
    　　According to a newly published study, cats seem to be able to predict the location of hiding prey（猎物） using both their ears and an inborn （天生的） understanding of how the physical world works.
    　　It turns out that the cats were remarkably smart about what would happen when a container was tipped over. When an object did not drop out of the bottom of a rattling container, they looked at it for a longer time than they did when the container behaved as expected.
    　　"Cats use a causal-logical understanding of noise or sounds to predict the appearance of invisible objects," lead researcher Saho Takagi says in a press release. The researchers conclude that cats hunting style may have developed based on their common-sense abilities to infer where prey is, using their hearing.
    　　Scientists have explored this idea with other endearing creatures: babies. Like cats, babies appear to engage in what's called "preferential looking"—looking longer at things that are interesting or unusual than things they perceive as normal.
    　　When babies' expectations are violated in experiments like the ones performed with the cats, they react much like their animal friends. Psychologists have shown that babies apparently expect their world to comply with the laws of physics and cause and effect as early as two months of age.
    　　Does the study mean that cats will soon grasp the ins and outs of cause and effect? Maybe. Okay, so cats may not be the next physics faculty members at America's most important research universities. But by demonstrating their common sense, they've shown that the divide between cats and humans may not be that great after all.`,
          contentCN: `最新的猫研究表明，这种可爱的动物似乎对物理定律和因果关系的来龙去脉都有基本的理解。
    　　根据一项新发表的研究，猫似乎能够利用它们的耳朵和对物理世界运作方式的天生理解来预测隐藏猎物的位置。
    　　事实证明，当一个容器被打翻时，猫对会发生什么非常聪明。当一个物体没有从一个摇晃的容器底部掉出来时，它们会比容器按预期行事时看它更长时间。
    　　“猫利用对噪音或声音的因果逻辑理解来预测无形物体的出现，”首席研究员高木佐保在一份新闻稿中说。研究人员得出结论，猫的捕猎方式可能是基于它们利用听觉推断猎物位置的常识能力发展而来的。
    　　科学家们用其他可爱的生物——婴儿——探索了这个想法。和猫一样，婴儿似乎也会进行所谓的“偏好注视”——比起他们认为正常的事物，他们会更长时间地注视有趣或不寻常的事物。
    　　当婴儿的期望在像对猫进行的实验中被违背时，他们的反应与他们的动物朋友非常相似。心理学家已经表明，婴儿早在两个月大的时候就显然期望他们的世界符合物理定律和因果关系。
    　　这项研究是否意味着猫很快就会掌握因果关系的来龙去脉？也许吧。好吧，所以猫可能不会成为美国最重要的研究型大学的下一批物理教员。但是通过展示它们的常识，它们表明猫和人类之间的差距可能并没有那么大。`,
        },
        questions: [
          {
            id: 'q1-1',
            type: 'reading',
            text: 'What do we learn from a newly published study about cats?',
            textCN: '我们从一项新发表的关于猫的研究中学到了什么？',
            options: [
              {
                id: 'q1-1-A',
                text: 'They can be trained to understand the physical world.',
                textCN: '它们可以被训练来理解物理世界。',
              },
              {
                id: 'q1-1-B',
                text: 'They know what kind of prey might be easier to hunt.',
                textCN: '它们知道哪种猎物可能更容易捕猎。',
              },
              {
                id: 'q1-1-C',
                text: 'They have a natural ability to locate animals they hunt.',
                textCN: '它们有一种天生的能力来定位它们捕猎的动物。',
              },
              {
                id: 'q1-1-D',
                text: 'They are capable of telling which way their prey flees.',
                textCN: '它们能够分辨出它们的猎物往哪个方向逃跑。',
              },
            ],
            correctOptionId: 'q1-1-C',
            explanation:
              '根据文章内容‘According to a newly published study, cats seem to be able to predict the location of hiding prey（猎物） using both their ears and an inborn （天生的） understanding of how the physical world works.’可知，猫有天生的能力来定位它们捕猎的动物。',
          },
          {
            id: 'q1-2',
            type: 'reading',
            text: "What may account for the cats' response to the noise from the containers?",
            textCN: '什么可以解释猫对容器发出的噪音的反应？',
            options: [
              {
                id: 'q1-2-A',
                text: 'Their inborn sensitivity to noise.',
                textCN: '它们对噪音的天生敏感性。',
              },
              {
                id: 'q1-2-B',
                text: 'Their unusual sense of direction.',
                textCN: '它们不寻常的方向感。',
              },
              {
                id: 'q1-2-C',
                text: 'Their special ability to perceive.',
                textCN: '它们特殊的感知能力。',
              },
              {
                id: 'q1-2-D',
                text: 'Their mastery of cause and effect.',
                textCN: '它们对因果关系的掌握。',
              },
            ],
            correctOptionId: 'q1-2-D',
            explanation:
              '由文中‘Cats use a causal-logical understanding of noise or sounds to predict the appearance of invisible objects’可知，猫对因果关系的掌握可以解释它们对容器噪音的反应。',
          },
          {
            id: 'q1-3',
            type: 'reading',
            text: 'What is characteristic of the way cats hunt, according to the Japanese researchers?',
            textCN: '根据日本研究人员的说法，猫的捕猎方式有什么特点？',
            options: [
              {
                id: 'q1-3-A',
                text: 'They depend on their instincts.',
                textCN: '它们依靠本能。',
              },
              {
                id: 'q1-3-B',
                text: 'They rely mainly on their hearing.',
                textCN: '它们主要依靠听觉。',
              },
              {
                id: 'q1-3-C',
                text: 'They wait some time before attack.',
                textCN: '它们在攻击前会等待一段时间。',
              },
              {
                id: 'q1-3-D',
                text: 'They use both their ears and eyes.',
                textCN: '它们同时使用耳朵和眼睛。',
              },
            ],
            correctOptionId: 'q1-3-B',
            explanation:
              '文中提到‘The researchers conclude that cats hunting style may have developed based on their common-sense abilities to infer where prey is, using their hearing.’，说明猫主要依靠听觉捕猎。',
          },
          {
            id: 'q1-4',
            type: 'reading',
            text: 'In what way do babies behave like cats?',
            textCN: '婴儿在哪些方面表现得像猫？',
            options: [
              {
                id: 'q1-4-A',
                text: 'They focus on what appears odd.',
                textCN: '他们关注看起来奇怪的事物。',
              },
              {
                id: 'q1-4-B',
                text: 'They view the world as normal.',
                textCN: '他们认为世界是正常的。',
              },
              {
                id: 'q1-4-C',
                text: 'They do what they prefer to do.',
                textCN: '他们做自己喜欢做的事。',
              },
              {
                id: 'q1-4-D',
                text: 'They are curious about everything.',
                textCN: '他们对一切都好奇。',
              },
            ],
            correctOptionId: 'q1-4-A',
            explanation: `从文中‘Like cats, babies appear to engage in what's called "preferential looking"—looking longer at things that are interesting or unusual than things they perceive as normal.’可知，婴儿和猫一样关注看起来奇怪的事物。`,
          },
          {
            id: 'q1-5',
            type: 'reading',
            text: 'What can we conclude about cats from the passage?',
            textCN: '从文章中我们可以得出关于猫的什么结论？',
            options: [
              {
                id: 'q1-5-A',
                text: 'They have higher intelligence than many other animals.',
                textCN: '它们比许多其他动物更聪明。',
              },
              {
                id: 'q1-5-B',
                text: 'They interact with the physical world much like humans.',
                textCN: '它们与物理世界的互动方式很像人类。',
              },
              {
                id: 'q1-5-C',
                text: 'They display extraordinarily high intelligence in hunting.',
                textCN: '它们在捕猎中表现出极高的智力。',
              },
              {
                id: 'q1-5-D',
                text: 'They can aid physics professors in their research work.',
                textCN: '它们可以帮助物理教授进行研究工作。',
              },
            ],
            correctOptionId: 'q1-5-B',
            explanation:
              "文章最后提到‘But by demonstrating their common sense, they've shown that the divide between cats and humans may not be that great after all.’，说明猫与物理世界的互动方式和人类很像。",
          },
        ],
      },
      {
        id: 'chapter1-reading1',
        title: '阅读理解 1',
        description: '关于世界水监测日节水建议的阅读理解',
        type: 'reading',
        article: {
          id: 'article1',
          title: 'World Water Monitoring Day',
          titleCN: '世界水监测日',
          content: `September 18th is World Water Monitoring Day, and American Leak Detection is offering some helpful tips and advice for people in recognition of the international awareness campaign.
    　　"Your small investment of monitoring the water you consume can bring large profits. For example, buying a low-flush toilet can save over 18,000 gallons of water a year. It takes all of us—both individuals and businesses—to save the earth's resources," said Stan Berenbaum, president of American Leak Detection. Berenbaum recommends the following advice:
    In General
    　　Check all taps for drips. If a drip fills an 8-ounce glass every 15 minutes, it will lose about 180 gallons per month. That's equivalent to 2,160 gallons a year, enough for more than 30 showers or baths, Berenbaum said. Drips can usually be fixed by replacing inexpensive washers or valve (插板阀) seats.
    　　Install flow restrictors or other conservation devices on all taps. With these in the shower alone, you can cut your water use from about 5 to 10 gallons per minute to as low as 1.4 to 3 gallons per minute.
    　　Wrap exposed indoor and outdoor pipes to prevent breakage (破裂) in freezing weather.
    In the Kitchen
    　　Check kitchen cupboards beneath the sink once a week for wet spots.
    　　Keep drinking water in the refrigerator so you don't have to run the tap until the water gets cold enough to drink.
    　　Only run full loads in your dishwasher.
    In the Bathroom
    　　Check toilets for leaks. Drop a teaspoon of food coloring into the tank. If the color appears in the bowl after 15 minutes, have the "flapper" valve replaced.
    　　Replace older toilets with new ultra-low flush models or put water displacement devices inside every toilet tank. Make them from plastic water bottles weighted down with pebbles. Do not put bricks in your tank; they can dissolve and block siphon jets (虹吸装置).`,
          contentCN: `9月18日是世界水监测日，美国检漏公司为响应这一国际宣传活动，为人们提供了一些有用的提示和建议。
    　　“你对所用水进行监测的小投资能带来大收益。例如，购买一个节水马桶每年可节省超过18000加仑的水。拯救地球资源需要我们所有人——个人和企业共同努力，”美国检漏公司总裁斯坦·贝伦鲍姆说。贝伦鲍姆推荐了以下建议：
    一般情况
    　　检查所有水龙头是否滴水。如果一滴水每15分钟能装满一个8盎司的杯子，那么每月大约会流失180加仑水。贝伦鲍姆说，这相当于每年2160加仑，足够洗30多次淋浴或盆浴。通常更换便宜的垫圈或插板阀座就能解决滴水问题。
    　　在所有水龙头上安装限流装置或其他节水装置。仅在淋浴喷头处安装这些装置，你就能将每分钟的用水量从约5至10加仑减少到低至1.4至3加仑。
    　　包裹室内外暴露的管道，以防在寒冷天气破裂。
    在厨房
    　　每周检查一次水槽下方的厨房橱柜是否有湿斑。
    　　把饮用水放在冰箱里，这样你就不用一直开着水龙头直到水凉到可以饮用。
    　　洗碗机只清洗满载的餐具。
    在浴室
    　　检查马桶是否漏水。往水箱里滴一茶匙食用色素。如果15分钟后颜色出现在马桶盆里，就更换“挡板”阀。
    　　用新的超低冲水型号替换旧马桶，或者在每个马桶水箱里放置排水装置。用装满鹅卵石的塑料水瓶制作排水装置。不要在水箱里放砖块；它们会溶解并堵塞虹吸装置。`,
        },
        questions: [
          {
            id: 'q1-1',
            type: 'reading',
            text: 'What is American Leak Detection doing on the World Water Monitoring Day?',
            textCN: '世界水监测日当天美国检漏公司在做什么？',
            options: [
              {
                id: 'q1-1-A',
                text: 'Recognizing the international awareness campaign.',
                textCN: '响应国际宣传活动。',
              },
              {
                id: 'q1-1-B',
                text: 'Investing a small amount of money on low-flush toilets.',
                textCN: '在节水马桶上进行少量投资。',
              },
              {
                id: 'q1-1-C',
                text: 'Saving resources by keeping water from leaking.',
                textCN: '通过防止漏水来节约资源。',
              },
              {
                id: 'q1-1-D',
                text: 'Offering some helpful tips and advice for people.',
                textCN: '为人们提供一些有用的提示和建议。',
              },
            ],
            correctOptionId: 'q1-1-D',
            explanation:
              '文章第一句提到‘September 18th is World Water Monitoring Day, and American Leak Detection is offering some helpful tips and advice for people in recognition of the international awareness campaign.’，说明美国检漏公司在世界水监测日为人们提供有用的提示和建议。',
          },
          {
            id: 'q1-2',
            type: 'reading',
            text: 'What is the likely profit of buying a low-flush toilet?',
            textCN: '购买节水马桶可能的收益是什么？',
            options: [
              {
                id: 'q1-2-A',
                text: 'About 2,160 gallons of water will be saved a year.',
                textCN: '每年大约能节省2160加仑水。',
              },
              {
                id: 'q1-2-B',
                text: 'Over 18,000 gallons of water will be saved a year.',
                textCN: '每年能节省超过18000加仑水。',
              },
              {
                id: 'q1-2-C',
                text: '5 to 10 gallons of water will be saved per minute.',
                textCN: '每分钟能节省5至10加仑水。',
              },
              {
                id: 'q1-2-D',
                text: 'About 180 gallons of water will be saved per month.',
                textCN: '每月大约能节省180加仑水。',
              },
            ],
            correctOptionId: 'q1-2-B',
            explanation:
              '文中提到‘buying a low-flush toilet can save over 18,000 gallons of water a year.’，所以购买节水马桶每年能节省超过18000加仑水。',
          },
          {
            id: 'q1-3',
            type: 'reading',
            text: 'What can be done about tap dripping?',
            textCN: '水龙头滴水可以怎么做？',
            options: [
              {
                id: 'q1-3-A',
                text: 'Installing flow restrictors or other conservation devices.',
                textCN: '安装限流装置或其他节水装置。',
              },
              {
                id: 'q1-3-B',
                text: 'Checking kitchen cupboards beneath the sink every day.',
                textCN: '每天检查水槽下方的厨房橱柜。',
              },
              {
                id: 'q1-3-C',
                text: 'Replacing inexpensive washers or valve seats.',
                textCN: '更换便宜的垫圈或插板阀座。',
              },
              {
                id: 'q1-3-D',
                text: 'Dropping a teaspoon of food coloring into the tank.',
                textCN: '往水箱里滴一茶匙食用色素。',
              },
            ],
            correctOptionId: 'q1-3-C',
            explanation:
              '文中提到‘Drips can usually be fixed by replacing inexpensive washers or valve seats.’，即水龙头滴水通常更换便宜的垫圈或插板阀座就能解决。',
          },
          {
            id: 'q1-4',
            type: 'reading',
            text: 'What is the purpose of wrapping exposed indoor and outdoor pipes?',
            textCN: '包裹室内外暴露管道的目的是什么？',
            options: [
              {
                id: 'q1-4-A',
                text: 'Preventing the pipes from breaking in winter.',
                textCN: '防止管道在冬天破裂。',
              },
              {
                id: 'q1-4-B',
                text: 'Preventing the pipes from leaking in winter.',
                textCN: '防止管道在冬天漏水。',
              },
              {
                id: 'q1-4-C',
                text: 'Keeping the water in the pipes warm in winter.',
                textCN: '冬天保持管道里的水温暖。',
              },
              {
                id: 'q1-4-D',
                text: 'Reducing the amount of water used in winter.',
                textCN: '减少冬天的用水量。',
              },
            ],
            correctOptionId: 'q1-4-A',
            explanation:
              '文中提到‘Wrap exposed indoor and outdoor pipes to prevent breakage in freezing weather.’，说明包裹管道是为了防止在寒冷天气破裂。',
          },
          {
            id: 'q1-5',
            type: 'reading',
            text: 'What can be inferred about the drinking water in the kitchen?',
            textCN: '关于厨房的饮用水可以推断出什么？',
            options: [
              {
                id: 'q1-5-A',
                text: 'It is as cold as water from a refrigerator.',
                textCN: '它和冰箱里的水一样冷。',
              },
              {
                id: 'q1-5-B',
                text: 'It becomes colder after running a little while.',
                textCN: '流一会儿后会变冷。',
              },
              {
                id: 'q1-5-C',
                text: 'It becomes warmer after running a little while.',
                textCN: '流一会儿后会变暖。',
              },
              {
                id: 'q1-5-D',
                text: 'Its temperature is constant all the time.',
                textCN: '它的温度一直恒定。',
              },
            ],
            correctOptionId: 'q1-5-B',
            explanation:
              "文中提到‘Keep drinking water in the refrigerator so you don't have to run the tap until the water gets cold enough to drink.’，由此可推断厨房的饮用水流一会儿后会变冷。",
          },
        ],
      },
      {
        id: 'chapter1-reading1',
        title: '阅读理解 1',
        description: '关于美国梦及大学教育在实现成功中作用的阅读理解',
        type: 'reading',
        article: {
          id: 'article1',
          title: 'The American Dream and College Education',
          titleCN: '美国梦与大学教育',
          content: `For the past several decades, it seems there's been a general consensus on how to get ahead in America: Get a college education, find a reliable job, and buy your own home. But do Americans still believe in that path, and if they do, is it attainable?
    　　The most recent National Journal poll asked respondents about the American dream, what it takes to achieve their goals, and whether or not they felt a significant amount of control over their ability to be successful. Overwhelmingly, the results show that today, the idea of the American dream—and what it takes to achieve it—looks quite different than it did in the late 20th century.
    　　By and large, people felt that their actions and hard work—not outside forces—were the deciding factor in how their lives turned out. But respondents had decidedly mixed feelings about what actions make for a better life in the current economy.
    　　In the last seven years, Americans have grown more pessimistic about the power of education to lead to success. Even though they see going to college as a fairly achievable goal, a majority—52 percent—think that young people do not need a four-year college education in order to be successful.
    　　Miguel Maeda, 42, who has a master's degree and works in public health, was the first in his family to go to college, which has allowed him to achieve a sense of financial stability his parents and grandparents never did.
    　　While some, like Maeda, emphasized the value of the degree rather than the education itself, others still see college as a way to gain new perspectives and life experiences.
    　　Sixty-year-old Will Fendley, who had a successful career in the military and never earned a college degree, thinks "personal drive" is far more important than just going to college. To Fendley, a sense of drive and purpose, as well as an effective high-school education, and basic life skills, like balancing a checkbook, are the necessary ingredients for a successful life in America.`,
          contentCN: `在过去的几十年里，似乎对于如何在美国取得成功已经有了一个普遍的共识：接受大学教育，找到一份可靠的工作，然后买自己的房子。但是美国人仍然相信这条道路吗？如果他们相信，这条道路可行吗？
    　　最近的《国家杂志》民意调查询问了受访者关于美国梦、实现目标需要什么以及他们是否觉得自己对成功的能力有很大的掌控力。绝大多数结果表明，如今美国梦的概念以及实现它所需的条件与20世纪末大不相同。
    　　总的来说，人们觉得他们的行动和努力——而不是外部力量——是他们生活结果的决定性因素。但对于在当前经济中哪些行动能带来更好的生活，受访者的看法明显不一。
    　　在过去七年里，美国人对教育能带来成功的力量变得更加悲观。尽管他们认为上大学是一个相当可以实现的目标，但大多数人——52%——认为年轻人不需要四年制大学教育就能成功。
    　　42岁的米格尔·前田拥有硕士学位，从事公共卫生工作，他是家里第一个上大学的人，这让他获得了一种他的父母和祖父母从未有过的经济稳定感。
    　　虽然有些人，如前田，强调学位的价值而不是教育本身，但其他人仍然认为大学是获得新观点和生活经历的一种方式。
    　　60岁的威尔·芬德利在军队中有着成功的职业生涯，但从未获得过大学学位，他认为“个人动力”远比仅仅上大学重要。对芬德利来说，动力和目标感，以及有效的高中教育和基本生活技能，如平衡支票簿，是在美国成功生活的必要要素。`,
        },
        questions: [
          {
            id: 'q1-1',
            type: 'reading',
            text: 'It used to be commonly acknowledged that to succeed in America, one had to have__________.',
            textCN:
              '过去人们普遍认为，要在美国取得成功，一个人必须拥有__________。',
            options: [
              {
                id: 'q1-1-A',
                text: 'an advanced academic degree',
                textCN: '一个高等学位',
              },
              {
                id: 'q1-1-B',
                text: 'an ambition to get ahead',
                textCN: '出人头地的野心',
              },
              {
                id: 'q1-1-C',
                text: 'a firm belief in their dream',
                textCN: '对自己梦想的坚定信念',
              },
              {
                id: 'q1-1-D',
                text: 'a sense of drive and purpose',
                textCN: '动力和目标感',
              },
            ],
            correctOptionId: 'q1-1-A',
            explanation:
              "文章开头提到For the past several decades, it seems there's been a general consensus on how to get ahead in America: Get a college education, find a reliable job, and buy your own home.说明过去人们认为在美国成功要接受大学教育，即有高等学位。",
          },
          {
            id: 'q1-2',
            type: 'reading',
            text: 'What is the finding of the latest National Journal poll concerning the American dream?',
            textCN: '关于美国梦，最新的《国家杂志》民意调查结果是什么？',
            options: [
              {
                id: 'q1-2-A',
                text: 'More and more Americans are finding it hard to realize.',
                textCN: '越来越多的美国人发现很难实现它。',
              },
              {
                id: 'q1-2-B',
                text: 'It remains alive among the majority of American people.',
                textCN: '它在美国大多数人中仍然存在。',
              },
              {
                id: 'q1-2-C',
                text: "Americans' idea of it has changed over the past few decades.",
                textCN: '在过去几十年里，美国人对它的看法已经改变。',
              },
              {
                id: 'q1-2-D',
                text: 'An increasing number of young Americans are abandoning it.',
                textCN: '越来越多的美国年轻人正在抛弃它。',
              },
            ],
            correctOptionId: 'q1-2-C',
            explanation:
              '根据文章The most recent National Journal poll asked respondents about the American dream...Overwhelmingly, the results show that today, the idea of the American dream—and what it takes to achieve it—looks quite different than it did in the late 20th century.可知美国人对美国梦的看法在过去几十年改变了。',
          },
          {
            id: 'q1-3',
            type: 'reading',
            text: 'What do Americans now think of the role of college education in achieving success?',
            textCN: '美国人现在如何看待大学教育在实现成功中的作用？',
            options: [
              {
                id: 'q1-3-A',
                text: 'It still remains open to debate.',
                textCN: '它仍然有待辩论。',
              },
              {
                id: 'q1-3-B',
                text: 'It has proved to be beyond doubt.',
                textCN: '它已被证明是毫无疑问的。',
              },
              {
                id: 'q1-3-C',
                text: 'It is no longer as important as it used to be.',
                textCN: '它不再像过去那么重要了。',
              },
              {
                id: 'q1-3-D',
                text: 'It is much better understood now than ever.',
                textCN: '现在比以往任何时候都更能被理解。',
              },
            ],
            correctOptionId: 'q1-3-C',
            explanation:
              '由In the last seven years, Americans have grown more pessimistic about the power of education to lead to success. Even though they see going to college as a fairly achievable goal, a majority—52 percent—think that young people do not need a four-year college education in order to be successful.可知美国人认为大学教育在实现成功中不再像过去那么重要了。',
          },
          {
            id: 'q1-4',
            type: 'reading',
            text: 'How do some people view college education these days?',
            textCN: '现在有些人如何看待大学教育？',
            options: [
              {
                id: 'q1-4-A',
                text: 'It promotes gender equality.',
                textCN: '它促进性别平等。',
              },
              {
                id: 'q1-4-B',
                text: 'It needs to be strengthened.',
                textCN: '它需要被加强。',
              },
              {
                id: 'q1-4-C',
                text: 'It adds to cultural diversity.',
                textCN: '它增加了文化多样性。',
              },
              {
                id: 'q1-4-D',
                text: 'It helps broaden their minds.',
                textCN: '它有助于拓宽他们的视野。',
              },
            ],
            correctOptionId: 'q1-4-D',
            explanation:
              '根据文章While some, like Maeda, emphasized the value of the degree rather than the education itself, others still see college as a way to gain new perspectives and life experiences.可知有些人认为大学教育有助于拓宽视野。',
          },
          {
            id: 'q1-5',
            type: 'reading',
            text: 'What is one factor essential to success in America, according to Will Fendley?',
            textCN:
              '根据威尔·芬德利的说法，在美国取得成功的一个关键因素是什么？',
            options: [
              {
                id: 'q1-5-A',
                text: 'A desire to learn and to adapt.',
                textCN: '学习和适应的愿望。',
              },
              {
                id: 'q1-5-B',
                text: 'A strong sense of responsibility.',
                textCN: '强烈的责任感。',
              },
              {
                id: 'q1-5-C',
                text: 'A willingness to commit oneself.',
                textCN: '愿意奉献自己。',
              },
              {
                id: 'q1-5-D',
                text: 'A clear aim and high motivation.',
                textCN: '明确的目标和高度的动力。',
              },
            ],
            correctOptionId: 'q1-5-D',
            explanation:
              '由To Fendley, a sense of drive and purpose, as well as an effective high-school education, and basic life skills, like balancing a checkbook, are the necessary ingredients for a successful life in America.可知威尔·芬德利认为明确的目标和高度的动力是成功的关键因素之一。',
          },
        ],
      },
      {
        id: 'chapter1-reading1',
        title: '阅读理解 1',
        description: '关于年轻人政治参与的阅读理解',
        type: 'reading',
        article: {
          id: 'article1',
          title: "Young People's Political Engagement",
          titleCN: '年轻人的政治参与',
          content: `A new study from the Center for Information and Research on Civic Learning and Engagement (CIRCLE) at Tufts University shows that today's youth vote in larger numbers than previous generations, and a 2008 study from the Center for American Progress adds that increasing numbers of young voters and activists support traditionally liberal causes. But there's no easy way to see what those figures mean in real life. During the presidential campaign, Barack Obama assembled a racially and ideologically diverse coalition with his message of hope and change; as the reality of life under a new administration settles in, some of those supporters might become disillusioned. As the nation moves further into the Obama presidency, will politically engaged young people continue to support the president and his agenda, or will they gradually drift away?
    
    The writers of Generation O (short for Obama), a new Newsweek blog that seeks to chronicle the lives of a group of young Obama supporters, want to answer that question. For the next three months, Michelle Kremer and 11 other Obama supporters, ages 19 to 34, will blog about life across mainstream America, with one twist: by tying all of their ideas and experiences to the new president and his administration, the bloggers will try to start a conversation about what it means to be young and politically active in America today. Malena Amusa, a 24-year-old writer and dancer from St. Louis sees the project as a way to preserve history as it happens. Amusa, who is traveling to India this spring to finish a book, then to Senegal to teach English, has ongoing conversations with her friends about how the Obama presidency has changed their daily lives and hopes to put some of those ideas, along with her global perspective, into her posts. She's excited because, as she puts it, "I don't have to wait (until) 15 years from now" to make sense of the world.
    
    Henry Flores, a political-science professor at St. Mary's University, credits this younger generation's political strength to their embrace of technology. "(The Internet) exposes them to more thinking," he says, "and groups that are like-minded in different parts of the country start to come together." That's exactly what the Generation O bloggers are hoping to do. The result could be a group of young people that, like their boomer (二战后生育高峰期出生的美国人) parents, grows up with a strong sense of purpose and sheds the image of apathy (冷漠) they've inherited from Generation X (60年代后期和70年代出生的美国人). It's no small challenge for a blog run by a group of ordinary—if ambitious—young people, but the members of Generation O are up to the task.`,
          contentCN: `塔夫茨大学公民学习与参与信息研究中心（CIRCLE）的一项新研究表明，如今的年轻人投票人数比前几代人更多，美国进步中心2008年的一项研究补充说，越来越多的年轻选民和活动家支持传统的自由派事业。但要弄清楚这些数字在现实生活中的意义并非易事。在总统竞选期间，巴拉克·奥巴马以希望和变革的信息组建了一个种族和意识形态多元化的联盟；随着新政府执政后的现实逐渐明朗，一些支持者可能会感到失望。随着国家进一步进入奥巴马总统任期，积极参与政治的年轻人会继续支持总统及其议程，还是会逐渐疏远？
    
    《新闻周刊》的一个新博客“O一代”（奥巴马的简称）的作者们想回答这个问题。在接下来的三个月里，米歇尔·克雷默和其他11名年龄在19岁至34岁之间的奥巴马支持者将在博客上讲述美国主流社会的生活，有一个不同之处：通过将他们所有的想法和经历与新总统及其政府联系起来，博主们将试图展开一场关于如今在美国年轻且积极参与政治意味着什么的对话。来自圣路易斯的24岁作家兼舞者马莱娜·阿穆萨认为这个项目是一种记录当下历史的方式。阿穆萨今年春天将前往印度完成一本书，然后去塞内加尔教英语，她一直在和朋友们谈论奥巴马总统任期如何改变了他们的日常生活，并希望将其中一些想法以及她的全球视角融入到她的博文中。她很兴奋，因为正如她所说，“我不必等到15年后”才能理解这个世界。
    
    圣玛丽大学的政治学教授亨利·弗洛雷斯将这年轻一代的政治力量归功于他们对科技的接受。“（互联网）让他们接触到更多的思想，”他说，“而且在这个国家不同地区志同道合的群体开始聚集在一起。”这正是“O一代”博主们希望做到的。结果可能是一群年轻人，他们像他们婴儿潮一代的父母一样，带着强烈的目标感成长，并摆脱他们从X一代（60年代后期和70年代出生的美国人）那里继承来的冷漠形象。对于一个由一群普通但有抱负的年轻人运营的博客来说，这可不是一个小挑战，但“O一代”的成员们有能力完成这项任务。`,
        },
        questions: [
          {
            id: 'q1-1',
            type: 'reading',
            text: 'What is the finding of a new study by CIRCLE?',
            textCN: 'CIRCLE的一项新研究的发现是什么？',
            options: [
              {
                id: 'q1-1-A',
                text: 'More young voters are going to the polls than before.',
                textCN: '去投票的年轻选民比以前更多。',
              },
              {
                id: 'q1-1-B',
                text: 'The young generation supports traditionally liberal causes.',
                textCN: '年轻一代支持传统的自由派事业。',
              },
              {
                id: 'q1-1-C',
                text: "Young voters played a decisive role in Obama's election.",
                textCN: '年轻选民在奥巴马的选举中起了决定性作用。',
              },
              {
                id: 'q1-1-D',
                text: 'Young people in America are now more diverse ideologically.',
                textCN: '美国的年轻人现在在意识形态上更加多样化。',
              },
            ],
            correctOptionId: 'q1-1-A',
            explanation:
              "文章第一句提到“A new study from the Center for Information and Research on Civic Learning and Engagement (CIRCLE) at Tufts University shows that today's youth vote in larger numbers than previous generations”，说明CIRCLE的新研究发现是去投票的年轻选民比以前更多，所以选A。",
          },
          {
            id: 'q1-2',
            type: 'reading',
            text: 'What is a main concern of the writers of Generation O?',
            textCN: '“O一代”的作者们主要关心的是什么？',
            options: [
              {
                id: 'q1-2-A',
                text: "How Obama is going to live up to young people's expectations.",
                textCN: '奥巴马将如何辜负年轻人的期望。',
              },
              {
                id: 'q1-2-B',
                text: "Whether America is going to change during Obama's presidency.",
                textCN: '在美国总统奥巴马任期内美国是否会改变。',
              },
              {
                id: 'q1-2-C',
                text: "Whether young people will continue to support Obama's policy.",
                textCN: '年轻人是否会继续支持奥巴马的政策。',
              },
              {
                id: 'q1-2-D',
                text: "How Obama's agenda is going to affect the life of Americans.",
                textCN: '奥巴马的议程将如何影响美国人的生活。',
              },
            ],
            correctOptionId: 'q1-2-C',
            explanation:
              '文章第二段第一句提到“The writers of Generation O (short for Obama), a new Newsweek blog that seeks to chronicle the lives of a group of young Obama supporters, want to answer that question. As the nation moves further into the Obama presidency, will politically engaged young people continue to support the president and his agenda, or will they gradually drift away?”，说明“O一代”的作者们主要关心的是年轻人是否会继续支持奥巴马的政策，所以选C。',
          },
          {
            id: 'q1-3',
            type: 'reading',
            text: 'What will the Generation O bloggers write about in their posts?',
            textCN: '“O一代”博主们在他们的博文中会写些什么？',
            options: [
              {
                id: 'q1-3-A',
                text: 'Their own interpretation of American politics.',
                textCN: '他们对美国政治的自己的解读。',
              },
              {
                id: 'q1-3-B',
                text: "Policy changes to take place in Obama's administration.",
                textCN: '奥巴马政府将发生的政策变化。',
              },
              {
                id: 'q1-3-C',
                text: "Obama's presidency viewed from a global perspective.",
                textCN: '从全球视角看待奥巴马的总统任期。',
              },
              {
                id: 'q1-3-D',
                text: "Their lives in relation to Obama's presidency.",
                textCN: '他们与奥巴马总统任期相关的生活。',
              },
            ],
            correctOptionId: 'q1-3-D',
            explanation:
              '文章第二段提到“For the next three months, Michelle Kremer and 11 other Obama supporters, ages 19 to 34, will blog about life across mainstream America, with one twist: by tying all of their ideas and experiences to the new president and his administration, the bloggers will try to start a conversation about what it means to be young and politically active in America today.”，说明“O一代”博主们会写他们与奥巴马总统任期相关的生活，所以选D。',
          },
          {
            id: 'q1-4',
            type: 'reading',
            text: "What accounts for the younger generation's political strength according to Professor Henry Flores?",
            textCN:
              '根据亨利·弗洛雷斯教授的说法，年轻一代的政治力量归因于什么？',
            options: [
              {
                id: 'q1-4-A',
                text: 'Their embrace of radical ideas.',
                textCN: '他们对激进思想的接受。',
              },
              {
                id: 'q1-4-B',
                text: 'Their desire to change America.',
                textCN: '他们改变美国的愿望。',
              },
              {
                id: 'q1-4-C',
                text: 'Their utilization of the Internet.',
                textCN: '他们对互联网的利用。',
              },
              {
                id: 'q1-4-D',
                text: 'Their strong sense of responsibility.',
                textCN: '他们强烈的责任感。',
              },
            ],
            correctOptionId: 'q1-4-C',
            explanation:
              "文章第三段第一句提到“Henry Flores, a political-science professor at St. Mary's University, credits this younger generation's political strength to their embrace of technology.”，说明亨利·弗洛雷斯教授认为年轻一代的政治力量归因于他们对科技的接受，也就是对互联网的利用，所以选C。",
          },
          {
            id: 'q1-5',
            type: 'reading',
            text: 'What can we infer from the passage about Generation X?',
            textCN: '从文章中我们可以推断出关于X一代的什么？',
            options: [
              {
                id: 'q1-5-A',
                text: 'They are politically conservative.',
                textCN: '他们在政治上保守。',
              },
              {
                id: 'q1-5-B',
                text: 'They reject conventional values.',
                textCN: '他们拒绝传统价值观。',
              },
              {
                id: 'q1-5-C',
                text: 'They dare to take up challenges.',
                textCN: '他们敢于接受挑战。',
              },
              {
                id: 'q1-5-D',
                text: 'They are indifferent to politics.',
                textCN: '他们对政治冷漠。',
              },
            ],
            correctOptionId: 'q1-5-D',
            explanation:
              "文章第三段最后一句提到“The result could be a group of young people that, like their boomer (二战后生育高峰期出生的美国人) parents, grows up with a strong sense of purpose and sheds the image of apathy (冷漠) they've inherited from Generation X (60年代后期和70年代出生的美国人).”，说明X一代是冷漠的，也就是对政治冷漠，所以选D。",
          },
        ],
      },
      {
        id: 'chapter1-reading1',
        title: '阅读理解 1',
        description: '关于远程学习的阅读理解',
        type: 'reading',
        article: {
          id: 'article1',
          title: 'Distance Learning',
          titleCN: '远程学习',
          content: `A busy schedule coupled with lack of time does not always make it possible to continue your education along with your job and family responsibilities. However, distance learning has made it possible to work and pursue your academic interests at the same time.
    　　There are a few important things to consider when choosing a distance learning college. Accreditation (认证) should be the leading standard. Degrees from colleges without any official accreditation are not recognized by employers and will only mean a waste of money and time. Also make sure that the college does not have any fake accreditation. The services offered by the distance learning institutes should also be considered, including placement services. The credentials (文凭) of the distance learning program and its past record will help you in choosing an institute.
    　　Colleges offer various types of distance learning degrees. There are both short-term courses that may last only a few weeks and long-term graduate and postgraduate courses that require 2 to 3 years of study. Distance learning MBA is one of the most sought-after degree by management executives. Distance learning programs are run both by traditional colleges and schools along with their normal courses and also by independent institutes specializing in distance learning facilities. It is best to choose a program run by the traditional colleges, as these are given the same recognition as to their normal courses. It is also important that you personally visit the institute and interact with the staff to gain detailed information on their teaching methods and principles, the type of study material provided and personal guidance, if any, provided by the distance learning college.
    　　To make your distance learning program a success, it is important that you interact with other students who have enrolled in the program. Interaction will help in deciding how to make your method of study efficient. Try to have a weekend session with other students from your area or region. Furthermore, regular communications with the training staff will also help clear any questions that you may have.`,
          contentCN: `忙碌的日程安排加上时间的缺乏，并不总是能让你在承担工作和家庭责任的同时继续接受教育。然而，远程学习使人们有可能在工作的同时追求自己的学术兴趣。
    　　选择远程学习学院时，有几个重要的事情需要考虑。认证应该是首要标准。没有任何官方认证的学院颁发的学位不被雇主认可，只会意味着浪费金钱和时间。还要确保学院没有任何虚假认证。远程学习机构提供的服务也应该被考虑，包括就业服务。远程学习项目的文凭及其过去的记录将有助于你选择一所机构。
    　　学院提供各种类型的远程学习学位。既有可能只持续几周的短期课程，也有需要2到3年学习时间的长期研究生和博士后课程。远程学习MBA是管理高管们最追捧的学位之一。远程学习项目由传统学院和学校在其正常课程之外运行，也由专门从事远程学习设施的独立机构运行。最好选择由传统学院运行的项目，因为这些项目与它们的正常课程享有相同的认可度。亲自参观该机构并与工作人员互动，以详细了解他们的教学方法和原则、提供的学习材料类型以及远程学习学院提供的个人指导（如果有的话）也很重要。
    　　为了使你的远程学习项目取得成功，与已报名参加该项目的其他学生互动很重要。互动将有助于决定如何使你的学习方法更有效率。尽量与来自你所在地区的其他学生进行一次周末聚会。此外，与培训人员定期沟通也将有助于清除你可能有的任何问题。`,
        },
        questions: [
          {
            id: 'q1-1',
            type: 'reading',
            text: 'What should be the most important standard of choosing a distance learning college?',
            textCN: '选择远程学习学院最重要的标准应该是什么？',
            options: [
              { id: 'q1-1-A', text: 'Tuition', textCN: '学费' },
              { id: 'q1-1-B', text: 'Courses', textCN: '课程' },
              { id: 'q1-1-C', text: 'Degrees', textCN: '学位' },
              { id: 'q1-1-D', text: 'Accreditation', textCN: '认证' },
            ],
            correctOptionId: 'q1-1-D',
            explanation:
              "The second paragraph states that 'Accreditation (认证) should be the leading standard.'",
          },
          {
            id: 'q1-2',
            type: 'reading',
            text: 'What are helpful to you while choosing a distance learning institute?',
            textCN: '在选择远程学习机构时，什么对你有帮助？',
            options: [
              {
                id: 'q1-2-A',
                text: 'Your academic interests and your present job',
                textCN: '你的学术兴趣和你目前的工作',
              },
              {
                id: 'q1-2-B',
                text: 'Your spare money and time for distance learning',
                textCN: '你用于远程学习的闲钱和时间',
              },
              {
                id: 'q1-2-C',
                text: 'The official accreditation and its normal courses',
                textCN: '官方认证及其正常课程',
              },
              {
                id: 'q1-2-D',
                text: 'The credentials of the program and its past record',
                textCN: '该项目的文凭及其过去的记录',
              },
            ],
            correctOptionId: 'q1-2-D',
            explanation:
              "The second paragraph mentions that 'The credentials (文凭) of the distance learning program and its past record will help you in choosing an institute.'",
          },
          {
            id: 'q1-3',
            type: 'reading',
            text: 'Courses offered by different distance learning colleges can be classified into ________.',
            textCN: '不同远程学习学院提供的课程可以分为________。',
            options: [
              {
                id: 'q1-3-A',
                text: 'short-term and long-term courses',
                textCN: '短期和长期课程',
              },
              {
                id: 'q1-3-B',
                text: 'graduate and postgraduate courses',
                textCN: '研究生和博士后课程',
              },
              {
                id: 'q1-3-C',
                text: 'MBA and EMBA courses',
                textCN: 'MBA和EMBA课程',
              },
              {
                id: 'q1-3-D',
                text: 'general and specialized courses',
                textCN: '普通和专业课程',
              },
            ],
            correctOptionId: 'q1-3-A',
            explanation:
              "The third paragraph states that 'There are both short-term courses that may last only a few weeks and long-term graduate and postgraduate courses that require 2 to 3 years of study.'",
          },
          {
            id: 'q1-4',
            type: 'reading',
            text: 'It is suggested that people should choose distance learning programs run by ________.',
            textCN: '建议人们应该选择由________运营的远程学习项目。',
            options: [
              {
                id: 'q1-4-A',
                text: 'traditional colleges',
                textCN: '传统学院',
              },
              {
                id: 'q1-4-B',
                text: 'independent institutes',
                textCN: '独立机构',
              },
              {
                id: 'q1-4-C',
                text: 'colleges that offer postgraduate courses',
                textCN: '提供研究生课程的学院',
              },
              {
                id: 'q1-4-D',
                text: 'colleges and schools with a good reputation',
                textCN: '声誉良好的学院和学校',
              },
            ],
            correctOptionId: 'q1-4-A',
            explanation:
              "The third paragraph says that 'It is best to choose a program run by the traditional colleges, as these are given the same recognition as to their normal courses.'",
          },
          {
            id: 'q1-5',
            type: 'reading',
            text: 'How can you make your distance learning program a success?',
            textCN: '你如何使你的远程学习项目取得成功？',
            options: [
              {
                id: 'q1-5-A',
                text: 'By using efficient methods of study',
                textCN: '通过使用高效的学习方法',
              },
              {
                id: 'q1-5-B',
                text: 'By attaching great importance to study',
                textCN: '通过高度重视学习',
              },
              {
                id: 'q1-5-C',
                text: 'By interacting with other students in the same program',
                textCN: '通过与同一项目中的其他学生互动',
              },
              {
                id: 'q1-5-D',
                text: 'By communicating with the training staff every day',
                textCN: '通过每天与培训人员沟通',
              },
            ],
            correctOptionId: 'q1-5-C',
            explanation:
              "The fourth paragraph states that 'To make your distance learning program a success, it is important that you interact with other students who have enrolled in the program.'",
          },
        ],
      },
      {
        id: 'chapter15-cloze10',
        title: '完形填空 24',
        description: '关于美国大学无线技术与课堂注意力的完形填空',
        type: 'cloze',
        questions: [
          {
            id: 'c24-1',
            type: 'cloze',
            text: "But professors say the technology poses a growing (75)_____: Retaining their students' attention.",
            textCN:
              '但教授们表示，这项技术带来了日益严峻的(75)_____：保持学生的注意力。',
            options: [
              { id: 'c24-1-A', text: 'challenge', textCN: '挑战' },
              { id: 'c24-1-B', text: 'opportunity', textCN: '机会' },
              { id: 'c24-1-C', text: 'solution', textCN: '解决方案' },
              { id: 'c24-1-D', text: 'advantage', textCN: '优势' },
            ],
            correctOptionId: 'c24-1-A',
            explanation:
              '“challenge”意为“挑战”，与“保持学生注意力”的难题呼应，体现无线技术对传统教学模式的冲击，符合教授们的担忧语境。',
          },
          {
            id: 'c24-2',
            type: 'cloze',
            text: 'the benefits and (76)_____ of the new wireless work were on display.',
            textCN: '新无线技术的好处和(76)_____都展现出来。',
            options: [
              { id: 'c24-2-A', text: 'drawbacks', textCN: '缺点' },
              { id: 'c24-2-B', text: 'successes', textCN: '成功' },
              { id: 'c24-2-C', text: 'improvements', textCN: '改进' },
              { id: 'c24-2-D', text: 'features', textCN: '特点' },
            ],
            correctOptionId: 'c24-2-A',
            explanation:
              '“drawbacks”意为“缺点”，与“benefits”形成对比，指无线技术在课堂中的利弊并存，通过学生上网分心的案例具体呈现弊端。',
          },
          {
            id: 'c24-3',
            type: 'cloze',
            text: 'more than a dozen laptop screens were (77)_____.',
            textCN: '十多台笔记本电脑的屏幕(77)_____。',
            options: [
              { id: 'c24-3-A', text: 'visible', textCN: '可见的' },
              { id: 'c24-3-B', text: 'hidden', textCN: '隐藏的' },
              { id: 'c24-3-C', text: 'broken', textCN: '损坏的' },
              { id: 'c24-3-D', text: 'off', textCN: '关闭的' },
            ],
            correctOptionId: 'c24-3-A',
            explanation:
              '“visible”意为“可见的”，指学生在课堂上使用笔记本电脑的行为公开化，为后文“上网分心”的具体表现做铺垫，体现课堂管理的难度。',
          },
          {
            id: 'c24-4',
            type: 'cloze',
            text: 'Distraction is nothing (78)_____.',
            textCN: '分心并非(78)_____。',
            options: [
              { id: 'c24-4-A', text: 'new', textCN: '新鲜的' },
              { id: 'c24-4-B', text: 'common', textCN: '常见的' },
              { id: 'c24-4-C', text: 'serious', textCN: '严重的' },
              { id: 'c24-4-D', text: 'unusual', textCN: '不寻常的' },
            ],
            correctOptionId: 'c24-4-A',
            explanation:
              '“new”意为“新鲜的”，与“学生一直以来的窃窃私语、传纸条”形成对比，说明分心现象长期存在，但无线技术使其形式和程度发生变化。',
          },
          {
            id: 'c24-5',
            type: 'cloze',
            text: 'But the (79)_____ of the laptop has introduced new opportunities for distraction.',
            textCN: '但笔记本电脑的(79)_____带来了新的分心机会。',
            options: [
              { id: 'c24-5-A', text: 'arrival', textCN: '到来' },
              { id: 'c24-5-B', text: 'price', textCN: '价格' },
              { id: 'c24-5-C', text: 'design', textCN: '设计' },
              { id: 'c24-5-D', text: 'repair', textCN: '维修' },
            ],
            correctOptionId: 'c24-5-A',
            explanation:
              '“arrival”意为“到来”，指笔记本电脑在课堂的普及为分心提供了新载体，与“无线技术扩大分心范围”形成递进关系，强调技术对教学的影响。',
          },
          {
            id: 'c24-6',
            type: 'cloze',
            text: 'wireless introduces an even (80)_____ range of distraction.',
            textCN: '无线技术引入了更(80)_____的分心范围。',
            options: [
              { id: 'c24-6-A', text: 'broader', textCN: '广泛的' },
              { id: 'c24-6-B', text: 'narrower', textCN: '狭窄的' },
              { id: 'c24-6-C', text: 'shorter', textCN: '更短的' },
              { id: 'c24-6-D', text: 'smaller', textCN: '更小的' },
            ],
            correctOptionId: 'c24-6-A',
            explanation:
              '“broader”意为“广泛的”，指无线技术使学生分心的方式从单一行为扩展到上网、邮件、即时消息等多元活动，体现分心范围的扩大。',
          },
          {
            id: 'c24-7',
            type: 'cloze',
            text: 'This is (81)_____ annoying for law professors.',
            textCN: '这(81)_____让法学教授们感到烦恼。',
            options: [
              { id: 'c24-7-A', text: 'especially', textCN: '尤其' },
              { id: 'c24-7-B', text: 'hardly', textCN: '几乎不' },
              { id: 'c24-7-C', text: 'never', textCN: '从未' },
              { id: 'c24-7-D', text: 'rarely', textCN: '很少' },
            ],
            correctOptionId: 'c24-7-A',
            explanation:
              '“especially”意为“尤其”，强调法学教授对无线技术的反感更为突出，与“仍依赖纸质资料”的教学习惯相关，体现学科差异带来的认知分歧。',
          },
          {
            id: 'c24-8',
            type: 'cloze',
            text: "who (82)_____ the Internet's entry into the classroom.",
            textCN: '他(82)_____互联网进入课堂。',
            options: [
              { id: 'c24-8-A', text: 'opposes', textCN: '反对' },
              { id: 'c24-8-B', text: 'supports', textCN: '支持' },
              { id: 'c24-8-C', text: 'ignores', textCN: '忽视' },
              { id: 'c24-8-D', text: 'welcomes', textCN: '欢迎' },
            ],
            correctOptionId: 'c24-8-A',
            explanation:
              '“opposes”意为“反对”，与“伤害学生自身”的观点一致，体现保守派学者对技术入侵课堂的抵触，与后文Mallek教授的态度形成对比。',
          },
          {
            id: 'c24-9',
            type: 'cloze',
            text: 'However, Professor Mallek sees it (83)_____.',
            textCN: '然而，马莱克教授(83)_____看待它。',
            options: [
              { id: 'c24-9-A', text: 'differently', textCN: '不同地' },
              { id: 'c24-9-B', text: 'similarly', textCN: '相似地' },
              { id: 'c24-9-C', text: 'positively', textCN: '积极地' },
              { id: 'c24-9-D', text: 'negatively', textCN: '消极地' },
            ],
            correctOptionId: 'c24-9-A',
            explanation:
              '“differently”意为“不同地”，作为转折词，引出支持派学者的观点，强调技术利弊的相对性，为后文“促使自己成为更好教师”的论述做铺垫。',
          },
          {
            id: 'c24-10',
            type: 'cloze',
            text: 'He takes the (84)_____ of losing his students to email and online newspapers as a challenge.',
            textCN: '他将学生因邮件和在线报纸而流失的(84)_____视为一种挑战。',
            options: [
              { id: 'c24-10-A', text: 'threat', textCN: '威胁' },
              { id: 'c24-10-B', text: 'promise', textCN: '承诺' },
              { id: 'c24-10-C', text: 'success', textCN: '成功' },
              { id: 'c24-10-D', text: 'failure', textCN: '失败' },
            ],
            correctOptionId: 'c24-10-A',
            explanation:
              '“threat”意为“威胁”，指分心问题对教学效果的潜在危害，但Mallek教授将其转化为改进教学的动力，体现积极应对技术挑战的态度。',
          },
        ],
      },
      {
        id: 'chapter15-cloze11',
        title: '完形填空 25',
        description: '关于肥胖与代谢综合征的新理论完形填空',
        type: 'cloze',
        questions: [
          {
            id: 'c25-1',
            type: 'cloze',
            text: 'The health problems (85)_____ with fatness may not be caused by it.',
            textCN: '与肥胖(85)_____的健康问题可能并非由其引起。',
            options: [
              { id: 'c25-1-A', text: 'associated', textCN: '关联' },
              { id: 'c25-1-B', text: 'separated', textCN: '分离' },
              { id: 'c25-1-C', text: 'treated', textCN: '治疗' },
              { id: 'c25-1-D', text: 'cured', textCN: '治愈' },
            ],
            correctOptionId: 'c25-1-A',
            explanation:
              '“associated”意为“关联”，“associated with”表示“与…相关”，指传统观点认为肥胖与健康问题存在关联，为后文推翻该观点做铺垫。',
          },
          {
            id: 'c25-2',
            type: 'cloze',
            text: 'That is the heretical (86)_____ of Roger Unger and Philipp Scherer.',
            textCN: '这是罗杰·昂格尔和菲利普·舍雷尔的异端(86)_____。',
            options: [
              { id: 'c25-2-A', text: 'proposal', textCN: '提议' },
              { id: 'c25-2-B', text: 'fact', textCN: '事实' },
              { id: 'c25-2-C', text: 'method', textCN: '方法' },
              { id: 'c25-2-D', text: 'result', textCN: '结果' },
            ],
            correctOptionId: 'c25-2-A',
            explanation:
              '“proposal”意为“提议”，指两位学者提出的颠覆性理论，与“heretical”（异端的）呼应，体现该观点对传统认知的挑战。',
          },
          {
            id: 'c25-3',
            type: 'cloze',
            text: 'They have been (87)_____ the science of metabolic syndrome.',
            textCN: '他们一直在(87)_____代谢综合征的科学研究。',
            options: [
              { id: 'c25-3-A', text: 'reviewing', textCN: '回顾' },
              { id: 'c25-3-B', text: 'ignoring', textCN: '忽视' },
              { id: 'c25-3-C', text: 'creating', textCN: '创造' },
              { id: 'c25-3-D', text: 'forgetting', textCN: '忘记' },
            ],
            correctOptionId: 'c25-3-A',
            explanation:
              '“reviewing”意为“回顾”，指学者通过梳理代谢综合征的研究文献提出新理论，体现研究的严谨性和逻辑性。',
          },
          {
            id: 'c25-4',
            type: 'cloze',
            text: 'seem to increase the (88)_____ of heart disease and strokes.',
            textCN: '似乎会增加心脏病和中风的(88)_____。',
            options: [
              { id: 'c25-4-A', text: 'risk', textCN: '风险' },
              { id: 'c25-4-B', text: 'cure', textCN: '治愈' },
              { id: 'c25-4-C', text: 'treatment', textCN: '治疗' },
              { id: 'c25-4-D', text: 'research', textCN: '研究' },
            ],
            correctOptionId: 'c25-4-A',
            explanation:
              '“risk”意为“风险”，指代谢综合征的症状会提升重大疾病的发病概率，符合医学常识和文本语境。',
          },
          {
            id: 'c25-5',
            type: 'cloze',
            text: 'Metabolic syndrome is (89)_____ in one-sixth of the American population.',
            textCN: '代谢综合征在六分之一的美国人口中(89)_____。',
            options: [
              { id: 'c25-5-A', text: 'found', textCN: '发现' },
              { id: 'c25-5-B', text: 'cured', textCN: '治愈' },
              { id: 'c25-5-C', text: 'ignored', textCN: '忽视' },
              { id: 'c25-5-D', text: 'created', textCN: '创造' },
            ],
            correctOptionId: 'c25-5-A',
            explanation:
              '“found”意为“发现”，指代谢综合征在美国的发病率数据，用具体数字说明问题的普遍性，增强论述可信度。',
          },
          {
            id: 'c25-6',
            type: 'cloze',
            text: '“Syndrome” is the medical term for a (90)_____ of symptoms.',
            textCN: '“综合征”是指一组症状的医学术语，即症状的(90)_____。',
            options: [
              { id: 'c25-6-A', text: 'collection', textCN: '集合' },
              { id: 'c25-6-B', text: 'cause', textCN: '原因' },
              { id: 'c25-6-C', text: 'cure', textCN: '治愈' },
              { id: 'c25-6-D', text: 'name', textCN: '名称' },
            ],
            correctOptionId: 'c25-6-A',
            explanation:
              '“collection”意为“集合”，准确解释“综合征”的医学定义，指多种症状的组合，与“common cause is not understood”（共同病因未知）形成逻辑关联。',
          },
          {
            id: 'c25-7',
            type: 'cloze',
            text: 'this is generally regarded as the (91)_____ cause.',
            textCN: '这通常被视为(91)_____原因。',
            options: [
              { id: 'c25-7-A', text: 'potential', textCN: '潜在的' },
              { id: 'c25-7-B', text: 'definite', textCN: '明确的' },
              { id: 'c25-7-C', text: 'impossible', textCN: '不可能的' },
              { id: 'c25-7-D', text: 'harmless', textCN: '无害的' },
            ],
            correctOptionId: 'c25-7-A',
            explanation:
              '“potential”意为“潜在的”，指传统观点基于症状出现顺序，将肥胖视为代谢综合征的潜在病因，为后文推翻该假设做铺垫。',
          },
          {
            id: 'c25-8',
            type: 'cloze',
            text: 'between a person becoming overweight and his (92)_____ other symptoms.',
            textCN: '在一个人超重和他(92)_____其他症状之间通常有多年的间隔。',
            options: [
              { id: 'c25-8-A', text: 'developing', textCN: '出现' },
              { id: 'c25-8-B', text: 'curing', textCN: '治愈' },
              { id: 'c25-8-C', text: 'ignoring', textCN: '忽视' },
              { id: 'c25-8-D', text: 'hiding', textCN: '隐藏' },
            ],
            correctOptionId: 'c25-8-A',
            explanation:
              '“developing”意为“出现”，指超重人群在数年后才表现出其他代谢综合征症状，说明肥胖与症状间可能并非直接因果关系。',
          },
          {
            id: 'c25-9',
            type: 'cloze',
            text: 'in addition to its role in storing energy as a way to (93)_____ against future famine.',
            textCN: '除了作为储存能量以(93)_____未来饥荒的角色之外。',
            options: [
              { id: 'c25-9-A', text: 'fight', textCN: '对抗' },
              { id: 'c25-9-B', text: 'cause', textCN: '引起' },
              { id: 'c25-9-C', text: 'forget', textCN: '忘记' },
              { id: 'c25-9-D', text: 'create', textCN: '创造' },
            ],
            correctOptionId: 'c25-9-A',
            explanation:
              '“fight”意为“对抗”，“fight against”表示“对抗”，指脂肪储存能量以应对饥荒的进化功能，符合生物学常识。',
          },
          {
            id: 'c25-10',
            type: 'cloze',
            text: 'getting fat is a (94)_____ mechanism against metabolic syndrome.',
            textCN: '肥胖是一种对抗代谢综合征的(94)_____机制。',
            options: [
              { id: 'c25-10-A', text: 'protective', textCN: '保护的' },
              { id: 'c25-10-B', text: 'harmful', textCN: '有害的' },
              { id: 'c25-10-C', text: 'useless', textCN: '无用的' },
              { id: 'c25-10-D', text: 'dangerous', textCN: '危险的' },
            ],
            correctOptionId: 'c25-10-A',
            explanation:
              '“protective”意为“保护的”，指两位学者提出的新理论——肥胖是身体对抗代谢综合征的保护机制，颠覆传统认知，呼应首段“保护身体”的论述。',
          },
        ],
      },
      {
        id: 'chapter15-cloze12',
        title: '完形填空 26',
        description: '关于高等教育利用互联网的完形填空',
        type: 'cloze',
        questions: [
          {
            id: 'c26-1',
            type: 'cloze',
            text: 'To deal with this (95)_____ issue, colleges...',
            textCN: '为处理这个(95)_____问题，高校...',
            options: [
              { id: 'c26-1-A', text: 'complex', textCN: '复杂的' },
              { id: 'c26-1-B', text: 'simple', textCN: '简单的' },
              { id: 'c26-1-C', text: 'unimportant', textCN: '不重要的' },
              { id: 'c26-1-D', text: 'old', textCN: '陈旧的' },
            ],
            correctOptionId: 'c26-1-A',
            explanation:
              '“complex”意为“复杂的”，与“高等教育需提供更好课程和更多机会”的多重需求呼应，体现问题的多面性，符合高校寻求互联网解决方案的逻辑。',
          },
          {
            id: 'c26-2',
            type: 'cloze',
            text: 'turning to the Internet for quick (96)_____ to its resources.',
            textCN: '转向互联网以快速(96)_____其丰富资源。',
            options: [
              { id: 'c26-2-A', text: 'access', textCN: '获取' },
              { id: 'c26-2-B', text: 'answer', textCN: '答案' },
              { id: 'c26-2-C', text: 'key', textCN: '关键' },
              { id: 'c26-2-D', text: 'solution', textCN: '解决方案' },
            ],
            correctOptionId: 'c26-2-A',
            explanation:
              '“access”意为“获取”，“access to”为固定搭配，指高校通过互联网快速获取教育资源，体现互联网在资源整合中的优势。',
          },
          {
            id: 'c26-3',
            type: 'cloze',
            text: 'the Internet has been accepted as the (97)_____ technology...',
            textCN: '互联网已被公认为(97)_____于许多其他方法的技术...',
            options: [
              { id: 'c26-3-A', text: 'preferred', textCN: '更受青睐的' },
              { id: 'c26-3-B', text: 'inferior', textCN: '较差的' },
              { id: 'c26-3-C', text: 'strange', textCN: '陌生的' },
              { id: 'c26-3-D', text: 'traditional', textCN: '传统的' },
            ],
            correctOptionId: 'c26-3-A',
            explanation:
              '“preferred”意为“更受青睐的”，指互联网在高校中比其他方法更被优先选择，与“许多教师常规性上传资料”的后文形成因果关系。',
          },
          {
            id: 'c26-4',
            type: 'cloze',
            text: 'Many teachers now routinely (98)_____ their teaching materials online.',
            textCN: '如今许多教师常规性地在网上(98)_____教学资料。',
            options: [
              { id: 'c26-4-A', text: 'post', textCN: '发布' },
              { id: 'c26-4-B', text: 'read', textCN: '阅读' },
              { id: 'c26-4-C', text: 'find', textCN: '查找' },
              { id: 'c26-4-D', text: 'sell', textCN: '售卖' },
            ],
            correctOptionId: 'c26-4-A',
            explanation:
              '“post”意为“发布”，指教师将资料上传至网络平台，符合“互联网作为首选技术”的语境，体现教学方式的数字化转变。',
          },
          {
            id: 'c26-5',
            type: 'cloze',
            text: 'A growing number of schools offer at least some (99)_____ courses...',
            textCN: '越来越多的学校至少提供一些(99)_____课程...',
            options: [
              { id: 'c26-5-A', text: 'undergraduate', textCN: '本科的' },
              { id: 'c26-5-B', text: 'graduate', textCN: '研究生的' },
              { id: 'c26-5-C', text: 'professional', textCN: '专业的' },
              { id: 'c26-5-D', text: 'online', textCN: '在线的' },
            ],
            correctOptionId: 'c26-5-D',
            explanation:
              '“online”意为“在线的”，与“over the Internet”直接对应，指学校通过网络开设课程，是互联网应用于高等教育的具体表现。',
          },
          {
            id: 'c26-6',
            type: 'cloze',
            text: 'The first model (100)_____ to improve existing courses...',
            textCN: '第一种模式(100)_____通过互联网改进现有课程...',
            options: [
              { id: 'c26-6-A', text: 'seeks', textCN: '寻求' },
              { id: 'c26-6-B', text: 'refuses', textCN: '拒绝' },
              { id: 'c26-6-C', text: 'forgets', textCN: '忘记' },
              { id: 'c26-6-D', text: 'fails', textCN: '失败' },
            ],
            correctOptionId: 'c26-6-A',
            explanation:
              '“seeks”意为“寻求”，指第一种模式以改进课程为目标，与“提供高速网络连接”的具体措施形成目的关系，逻辑连贯。',
          },
          {
            id: 'c26-7',
            type: 'cloze',
            text: 'This model provides high-speed Internet (101)_____ to all students...',
            textCN: '该模式为所有学生提供高速互联网(101)_____...',
            options: [
              { id: 'c26-7-A', text: 'connectivity', textCN: '连接' },
              { id: 'c26-7-B', text: 'speed', textCN: '速度' },
              { id: 'c26-7-C', text: 'bills', textCN: '账单' },
              { id: 'c26-7-D', text: 'users', textCN: '用户' },
            ],
            correctOptionId: 'c26-7-A',
            explanation:
              '“connectivity”意为“连接”，指网络接入服务，与“高速互联网”搭配，是第一种模式的基础措施，支持课程改进需求。',
          },
          {
            id: 'c26-8',
            type: 'cloze',
            text: "While this model uses the Internet, it doesn't (102)_____ many changes...",
            textCN: '尽管该模式使用互联网，但不(102)_____太多改变...',
            options: [
              { id: 'c26-8-A', text: 'require', textCN: '要求' },
              { id: 'c26-8-B', text: 'avoid', textCN: '避免' },
              { id: 'c26-8-C', text: 'make', textCN: '做出' },
              { id: 'c26-8-D', text: 'see', textCN: '看见' },
            ],
            correctOptionId: 'c26-8-A',
            explanation:
              '“require”意为“要求”，指第一种模式仅将互联网作为辅助工具，不改变现有教学结构，与“保持制度结构不变”形成语义呼应。',
          },
          {
            id: 'c26-9',
            type: 'cloze',
            text: 'A different model regards the Internet as (103)_____ to change...',
            textCN: '另一种模式将互联网视为变革(103)_____...',
            options: [
              { id: 'c26-9-A', text: 'indispensable', textCN: '不可或缺的' },
              { id: 'c26-9-B', text: 'harmful', textCN: '有害的' },
              { id: 'c26-9-C', text: 'easy', textCN: '容易的' },
              { id: 'c26-9-D', text: 'optional', textCN: '可选的' },
            ],
            correctOptionId: 'c26-9-A',
            explanation:
              '“indispensable”意为“不可或缺的”，指第二种模式认为互联网是高等教育变革的必要条件，与“更具革命性”的定位相符，体现其颠覆性。',
          },
          {
            id: 'c26-10',
            type: 'cloze',
            text: 'the Internet can (104)_____ teacher-centered into student-centered...',
            textCN: '互联网能(104)_____以教师为中心转变为以学生为中心...',
            options: [
              { id: 'c26-10-A', text: 'transform', textCN: '转变' },
              { id: 'c26-10-B', text: 'keep', textCN: '保持' },
              { id: 'c26-10-C', text: 'divide', textCN: '分割' },
              { id: 'c26-10-D', text: 'compare', textCN: '比较' },
            ],
            correctOptionId: 'c26-10-A',
            explanation:
              '“transform”意为“转变”，“transform...into...”为固定搭配，指互联网推动教学模式的根本变革，呼应“带来大学教育的基本变化”的论述。',
          },
        ],
      },
    ],
  },
  {
    id: 'chapter-translation',
    title: '英译汉练习',
    description: '英语翻译成汉语练习题集',
    questionSets: [
      {
        id: 'translation-set-1',
        title: '爱情与逻辑：谬误的故事',
        description:
          '讲述了主人公试图用逻辑知识改变女友思维并发展浪漫关系的故事',
        type: 'translation',
        questions: [
          {
            id: 't1-1',
            type: 'translation',
            text: "I had my first date with Polly after I made the trade with my roommate Rob. That year every guy on campus had a leather jacket, and Rob couldn't stand the idea of being the only football player who didn't, so he made a pact that he'd give me his girl in exchange for my jacket. He wasn't the brightest guy. Polly wasn't too shrewd, either.",
            textCN:
              '在我和室友罗伯的交易成功之后，我和波莉有了第一次约会。那一年校园里每个人都有件皮夹克，而罗伯是校足球队员中唯一一个没有皮夹克的，他一想到这个就受不了，于是他和我达成了一项协议，用他的女友换取我的夹克。他可不那么聪明，而他的女友波莉也不太精明。',
            options: [],
            correctOptionId: '',
          },
          {
            id: 't1-2',
            type: 'translation',
            text: "But she was pretty, well - off, didn't dye her hair strange colors or wear too much makeup. She had the right background to be the girlfriend of a dogged, brilliant lawyer. If I could show the elite law firms I applied to that I had a radiant, well - spoken counterpart by my side, I just might edge past the competition.",
            textCN:
              '但她漂亮而且富有，也没有把头发染成奇怪的颜色或是化很浓的妆。她拥有合适的家庭背景，足以胜任一名坚忍而睿智的律师的女友。如果我能够让我所申请的顶尖律师事务所看到我身边伴随着一位光彩照人、谈吐优雅的另一半，我就很有可能在竞聘中以微弱优势获胜。',
            options: [],
            correctOptionId: '',
          },
          {
            id: 't1-3',
            type: 'translation',
            text: 'After a banner day out, I drove until we were situated under a big old oak tree on a hill off the expressway. What I had in mind was a little eccentric. I thought the venue with a perfect view of the luminous city would lighten the mood. We stayed in the car, and I turned down the stereo and took my foot off the brake pedal. "What are we going to talk about?" she asked.',
            textCN:
              '在一起外出度过了美好的一天之后，我驱车来到了高速公路旁一座小山上一棵古老的大橡树下。我的想法有些怪异。而这个地方能够俯瞰灯火灿烂的城区，我觉得它会使人的心情变轻松。我们呆在车子里，我调低了音响并把脚从刹车上挪开。“我们要谈些什么？”她问道。',
            options: [],
            correctOptionId: '',
          },
          {
            id: 't1-4',
            type: 'translation',
            text: 'She nodded in agreement.',
            textCN: '她点头表示赞同。',
            options: [],
            correctOptionId: '',
          },
          {
            id: 't1-5',
            type: 'translation',
            text: 'She seemed to have a good time. I could safely say my plan was underway. I took her home and set a date for another conversation.',
            textCN:
              '她似乎学得很开心，而我也可以放心地说我的计划正在稳步推进中。我把她送回家，并且定下了下一次约会交谈的日子。',
            options: [],
            correctOptionId: '',
          },
          {
            id: 't1-6',
            type: 'translation',
            text: 'Seated under the oak the next evening I said, "Our first fallacy tonight is called Ad Misericordiam."',
            textCN:
              '第二天晚上，坐在那棵橡树下，我说：“今天晚上我们要谈的第一个逻辑谬误叫‘文不对题’。”',
            options: [],
            correctOptionId: '',
          },
          {
            id: 't1-7',
            type: 'translation',
            text: 'She blinked, still trying hard to keep back her tears.',
            textCN: '她眨着眼睛，仍在竭力地忍住眼泪。',
            options: [],
            correctOptionId: '',
          },
          {
            id: 't1-8',
            type: 'translation',
            text: 'With five nights of diligent work, I actually made a logician out of Polly. She was an analytical thinker at last. The time had come for the conversion of our relationship from academic to romantic.',
            textCN:
              '经过五个夜晚的辛勤努力，我竟然真的将波莉打造成了一个逻辑行家，她总算能够分析思考了。现在应该是时候让我们的关系从学术向浪漫发展了。',
            options: [],
            correctOptionId: '',
          },
          {
            id: 't1-9',
            type: 'translation',
            text: 'Favoring her with a grin, I said, "We have now spent five evenings together. We get along pretty well. We make a pretty good couple."',
            textCN:
              '我赞许地对她笑了笑，说：“我们在一起已经度过了五个晚上，相互之间挺合得来，我们是蛮相配的一对。”',
            options: [],
            correctOptionId: '',
          },
          {
            id: 't1-10',
            type: 'translation',
            text: 'I laughed with amusement. She\'d learned her lessons well, far surpassing my expectations. "Sweetheart," I said, patting her hand in a tolerant manner, "five dates is plenty. After all, you don\'t have to eat a whole cake to know it\'s good."',
            textCN:
              '我被逗得笑了起来，她功课还真学得不错，大大超过了我的预期。“亲爱的，”我开口说，同时宽容地拍了拍她的手，“五次约会已经够多了，毕竟你不需要吃掉整个蛋糕才知道它是不是好吃。”',
            options: [],
            correctOptionId: '',
          },
          {
            id: 't1-11',
            type: 'translation',
            text: "I laughed with somewhat less amusement, hiding my dread that she'd learned her lessons too well. A few more false steps would be my doom. I decided to change tactics and try flattery instead.",
            textCN:
              '我又笑了笑，不过不觉得那么有趣了，同时还不能表露出我害怕她学得太好了。再错几步我可就无法挽回了。我决定改变策略，转而尝试奉承她的办法。',
            options: [],
            correctOptionId: '',
          },
          {
            id: 't1-12',
            type: 'translation',
            text: 'I leaped to my feet, my temper flaring up. "Will you or will you not go out with me?"',
            textCN: '我一下跳了起来，怒火中烧，“你到底愿不愿意做我的女朋友？”',
            options: [],
            correctOptionId: '',
          },
          {
            id: 't1-13',
            type: 'translation',
            text: 'With great effort, I said calmly, "How could you give me the axe over Rob? Look at me, an ingenious student, a tremendous intellectual, a man with an assured future. Look at Rob, a muscular idiot, a guy who\'ll never know where his next meal is coming from. Can you give me one good reason why you should be with him?"',
            textCN:
              '我极力地保持着平静，说道：“你怎么会甩了我而选择罗伯？看看我，一个聪明过人的学生，一个不同凡响的学者，一个前途无量的人。再看看罗伯，一个肌肉发达的蠢材，一个有了上顿没下顿的家伙。你是否能给我一个充足的理由，为什么要选择跟他？”',
            options: [],
            correctOptionId: '',
          },
          {
            id: 't1-14',
            type: 'translation',
            text: 'Wow, what presumption! I\'ll put it in a way someone as brilliant as you can understand," retorted Polly, her voice dripping with sarcasm. "Full disclosure — I like Rob in leather. I told him to say yes to you so he could have your jacket!"',
            textCN:
              '“喔，这是什么假设啊！为了让像你这样聪明的人能够明白，我这么说吧，”波莉反驳道，声音里充满了讽刺，“事情的真相是——我喜欢罗伯穿皮衣。是我让他同意你们的协议的，这样他就能拥有你的夹克！”',
            options: [],
            correctOptionId: '',
          },
        ],
      },
      {
        description: '基础词汇和句型的英译汉练习',
        id: 'translation-set-1',
        questions: [
          {
            correctOptionId: '',
            id: 't1-1',
            options: [],
            text: "If you're a man, at some point a woman will ask you how she looks. You must be careful how you answer this question. The best technique is to form an honest yet sensitive response, then promptly excuse yourself for some kind of emergency. Trust me, this is the easiest way out. No amount of rehearsal will help you come up with the right answer. The problem is that men do not think of their looks in the same way women do. Most men form an opinion of themselves in seventh grade and stick to it for the rest of their lives. Some men think they're irresistibly desirable, and they refuse to change this opinion even when they grow bald and their faces visibly wrinkle as they age. Most men, I believe, are not arrogant about their looks. If the transient thought passes through their minds at all, they like to think of themselves as average-looking. Being average doesn't bother them; average is fine. They don't affix much value to their looks, or think of them in terms of aesthetics. Their primary form of beauty care is to shave themselves, which is essentially the same care they give to their lawns. If, at the end of his four minute allotment of time for grooming, a man has managed to wipe most of the shaving cream out of the strands of his hair and isn't bleeding too badly, he feels he's done all he can.",
            textCN:
              '（如果你是一位男士，肯定在某个时候会有女士问你她看起来怎么样。对于如何应对这个问题，你一定得小心。最好的对策就是给一个诚实但又谨慎的回答，然后借口有急事马上脱身。相信我，这是最简单的方法。对于她的这一问题，无论你事先练习多少次，都不会找到正确答案。其原因是，男性和女性对外表的看法截然不同。大多数男性对自己外表的评价在七年级时就形成了，而且终生不变。有些男性认为自己有不可抗拒的魅力，即使随着年龄的增长，他们头发掉光了，脸上布满皱纹，他们仍然拒绝改变这种看法。我相信，大多数男性都不会对自己的相貌感到过分自傲。如果他们偶尔想到自己外表的话，他们愿意认为自己样貌中等。长相普通不会使他们有任何烦恼，因为普通就已经是很好了。男性不是特别注重自己的外貌，也不会从美学的角度去审视自己。他们的打扮方式主要就是刮刮胡子，就像打理自家草坪一样。对于一位男性来说，如果能花四分钟刮刮胡子，结束之后再把粘到头发上的剃须膏擦净，又没有出血太厉害，他就觉得自己已经尽心尽力了。 ）  ',
            type: 'translation',
          },
        ],
        title: '基础英译汉练习（一）',
        type: 'translation',
      },
      {
        description: '弗雷德·史密斯创建联邦快递的历程及公司发展理念',
        id: 'translation-set-1',
        questions: [
          {
            correctOptionId: '',
            id: 't1-1',
            options: [],
            text: "Every night several hundred planes bearing a purple, white, and orange design touch down at Memphis Airport, in Tennessee. What precedes this landing are package pick-ups from locations all over the United States earlier in the day. Crews unload the planes' cargo of more than half a million parcels and letters. The rectangular packages and envelopes are rapidly reshuffled and sorted according to address, then loaded onto other aircraft, and flown to their destinations to be dispersed by hand — many within 24 hours of leaving their senders. This is the culmination of a dream of Frederick W. Smith, the founder, president, chief executive officer, and chairman of the board of the FedEx Corp. — known originally as Federal Express — the largest and most successful overnight delivery service in the world. Conceived when he was in college and now in its 28th year of operation, Smith's exquisite brainchild has become the standard for door-to-door package delivery.",
            textCN:
              '每天夜晚，在田纳西州的孟菲斯机场，都有几百架带着白、紫、桔色图案的飞机降落。而在每天此前的早些时候，这些飞机都在美国各地收集包裹。工作人员从飞机上卸下的包裹及信件数量超过五十万之巨。长方形的包裹和信封又在这里依据收件地址被迅速整理分拣，然后装载上其他飞机，飞往各自的目的地，在那儿再由人工投递——到这时很多邮件离开寄件人之手还不到24小时。这是弗雷德里克·W.史密斯的终极梦想，他就是联邦快递集团（最初为联邦快递）这一全球最大、最成功的隔夜送达服务企业的创始人、总裁、首席执行官及董事会主席。如今，史密斯这一源于大学时代的妙想已在现实中经营到了第28个年头，并已成为包裹快递入户行业的标杆。',
            type: 'translation',
          },
          {
            correctOptionId: '',
            id: 't1-2',
            options: [],
            text: 'Recognized as an outstanding entrepreneur with an agreeable and winning personality, Smith is held in high regard by his competitors as well as his employees and stockholders. Fred Smith was just 27 when he founded FedEx. Now, so many years later, he\'s still the "captain of the ship". He attributes the success of the company simply to leadership, something he deduced from his years in the military, and from his family.',
            textCN:
              '史密斯被公认为是一位和蔼可亲、性格迷人的杰出企业家。无论是他的竞争者、员工，还是他公司股票的持有人，都对他十分敬重。弗雷德·史密斯创建“联邦快递”时只有27岁。现在多年过去了，他仍然坐在“掌门人”的位置上。他将公司的成功简单地归因于领导力，而这一推论则来自于他的军旅生涯及其家庭的影响。',
            type: 'translation',
          },
          {
            correctOptionId: '',
            id: 't1-3',
            options: [],
            text: 'Frederick Wallace Smith was born into a wealthy family clan on August 11, 1944 in Mississippi. His father died when he was just four years old. As a juvenile, Smith was an invalid, suffering from a disease that left him unable to walk normally. He was picked on by bullies, and he learned to defend himself by swinging at them with his alloy walking stick. Cured of the disease by the age of 10, he became a star athlete in high school, playing football, basketball, and baseball.',
            textCN:
              '弗雷德里克·华莱士·史密斯1944年8月11日出生于密西西比州一个富裕的家族。他四岁时父亲就离世了。史密斯年少时被视为病残者，因为他得了一种病，使他无法正常行走。为此他常遭受坏孩子的侮辱捉弄，他学会了挥舞合金拐杖来保护自己。十岁时他的病治好了，到了高中他则成了学校里的体育明星，足球、篮球、棒球样样能行。',
            type: 'translation',
          },
          {
            correctOptionId: '',
            id: 't1-4',
            options: [],
            text: "Smith's passion was flying. At 15, he was operating a crop-duster over the skyline of the Mississippi Delta, a terrain so flat that there was little need for radar navigation. As a student at Yale University, he helped revive the Yale flying club; its alumni had populated naval aviation history, including the famous \"Millionaires' Unit\" in World War I. Smith administrated the club's business and ran a small charter operation in New Haven.",
            textCN:
              '史密斯对飞行充满了激情。15岁时，他就曾驾驶一架作物喷粉飞机在密西西比三角洲的天际翱翔，三角洲的地形平坦开阔，甚至都不需要雷达导航。在耶鲁大学上学时，他参与重建了耶鲁飞行俱乐部，在美国海军航空史的每个时期都有这一俱乐部出来的校友的身影，包括一战时期著名的“百万富翁飞行队”。史密斯负责管理俱乐部的事务，同时还在纽黑文经营一项小规模的租赁业务。',
            type: 'translation',
          },
          {
            correctOptionId: '',
            id: 't1-5',
            options: [],
            text: "With his study time disrupted by flying, his academic performance suffered, but Smith never stopped looking for his own \"big idea\". He thought he had found it when he wrote a term paper for an economics class. He drafted a prototype for a transportation company that would guarantee overnight delivery of small, time-sensitive goods, such as replacement parts and medical supplies, to major US regions. The professor wasn't impressed and told Smith he couldn't quantify the idea and clearly it wasn't feasible.",
            textCN:
              '由于飞行打乱了学习时间，他的学业受到了影响，但史密斯从未停止寻找自己的“伟大想法”。在撰写一门经济学课程的学期论文时，他认为自己已经找到了它。他设计了一份运输企业的经营草案，该运输企业可以确保连夜递送小型或时间紧迫的货品到达美国的主要地区，如替换零件、医药用品等等。教授对这篇论文未予重视，他告诉史密斯说，他无法量化他的想法，并说这一想法明显不切合实际。',
            type: 'translation',
          },
          {
            correctOptionId: '',
            id: 't1-6',
            options: [],
            text: "However, Smith was certain he was onto something, even though several more years elapsed before he could turn his idea into reality. In the interim, he graduated from Yale in 1966, just as America's involvement in the Vietnam War was deepening. Since he was a patriot and had attended officers' training classes, he joined the Marines.",
            textCN:
              '然而，史密斯确信自己已经发现了些什么，尽管又过了好几年他才得以把自己的想法付诸实施。在此期间，他于1966年从耶鲁大学毕业，那时正值美国在越战中越陷越深，而他是个充满爱国热情的人，又参加过士官训练课程，所以他加入了美国海军陆战队。',
            type: 'translation',
          },
          {
            correctOptionId: '',
            id: 't1-7',
            options: [],
            text: 'Smith completed two tours in Vietnam, eventually flying more than 200 missions. "In the military, leadership means getting a group of people to subordinate their individual desires and ambitions for the achievement of organizational goals," Smith says, fusing together his military and business experiences. "And good leadership has very measurable effects on a company\'s bottom line."',
            textCN:
              '史密斯在越南战场上服役两期，完成了两百多次飞行任务。“在军队中，领导力意味着能使团队中所有成员将个人的期望与抱负置于从属地位，而以实现集体目标为重，”史密斯说道，这其中融合了他军旅生涯和经营管理的经验。“而优秀的领导力对控制一个公司的盈亏底线来说具有相当重要的作用。”',
            type: 'translation',
          },
          {
            correctOptionId: '',
            id: 't1-8',
            options: [],
            text: "Home from Vietnam, Smith became fascinated by the notion that if you connected all the points of a network through an intermediary hub, the streamlined efficiency could be enormous compared to other disjointed, decentralized businesses, whether the system involved moving packages and letters or people and planes. He decided to take a stab at starting his own business. With an investment from his father's company, as well as a chunk of his own inheritance, Smith bought his first delivery planes and in 1971 formed the Federal Express.",
            textCN:
              '从越南战场回国后，史密斯开始执着于这样一个理念，即如果能将某个运输网络的各个节点通过一个中介枢纽相互连接，其效率较之其他各环节相互之间无联系的分散经营的模式来说要高出许多，不论这一系统所涉及的是运送包裹和信件还是人员和飞机。他决定放手一搏，创建自己的企业。史密斯用父亲公司的投资和他自己继承财产的一部分购买了第一架快递飞机，并于1971年创建了联邦快递。',
            type: 'translation',
          },
          {
            correctOptionId: '',
            id: 't1-9',
            options: [],
            text: "The early days were underscored by extreme frugality and financial losses. It was not uncommon for FedEx drivers to pay for gasoline for their vans out of their own pockets. But despite such problems, Smith showed concern for the welfare of his employees. Just as he recalled, even when they didn't have the money, even when there weren't couches in the office and electric typewriters, they still set the precedent to ensure a good medical and dental plan for their people.",
            textCN:
              '最初的日子伴随着极度的拮据乃至财务损失。联邦快递公司的司机自己掏腰包为货车付汽油费的情况屡见不鲜。但是，尽管面对这样的问题，史密斯仍然为公司雇员的福利着想。正如他所回忆的那样，即使在他们公司没有钱、办公室没有沙发和打字机的情况下，他们仍然开辟先例，保证员工享受很好的医疗和牙齿保健福利。',
            type: 'translation',
          },
          {
            correctOptionId: '',
            id: 't1-10',
            options: [],
            text: 'Along the way, FedEx pioneered centralization and the "hub and spoke" system, which has since been adopted by almost all major airlines. The phrase FedEx it has become a fixture in our language as much as Xerox or Google.',
            textCN:
              '一路走来，联邦快递率先践行了集中调控和“轴辐式”空中交通系统。自它以后，该系统被几乎所有大航空公司所采纳。而“联邦快递一下”也成为了像“复印一下”或“谷歌一下”这样的固定说法，成为了我们的词汇。',
            type: 'translation',
          },
          {
            correctOptionId: '',
            id: 't1-11',
            options: [],
            text: 'Smith says success in business boils down to three things. First, you need to have appealing product or service and a compelling strategy. Then you need to have an efficient management system. Assuming you have those things, leading a team is the single most important issue in running an organization today.',
            textCN:
              '史密斯说生意上的成功归根结底就是三点：首先你需要一项吸引人的产品或服务以及一套制胜的战略；其次你需要一套高效的管理系统；在拥有这些之后，如何领导好一个团队就是当今经营一家公司最为重要的事了。',
            type: 'translation',
          },
          {
            correctOptionId: '',
            id: 't1-12',
            options: [],
            text: 'Although Smith avoids the media and the trappings of public life, he is said to be a friendly and accessible employer. He values his people and never takes them for granted. He reportedly visits FedEx\'s Memphis site at night from time to time and addresses sorters by name. For years he extended an offer to any courier with 10 years of service to come to Memphis for an "anniversary breakfast". That embodies Fred Smith\'s philosophy: People, Service, Profit (P-S-P). Smith says, "The P-S-P philosophy is like an unbroken circle or chain. There are no clearly definable points of entry or exit. Each link upholds the others and is, in turn, supported by them." In articulating this philosophy and in personally involving himself in its implementation, Frederick Smith is the forerunner of the new sphere of leadership that success in the future will demand.',
            textCN:
              '尽管史密斯回避媒体采访和公众生活的荣耀，但他却被称为是一位友善而平易近人的雇主。他重视自己的雇员，从不认为他们理所应当该为自己工作。有报道称，他会时不时在晚上造访联邦快递位于孟菲斯的基地，并且称名道姓地与包裹分拣人员打招呼。他会主动发邀请给任何一位已在公司服务十年的快递员，请他们到孟菲斯出席“周年庆典早餐”，这已经持续了很多年。而这其中包含了弗雷德·史密斯自己的哲学：人员，服务，利润（P-S-P）。史密斯说，“P-S-P的哲学理念就好像一个不可分割的循环，没有清晰可辨的入口或出口，每一个环节都支持着其他环节，同时也反过来受其他环节支撑。”通过明确表达并亲身践行这一理念，弗雷德里克·史密斯已成为未来成功所必需的新领导领域的开拓者。',
            type: 'translation',
          },
        ],
        title: '弗雷德·史密斯与联邦快递：一个改变了世界的创想',
        type: 'translation',
      },
      {
        description: '关于中美文化中语言和礼貌差异的文章翻译练习',
        id: 'translation-set-1',
        questions: [
          {
            correctOptionId: '',
            id: 't1-1',
            options: [],
            text: 'Once, at a dinner on the Monterey Peninsula, California, my mother whispered to me confidentially: "Sau-sau (brother\'s wife) pretends too hard to be a polite recipient! Why bother with such nominal courtesy? In the end, she always takes everything."  My mother acted like a waixiao, an emigrant, no longer patient with old taboos and courtesies. To prove her point, she reached across the table to offer my elderly aunt from Beijing the last scallop from the garlic seafood dish, along with the flank steak and the cucumber salad.  Sau-sau frowned. "B\'yao, zhen b\'yao!" she cried, patting her substantial stomach. I don\'t want it, really I don\'t.  "Take it! Take it!" my mother scolded in Chinese, as predictably as the lunar cycles.  "Full, I\'m already full," Sau-sau muttered weakly, eying the scallop.  "Ai!" exclaimed my mother. "Nobody wants it. It will only rot!"  Sau-sau sighed, acting as if she were doing my mother a favor by taking the scrap off the tray and sparing us the trouble of wrapping the leftovers in foil.',
            textCN:
              '有一次，在加州蒙特雷半岛上用餐时，我母亲私下悄悄地对我说：“嫂嫂想做个彬彬有礼的客人，但是装得太厉害了！何必费劲讲究形式上的客套呢？到最后她还是什么都要。” 我母亲行事像个“外侨”，即一个移民国外的侨民，因为她已经不耐烦老一套的禁忌和礼数了。为了证明她刚才的观点，她手伸过桌子，把蒜香海鲜拼盆里的最后一个扇贝，连同牛腩排及黄瓜沙拉一起，递给我从北京来的年长舅妈。 嫂嫂皱起了眉头，“不要，真不要！”她一边大声说一边拍着自己已经吃得很饱的肚子。我不要了，真的不要了。 “拿去吧！拿去吧！”我母亲用中文责备道。预料到她就会这样，就像月亮盈亏周期似的。 “饱了，我已经饱了，”嫂嫂低声嘀咕着，眼睛却瞟着扇贝。 “哎！”我母亲感叹着说，“没人愿意吃，只能让它坏掉了！” 嫂嫂叹了口气，从碟子上拿去了那个扇贝，就好像是帮了我母亲一个大忙，并省去了我们用箔纸将剩菜打包的麻烦似的。',
            type: 'translation',
          },
          {
            correctOptionId: '',
            id: 't1-2',
            options: [],
            text: 'My mother turned to her brother, an experienced Chinese magistrate, visiting us for the first time. "In America, a Chinese person could starve to death. If you don\'t breach the old rules of etiquette and say you want it, they won\'t ask you again."  My uncle nodded and said he understood fully: Americans take things quickly because they have no time to be polite.  I read an article in *The New York Times Magazine* on changes in New York\'s little cultural colony of Chinatown, where the author mentioned that the interwoven configuration of Chinese language and culture renders its speech indirect and polite. Chinese people are so "discreet and modest", the article started, that there aren\'t even words for "yes" and "no".  Why do people keep fabricating these rumors? I thought. They describe us as though we were a tribe of those little dolls sold in Chinatown tourist shops, heads moving up and down in contented agreement!',
            textCN:
              '我母亲转头看着她兄长——一位经验丰富的中国地方法官，这是他初次来看我们。她说：“在美国，一个中国人可能会饿死。要是你不打破老一套的礼数说你要吃，他们就不会再问你了。” 我舅舅点点头，说他完全理解：美国人待人接物快速迅捷，因为他们没有时间客气来客气去。 我在《纽约时报杂志》上读到过一篇文章，描述的是纽约市内的中国城这一小块文化聚居地的变迁。作者在文章中提到，中国语言与文化错综交织，使中文十分委婉和客套。中国人是如此“谨慎和谦虚”，文章开头写道，以至于他们都没有词语来表达“是”和“不是”。 我思索着，为什么人们会不断地编造这样的谣言呢？他们把我们描述得就像是唐人街旅游品商店里出售的一批小布娃娃。那些布娃娃的头不停地上下晃动，似乎对一切都心满意足，完全赞同。',
            type: 'translation',
          },
          {
            correctOptionId: '',
            id: 't1-3',
            options: [],
            text: 'As any child of immigrant parents knows, there is a special kind of double bind attached to knowing two languages. My parents, for example, spoke to me in both Chinese and English; I spoke back to them in English.  "Amy-ah!" they\'d scold me.  "What?" I\'d answer back.  "Do not question us when we call," they\'d scold in Chinese. "It\'s not respectful."  "What do you mean?"  "Ai! Didn\'t we just tell you not to question?"  If I consider my upbringing carefully, I find there was nothing discreet about the Chinese language I grew up with, no censorship for the sake of politeness. My parents made everything abundantly clear in their consecutive demands: "Of course you will become a famous aerospace engineer," they prodded. "And yes, a concert pianist on the side."  It seems that the more forceful proceedings always spilled over into Chinese: "Not that way! You must wash rice so not a single grain is lost."',
            textCN:
              '生于移民家庭的孩子都清楚，有一种特殊的两难境地与说两种语言的生活联系在一起。比如我父母，他们和我说话时中文和英文都用，但我和他们说话时只用英文。 “艾米啊！”他们会这样责备我。 “怎么啦？”我会回问道。 “我们叫你时，不要对我们反问，”他们会用中文训斥道“这是不礼貌的！” “你们什么意思？” “哎！我们不是刚刚说过，叫你不要反问吗？” 仔细想想自己的成长过程，我发现，我从小到大所接触到的中文并不是什么特别谨慎的语言，也不存在出于客气而对所说的话进行仔细检查的现象。我父母向我提一连串的要求时，总是把一切都表述得清清楚楚：“你当然会成为著名的航空工程师，”他们会鼓励我说，“对了，你业余时间还要做音乐会的钢琴师。” 似乎更加强硬的事情总是通过中文倾泻出来：“不能那样！你淘米的时候，必须一粒都不漏。”',
            type: 'translation',
          },
          {
            correctOptionId: '',
            id: 't1-4',
            options: [],
            text: 'Having listened to both Chinese and English, I\'m suspicious of comparisons between the two languages, as I notice the reciprocal challenges they each present. English speakers say Chinese is extremely difficult because different words can be denoted by very subtle variations in tone. English is often bracketed with the label of inconsistency, a language of too many broken rules.  Even more dangerous, in my view, is the temptation to view the gulf between different languages and behavior in translation. To listen to my mother speak English, an outside spectator might make the deduction that she has no concept of the temporal differences of past and future or that she is gender blind because she refers to my husband as "she". If one were not careful, one might also generalize that all Chinese people take an indirect route to get to the point. It is, rather, my mother\'s individual tendency to ornament her language and wander around a bit.',
            textCN:
              '由于一直同时听着中英文两种语言，故而我对它们之间的任何对比总是心存怀疑，因为我注意到它们各自都有对方所没有的难点。说英文的人会认为中文极其难，因为中文用非常微妙的声调变化就可以表示不同的词语。而英文则常常被认为缺乏一致性，因为英文具有太多不合规则的用法。 在我看来，更危险的做法是，人们往往倾向于通过翻译来理解不同语言和行为之间的差异。如果一个旁观的外人听我母亲说英语，可能会得出结论，说她对过去和将来这样的时间区别没有概念，或者认为她对人的性别不加区分，因为她提到我丈夫时总是说“她”。如果一个人对此类现象不假思虑，他也许还会概括说，所有中国人都是通过委婉迂回的方式才能说到话题重点的。而实际上喜欢修饰和绕弯子只是我母亲个人的说话风格。',
            type: 'translation',
          },
          {
            correctOptionId: '',
            id: 't1-5',
            options: [],
            text: 'I worry that the dominant society may see Chinese people from a limited perspective, hedging us in with the stereotype. I worry that the seemingly innocent stereotype may lead to actual intolerance and be part of the reason why there are few Chinese in top management positions, or in the main judiciary or political sectors. I worry about the power of language: If one says anything enough times, it might become true, with or without malicious intent.  Could this be why the Chinese friends of my parents\' generation are willing to accept the generalization?  "Why are you complaining?" one of them said to me. "If people think we are modest and polite, let them think that. Wouldn\'t Americans appreciate such an honorary description?"  And I do believe that anyone would take the description as a compliment — at first. But after a while, it annoys, as if the only things that people heard one say were what had been filtered through the sieve of social niceties: I\'m so pleased to meet you. I\'ve heard many wonderful things about you.',
            textCN:
              '我担心主流社会可能会从一个狭隘的角度、以一种成见看待中国人。我担心这种看似无害的成见实际会导致人们对中国人难以容忍，并成为中国人在高层管理职位或主要的司法及政府部门寥寥无几的部分原因。我担心语言的力量，即如果一个人将一件事说了很多遍，无论其是否有恶意，这件事都会变成事实。 这会不会就是我父母辈的中国朋友愿意接受那些对中国人的简单概括的原因呢？ “你为什么要抱怨呢？”他们中有人问我。“如果人们认为我们谦虚礼让，就让他们那样想好了。难道美国人不喜欢这种赞誉性的话吗？” 我当然相信每个人在一开始都会把这种描述的话当成称赞。但过了一段时间，这种话就会让人恼怒，就好像所听到的只是些经过细微的社交区别过滤后的言辞，诸如“很高兴认识你，我听到许多人都夸奖你”之类的话。',
            type: 'translation',
          },
          {
            correctOptionId: '',
            id: 't1-6',
            options: [],
            text: 'These remarks are not representative of new ideas, honest emotions, or considered thought. Like a piece of bread, they are only the crust of the interaction, or what is said from the polite distance of social contexts: greetings, farewells, convenient excuses, and the like. This generalization, therefore, is not a true composite of Chinese culture but only a stereotype of our exterior behavior.  "So how does one say \'yes\' and \'no\' in Chinese?" my friends may ask carefully.  At this junction, I do agree in part with *The New York Times Magazine* article. There is no one word for "yes" or "no", but not out of necessity to be discreet. If anything, I would say the Chinese equivalent of answering "yes" or "no" is specific to what is asked.  Ask a Chinese person if he or she has eaten, and he or she might say *chile* (eaten already) or *meiyou* (have not).  Ask, "Have you stopped beating your wife?" and the answer refers directly to the proposition being asserted or denied: stopped already, still have not, never beat, have no wife.  What could be clearer?',
            textCN:
              '这些话不能表达什么新观点，也不能传达什么真实的情感或深思熟虑的想法。它们就像一片面包，只是人们交往中最表层的东西，或社交场合下出于礼貌而说的一些话：问候、道别、顺口的托词，诸如此类。由此看来，那些对中国人的概括性评价并非是对中国文化成分的真实描述，而仅仅是对我们外在行为的一种成见而已。 “那么中文究竟怎么表达‘是’和‘不是’呢？”我的朋友也许会小心翼翼地问。 在这一点上，我的确在某种程度上同意《纽约时报杂志》的那篇文章。在中文里，没有哪一个字专门用于表达“是”或“不是”，但这并非是因为需要保持谨慎。若的确有什么不同的话，那我会说中文里对应的“是”或“不是”的表达通常是针对所问的具体内容而定的。 如果你问一个中国人是否吃饭了，他（或她）会说“吃了”（已经吃过）或“没有”（没有吃过）。 你若问：“你停止打老婆了吗？”他会直接就所断定或所否认的假设进行回答：已经停止了，还没有，从来不打，没有老婆。 还有什么能比这更清楚的呢？',
            type: 'translation',
          },
        ],
        title: '在美国说中文',
        type: 'translation',
      },
      {
        id: 'translation-set-1',
        title: '男人背负的重担',
        description:
          '关于男人和女人在社会中所承担的不同压力以及性别期望对他们的影响的文章翻译',
        type: 'translation',
        questions: [
          {
            id: 't1-1',
            type: 'translation',
            text: 'When I was a boy growing up off the grid in the Commonwealth of Virginia, the men I knew labored with their bodies from the first rooster crow in the morning to sundown. They were marginal farmers, shepherds, just scraping by, or welders, steelworkers, carpenters; they built cabinets, dug ditches, mined coal, or drove trucks, their forearms thick with muscle. They trained horses, stocked furnaces, made tires, stood on assembly lines, welding parts onto refrigerators or lubricating car engines. In the evenings and on weekends, they labored equally hard, working on their own small tract of land, fixing broken-down cars, repairing broken shutters and drafty windows. In their little free time, they drowned their livers in beer from cheap copper mugs at a bar near the local brewery or racetrack.',
            textCN:
              '当我还是个小男孩时，我住在弗吉尼亚州一个偏远的地区，那时我所认识的男人们从清晨的第一声公鸡啼鸣一直劳作到日落。他们都是些不起眼的农民、牧羊人，勉强度日，或是焊接工、钢铁工或木匠；他们制作橱柜、挖掘沟渠、开采煤炭，或驾驶卡车，这使他们拥有肌肉结实的上臂。他们训练马匹、填塞炉膛、制造轮胎，站在装配线上将零件焊接到冰箱，或是给汽车发动机上润滑剂。到了傍晚或周末，他们也要同样辛苦地劳作，在自己的一小片土地上耕作，修理出了问题的汽车，修复坏掉的百叶窗和漏风的窗户。在仅剩的闲暇时间里，他们会在当地的啤酒作坊或赛马场附近的酒馆里用盛在廉价铜杯中的啤酒将自己灌得烂醉。',
            options: [],
            correctOptionId: '',
          },
          {
            id: 't1-2',
            type: 'translation',
            text: 'The bodies of the men I knew were twisted and wounded in ways visible and invisible. Heavy lifting had given many of them spinal problems and appalling injuries. Some had broken ribs and lost fingers. Racing against conveyor belts had given some ulcers. Their ankles and knees ached from years of standing on concrete. Some had partial vision loss as the glow of the welding flame damaged their optic receptors. There were times, studying them, when I dreaded growing up. All around us, the fathers always seemed older than the mothers. Men wore out sooner, being martyrs of constant work. Only women lived into old age.',
            textCN:
              '我所认识的那些男人的身躯遭受着种种看得见或看不见的扭曲和伤痛。搬运沉重的物品给他们很多人造成了脊柱病和可怕的伤痛。有些人断了肋骨，掉了手指。在传输带上不停地工作使他们有些人患了溃疡。他们的脚踝和膝盖由于经年累月站立在水泥地上疼痛不已。有些人由于焊接火光损伤视觉感官而遭受部分视觉缺失的折磨。有些时候，打量着他们，我会害怕长大。在我们周围的人中，父亲们看上去总是比母亲们要老。男人衰老得更早，长期遭受着因持续劳作带来的病痛。只有女人才活到年老。',
            options: [],
            correctOptionId: '',
          },
          {
            id: 't1-3',
            type: 'translation',
            text: 'There were also soldiers, and so far as I could tell, they scarcely worked at all. But when the shooting started, many of them would die for their patriotism in fields and forts of foreign outposts. This was what soldiers were for — they were tools like a wrench, a hammer or a screw.',
            textCN:
              '还有士兵也是男人的工作。据我所知，他们几乎不工作，但当战争一打响，他们很多人都会出于爱国热情而战死在疆场或异域前哨的堡垒前。这就是士兵的作用——他们就像工具，如同扳钳、锤子或螺丝一样。',
            options: [],
            correctOptionId: '',
          },
          {
            id: 't1-4',
            type: 'translation',
            text: 'These weren’t the only destinies of men, as I learned from having a few male teachers, from reading books and from watching television. But the men on television — the news commentators, the lawyers, the doctors, the politicians who levied the taxes and the bosses who gave orders — seemed as remote and unreal to me as the figures in old paintings. I could no more imagine growing up to become one of these sophisticated people than I could imagine becoming a sovereign prince.',
            textCN:
              '这些并非男人们唯一的归宿，我从曾经有过的几位男教师、从看书及看电视中认识到了这一点。但是，那些上电视的男人们——新闻评论员、律师、医生、课征税款的政治家及发号施令的老板们——在我看来就像古老绘画上的人像，遥远而不真实。我不能想象自己长大变成这些精明世故的人中的一员，就像我无法想象自己能变成一个权力至高无上的国君一样。',
            options: [],
            correctOptionId: '',
          },
          {
            id: 't1-5',
            type: 'translation',
            text: 'A scholarship enabled me not only to attend college, a rare enough feat in my social circle, but even to traverse the halls of a historic university meant for the children of the rich. Here for the first time I met women who told me that men were guilty of having kept all the joys and privileges of the earth for themselves. I was puzzled, and demanded clarification. What privileges? What joys? I thought about the grim, wounded lives of most of the men back home. What had they allegedly stolen from their wives and daughters? The right to work five days a week, 12 months a year, for 30 or 40 years, wedged in tight spaces in the textile mills, or in the coal mines, struggling to extract every last bit of coal from the rock-hard earth? The right to die in war? The right to fix every leak in the roof, every gap in the fence? The right to pile banknotes high for a rich corporation in a city far away? The right to feel, when the lay-off came or the mines shut down, not only afraid but also ashamed?',
            textCN:
              '一份奖学金使我不仅得以考上大学，这是我社交圈子里极其难得的荣耀。不仅如此，它还让我能够穿行于为富人家的孩子打造的史上著名的大学殿堂里。就在这里，我生平头一次碰到女人告诉我说男人是有罪的，因为他们把地球上所有的欢乐和特权都据为己有。我被弄糊涂了，要求她们予以解释。什么特权？什么欢乐？我想到家乡大多数男人那种艰难严酷、伤痛累累的生活。人们所说的他们从妻子和女儿那儿偷走的东西又能是些什么呢？难道是每周五天、每年十二个月，如此三四十年里挤缩在纺织厂狭小的空间里，或是在煤矿下挣扎着从岩石般坚硬的泥土中挖出最后一点煤的劳作的权力？战死疆场的权力？修缮屋顶上每条裂缝和围栏上每个断栏的权力？为一个遥远的城市某个富裕财团堆积钱钞的权力？在遭遇解雇或煤矿倒闭时感到既害怕又羞耻的权力？',
            options: [],
            correctOptionId: '',
          },
          {
            id: 't1-6',
            type: 'translation',
            text: 'In this alien world of the rich, I was slow to understand the deep grievances of women. This was because, as a boy, I had envied them. Before college, the only people I had ever known who were interested in art or music or literature, the only ones who ever seemed to enjoy a sense of ease were the mothers and daughters. What’s more, they did not have to go to war. By comparison with the narrow, compartmentalized days of fathers, the comparatively lightweight work of mothers seemed expansive. They clipped coupons, went to see neighbors, or ran errands at school or at church. I saw their lives as through a telescope, all twinkling stars and shafts of light, missing the details that truly defined their days. No doubt, had I taken a more deductive look at their lives, I would have envied them less. I didn’t see, then, what a prison a house could be, since houses seemed to me brighter, handsomer places than any factory. As such things were never spoken of, I did not realize how often women suffered from men’s bullying. Even then I could see how exhausting it was for a mother to cater all day to the needs of young children. But, as a boy, if I had to choose between tending a baby and tending a machine, I think I would have chosen the baby.',
            textCN:
              '在这个满是富人的陌生世界里，我在理解女人们深深的怨怒方面很是迟钝。这是因为，当我还是一个小男孩时，我就嫉妒过她们。在上大学之前，我所认识的唯一对艺术、音乐或文学有兴趣的人，唯一看上去能够享受一丝自在的一群人就是那些做母亲和女儿的人。而且，她们也不必去参加战争。与父亲们所遭受的狭隘的、封闭的日子相比，母亲们所承担的相对较轻的工作显得更加宽泛一些。她们剪用购物券，探访邻居，在学校或教堂跑跑腿。我仿佛是透过望远镜看到她们的生活，满是闪烁的星星和一缕缕光线，而漏掉了她们生活岁月的真实细节。毋庸置疑，如果我用更具理性的方式审视她们的生活，我就不会那么嫉妒她们了。可在那时，我实在看不出一幢房子能成为什么样的牢狱，因为房子在我看来比任何厂房都更亮堂、更体面。我也没有意识到女人是多么频繁地遭受男人的欺凌，因为这样的事情从未被提及过。即使在那时，我也能够看出一个母亲整日忙碌着应付年幼孩子们的需要是多么地辛苦。但是，作为男孩，如果我那时必须在照顾婴儿和照看机器之间作选择，我想我会选择照顾婴儿。',
            options: [],
            correctOptionId: '',
          },
          {
            id: 't1-7',
            type: 'translation',
            text: 'So I was baffled when the women at college made a racket accusing me and my sex of having cornered the world’s pleasures. They demanded to be emancipated from the bonds of sexism. I think my bafflement has been felt by other boys (and by girls as well) who grew up in dirt-poor farm country, by the docks, in the shadows of factories — any place where the fates of men and women are symmetrically bleak and grim.',
            textCN:
              '所以，当学校里的女性大吵大嚷，谴责我和我所属的性别，说我们霸占着世间的欢乐时，我很困惑。她们要求从性别歧视的束缚中解放出来。我认为别的男孩（女孩也一样）也会有我这样的迷惑，只要他们成长于一贫如洗的农村，成长于码头边或工厂附近——成长于任何让男人和女人的命运同样苍白和严酷的地方。',
            options: [],
            correctOptionId: '',
          },
          {
            id: 't1-8',
            type: 'translation',
            text: 'When the women I met at college thought about the joys and privileges of men, they didn’t see the sort of men I had known. These daughters of privileged, Republican men wanted to inherit their fathers’ power and lordship over the world. They longed for a say over their future. But so did I. The difference between me and these daughters was that they saw me, because of my sex, as destined from birth to become like their fathers, and therefore as an enemy to their desires. But I knew better. I wasn’t an enemy to their desires, in fact or in feeling. I was an ally in their rebellion. If I had known, then, how to tell them so, or how to be a mediator, would they have believed me? Would they have known?',
            textCN:
              '当我在大学里遇到的那些女子们想到男人的享乐和特权时，她们并没有见过我以前认识的那些男人。这些特权阶层的、共和党男人的女儿们渴望继承她们父亲的权力和凌驾世界的贵族身份。她们渴望能对自己的未来拥有发言权。而我也渴望这样。我和这些女儿们之间的区别在于，她们看我时想到的是，我因为自己的性别而自出生起就注定可以成为像她们父亲那样的人，从而也是她们实现自己欲望的敌人。但我比她们更清楚，无论是事实上还是情感上，我都不是她们欲望的敌人。我是她们反抗行动的同盟者。如果那时我就知道如何把这些告诉她们，或如何在中间做一个调停人，她们会相信我吗？她们能够理解吗？',
            options: [],
            correctOptionId: '',
          },
          {
            id: 't1-9',
            type: 'translation',
            text: 'Now, many years later, as a man who has been privileged to share a life with some of the finest women I have ever known, I have come to understand the grievances of women in a more profound way. I have seen, in my own relationships and in the world around me, how the weight of gender expectations can crush the spirit and limit the potential of both men and women.',
            textCN:
              '许多年过去了，如今作为一个有幸与我所认识的最优秀的一些女性共享生活的男人，我对女性的怨愤有了更为深刻的理解。在我自己的人际关系以及我周围的世界中，我看到了性别期望的重负是如何摧毁人的精神、限制男人和女人的潜力的。',
            options: [],
            correctOptionId: '',
          },
          {
            id: 't1-10',
            type: 'translation',
            text: 'For men, the weight often manifests as a relentless pressure to provide, to succeed, to be strong and stoic in the face of adversity. We are taught from boyhood that we must be the breadwinners, the protectors, the pillars of the family. Any display of vulnerability or emotion is seen as a sign of weakness, and we learn to bury our feelings deep inside, even as they eat away at our souls. The physical toll of hard labor is matched by the emotional toll of suppressing our true selves.',
            textCN:
              '对男人而言，这种重负常常表现为一种无情的压力，要求我们去供养家庭、取得成功、在逆境面前坚强隐忍。从孩童时期我们就被教导，必须成为养家糊口的人、保护者、家庭的顶梁柱。任何脆弱或情感的表露都被视为软弱的标志，于是我们学会把自己的感受深埋心底，即便这些感受正蚕食着我们的灵魂。繁重劳作带来的身体损耗，与压抑真实自我造成的情感损耗相当。',
            options: [],
            correctOptionId: '',
          },
          {
            id: 't1-11',
            type: 'translation',
            text: 'And yet, in the pursuit of these ideals, we often lose sight of the fact that women also bear a heavy burden — not just the burden of domesticity and caregiving, but also the burden of fighting against societal expectations and gender stereotypes. They are expected to be nurturing and selfless, yet also ambitious and successful. They are criticized for being too aggressive or too passive, too emotional or too cold. The contradictions are endless, and the pressure can be overwhelming.',
            textCN:
              '然而，在追求这些理想的过程中，我们常常忽视这样一个事实：女性也背负着沉重的负担——不仅有家务和照料他人的负担，还有对抗社会期望和性别成见的负担。人们期望她们富有爱心、无私奉献，同时又要雄心勃勃、事业有成。她们会因过于强势或过于被动、过于情绪化或过于冷漠而受到指责。这些矛盾无穷无尽，压力也可能让人难以承受。',
            options: [],
            correctOptionId: '',
          },
          {
            id: 't1-12',
            type: 'translation',
            text: 'As I reflect on the men I knew as a boy and the women I have loved and respected throughout my life, I realize that the weight we carry is not just a personal burden, but a collective one. It is a burden born of centuries of gender roles and societal norms that have confined us all in one way or another. To truly ease this weight, we must challenge these outdated beliefs and work towards a more equitable and compassionate society — one where both men and women are free to be themselves, to pursue their dreams, and to support one another without fear or judgment.',
            textCN:
              '当我回想起小时候认识的那些男人，以及我一生中爱过并尊重的那些女人时，我意识到我们背负的重负不只是个人的，更是集体的。它源于几个世纪以来的性别角色和社会规范，这些规范以这样或那样的方式限制着我们所有人。要真正减轻这一重负，我们必须挑战这些过时的观念，努力构建一个更公平、更有同情心的社会——一个男人和女人都能自由做自己、追求梦想、相互支持而无需恐惧或评判的社会。',
            options: [],
            correctOptionId: '',
          },
        ],
      },
      {
        id: 'translation-set-1',
        title: 'unit7 Text A英译汉练习',
        description: 'unit7 Text A文章的英译汉练习',
        type: 'translation',
        questions: [
          {
            id: 't1-1',
            type: 'translation',
            text: 'Two hundred years ago, the world experienced an energy revolution that launched the Industrial Age. Ever since then, with the rapid increase of population density, the industrialized world’s thirst for energy has more than tripled. Petroleum and natural gas are exploited as versatile and high quality energy products. Uranium is also tapped to fuel nuclear reactors and provide atomic energy.',
            textCN:
              '两百年前，全球经历了一场能源革命，由此引发了工业时代的到来。从那时起，随着人口密度的迅速增加，工业国家对于能源的需求成倍成倍增加。石油和天然气被看作是用途多、质量好的能源产品而得到开发，而铀也得以开发，为核反应堆提供燃料并供应原子能源。',
            options: [],
            correctOptionId: '',
          },
          {
            id: 't1-2',
            type: 'translation',
            text: 'Cheap energy is the lifeblood of human society. But there is a dark side to the near monopoly of non-renewable fossil fuels like coal, oil and natural gas, along with controversial uranium, to supply our growing energy demands. The supply of these fuels is physically limited, and their use threatens our health and environment. Multiple international treaties have been proposed to limit the use of fossil fuels for this very reason. Fears of global warming aside, burning fossil fuels releases chemicals and particulates that can cause breathing problems, cancer as well as brain and nerve damage. Nuclear energy, once hailed as “too cheap to meter”, has never been economically successful when all costs are factored in. Furthermore, public opinion polls show nuclear energy is too closely associated with disasters like the Chernobyl reactor meltdown and the Fukushima explosion, and with the danger that rebel insurgents could do damage with the toxic waste. Inexpensive and seemingly abundant non-renewable energy from dead plants and extinct animals fueled the 20th century economy, but geologists, climatologists, environmentalists, and many others are warning that the honeymoon may soon be over.',
            textCN:
              '廉价能源是人类社会的命脉。但是，对煤炭、石油、天然气这些不可再生的矿物燃料及有争议的铀进行近乎垄断地使用以满足我们日益增长的对能源的需求的做法有其危险的一面。这些燃料的供应实际上是有限的，并且，使用这些燃料对我们的健康和环境都造成威胁。正因如此，人们制定了众多的国际条约，以限制对矿物燃料的使用。除了造成全球变暖之外，矿物燃料在燃烧过程中还会释放出某些化学物质和微粒，引发呼吸系统疾病、癌症，并造成对大脑和神经的损伤。如果把所有代价都考虑进来的话，曾经被称颂为“便宜到无法计量”的核能从经济效益上来说则从未获得过成功。而且，民意调查显示，核能被认为与灾难密切相关，例如切尔诺贝利核反应堆熔毁事件及福岛电站爆炸事件。同时，核能还有一种危险，就是叛乱分子可能利用其有毒废物制造伤害。死去的植物和动物所产生的价格低廉且看似充足的非再生能源推动了20世纪的经济发展，但地理学家、气候学家、环境学家以及其他许多人都在警告我们：这样美好的时光很快就要结束了。',
            options: [],
            correctOptionId: '',
          },
          {
            id: 't1-3',
            type: 'translation',
            text: 'At some indefinite time in the near future, the last drop of oil, lump of coal or wisp of natural gas will be collected from the earth. The eventual depletion of fossil fuels that hitherto proved so reliable has left us with no choice but to prepare for a new age of energy synthesis. Most certainly, human demand for energy will not decrease or plateau but surge as world population grows to nine billion over the next 50 years. By the year 2020, world energy consumption is projected to show a linear increase of 50 percent.',
            textCN:
              '在不久的将来的某个时候，地球上最后一滴石油、最后一块煤或最后一缕天然气将被开采。迄今为止一直被证明是稳定可靠的矿物燃料终将消失，这让我们别无选择，只能作好准备，迎接新的能源综合利用时代的到来。可以肯定，人类对能源的需求不会趋于减少或保持稳定，而是会随着世界人口在未来50年增长到90亿而迅速增加。据预测，到2020年，全球的能源消耗将直线增长50%。',
            options: [],
            correctOptionId: '',
          },
          {
            id: 't1-4',
            type: 'translation',
            text: 'How will we meet the sky-rocketing energy demands of the future? Until we perfect the technology of cold fusion, we’ll have to focus on the development and increased production of energy from renewable energy source — sun, wind, water, and so on. While renewable energy sources are promising, an international confederation of scientists and engineers is working feverishly to overcome the various obstacles associated with these “new energy” technologies. The major challenge is to develop efficient and economically workable versions of these technologies.',
            textCN:
              '我们怎样才能满足未来急剧增长的能源需求呢？在我们完善冷聚变技术之前，我们只能专注于开发太阳能、风能、水电能之类的可再生能源，并提高其产量。虽然可再生能源前景乐观，一个由科学家和工程师组成的国际联盟却正在积极工作，努力克服与这些“新兴能源”技术相关的各种障碍，其中最大的挑战就是如何使这些技术变得既高效又经济。',
            options: [],
            correctOptionId: '',
          },
          {
            id: 't1-5',
            type: 'translation',
            text: 'Take solar energy for example. It is a good option because there is an unlimited supply of glittering sunlight. Making it work on a large scale, however, is much easier said than done. It would be cost prohibitive to take the intricate gadgets of solar energy from the fringe of “green” society to the mainstream for major world consumption. The solar apparatus itself is ready for many new business and consumer applications, but it is way too expensive to replace the old combustion machinery of gears and motors with new electronic technology of semiconductors and transistors on a global or even a national scale.',
            textCN:
              '以太阳能为例。由于耀眼的太阳光能够提供源源不断的能源，所以它是个不错的选择。但是，大规模地使用太阳能却是说起来容易做起来难。把制造太阳能所需要的复杂零件从“环保”社会的边缘推广到主流社会，使之成为世界主要的消费性能源，其代价之高让人望而却步。太阳能设备本身已是技术成熟，可以使商业和消费者进行许多新型应用，但是，在全球或者即便是在全国范围内，用新型的半导体和晶体管电子技术取代老式的用齿轮和发动机驱动的燃烧设备，其成本实在太高。',
            options: [],
            correctOptionId: '',
          },
          {
            id: 't1-6',
            type: 'translation',
            text: 'Wind power, which has been used effectively in some places for generations, is also rapidly growing in the energy market. The principle behind it is that wind converts rotary force into electricity by turning the blades of the turbine clockwise or counterclockwise around an axis. Unfortunately, wind power is very unreliable and its strength depends on local weather patterns, temperature, time of year, and location. In addition to this unreliability, wind power equipment is very expensive compared with other energy sources and won’t become a viable alternative until we can slash the costs significantly. Also, a “wind farm” requires enormous land clearing to produce significant amounts of energy.',
            textCN:
              '风能在一些地方已经被几代人有效利用，目前在能源市场中也发展迅速。风能的原理是：风通过驱动涡轮机叶片按顺时针或逆时针方向绕着一个轴旋转，从而把转动时所产生的力转换成电能。不幸的是，风能非常不稳定，其强度取决于当地的天气模式、温度、季节以及地域。除了不稳定的因素之外，和其他能源相比，风能设备造价昂贵。除非我们能将其成本大大降低，否则风能就不会成为一个可行的替代能源。而且，一个“风能农场”需要大片空旷的土地才能生产大量能源。',
            options: [],
            correctOptionId: '',
          },
          {
            id: 't1-7',
            type: 'translation',
            text: 'Hydroelectric power is another source of clean and renewable energy. It can be harnessed by controlling the natural outflow of water with different methods. The most popular is through dams, which, unfortunately, are no longer considered environmentally friendly. Most of the hydroelectric dams in the world are historically recent, but all reservoirs eventually will fill up with mud and require very expensive excavation to clear them up to become useful again.',
            textCN:
              '水力电能是另外一种既干净又能再生的能源。人们可以通过不同方法来控制自然水流以进行发电。最普遍的方法是通过水坝，但不幸的是，建水坝已被认为是对环境不利的方法了。世界上大多数用于水力发电的大坝建造历史都不长，但是所有的水库最终都会被淤泥填塞，需要耗资巨大进行清淤才能使它们重新得到利用。',
            options: [],
            correctOptionId: '',
          },
          {
            id: 't1-8',
            type: 'translation',
            text: 'Biomass energy derived from plant and animal matter is still another renewable source being considered as a standby replacement for fossil fuels. Organic waste in the form of dead trees, leaves, animal corpses and food processing waste exists in abundance and can be used to produce energy. However, there is no way to ventilate the direct burning of biomass as fuel without diffusing carbon dioxide and other greenhouse gases into the atmosphere. These gases can pose a risk to the ozone layer, increasing overall exposure of human beings to harmful UV rays from the sun. Besides, it takes time and money to collect and transport biomass in its raw form to a central point for processing into fuel, and the automation of such a process is too difficult. So, for the time being, biomass has too many costly drawbacks to be a workable alternative to fossil fuels.',
            textCN:
              '动植物物质所产生的生物能源也是一种可再生能源，且被认为是矿物燃料的备用替代品。以死树、枯叶、动物尸体以及食品加工废料的形式存在的有机废物十分充足，可以被用来制造能源。然而，将生物质作为燃料直接燃烧，通风时必然会将二氧化碳及其他温室气体排放到大气中。这些气体会对臭氧层造成威胁，增加人们受到来自太阳的有害紫外线照射的危险。除此以外，将生物质以原始形态进行收集，并将它们运送到某个中心站加工处理成燃料，这一过程既耗时又耗财，而且对这一过程实现自动化非常困难。所以，在目前，生物质能源有太多高成本方面的缺点，不能成为矿物燃料可行的替代品。',
            options: [],
            correctOptionId: '',
          },
          {
            id: 't1-9',
            type: 'translation',
            text: 'Although renewable energies are not yet economically competitive with fossil fuels, their price becomes more attractive when compared with the health and environmental costs associated with burning coal and oil. Perhaps the best solution to our growing energy challenges comes in a bulletin from the Union of Concerned Scientists: “Our society’s future success cannot hinge on one single solution. The answer instead must come from a family of diverse energy technologies that share a unified purpose — they do not deplete our natural resources or destroy our environment.” Despite the difficulties, it is important to remember that an energy crisis is approaching at supersonic speeds and will soon be upon us. In order to inaugurate a new era in energy, we must act quickly and work toward international collaboration to find the most effective solutions to our energy problems.',
            textCN:
              '虽然从经济实惠方面来说，可再生能源没有矿物能源有竞争力，但是，与燃烧煤和石油所带来的健康及环境代价相比，它们的价格又变得较有吸引力了。也许，对于日益紧迫的能源挑战，最好的解决办法正如“忧思科学家联盟”所出的一份简报上所说的那样：“未来我们社会的成功不能依赖于某一单一的解决方案。相反，答案须来自一系列各种不同的能源技术。这些技术有一个共同目的：它们不会耗尽我们的自然资源，也不会破坏我们的环境。”尽管困难重重，我们需要牢记的是，能源危机正以超音速逼近，即将来到我们面前。为了在能源领域开创一个新时代，我们必须赶快行动，努力寻求国际合作，以找到能源问题最有效的解决办法。',
            options: [],
            correctOptionId: '',
          },
        ],
      },
    ],
  },
];

// 导出初始化后的题库数据
export const questionData = initQuestionSetsData(rawQuestionData);
