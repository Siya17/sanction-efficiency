import type { CaseStudy } from "../types";

export const cases: CaseStudy[] = [
  {
    id: "iraq-1990s-sanctions",
    track: "sanctions",
    country: "Iraq",
    period: "1990s",
    policy: "UN comprehensive sanctions after Iraq's invasion of Kuwait",
    question: "Did sanctions work in the case of Iraq?",
    background:
      "What happened: After Iraq invaded Kuwait in 1990, the UN imposed comprehensive sanctions to force withdrawal and later to press Iraq over weapons inspections.\n\nPolicy used: Comprehensive economic and trade sanctions linked to UN resolutions.\n\nWhy it is hard to judge: Iraq is a difficult sanctions case because success depends on the goal. If the goal was to force Saddam Hussein from power, sanctions did not achieve that. If the goal was to contain Iraq’s military capacity after the Gulf War, the judgment may look different. The case is also ethically difficult because comprehensive sanctions created serious civilian costs.",
    successCriteria: [
      { id: "behavior_change", label: "Behavior change", explanation: "Did Iraq withdraw from Kuwait and comply with UN weapons inspections?" },
      { id: "containment", label: "Containment", explanation: "Did the policy prevent Iraq from rebuilding its military capacity?" },
      { id: "regime_change", label: "Regime change", explanation: "Did the policy force a change in leadership?" },
      { id: "civilian_harm", label: "Civilian harm", explanation: "Did the policy avoid serious harm to ordinary people?" }
    ],
    evidenceCards: [
      { id: "iraq-goal", title: "Policy goal", text: "The sanctions were meant to reverse aggression, compel compliance, and constrain Iraq's military capacity.", type: "policy_goal", whyItMatters: "Different goals mean different definitions of success. You must pick one to judge.", limitation: "A policy can succeed at one goal and fail at another.", sourceTitle: "UN Security Council sanctions information", sourceUrl: "https://main.un.org/securitycouncil/en/sanctions/information" },
      { id: "iraq-success", title: "Containment argument", text: "Sanctions isolated Iraq and limited its ability to rebuild strategic military capacity.", type: "success_evidence", whyItMatters: "This helps argue that sanctions succeeded at containing Iraq's power.", limitation: "Containment is not the same as full compliance or regime change." },
      { id: "iraq-harm", title: "Humanitarian cost", text: "Many accounts emphasize severe civilian hardship under broad sanctions.", type: "failure_or_harm", whyItMatters: "This supports a failure verdict if you judge success by civilian protection.", limitation: "It does not disprove that military containment was achieved." },
      { id: "iraq-civilian-impact", title: "Who bore the costs?", text: "Ordinary households faced the harshest daily effects, while the leadership redirected blame.", type: "civilian_or_social_impact", whyItMatters: "Shows that economic pain did not equally affect decision-makers.", limitation: "Does not tell us what would have happened without sanctions." },
      { id: "iraq-mechanism", title: "How pressure worked", text: "The mechanism was coercion through economic isolation: reduce resources and raise costs.", type: "mechanism", whyItMatters: "Explains how the policy was supposed to force leaders to change.", limitation: "Assumes authoritarian leaders care more about economic costs than regime survival." },
      { id: "iraq-alternative", title: "Other forces at work", text: "Military defeat, inspections, oil politics, and later invasion all shaped outcomes.", type: "alternative_explanation", whyItMatters: "Suggests that sanctions were only one part of the story.", limitation: "Does not mean sanctions had zero effect." },
      { id: "iraq-comparison", title: "Compared to what?", text: "The counterfactual is hard: without sanctions, would Iraq have rebuilt capacity faster?", type: "comparison_problem", whyItMatters: "Reminds us that we must compare reality to what might have happened.", limitation: "We cannot test this in reality." },
      { id: "iraq-missing", title: "Missing evidence", text: "We lack clear internal evidence about how Iraqi leaders weighed sanctions against other threats.", type: "missing_evidence", whyItMatters: "Lowers our confidence in deciding exactly why leaders acted.", limitation: "Missing evidence is normal in historical cases." }
    ],
    sources: [
      { title: "UN Security Council sanctions information", url: "https://main.un.org/securitycouncil/en/sanctions/information" },
      { title: "Global Sanctions Data Base", url: "https://globalsanctionsdatabase.com/" },
      { title: "TIES sanctions dataset", url: "https://sanctions.web.unc.edu/" },
      { title: "UN Digital Library", url: "https://digitallibrary.un.org/" }
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
    background:
      "What happened: Iran faced UN, US, and EU sanctions tied to concerns about its nuclear program, which led to the 2015 JCPOA agreement.\n\nPolicy used: Financial and oil sanctions linked to diplomatic negotiations.\n\nWhy it is hard to judge: The 2015 JCPOA makes the case look like partial success if the benchmark is bargaining or temporary nuclear limits, but the later unraveling of the agreement shows how fragile that success could be. It is hard to know if the sanctions alone worked, or if they only worked because of diplomacy.",
    successCriteria: [
      { id: "bargaining_pressure", label: "Bargaining pressure", explanation: "Did sanctions help push the target toward negotiation?" },
      { id: "behavior_change", label: "Behavior change", explanation: "Did Iran accept limits and monitoring on its nuclear program?" },
      { id: "sustainability", label: "Sustainability", explanation: "Did the policy produce a lasting resolution?" },
      { id: "civilian_harm", label: "Civilian harm", explanation: "Did the policy avoid serious harm to ordinary people?" }
    ],
    evidenceCards: [
      { id: "iran-goal", title: "Policy goal", text: "Sanctions aimed to pressure Iran into negotiations, limits, and monitoring of nuclear activities.", type: "policy_goal", whyItMatters: "Clarifies that the goal was negotiation, not just punishment.", limitation: "Goals can shift over time." },
      { id: "iran-success", title: "Bargaining pressure", text: "Financial and oil sanctions raised the cost of stalemate and helped make a negotiated agreement possible.", type: "success_evidence", whyItMatters: "Supports the argument that sanctions worked to create bargaining pressure.", limitation: "Does not prove sanctions alone caused the deal." },
      { id: "iran-harm", title: "Reversible gains", text: "The nuclear dispute was not permanently resolved due to later policy reversals.", type: "failure_or_harm", whyItMatters: "Complicates claims of long-term success.", limitation: "Reversals might be blamed on later policy choices, not the original sanctions." },
      { id: "iran-civilian-impact", title: "Economic effects on society", text: "Sanctions affected ordinary economic life, including inflationary pressure and access to some goods.", type: "civilian_or_social_impact", whyItMatters: "Shows that pressure on the government also hurt ordinary people.", limitation: "Economic pain does not always lead to political pressure." },
      { id: "iran-mechanism", title: "Financial isolation mechanism", text: "The policy tried to restrict revenue so Iranian leaders would prefer negotiated limits.", type: "mechanism", whyItMatters: "Explains how the policy was supposed to work.", limitation: "Assumes leaders prioritize the economy over national security goals." },
      { id: "iran-alternative", title: "Diplomacy and security concerns", text: "Diplomatic openings and security guarantees may explain much of the outcome.", type: "alternative_explanation", whyItMatters: "Suggests the carrot (diplomacy) was as important as the stick (sanctions).", limitation: "Diplomacy might not have worked without the economic pressure." },
      { id: "iran-comparison", title: "Pressure alone?", text: "The hard comparison is whether sanctions alone worked, or if they needed incentives.", type: "comparison_problem", whyItMatters: "Reminds us to consider the combination of policies.", limitation: "We cannot separate the sanctions from the diplomacy." },
      { id: "iran-missing", title: "Missing evidence", text: "We need more evidence from Iranian decision-makers about what changed their minds most.", type: "missing_evidence", whyItMatters: "Highlights uncertainty about internal state decisions.", limitation: "Such evidence is often classified." }
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
    background:
      "What happened: International sanctions, divestment campaigns, and sports boycotts targeted South Africa's apartheid system, leading eventually to majority rule.\n\nPolicy used: Diplomatic isolation, trade sanctions, and corporate divestment.\n\nWhy it is hard to judge: The transition to negotiations and majority rule depended heavily on internal resistance, labor action, and economic change. It is hard to know whether the external sanctions or the internal social movements mattered more. A careful judgment avoids claiming that sanctions alone ended apartheid.",
    successCriteria: [
      { id: "behavior_change", label: "Behavior change", explanation: "Did the government transition to negotiations and majority rule?" },
      { id: "bargaining_pressure", label: "Bargaining pressure", explanation: "Did sanctions put pressure on the apartheid regime?" },
      { id: "norm_enforcement", label: "International delegitimation", explanation: "Did the policy signal that apartheid was unacceptable globally?" }
    ],
    evidenceCards: [
      { id: "sa-goal", title: "Policy goal", text: "External pressure aimed to delegitimize apartheid and raise costs for the government.", type: "policy_goal", whyItMatters: "Shows the goal was both moral (delegitimation) and practical (costs).", limitation: "Goals varied between activists and governments." },
      { id: "sa-success", title: "Delegitimation and pressure", text: "Sanctions and boycotts signaled that apartheid could not be treated as normal, strengthening incentives for negotiation.", type: "success_evidence", whyItMatters: "Supports success on the delegitimation criterion.", limitation: "Moral pressure does not automatically force political change." },
      { id: "sa-harm", title: "Costs to workers", text: "Economic pressure could also hurt workers and communities already harmed by apartheid.", type: "failure_or_harm", whyItMatters: "Raises questions about who paid the price of external pressure.", limitation: "Many internal groups supported sanctions despite the costs." },
      { id: "sa-civilian-impact", title: "Social movement effects", text: "Sanctions were part of a broader solidarity campaign that changed international attention.", type: "civilian_or_social_impact", whyItMatters: "Highlights the importance of global public opinion.", limitation: "Hard to measure the exact impact of 'attention'." },
      { id: "sa-mechanism", title: "Isolation mechanism", text: "The mechanism was reputational and economic isolation to make apartheid too costly.", type: "mechanism", whyItMatters: "Explains how isolation was intended to work.", limitation: "Some businesses bypassed the isolation." },
      { id: "sa-alternative", title: "Internal resistance", text: "Domestic organizing, strikes, and civic resistance were central to the transition.", type: "alternative_explanation", whyItMatters: "Shows that internal actors were the primary drivers of change.", limitation: "Internal resistance might have been weaker without external support." },
      { id: "sa-comparison", title: "Would it happen anyway?", text: "Would apartheid have ended on a similar timeline without sanctions because of internal crisis?", type: "comparison_problem", whyItMatters: "Forces us to consider the counterfactual.", limitation: "We cannot rerun history." },
      { id: "sa-missing", title: "Missing evidence", text: "We need more evidence about how South African leaders weighed outside pressure compared with domestic strikes.", type: "missing_evidence", whyItMatters: "Shows a gap in understanding elite decision-making.", limitation: "Elites often downplay the effect of outside pressure." }
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
    background:
      "What happened: Russia faced sanctions after the 2014 seizure of Crimea, and much broader financial, trade, energy, and technology sanctions after the 2022 full-scale invasion of Ukraine.\n\nPolicy used: Targeted and comprehensive economic, financial, and technological sanctions.\n\nWhy it is hard to judge: The conflict is ongoing. Sanctions clearly have not stopped the war (immediate behavior change), but they have constrained the Russian economy and military supply chains (long-term pressure). Students must distinguish between stopping the war immediately and raising the long-term cost of fighting it.",
    successCriteria: [
      { id: "behavior_change", label: "Behavior change", explanation: "Did Russia stop the invasion or withdraw forces?" },
      { id: "containment", label: "Military constraint", explanation: "Did sanctions limit Russia's ability to supply its military?" },
      { id: "norm_enforcement", label: "Norm enforcement", explanation: "Did the policy signal strong international opposition to aggression?" }
    ],
    evidenceCards: [
      { id: "russia-goal", title: "Policy goal", text: "Sanctions aimed to impose costs, constrain war capacity, and signal opposition to aggression.", type: "policy_goal", whyItMatters: "Highlights multiple goals beyond just stopping the war.", limitation: "Signaling opposition does not save lives on the battlefield." },
      { id: "russia-success", title: "Costs and constraints", text: "Sanctions increased costs and restricted technology access, making parts of the war economy harder to sustain.", type: "success_evidence", whyItMatters: "Supports success if the goal is military constraint.", limitation: "Russia found ways to bypass some restrictions." },
      { id: "russia-harm", title: "Limited immediate coercion", text: "Russia did not quickly end the war or reverse territorial actions.", type: "failure_or_harm", whyItMatters: "Supports failure if the goal was immediate behavior change.", limitation: "Sanctions often take years to change behavior." },
      { id: "russia-civilian-impact", title: "Costs beyond leaders", text: "Sanctions affected consumers, workers, firms, and global energy markets.", type: "civilian_or_social_impact", whyItMatters: "Shows the wide ripple effects of major sanctions.", limitation: "Does not prove whether the costs were 'worth it'." },
      { id: "russia-mechanism", title: "Strategic constraint", text: "The policy tried to reduce access to finance and technology to raise the cost of aggression.", type: "mechanism", whyItMatters: "Explains how economic limits affect military capability.", limitation: "Determined countries can rebuild supply chains." },
      { id: "russia-alternative", title: "Adaptation and partners", text: "Energy revenues and alternative suppliers complicate claims about the pressure sanctions produced.", type: "alternative_explanation", whyItMatters: "Shows why the sanctions were not totally effective.", limitation: "Adaptation is expensive and inefficient." },
      { id: "russia-comparison", title: "Ongoing conflict", text: "Students must compare current outcomes with a hypothetical Russia facing no sanctions at all.", type: "comparison_problem", whyItMatters: "Reminds us that things could be worse without sanctions.", limitation: "We cannot know the counterfactual." },
      { id: "russia-missing", title: "Missing evidence", text: "We need better evidence about military supply bottlenecks and private elite debates.", type: "missing_evidence", whyItMatters: "Shows what information would make judgment easier.", limitation: "Current conflict data is often unreliable." }
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
    background:
      "What happened: After 2001, donors funded reconstruction, public services, infrastructure, and state-building in Afghanistan. In 2021, the Western-backed state collapsed.\n\nPolicy used: Massive financial aid for development, health, education, and security forces.\n\nWhy it is hard to judge: Some communities saw real gains in education, health, and roads during the 20 years of aid. However, corruption, donor dependency, and the ultimate collapse of the state raise hard questions about sustainability. The verdict changes sharply depending on whether you judge short-term welfare or long-term state survival.",
    successCriteria: [
      { id: "welfare", label: "Welfare improvement", explanation: "Did aid improve people's lives, health, or education?" },
      { id: "state_capacity", label: "State capacity", explanation: "Did aid help the government provide services effectively?" },
      { id: "sustainability", label: "Sustainability", explanation: "Did the gains last after donor support decreased?" }
    ],
    evidenceCards: [
      { id: "afg-goal", title: "Policy goal", text: "Aid aimed to rebuild services, support a functioning state, and improve livelihoods.", type: "policy_goal", whyItMatters: "Shows the dual goals of helping people and building a state.", limitation: "The goals sometimes conflicted with military objectives." },
      { id: "afg-success", title: "Service delivery gains", text: "Expanded schools, clinics, and infrastructure helped many communities during the aid period.", type: "success_evidence", whyItMatters: "Supports success if judging by welfare improvements.", limitation: "Gains were easily reversed when aid stopped." },
      { id: "afg-harm", title: "Corruption and collapse", text: "Corruption, weak institutions, and the collapse of the government point to failure.", type: "failure_or_harm", whyItMatters: "Supports failure if judging by state capacity or sustainability.", limitation: "Does not erase the years of improved welfare for some." },
      { id: "afg-civilian-impact", title: "Uneven benefits", text: "Benefits varied heavily by region, gender, and security conditions.", type: "civilian_or_social_impact", whyItMatters: "Highlights that national averages can hide local inequalities.", limitation: "Uneven aid is still better than no aid for those who received it." },
      { id: "afg-mechanism", title: "Aid-to-capacity mechanism", text: "The policy assumed that money and projects could build institutions and increase trust in the state.", type: "mechanism", whyItMatters: "Explains the core theory behind the aid.", limitation: "Money can also fuel corruption and reduce trust." },
      { id: "afg-alternative", title: "War shaped outcomes", text: "Military strategy, conflict, and local powerbrokers shaped results alongside development aid.", type: "alternative_explanation", whyItMatters: "Shows that aid cannot succeed in a vacuum of insecurity.", limitation: "Aid itself also fueled some of the conflict." },
      { id: "afg-comparison", title: "Short-term vs Durable", text: "Students must compare services during heavy donor support with what lasted after withdrawal.", type: "comparison_problem", whyItMatters: "Forces a discussion on sustainability.", limitation: "Hard to predict future trajectories." },
      { id: "afg-missing", title: "Missing evidence", text: "We need local evidence about which specific projects lasted and who benefited most.", type: "missing_evidence", whyItMatters: "Shows the need for micro-level data.", limitation: "Data collection is hard in post-collapse environments." }
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
    background:
      "What happened: KALAHI-CIDSS supported community-driven development by funding local planning and small infrastructure projects in poorer areas.\n\nPolicy used: Community-driven development (CDD) grants and technical assistance.\n\nWhy it is hard to judge: Success might mean poverty reduction, better local governance, or participation by marginalized groups. Students should ask whether community choice actually improved outcomes, and whether these small gains were protected from local inequalities or elite capture.",
    successCriteria: [
      { id: "welfare", label: "Welfare improvement", explanation: "Did the aid improve local living conditions?" },
      { id: "participation", label: "Community participation", explanation: "Did the project give marginalized groups a real voice?" },
      { id: "governance", label: "Local governance", explanation: "Did it improve trust and accountability in local government?" }
    ],
    evidenceCards: [
      { id: "ph-goal", title: "Policy goal", text: "The program aimed to let communities identify priorities and manage resources for public goods.", type: "policy_goal", whyItMatters: "Clarifies that the process (participation) was a goal itself.", limitation: "Participation takes time and effort from poor communities." },
      { id: "ph-success", title: "Participation and fit", text: "Community planning made projects better match local needs and strengthened participation.", type: "success_evidence", whyItMatters: "Supports success for governance and participation.", limitation: "Does not guarantee massive poverty reduction." },
      { id: "ph-harm", title: "Limited transformation", text: "Small infrastructure may improve services without deeply changing poverty or local power relations.", type: "failure_or_harm", whyItMatters: "Complicates the idea that CDD is a cure-all for poverty.", limitation: "Small improvements are still improvements." },
      { id: "ph-civilian-impact", title: "Whose voice counted?", text: "We must ask whether women or poorer households could influence decisions, not just attend meetings.", type: "civilian_or_social_impact", whyItMatters: "Highlights the difference between real and fake participation.", limitation: "Measuring influence is difficult." },
      { id: "ph-mechanism", title: "Community-driven mechanism", text: "Local choice should improve relevance, reduce waste, and build trust in local governance.", type: "mechanism", whyItMatters: "Explains why letting communities decide is supposed to work.", limitation: "Assumes communities agree on priorities." },
      { id: "ph-alternative", title: "Local conditions mattered", text: "Municipal capacity and pre-existing civic networks explain why some communities benefited more.", type: "alternative_explanation", whyItMatters: "Shows that aid depends on existing local strengths.", limitation: "Means the aid might not work everywhere." },
      { id: "ph-comparison", title: "Compared with normal delivery", text: "Did community-driven delivery produce better results than standard local government projects?", type: "comparison_problem", whyItMatters: "Focuses the evaluation on the specific method of delivery.", limitation: "Hard to compare different types of projects." },
      { id: "ph-missing", title: "Missing evidence", text: "We need follow-up evidence about project maintenance and whether local elites captured the benefits.", type: "missing_evidence", whyItMatters: "Points to long-term unknowns.", limitation: "Long-term monitoring is rare." }
    ],
    sources: [
      { title: "World Bank: KALAHI-CIDSS", url: "https://www.worldbank.org/en/country/philippines/brief/kalahi-cidss-national-community-driven-development-project" },
      { title: "World Bank Independent Evaluation Group", url: "https://ieg.worldbankgroup.org/" }
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
    background:
      "What happened: Plan Colombia combined security assistance, counternarcotics policy, and development aid to help the Colombian government fight armed groups and drug cartels.\n\nPolicy used: Huge amounts of military, security, and economic foreign aid.\n\nWhy it is hard to judge: Violence declined in many areas and the state strengthened. However, displacement, human rights concerns, and shifting drug production complicate the picture. Students must decide if they are judging violence reduction, civilian protection, or support for the later peace negotiations.",
    successCriteria: [
      { id: "reduced_violence", label: "Reduced violence", explanation: "Did the policy lower the overall level of conflict?" },
      { id: "state_capacity", label: "State capacity", explanation: "Did the state gain control and provide better security?" },
      { id: "civilian_harm", label: "Civilian harm", explanation: "Did the policy avoid serious harm to ordinary people?" },
      { id: "peace", label: "Supported peace", explanation: "Did it help create conditions for a peace agreement?" }
    ],
    evidenceCards: [
      { id: "col-goal", title: "Policy goal", text: "Aid aimed to strengthen the state, reduce drug-linked violence, and weaken armed groups.", type: "policy_goal", whyItMatters: "Shows the blend of military and development goals.", limitation: "Goals were heavily focused on security over welfare." },
      { id: "col-success", title: "Security gains", text: "Aid and domestic reforms led to stronger state presence and reduced violence in many areas.", type: "success_evidence", whyItMatters: "Supports success if judging by state capacity or violence reduction.", limitation: "Violence moved to other areas instead of disappearing." },
      { id: "col-harm", title: "Human rights concerns", text: "Militarized strategies led to displacement and abuses, affecting vulnerable communities.", type: "failure_or_harm", whyItMatters: "Supports failure if judging by civilian harm.", limitation: "Does not negate the national drop in violence." },
      { id: "col-civilian-impact", title: "Uneven community effects", text: "Some communities gained security, while others experienced militarization and displacement.", type: "civilian_or_social_impact", whyItMatters: "Highlights inequality in who benefits from security aid.", limitation: "A national view might look positive while local views look negative." },
      { id: "col-mechanism", title: "Security-first mechanism", text: "Assumed that stronger security forces would weaken armed actors and create space for development.", type: "mechanism", whyItMatters: "Explains the theory behind military aid.", limitation: "Security does not automatically create development." },
      { id: "col-alternative", title: "Domestic reform", text: "Colombian military reforms, political decisions, and later peace negotiations also shaped outcomes.", type: "alternative_explanation", whyItMatters: "Shows that domestic actions were as important as foreign aid.", limitation: "Domestic reforms were funded by the aid." },
      { id: "col-comparison", title: "Security or drug policy?", text: "The verdict changes depending on whether you compare violence trends or drug production levels.", type: "comparison_problem", whyItMatters: "Forces clarity on the success criterion.", limitation: "Drug production often adapts to enforcement." },
      { id: "col-missing", title: "Missing evidence", text: "We need evidence separating US aid effects from Colombia's own policies.", type: "missing_evidence", whyItMatters: "Shows the attribution problem in aid evaluation.", limitation: "Hard to separate intertwined funds." }
    ],
    sources: [
      { title: "Congressional Research Service reports", url: "https://crsreports.congress.gov/" },
      { title: "UNODC crop monitoring", url: "https://www.unodc.org/unodc/en/crop-monitoring/index.html" }
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
    background:
      "What happened: After the 1994 genocide, Rwanda received massive aid for reconstruction, health, education, and poverty reduction.\n\nPolicy used: Development and budget support aid directly aligned with government plans.\n\nWhy it is hard to judge: Many observers point to incredible development, health, and state-capacity gains. However, others emphasize tight political control, limited civic space, and aid dependence. Students must decide whether success means pure economic development or whether it must include political openness.",
    successCriteria: [
      { id: "welfare", label: "Welfare improvement", explanation: "Did health, education, and poverty improve?" },
      { id: "state_capacity", label: "State capacity", explanation: "Did aid help the government provide services effectively?" },
      { id: "governance", label: "Political openness", explanation: "Did the policy support accountable and open governance?" }
    ],
    evidenceCards: [
      { id: "rw-goal", title: "Policy goal", text: "Aid aimed to support reconstruction, restore services, and help recovery after mass violence.", type: "policy_goal", whyItMatters: "Sets the baseline of recovering from total collapse.", limitation: "Goals rarely focused explicitly on democracy." },
      { id: "rw-success", title: "Development progress", text: "Service delivery, infrastructure, and human-development saw massive gains in the post-genocide period.", type: "success_evidence", whyItMatters: "Provides strong support for welfare and state capacity success.", limitation: "Economic growth does not mean political freedom." },
      { id: "rw-harm", title: "Governance tradeoffs", text: "Development gains came with tight limits on political openness, dissent, and accountability.", type: "failure_or_harm", whyItMatters: "Supports failure if judging by political openness.", limitation: "Some argue tight control was needed for stability." },
      { id: "rw-civilian-impact", title: "Who benefited?", text: "Did gains reach rural households and marginalized groups, or do national averages hide uneven experiences?", type: "civilian_or_social_impact", whyItMatters: "Questions the depth of the economic success.", limitation: "Most countries have uneven development." },
      { id: "rw-mechanism", title: "State-capacity mechanism", text: "Assumed that aid aligned with government planning could rapidly rebuild institutions and expand services.", type: "mechanism", whyItMatters: "Explains why donors gave money directly to the government.", limitation: "Direct funding strengthens the ruling party's power." },
      { id: "rw-alternative", title: "Domestic strategy", text: "Strong government planning, social discipline, and domestic policy choices drove the outcomes.", type: "alternative_explanation", whyItMatters: "Suggests the Rwandan government deserves the credit, not just the aid.", limitation: "The government could not have done it without the funding." },
      { id: "rw-comparison", title: "Aid or effectiveness?", text: "Did outcomes come from foreign aid, domestic governance choices, or the interaction of both?", type: "comparison_problem", whyItMatters: "Highlights the difficulty of crediting foreign aid alone.", limitation: "They are impossible to separate." },
      { id: "rw-missing", title: "Missing evidence", text: "We need evidence about which gains would continue if foreign aid declined significantly.", type: "missing_evidence", whyItMatters: "Questions the long-term sustainability of the progress.", limitation: "Can only be tested if aid is actually withdrawn." }
    ],
    sources: [
      { title: "World Bank: Rwanda overview", url: "https://www.worldbank.org/en/country/rwanda/overview" },
      { title: "UNDP Rwanda", url: "https://www.undp.org/rwanda" }
    ],
    teacherNote: "Good case for asking whether development success and political openness must be judged separately."
  }
];
