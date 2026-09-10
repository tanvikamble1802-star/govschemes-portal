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
    officialPortalUrl: "https://www.kviconline.gov.in/pmegp/",
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
    // Official portal URL omitted to satisfy:
    // "If an official URL is not available in the mock data, display a clear 'Official portal information will be added' message instead of inventing a URL."
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
