/**
 * Portfolio Data Store - Grounded in Kinza Bughio's CV (AS cybersecurity_analyst/Kinza_Bughio.docx)
 * Strictly authentic data - No additional or fabricated information.
 */

const HTB_DATA = {
    profile: {
        name: "Kinza Bughio",
        handle: "kinza099",
        title: "Cybersecurity Analyst & Instructor",
        email: "kinzapython@gmail.com",
        location: "Hyderabad, Sindh, Pakistan",
        degree: "Bachelor of Science in Cyber Security",
        university: "Mehran University of Engineering and Technology (MUET), Jamshoro",
        duration: "2022 – 2026",
        coursework: "Network Security, Ethical Hacking, Digital Forensics, Cryptography, Operating Systems, Web Application Security, Database Management",
        bio: "Detail-oriented Cybersecurity Analyst with 3+ years of teaching and practical experience in cybersecurity, computer science, ICT, programming, and networking. Skilled in ethical hacking, penetration testing, secure coding, vulnerability assessment, and tools including Nmap, Burp Suite, Wireshark, Metasploit, and Kali Linux. Strong ability to analyze security concepts and explain complex technical topics through clear, practical instruction. Holds a Bachelor's degree in Cyber Security.",
        socials: {
            github: "https://github.com/kinza099",
            linkedin: "https://linkedin.com/in/kinza-bughio-782777279",
            email: "mailto:kinzapython@gmail.com"
        },
        languages: [
            { name: "English", level: "Full Professional Proficiency" },
            { name: "Urdu", level: "Fluent" }
        ]
    },

    stats: [
        { label: "Technical Projects", value: 9, icon: "terminal", suffix: "" },
        { label: "Certifications", value: 12, icon: "workspace_premium", suffix: "" },
        { label: "Professional Roles", value: 5, icon: "work", suffix: "" },
        { label: "Comprehension Boost", value: 35, icon: "trending_up", suffix: "%" }
    ],

    experience: [
        {
            role: "Online Technical Tutor (University Level)",
            organization: "Remote / Independent",
            duration: "2024 – Present",
            location: "Remote",
            highlights: [
                "Deliver comprehensive online tutoring to 15+ university-level students in programming fundamentals, PHP, Laravel, and cybersecurity concepts.",
                "Design customized lesson materials and practical exercises that improved student comprehension by 35%, achieving a 90%+ student satisfaction rating.",
                "Provide real-time feedback, live code debugging support, and step-by-step walkthroughs of complex topics including secure authentication and network scanning.",
                "Mentor students through project completion from concept to deployment building confidence in independent technical problem-solving."
            ]
        },
        {
            role: "Cybersecurity Awareness Session Facilitator",
            organization: "Independent / Academic Institutions & Colleges",
            duration: "2024 – Present",
            location: "Sindh, Pakistan",
            highlights: [
                "Conducted cybersecurity awareness sessions for students and staff on digital safety, phishing, password hygiene, and online threat prevention.",
                "Simplified complex security concepts including social engineering and malware into practical, relatable examples for non-technical audiences.",
                "Educated participants on safe online practices and basic cyber hygiene using real-world case studies and interactive demonstrations.",
                "Sessions delivered at multiple academic institutions across Sindh, Pakistan."
            ]
        },
        {
            role: "Instructional Support Assistant (Technical Training)",
            organization: "National Vocational and Technical Training Commission (NAVTTC)",
            duration: "2024 – 2025",
            location: "Jamshoro",
            highlights: [
                "Assisted lead instructors in delivering NAVTTC-accredited technical training to cohorts of 20+ students in web development and programming.",
                "Identified and resolved student code errors, logic bugs, and security misconfigurations during hands-on lab sessions.",
                "Introduced learners to secure coding practices including input validation, session management, and protection against SQL injection and XSS attacks.",
                "Supported curriculum delivery in collaboration with MUET Jamshoro and NAVTTC contributing to a nationally recognized technical training programme."
            ]
        },
        {
            role: "Cybersecurity Intern",
            organization: "Rynex Security",
            duration: "07/2026 – 09/2026",
            location: "Remote",
            highlights: [
                "Working on real-world, simulated security projects designed to build and sharpen practical, industry-relevant skills.",
                "Receiving structured, hands-on training through dedicated online lectures covering core security concepts and industry-standard techniques.",
                "Applying hands-on techniques in a safe, guided environment to strengthen practical understanding of security operations and threat detection.",
                "Building on academic and teaching background by translating theoretical security concepts into applied, project-based experience."
            ]
        },
        {
            role: "PHP / Laravel Developer",
            organization: "Icreativez Technologies",
            duration: "08/2024 – 11/2024",
            location: "Hybrid / On-site",
            highlights: [
                "Developed and maintained secure PHP/Laravel web applications with user authentication, session management, and role-based access control (RBAC).",
                "Applied OWASP Top 10 secure coding practices including parameterised queries, input validation, and CSRF protection across 3 client projects.",
                "Practical development experience directly informs teaching of real-world web security and application development concepts."
            ]
        }
    ],

    education: {
        degree: "Bachelor of Science in Cyber Security",
        institution: "Mehran University of Engineering and Technology (MUET), Jamshoro",
        period: "2022 – 2026",
        coursework: "Network Security, Ethical Hacking, Digital Forensics, Cryptography, Operating Systems, Web Application Security, Database Management"
    },

    skills: [
        {
            category: "Ethical Hacking & Network Security",
            icon: "security",
            items: [
                "Ethical Hacking",
                "Network Security",
                "Penetration Testing",
                "Digital Forensics",
                "OWASP Top 10",
                "Vulnerability Assessment",
                "Password Security",
                "Nmap",
                "Burp Suite",
                "Wireshark",
                "Metasploit",
                "Kali Linux",
                "Linux (Kali/Ubuntu)"
            ]
        },
        {
            category: "Programming & Secure Development",
            icon: "terminal",
            items: [
                "Python",
                "PHP",
                "Laravel",
                "MySQL",
                "RESTful APIs",
                "OOP (Object-Oriented Programming)",
                "Secure Authentication & Session Mgmt",
                "Windows",
                "VS Code",
                "XAMPP",
                "GitHub"
            ]
        },
        {
            category: "Analytical & Professional Skills",
            icon: "psychology",
            items: [
                "Analytical Thinking",
                "Attention to Detail",
                "Risk Assessment",
                "Technical Communication",
                "Problem-Solving",
                "Report Writing & Documentation",
                "Adaptability",
                "Teamwork",
                "Time Management",
                "Punctuality & Reliability"
            ]
        },
        {
            category: "Training & Security Awareness",
            icon: "school",
            items: [
                "Cybersecurity Awareness Delivery",
                "Technical Tutoring",
                "Hands-on Lab Demonstrations",
                "Live Code Debugging Support",
                "Complex Concept Simplification",
                "35% Comprehension Improvement",
                "90%+ Satisfaction Track Record"
            ]
        }
    ],

    projects: [
        {
            id: "p1",
            title: "Hash Identifier",
            techStack: "Python",
            date: "2026",
            category: "Cybersecurity Tooling",
            description: "Built a Python tool that analyzes a given hash string and identifies its likely hash type (e.g., MD5, SHA-1, SHA-256, bcrypt) based on length and structure.",
            useCase: "Used as a teaching demo for password security and cryptographic hashing concepts.",
            tags: ["Python", "Cryptography", "Hash Analysis", "Security Demo"]
        },
        {
            id: "p2",
            title: "Student Management System",
            techStack: "Python (Flask & SQLite)",
            date: "2026",
            category: "Web & Software Development",
            description: "Built a full-stack, login-protected student management system with Flask, SQLAlchemy, and SQLite, featuring student and course CRUD, attendance tracking, and automatic GPA calculation.",
            useCase: "Designed an interactive Chart.js dashboard visualizing department distribution, grade breakdown, and attendance rates, with CSV export of student records; used to demonstrate secure, database-driven application design.",
            tags: ["Python", "Flask", "SQLAlchemy", "SQLite", "Chart.js", "CRUD"]
        },
        {
            id: "p3",
            title: "KeyScope — Live Keylogger Dashboard",
            techStack: "Python & Flask",
            date: "2026",
            category: "Cybersecurity & Analytics",
            description: "Built a real-time keystroke analytics dashboard using Flask and the pynput keyboard hook, streaming live stats via Server-Sent Events to a dark-themed dashboard UI.",
            useCase: "Features a keyboard heatmap, character-frequency histogram, and JSON session export; built as an educational demonstration of keylogging mechanics and personal productivity tracking.",
            tags: ["Python", "Flask", "pynput", "Server-Sent Events", "Analytics"]
        },
        {
            id: "p4",
            title: "SHA-1 Password Cracker",
            techStack: "Python",
            date: "03/2025",
            category: "Cybersecurity Tooling",
            description: "Built a dictionary-attack tool against SHA-1 hashed passwords to demonstrate real-world risks of weak hashing.",
            useCase: "Used as a cybersecurity teaching demo on password security best practices.",
            tags: ["Python", "Dictionary Attack", "Password Cracking", "SHA-1"]
        },
        {
            id: "p5",
            title: "Color Detection using AI",
            techStack: "Python & OpenCV",
            date: "03/2025",
            category: "AI & Computer Vision",
            description: "AI-powered image classification app using OpenCV and machine learning.",
            useCase: "Demonstrates applied Python and AI concepts taught in programming sessions.",
            tags: ["Python", "OpenCV", "Machine Learning", "Computer Vision"]
        },
        {
            id: "p6",
            title: "Nmap Network Scanner",
            techStack: "Python",
            date: "02/2025",
            category: "Cybersecurity Tooling",
            description: "Automated network reconnaissance tool for host discovery, port enumeration, and service detection.",
            useCase: "Used in penetration testing lab demonstrations for students.",
            tags: ["Python", "Nmap", "Network Recon", "Port Scanning"]
        },
        {
            id: "p7",
            title: "Banner Grabber",
            techStack: "Python",
            date: "2025",
            category: "Cybersecurity Tooling",
            description: "Python tool to grab service banners from open ports to identify potential vulnerabilities.",
            useCase: "Demonstrated as part of ethical hacking awareness sessions.",
            tags: ["Python", "Banner Grabbing", "Vulnerability Discovery", "Sockets"]
        },
        {
            id: "p8",
            title: "Jewelry E-commerce Website",
            techStack: "Secure PHP & MySQL",
            date: "11/2024 – 12/2024",
            category: "Web & Software Development",
            description: "Full-stack e-commerce platform with secure login, encrypted sessions, CSRF protection, and admin controls.",
            useCase: "Used to teach secure web development workflow.",
            tags: ["PHP", "MySQL", "CSRF Protection", "Encrypted Sessions", "E-commerce"]
        },
        {
            id: "p9",
            title: "Blog CMS",
            techStack: "PHP & MySQL",
            date: "08/2024",
            category: "Web & Software Development",
            description: "Content management system with role-based publishing, user authentication, and XSS-safe rendering.",
            useCase: "Demonstrates full MVC architecture to students.",
            tags: ["PHP", "MySQL", "XSS Prevention", "Authentication", "CMS"]
        }
    ],

    certifications: [
        {
            title: "Google Cybersecurity Professional Certificate",
            issuer: "Coursera verified",
            date: "05/2023",
            color: "#00E5FF"
        },
        {
            title: "Certified Ethical Hacker",
            issuer: "Credly verified badge",
            date: "12/2024",
            color: "#9FEF00"
        },
        {
            title: "Jr Penetration Tester",
            issuer: "TryHackMe (Nmap, Burp Suite, Metasploit)",
            date: "10/2023",
            color: "#FFB800"
        },
        {
            title: "Web Development (3-Month Course)",
            issuer: "MUET Jamshoro x NAVTTC",
            date: "02/2024 – 05/2024",
            color: "#9FEF00"
        },
        {
            title: "Introduction to Cyber Security Learning Path",
            issuer: "TryHackMe",
            date: "09/2023",
            color: "#00E5FF"
        },
        {
            title: "Pre Security Learning Path",
            issuer: "TryHackMe",
            date: "10/2023",
            color: "#9FEF00"
        },
        {
            title: "Networking Basics",
            issuer: "Credly",
            date: "2024",
            color: "#00E5FF"
        },
        {
            title: "Operating Systems Basics",
            issuer: "Credly",
            date: "12/2024",
            color: "#FFB800"
        },
        {
            title: "Computer Hardware Basics",
            issuer: "Credly",
            date: "2024",
            color: "#9D4EDD"
        },
        {
            title: "Python (Basic)",
            issuer: "HackerRank",
            date: "2024",
            color: "#9FEF00"
        },
        {
            title: "SQL (Basic)",
            issuer: "HackerRank",
            date: "2024",
            color: "#FFB800"
        },
        {
            title: "English Access Microscholarship Program",
            issuer: "U.S. State Department",
            date: "02/2019 – 01/2020",
            color: "#9D4EDD"
        }
    ]
};
