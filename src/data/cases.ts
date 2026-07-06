import type { CaseStudy } from "../types";

export const cases: CaseStudy[] = [
  {
    id: "iraq-1990s-sanctions",
    track: "sanctions",
    country: "Iraq",
    period: "1990s",
    policy: "UN comprehensive sanctions after Iraq's invasion of Kuwait",
    question: "Did sanctions work in the case of Iraq?",
    summary: {
      quickSummary: "After Iraq invaded Kuwait in 1990, the UN imposed comprehensive economic and trade sanctions.",
      whatWasHappening: "Saddam Hussein's regime invaded neighboring Kuwait. The international community responded with a massive coalition to push Iraq out, followed by strict UN sanctions to prevent Iraq from rebuilding its military and to force cooperation with weapons inspectors.",
      policyUsed: "Comprehensive economic and trade sanctions linked to UN resolutions.",
      policyGoal: "To reverse aggression, compel compliance with weapons inspections, and constrain Iraq's military capacity.",
      whyHardToJudge: "Iraq is a difficult case because success depends heavily on the goal. If the goal was to force Saddam Hussein from power, sanctions failed. If the goal was to contain Iraq’s military capacity after the Gulf War, they may have succeeded. Additionally, the comprehensive sanctions caused devastating civilian harm, making it ethically complex.",
      possibleSuccessAngles: [
        "Military containment",
        "Behavior change (inspections compliance)",
        "Regime change",
        "Minimizing civilian harm"
      ]
    },
    successCriteria: [
      { id: "behavior_change", label: "Behavior change", explanation: "Did Iraq withdraw from Kuwait and comply with UN weapons inspections?" },
      { id: "containment", label: "Containment", explanation: "Did the policy prevent Iraq from rebuilding its military capacity?" },
      { id: "regime_change", label: "Regime change", explanation: "Did the policy force a change in leadership?" },
      { id: "civilian_harm", label: "Civilian harm", explanation: "Did the policy avoid serious harm to ordinary people?" }
    ],
    evidenceCards: [
      { id: "iraq-goal", title: "UN Security Council Resolution 687", text: "UN Resolution 687 required Iraq to unconditionally accept the destruction, removal, or rendering harmless of all chemical and biological weapons, ballistic missiles with a range greater than 150 km, and nuclear weapons-usable materials.", type: "policy_goal", whyItMatters: "This establishes the official goal of the sanctions.", limitation: "Official goals sometimes hide unofficial goals (like regime change).", sourceTitle: "UN Security Council", sourceUrl: "https://main.un.org/securitycouncil/en/sanctions/information" },
      { id: "iraq-success", title: "Destruction of Weapons (1991-1998)", text: "Between 1991 and 1998, UN weapons inspectors (UNSCOM) oversaw the destruction of 40,000 chemical munitions, 690 tons of chemical weapons agents, and 48 operational missiles in Iraq.", type: "success_evidence", whyItMatters: "Provides data showing Iraq's military capacity was significantly reduced.", limitation: "Does not prove if Iraq had hidden weapons or intended to rebuild." },
      { id: "iraq-harm", title: "UNICEF 1999 Report on Child Mortality", text: "A 1999 UNICEF survey found that the under-five mortality rate in central and southern Iraq more than doubled from 56 deaths per 1,000 live births (1984-1989) to 131 deaths per 1,000 (1994-1999).", type: "failure_or_harm", whyItMatters: "Provides statistical evidence of massive civilian harm.", limitation: "Some argue Saddam Hussein's domestic policies also caused this." },
      { id: "iraq-civilian-impact", title: "Food Rations and Elite Wealth", text: "While ordinary citizens survived on government food rations of 1,300-2,200 calories a day (below minimum requirements), Saddam Hussein continued to build lavish palaces throughout the 1990s.", type: "civilian_or_social_impact", whyItMatters: "Demonstrates how economic sanctions disproportionately affected civilians over elites.", limitation: "The sanctions regime created the 'Oil-for-Food' program to address this, though it was flawed." },
      { id: "iraq-mechanism", title: "Oil Export Revenue Drop", text: "Before 1990, Iraq exported over 2.5 million barrels of oil per day. By 1991, due to the embargo, oil exports dropped to near zero, depriving the regime of 95% of its foreign exchange earnings.", type: "mechanism", whyItMatters: "Shows exactly how the sanctions crippled Iraq's economy.", limitation: "The regime adapted through smuggling and the black market." },
      { id: "iraq-alternative", title: "Operation Desert Fox (1998)", text: "In 1998, after Iraq halted cooperation with UN inspectors, the US and UK launched a 4-day bombing campaign (Operation Desert Fox) targeting Iraq's military and WMD infrastructure.", type: "alternative_explanation", whyItMatters: "Suggests military force, not just economic sanctions, was used to constrain Iraq.", limitation: "The bombing campaign ended weapons inspections for years." },
      { id: "iraq-comparison", title: "Post-2003 Findings", text: "Following the 2003 US invasion, the Iraq Survey Group (Duelfer Report) concluded that Iraq had secretly destroyed its WMD stockpiles in 1991 but intended to restart the programs once sanctions were lifted.", type: "comparison_problem", whyItMatters: "Shows the sanctions were keeping the WMD program dormant.", limitation: "The intelligence leading up to 2003 was highly flawed." },
      { id: "iraq-missing", title: "Saddam's Internal Deliberations", text: "Secret recordings of Saddam Hussein's cabinet meetings (captured in 2003) revealed that he prioritized regime survival above all else and feared Iran more than the US.", type: "missing_evidence", whyItMatters: "Explains why sanctions failed to change his behavior—he feared looking weak to domestic rivals and Iran.", limitation: "We only got this evidence after the regime was destroyed." }
    ],
    sources: [
      { title: "UN Security Council sanctions information", url: "https://main.un.org/securitycouncil/en/sanctions/information" },
      { title: "UNICEF 1999 Iraq Child Mortality Survey", url: "https://www.unicef.org/media/media_14959.html" },
      { title: "Duelfer Report (CIA)", url: "https://www.cia.gov/readingroom/docs/DOC_0001127022.pdf" }
    ],
    teacherNote: "Good for distinguishing containment, coercion, regime change, and humanitarian standards of success."
  },
  {
    id: "iran-nuclear-sanctions",
    track: "sanctions",
    country: "Iran",
    period: "2000s-2010s",
    policy: "Nuclear and financial sanctions linked to diplomacy",
    question: "Did sanctions work in the case of Iran?",
    summary: {
      quickSummary: "Iran faced UN, US, and EU sanctions tied to concerns about its nuclear program, leading to the 2015 JCPOA agreement.",
      whatWasHappening: "Concerns grew internationally that Iran's nuclear program was designed to build a weapon. The US, EU, and UN imposed escalating sanctions targeting Iran's oil exports and financial system to force them to the negotiating table.",
      policyUsed: "Financial and oil sanctions linked to diplomatic negotiations.",
      policyGoal: "To pressure Iran into negotiations, limits, and monitoring of nuclear activities.",
      whyHardToJudge: "The 2015 JCPOA makes the case look like partial success if the benchmark is bargaining or temporary nuclear limits. However, the later unraveling of the agreement shows how fragile that success could be. It is hard to know if the sanctions alone worked, or if they only worked because of the diplomatic incentives offered alongside them.",
      possibleSuccessAngles: [
        "Creating bargaining pressure",
        "Changing nuclear behavior",
        "Long-term sustainability of the agreement",
        "Minimizing civilian harm"
      ]
    },
    successCriteria: [
      { id: "bargaining_pressure", label: "Bargaining pressure", explanation: "Did sanctions help push the target toward negotiation?" },
      { id: "behavior_change", label: "Behavior change", explanation: "Did Iran accept limits and monitoring on its nuclear program?" },
      { id: "sustainability", label: "Sustainability", explanation: "Did the policy produce a lasting resolution?" },
      { id: "civilian_harm", label: "Civilian harm", explanation: "Did the policy avoid serious harm to ordinary people?" }
    ],
    evidenceCards: [
      { id: "iran-goal", title: "UN Security Council Resolution 1929", text: "UN Resolution 1929 (2010) demanded that Iran suspend all enrichment-related and reprocessing activities, and prohibited Iran from acquiring any commercial interest in another State involving uranium mining.", type: "policy_goal", whyItMatters: "Sets the baseline goal of the international community.", limitation: "Later negotiations (JCPOA) allowed limited enrichment, shifting the goalpost." },
      { id: "iran-success", title: "The 2015 JCPOA Agreement", text: "In 2015, Iran agreed to the JCPOA. Under the deal, Iran dismantled two-thirds of its centrifuges, gave up 98% of its enriched uranium stockpile, and allowed 24/7 IAEA monitoring.", type: "success_evidence", whyItMatters: "Provides concrete data that Iran significantly curtailed its nuclear program.", limitation: "The restrictions were temporary (sunset clauses) and the US later withdrew." },
      { id: "iran-harm", title: "US Withdrawal (2018)", text: "In 2018, the US unilaterally withdrew from the JCPOA and reimposed 'maximum pressure' sanctions. By 2020, Iran had resumed enriching uranium far beyond the deal's limits.", type: "failure_or_harm", whyItMatters: "Shows that the sanctions-induced behavior change was not sustainable.", limitation: "The failure was political (US withdrawal), not necessarily a failure of the sanctions themselves." },
      { id: "iran-civilian-impact", title: "Inflation and Medicine Shortages", text: "In 2012, Iran's inflation rate hit 30%, and the Rial lost half its value. While medicine was technically exempt from sanctions, global banks refused to process Iranian payments, causing severe shortages of life-saving drugs.", type: "civilian_or_social_impact", whyItMatters: "Shows that 'smart' financial sanctions still caused massive civilian suffering.", limitation: "The Iranian government also mismanaged its domestic economy." },
      { id: "iran-mechanism", title: "SWIFT Disconnection (2012)", text: "In 2012, the EU banned Iranian banks from SWIFT (the global financial messaging system). This effectively cut Iran out of the global banking network, making it nearly impossible to receive payment for oil.", type: "mechanism", whyItMatters: "Demonstrates a highly effective, modern tool of financial isolation.", limitation: "This forced Iran to develop alternative banking channels and trade in local currencies." },
      { id: "iran-alternative", title: "The Election of Hassan Rouhani", text: "In 2013, Hassan Rouhani, a moderate who campaigned on improving the economy and ending isolation, was elected President of Iran, defeating hardline candidates.", type: "alternative_explanation", whyItMatters: "Suggests domestic politics, not just external sanctions, opened the door to a deal.", limitation: "Rouhani was likely elected precisely because the sanctions were hurting so much." },
      { id: "iran-comparison", title: "Oil Export Halved", text: "Between 2011 and 2013, due to coordinated US and EU sanctions, Iran's oil exports fell from 2.5 million barrels a day to just over 1 million, costing the regime billions.", type: "comparison_problem", whyItMatters: "A clear metric showing the economic bite of the sanctions.", limitation: "China and India continued to buy some Iranian oil, preventing total collapse." },
      { id: "iran-missing", title: "Supreme Leader's Calculations", text: "Ayatollah Khamenei famously distrusts the West. We lack internal memos detailing exactly what convinced him to authorize the 2015 nuclear negotiations despite his deep skepticism.", type: "missing_evidence", whyItMatters: "Leaves us guessing what the tipping point was for the regime's leadership.", limitation: "This information is highly classified in Iran." }
    ],
    sources: [
      { title: "IAEA: Iran", url: "https://www.iaea.org/newscenter/focus/iran" },
      { title: "EU restrictive measures against Iran", url: "https://www.consilium.europa.eu/en/policies/sanctions/iran/" },
      { title: "US Treasury: Iran sanctions", url: "https://home.treasury.gov/policy-issues/financial-sanctions/sanctions-programs-and-country-information/iran-sanctions" }
    ],
    teacherNote: "Useful for showing that sanctions may support negotiations without guaranteeing durable policy change."
  },
  {
    id: "south-africa-apartheid-sanctions",
    track: "sanctions",
    country: "South Africa",
    period: "1970s-1990s",
    policy: "Apartheid-era sanctions, divestment, boycotts, and diplomatic pressure",
    question: "Did sanctions work in the case of South Africa?",
    summary: {
      quickSummary: "International sanctions, divestment campaigns, and sports boycotts targeted South Africa's apartheid system, leading eventually to majority rule.",
      whatWasHappening: "The white minority government maintained apartheid, a system of institutionalized racial segregation and discrimination. A global anti-apartheid movement pushed for boycotts, divestment, and sanctions to isolate the regime.",
      policyUsed: "Diplomatic isolation, trade sanctions, sports boycotts, and corporate divestment.",
      policyGoal: "To delegitimize apartheid and raise costs for the government until it dismantled the system.",
      whyHardToJudge: "The transition to negotiations and majority rule depended heavily on internal resistance, labor action, and economic change. It is hard to know whether the external sanctions or the internal social movements mattered more. A careful judgment avoids claiming that sanctions alone ended apartheid.",
      possibleSuccessAngles: [
        "International delegitimation",
        "Economic pressure on the regime",
        "Changing the government's behavior",
        "Supporting internal resistance"
      ]
    },
    successCriteria: [
      { id: "behavior_change", label: "Behavior change", explanation: "Did the government transition to negotiations and majority rule?" },
      { id: "bargaining_pressure", label: "Bargaining pressure", explanation: "Did sanctions put pressure on the apartheid regime?" },
      { id: "norm_enforcement", label: "International delegitimation", explanation: "Did the policy signal that apartheid was unacceptable globally?" }
    ],
    evidenceCards: [
      { id: "sa-goal", title: "Comprehensive Anti-Apartheid Act (US 1986)", text: "The US Congress passed the CAAA, overriding President Reagan's veto. It banned new investments, bank loans, and imports of South African agricultural products, iron, and steel, demanding the release of Nelson Mandela and an end to apartheid.", type: "policy_goal", whyItMatters: "Shows the specific legal demands and economic scope of the sanctions.", limitation: "Took decades of activism to finally pass." },
      { id: "sa-success", title: "De Klerk Unbans the ANC (1990)", text: "In 1990, South African President F.W. de Klerk unbanned the African National Congress (ANC), released Nelson Mandela, and announced the beginning of negotiations to end apartheid.", type: "success_evidence", whyItMatters: "This is the ultimate behavior change the sanctions sought.", limitation: "De Klerk cited internal violence and the end of the Cold War as his primary reasons, not just sanctions." },
      { id: "sa-harm", title: "Impact on Black Workers", text: "Chief Mangosuthu Buthelezi, a prominent Black South African leader, argued in 1986 that sanctions and divestment would destroy jobs for Black workers and plunge them into deeper poverty.", type: "failure_or_harm", whyItMatters: "Highlights the ethical debate about whether sanctions hurt the oppressed people they aim to help.", limitation: "The ANC and many unions explicitly supported sanctions despite the costs." },
      { id: "sa-civilian-impact", title: "The Chase Manhattan Debt Crisis (1985)", text: "In 1985, following massive protests, Chase Manhattan Bank and others refused to roll over short-term loans to South Africa, plunging the country into a severe debt crisis and currency collapse.", type: "civilian_or_social_impact", whyItMatters: "Proves that private corporate divestment often hurt the regime faster than government policy.", limitation: "The government responded by defaulting on debt and imposing capital controls." },
      { id: "sa-mechanism", title: "Sports Boycotts", text: "South Africa was banned from the Olympics starting in 1964 and expelled from international cricket and rugby. A popular slogan was 'No normal sport in an abnormal society.'", type: "mechanism", whyItMatters: "Shows that psychological and cultural isolation can be as painful as economic sanctions.", limitation: "Sports boycotts alone do not topple governments." },
      { id: "sa-alternative", title: "Internal Strikes and UDF", text: "In the 1980s, the United Democratic Front (UDF) coordinated massive internal resistance, while the Congress of South African Trade Unions (COSATU) organized millions of workers in crippling nationwide strikes.", type: "alternative_explanation", whyItMatters: "Provides strong evidence that internal revolution, not external sanctions, was the primary driver of change.", limitation: "The strikes and external sanctions worked together synergistically." },
      { id: "sa-comparison", title: "Economic Growth Rates", text: "South Africa's GDP growth fell from an average of 5.8% in the 1960s (pre-sanctions) to just 1.5% in the 1980s (peak sanctions).", type: "comparison_problem", whyItMatters: "Provides a clear metric of economic stagnation under sanctions.", limitation: "Global recessions and the falling price of gold also contributed to this decline." },
      { id: "sa-missing", title: "F.W. de Klerk's Internal Memos", text: "While de Klerk publicly claimed sanctions did not force his hand, historians debate how much the looming economic collapse privately influenced the National Party's decision to negotiate.", type: "missing_evidence", whyItMatters: "The psychological impact of sanctions on leadership is hard to measure.", limitation: "Politicians rarely admit to caving to foreign pressure." }
    ],
    sources: [
      { title: "UN Digital Library", url: "https://digitallibrary.un.org/" },
      { title: "South African History Online", url: "https://www.sahistory.org.za/" }
    ],
    teacherNote: "Ask students to separate external leverage from the agency of South African movements."
  },
  {
    id: "russia-2014-2022-sanctions",
    track: "sanctions",
    country: "Russia",
    period: "2014-present",
    policy: "Sanctions after Crimea and expanded sanctions after the 2022 full-scale invasion of Ukraine",
    question: "Did sanctions work in the case of Russia?",
    summary: {
      quickSummary: "Russia faced sanctions after the 2014 seizure of Crimea, and much broader financial, trade, energy, and technology sanctions after the 2022 full-scale invasion of Ukraine.",
      whatWasHappening: "Russia launched a full-scale invasion of Ukraine in 2022. Western countries responded with massive coordinated economic sanctions intended to cripple Russia's war machine.",
      policyUsed: "Targeted and comprehensive economic, financial, energy, and technological sanctions.",
      policyGoal: "To impose costs, constrain war capacity, and signal opposition to aggression.",
      whyHardToJudge: "The conflict is ongoing. Sanctions clearly have not stopped the war (immediate behavior change), but they have constrained the Russian economy and military supply chains (long-term pressure). Students must distinguish between stopping the war immediately and raising the long-term cost of fighting it.",
      possibleSuccessAngles: [
        "Immediate behavior change (withdrawal)",
        "Military and strategic constraint",
        "Economic degradation",
        "Norm enforcement"
      ]
    },
    successCriteria: [
      { id: "behavior_change", label: "Behavior change", explanation: "Did Russia stop the invasion or withdraw forces?" },
      { id: "containment", label: "Military constraint", explanation: "Did sanctions limit Russia's ability to supply its military?" },
      { id: "norm_enforcement", label: "Norm enforcement", explanation: "Did the policy signal strong international opposition to aggression?" }
    ],
    evidenceCards: [
      { id: "russia-goal", title: "G7 Statement on Sanctions", text: "In 2022, the G7 stated the goal was to 'isolate Russia from the global financial system' and 'degrade Russia’s ability to equip and supply its military' in response to the invasion of Ukraine.", type: "policy_goal", whyItMatters: "Shows the goal is military degradation and financial isolation, not necessarily immediate withdrawal.", limitation: "A degraded military can still fight for years." },
      { id: "russia-success", title: "Central Bank Freezing (2022)", text: "Western nations froze approximately $300 billion in Russian Central Bank reserves held overseas, severely limiting the Kremlin's ability to defend the ruble or fund the war with foreign currency.", type: "success_evidence", whyItMatters: "An unprecedented financial strike that instantly wiped out half of Russia's war chest.", limitation: "Russia continued to earn billions daily by selling oil." },
      { id: "russia-harm", title: "War Continues Unabated", text: "Despite the heaviest sanctions in modern history, as of 2024, Russia occupies roughly 18% of Ukrainian territory and continues to launch daily missile and drone strikes.", type: "failure_or_harm", whyItMatters: "Proves that sanctions completely failed at achieving immediate behavior change (stopping the invasion).", limitation: "The sanctions may have prevented Russia from taking MORE territory." },
      { id: "russia-civilian-impact", title: "Brain Drain and Flight", text: "Following the invasion and sanctions (and military mobilization), an estimated 800,000 to 1 million Russians left the country in 2022, including a massive exodus of IT professionals.", type: "civilian_or_social_impact", whyItMatters: "Shows massive social and economic disruption within Russia.", limitation: "Many left to avoid the draft, not just because of the sanctions." },
      { id: "russia-mechanism", title: "Microchip Shortages", text: "US export controls banned the sale of advanced semiconductors to Russia. By late 2022, Ukrainian forces found Russian tanks and drones using chips scavenged from civilian dishwashers and refrigerators.", type: "mechanism", whyItMatters: "Provides physical proof that technology sanctions constrained military production.", limitation: "Russia set up shell companies in third countries to smuggle chips." },
      { id: "russia-alternative", title: "The 'Shadow Fleet'", text: "To bypass the G7 price cap on Russian oil, Moscow assembled a 'shadow fleet' of hundreds of aging oil tankers with obscured ownership, continuing to sell massive volumes of oil to India and China.", type: "alternative_explanation", whyItMatters: "Explains why the Russian economy did not collapse: they found alternative buyers.", limitation: "Selling oil this way is highly inefficient and less profitable." },
      { id: "russia-comparison", title: "GDP Growth Despite Sanctions", text: "In 2023, the IMF reported that Russia's economy actually grew by 3.6%, driven by massive state spending on the military-industrial complex.", type: "comparison_problem", whyItMatters: "Suggests the sanctions failed to crash the economy.", limitation: "War-driven GDP growth often masks deep underlying economic rot and inflation." },
      { id: "russia-missing", title: "Long-term Oil Revenue Data", text: "Because Russia has classified most of its economic data since 2022, independent economists struggle to know exactly how much oil revenue is reaching the state budget versus disappearing into corruption.", type: "missing_evidence", whyItMatters: "Makes it incredibly hard to measure the true success of the oil price cap.", limitation: "Requires waiting for post-war analysis." }
    ],
    sources: [
      { title: "EU: Sanctions against Russia", url: "https://www.consilium.europa.eu/en/policies/sanctions-against-russia/" },
      { title: "US Treasury: Ukraine/Russia-related sanctions", url: "https://home.treasury.gov/policy-issues/financial-sanctions/sanctions-programs-and-country-information/ukraine-russia-related-sanctions" }
    ],
    teacherNote: "Good for discussing ongoing cases where final outcomes are not yet knowable."
  },
  {
    id: "afghanistan-reconstruction-aid",
    track: "aid",
    country: "Afghanistan",
    period: "2001-2021",
    policy: "Reconstruction, development, and state-building aid",
    question: "Did foreign aid work in the case of Afghanistan?",
    summary: {
      quickSummary: "After 2001, donors funded reconstruction, public services, and state-building in Afghanistan. In 2021, the Western-backed state collapsed.",
      whatWasHappening: "Following the US-led invasion in 2001, the international community poured billions of dollars into Afghanistan to rebuild its government, military, and public services amidst an ongoing insurgency.",
      policyUsed: "Massive financial aid for development, health, education, and security forces.",
      policyGoal: "To rebuild services, support a functioning state, and improve livelihoods.",
      whyHardToJudge: "Some communities saw real gains in education, health, and roads during the 20 years of aid. However, corruption, donor dependency, and the ultimate collapse of the state raise hard questions about sustainability. The verdict changes sharply depending on whether you judge short-term welfare or long-term state survival.",
      possibleSuccessAngles: [
        "Welfare improvement during the aid period",
        "State capacity and governance",
        "Long-term sustainability",
        "Security outcomes"
      ]
    },
    successCriteria: [
      { id: "welfare", label: "Welfare improvement", explanation: "Did aid improve people's lives, health, or education?" },
      { id: "state_capacity", label: "State capacity", explanation: "Did aid help the government provide services effectively?" },
      { id: "sustainability", label: "Sustainability", explanation: "Did the gains last after donor support decreased?" }
    ],
    evidenceCards: [
      { id: "afg-goal", title: "The Bonn Agreement (2001)", text: "The 2001 Bonn Agreement pledged international support to build a 'broad-based, gender-sensitive, multi-ethnic and fully representative government' and rebuild the country's infrastructure.", type: "policy_goal", whyItMatters: "Sets a massive, arguably unrealistic, goal of creating a modern democratic state from scratch.", limitation: "Initial funding was incredibly low compared to the ambition of the goal." },
      { id: "afg-success", title: "Life Expectancy and Education Gains", text: "Between 2001 and 2019, life expectancy in Afghanistan rose from 56 to 64 years. Maternal mortality dropped by half, and millions of girls, previously banned by the Taliban, enrolled in school.", type: "success_evidence", whyItMatters: "Provides undeniable data that foreign aid improved human welfare in the short term.", limitation: "These gains were heavily concentrated in urban areas." },
      { id: "afg-harm", title: "The 2021 Collapse", text: "In August 2021, as US troops withdrew and aid froze, the Afghan government and military (which had received $83 billion in training and equipment) collapsed in a matter of weeks, allowing the Taliban to return to power.", type: "failure_or_harm", whyItMatters: "Proves a catastrophic failure in state-building and sustainability.", limitation: "The collapse was triggered by a political decision (withdrawal), not necessarily flawed aid projects." },
      { id: "afg-civilian-impact", title: "Ghost Soldiers and Corruption", text: "SIGAR (the US inspector general) reported that millions of dollars were paid to 'ghost soldiers'—names on a payroll that didn't exist—while real police went unpaid and turned to extortion.", type: "civilian_or_social_impact", whyItMatters: "Shows how aid fueled corruption and actively destroyed civilian trust in the government.", limitation: "Donors knew about the corruption but kept funding to avoid collapse." },
      { id: "afg-mechanism", title: "Too Much Money, Too Fast", text: "At its peak, foreign aid constituted 100% of Afghanistan's GDP. The Afghan economy could not absorb this influx, leading to massive inflation and a predatory rent-seeking economy.", type: "mechanism", whyItMatters: "Explains how the volume of aid fundamentally broke the local economy.", limitation: "Without that money, the government couldn't have operated at all." },
      { id: "afg-alternative", title: "The Insurgency", text: "The Taliban maintained safe havens in neighboring Pakistan and waged a relentless insurgency, assassinating local officials and destroying infrastructure.", type: "alternative_explanation", whyItMatters: "Suggests the aid failed because it was deployed in an active war zone with external interference.", limitation: "Aid was explicitly intended to win 'hearts and minds' and defeat the insurgency." },
      { id: "afg-comparison", title: "Dependency", text: "By 2020, foreign grants funded 75% of Afghanistan's total public expenditures. The government raised very little tax revenue itself.", type: "comparison_problem", whyItMatters: "Shows that the state had zero long-term sustainability without foreign backing.", limitation: "Poor, war-torn countries always require decades to become self-sufficient." },
      { id: "afg-missing", title: "Rural Perspectives", text: "Because international monitors could rarely travel outside Kabul due to security threats, we lack reliable data on how much aid actually reached remote rural villages.", type: "missing_evidence", whyItMatters: "Questions the validity of the national success statistics.", limitation: "The Taliban controlled much of rural Afghanistan, blocking access." }
    ],
    sources: [
      { title: "SIGAR reports", url: "https://www.sigar.mil/" },
      { title: "World Bank: Afghanistan Reconstruction Trust Fund", url: "https://www.worldbank.org/en/programs/artf" }
    ],
    teacherNote: "Strong case for separating short-term welfare gains from state-building and sustainability."
  },
  {
    id: "philippines-kalahi-cidss",
    track: "aid",
    country: "Philippines",
    period: "2000s-2010s",
    policy: "KALAHI-CIDSS community-driven development aid",
    question: "Did foreign aid work in the case of the Philippines?",
    summary: {
      quickSummary: "KALAHI-CIDSS supported community-driven development by funding local planning and small infrastructure projects in poorer areas.",
      whatWasHappening: "To fight poverty, the government and international donors implemented a program where communities themselves proposed, designed, and managed small local infrastructure projects (like water systems or roads).",
      policyUsed: "Community-driven development (CDD) grants and technical assistance.",
      policyGoal: "To let communities identify priorities and manage resources for public goods.",
      whyHardToJudge: "Success might mean poverty reduction, better local governance, or participation by marginalized groups. Students should ask whether community choice actually improved outcomes, and whether these small gains were protected from local inequalities or elite capture.",
      possibleSuccessAngles: [
        "Welfare improvement (better infrastructure)",
        "Community participation and empowerment",
        "Improved local governance",
        "Poverty reduction"
      ]
    },
    successCriteria: [
      { id: "welfare", label: "Welfare improvement", explanation: "Did the aid improve local living conditions?" },
      { id: "participation", label: "Community participation", explanation: "Did the project give marginalized groups a real voice?" },
      { id: "governance", label: "Local governance", explanation: "Did it improve trust and accountability in local government?" }
    ],
    evidenceCards: [
      { id: "ph-goal", title: "World Bank Project Documents", text: "The KALAHI-CIDSS project officially aimed to 'empower local communities, improve local governance, and reduce poverty' by transferring funds directly to barangays (villages).", type: "policy_goal", whyItMatters: "Explicitly states that empowerment and governance were equal goals to reducing poverty.", limitation: "Empowerment is notoriously difficult to measure." },
      { id: "ph-success", title: "Infrastructure Delivery", text: "A 2014 impact evaluation showed that communities completed thousands of water systems, schools, and roads, which were 20% cheaper and better maintained than similar projects built by the central government.", type: "success_evidence", whyItMatters: "Provides strong quantitative evidence that the community-driven mechanism works for infrastructure.", limitation: "Does not prove that poverty itself decreased." },
      { id: "ph-harm", title: "No Shift in Poverty Rates", text: "The same impact evaluations found no statistically significant reduction in household poverty or increases in income in KALAHI-CIDSS villages compared to control villages.", type: "failure_or_harm", whyItMatters: "Directly contradicts the policy goal of poverty reduction.", limitation: "The grants were very small per capita, making massive poverty reduction unlikely." },
      { id: "ph-civilian-impact", title: "Elite Capture in Meetings", text: "Qualitative field reports noted that while attendance at community assemblies was high, the actual proposals were often drafted by the village captain or local elites, with poor residents just rubber-stamping them.", type: "civilian_or_social_impact", whyItMatters: "Undermines the claim of 'community empowerment' and participation.", limitation: "Even elite-captured projects like a new school often benefit the whole village." },
      { id: "ph-mechanism", title: "The Block Grant Mechanism", text: "The project gave block grants of roughly $6,000 to $10,000 directly to community bank accounts, bypassing the often-corrupt municipal mayors.", type: "mechanism", whyItMatters: "Explains how the policy structurally changed who held power over the money.", limitation: "Mayors sometimes retaliated by withdrawing other forms of support." },
      { id: "ph-alternative", title: "Conditional Cash Transfers (4Ps)", text: "During the same period, the Philippines rolled out a massive conditional cash transfer program (Pantawid Pamilya) giving cash directly to poor mothers. This likely had a larger impact on poverty than the infrastructure grants.", type: "alternative_explanation", whyItMatters: "Shows that another concurrent policy might have driven any observed welfare improvements.", limitation: "Cash transfers don't build roads or water systems." },
      { id: "ph-comparison", title: "Typhoon Haiyan Response", text: "After Typhoon Haiyan in 2013, communities that had previously participated in KALAHI-CIDSS rebuilt their infrastructure faster and coordinated relief better than non-participating communities.", type: "comparison_problem", whyItMatters: "Shows a long-term 'social capital' benefit of the aid.", limitation: "Social capital is a side-effect, not a direct measure of poverty reduction." },
      { id: "ph-missing", title: "Long-term Maintenance Data", text: "There is little data on what happens to these water systems 10 years after the project closes and community committees disband.", type: "missing_evidence", whyItMatters: "Raises the question of whether community-managed infrastructure is sustainable long-term.", limitation: "Donors rarely fund 10-year follow-up surveys." }
    ],
    sources: [
      { title: "World Bank: KALAHI-CIDSS Impact Evaluation", url: "https://www.worldbank.org/en/country/philippines/brief/kalahi-cidss-national-community-driven-development-project" },
      { title: "Asian Development Bank Reports", url: "https://www.adb.org/" }
    ],
    teacherNote: "Good case for discussing small but meaningful local improvements versus broader structural change."
  },
  {
    id: "colombia-plan-colombia",
    track: "aid",
    country: "Colombia",
    period: "2000s-2010s",
    policy: "Plan Colombia security and development aid",
    question: "Did foreign aid work in the case of Colombia?",
    summary: {
      quickSummary: "Plan Colombia combined security assistance, counternarcotics policy, and development aid to help the Colombian government fight armed groups and drug cartels.",
      whatWasHappening: "Colombia was struggling with a decades-long conflict involving guerrilla groups, paramilitaries, and powerful drug cartels. The US provided massive funding and training to strengthen the Colombian military and eradicate coca crops.",
      policyUsed: "Huge amounts of military, security, and economic foreign aid.",
      policyGoal: "To strengthen the state, reduce drug-linked violence, and weaken armed groups.",
      whyHardToJudge: "Violence declined in many areas and the state strengthened. However, displacement, human rights concerns, and shifting drug production complicate the picture. Students must decide if they are judging violence reduction, civilian protection, or support for the later peace negotiations.",
      possibleSuccessAngles: [
        "Reduced violence",
        "State capacity and control",
        "Minimizing civilian harm",
        "Supporting peace negotiations"
      ]
    },
    successCriteria: [
      { id: "reduced_violence", label: "Reduced violence", explanation: "Did the policy lower the overall level of conflict?" },
      { id: "state_capacity", label: "State capacity", explanation: "Did the state gain control and provide better security?" },
      { id: "civilian_harm", label: "Civilian harm", explanation: "Did the policy avoid serious harm to ordinary people?" },
      { id: "peace", label: "Supported peace", explanation: "Did it help create conditions for a peace agreement?" }
    ],
    evidenceCards: [
      { id: "col-goal", title: "US Congressional Appropriations", text: "Between 2000 and 2016, the US provided over $10 billion to Plan Colombia. Originally billed as a counternarcotics package, it allowed funds to be used for counterinsurgency against the FARC starting in 2002.", type: "policy_goal", whyItMatters: "Shows the massive scale of the aid and how the goal shifted from stopping drugs to fighting guerrillas.", limitation: "Economic development was always a secondary, smaller portion of the budget." },
      { id: "col-success", title: "Homicide and Kidnapping Drops", text: "Following the implementation of Plan Colombia, homicides in Colombia dropped from nearly 29,000 in 2002 to roughly 12,000 in 2016. Kidnappings plummeted by 90% in the same period.", type: "success_evidence", whyItMatters: "Undeniable statistical evidence of reduced violence and increased security.", limitation: "Does not account for human rights abuses committed by state forces." },
      { id: "col-harm", title: "The 'False Positives' Scandal", text: "To show metrics of 'success' to donors, elements of the US-funded Colombian military murdered over 6,400 innocent civilians between 2002 and 2008, dressing their bodies in guerrilla uniforms to inflate body counts.", type: "failure_or_harm", whyItMatters: "A horrific example of how aid-driven metrics can cause massive civilian harm.", limitation: "The Colombian government eventually prosecuted many of the soldiers involved." },
      { id: "col-civilian-impact", title: "Aerial Fumigation Health Risks", text: "To destroy coca, US contractors flew planes spraying glyphosate herbicide over rural Colombia. Farmers reported the spray destroyed legal food crops, polluted water, and caused severe health issues.", type: "civilian_or_social_impact", whyItMatters: "Shows the direct negative impact of counternarcotics policy on rural livelihoods.", limitation: "Colombia eventually banned aerial fumigation in 2015." },
      { id: "col-mechanism", title: "Helicopter Mobility", text: "A key mechanism of Plan Colombia was providing Black Hawk and Huey helicopters, which gave the Colombian military the air mobility to strike FARC camps deep in the jungle.", type: "mechanism", whyItMatters: "Shows exactly how foreign equipment fundamentally changed the balance of the war.", limitation: "Helicopters require expensive, ongoing maintenance and training." },
      { id: "col-alternative", title: "President Uribe's Democratic Security", text: "In 2002, Colombia elected Alvaro Uribe, who implemented a fiercely aggressive domestic military strategy ('Democratic Security') and levied a wealth tax on Colombians to fund the war.", type: "alternative_explanation", whyItMatters: "Argues that domestic political will and local funding drove the victory, not just US money.", limitation: "Uribe’s strategy relied heavily on US intelligence and equipment." },
      { id: "col-comparison", title: "The Balloon Effect (Coca Production)", text: "While US aid eradicated coca in southern Colombia, cultivation simply moved to new regions or across the border into Peru and Bolivia. By 2017, Colombian coca production had reached all-time highs.", type: "comparison_problem", whyItMatters: "Proves that while the counterinsurgency worked, the counternarcotics goal totally failed.", limitation: "Eradication is rarely a permanent solution without crop substitution." },
      { id: "col-missing", title: "Paramilitary Links", text: "We lack full declassified records showing the extent to which US-funded military units covertly coordinated with illegal right-wing paramilitary death squads during operations.", type: "missing_evidence", whyItMatters: "Leaves a gap in understanding the true human rights cost of the aid.", limitation: "Both governments have incentives to keep this classified." }
    ],
    sources: [
      { title: "Congressional Research Service reports", url: "https://crsreports.congress.gov/" },
      { title: "Washington Office on Latin America (WOLA)", url: "https://www.wola.org/colombia/" }
    ],
    teacherNote: "Useful for separating security outcomes from human-rights and counternarcotics outcomes."
  },
  {
    id: "rwanda-reconstruction-aid",
    track: "aid",
    country: "Rwanda",
    period: "1994-2010s",
    policy: "Post-genocide reconstruction and development aid",
    question: "Did foreign aid work in the case of Rwanda?",
    summary: {
      quickSummary: "After the 1994 genocide, Rwanda received massive aid for reconstruction, health, education, and poverty reduction.",
      whatWasHappening: "Following the devastating 1994 genocide, international donors provided substantial aid to rebuild the country, channeling funds directly through the strong, centralized Rwandan government.",
      policyUsed: "Development and budget support aid directly aligned with government plans.",
      policyGoal: "To support reconstruction, restore services, and help recovery after mass violence.",
      whyHardToJudge: "Many observers point to incredible development, health, and state-capacity gains. However, others emphasize tight political control, limited civic space, and aid dependence. Students must decide whether success means pure economic development or whether it must include political openness.",
      possibleSuccessAngles: [
        "Welfare and economic improvement",
        "State capacity",
        "Political openness and human rights",
        "Poverty reduction"
      ]
    },
    successCriteria: [
      { id: "welfare", label: "Welfare improvement", explanation: "Did health, education, and poverty improve?" },
      { id: "state_capacity", label: "State capacity", explanation: "Did aid help the government provide services effectively?" },
      { id: "governance", label: "Political openness", explanation: "Did the policy support accountable and open governance?" }
    ],
    evidenceCards: [
      { id: "rw-goal", title: "Vision 2020", text: "The Rwandan government published 'Vision 2020', a development plan aiming to transform Rwanda into a middle-income country. Donors explicitly aligned their aid funding to support this specific national plan.", type: "policy_goal", whyItMatters: "Shows that aid was heavily coordinated with a strong domestic strategy.", limitation: "The plan focused almost entirely on economics, not democracy." },
      { id: "rw-success", title: "GDP and Poverty Reduction", text: "Between 2001 and 2015, Rwanda's economy grew at an average of 8% per year. The percentage of people living below the poverty line dropped from 59% in 2001 to 39% in 2014.", type: "success_evidence", whyItMatters: "Provides striking evidence of economic success and welfare improvement.", limitation: "Poverty reduction slowed significantly after 2014." },
      { id: "rw-harm", title: "Suspension of Aid over DRC (2012)", text: "In 2012, major donors (UK, US, Germany) temporarily suspended aid to Rwanda after UN reports revealed the Rwandan government was actively funding and arming the M23 rebel group, which was committing atrocities in neighboring Congo.", type: "failure_or_harm", whyItMatters: "Shows that aid was subsidizing a government causing instability abroad.", limitation: "The suspension was brief and aid soon resumed." },
      { id: "rw-civilian-impact", title: "Universal Healthcare (Mutuelles de Santé)", text: "Using donor funds, Rwanda rolled out a community-based health insurance scheme. By 2010, over 90% of Rwandans had health insurance, dramatically reducing malaria and maternal mortality.", type: "civilian_or_social_impact", whyItMatters: "A clear example of aid building highly effective state capacity for civilians.", limitation: "Critics note that local officials often coerced citizens into paying the premiums." },
      { id: "rw-mechanism", title: "Direct Budget Support", text: "Unlike in most countries where NGOs run projects, donors gave millions directly into the Rwandan Ministry of Finance. This built state capacity and allowed the government to plan long-term.", type: "mechanism", whyItMatters: "Explains the mechanism behind Rwanda's strong state control.", limitation: "This gives the ruling party immense power and control over resources." },
      { id: "rw-alternative", title: "Authoritarian Control", text: "President Paul Kagame runs a highly centralized, authoritarian state. Political opposition is banned, journalists are jailed, and the ruling party controls the economy.", type: "alternative_explanation", whyItMatters: "Suggests the 'development miracle' is only possible because of ruthless political control, not just aid.", limitation: "Donors often turn a blind eye to the authoritarianism because the economic metrics are so good." },
      { id: "rw-comparison", title: "Rwanda vs. DRC", text: "Compared to its neighbor, the Democratic Republic of Congo (which also receives massive aid but has weak governance), Rwanda's aid delivery is incredibly efficient and corruption-free.", type: "comparison_problem", whyItMatters: "Shows that strong domestic governance is necessary for aid to work.", limitation: "The comparison ignores Rwanda's smaller size and different history." },
      { id: "rw-missing", title: "True Popular Support", text: "Because criticizing the government is illegal in Rwanda, independent polling on whether citizens prefer this model of 'development without democracy' is impossible to obtain.", type: "missing_evidence", whyItMatters: "We don't know the true civilian perspective on the regime's success.", limitation: "Elections are regularly held but are not considered free or fair." }
    ],
    sources: [
      { title: "World Bank: Rwanda overview", url: "https://www.worldbank.org/en/country/rwanda/overview" },
      { title: "Human Rights Watch: Rwanda", url: "https://www.hrw.org/africa/rwanda" }
    ],
    teacherNote: "Good case for asking whether development success and political openness must be judged separately."
  }
];
