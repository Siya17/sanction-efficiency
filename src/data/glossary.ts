export type GlossaryEntry = {
  term: string;
  aliases?: string[];
  definition: string;
};

// Plain-English explanations for the jargon, abbreviations, and analytical
// terms that appear in the case briefings. GlossaryText matches the first
// occurrence of each term (or alias) in a piece of text and shows this
// definition on hover/focus. Keep every definition to one clear sentence.
export const glossary: GlossaryEntry[] = [
  // --- Organisations & institutions ---
  { term: "UN", aliases: ["United Nations"], definition: "The United Nations — the main international body where countries meet to handle war, peace, and global rules." },
  { term: "UN Security Council", definition: "The part of the United Nations that can order sanctions or military action; its decisions are binding on all members." },
  { term: "EU", aliases: ["European Union"], definition: "The European Union — a group of European countries that coordinate trade, money, and foreign policy." },
  { term: "G7", definition: "The Group of Seven — seven large wealthy democracies (US, UK, France, Germany, Italy, Japan, Canada) that coordinate economic policy." },
  { term: "US", aliases: ["U.S.", "United States"], definition: "The United States of America." },
  { term: "UK", aliases: ["U.K.", "United Kingdom"], definition: "The United Kingdom (Britain)." },
  { term: "IMF", definition: "The International Monetary Fund — a global body that lends money to countries and reports on their economies." },
  { term: "IAEA", definition: "The International Atomic Energy Agency — the UN's nuclear watchdog that inspects countries' nuclear sites." },
  { term: "NGO", aliases: ["NGOs"], definition: "Non-Governmental Organisation — a private, non-profit group (like a charity) that runs aid or advocacy work." },
  { term: "World Bank", definition: "A global institution that funds development projects like roads, schools, and water systems in poorer countries." },
  { term: "UNICEF", definition: "The United Nations Children's Fund — the UN agency focused on children's health and welfare." },
  { term: "SIGAR", definition: "Special Inspector General for Afghanistan Reconstruction — a US watchdog that audited how aid money in Afghanistan was spent." },

  // --- Case-specific names ---
  { term: "WMD", aliases: ["weapons of mass destruction"], definition: "Weapons of Mass Destruction — nuclear, chemical, or biological weapons that can kill huge numbers of people." },
  { term: "UNSCOM", definition: "The UN Special Commission — the team of weapons inspectors sent into Iraq in the 1990s." },
  { term: "Gulf War", definition: "The 1991 war in which a US-led coalition drove Iraqi forces out of Kuwait." },
  { term: "Duelfer Report", definition: "A 2004 US investigation that concluded Iraq had destroyed its banned weapons in 1991 but hoped to rebuild them later." },
  { term: "JCPOA", definition: "The 2015 Iran nuclear deal, in which Iran limited its nuclear programme in exchange for sanctions relief." },
  { term: "SWIFT", definition: "The global messaging network banks use to send money internationally; being cut off makes cross-border payments very hard." },
  { term: "apartheid", definition: "South Africa's former system of enforced racial segregation that denied Black citizens basic rights." },
  { term: "ANC", definition: "The African National Congress — the main movement (and later party) that fought to end apartheid, led by Nelson Mandela." },
  { term: "UDF", definition: "The United Democratic Front — a coalition that organised mass protest against apartheid inside South Africa in the 1980s." },
  { term: "COSATU", definition: "The Congress of South African Trade Unions — a large union federation that led anti-apartheid strikes." },
  { term: "divestment", definition: "Pulling investments and money out of a country or company to pressure it to change." },
  { term: "Crimea", definition: "A peninsula in Ukraine that Russia seized and annexed in 2014." },
  { term: "Bonn Agreement", definition: "The 2001 deal that set up Afghanistan's post-Taliban government and invited international help to rebuild it." },
  { term: "Taliban", definition: "The hardline Islamist movement that ruled Afghanistan before 2001 and returned to power in 2021." },
  { term: "KALAHI-CIDSS", definition: "A Philippine anti-poverty programme that let villages plan and manage their own small building projects." },
  { term: "barangays", aliases: ["barangay"], definition: "The smallest local government unit in the Philippines — roughly a village or neighbourhood." },
  { term: "Plan Colombia", definition: "A large US aid programme (from 2000) to help Colombia fight drug cartels and armed rebel groups." },
  { term: "FARC", definition: "The Revolutionary Armed Forces of Colombia — a left-wing guerrilla group that fought the Colombian state for decades." },
  { term: "coca", definition: "The plant used to make cocaine; a major cash crop in parts of Colombia." },
  { term: "counternarcotics", definition: "Efforts aimed at stopping the production and trafficking of illegal drugs." },
  { term: "counterinsurgency", definition: "Military and political efforts to defeat armed rebel groups fighting a government." },
  { term: "Vision 2020", definition: "Rwanda's national plan to grow into a middle-income country after the 1994 genocide." },
  { term: "genocide", definition: "The deliberate mass killing of a group of people; in Rwanda in 1994, around 800,000 people were murdered in about 100 days." },
  { term: "DRC", definition: "The Democratic Republic of the Congo — Rwanda's large, conflict-affected neighbour." },
  { term: "M23", definition: "An armed rebel group in eastern Congo that UN reports say Rwanda secretly backed." },
  { term: "budget support", definition: "Aid given straight into a government's budget to spend itself, rather than run as outside projects." },

  // --- Analytical concepts used in the guidance ---
  { term: "Coercion", definition: "Using pressure to force a target to change what it is doing." },
  { term: "Constraint", definition: "Weakening a target's ability to act — for example, cutting the money or supplies it needs." },
  { term: "Signaling", aliases: ["Signalling"], definition: "Sending a clear public message that a behaviour is unacceptable, even if it doesn't force an immediate change." },
  { term: "Attribution", definition: "Working out whether the policy actually caused the outcome, or whether something else did." },
  { term: "Local Ownership", definition: "Whether local people and institutions genuinely lead a project, rather than outsiders running it for them." },
  { term: "Cost-effectiveness", definition: "Whether the results were worth the money and effort spent to get them." },
  { term: "Outcome Change", definition: "Whether real conditions on the ground — like health, income, or safety — actually improved." },
];
