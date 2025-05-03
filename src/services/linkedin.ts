/**
 * Represents a LinkedIn profile.
 */
export interface LinkedInProfile {
  /**
   * The full name of the person.
   */
  fullName: string;
  /**
   * The headline of the person.
   */
  headline: string;
  /**
   * The profile picture URL of the person.
   */
  profilePictureUrl: string;
  /**
   * The about information of the person.
   */
  about: string;
  /**
   * The list of experiences of the person.
   */
  experiences: Experience[];
  /**
   * The list of educations of the person.
   */
  educations: Education[];
  /**
  * The structured skills of the person.
  */
  skills: Skills;
}

/**
 * Represents a LinkedIn experience.
 */
export interface Experience {
  /**
   * The title of the experience.
   */
  title: string;
  /**
   * The company of the experience.
   */
  company: string;
  /**
   * The start date of the experience. Format: YYYY-MM
   */
  startDate: string;
  /**
   * The end date of the experience. Format: YYYY-MM or 'Present'
   */
  endDate?: string; // Optional for current positions
  /**
   * The description of the experience.
   */
  description: string;
  /**
   * Skills or technologies mentioned (Optional)
   */
  skills?: string[];
  /**
   * Location (Optional, though user asked to omit, keeping field for structure)
   */
  location?: string;
}

/**
 * Represents a LinkedIn education.
 */
export interface Education {
  /**
   * The school of the education.
   */
  school: string;
  /**
   * The degree of the education.
   */
  degree: string;
  /**
   * The start date of the education. Format: YYYY-MM
   */
  startDate: string;
  /**
   * The end date of the education. Format: YYYY-MM
   */
  endDate: string;
  /**
   * The description of the education (Removed from display, kept in type for potential future use).
   */
  description?: string;
}

/**
 * Represents structured skills categorized.
 */
export interface Skills {
  Tools: string[];
  Frameworks: string[];
  CodeAnalysis: string[];
  Cloud: string[];
  OperatingSystems: string[];
  Programming: string[];
}


// Helper function to parse date string like "Month YYYY" or "Present" to "YYYY-MM" or "Present"
const parseExperienceDate = (dateString: string): string => {
  if (dateString.toLowerCase() === 'present') {
    return 'Present';
  }
  try {
    const [month, year] = dateString.split(' ');
    // Simple mapping for month names to numbers
    const monthMap: { [key: string]: number } = {
      Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
      Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12
    };
    const monthNumber = monthMap[month];
    if (!monthNumber || !year || !/^\d{4}$/.test(year)) {
         throw new Error(`Invalid date format: ${dateString}`);
    }
    return `${year}-${monthNumber.toString().padStart(2, '0')}`;
  } catch (e) {
    console.warn(`Could not parse date: ${dateString}. Error: ${e}`);
    // Try parsing YYYY-MM directly
    if (/^\d{4}-\d{2}$/.test(dateString)) {
      return dateString;
    }
    return dateString; // Return original if parsing fails completely
  }
};


/**
 * Asynchronously retrieves LinkedIn profile information.
 *
 * @param profileUrl The url of the linked profile to retrieve.
 * @returns A promise that resolves to a LinkedInProfile object containing profile information.
 */
export async function getLinkedInProfile(profileUrl: string): Promise<LinkedInProfile> {
  // TODO: Implement this by calling an actual API or scraping service.
  // Using dummy data based on user request.

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 50)); // Short delay

  return {
    fullName: 'Revanth Matte',
    headline: 'Cybersecurity Professional & Penetration Tester', // Updated Headline
    profilePictureUrl: 'https://picsum.photos/seed/revanth/200/200',
    about: 'Cybersecurity professional with a strong focus on application security, penetration testing, and secure development practices. Highly motivated, technically curious, and collaborative in working with engineering teams to embed security into the SDLC. Proficient in Python scripting on Linux systems and experienced with tools like Burp Suite, OWASP ZAP, and custom security scanners. Familiar with AWS environments and actively pursuing OSCP to strengthen offensive security capabilities.',
    experiences: [
       {
        title: 'Application Security Analyst',
        company: 'Dream Studio',
        startDate: parseExperienceDate('Sep 2024'),
        endDate: parseExperienceDate('Present'),
        skills: ['Python', 'Flask', 'Git', 'OWASP ZAP'],
        location: 'Remote', // Included as per resume but will be omitted in display if needed
        description: '• Discovered and addressed 20+ OWASP Top 10 issues by performing security assessments & reviewing Python/JavaScript codebases.\n• Identified insecure TLS configurations and misused security headers (e.g., missing CSP, HSTS, X-Frame-Options) during endpoint reviews, recommending hardening steps for improved transport security.\n• Delivered in-depth API testing using Burp Suite and tailored test cases to expose authentication gaps, logic errors, and insecure endpoints.\n• Collaborated with developers to integrate security into CI/CD workflows, embedding secure coding practices and enhancing code review processes.',
      },
      {
        title: 'Cybersecurity Trainee',
        company: 'Tata Consultancy Services',
        startDate: parseExperienceDate('Jan 2022'),
        endDate: parseExperienceDate('Jun 2022'),
        skills: ['Nessus', 'SonarQube', 'Semgrep'],
        location: 'Remote',
        description: '• Conducted vulnerability assessments and penetration testing across web apps and cloud infrastructure, identifying and triaging over 500 vulnerabilities and reducing overall threat exposure by 70%.\n• Performed manual and automated code reviews on APIs and web apps using SonarQube and Semgrep, uncovering insecure coding patterns, injection flaws, and auth misconfigurations before production release.\n• Automated validation of common OWASP vulnerabilities using Python scripts, improving consistency in testing workflows and enabling faster identification of critical security gaps.\n• Partnered with AppSec and cloud security teams to define secure coding baselines, optimize Nessus scan performance, and contribute to cross-functional security policy development.',
      },
      {
        title: 'Web Application Penetration Tester Intern',
        company: 'Indian Servers',
        startDate: parseExperienceDate('Aug 2021'),
        endDate: parseExperienceDate('Dec 2021'),
        skills: ['Kali Linux', 'Burp Suite', 'OWASP', 'Penetration Testing'],
        location: 'Remote',
        description: '• Found security flaws in 10+ web applications using OWASP Top 10 methodology and tools such as Burp Suite and sqlmap.\n• Reported issues including authentication bypass, IDOR, and injection vulnerabilities, providing detailed proof-of-concept documentation.\n• Supported developers during remediation efforts by validating fixes and aligning with secure coding practices.',
      },
       {
        title: 'Cybersecurity Intern',
        company: 'The Sparks Foundation',
        startDate: parseExperienceDate('Aug 2021'),
        endDate: parseExperienceDate('Sep 2021'),
         skills: ['SIEM', 'Snort IDS', 'Wireshark'],
        location: 'Remote',
        description: '• Monitored web and network traffic to detect application-layer anomalies using Snort IDS and log analysis.\n• Investigated false positives and correlated alerts to improve accuracy in identifying web-based attack patterns.\n• Contributed to internal threat intel updates focused on emerging application threats and detection signatures.',
      },
      {
        title: 'Cybersecurity Intern',
        company: 'Verzeo',
        startDate: parseExperienceDate('Jan 2021'),
        endDate: parseExperienceDate('Mar 2021'),
        skills: ['OpenVAS', 'Nmap', 'API Security'], // Corrected typo from OpenVASNmap
        location: 'Remote',
        description: '• Performed reconnaissance and vulnerability scans to map exposed services and weak configurations in web-facing systems.\n• Tested REST APIs for injection flaws and access control issues using Burp Suite Intruder and custom fuzzing payloads.\n• Documented vulnerabilities with CVSS-based risk ratings and remediation guidance tailored to application-layer risks.',
      },
    ],
    educations: [
       {
        school: 'University of Maryland College Park',
        degree: "Master of Engineering in Cybersecurity",
        startDate: '2022-08',
        endDate: '2024-05',
        // description removed as requested
      },
      {
        school: 'SRM University',
        degree: "Bachelor of Technology, Computer Science",
        startDate: '2018-07',
        endDate: '2022-05',
         // description removed as requested
      },
    ],
    skills: {
        Tools: [
            "Tenable Nessus", "Burp Suite", "Splunk", "Wireshark", "Nmap", "Veracode",
            "OpenVAS", "Mimikatz", "VirusTotal", "Shodan", "SQLmap", "Acunetix", "Nikto", "Office 365"
        ],
        Frameworks: [
            "OWASP Top 10", "CWE", "CVSS", "MITRE ATT&CK", "NIST CSF", "CIS Benchmarks",
            "PCI-DSS", "HIPAA", "ISO 27001"
        ],
        CodeAnalysis: ["Semgrep", "SonarQube", "Git", "VS Code"],
        Cloud: ["AWS (IAM, S3, EC2, GuardDuty)", "ScoutSuite", "GCP"],
        OperatingSystems: ["Kali Linux", "Ubuntu", "Parrot OS", "Windows"],
        Programming: ["Python", "Bash", "PowerShell", "SQL", "C"]
    }
  };
}
