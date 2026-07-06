import type { IndicatorSuggestion } from "../types";

export const indicatorSuggestions: IndicatorSuggestion[] = [
  // SANCTIONS - SUCCESS
  {
    id: "sanc-succ-behavior",
    track: "sanctions",
    type: "success",
    label: "Behavior change",
    measures: "Whether the target government changed its policy or reversed its action.",
    whyItMatters: "This is usually the main goal of sanctions.",
    possibleData: "News reports, official announcements, UN resolutions.",
    limitation: "Governments rarely admit they changed because of sanctions; they might claim other reasons."
  },
  {
    id: "sanc-succ-bargaining",
    track: "sanctions",
    type: "success",
    label: "Bargaining pressure",
    measures: "Whether the target government agreed to negotiations or offered concessions.",
    whyItMatters: "Sanctions can bring targets to the table even if they don't immediately surrender.",
    possibleData: "Diplomatic meetings, draft agreements, changes in rhetoric.",
    limitation: "Negotiating is not the same as signing a deal or changing behavior permanently."
  },
  {
    id: "sanc-succ-economic",
    track: "sanctions",
    type: "success",
    label: "Economic constraint",
    measures: "Whether the target's economy, military funding, or key industries were damaged.",
    whyItMatters: "This shows the sanctions had teeth and raised the cost of the target's actions.",
    possibleData: "GDP growth, inflation rates, military spending, trade volume.",
    limitation: "Economic damage does not automatically lead to political change."
  },
  
  // SANCTIONS - HARM/COST
  {
    id: "sanc-harm-civilian",
    track: "sanctions",
    type: "harm_or_cost",
    label: "Civilian impact",
    measures: "Increases in poverty, child mortality, unemployment, or shortages of medicine.",
    whyItMatters: "Sanctions are meant to target leaders, but often hurt ordinary people the most.",
    possibleData: "Health statistics, inflation of basic goods, NGO reports.",
    limitation: "It is hard to know how much harm was caused by sanctions vs. the target government's own mismanagement."
  },
  {
    id: "sanc-harm-evasion",
    track: "sanctions",
    type: "harm_or_cost",
    label: "Regime adaptation/evasion",
    measures: "Whether leaders found new trading partners, built black markets, or used the sanctions as an excuse to crack down on opposition.",
    whyItMatters: "Shows that sanctions might backfire and make the regime stronger or more repressive internally.",
    possibleData: "Smuggling data, trade with non-sanctioning countries, human rights reports.",
    limitation: "Evasion is often secretive and hard to measure accurately."
  },

  // SANCTIONS - UNCERTAINTY
  {
    id: "sanc-unc-alternative",
    track: "sanctions",
    type: "uncertainty_or_alternative",
    label: "Alternative forces",
    measures: "Whether military threats, domestic protests, or diplomatic offers happened at the same time.",
    whyItMatters: "If multiple things happened, we can't prove sanctions alone caused the outcome.",
    possibleData: "Timelines of military deployments, domestic election results, diplomatic deals.",
    limitation: "You cannot rerun history to isolate just one variable."
  },

  // AID - SUCCESS
  {
    id: "aid-succ-welfare",
    track: "aid",
    type: "success",
    label: "Welfare improvement",
    measures: "Whether people got better access to health, education, water, or income.",
    whyItMatters: "This measures the direct human benefit of the aid.",
    possibleData: "Literacy rates, life expectancy, poverty rates, access to clean water.",
    limitation: "Welfare gains often disappear if the aid funding stops."
  },
  {
    id: "aid-succ-capacity",
    track: "aid",
    type: "success",
    label: "State capacity",
    measures: "Whether the local government became better at delivering services on its own.",
    whyItMatters: "Aid aims to build up local institutions, not just provide charity.",
    possibleData: "Tax revenue collection, civil service employment, government budgets.",
    limitation: "A capable state can still be corrupt or authoritarian."
  },
  {
    id: "aid-succ-participation",
    track: "aid",
    type: "success",
    label: "Local participation",
    measures: "Whether marginalized groups had a real voice in how the aid was used.",
    whyItMatters: "Measures whether the aid was democratic and community-driven.",
    possibleData: "Meeting attendance, surveys of local trust, demographics of local committees.",
    limitation: "Attendance at meetings doesn't prove that marginalized groups actually influenced the decisions."
  },

  // AID - HARM/COST
  {
    id: "aid-harm-corruption",
    track: "aid",
    type: "harm_or_cost",
    label: "Corruption or elite capture",
    measures: "Whether aid money was stolen or used to benefit local elites rather than the poor.",
    whyItMatters: "Shows that aid can worsen inequality or strengthen bad leaders.",
    possibleData: "Audits, investigative journalism, surveys of local perceptions of corruption.",
    limitation: "Corruption is hidden; official numbers usually underestimate it."
  },
  {
    id: "aid-harm-dependency",
    track: "aid",
    type: "harm_or_cost",
    label: "Donor dependency",
    measures: "Whether the local government relies so much on foreign aid that it ignores its own citizens.",
    whyItMatters: "If a government answers to foreign donors instead of voters, democracy is weakened.",
    possibleData: "Percentage of the national budget funded by aid, tax-to-GDP ratios.",
    limitation: "For very poor countries, dependency might be the only way to fund schools and hospitals."
  },

  // AID - UNCERTAINTY
  {
    id: "aid-unc-sustainability",
    track: "aid",
    type: "uncertainty_or_alternative",
    label: "Sustainability after withdrawal",
    measures: "Whether the projects or institutions survived after the foreign money stopped.",
    whyItMatters: "Tests whether the aid created lasting change or just temporary relief.",
    possibleData: "Follow-up evaluations 5-10 years later.",
    limitation: "We can't measure sustainability until years after the project ends, which is often too late."
  }
];
