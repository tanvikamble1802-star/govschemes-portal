import { Language } from "../lib/translations";

export interface HowToApplyStep {
  stepNumber: number;
  stage?: string;
  title: string;
  description: string;
}

export interface SchemeHelpGuidance {
  whereToGetHelp: string;
  authorizedCentres: string[];
  guidanceNote: string;
}

export interface Scheme {
  id: string;
  name: string;
  fullName?: string;
  type: "Central Government" | "State Government";
  matchScore: number;
  description: string;
  whyEligible: string[];
  isDemo?: boolean;
  ministry?: string;
  benefit?: string;
  benefits?: string[];
  eligibilityCriteria?: string[];
  documentsRequired?: string[];
  howToApply?: HowToApplyStep[];
  officialPortalUrl?: string;
  helpGuidance?: SchemeHelpGuidance;
}

export const schemes: Scheme[] = [
  {
    id: "pmegp",
    name: "Pradhan Mantri Employment Generation Programme (PMEGP)",
    fullName: "Credit Linked Subsidy Programme by Ministry of MSME",
    type: "Central Government",
    matchScore: 94,
    description:
      "A flagship credit-linked subsidy programme supporting new micro-enterprises and self-employment opportunities across manufacturing and service sectors.",
    whyEligible: [
      "Age requirement satisfied (18+ years with verified identity documents)",
      "Applicant profile and household income meet priority beneficiary category",
      "Proposed enterprise qualifies for capital subsidy (up to 35% margin money)",
      "Applicant is establishing a new (greenfield) micro-enterprise venture",
    ],
    ministry: "Ministry of Micro, Small & Medium Enterprises (MSME)",
    benefit: "Subsidy up to 35% on project cost up to ₹50 Lakhs",
    benefits: [
      "Capital Subsidy: 15% to 35% of project cost depending on location (urban/rural) and applicant category.",
      "Project Outlay Limit: Financial assistance up to ₹50 Lakhs for manufacturing units and up to ₹20 Lakhs for service units.",
      "Low Margin Money: Beneficiary contributes only 5% to 10% of the project outlay from personal funds.",
      "Institutional Bank Finance: Balance 60% to 75% of capital is sanctioned as term loan and working capital by commercial banks.",
      "No Collateral for Micro Units: Eligible for collateral exemption under CGTMSE credit guarantee coverage.",
    ],
    eligibilityCriteria: [
      "Individuals aged 18 years and above (no upper age limit prescribed).",
      "Educational Qualification: Minimum VIII standard pass for projects costing above ₹10 Lakhs in manufacturing or above ₹5 Lakhs in services.",
      "Applicable strictly to new (greenfield) enterprise units; existing units or units already aided under other central/state schemes are not eligible.",
      "Self-Help Groups (SHGs) not availing other subsidies, registered cooperative societies, and charitable trusts are also eligible.",
    ],
    documentsRequired: [
      "Aadhaar Card and Permanent Account Number (PAN) Card",
      "Recent passport-sized colour photographs",
      "Detailed Project Report (DPR) / Business Plan outlining equipment, working capital, and revenue model",
      "Special Category / Caste Certificate (SC/ST/OBC/Minority/PH/Ex-Servicemen) if claiming higher subsidy",
      "Educational qualification certificates / Class VIII marksheet (for projects over ₹5 Lakhs / ₹10 Lakhs)",
      "Proof of permanent residence / Domicile Certificate",
      "Rural Area Certificate from the local Panchayat/revenue officer (if applying under rural category)",
    ],
    howToApply: [
      {
        stepNumber: 1,
        stage: "Online Registration",
        title: "Submit Online Application via PMEGP e-Portal",
        description:
          "Register on the official KVIC PMEGP portal (kviconline.gov.in) with your Aadhaar and personal entrepreneur details.",
      },
      {
        stepNumber: 2,
        stage: "Document Submission",
        title: "Upload Project Report & Certificates",
        description:
          "Upload your Detailed Project Report (DPR), educational proofs, caste/special category certificate, and residence verification.",
      },
      {
        stepNumber: 3,
        stage: "Committee Scrutiny",
        title: "District Level Task Force Committee (DLTFC) Review",
        description:
          "The DLTFC committee and implementing agency (KVIC/KVIB/DIC) examine project viability and forward it to your chosen financing bank.",
      },
      {
        stepNumber: 4,
        stage: "Credit Sanction & EDP",
        title: "Bank In-Principle Sanction & EDP Training",
        description:
          "The financing bank assesses the proposal and sanctions the loan. The applicant then completes mandatory Entrepreneurship Development Programme (EDP) training.",
      },
      {
        stepNumber: 5,
        stage: "Disbursement",
        title: "Loan Disbursement & Margin Money Adjustment",
        description:
          "The bank disburses the project loan. The government subsidy is deposited into a separate escrow account (TDR) and adjusted after 3 years of physical verification.",
      },
    ],
    officialPortalUrl: "https://pmegp.msme.gov.in/",
    helpGuidance: {
      whereToGetHelp:
        "Applicants can contact the District Industries Centre (DIC), State KVIC Directorate, or the MSME Development Institute in their respective district for free project counselling and application assistance.",
      authorizedCentres: [
        "District Industries Centre (DIC) located at your district collectorate",
        "State Office of the Khadi & Village Industries Commission (KVIC)",
        "Nodal Officer / MSME Lending Desks at participating Public Sector Commercial Banks",
      ],
      guidanceNote:
        "Officials at these recognized centres offer free guidance on Detailed Project Report (DPR) preparation and online portal registration. Do not pay any unverified third-party agents.",
    },
  },
  {
    id: "pm-mudra",
    name: "Pradhan Mantri MUDRA Yojana",
    fullName: "Micro Units Development & Refinance Agency (PMMY)",
    type: "Central Government",
    matchScore: 89,
    description:
      "Provides institutional credit support up to ₹20 Lakhs to micro and small business enterprises for income-generating activities without collateral.",
    whyEligible: [
      "Business profile matches non-farm, non-corporate micro-enterprise criteria",
      "Capital requirement fits within the eligible Shishu, Kishore, or Tarun borrowing tiers",
      "Applicant is an Indian citizen with a verified commercial income-generating trade",
      "Credit profile satisfies the institutional bank underwriting benchmarks",
    ],
    ministry: "Ministry of Finance",
    benefit: "Collateral-free loans up to ₹20 Lakhs",
    benefits: [
      "Zero Collateral: Loans up to ₹20 Lakhs are sanctioned without requiring mortgage, asset hypothecation, or third-party guarantors.",
      "Three Flexible Tiers: Shishu (loans up to ₹50,000), Kishore (₹50,000 to ₹5 Lakhs), and Tarun (₹5 Lakhs to ₹20 Lakhs).",
      "No Processing Fee: Zero processing charges for Shishu and Kishore loan categories across public sector banks.",
      "MUDRA RuPay Card: Issued with a pre-approved cash-credit limit for convenient day-to-day working capital withdrawals and POS purchases.",
      "Affordable Interest: Lending rates are regulated and benchmarked to standard bank lending margins without exploitative rates.",
    ],
    eligibilityCriteria: [
      "Any Indian citizen having an actionable business plan for a non-farm income generating activity in manufacturing, trading, or services.",
      "Eligible activities include small manufacturing units, shopkeepers, fruit/vegetable vendors, artisanal work, food processing, and transport vehicles.",
      "Applicant must not be in financial default with any bank or credit institution.",
      "Business entities can be sole proprietorships, partnerships, or private limited micro-enterprises.",
    ],
    documentsRequired: [
      "Duly completed MUDRA Application Form with 2 passport photographs",
      "Identity Proof (Aadhaar Card, Voter ID, Driving Licence, or Passport)",
      "Address Proof (Electricity Bill, Telephone Bill, or Domicile proof)",
      "Business Registration / Establishment Certificate (Shop & Establishment Act, Udyam Registration, or Trade License)",
      "Bank Account Statements for the last 6 months",
      "Quotations / Invoices for machinery, equipment, or inventory proposed to be purchased",
      "Projected cash flows or sales estimates for Kishore and Tarun category applications",
    ],
    howToApply: [
      {
        stepNumber: 1,
        stage: "Preparation",
        title: "Determine Borrowing Tier & Prepare Proposal",
        description:
          "Calculate capital requirements to identify the appropriate tier: Shishu (up to ₹50K), Kishore (₹50K to ₹5L), or Tarun (up to ₹20L). Gather vendor machinery quotations.",
      },
      {
        stepNumber: 2,
        stage: "Submission",
        title: "Apply Online via Udyamimitra or at a Bank Branch",
        description:
          "Submit your application digitally through the official Udyamimitra portal (udyamimitra.in) or visit any Commercial Bank, Regional Rural Bank (RRB), or Small Finance Bank.",
      },
      {
        stepNumber: 3,
        stage: "Assessment",
        title: "Bank Appraisal & Document Verification",
        description:
          "The branch officer evaluates the viability of the trade, verifies business address, checks credit bureau records, and inspects vendor invoices.",
      },
      {
        stepNumber: 4,
        stage: "Disbursement",
        title: "Loan Sanction & MUDRA Card Handover",
        description:
          "The loan is sanctioned and credited into the business operating account. A MUDRA RuPay card is handed over for working capital withdrawals.",
      },
    ],
    officialPortalUrl: "https://www.udyamimitra.in/",
    helpGuidance: {
      whereToGetHelp:
        "Entrepreneurs can approach the Lead District Manager (LDM) office at the District Collectorate or the MSME Credit Cell of any Public Sector Bank branch.",
      authorizedCentres: [
        "Lead District Manager (LDM) Office at your District Headquarters",
        "Nearest branch of any Public Sector Bank, Regional Rural Bank, or Small Finance Bank",
        "SIDBI Entrepreneurship Facilitation Desks",
      ],
      guidanceNote:
        "Banks are instructed by the Department of Financial Services to guide walk-in micro-entrepreneurs on MUDRA documentation free of cost.",
    },
  },
  {
    id: "stand-up-india",
    name: "Stand-Up India",
    fullName: "Stand-Up India Scheme for Greenfield Enterprises",
    type: "Central Government",
    matchScore: 86,
    description:
      "Facilitates bank loans between ₹10 Lakhs and ₹1 Crore to at least one Scheduled Caste (SC) or Scheduled Tribe (ST) borrower and at least one woman borrower per bank branch for greenfield enterprises.",
    whyEligible: [
      "Applicant demographic satisfies the targeted SC/ST or Woman entrepreneur priority group",
      "Proposed commercial venture is a newly established (greenfield) enterprise",
      "Applicant holds at least 51% controlling shareholding in the enterprise entity",
      "Sector of operation falls within manufacturing, services, agri-allied, or trading domains",
    ],
    ministry: "Ministry of Finance / SIDBI",
    benefit: "Bank loans between ₹10 Lakhs and ₹1 Crore",
    benefits: [
      "Substantial Capital Support: Composite loan (combining term loan and working capital) ranging from ₹10 Lakhs up to ₹1 Crore.",
      "Credit Guarantee Protection: Backed by the Credit Guarantee Fund for Stand-Up India (CGFSI), minimizing third-party guarantee hurdles.",
      "Subsidy Convergence: Margin money can be converged with eligible central and state capital subsidy schemes up to 15%.",
      "Comprehensive Handholding: Built-in support network for project preparation, financial literacy, and skill enhancement via SIDBI and NABARD.",
      "Repayment Flexibility: Repayment tenure up to 7 years with a moratorium period of up to 18 months.",
    ],
    eligibilityCriteria: [
      "Applicant must be an SC/ST individual and/or a woman entrepreneur aged 18 years or older.",
      "Loans are sanctioned strictly for Greenfield Projects (the applicant's first commercial venture in manufacturing, services, agri-allied, or trading).",
      "In non-individual enterprises (partnerships, LLPs, or private companies), 51% of shareholding and controlling stake must be held by SC/ST or Woman promoter.",
      "Applicant must not be in default to any bank or financial institution.",
    ],
    documentsRequired: [
      "Identity Proof (Aadhaar Card, Passport, or Voter ID)",
      "Residence Proof (Electricity bill, Ration card, or Land title)",
      "Caste Certificate issued by a competent revenue authority (for SC/ST applicants)",
      "Company Incorporation Certificate / Registered Partnership Deed demonstrating 51%+ qualifying ownership",
      "Comprehensive Detailed Project Report (DPR) with projected financial statements and cash flow analysis",
      "Proof of business premises (registered lease deed, rent agreement, or title deeds)",
      "Statutory clearances or environmental consent (if applicable for manufacturing activities)",
    ],
    howToApply: [
      {
        stepNumber: 1,
        stage: "Portal Registration",
        title: "Register on Stand-Up Mitra Portal",
        description:
          "Register on standupmitra.in as either a 'Trainee Borrower' (if you need project report mentoring) or a 'Ready Borrower' (if your project report is ready).",
      },
      {
        stepNumber: 2,
        stage: "Handholding Support",
        title: "Engage with Support Agencies (Optional)",
        description:
          "If needed, get linked with specialized agencies (SIDBI/NABARD/DIC) to refine your Detailed Project Report and credit documentation.",
      },
      {
        stepNumber: 3,
        stage: "Application Submission",
        title: "Submit Loan Application to Selected Banks",
        description:
          "Choose up to 3 bank branches in your preferred locality and submit your composite loan application along with required DPR and identity documents.",
      },
      {
        stepNumber: 4,
        stage: "Credit Appraisal & Sanction",
        title: "Bank Appraisal and Sanction Letter",
        description:
          "The branch inspects the site, verifies promoters' stake, assesses enterprise viability, and issues the formal credit sanction letter.",
      },
      {
        stepNumber: 5,
        stage: "Disbursement",
        title: "Term Loan Disbursement & Margin Convergence",
        description:
          "Term loan amounts are disbursed directly to equipment suppliers, and working capital limits are operationalized via overdraft or cash credit.",
      },
    ],
    officialPortalUrl: "https://www.standupmitra.in/",
    helpGuidance: {
      whereToGetHelp:
        "Applicants can reach out to SIDBI Regional Offices, the Lead District Manager (LDM), or designated Stand-Up India facilitation desks at nationalized bank branches.",
      authorizedCentres: [
        "Lead District Manager (LDM) office at your District Collectorate",
        "SIDBI Branch Offices and MSME Development Facilitation Desks",
        "District Development Offices of NABARD (for agri-allied enterprises)",
      ],
      guidanceNote:
        "The official Stand-Up Mitra portal provides a free directory of handholding agencies in your district for financial training, DPR guidance, and mentor matching.",
    },
  },
  {
    id: "maharashtra-entrepreneurship",
    name: "Maharashtra State Entrepreneurship Scheme",
    fullName: "Chief Minister Employment Generation Programme (CMEGP - Maharashtra)",
    type: "State Government",
    matchScore: 82,
    description:
      "State-level entrepreneurship support scheme facilitating financial assistance, margin money subsidies, and training for local entrepreneurs.",
    whyEligible: [
      "Applicant domicile verified for permanent Maharashtra state residency",
      "Proposed trade and commercial activity falls under the state priority economic development list",
      "Applicant satisfies state educational and age requirements for self-employment credit assistance",
      "Target enterprise category qualifies for state margin money subsidy allocations",
    ],
    isDemo: true,
    ministry: "Department of Industries, Government of Maharashtra",
    benefit: "Margin money financial assistance up to 35%",
    benefits: [
      "State Margin Money Subsidy: 15% to 35% margin money assistance provided by the Government of Maharashtra (DEMO DATA).",
      "Project Outlay Ceilings: Financial support for manufacturing projects up to ₹50 Lakhs and service projects up to ₹10 Lakhs (DEMO DATA).",
      "Special Concessions: Beneficiary contribution reduced to 5% for SC, ST, Women, and differently-abled applicants (DEMO DATA).",
      "State EDP Training: Complimentary industrial skills and entrepreneurial orientation certification (DEMO DATA).",
    ],
    eligibilityCriteria: [
      "Applicant must be a permanent resident / domicile holder of Maharashtra state (DEMO DATA).",
      "Age Criteria: 18 to 45 years (relaxation up to 50 years for SC, ST, Women, and Ex-Servicemen) (DEMO DATA).",
      "Educational Qualification: Minimum 7th standard pass (or 10th standard pass for manufacturing units above ₹25 Lakhs) (DEMO DATA).",
      "Only one person per family unit is eligible for financial assistance under the scheme (DEMO DATA).",
      "Applicant must not have previously availed of state margin money subsidies under similar self-employment programs (DEMO DATA).",
    ],
    documentsRequired: [
      "Maharashtra State Domicile Certificate (DEMO DATA)",
      "Aadhaar Card and Voter ID (DEMO DATA)",
      "Educational Qualification Certificates / School Leaving Certificate (DEMO DATA)",
      "Caste Certificate / Special Category Proof (if claiming enhanced state subsidy) (DEMO DATA)",
      "Detailed Project Profile with equipment cost quotations (DEMO DATA)",
      "Self-declaration of family income and no prior state subsidy receipt (DEMO DATA)",
    ],
    howToApply: [
      {
        stepNumber: 1,
        stage: "Profile Registration",
        title: "Online Registration on State Industries Portal",
        description:
          "Create a verified citizen profile with Aadhaar and domicile credentials on the state portal (DEMO DATA).",
      },
      {
        stepNumber: 2,
        stage: "Project Filing",
        title: "Fill Application Form & Upload DPR",
        description:
          "Select the trade category, district location, and chosen local bank branch, and upload the project report (DEMO DATA).",
      },
      {
        stepNumber: 3,
        stage: "District Scrutiny",
        title: "District Task Force Committee (DTFC) Review",
        description:
          "The District Level Scrutiny Committee evaluates the candidate and recommends the proposal to the lending bank (DEMO DATA).",
      },
      {
        stepNumber: 4,
        stage: "Sanction & Training",
        title: "Bank Sanction & Mandatory State EDP Training",
        description:
          "The bank issues an in-principle sanction followed by state-sponsored entrepreneurship training at MCED (DEMO DATA).",
      },
      {
        stepNumber: 5,
        stage: "Disbursement",
        title: "Subsidy Release and Enterprise Commissioning",
        description:
          "Loan funds are released and state margin money is adjusted upon satisfactory plant setup (DEMO DATA).",
      },
    ],
    officialPortalUrl: undefined,
    helpGuidance: {
      whereToGetHelp:
        "Citizens can visit the District Industries Centre (DIC) in their respective district headquarters or the Maharashtra Centre for Entrepreneurship Development (MCED) office.",
      authorizedCentres: [
        "District Industries Centre (DIC) office in your Maharashtra district",
        "Maharashtra Centre for Entrepreneurship Development (MCED) local branch",
        "Maha-E-Seva Kendras / Citizen Service Centers across Maharashtra",
      ],
      guidanceNote:
        "DEMO DATA NOTICE: This scheme is currently simulated with mock data for demonstration. Official state portal integration and verified district contact details will be enabled once database connectivity is established.",
    },
  },
];

// Localized Scheme Data Translations (Hindi and Marathi)
const schemeTranslations: Record<"hi" | "mr", Record<string, Partial<Scheme>>> = {
  hi: {
    pmegp: {
      fullName: "एमएसएमई मंत्रालय द्वारा क्रेडिट लिंक्ड सब्सिडी कार्यक्रम",
      description:
        "विनिर्माण और सेवा क्षेत्रों में नए सूक्ष्म उद्यमों और स्वरोजगार के अवसरों का समर्थन करने वाला एक प्रमुख क्रेडिट-लिंक्ड सब्सिडी कार्यक्रम।",
      benefit: "₹50 लाख तक के प्रोजेक्ट पर 35% तक सब्सिडी",
      benefits: [
        "पूंजीगत सब्सिडी: स्थान (शहरी/ग्रामीण) और लाभार्थी श्रेणी के आधार पर 15% से 35% तक सब्सिडी।",
        "परियोजना लागत सीमा: विनिर्माण इकाइयों के लिए ₹50 लाख और सेवा इकाइयों के लिए ₹20 लाख तक वित्तीय सहायता।",
        "कम मार्जिन मनी: लाभार्थी को केवल 5% से 10% स्वयं का अंशदान देना होता है।",
        "बैंक वित्त पोषण: शेष 60% से 75% राशि वाणिज्यिक बैंकों द्वारा सावधि ऋण और कार्यशील पूंजी के रूप में स्वीकृत।",
        "संपार्श्विक मुक्त (बिना गारंटी): CGTMSE क्रेडिट गारंटी कवरेज के तहत संपार्श्विक मुक्त ऋण की सुविधा।",
      ],
      whyEligible: [
        "आयु सीमा पूरी है (सत्यापित पहचान दस्तावेजों के साथ 18+ वर्ष)",
        "आवेदक की प्रोफाइल और पारिवारिक आय प्राथमिकता लाभार्थी श्रेणी में आती है",
        "प्रस्तावित उद्यम पूंजीगत सब्सिडी (35% तक मार्जिन मनी) के लिए योग्य है",
        "आवेदक एक नया (ग्रीनफील्ड) सूक्ष्म उद्यम स्थापित कर रहा है",
      ],
      eligibilityCriteria: [
        "18 वर्ष और उससे अधिक आयु के कोई भी भारतीय नागरिक (कोई ऊपरी आयु सीमा नहीं)।",
        "शैक्षणिक योग्यता: विनिर्माण में ₹10 लाख और सेवाओं में ₹5 लाख से अधिक की परियोजनाओं के लिए न्यूनतम 8वीं कक्षा उत्तीर्ण।",
        "केवल नए (ग्रीनफील्ड) सूक्ष्म उद्यमों के लिए लागू; मौजूदा इकाइयां पात्र नहीं हैं।",
        "स्वयं सहायता समूह (SHG), पंजीकृत सहकारी समितियां और धर्मार्थ ट्रस्ट भी पात्र हैं।",
      ],
      documentsRequired: [
        "आधार कार्ड और पैन (PAN) कार्ड",
        "हालिया पासपोर्ट आकार के रंगीन फोटो",
        "विस्तृत प्रोजेक्ट रिपोर्ट (DPR) / बिजनेस प्लान",
        "जाति / विशेष श्रेणी प्रमाण पत्र (SC/ST/OBC/अल्पसंख्यक/दिव्यांग)",
        "शैक्षणिक योग्यता प्रमाण पत्र / 8वीं की अंकतालिका",
        "स्थानीय निवास / मूल निवासी प्रमाण पत्र",
        "ग्रामीण क्षेत्र प्रमाण पत्र (यदि ग्रामीण श्रेणी में आवेदन कर रहे हैं)",
      ],
      howToApply: [
        {
          stepNumber: 1,
          stage: "ऑनलाइन पंजीकरण",
          title: "PMEGP ई-पोर्टल पर ऑनलाइन आवेदन करें",
          description:
            "आधिकारिक KVIC PMEGP पोर्टल (kviconline.gov.in) पर आधार और व्यक्तिगत विवरण के साथ पंजीकरण करें।",
        },
        {
          stepNumber: 2,
          stage: "दस्तावेज अपलोड",
          title: "प्रोजेक्ट रिपोर्ट और प्रमाण पत्र अपलोड करें",
          description:
            "अपनी विस्तृत प्रोजेक्ट रिपोर्ट (DPR), शैक्षणिक प्रमाण, जाति प्रमाण पत्र और निवास सत्यापन अपलोड करें।",
        },
        {
          stepNumber: 3,
          stage: "समिति जांच",
          title: "ज़िला स्तरीय टास्क फोर्स समिति (DLTFC) समीक्षा",
          description:
            "DLTFC समिति और नोडल एजेंसी परियोजना की व्यावहारिकता की जांच करती है और इसे बैंक को भेजती है।",
        },
        {
          stepNumber: 4,
          stage: "स्वीकृति एवं प्रशिक्षण",
          title: "बैंक ऋण स्वीकृति एवं EDP प्रशिक्षण",
          description:
            "बैंक ऋण स्वीकृत करता है और आवेदक अनिवार्य उद्यमिता विकास कार्यक्रम (EDP) प्रशिक्षण पूरा करता है।",
        },
        {
          stepNumber: 5,
          stage: "वितरण",
          title: "ऋण वितरण एवं सब्सिडी समायोजन",
          description:
            "बैंक ऋण राशि वितरित करता है। सरकारी सब्सिडी एस्क्रो खाते में जमा होती है और 3 साल बाद समायोजित होती है।",
        },
      ],
      helpGuidance: {
        whereToGetHelp:
          "आवेदक निःशुल्क परामर्श और आवेदन सहायता के लिए अपने ज़िले के ज़िला उद्योग केंद्र (DIC) या राज्य KVIC कार्यालय से संपर्क कर सकते हैं।",
        authorizedCentres: [
          "ज़िला कलेक्ट्रेट स्थित ज़िला उद्योग केंद्र (DIC)",
          "खादी और ग्रामोद्योग आयोग (KVIC) का राज्य कार्यालय",
          "सार्वजनिक क्षेत्र के बैंकों के एमएसएमई ऋण डेस्क",
        ],
        guidanceNote:
          "इन मान्यता प्राप्त केंद्रों पर निःशुल्क मार्गदर्शन प्रदान किया जाता है। किसी भी असत्यापित निजी एजेंट को कोई शुल्क न दें।",
      },
    },
    "pm-mudra": {
      fullName: "माइक्रो यूनिट्स डेवलपमेंट एंड रिफाइनेंस एजेंसी (PMMY)",
      description:
        "गैर-कृषि और गैर-कॉर्पोरेट सूक्ष्म व लघु व्यवसायों को आय सृजन गतिविधियों के लिए बिना किसी गारंटी ₹20 लाख तक संस्थागत ऋण सहायता।",
      benefit: "बिना किसी गारंटी ₹20 लाख तक का ऋण",
      benefits: [
        "शून्य संपार्श्विक: किसी भी संपत्ति या गारंटी के बिना ₹20 लाख तक का ऋण।",
        "तीन लचीली श्रेणियां: शिशु (₹50,000 तक), किशोर (₹50,000 से ₹5 लाख), और तरुण (₹5 लाख से ₹20 लाख)।",
        "शून्य प्रोसेसिंग शुल्क: सरकारी बैंकों में शिशु और किशोर ऋण के लिए कोई प्रोसेसिंग शुल्क नहीं।",
        "मुद्रा रुपे कार्ड: दैनिक कार्यशील पूंजी और खरीदारी के लिए प्री-अप्रूव्ड कार्ड।",
        "किफायती ब्याज दरें: बैंकों द्वारा विनियमित और उचित ब्याज दरें।",
      ],
      whyEligible: [
        "व्यवसाय गैर-कृषि, गैर-कॉर्पोरेट सूक्ष्म उद्यम मानदंडों से मेल खाता है",
        "पूंजी की आवश्यकता शिशु, किशोर या तरुण ऋण श्रेणियों के अनुकूल है",
        "आवेदक आय सृजन व्यवसाय वाला भारतीय नागरिक है",
        "क्रेडिट प्रोफाइल बैंक मानकों को पूरा करता है",
      ],
      eligibilityCriteria: [
        "विनिर्माण, व्यापार या सेवा क्षेत्र में आय सृजन गतिविधि के लिए कोई भी भारतीय नागरिक।",
        "दुकानदार, कारीगर, फल/सब्जी विक्रेता, खाद्य प्रसंस्करण और परिवहन वाहन संचालक पात्र हैं।",
        "आवेदक किसी भी बैंक या वित्तीय संस्थान में डिफ़ॉल्टर नहीं होना चाहिए।",
        "एकल स्वामित्व, साझेदारी और लघु उद्यम पात्र हैं।",
      ],
      documentsRequired: [
        "फोटो सहित विधिवत भरा हुआ मुद्रा आवेदन पत्र",
        "पहचान प्रमाण (आधार कार्ड, मतदाता पहचान पत्र, पैन या पासपोर्ट)",
        "पते का प्रमाण (बिजली बिल, राशन कार्ड, या निवास प्रमाण)",
        "व्यवसाय पंजीकरण / उद्यम पंजीकरण प्रमाण पत्र",
        "पिछले 6 महीने का बैंक खाता विवरण",
        "मशीनरी, उपकरण या स्टॉक के कोटेशन / इनवॉइस",
        "किशोर और तरुण श्रेणी के लिए बिक्री अनुमान",
      ],
      howToApply: [
        {
          stepNumber: 1,
          stage: "तैयारी",
          title: "ऋण श्रेणी चुनें और प्रस्ताव तैयार करें",
          description:
            "आवश्यकतानुसार श्रेणी चुनें: शिशु (₹50K तक), किशोर (₹50K-₹5L), या तरुण (₹5L-₹20L)। वेंडर कोटेशन तैयार रखें।",
        },
        {
          stepNumber: 2,
          stage: "आवेदन",
          title: "उद्यमीमित्र पोर्टल या बैंक शाखा में आवेदन करें",
          description:
            "उद्यमीमित्र पोर्टल (udyamimitra.in) पर डिजिटल रूप से या किसी भी नजदीकी बैंक शाखा में आवेदन जमा करें।",
        },
        {
          stepNumber: 3,
          stage: "सत्यापन",
          title: "बैंक मूल्यांकन और दस्तावेज सत्यापन",
          description:
            "शाखा अधिकारी व्यवसाय की व्यवहार्यता, पते और क्रेडिट रिकॉर्ड की पुष्टि करता है।",
        },
        {
          stepNumber: 4,
          stage: "वितरण",
          title: "ऋण स्वीकृति एवं मुद्रा कार्ड प्राप्ति",
          description:
            "ऋण राशि खाते में जमा की जाती है और कार्यशील पूंजी के लिए मुद्रा रुपे कार्ड जारी किया जाता है।",
        },
      ],
      helpGuidance: {
        whereToGetHelp:
          "उद्यमी ज़िला कलेक्ट्रेट स्थित लीड डिस्ट्रिक्ट मैनेजर (LDM) कार्यालय या किसी भी सरकारी बैंक शाखा के एमएसएमई सेल से संपर्क कर सकते हैं।",
        authorizedCentres: [
          "ज़िला कलेक्ट्रेट स्थित लीड डिस्ट्रिक्ट मैनेजर (LDM) कार्यालय",
          "सार्वजनिक क्षेत्र के बैंक, क्षेत्रीय ग्रामीण बैंक (RRB) की शाखाएं",
          "सिडबी (SIDBI) उद्यमिता सुविधा केंद्र",
        ],
        guidanceNote:
          "वित्तीय सेवा विभाग के निर्देशानुसार बैंक सूक्ष्म उद्यमियों को निःशुल्क मार्गदर्शन प्रदान करते हैं।",
      },
    },
    "stand-up-india": {
      fullName: "ग्रीनफील्ड उद्यमों के लिए स्टैंड-अप इंडिया योजना",
      description:
        "ग्रीनफील्ड उद्यमों के लिए प्रत्येक बैंक शाखा में कम से कम एक एससी या एसटी और कम से कम एक महिला उधारकर्ता को ₹10 लाख से ₹1 करोड़ के बीच ऋण।",
      benefit: "₹10 लाख से ₹1 करोड़ तक का बैंक ऋण",
      benefits: [
        "पर्याप्त पूंजी सहायता: ₹10 लाख से ₹1 करोड़ तक का सावधि ऋण और कार्यशील पूंजी।",
        "क्रेडिट गारंटी संरक्षण: स्टैंड-अप इंडिया क्रेडिट गारंटी फंड (CGFSI) द्वारा सुरक्षित।",
        "सब्सिडी अभिसरण: 15% तक मार्जिन मनी को अन्य केंद्रीय/राज्य योजनाओं के साथ जोड़ा जा सकता है।",
        "व्यापक हैंडहोल्डिंग: SIDBI और NABARD के माध्यम से परियोजना रिपोर्ट और वित्तीय साक्षरता में सहायता।",
        "लचीला पुनर्भुगतान: 18 महीने की मोहलत के साथ 7 वर्ष तक की चुकौती अवधि।",
      ],
      whyEligible: [
        "आवेदक लक्षित एससी/एसटी या महिला उद्यमी वर्ग में आता है",
        "प्रस्तावित व्यावसायिक उपक्रम एक नया (ग्रीनफील्ड) उद्यम है",
        "आवेदक के पास उद्यम में कम से कम 51% शेयरधारिता है",
        "कार्यक्षेत्र विनिर्माण, सेवा, कृषि-संबद्ध या व्यापार में आता है",
      ],
      eligibilityCriteria: [
        "आवेदक 18 वर्ष या उससे अधिक आयु का एससी/एसटी और/या महिला उद्यमी होना चाहिए।",
        "ऋण केवल ग्रीनफील्ड परियोजनाओं (पहले व्यावसायिक उद्यम) के लिए स्वीकृत किए जाते हैं।",
        "गैर-व्यक्तिगत उद्यमों में एससी/एसटी या महिला प्रवर्तक के पास 51% हिस्सेदारी अनिवार्य है।",
        "आवेदक किसी भी बैंक का डिफ़ॉल्टर नहीं होना चाहिए।",
      ],
      documentsRequired: [
        "पहचान प्रमाण (आधार कार्ड, पासपोर्ट, या मतदाता कार्ड)",
        "निवास प्रमाण (बिजली बिल, राशन कार्ड)",
        "सक्षम प्राधिकारी द्वारा जारी जाति प्रमाण पत्र (एससी/एसटी के लिए)",
        "कंपनी / पार्टनरशिप डीड (51%+ स्वामित्व दर्शाते हुए)",
        "विस्तृत प्रोजेक्ट रिपोर्ट (DPR) और वित्तीय अनुमान",
        "व्यावसायिक परिसर का प्रमाण (लीज डीड या रेंट एग्रीमेंट)",
      ],
      howToApply: [
        {
          stepNumber: 1,
          stage: "पंजीकरण",
          title: "स्टैंड-अप मित्र पोर्टल पर पंजीकरण",
          description:
            "standupmitra.in पर ट्रेनी बॉरोअर या रेडी बॉरोअर के रूप में पंजीकरण करें।",
        },
        {
          stepNumber: 2,
          stage: "मार्गदर्शन",
          title: "सहायता एजेंसियों से संपर्क (वैकल्पिक)",
          description:
            "परियोजना रिपोर्ट और कागजी कार्रवाई तैयार करने के लिए SIDBI/NABARD/DIC से जुड़ें।",
        },
        {
          stepNumber: 3,
          stage: "आवेदन",
          title: "चयनित बैंकों में ऋण आवेदन जमा करें",
          description:
            "अपनी पसंद की 3 बैंक शाखाएं चुनें और प्रोजेक्ट रिपोर्ट के साथ आवेदन जमा करें।",
        },
        {
          stepNumber: 4,
          stage: "स्वीकृति",
          title: "बैंक मूल्यांकन और स्वीकृति पत्र",
          description:
            "शाखा स्थल निरीक्षण और दस्तावेजों की जांच के बाद स्वीकृति पत्र जारी करती है।",
        },
        {
          stepNumber: 5,
          stage: "वितरण",
          title: "ऋण वितरण एवं संचालन",
          description:
            "मशीनरी आपूर्तिकर्ताओं को सीधे भुगतान और कार्यशील पूंजी सीमा चालू की जाती है।",
        },
      ],
      helpGuidance: {
        whereToGetHelp:
          "आवेदक SIDBI क्षेत्रीय कार्यालयों, लीड डिस्ट्रिक्ट मैनेजर (LDM) या बैंकों के स्टैंड-अप इंडिया डेस्क से संपर्क कर सकते हैं।",
        authorizedCentres: [
          "ज़िला कलेक्ट्रेट स्थित लीड डिस्ट्रिक्ट मैनेजर (LDM) कार्यालय",
          "SIDBI शाखा कार्यालय और एमएसएमई सुविधा डेस्क",
          "नाबार्ड (NABARD) के ज़िला विकास कार्यालय",
        ],
        guidanceNote:
          "स्टैंड-अप मित्र पोर्टल पर वित्तीय प्रशिक्षण और हैंडहोल्डिंग एजेंसियों की निःशुल्क निर्देशिका उपलब्ध है।",
      },
    },
    "maharashtra-entrepreneurship": {
      fullName: "मुख्यमंत्री रोजगार सृजन कार्यक्रम (CMEGP - महाराष्ट्र)",
      description:
        "स्थानीय उद्यमियों के लिए वित्तीय सहायता, मार्जिन मनी सब्सिडी और प्रशिक्षण की सुविधा प्रदान करने वाली महाराष्ट्र राज्य स्तरीय उद्यम सहायता योजना।",
      benefit: "35% तक मार्जिन मनी वित्तीय सहायता",
      benefits: [
        "राज्य मार्जिन मनी सब्सिडी: महाराष्ट्र सरकार द्वारा 15% से 35% मार्जिन मनी सहायता (डेमो डेटा)।",
        "परियोजना लागत सीमा: विनिर्माण के लिए ₹50 लाख और सेवा क्षेत्र के लिए ₹10 लाख तक (डेमो डेटा)।",
        "विशेष छूट: एससी, एसटी, महिला और दिव्यांग आवेदकों के लिए स्वयं का अंशदान मात्र 5% (डेमो डेटा)।",
        "राज्य EDP प्रशिक्षण: निःशुल्क औद्योगिक कौशल और उद्यमिता प्रशिक्षण प्रमाणन (डेमो डेटा)।",
      ],
      whyEligible: [
        "महाराष्ट्र राज्य का वैध मूल निवासी (अधिवास प्रमाण पत्र)",
        "प्रस्तावित व्यापार राज्य प्राथमिकता आर्थिक विकास सूची में शामिल है",
        "आवेदक राज्य की आयु और शैक्षणिक मानदंडों को पूरा करता है",
        "उद्यम श्रेणी राज्य मार्जिन मनी सब्सिडी के लिए पात्र है",
      ],
      eligibilityCriteria: [
        "आवेदक महाराष्ट्र राज्य का स्थायी निवासी होना चाहिए (डेमो डेटा)।",
        "आयु सीमा: 18 से 45 वर्ष (एससी/एसटी/महिला/भूतपूर्व सैनिकों के लिए 50 वर्ष तक छूट) (डेमो डेटा)।",
        "शैक्षणिक योग्यता: न्यूनतम 7वीं कक्षा उत्तीर्ण (डेमो डेटा)।",
        "प्रति परिवार केवल एक व्यक्ति इस योजना के तहत वित्तीय सहायता के लिए पात्र है (डेमो डेटा)।",
      ],
      documentsRequired: [
        "महाराष्ट्र अधिवास प्रमाण पत्र (Domicile) (डेमो डेटा)",
        "आधार कार्ड और मतदाता पहचान पत्र (डेमो डेटा)",
        "शैक्षणिक योग्यता प्रमाण पत्र / स्कूल छोड़ने का प्रमाण पत्र (डेमो डेटा)",
        "जाति प्रमाण पत्र / विशेष श्रेणी प्रमाण (डेमो डेटा)",
        "उपकरण लागत कोटेशन के साथ विस्तृत प्रोजेक्ट प्रोफाइल (डेमो डेटा)",
      ],
      howToApply: [
        {
          stepNumber: 1,
          stage: "पंजीकरण",
          title: "राज्य उद्योग पोर्टल पर ऑनलाइन पंजीकरण",
          description:
            "आधार और अधिवास प्रमाण पत्र के साथ नागरिक प्रोफाइल बनाएं (डेमो डेटा)।",
        },
        {
          stepNumber: 2,
          stage: "प्रोजेक्ट फाइलिंग",
          title: "आवेदन पत्र भरें और DPR अपलोड करें",
          description:
            "व्यवसाय श्रेणी, ज़िला और स्थानीय बैंक शाखा का चयन करें (डेमो डेटा)।",
        },
        {
          stepNumber: 3,
          stage: "ज़िला जांच",
          title: "ज़िला टास्क फोर्स समिति (DTFC) समीक्षा",
          description:
            "समिति उम्मीदवार का मूल्यांकन कर बैंक को प्रस्ताव की सिफारिश करती है (डेमो डेटा)।",
        },
        {
          stepNumber: 4,
          stage: "स्वीकृति एवं प्रशिक्षण",
          title: "बैंक स्वीकृति एवं MCED प्रशिक्षण",
          description:
            "बैंक सैद्धांतिक स्वीकृति देता है और MCED में उद्यमिता प्रशिक्षण होता है (डेमो डेटा)।",
        },
        {
          stepNumber: 5,
          stage: "वितरण",
          title: "सब्सिडी जारी करना और उद्यम स्थापना",
          description:
            "ऋण जारी किया जाता है और इकाई की स्थापना पर मार्जिन मनी समायोजित की जाती है (डेमो डेटा)।",
        },
      ],
      helpGuidance: {
        whereToGetHelp:
          "नागरिक अपने ज़िला मुख्यालय स्थित ज़िला उद्योग केंद्र (DIC) या MCED कार्यालय में जा सकते हैं।",
        authorizedCentres: [
          "महाराष्ट्र के ज़िला मुख्यालय स्थित ज़िला उद्योग केंद्र (DIC) कार्यालय",
          "महाराष्ट्र उद्यमिता विकास केंद्र (MCED) की स्थानीय शाखा",
          "महाराष्ट्र भर के महा-ई-सेवा केंद्र",
        ],
        guidanceNote:
          "डेमो डेटा सूचना: यह योजना वर्तमान में प्रदर्शन के लिए सिमुलेटेड है। आधिकारिक लिंक शीघ्र उपलब्ध होंगे।",
      },
    },
  },
  mr: {
    pmegp: {
      fullName: "एमएसएमई मंत्रालयाचा क्रेडिट लिंक्ड सबसिडी कार्यक्रम",
      description:
        "उत्पादन आणि सेवा क्षेत्रात नवीन सूक्ष्म उद्योग आणि स्वयंरोजगाराच्या संधींना पाठबळ देणारा एक प्रमुख क्रेडिट-लिंक्ड सबसिडी कार्यक्रम.",
      benefit: "₹५० लाखांपर्यंतच्या प्रकल्पावर ३५% पर्यंत सबसिडी",
      benefits: [
        "भांडवली सबसिडी: ठिकाण (शहरी/ग्रामीण) आणि लाभार्थी प्रवर्गावर आधारित १५% ते ३५% पर्यंत सबसिडी.",
        "प्रकल्प मर्यादा: उत्पादन क्षेत्रासाठी ₹५० लाखांपर्यंत आणि सेवा क्षेत्रासाठी ₹२० लाखांपर्यंत आर्थिक साहाय्य.",
        "कमी मार्जिन मनी: लाभार्थ्याला प्रकल्प खर्चाच्या केवळ ५% ते १०% रक्कम स्वतः घालावी लागते.",
        "बँक कर्ज साहाय्य: उर्वरित ६०% ते ७५% रक्कम व्यावसायिक बँकांकडून मुदत कर्ज आणि खेळते भांडवल म्हणून मंजूर.",
        "तारणमुक्त कर्ज: CGTMSE क्रेडिट गॅरंटी अंतर्गत तारणमुक्त कर्जाची पात्रता.",
      ],
      whyEligible: [
        "वयाची अट पूर्ण आहे (ओळखपत्रांसह १८+ वर्षे)",
        "अर्जदाराचे प्रोफाइल आणि कौटुंबिक उत्पन्न प्राधान्य लाभार्थी प्रवर्गात बसते",
        "प्रस्तावित उद्योग भांडवली सबसिडीसाठी (३५% पर्यंत) पात्र आहे",
        "अर्जदार नवीन (ग्रीनफील्ड) सूक्ष्म व्यवसाय सुरू करत आहे",
      ],
      eligibilityCriteria: [
        "१८ वर्षे किंवा त्याहून अधिक वयाची कोणतीही भारतीय व्यक्ती (वयाची कोणतीही कमाल मर्यादा नाही).",
        "शैक्षणिक पात्रता: उत्पादन क्षेत्रात ₹१० लाखांपेक्षा आणि सेवा क्षेत्रात ₹५ लाखांपेक्षा जास्त प्रकल्पांसाठी किमान ८ वी उत्तीर्ण.",
        "केवळ नवीन (ग्रीनफील्ड) उद्योगांसाठी लागू; अस्तित्वात असलेले उद्योग पात्र नाहीत.",
        "इतर सबसिडी न घेणारे बचत गट (SHG), नोंदणीकृत सहकारी संस्था आणि धर्मादाय संस्था देखील पात्र.",
      ],
      documentsRequired: [
        "आधार कार्ड आणि पॅन (PAN) कार्ड",
        "नुकतेच काढलेले पासपोर्ट आकाराचे रंगीत फोटो",
        "सविस्तर प्रकल्प अहवाल (DPR) / व्यवसाय योजना",
        "जात / विशेष प्रवर्ग प्रमाणपत्र (SC/ST/OBC/अल्पसंख्याक/दिव्यांग)",
        "शैक्षणिक प्रमाणपत्रे / ८ वी उत्तीर्ण गुणपत्रिका",
        "कायमस्वरूपी रहिवासी / अधिवास प्रमाणपत्र (Domicile)",
        "ग्रामीण भाग प्रमाणपत्र (ग्रामीण प्रवर्गात अर्ज करत असल्यास)",
      ],
      howToApply: [
        {
          stepNumber: 1,
          stage: "ऑनलाइन नोंदणी",
          title: "PMEGP ई-पोर्टलवर ऑनलाइन अर्ज करा",
          description:
            "अधिकृत KVIC PMEGP पोर्टलवर (kviconline.gov.in) आधार व वैयक्तिक माहितीसह नोंदणी करा.",
        },
        {
          stepNumber: 2,
          stage: "कागदपत्रे अपलोड",
          title: "प्रकल्प अहवाल आणि प्रमाणपत्रे अपलोड करा",
          description:
            "सविस्तर प्रकल्प अहवाल (DPR), शैक्षणिक पुरावे, जात प्रमाणपत्र आणि रहिवासी दाखला अपलोड करा.",
        },
        {
          stepNumber: 3,
          stage: "समिती तपासणी",
          title: "जिल्हास्तरीय टास्क फोर्स समिती (DLTFC) छाननी",
          description:
            "DLTFC समिती आणि नोडल संस्था प्रकल्पाची पडताळणी करून तो बँकेकडे पाठवते.",
        },
        {
          stepNumber: 4,
          stage: "मंजुरी व प्रशिक्षण",
          title: "बँक कर्ज मंजुरी आणि EDP प्रशिक्षण",
          description:
            "बँक कर्ज मंजूर करते आणि अर्जदार अनिवार्य उद्योजकता विकास कार्यक्रम (EDP) प्रशिक्षण पूर्ण करतो.",
        },
        {
          stepNumber: 5,
          stage: "वितरण",
          title: "कर्ज वितरण आणि सबसिडी समायोजन",
          description:
            "बँक कर्जाची रक्कम वितरित करते. सरकारी सबसिडी विशेष खात्यात जमा होते आणि ३ वर्षांनंतर समायोजित होते.",
        },
      ],
      helpGuidance: {
        whereToGetHelp:
          "अर्जदार मोफत मार्गदर्शन आणि अर्जासाठी आपल्या जिल्ह्यातील जिल्हा उद्योग केंद्र (DIC) किंवा राज्य KVIC कार्यालयाशी संपर्क साधू शकतात.",
        authorizedCentres: [
          "जिल्हाधिकारी कार्यालयातील जिल्हा उद्योग केंद्र (DIC)",
          "खादी आणि ग्रामोद्योग आयोगाचे (KVIC) राज्य कार्यालय",
          "सार्वजनिक क्षेत्रातील बँकांचे एमएसएमई कर्ज साहाय्य कक्ष",
        ],
        guidanceNote:
          "या अधिकृत केंद्रांवर मोफत मार्गदर्शन दिले जाते. कोणत्याही अनधिकृत खासगी व्यक्तीला शुल्क देऊ नका.",
      },
    },
    "pm-mudra": {
      fullName: "मायक्रो युनिट्स डेव्हलपमेंट अँड रिफायनान्स एजन्सी (PMMY)",
      description:
        "बिगर-शेती आणि बिगर-कॉर्पोरेट सूक्ष्म व छोट्या व्यवसायांना उत्पन्नाच्या उपक्रमांसाठी विनातारण ₹२० लाखांपर्यंत संस्थात्मक कर्ज साहाय्य.",
      benefit: "विनातारण ₹२० लाखांपर्यंत कर्ज",
      benefits: [
        "विनातारण कर्ज: कोणतीही मालमत्ता गहाण न ठेवता किंवा हमीदाराशिवाय ₹२० लाखांपर्यंत कर्ज.",
        "तीन सुलभ टप्पे: शिशु (₹५०,००० पर्यंत), किशोर (₹५०,००० ते ₹५ लाख), आणि तरुण (₹५ लाख ते ₹२० लाख).",
        "प्रक्रिया शुल्क नाही: सरकारी बँकांमध्ये शिशु आणि किशोर कर्जासाठी कोणतेही प्रोसेसिंग शुल्क नाही.",
        "मुद्रा रुपे कार्ड: दैनंदिन खेळत्या भांडवलासाठी आणि खरेदीसाठी पूर्व-मंजूर रकमेचे रुपे कार्ड.",
        "परवडणारे व्याजदर: वाजवी आणि नियमन केलेले व्याजदर.",
      ],
      whyEligible: [
        "व्यवसाय बिगर-शेती, बिगर-कॉर्पोरेट सूक्ष्म उद्योग निकषांशी जुळतो",
        "भांडवलाची गरज शिशु, किशोर किंवा तरुण कर्ज श्रेणीत बसते",
        "अर्जदार व्यवसाय करणारा भारतीय नागरिक आहे",
        "क्रेडिट प्रोफाइल बँकेच्या निकषांची पूर्तता करते",
      ],
      eligibilityCriteria: [
        "उत्पादन, व्यापार किंवा सेवा क्षेत्रात व्यवसाय करणारा कोणताही भारतीय नागरिक पात्र.",
        "दुकानदार, कारागीर, फळ/भाजी विक्रेते, अन्न प्रक्रिया आणि वाहतूक वाहन चालक पात्र आहेत.",
        "अर्जदार कोणत्याही बँकेचा थकीत कर्जदार (डिफॉल्टर) नसावा.",
        "एकल मालकी, भागीदारी आणि सूक्ष्म उद्योग पात्र.",
      ],
      documentsRequired: [
        "छायाचित्रासह पूर्ण भरलेला मुद्रा अर्ज",
        "ओळख पुरावा (आधार कार्ड, मतदार ओळखपत्र, पॅन किंवा पासपोर्ट)",
        "पत्ता पुरावा (वीज बिल, रेशन कार्ड किंवा रहिवासी दाखला)",
        "व्यवसाय नोंदणी / उद्यम नोंदणी प्रमाणपत्र",
        "मागील ६ महिन्यांचे बँक खाते विवरण (स्टेटमेंट)",
        "यंत्रसामग्री किंवा मालाचे कोटेशन / इनव्हॉइस",
      ],
      howToApply: [
        {
          stepNumber: 1,
          stage: "तयारी",
          title: "कर्जाचा टप्पा निवडा आणि प्रस्ताव तयार करा",
          description:
            "गरजेनुसार टप्पा ठरवा: शिशु (₹५०K पर्यंत), किशोर (₹५०K-₹५L), किंवा तरुण (₹५L-₹२०L). दरपत्रके तयार ठेवा.",
        },
        {
          stepNumber: 2,
          stage: "अर्ज",
          title: "उद्यमीमित्र पोर्टल किंवा बँक शाखेत अर्ज करा",
          description:
            "उद्यमीमित्र पोर्टलवर (udyamimitra.in) ऑनलाइन किंवा कोणत्याही जवळच्या बँक शाखेत जाऊन अर्ज करा.",
        },
        {
          stepNumber: 3,
          stage: "पडताळणी",
          title: "बँकेकडून मूल्यमापन व कागदपत्र तपासणी",
          description:
            "बँक अधिकारी व्यवसायाची व्यवहार्यता, जागा आणि सिबिल रेकॉर्डची तपासणी करतात.",
        },
        {
          stepNumber: 4,
          stage: "वितरण",
          title: "कर्ज मंजुरी आणि मुद्रा कार्ड वाटप",
          description:
            "कर्जाची रक्कम खात्यात जमा केली जाते आणि खेळत्या भांडवलासाठी मुद्रा रुपे कार्ड दिले जाते.",
        },
      ],
      helpGuidance: {
        whereToGetHelp:
          "उद्योजक जिल्हाधिकारी कार्यालयातील जिल्हा अग्रणी बँक व्यवस्थापक (LDM) किंवा कोणत्याही सरकारी बँकेच्या एमएसएमई कक्षाशी संपर्क साधू शकतात.",
        authorizedCentres: [
          "जिल्हाधिकारी कार्यालयातील लीड डिस्ट्रिक्ट मॅनेजर (LDM) कार्यालय",
          "सार्वजनिक क्षेत्रातील बँका आणि ग्रामीण बँकांच्या (RRB) शाखा",
          "सिडबी (SIDBI) उद्योजकता साहाय्य कक्ष",
        ],
        guidanceNote:
          "शासकीय नियमांनुसार बँका सूक्ष्म उद्योजकांना मोफत मार्गदर्शन देतात.",
      },
    },
    "stand-up-india": {
      fullName: "नवीन उद्योगांसाठी स्टँड-अप इंडिया योजना",
      description:
        "नवीन उद्योगांसाठी प्रत्येक बँक शाखेतून किमान एक अनुसूचित जाती (SC) किंवा अनुसूचित जमाती (ST) आणि किमान एक महिला उद्योजकाला ₹१० लाख ते ₹१ कोटी दरम्यान कर्ज साहाय्य.",
      benefit: "₹१० लाख ते ₹१ कोटी दरम्यान बँक कर्ज",
      benefits: [
        "मोठे भांडवली साहाय्य: ₹१० लाख ते ₹१ कोटी दरम्यान मुदत कर्ज आणि खेळते भांडवल.",
        "क्रेडिट गॅरंटी सुरक्षा: स्टँड-अप इंडिया क्रेडिट गॅरंटी फंड (CGFSI) द्वारे संरक्षित.",
        "सबसिडी समन्वय: १५% पर्यंत मार्जिन मनी इतर केंद्र/राज्य योजनांसोबत जोडण्याची सुविधा.",
        "संपूर्ण साहाय्य नेटवर्क: SIDBI आणि NABARD च्या माध्यमातून प्रकल्प अहवाल व मार्गदर्शनाची सोय.",
        "सुलभ परतफेड: १८ महिन्यांच्या सवलतीसह ७ वर्षांपर्यंत परतफेडीची मुदत.",
      ],
      whyEligible: [
        "अर्जदार एससी/एसटी किंवा महिला उद्योजक प्रवर्गात येतो",
        "प्रस्तावित व्यवसाय हा नवीन (ग्रीनफील्ड) उद्योग आहे",
        "अर्जदाराची उद्योगात किमान ५१% मालकी/भागीदारी आहे",
        "कार्यक्षेत्र उत्पादन, सेवा, कृषी-पूरक किंवा व्यापारात येते",
      ],
      eligibilityCriteria: [
        "अर्जदार १८ वर्षे किंवा त्याहून अधिक वयाचा एससी/एसटी आणि/किंवा महिला उद्योजक असावा.",
        "कर्ज केवळ ग्रीनफील्ड प्रकल्पांसाठीच (पहिलाच व्यावसायिक उद्योग) मंजूर केले जाते.",
        "बिगर-वैयक्तिक उद्योगांमध्ये एससी/एसटी किंवा महिला प्रवर्गाकडे ५१% मालकी हक्क अनिवार्य.",
        "अर्जदार कोणत्याही बँकेचा थकीत कर्जदार नसावा.",
      ],
      documentsRequired: [
        "ओळख पुरावा (आधार कार्ड, पासपोर्ट किंवा मतदार कार्ड)",
        "रहिवासी दाखला (वीज बिल, रेशन कार्ड)",
        "सक्षम अधिकाऱ्याने दिलेले जात प्रमाणपत्र (एससी/एसटी साठी)",
        "कंपनी नोंदणी / भागीदारी करारपत्र (५१%+ मालकी दर्शवणारे)",
        "सविस्तर प्रकल्प अहवाल (DPR) आणि आर्थिक अंदाजपत्रक",
        "जागेचा पुरावा (भाडेकरार किंवा मालकी हक्क दस्तऐवज)",
      ],
      howToApply: [
        {
          stepNumber: 1,
          stage: "नोंदणी",
          title: "स्टँड-अप मित्र पोर्टलवर नोंदणी",
          description:
            "standupmitra.in वर ट्रेनी किंवा रेडी बॉरोअर म्हणून नोंदणी करा.",
        },
        {
          stepNumber: 2,
          stage: "मार्गदर्शन",
          title: "साहाय्य संस्थांशी संपर्क (पर्यायी)",
          description:
            "प्रकल्प अहवाल तयार करण्यासाठी SIDBI/NABARD/DIC ची मदत घ्या.",
        },
        {
          stepNumber: 3,
          stage: "अर्ज",
          title: "निवडलेल्या बँकांमध्ये कर्ज अर्ज सादर करा",
          description:
            "पसंतीनुसार ३ बँक शाखा निवडा आणि प्रकल्प अहवालासह अर्ज सादर करा.",
        },
        {
          stepNumber: 4,
          stage: "मंजुरी",
          title: "बँकेकडून छाननी आणि मंजुरी पत्र",
          description:
            "जागा पाहणी आणि कागदपत्रांच्या तपासणीनंतर बँक मंजुरी पत्र देते.",
        },
        {
          stepNumber: 5,
          stage: "वितरण",
          title: "कर्ज वितरण आणि उद्योग सुरू करणे",
          description:
            "मशनरी पुरवठादारांना थेट रक्कम दिली जाते आणि खेळत्या भांडवलाची मर्यादा सुरू होते.",
        },
      ],
      helpGuidance: {
        whereToGetHelp:
          "अर्जदार SIDBI प्रादेशिक कार्यालये, लीड डिस्ट्रिक्ट मॅनेजर (LDM) किंवा बँकांच्या स्टँड-अप इंडिया कक्षाशी संपर्क साधू शकतात.",
        authorizedCentres: [
          "जिल्हाधिकारी कार्यालयातील लीड डिस्ट्रिक्ट मॅनेजर (LDM) कार्यालय",
          "SIDBI शाखा आणि एमएसएमई साहाय्य कक्ष",
          "नाबार्ड (NABARD) जिल्हा विकास कार्यालये",
        ],
        guidanceNote:
          "स्टँड-अप मित्र पोर्टलवर आर्थिक प्रशिक्षण आणि मार्गदर्शन संस्थांची मोफत सूची उपलब्ध आहे.",
      },
    },
    "maharashtra-entrepreneurship": {
      fullName: "मुख्यमंत्री रोजगार निर्मिती कार्यक्रम (CMEGP - महाराष्ट्र)",
      description:
        "स्थानिक नवउद्योजकांना आर्थिक साहाय्य, मार्जिन मनी सबसिडी आणि कौशल्य प्रशिक्षण देणारी महाराष्ट्र राज्यस्तरीय योजना.",
      benefit: "३५% पर्यंत मार्जिन मनी आर्थिक साहाय्य",
      benefits: [
        "राज्य मार्जिन मनी सबसिडी: महाराष्ट्र शासनाकडून १५% ते ३५% मार्जिन मनी साहाय्य (डेमो डेटा).",
        "प्रकल्प मर्यादा: उत्पादन क्षेत्रासाठी ₹५० लाखांपर्यंत आणि सेवा क्षेत्रासाठी ₹१० लाखांपर्यंत (डेमो डेटा).",
        "विशेष सवलत: एससी, एसटी, महिला आणि दिव्यांग अर्जदारांसाठी स्वतःचा वाटा केवळ ५% (डेमो डेटा).",
        "राज्य EDP प्रशिक्षण: मोफत औद्योगिक कौशल्य आणि उद्योजकता प्रशिक्षण प्रमाणपत्र (डेमो डेटा).",
      ],
      whyEligible: [
        "महाराष्ट्र राज्याचे वैध अधिवास प्रमाणपत्र (Domicile)",
        "प्रस्तावित व्यवसाय राज्य प्राधान्य आर्थिक विकास सूचीत आहे",
        "अर्जदार वयाची आणि शैक्षणिक पात्रता पूर्ण करतो",
        "उद्योग प्रवर्ग राज्य मार्जिन मनी सबसिडीसाठी पात्र आहे",
      ],
      eligibilityCriteria: [
        "अर्जदार महाराष्ट्र राज्याचा कायमस्वरूपी रहिवासी असावा (डेमो डेटा).",
        "वयोमर्यादा: १८ ते ४५ वर्षे (एससी/एसटी/महिला/माजी सैनिकांसाठी ५० वर्षांपर्यंत सवलत) (डेमो डेटा).",
        "शैक्षणिक पात्रता: किमान ७ वी उत्तीर्ण (डेमो डेटा).",
        "एका कुटुंबातील फक्त एकच व्यक्ती या योजनेसाठी पात्र असेल (डेमो डेटा).",
      ],
      documentsRequired: [
        "महाराष्ट्र अधिवास प्रमाणपत्र (Domicile) (डेमो डेटा)",
        "आधार कार्ड आणि मतदार ओळखपत्र (डेमो डेटा)",
        "शैक्षणिक पात्रता प्रमाणपत्र / शाळा सोडल्याचा दाखला (डेमो डेटा)",
        "जात प्रमाणपत्र / विशेष प्रवर्ग पुरावा (डेमो डेटा)",
        "यंत्रसामग्री खर्चासह सविस्तर प्रकल्प प्रोफाइल (डेमो डेटा)",
      ],
      howToApply: [
        {
          stepNumber: 1,
          stage: "नोंदणी",
          title: "राज्य उद्योग पोर्टलवर ऑनलाइन नोंदणी",
          description:
            "आधार आणि अधिवास प्रमाणपत्रासह नागरिक प्रोफाइल तयार करा (डेमो डेटा).",
        },
        {
          stepNumber: 2,
          stage: "प्रकल्प दाखल",
          title: "अर्ज भरा आणि DPR अपलोड करा",
          description:
            "व्यवसाय प्रवर्ग, जिल्हा आणि स्थानिक बँक शाखा निवडा (डेमो डेटा).",
        },
        {
          stepNumber: 3,
          stage: "जिल्हा छाननी",
          title: "जिल्हा टास्क फोर्स समिती (DTFC) पुनरावलोकन",
          description:
            "समिती उमेदवाराची पडताळणी करून बँकेकडे प्रस्ताव शिफारस करते (डेमो डेटा).",
        },
        {
          stepNumber: 4,
          stage: "मंजुरी व प्रशिक्षण",
          title: "बँक मंजुरी आणि MCED प्रशिक्षण",
          description:
            "बँक तत्त्वतः मंजुरी देते आणि MCED मध्ये उद्योजकता प्रशिक्षण होते (डेमो डेटा).",
        },
        {
          stepNumber: 5,
          stage: "वितरण",
          title: "सबसिडी मंजुरी आणि उद्योग सुरू करणे",
          description:
            "कर्ज वितरित केले जाते आणि उद्योग सुरू झाल्यावर मार्जिन मनी समायोजित होते (डेमो डेटा).",
        },
      ],
      helpGuidance: {
        whereToGetHelp:
          "नागरिक आपल्या जिल्हा मुख्यालयातील जिल्हा उद्योग केंद्र (DIC) किंवा MCED कार्यालयाला भेट देऊ शकतात.",
        authorizedCentres: [
          "महाराष्ट्रातील जिल्हा उद्योग केंद्र (DIC) कार्यालये",
          "महाराष्ट्र उद्योजकता विकास केंद्र (MCED) स्थानिक शाखा",
          "महाराष्ट्रभरातील महा-ई-सेवा केंद्रे",
        ],
        guidanceNote:
          "डेमो डेटा सूचना: ही योजना सध्या प्रात्यक्षिकासाठी सिम्युलेटेड आहे. अधिकृत लिंक्स लवकरच उपलब्ध होतील.",
      },
    },
  },
};

/**
 * Returns a localized copy of a Scheme object based on the current language.
 * Falls back to English if no translation is found.
 */
export function getLocalizedScheme(scheme: Scheme, language: Language): Scheme {
  if (language === "en" || !schemeTranslations[language as "hi" | "mr"]) {
    return scheme;
  }

  const overrides = schemeTranslations[language as "hi" | "mr"][scheme.id];
  if (!overrides) {
    return scheme;
  }

  return {
    ...scheme,
    ...overrides,
    // Keep official scheme name and type
    name: scheme.name,
    type: scheme.type,
    ministry: scheme.ministry,
    officialPortalUrl: scheme.officialPortalUrl,
    isDemo: scheme.isDemo,
    matchScore: scheme.matchScore,
  };
}
