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
      "After Iraq invaded Kuwait in 1990, the UN imposed broad sanctions intended to force withdrawal and later constrain weapons programs. The case is difficult because sanctions were paired with war, inspections, oil-for-food arrangements, and major civilian hardship.",
    successCriteria: [
      "Target changed behavior",
      "Sanctions created bargaining pressure",
      "Sanctions weakened the regime or target actor",
      "Sanctions avoided civilian harm",
    ],
    evidenceCards: [
      {
        id: "iraq-goal",
        title: "Policy goal",
        text: "The sanctions aimed to reverse aggression, constrain Iraqi military capacity, and pressure the government to comply with UN demands.",
        type: "policy_goal",
        sourceTitle: "UN Security Council sanctions information",
        sourceUrl: "https://main.un.org/securitycouncil/en/sanctions/information",
      },
      {
        id: "iraq-success",
        title: "Pressure and inspections",
        text: "Supporters argue sanctions helped keep Iraq isolated and increased pressure around weapons inspections, even if compliance was uneven and contested.",
        type: "supporting_evidence",
      },
      {
        id: "iraq-failure",
        title: "Regime survival",
        text: "The Iraqi government did not fall because of sanctions, and many key political outcomes came from military force or later events.",
        type: "complicating_evidence",
      },
      {
        id: "iraq-civilians",
        title: "Civilian harm",
        text: "Broad sanctions were widely criticized for worsening living conditions and making ordinary people bear costs that leaders could shift or exploit.",
        type: "data_point",
      },
      {
        id: "iraq-alternative",
        title: "Alternative explanations",
        text: "War damage, authoritarian rule, oil markets, and regional politics all shaped outcomes, making it hard to isolate sanctions as the main cause.",
        type: "alternative_explanation",
      },
      {
        id: "iraq-missing",
        title: "Missing evidence",
        text: "Students would need clearer evidence about leadership decision-making and what would have happened without sanctions.",
        type: "missing_evidence",
      },
    ],
    sources: [
      {
        title: "UN Security Council sanctions information",
        url: "https://main.un.org/securitycouncil/en/sanctions/information",
        note: "Background on UN sanctions committees and practice.",
      },
      {
        title: "Global Sanctions Data Base",
        url: "https://globalsanctionsdatabase.com/",
        note: "Dataset for comparing sanctions episodes.",
      },
      {
        title: "TIES sanctions dataset",
        url: "https://sanctions.web.unc.edu/",
        note: "Dataset on threats and imposition of sanctions.",
      },
    ],
    teacherNote:
      "Useful for showing how a policy can appear coercive while also producing severe humanitarian controversy.",
  },
  {
    id: "iran-nuclear-sanctions",
    track: "sanctions",
    country: "Iran",
    period: "2000s-2010s",
    policy: "Nuclear and financial sanctions linked to diplomacy",
    question: "Did sanctions work in the case of Iran?",
    background:
      "Iran faced UN, US, and EU sanctions tied to concerns about its nuclear program. Sanctions were part of a broader diplomatic process that produced the 2015 nuclear agreement, followed by renewed pressure and disputed compliance politics.",
    successCriteria: [
      "Sanctions supported negotiations",
      "Target changed behavior",
      "Sanctions created bargaining pressure",
      "Sanctions produced long-term compliance",
    ],
    evidenceCards: [
      {
        id: "iran-goal",
        title: "Policy goal",
        text: "The sanctions aimed to pressure Iran into limits, monitoring, and negotiations over its nuclear activities.",
        type: "policy_goal",
        sourceTitle: "IAEA Iran focus page",
        sourceUrl: "https://www.iaea.org/newscenter/focus/iran",
      },
      {
        id: "iran-success",
        title: "Negotiating leverage",
        text: "A success argument says financial and oil pressure helped make a negotiated nuclear deal politically possible.",
        type: "supporting_evidence",
      },
      {
        id: "iran-failure",
        title: "Fragile results",
        text: "A failure argument points out that sanctions did not settle the dispute permanently, especially after later policy reversals.",
        type: "complicating_evidence",
      },
      {
        id: "iran-civilians",
        title: "Economic strain",
        text: "Sanctions affected ordinary economic life and access to some goods, so students must judge whether costs were acceptable.",
        type: "data_point",
      },
      {
        id: "iran-alternative",
        title: "Diplomacy mattered",
        text: "Diplomatic openings, domestic politics, security calculations, and technical monitoring also shaped the outcome.",
        type: "alternative_explanation",
      },
      {
        id: "iran-missing",
        title: "Missing evidence",
        text: "Students would need more evidence from Iranian decision-makers about whether pressure, incentives, or security concerns mattered most.",
        type: "missing_evidence",
      },
    ],
    sources: [
      {
        title: "IAEA: Iran",
        url: "https://www.iaea.org/newscenter/focus/iran",
      },
      {
        title: "EU restrictive measures against Iran",
        url: "https://www.consilium.europa.eu/en/policies/sanctions/iran/",
      },
      {
        title: "TIES sanctions dataset",
        url: "https://sanctions.web.unc.edu/",
      },
    ],
  },
  {
    id: "south-africa-apartheid-sanctions",
    track: "sanctions",
    country: "South Africa",
    period: "1970s-1990s",
    policy: "Apartheid-era sanctions, divestment, and diplomatic pressure",
    question: "Did sanctions work in the case of South Africa?",
    background:
      "International sanctions, divestment campaigns, sports boycotts, and diplomatic isolation targeted South Africa's apartheid system. The transition to majority rule also depended on domestic resistance, elite negotiations, economic change, and regional shifts.",
    successCriteria: [
      "Target changed behavior",
      "Sanctions weakened the regime or target actor",
      "Sanctions supported negotiations",
      "Sanctions produced long-term compliance",
    ],
    evidenceCards: [
      {
        id: "sa-goal",
        title: "Policy goal",
        text: "The pressure aimed to end apartheid and push the government toward political rights and majority rule.",
        type: "policy_goal",
      },
      {
        id: "sa-success",
        title: "Symbolic and economic pressure",
        text: "Supporters argue sanctions and divestment raised costs for apartheid and signaled that normal relations required political change.",
        type: "supporting_evidence",
      },
      {
        id: "sa-failure",
        title: "Not sufficient alone",
        text: "Sanctions did not by themselves create the transition; internal organizing and bargaining were central.",
        type: "complicating_evidence",
      },
      {
        id: "sa-civilians",
        title: "Social effects",
        text: "Economic pressure could also hurt workers and communities, so students must ask who bore the costs.",
        type: "data_point",
      },
      {
        id: "sa-alternative",
        title: "Domestic agency",
        text: "Mass protest, labor action, leadership choices, and changing security conditions may explain much of the outcome.",
        type: "alternative_explanation",
      },
      {
        id: "sa-missing",
        title: "Missing evidence",
        text: "Students would need evidence about how business, political leaders, and opposition groups weighed outside pressure.",
        type: "missing_evidence",
      },
    ],
    sources: [
      {
        title: "UN Digital Library",
        url: "https://digitallibrary.un.org/",
        note: "Searchable UN records on apartheid resolutions.",
      },
      {
        title: "Global Sanctions Data Base",
        url: "https://globalsanctionsdatabase.com/",
      },
      {
        title: "TIES sanctions dataset",
        url: "https://sanctions.web.unc.edu/",
      },
    ],
  },
  {
    id: "russia-2014-2022-sanctions",
    track: "sanctions",
    country: "Russia",
    period: "2014-present",
    policy: "Sanctions after Crimea and expanded sanctions after the 2022 invasion of Ukraine",
    question: "Did sanctions work in the case of Russia?",
    background:
      "Russia faced sanctions after the 2014 seizure of Crimea, then much wider financial, trade, energy, and individual sanctions after the 2022 full-scale invasion of Ukraine. Outcomes vary depending on whether students judge deterrence, economic weakening, bargaining pressure, or civilian harm.",
    successCriteria: [
      "Target changed behavior",
      "Sanctions created bargaining pressure",
      "Sanctions weakened the regime or target actor",
      "Sanctions avoided civilian harm",
    ],
    evidenceCards: [
      {
        id: "russia-goal",
        title: "Policy goal",
        text: "The sanctions aimed to impose costs, reduce war capacity, and pressure Russia to change course in Ukraine.",
        type: "policy_goal",
        sourceTitle: "EU sanctions against Russia",
        sourceUrl: "https://www.consilium.europa.eu/en/policies/sanctions-against-russia/",
      },
      {
        id: "russia-success",
        title: "Economic and technology limits",
        text: "A success argument says sanctions constrained finance, trade, and access to some technologies important for military and industrial capacity.",
        type: "supporting_evidence",
      },
      {
        id: "russia-failure",
        title: "Behavior did not quickly change",
        text: "A failure argument notes that Russia did not promptly end the war or reverse earlier territorial moves.",
        type: "complicating_evidence",
      },
      {
        id: "russia-civilians",
        title: "Broader costs",
        text: "Sanctions affected businesses, consumers, and global markets, raising questions about distribution of costs beyond leaders.",
        type: "data_point",
      },
      {
        id: "russia-alternative",
        title: "Adaptation and partners",
        text: "Russia's adaptation, alternative trade routes, energy revenues, and outside partners complicate claims about sanctions alone.",
        type: "alternative_explanation",
      },
      {
        id: "russia-missing",
        title: "Missing evidence",
        text: "Students would need better evidence on military supply constraints and private debates among Russian decision-makers.",
        type: "missing_evidence",
      },
    ],
    sources: [
      {
        title: "EU: Sanctions against Russia",
        url: "https://www.consilium.europa.eu/en/policies/sanctions-against-russia/",
      },
      {
        title: "US Treasury: Ukraine/Russia-related sanctions",
        url: "https://home.treasury.gov/policy-issues/financial-sanctions/sanctions-programs-and-country-information/ukraine-russia-related-sanctions",
      },
      {
        title: "Global Sanctions Data Base",
        url: "https://globalsanctionsdatabase.com/",
      },
    ],
  },
  {
    id: "afghanistan-reconstruction-aid",
    track: "aid",
    country: "Afghanistan",
    period: "2001-2021",
    policy: "Reconstruction, development, and state-building aid",
    question: "Did foreign aid work in the case of Afghanistan?",
    background:
      "After 2001, donors funded reconstruction, services, security forces, and state-building in Afghanistan. Some projects expanded access to services, but corruption, insecurity, dependency, and the 2021 state collapse make the meaning of success deeply contested.",
    successCriteria: [
      "Aid improved welfare",
      "Aid built state capacity",
      "Aid increased government legitimacy",
      "Aid produced sustainable gains after donors left",
    ],
    evidenceCards: [
      {
        id: "afg-goal",
        title: "Policy goal",
        text: "Aid aimed to rebuild services, strengthen institutions, support security, and improve living conditions after decades of war.",
        type: "policy_goal",
        sourceTitle: "SIGAR",
        sourceUrl: "https://www.sigar.mil/",
      },
      {
        id: "afg-success",
        title: "Service gains",
        text: "A success argument points to expanded schools, clinics, infrastructure, and opportunities in some communities during the aid period.",
        type: "supporting_evidence",
      },
      {
        id: "afg-failure",
        title: "State collapse",
        text: "A failure argument points to corruption, weak institutions, donor dependence, and the collapse of the Western-backed government.",
        type: "complicating_evidence",
      },
      {
        id: "afg-civilians",
        title: "Uneven welfare",
        text: "Benefits were uneven across gender, region, class, and security conditions, so national averages can hide local realities.",
        type: "data_point",
      },
      {
        id: "afg-alternative",
        title: "Conflict environment",
        text: "War strategy, Taliban organization, regional politics, and military decisions shaped outcomes alongside development aid.",
        type: "alternative_explanation",
      },
      {
        id: "afg-missing",
        title: "Missing evidence",
        text: "Students would need local evidence about which services lasted and which depended on foreign money and contractors.",
        type: "missing_evidence",
      },
    ],
    sources: [
      {
        title: "SIGAR reports",
        url: "https://www.sigar.mil/",
      },
      {
        title: "OECD Creditor Reporting System",
        url: "https://stats.oecd.org/Index.aspx?DataSetCode=CRS1",
      },
      {
        title: "World Development Indicators",
        url: "https://databank.worldbank.org/source/world-development-indicators",
      },
    ],
  },
  {
    id: "philippines-kalahi-cidss",
    track: "aid",
    country: "Philippines",
    period: "2000s-2010s",
    policy: "KALAHI-CIDSS community-driven development aid",
    question: "Did foreign aid work in the case of the Philippines?",
    background:
      "KALAHI-CIDSS supported community-driven development by funding local planning and small infrastructure projects. The case lets students judge whether aid worked through welfare gains, participation, local capacity, or legitimacy.",
    successCriteria: [
      "Aid improved welfare",
      "Aid built state capacity",
      "Aid increased government legitimacy",
      "Aid avoided corruption or elite capture",
    ],
    evidenceCards: [
      {
        id: "ph-goal",
        title: "Policy goal",
        text: "The program aimed to let communities identify priorities, manage funds, and deliver small public goods.",
        type: "policy_goal",
        sourceTitle: "World Bank KALAHI-CIDSS",
        sourceUrl: "https://www.worldbank.org/en/country/philippines/brief/kalahi-cidss-national-community-driven-development-project",
      },
      {
        id: "ph-success",
        title: "Local participation",
        text: "A success argument says community planning improved participation and helped projects match local needs more closely.",
        type: "supporting_evidence",
      },
      {
        id: "ph-failure",
        title: "Limited transformation",
        text: "A cautious view says small projects may improve services without changing deeper poverty, power, or state capacity.",
        type: "complicating_evidence",
      },
      {
        id: "ph-civilians",
        title: "Community effects",
        text: "Benefits depended on whether marginalized groups could actually influence decisions, not just attend meetings.",
        type: "data_point",
      },
      {
        id: "ph-alternative",
        title: "Local politics",
        text: "Pre-existing local leadership, municipal capacity, and national growth could explain some positive outcomes.",
        type: "alternative_explanation",
      },
      {
        id: "ph-missing",
        title: "Missing evidence",
        text: "Students would need follow-up evidence on whether projects were maintained after funding cycles ended.",
        type: "missing_evidence",
      },
    ],
    sources: [
      {
        title: "World Bank: KALAHI-CIDSS",
        url: "https://www.worldbank.org/en/country/philippines/brief/kalahi-cidss-national-community-driven-development-project",
      },
      {
        title: "World Bank Independent Evaluation Group",
        url: "https://ieg.worldbankgroup.org/",
      },
      {
        title: "OECD Creditor Reporting System",
        url: "https://stats.oecd.org/Index.aspx?DataSetCode=CRS1",
      },
    ],
  },
  {
    id: "colombia-plan-colombia",
    track: "aid",
    country: "Colombia",
    period: "2000s-2010s",
    policy: "Plan Colombia security and development aid",
    question: "Did foreign aid work in the case of Colombia?",
    background:
      "Plan Colombia mixed security assistance, counternarcotics, institution-building, and development goals. Violence declined in many areas over time, but human rights concerns, displacement, coca cultivation dynamics, and domestic reforms complicate any simple verdict.",
    successCriteria: [
      "Aid reduced violence",
      "Aid built state capacity",
      "Aid improved welfare",
      "Aid avoided corruption or elite capture",
    ],
    evidenceCards: [
      {
        id: "col-goal",
        title: "Policy goal",
        text: "Aid aimed to strengthen the state, reduce drug-related violence, and support security and development.",
        type: "policy_goal",
        sourceTitle: "Congressional Research Service",
        sourceUrl: "https://crsreports.congress.gov/",
      },
      {
        id: "col-success",
        title: "Security gains",
        text: "A success argument links aid and reforms to improved state presence and reduced violence in many areas.",
        type: "supporting_evidence",
      },
      {
        id: "col-failure",
        title: "Rights and displacement",
        text: "A failure argument points to human rights abuses, displacement, and uneven protection of civilians.",
        type: "complicating_evidence",
      },
      {
        id: "col-civilians",
        title: "Uneven effects",
        text: "Some communities gained security, while others experienced militarization, displacement, or continued insecurity.",
        type: "data_point",
      },
      {
        id: "col-alternative",
        title: "Domestic reforms",
        text: "Colombian political choices, military reforms, local governance, and changing armed group strategies also mattered.",
        type: "alternative_explanation",
      },
      {
        id: "col-missing",
        title: "Missing evidence",
        text: "Students would need local evidence separating the effects of foreign aid from Colombia's own policy choices.",
        type: "missing_evidence",
      },
    ],
    sources: [
      {
        title: "Congressional Research Service reports",
        url: "https://crsreports.congress.gov/",
      },
      {
        title: "OECD Creditor Reporting System",
        url: "https://stats.oecd.org/Index.aspx?DataSetCode=CRS1",
      },
      {
        title: "World Development Indicators",
        url: "https://databank.worldbank.org/source/world-development-indicators",
      },
    ],
  },
  {
    id: "rwanda-reconstruction-aid",
    track: "aid",
    country: "Rwanda",
    period: "1994-2010s",
    policy: "Post-genocide reconstruction and development aid",
    question: "Did foreign aid work in the case of Rwanda?",
    background:
      "After the 1994 genocide, Rwanda received aid for reconstruction, health, education, infrastructure, and governance. The case raises hard questions about rapid development gains, state capacity, political control, donor influence, and whose outcomes count as success.",
    successCriteria: [
      "Aid improved welfare",
      "Aid built state capacity",
      "Aid increased government legitimacy",
      "Aid produced sustainable gains after donors left",
    ],
    evidenceCards: [
      {
        id: "rw-goal",
        title: "Policy goal",
        text: "Aid aimed to rebuild services, support recovery, and help create a functioning state after mass violence.",
        type: "policy_goal",
        sourceTitle: "World Bank Rwanda overview",
        sourceUrl: "https://www.worldbank.org/en/country/rwanda/overview",
      },
      {
        id: "rw-success",
        title: "Development gains",
        text: "A success argument points to improvements in services, administration, and development planning in the post-genocide period.",
        type: "supporting_evidence",
      },
      {
        id: "rw-failure",
        title: "Political tradeoffs",
        text: "A skeptical argument says development gains must be weighed against concerns about political freedom and accountability.",
        type: "complicating_evidence",
      },
      {
        id: "rw-civilians",
        title: "Welfare outcomes",
        text: "Students should ask whether national improvements reached rural households, vulnerable groups, and survivors equally.",
        type: "data_point",
      },
      {
        id: "rw-alternative",
        title: "Government strategy",
        text: "Strong domestic planning, social discipline, and regional politics may explain outcomes alongside foreign aid.",
        type: "alternative_explanation",
      },
      {
        id: "rw-missing",
        title: "Missing evidence",
        text: "Students would need evidence about donor dependence, local voice, and which gains could last without aid.",
        type: "missing_evidence",
      },
    ],
    sources: [
      {
        title: "World Bank: Rwanda overview",
        url: "https://www.worldbank.org/en/country/rwanda/overview",
      },
      {
        title: "OECD Creditor Reporting System",
        url: "https://stats.oecd.org/Index.aspx?DataSetCode=CRS1",
      },
      {
        title: "World Development Indicators",
        url: "https://databank.worldbank.org/source/world-development-indicators",
      },
    ],
  },
];
