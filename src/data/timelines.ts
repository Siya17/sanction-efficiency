import type { TimelineEvent } from "../types";

export const timelines: TimelineEvent[] = [
  { id: "iraq-1990-invasion", caseId: "iraq-1990s-sanctions", year: 1990, title: "Kuwait invasion", description: "Iraq invades Kuwait; UN sanctions begin as part of the international response.", type: "conflict" },
  { id: "iraq-1991-ceasefire", caseId: "iraq-1990s-sanctions", year: 1991, title: "Ceasefire and inspections", description: "Postwar demands link sanctions to weapons inspections and compliance.", type: "policy" },
  { id: "iraq-1995-oil-food", caseId: "iraq-1990s-sanctions", year: 1995, title: "Oil-for-Food approved", description: "Humanitarian exemptions are expanded, showing concern over civilian costs.", type: "social" },
  { id: "iraq-1998-inspection-crisis", caseId: "iraq-1990s-sanctions", year: 1998, title: "Inspection crisis", description: "Tensions over inspections show that compliance pressure remained contested.", type: "political" },
  { id: "iraq-2003-invasion", caseId: "iraq-1990s-sanctions", year: 2003, title: "Regime removed by war", description: "Regime change comes through invasion, complicating claims about sanctions alone.", type: "conflict" },

  { id: "iran-2006-un", caseId: "iran-nuclear-sanctions", year: 2006, title: "UN sanctions begin", description: "UN measures target nuclear-related concerns and compliance demands.", type: "sanction" },
  { id: "iran-2010-pressure", caseId: "iran-nuclear-sanctions", year: 2010, title: "Financial pressure expands", description: "Sanctions increasingly target finance, trade, and oil-linked activity.", type: "economic" },
  { id: "iran-2013-talks", caseId: "iran-nuclear-sanctions", year: 2013, title: "Negotiations intensify", description: "Diplomacy becomes central to the sanctions story.", type: "negotiation" },
  { id: "iran-2015-jcpoa", caseId: "iran-nuclear-sanctions", year: 2015, title: "JCPOA reached", description: "A negotiated agreement creates a partial-success benchmark.", type: "negotiation" },
  { id: "iran-2018-us-exit", caseId: "iran-nuclear-sanctions", year: 2018, title: "US exits deal", description: "Renewed pressure highlights reversibility and fragility.", type: "policy" },

  { id: "sa-1960s-isolation", caseId: "south-africa-apartheid-sanctions", year: 1962, title: "UN pressure grows", description: "International criticism of apartheid becomes more organized.", type: "political" },
  { id: "sa-1977-arms", caseId: "south-africa-apartheid-sanctions", year: 1977, title: "UN arms embargo", description: "A mandatory arms embargo targets security capacity and legitimacy.", type: "sanction" },
  { id: "sa-1980s-divestment", caseId: "south-africa-apartheid-sanctions", year: 1985, title: "Divestment campaigns", description: "Civil society pressure expands through universities, firms, and public campaigns.", type: "social" },
  { id: "sa-1990-mandela", caseId: "south-africa-apartheid-sanctions", year: 1990, title: "Negotiations open", description: "Mandela is released and transition talks begin amid domestic and external pressure.", type: "negotiation" },
  { id: "sa-1994-election", caseId: "south-africa-apartheid-sanctions", year: 1994, title: "Democratic election", description: "Majority-rule elections mark a transition, not proof that sanctions alone caused it.", type: "political" },

  { id: "russia-2014-crimea", caseId: "russia-2014-2022-sanctions", year: 2014, title: "Crimea sanctions", description: "Sanctions begin after Crimea and eastern Ukraine escalation.", type: "sanction" },
  { id: "russia-2015-adaptation", caseId: "russia-2014-2022-sanctions", year: 2015, title: "Adaptation begins", description: "Russia and partners adjust trade, finance, and supply routes.", type: "economic" },
  { id: "russia-2022-invasion", caseId: "russia-2014-2022-sanctions", year: 2022, title: "Full-scale invasion", description: "Sanctions expand dramatically after the full-scale invasion of Ukraine.", type: "conflict" },
  { id: "russia-2023-evasion", caseId: "russia-2014-2022-sanctions", year: 2023, title: "Evasion focus", description: "Policy attention shifts toward enforcement, evasion, and third-country routes.", type: "policy" },
  { id: "russia-2024-long-term", caseId: "russia-2014-2022-sanctions", year: 2024, title: "Long-term pressure", description: "The case remains unresolved, with attention on capacity constraints and adaptation.", type: "economic" },

  { id: "afg-2001-start", caseId: "afghanistan-reconstruction-aid", year: 2001, title: "Aid surge begins", description: "Post-2001 reconstruction and state-building aid begins.", type: "aid" },
  { id: "afg-2006-services", caseId: "afghanistan-reconstruction-aid", year: 2006, title: "Service expansion", description: "Many donor projects focus on schools, clinics, roads, and public services.", type: "social" },
  { id: "afg-2014-transition", caseId: "afghanistan-reconstruction-aid", year: 2014, title: "Security transition", description: "International military and aid roles change, testing state capacity.", type: "political" },
  { id: "afg-2021-collapse", caseId: "afghanistan-reconstruction-aid", year: 2021, title: "State collapse", description: "The Western-backed government collapses, raising sustainability questions.", type: "conflict" },
  { id: "afg-2022-after", caseId: "afghanistan-reconstruction-aid", year: 2022, title: "After donor withdrawal", description: "Students compare aid-period gains with what remained afterward.", type: "social" },

  { id: "ph-2003-launch", caseId: "philippines-kalahi-cidss", year: 2003, title: "Program launch", description: "KALAHI-CIDSS begins as a community-driven development program.", type: "aid" },
  { id: "ph-2010-scale", caseId: "philippines-kalahi-cidss", year: 2010, title: "Scale-up", description: "Community planning and small infrastructure projects expand.", type: "aid" },
  { id: "ph-2013-evaluation", caseId: "philippines-kalahi-cidss", year: 2013, title: "Evaluation focus", description: "Evidence debates focus on participation, welfare, and local governance.", type: "social" },
  { id: "ph-2014-national", caseId: "philippines-kalahi-cidss", year: 2014, title: "National CDD project", description: "The approach becomes part of a larger national community-driven development effort.", type: "policy" },
  { id: "ph-2019-maintenance", caseId: "philippines-kalahi-cidss", year: 2019, title: "Sustainability questions", description: "Project maintenance and uneven local effects remain important questions.", type: "political" },

  { id: "col-2000-plan", caseId: "colombia-plan-colombia", year: 2000, title: "Plan Colombia begins", description: "Security and counternarcotics aid expands alongside state-building goals.", type: "aid" },
  { id: "col-2002-security", caseId: "colombia-plan-colombia", year: 2002, title: "Security emphasis", description: "Policy places strong emphasis on armed groups, territorial control, and state capacity.", type: "conflict" },
  { id: "col-2006-debate", caseId: "colombia-plan-colombia", year: 2006, title: "Human-rights debate", description: "Security gains are debated alongside displacement and civilian protection concerns.", type: "social" },
  { id: "col-2012-talks", caseId: "colombia-plan-colombia", year: 2012, title: "Peace talks", description: "Negotiations create another benchmark for judging earlier aid and security policy.", type: "negotiation" },
  { id: "col-2016-accord", caseId: "colombia-plan-colombia", year: 2016, title: "Peace accord", description: "The peace accord complicates claims about aid, domestic reform, and conflict trends.", type: "political" },

  { id: "rw-1994-genocide", caseId: "rwanda-reconstruction-aid", year: 1994, title: "Post-genocide recovery", description: "Aid supports emergency recovery and reconstruction after genocide.", type: "aid" },
  { id: "rw-2000-planning", caseId: "rwanda-reconstruction-aid", year: 2000, title: "Development planning", description: "Aid increasingly aligns with state planning and reconstruction priorities.", type: "political" },
  { id: "rw-2005-services", caseId: "rwanda-reconstruction-aid", year: 2005, title: "Service expansion", description: "Health, education, and infrastructure become central development benchmarks.", type: "social" },
  { id: "rw-2010-capacity", caseId: "rwanda-reconstruction-aid", year: 2010, title: "Capacity gains debated", description: "Observers debate state capacity, development progress, and political constraints.", type: "political" },
  { id: "rw-2015-sustainability", caseId: "rwanda-reconstruction-aid", year: 2015, title: "Sustainability questions", description: "Aid dependence and political openness remain part of the success judgment.", type: "economic" },
];

export function getTimelineForCase(caseId: string) {
  return timelines.filter((event) => event.caseId === caseId).sort((a, b) => a.year - b.year);
}
