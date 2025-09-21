// Career Analysis Application
class CareerAdvisor {
    constructor() {
        this.currentQuestion = 0;
        this.answers = {};
        this.analysisType = null; // 'junior', 'senior', 'graduation', or 'professional'
        this.questions = this.initializeQuestions();
        this.advancedQuestions = this.initializeAdvancedQuestions();
        this.streamRecommendations = this.initializeStreamRecommendations();
        this.skillRecommendations = this.initializeSkillRecommendations();
        this.advancedCareerData = this.initializeAdvancedCareerData();
        // Use environment-based URL for backend
        this.backendUrl = window.location.origin + '/api';
        
        this.initializeEventListeners();
    }

    initializeQuestions() {
        return [
            {
                title: "Academic Interests",
                question: "What are your favorite subjects in school?",
                type: "multiple",
                options: [
                    "Mathematics",
                    "Science (Physics, Chemistry, Biology)",
                    "English Literature",
                    "History",
                    "Geography",
                    "Economics",
                    "Computer Science",
                    "Art & Design",
                    "Physical Education",
                    "Languages"
                ]
            },
            {
                title: "Free Time Activities",
                question: "What do you enjoy doing in your free time?",
                type: "multiple",
                options: [
                    "Reading books",
                    "Drawing or painting",
                    "Playing video games",
                    "Building things (LEGO, models, crafts)",
                    "Debating or discussing topics",
                    "Playing sports",
                    "Cooking or baking",
                    "Writing stories or poetry",
                    "Learning new languages",
                    "Volunteering or helping others"
                ]
            },
            {
                title: "Time-Losing Activities",
                question: "What activities make you lose track of time?",
                type: "multiple",
                options: [
                    "Solving puzzles or problems",
                    "Creating art or music",
                    "Researching topics online",
                    "Building or fixing things",
                    "Writing or storytelling",
                    "Playing strategy games",
                    "Learning about new technologies",
                    "Helping others with their problems",
                    "Organizing or planning events",
                    "Exploring nature or science"
                ]
            },
            {
                title: "Problem Solving",
                question: "How do you prefer to solve problems?",
                type: "single",
                options: [
                    "By analyzing data and finding patterns",
                    "By thinking creatively and brainstorming",
                    "By working with others and discussing ideas",
                    "By researching and learning more about the topic",
                    "By trying different approaches until something works"
                ]
            },
            {
                title: "Learning Style",
                question: "How do you learn best?",
                type: "single",
                options: [
                    "Through hands-on practice and experiments",
                    "By reading and studying theory",
                    "Through group discussions and collaboration",
                    "By watching videos and visual demonstrations",
                    "Through trial and error"
                ]
            },
            {
                title: "Future Goals",
                question: "What kind of work environment appeals to you?",
                type: "single",
                options: [
                    "Laboratory or research facility",
                    "Office with regular hours",
                    "Creative studio or workshop",
                    "Outdoor or field work",
                    "Working from home or flexible schedule"
                ]
            },
            {
                title: "Values",
                question: "What's most important to you in a career?",
                type: "single",
                options: [
                    "Making a lot of money",
                    "Helping others and making a difference",
                    "Being creative and expressing yourself",
                    "Having job security and stability",
                    "Learning new things and growing"
                ]
            },
            {
                title: "Challenges",
                question: "What type of challenges do you enjoy?",
                type: "single",
                options: [
                    "Complex mathematical or logical problems",
                    "Creative challenges requiring innovation",
                    "Social challenges involving people",
                    "Technical challenges with tools or technology",
                    "Research challenges requiring investigation"
                ]
            }
        ];
    }

    initializeAdvancedQuestions() {
        return [
            {
                title: "Current Stream",
                question: "What is your current academic stream?",
                type: "single",
                options: [
                    "Science (PCM/PCB)",
                    "Commerce",
                    "Humanities/Arts"
                ]
            },
            {
                title: "Domain Interest",
                question: "What specific domain or field are you most passionate about?",
                type: "single",
                options: [
                    "Technology & Programming",
                    "Medicine & Healthcare",
                    "Business & Finance",
                    "Law & Justice",
                    "Engineering & Innovation",
                    "Arts & Design",
                    "Education & Research",
                    "Environmental Science",
                    "Psychology & Human Behavior",
                    "Media & Communication"
                ]
            },
            {
                title: "Hobbies & Passions",
                question: "What are your main hobbies and passions outside of academics?",
                type: "multiple",
                options: [
                    "Coding and programming",
                    "Writing and blogging",
                    "Photography and videography",
                    "Music and performing arts",
                    "Sports and fitness",
                    "Cooking and food",
                    "Travel and exploration",
                    "Gaming and technology",
                    "Volunteering and social work",
                    "Entrepreneurship and business"
                ]
            },
            {
                title: "Career Goals",
                question: "What type of impact do you want to make in your career?",
                type: "single",
                options: [
                    "Solve complex technical problems",
                    "Help and heal people",
                    "Build and grow businesses",
                    "Advocate for justice and rights",
                    "Create innovative products",
                    "Inspire and educate others",
                    "Protect the environment",
                    "Understand human behavior",
                    "Communicate and inform",
                    "Lead and manage teams"
                ]
            },
            {
                title: "Work Style",
                question: "How do you prefer to work?",
                type: "single",
                options: [
                    "Independently with deep focus",
                    "In collaborative teams",
                    "With frequent client interaction",
                    "In research and analysis",
                    "With creative freedom",
                    "In structured environments",
                    "With travel and variety",
                    "In fast-paced environments",
                    "With teaching and mentoring",
                    "In leadership roles"
                ]
            }
        ];
    }

    initializeGraduationQuestions() {
        return [
            {
                title: "Degree Background",
                question: "What is your degree background?",
                type: "single",
                options: [
                    "Engineering (Computer Science/IT)",
                    "Engineering (Mechanical/Civil/Electrical)",
                    "Engineering (Biomedical/Chemical)",
                    "Medical (MBBS/MD)",
                    "Finance & Commerce (BBA/MBA Finance)",
                    "Business Administration (BBA/MBA)",
                    "Law (LLB/LLM)",
                    "Psychology (BSc/MSc Psychology)",
                    "Defence & Military",
                    "Arts & Humanities",
                    "Science (BSc/MSc)",
                    "Other"
                ]
            },
            {
                title: "Specialization",
                question: "What is your area of specialization or major?",
                type: "single",
                options: [
                    "Software Development & Programming",
                    "Data Science & Analytics",
                    "Cybersecurity",
                    "Artificial Intelligence & Machine Learning",
                    "Mechanical Design & Manufacturing",
                    "Civil Engineering & Construction",
                    "Electrical & Electronics",
                    "Biomedical Engineering",
                    "Medicine & Surgery",
                    "Finance & Investment Banking",
                    "Marketing & Sales",
                    "Human Resources",
                    "Corporate Law",
                    "Clinical Psychology",
                    "Defence Technology",
                    "Digital Marketing",
                    "Other"
                ]
            },
            {
                title: "Current Experience",
                question: "What is your current professional experience level?",
                type: "single",
                options: [
                    "Fresh Graduate (0-1 years)",
                    "Early Career (1-3 years)",
                    "Mid-Level (3-7 years)",
                    "Senior Level (7+ years)",
                    "Currently pursuing higher studies",
                    "Career transition phase"
                ]
            },
            {
                title: "Career Interests",
                question: "What type of career path interests you most?",
                type: "multiple",
                options: [
                    "Technical roles (Software Engineer, Data Scientist)",
                    "Management roles (Project Manager, Team Lead)",
                    "Consulting (Business Consultant, Tech Consultant)",
                    "Entrepreneurship (Startup Founder, Business Owner)",
                    "Research & Development",
                    "Sales & Business Development",
                    "Teaching & Training",
                    "Government & Public Sector",
                    "Non-profit & Social Impact",
                    "Freelancing & Remote Work"
                ]
            },
            {
                title: "Skills Assessment",
                question: "Which skills do you currently possess?",
                type: "multiple",
                options: [
                    "Programming (Python, Java, C++, etc.)",
                    "Data Analysis & Statistics",
                    "Project Management",
                    "Digital Marketing",
                    "Financial Analysis",
                    "Legal Research & Writing",
                    "Clinical Assessment",
                    "Leadership & Team Management",
                    "Communication & Presentation",
                    "Problem Solving & Critical Thinking"
                ]
            }
        ];
    }

    initializeProfessionalQuestions() {
        return [
            {
                title: "Current Profession",
                question: "What is your current profession?",
                type: "single",
                options: [
                    "Software Engineer/Developer",
                    "Data Scientist/Analyst",
                    "Doctor/Medical Professional",
                    "Lawyer/Legal Professional",
                    "Psychologist/Therapist",
                    "Business Analyst/Manager",
                    "Marketing Professional",
                    "Teacher/Professor",
                    "Engineer (Various Fields)",
                    "Consultant",
                    "Entrepreneur/Business Owner",
                    "Government Employee",
                    "Defence Personnel",
                    "Other"
                ]
            },
            {
                title: "Industry Experience",
                question: "How many years of experience do you have in your current field?",
                type: "single",
                options: [
                    "0-2 years",
                    "3-5 years",
                    "6-10 years",
                    "11-15 years",
                    "16-20 years",
                    "20+ years"
                ]
            },
            {
                title: "Career Goals",
                question: "What are your primary career goals?",
                type: "multiple",
                options: [
                    "Advance to senior/leadership positions",
                    "Switch to a different industry",
                    "Start my own business",
                    "Become a subject matter expert",
                    "Increase my earning potential",
                    "Achieve better work-life balance",
                    "Make a career transition",
                    "Develop new technical skills",
                    "Build a strong professional network",
                    "Contribute to social causes"
                ]
            },
            {
                title: "Skill Gaps",
                question: "What skills do you feel you need to develop?",
                type: "multiple",
                options: [
                    "Technical skills (Programming, Data Analysis)",
                    "Leadership and management skills",
                    "Digital marketing and social media",
                    "Financial literacy and business acumen",
                    "Communication and presentation skills",
                    "Project management methodologies",
                    "AI and machine learning",
                    "Cybersecurity knowledge",
                    "Soft skills (Emotional intelligence, networking)",
                    "Industry-specific certifications"
                ]
            },
            {
                title: "Learning Preferences",
                question: "How do you prefer to learn new skills?",
                type: "single",
                options: [
                    "Online courses and tutorials",
                    "Formal education and certifications",
                    "On-the-job training and mentoring",
                    "Reading books and research papers",
                    "Attending workshops and conferences",
                    "Learning through projects and practice",
                    "Peer learning and collaboration"
                ]
            }
        ];
    }

    initializeStreamRecommendations() {
        return {
            Science: {
                description: "Focus on Physics, Chemistry, Biology, and Mathematics. Perfect for students interested in research, medicine, engineering, or technology.",
                careers: ["Doctor", "Engineer", "Scientist", "Researcher", "Data Analyst", "Software Developer"],
                subjects: ["Physics", "Chemistry", "Biology", "Mathematics", "Computer Science"]
            },
            Commerce: {
                description: "Focus on Business Studies, Economics, Accountancy, and Mathematics. Ideal for students interested in business, finance, or entrepreneurship.",
                careers: ["Business Analyst", "Accountant", "Banker", "Entrepreneur", "Financial Advisor", "Marketing Manager"],
                subjects: ["Business Studies", "Economics", "Accountancy", "Mathematics", "English"]
            },
            Humanities: {
                description: "Focus on History, Geography, Political Science, Psychology, and Literature. Great for students interested in social sciences, arts, or public service.",
                careers: ["Journalist", "Lawyer", "Teacher", "Social Worker", "Psychologist", "Public Administrator"],
                subjects: ["History", "Geography", "Political Science", "Psychology", "Literature"]
            }
        };
    }

    initializeSkillRecommendations() {
        return {
            softSkills: [
                {
                    name: "Emotional Resilience",
                    description: "The ability to handle stress and bounce back from setbacks",
                    tip: "Keep a journal to track your feelings and progress. Practice mindfulness or meditation for 10 minutes daily.",
                    icon: "fas fa-heart"
                },
                {
                    name: "Communication & Public Speaking",
                    description: "Express your ideas clearly and confidently in front of others",
                    tip: "Join a debate club, give presentations in class, or start a YouTube channel about topics you love.",
                    icon: "fas fa-microphone"
                },
                {
                    name: "Teamwork & Leadership",
                    description: "Work effectively with others and take initiative when needed",
                    tip: "Participate in group projects, organize a small school event, or volunteer for community service.",
                    icon: "fas fa-users"
                },
                {
                    name: "Time Management",
                    description: "Organize your time effectively to balance studies and personal interests",
                    tip: "Use a planner or app to organize your study schedule. Set specific goals for each day.",
                    icon: "fas fa-clock"
                }
            ],
            hardSkills: [
                {
                    name: "Foundational Coding",
                    description: "Basic programming skills that are valuable in almost every field",
                    tip: "Start with block-based coding like Scratch, then try introductory Python lessons. Make it fun by creating games or solving puzzles.",
                    icon: "fas fa-code"
                },
                {
                    name: "Digital Arts",
                    description: "Creative skills using digital tools and software",
                    tip: "Explore free tools like Canva for design, GIMP for image editing, or Blender for 3D modeling if you like art.",
                    icon: "fas fa-palette"
                },
                {
                    name: "Financial Literacy",
                    description: "Understanding money management and basic economics",
                    tip: "Start with a piggy bank or simple budget. Learn about savings, investments, and how money works in the real world.",
                    icon: "fas fa-coins"
                },
                {
                    name: "Practical Knowledge",
                    description: "Hands-on skills for building and fixing things",
                    tip: "Try simple DIY projects like building a small circuit, making a birdhouse, or learning basic home repairs.",
                    icon: "fas fa-tools"
                }
            ]
        };
    }

    initializeAdvancedCareerData() {
        return {
            "Technology & Programming": {
                careers: ["Data Scientist", "Software Engineer", "AI/ML Engineer", "Cybersecurity Analyst"],
                challenges: [
                    {
                        challenge: "AI and Automation Competition",
                        description: "As AI becomes more sophisticated, many programming tasks may be automated, requiring programmers to focus on higher-level problem-solving and creativity.",
                        solutions: [
                            "Focus on human-AI collaboration skills",
                            "Develop expertise in AI ethics and governance",
                            "Build strong communication and leadership skills",
                            "Stay updated with emerging technologies"
                        ]
                    },
                    {
                        challenge: "Rapid Technology Changes",
                        description: "Technology evolves quickly, making some skills obsolete while creating demand for new ones.",
                        solutions: [
                            "Develop strong learning agility",
                            "Build a strong foundation in computer science principles",
                            "Focus on problem-solving rather than specific tools",
                            "Create a habit of continuous learning"
                        ]
                    }
                ],
                digitalSkills: [
                    {
                        skill: "Python Programming",
                        resources: {
                            courses: ["Python for Everybody (Coursera)", "freeCodeCamp Python Course", "Codecademy Python 3"],
                            books: ["Python Crash Course by Eric Matthes", "Automate the Boring Stuff by Al Sweigart"],
                            tools: ["Jupyter Notebook", "PyCharm", "VS Code"]
                        }
                    },
                    {
                        skill: "Data Analysis",
                        resources: {
                            courses: ["Data Science Specialization (Coursera)", "IBM Data Science Professional Certificate"],
                            books: ["Python for Data Analysis by Wes McKinney", "The Art of Statistics by David Spiegelhalter"],
                            tools: ["Pandas", "NumPy", "Matplotlib", "Tableau"]
                        }
                    }
                ]
            },
            "Medicine & Healthcare": {
                careers: ["Doctor", "Medical Researcher", "Biomedical Engineer", "Public Health Specialist"],
                challenges: [
                    {
                        challenge: "AI in Medical Diagnosis",
                        description: "AI systems are becoming increasingly capable of diagnosing diseases, potentially reducing the need for certain medical roles.",
                        solutions: [
                            "Focus on patient care and empathy",
                            "Develop expertise in complex cases and rare diseases",
                            "Learn to work alongside AI systems",
                            "Specialize in areas requiring human judgment"
                        ]
                    },
                    {
                        challenge: "Healthcare System Pressures",
                        description: "Increasing patient loads and cost pressures may affect job satisfaction and career stability.",
                        solutions: [
                            "Develop strong stress management skills",
                            "Consider specialized fields with better work-life balance",
                            "Build skills in healthcare administration",
                            "Focus on preventive and personalized medicine"
                        ]
                    }
                ],
                digitalSkills: [
                    {
                        skill: "Medical Technology",
                        resources: {
                            courses: ["Healthcare Data Analytics (edX)", "Medical AI Applications (Coursera)"],
                            books: ["The Digital Doctor by Robert Wachter", "Deep Medicine by Eric Topol"],
                            tools: ["Electronic Health Records", "Medical Imaging Software", "Telemedicine Platforms"]
                        }
                    }
                ]
            },
            "Business & Finance": {
                careers: ["Investment Banker", "Management Consultant", "Financial Analyst", "Entrepreneur"],
                challenges: [
                    {
                        challenge: "Algorithmic Trading and AI",
                        description: "Financial markets are increasingly automated, potentially reducing demand for traditional financial analysis roles.",
                        solutions: [
                            "Develop expertise in complex financial instruments",
                            "Focus on relationship management and client service",
                            "Learn about sustainable and impact investing",
                            "Build skills in financial technology"
                        ]
                    },
                    {
                        challenge: "Economic Uncertainty",
                        description: "Global economic volatility may create job insecurity in financial services.",
                        solutions: [
                            "Diversify skills across different financial sectors",
                            "Build strong analytical and problem-solving skills",
                            "Develop expertise in emerging markets",
                            "Focus on sustainable finance and ESG investing"
                        ]
                    }
                ],
                digitalSkills: [
                    {
                        skill: "Financial Modeling",
                        resources: {
                            courses: ["Financial Modeling (Coursera)", "Investment Banking Course (Udemy)"],
                            books: ["Financial Modeling and Valuation by Paul Pignataro", "Investment Banking by Joshua Rosenbaum"],
                            tools: ["Excel Advanced", "Bloomberg Terminal", "FactSet", "Power BI"]
                        }
                    }
                ]
            }
        };
    }

    initializeGraduationData() {
        return {
            "Engineering (Computer Science/IT)": {
                careerPaths: [
                    {
                        role: "Software Engineer",
                        description: "Develop and maintain software applications",
                        skills: ["Programming", "System Design", "Database Management"],
                        salary: "₹6-15 LPA",
                        growth: "High"
                    },
                    {
                        role: "Data Scientist",
                        description: "Analyze data to extract insights and build predictive models",
                        skills: ["Python/R", "Machine Learning", "Statistics"],
                        salary: "₹8-20 LPA",
                        growth: "Very High"
                    },
                    {
                        role: "DevOps Engineer",
                        description: "Manage deployment and infrastructure",
                        skills: ["Cloud Computing", "Docker", "Kubernetes"],
                        salary: "₹7-18 LPA",
                        growth: "High"
                    }
                ],
                industryInsights: {
                    trends: ["AI/ML Integration", "Cloud Computing", "Cybersecurity Focus"],
                    challenges: ["Rapid Technology Changes", "Skill Gap", "Competition"],
                    opportunities: ["Remote Work", "Startup Culture", "Global Market"]
                }
            },
            "Medical (MBBS/MD)": {
                careerPaths: [
                    {
                        role: "General Practitioner",
                        description: "Primary healthcare provider",
                        skills: ["Clinical Diagnosis", "Patient Care", "Medical Knowledge"],
                        salary: "₹5-12 LPA",
                        growth: "Stable"
                    },
                    {
                        role: "Specialist Doctor",
                        description: "Expert in specific medical field",
                        skills: ["Specialized Knowledge", "Advanced Procedures", "Research"],
                        salary: "₹10-30 LPA",
                        growth: "High"
                    },
                    {
                        role: "Medical Researcher",
                        description: "Conduct medical research and clinical trials",
                        skills: ["Research Methodology", "Data Analysis", "Medical Writing"],
                        salary: "₹6-15 LPA",
                        growth: "Moderate"
                    }
                ],
                industryInsights: {
                    trends: ["Telemedicine", "AI in Healthcare", "Preventive Medicine"],
                    challenges: ["Long Working Hours", "High Stress", "Regulatory Changes"],
                    opportunities: ["Private Practice", "Hospital Administration", "Medical Technology"]
                }
            },
            "Finance & Commerce (BBA/MBA Finance)": {
                careerPaths: [
                    {
                        role: "Financial Analyst",
                        description: "Analyze financial data and market trends",
                        skills: ["Financial Modeling", "Excel", "Market Analysis"],
                        salary: "₹4-10 LPA",
                        growth: "Moderate"
                    },
                    {
                        role: "Investment Banker",
                        description: "Help companies raise capital and make investments",
                        skills: ["Financial Analysis", "Deal Making", "Risk Assessment"],
                        salary: "₹8-25 LPA",
                        growth: "High"
                    },
                    {
                        role: "Risk Manager",
                        description: "Identify and manage financial risks",
                        skills: ["Risk Assessment", "Regulatory Knowledge", "Data Analysis"],
                        salary: "₹6-15 LPA",
                        growth: "High"
                    }
                ],
                industryInsights: {
                    trends: ["Fintech Innovation", "ESG Investing", "Digital Banking"],
                    challenges: ["Market Volatility", "Regulatory Changes", "Competition"],
                    opportunities: ["Fintech Startups", "Consulting", "International Markets"]
                }
            }
        };
    }

    initializeProfessionalData() {
        return {
            "Software Engineer/Developer": {
                requiredSkills: [
                    {
                        skill: "Cloud Computing (AWS/Azure/GCP)",
                        importance: "Critical",
                        description: "Essential for modern software deployment and scalability",
                        resources: ["AWS Certified Solutions Architect", "Azure Fundamentals", "Google Cloud Platform"]
                    },
                    {
                        skill: "DevOps & CI/CD",
                        importance: "High",
                        description: "Automate deployment and improve development workflow",
                        resources: ["Docker", "Kubernetes", "Jenkins", "GitLab CI"]
                    },
                    {
                        skill: "AI/ML Integration",
                        importance: "High",
                        description: "Integrate AI capabilities into applications",
                        resources: ["TensorFlow", "PyTorch", "Machine Learning APIs"]
                    }
                ],
                industryTrends: [
                    "Microservices Architecture",
                    "Serverless Computing",
                    "Edge Computing",
                    "Quantum Computing Preparation"
                ]
            },
            "Doctor/Medical Professional": {
                requiredSkills: [
                    {
                        skill: "Digital Health Technologies",
                        importance: "Critical",
                        description: "Telemedicine, EHR systems, and digital diagnostics",
                        resources: ["Telemedicine Platforms", "Electronic Health Records", "Digital Stethoscopes"]
                    },
                    {
                        skill: "AI-Assisted Diagnosis",
                        importance: "High",
                        description: "Work with AI tools for better patient outcomes",
                        resources: ["Medical AI Software", "Diagnostic Imaging AI", "Clinical Decision Support"]
                    },
                    {
                        skill: "Data Analytics in Healthcare",
                        importance: "Moderate",
                        description: "Analyze patient data for better treatment",
                        resources: ["Healthcare Analytics", "Population Health Management", "Clinical Research"]
                    }
                ],
                industryTrends: [
                    "Precision Medicine",
                    "Wearable Health Devices",
                    "Virtual Reality in Surgery",
                    "Personalized Treatment Plans"
                ]
            },
            "Lawyer/Legal Professional": {
                requiredSkills: [
                    {
                        skill: "Legal Technology (LegalTech)",
                        importance: "Critical",
                        description: "Use technology to improve legal practice efficiency",
                        resources: ["Case Management Software", "Document Automation", "Legal Research AI"]
                    },
                    {
                        skill: "Data Privacy & Cybersecurity Law",
                        importance: "High",
                        description: "Navigate complex data protection regulations",
                        resources: ["GDPR Compliance", "Cybersecurity Law", "Privacy Impact Assessments"]
                    },
                    {
                        skill: "AI Ethics & Regulation",
                        importance: "High",
                        description: "Understand and advise on AI-related legal issues",
                        resources: ["AI Governance", "Algorithmic Accountability", "Ethical AI Frameworks"]
                    }
                ],
                industryTrends: [
                    "Online Dispute Resolution",
                    "Smart Contracts",
                    "AI in Legal Research",
                    "Regulatory Technology (RegTech)"
                ]
            },
            "Psychologist/Therapist": {
                requiredSkills: [
                    {
                        skill: "Digital Mental Health Platforms",
                        importance: "Critical",
                        description: "Provide therapy through digital platforms",
                        resources: ["Teletherapy Platforms", "Mental Health Apps", "Virtual Reality Therapy"]
                    },
                    {
                        skill: "AI-Assisted Assessment",
                        importance: "High",
                        description: "Use AI tools for psychological assessment",
                        resources: ["Digital Assessment Tools", "Behavioral Analytics", "Predictive Mental Health"]
                    },
                    {
                        skill: "Data Analytics in Psychology",
                        importance: "Moderate",
                        description: "Analyze behavioral data for insights",
                        resources: ["Psychological Data Analysis", "Behavioral Pattern Recognition", "Outcome Measurement"]
                    }
                ],
                industryTrends: [
                    "Virtual Reality Therapy",
                    "AI-Powered Mental Health Chatbots",
                    "Wearable Mental Health Monitoring",
                    "Personalized Treatment Algorithms"
                ]
            }
        };
    }

    async initializeEventListeners() {
        document.getElementById('start-junior-analysis').addEventListener('click', async () => {
            this.analysisType = 'junior';
            this.currentQuestion = 0;
            this.answers = {};
            await this.loadBranchQuestions('junior');
        });

        document.getElementById('start-senior-analysis').addEventListener('click', async () => {
            this.analysisType = 'senior';
            this.currentQuestion = 0;
            this.answers = {};
            await this.loadBranchQuestions('senior');
        });

        document.getElementById('start-graduation-analysis').addEventListener('click', async () => {
            this.analysisType = 'graduation';
            this.currentQuestion = 0;
            this.answers = {};
            await this.loadBranchQuestions('graduation');
        });

        document.getElementById('start-professional-analysis').addEventListener('click', async () => {
            this.analysisType = 'professional';
            this.currentQuestion = 0;
            this.answers = {};
            await this.loadBranchQuestions('professional');
        });

        document.getElementById('next-question').addEventListener('click', () => {
            this.nextQuestion();
        });

        document.getElementById('prev-question').addEventListener('click', () => {
            this.previousQuestion();
        });

        document.getElementById('restart-analysis').addEventListener('click', () => {
            this.restartAnalysis();
        });

        document.getElementById('restart-advanced-analysis').addEventListener('click', () => {
            this.restartAnalysis();
        });

        document.getElementById('restart-graduation-analysis').addEventListener('click', () => {
            this.restartAnalysis();
        });

        document.getElementById('restart-professional-analysis').addEventListener('click', () => {
            this.restartAnalysis();
        });

        document.getElementById('download-report').addEventListener('click', () => {
            this.downloadReport();
        });

        document.getElementById('download-advanced-report').addEventListener('click', () => {
            this.downloadAdvancedReport();
        });

        document.getElementById('download-graduation-report').addEventListener('click', () => {
            this.downloadGraduationReport();
        });

        document.getElementById('download-professional-report').addEventListener('click', () => {
            this.downloadProfessionalReport();
        });

        // Roadmap download buttons
        document.getElementById('download-roadmap-junior').addEventListener('click', () => {
            this.downloadRoadmapPDF('junior');
        });

        document.getElementById('download-roadmap-senior').addEventListener('click', () => {
            this.downloadRoadmapPDF('senior');
        });

        document.getElementById('download-roadmap-graduation').addEventListener('click', () => {
            this.downloadRoadmapPDF('graduation');
        });

        document.getElementById('download-roadmap-professional').addEventListener('click', () => {
            this.downloadRoadmapPDF('professional');
        });
    }

    showSection(sectionId) {
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');
    }

    updateProgress() {
        const progress = ((this.currentQuestion + 1) / this.questions.length) * 100;
        document.getElementById('progress-fill').style.width = `${progress}%`;
        document.getElementById('current-question').textContent = this.currentQuestion + 1;
        document.getElementById('total-questions').textContent = this.questions.length;
    }

    displayQuestion() {
        const question = this.questions[this.currentQuestion];
        document.getElementById('question-title').textContent = question.title;
        document.getElementById('question-text').textContent = question.question;
        
        const optionsContainer = document.getElementById('options-container');
        optionsContainer.innerHTML = '';

        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            
            if (question.type === 'multiple') {
                optionElement.innerHTML = `
                    <input type="checkbox" id="option-${index}" value="${option}">
                    <label for="option-${index}">${option}</label>
                `;
            } else {
                optionElement.innerHTML = `
                    <input type="radio" name="question-${this.currentQuestion}" id="option-${index}" value="${option}">
                    <label for="option-${index}">${option}</label>
                `;
            }

            optionElement.addEventListener('click', () => {
                this.handleOptionClick(optionElement, question.type, option);
            });

            optionsContainer.appendChild(optionElement);
        });

        this.updateNavigationButtons();
    }

    handleOptionClick(optionElement, type, value) {
        if (type === 'multiple') {
            const checkbox = optionElement.querySelector('input[type="checkbox"]');
            checkbox.checked = !checkbox.checked;
            
            if (checkbox.checked) {
                optionElement.classList.add('selected');
                if (!this.answers[this.currentQuestion]) {
                    this.answers[this.currentQuestion] = [];
                }
                this.answers[this.currentQuestion].push(value);
            } else {
                optionElement.classList.remove('selected');
                this.answers[this.currentQuestion] = this.answers[this.currentQuestion].filter(item => item !== value);
            }
        } else {
            // Single choice
            document.querySelectorAll(`input[name="question-${this.currentQuestion}"]`).forEach(input => {
                input.checked = false;
            });
            optionElement.querySelector('input[type="radio"]').checked = true;
            optionElement.classList.add('selected');
            
            // Remove selected class from other options
            document.querySelectorAll('.option').forEach(opt => {
                if (opt !== optionElement) {
                    opt.classList.remove('selected');
                }
            });
            
            this.answers[this.currentQuestion] = [value];
        }

        this.updateNavigationButtons();
    }

    updateNavigationButtons() {
        const hasAnswer = this.answers[this.currentQuestion] && this.answers[this.currentQuestion].length > 0;
        document.getElementById('next-question').disabled = !hasAnswer;
        document.getElementById('prev-question').disabled = this.currentQuestion === 0;
    }

    nextQuestion() {
        if (this.currentQuestion < this.questions.length - 1) {
            this.currentQuestion++;
            this.updateProgress();
            this.displayQuestion();
        } else {
            if (this.analysisType === 'junior') {
                this.generateResults();
            } else if (this.analysisType === 'senior') {
                this.generateAdvancedResults();
            } else if (this.analysisType === 'graduation') {
                this.generateGraduationResults();
            } else if (this.analysisType === 'professional') {
                this.generateProfessionalResults();
            }
        }
    }

    previousQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.updateProgress();
            this.displayQuestion();
        }
    }

    async generateResults() {
        try {
            this.showLoadingState();
            const response = await this.callBackendAPI('analyze', {
                analysis_type: this.analysisType,
                answers: this.answers
            });
            
            if (response.analysis && response.roadmap) {
                this.displayResults(response.analysis, response.roadmap, response.career_data);
                this.showSection('results-section');
            } else {
                // Fallback to local analysis
                const recommendations = this.analyzeAnswers();
                this.displayResults(recommendations);
                this.showSection('results-section');
            }
        } catch (error) {
            console.error('Error calling backend API:', error);
            // Fallback to local analysis
            const recommendations = this.analyzeAnswers();
            this.displayResults(recommendations);
            this.showSection('results-section');
        }
    }

    async generateAdvancedResults() {
        try {
            this.showLoadingState();
            const response = await this.callBackendAPI('analyze', {
                analysis_type: this.analysisType,
                answers: this.answers
            });
            
            if (response.analysis && response.roadmap) {
                this.displayAdvancedResults(response.analysis, response.roadmap, response.career_data);
                this.showSection('advanced-results-section');
            } else {
                // Fallback to local analysis
                const analysis = this.analyzeAdvancedAnswers();
                this.displayAdvancedResults(analysis);
                this.showSection('advanced-results-section');
            }
        } catch (error) {
            console.error('Error calling backend API:', error);
            // Fallback to local analysis
            const analysis = this.analyzeAdvancedAnswers();
            this.displayAdvancedResults(analysis);
            this.showSection('advanced-results-section');
        }
    }

    async generateGraduationResults() {
        try {
            this.showLoadingState();
            const response = await this.callBackendAPI('analyze', {
                analysis_type: this.analysisType,
                answers: this.answers
            });
            
            if (response.analysis && response.roadmap) {
                this.displayGraduationResults(response.analysis, response.roadmap, response.career_data);
                this.showSection('graduation-results-section');
            } else {
                // Fallback to local analysis
                const analysis = this.analyzeGraduationAnswers();
                this.displayGraduationResults(analysis);
                this.showSection('graduation-results-section');
            }
        } catch (error) {
            console.error('Error calling backend API:', error);
            // Fallback to local analysis
            const analysis = this.analyzeGraduationAnswers();
            this.displayGraduationResults(analysis);
            this.showSection('graduation-results-section');
        }
    }

    async generateProfessionalResults() {
        try {
            this.showLoadingState();
            const response = await this.callBackendAPI('analyze', {
                analysis_type: this.analysisType,
                answers: this.answers
            });
            
            if (response.analysis && response.roadmap) {
                this.displayProfessionalResults(response.analysis, response.roadmap, response.career_data);
                this.showSection('professional-results-section');
            } else {
                // Fallback to local analysis
                const analysis = this.analyzeProfessionalAnswers();
                this.displayProfessionalResults(analysis);
                this.showSection('professional-results-section');
            }
        } catch (error) {
            console.error('Error calling backend API:', error);
            // Fallback to local analysis
            const analysis = this.analyzeProfessionalAnswers();
            this.displayProfessionalResults(analysis);
            this.showSection('professional-results-section');
        }
    }

    analyzeAnswers() {
        // Simple scoring system based on answers
        const scores = { Science: 0, Commerce: 0, Humanities: 0 };
        
        // Analyze each answer and assign scores
        Object.values(this.answers).forEach(answerArray => {
            answerArray.forEach(answer => {
                if (['Mathematics', 'Science (Physics, Chemistry, Biology)', 'Computer Science'].includes(answer)) {
                    scores.Science += 2;
                }
                if (['Economics', 'Business Studies', 'Accountancy'].includes(answer)) {
                    scores.Commerce += 2;
                }
                if (['History', 'Geography', 'English Literature', 'Art & Design'].includes(answer)) {
                    scores.Humanities += 2;
                }
                
                // Additional scoring based on activities and preferences
                if (['Building things', 'Solving puzzles', 'Learning about new technologies'].includes(answer)) {
                    scores.Science += 1;
                }
                if (['Debating', 'Helping others', 'Organizing events'].includes(answer)) {
                    scores.Humanities += 1;
                }
                if (['Reading books', 'Writing stories', 'Learning new languages'].includes(answer)) {
                    scores.Humanities += 1;
                }
            });
        });

        // Get top 3 streams
        const sortedStreams = Object.entries(scores)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 3)
            .map(([stream]) => stream);

        return {
            streams: sortedStreams,
            scores: scores
        };
    }

    analyzeAdvancedAnswers() {
        const stream = this.answers[0] ? this.answers[0][0] : "Science (PCM/PCB)";
        const domain = this.answers[1] ? this.answers[1][0] : "Technology & Programming";
        const hobbies = this.answers[2] ? this.answers[2] : [];
        const careerGoal = this.answers[3] ? this.answers[3][0] : "Solve complex technical problems";
        const workStyle = this.answers[4] ? this.answers[4][0] : "Independently with deep focus";

        return {
            stream: stream,
            domain: domain,
            hobbies: hobbies,
            careerGoal: careerGoal,
            workStyle: workStyle
        };
    }

    analyzeGraduationAnswers() {
        const degreeBackground = this.answers[0] ? this.answers[0][0] : "Engineering (Computer Science/IT)";
        const specialization = this.answers[1] ? this.answers[1][0] : "Software Development & Programming";
        const experience = this.answers[2] ? this.answers[2][0] : "Fresh Graduate (0-1 years)";
        const careerInterests = this.answers[3] ? this.answers[3] : [];
        const currentSkills = this.answers[4] ? this.answers[4] : [];

        return {
            degreeBackground: degreeBackground,
            specialization: specialization,
            experience: experience,
            careerInterests: careerInterests,
            currentSkills: currentSkills
        };
    }

    analyzeProfessionalAnswers() {
        const profession = this.answers[0] ? this.answers[0][0] : "Software Engineer/Developer";
        const experience = this.answers[1] ? this.answers[1][0] : "3-5 years";
        const careerGoals = this.answers[2] ? this.answers[2] : [];
        const skillGaps = this.answers[3] ? this.answers[3] : [];
        const learningPreference = this.answers[4] ? this.answers[4][0] : "Online courses and tutorials";

        return {
            profession: profession,
            experience: experience,
            careerGoals: careerGoals,
            skillGaps: skillGaps,
            learningPreference: learningPreference
        };
    }

    displayResults(recommendations, roadmap = null, careerData = null) {
        this.hideLoadingState();
        
        // Use backend data if available, otherwise fallback to local data
        const streamsData = careerData?.streams || this.streamRecommendations;
        const skillsData = careerData?.skills || this.skillRecommendations;
        
        // Display stream recommendations
        const streamsGrid = document.getElementById('streams-grid');
        streamsGrid.innerHTML = '';

        recommendations.streams.forEach(streamName => {
            const stream = streamsData[streamName];
            const streamCard = document.createElement('div');
            streamCard.className = 'stream-card';
            streamCard.innerHTML = `
                <h4>${streamName} Stream</h4>
                <p>${stream.description}</p>
                <div style="margin-top: 10px;">
                    <strong>Career Paths:</strong> ${stream.careers.slice(0, 3).join(', ')}
                </div>
                ${stream.salary_ranges ? `<div style="margin-top: 5px;"><strong>Salary Range:</strong> ${stream.salary_ranges.entry} - ${stream.salary_ranges.senior}</div>` : ''}
            `;
            streamsGrid.appendChild(streamCard);
        });

        // Display soft skills
        const softSkillsGrid = document.getElementById('soft-skills-grid');
        softSkillsGrid.innerHTML = '';

        skillsData.softSkills.forEach(skill => {
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item';
            skillItem.innerHTML = `
                <h4><i class="${skill.icon}"></i> ${skill.name}</h4>
                <p><strong>What it is:</strong> ${skill.description}</p>
                <p><strong>How to develop:</strong> ${skill.tip}</p>
                ${skill.development_stages ? `
                    <div style="margin-top: 10px;">
                        <strong>Development Stages:</strong>
                        <ul style="margin-top: 5px;">
                            <li><strong>Beginner:</strong> ${skill.development_stages.beginner}</li>
                            <li><strong>Intermediate:</strong> ${skill.development_stages.intermediate}</li>
                            <li><strong>Advanced:</strong> ${skill.development_stages.advanced}</li>
                        </ul>
                    </div>
                ` : ''}
            `;
            softSkillsGrid.appendChild(skillItem);
        });

        // Display hard skills
        const hardSkillsGrid = document.getElementById('hard-skills-grid');
        hardSkillsGrid.innerHTML = '';

        skillsData.hardSkills.forEach(skill => {
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item';
            skillItem.innerHTML = `
                <h4><i class="${skill.icon}"></i> ${skill.name}</h4>
                <p><strong>What it is:</strong> ${skill.description}</p>
                <p><strong>How to develop:</strong> ${skill.tip}</p>
                ${skill.development_stages ? `
                    <div style="margin-top: 10px;">
                        <strong>Development Stages:</strong>
                        <ul style="margin-top: 5px;">
                            <li><strong>Beginner:</strong> ${skill.development_stages.beginner}</li>
                            <li><strong>Intermediate:</strong> ${skill.development_stages.intermediate}</li>
                            <li><strong>Advanced:</strong> ${skill.development_stages.advanced}</li>
                        </ul>
                    </div>
                ` : ''}
            `;
            hardSkillsGrid.appendChild(skillItem);
        });

        // Display roadmap if available
        if (roadmap) {
            this.displayRoadmap(roadmap);
        }
    }

    displayRoadmap(roadmap) {
        // Create roadmap section
        const resultsContainer = document.querySelector('#results-section .results-container');
        
        const roadmapCard = document.createElement('div');
        roadmapCard.className = 'results-card';
        roadmapCard.innerHTML = `
            <h3><i class="fas fa-route"></i> Your Personalized Roadmap</h3>
            <div class="roadmap-content">
                <div class="roadmap-timeline">
                    <h4>📅 ${roadmap.timeline}</h4>
                </div>
                
                <div class="roadmap-phases">
                    ${roadmap.phases.map(phase => `
                        <div class="phase-item">
                            <h5>${phase.phase}</h5>
                            <p><strong>Focus:</strong> ${phase.focus}</p>
                            <ul>
                                ${phase.activities.map(activity => `<li>${activity}</li>`).join('')}
                            </ul>
                        </div>
                    `).join('')}
                </div>
                
                <div class="roadmap-milestones">
                    <h4>🎯 Key Milestones</h4>
                    <ul>
                        ${roadmap.milestones.map(milestone => `<li>${milestone}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="roadmap-resources">
                    <h4>📚 Recommended Resources</h4>
                    <ul>
                        ${roadmap.resources.map(resource => `<li>${resource}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="roadmap-metrics">
                    <h4>📊 Success Metrics</h4>
                    <ul>
                        ${roadmap.success_metrics.map(metric => `<li>${metric}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
        
        resultsContainer.appendChild(roadmapCard);
    }

    displayAdvancedResults(analysis) {
        // Display Career Path
        this.displayCareerPath(analysis);
        
        // Display Long-term View
        this.displayLongTermView(analysis);
        
        // Display Skill Development Roadmap
        this.displaySkillRoadmap(analysis);
        
        // Display Personal Growth Plan
        this.displayPersonalGrowthPlan(analysis);
    }

    displayCareerPath(analysis) {
        const careerPathContent = document.getElementById('career-path-content');
        const domainData = this.advancedCareerData[analysis.domain];
        
        let html = `<div class="career-field">
            <h4>Your Chosen Stream: ${analysis.stream}</h4>
            <p>Based on your interests in <strong>${analysis.domain}</strong>, here are the most promising career paths for you:</p>
        </div>`;

        domainData.careers.forEach(career => {
            html += `<div class="career-field">
                <h4>${career}</h4>
                <p>This career aligns perfectly with your ${analysis.domain} interests and ${analysis.workStyle.toLowerCase()} work style.</p>
            </div>`;
        });

        careerPathContent.innerHTML = html;
    }

    displayLongTermView(analysis) {
        const longTermContent = document.getElementById('long-term-content');
        const domainData = this.advancedCareerData[analysis.domain];
        
        let html = '<h4>Future Challenges & How to Prepare</h4>';
        
        domainData.challenges.forEach(challenge => {
            html += `<div class="challenge-solution">
                <h5>${challenge.challenge}</h5>
                <p>${challenge.description}</p>
                <div class="solution-item">
                    <h6>Solutions & Adaptations:</h6>
                    <ul>`;
            
            challenge.solutions.forEach(solution => {
                html += `<li>${solution}</li>`;
            });
            
            html += `</ul></div></div>`;
        });

        longTermContent.innerHTML = html;
    }

    displaySkillRoadmap(analysis) {
        const skillRoadmapContent = document.getElementById('skill-roadmap-content');
        const domainData = this.advancedCareerData[analysis.domain];
        
        let html = '';

        // Digital Skills
        html += `<div class="skill-category">
            <h4><i class="fas fa-laptop-code"></i> Digital Skills</h4>`;

        domainData.digitalSkills.forEach(skill => {
            html += `<div class="resource-item">
                <h5>${skill.skill}</h5>
                <div class="resource-item">
                    <h6>Online Courses/Platforms:</h6>
                    <ul>`;
            skill.resources.courses.forEach(course => {
                html += `<li>${course}</li>`;
            });
            html += `</ul></div>
                <div class="resource-item">
                    <h6>Best Books:</h6>
                    <ul>`;
            skill.resources.books.forEach(book => {
                html += `<li>${book}</li>`;
            });
            html += `</ul></div>
                <div class="resource-item">
                    <h6>Tools to Learn:</h6>
                    <ul>`;
            skill.resources.tools.forEach(tool => {
                html += `<li>${tool}</li>`;
            });
            html += `</ul></div>
            </div>`;
        });

        html += `</div>`;

        // Financial Guidance
        html += `<div class="financial-tip">
            <h5>💰 Financial Guidance</h5>
            <p>Start a small savings account and learn about mutual funds through free online tutorials. Consider opening a student bank account to understand basic financial management.</p>
        </div>`;

        // Personal Development & Hobbies
        html += `<div class="skill-category">
            <h4><i class="fas fa-heart"></i> Personal Development & Hobbies</h4>
            <p>Turn your hobbies into potential side income:</p>`;

        analysis.hobbies.forEach(hobby => {
            let suggestion = '';
            if (hobby.includes('Writing')) {
                suggestion = 'Start a blog about topics you love and monetize through ads or affiliate marketing.';
            } else if (hobby.includes('Photography')) {
                suggestion = 'Offer photography services for events or sell stock photos online.';
            } else if (hobby.includes('Cooking')) {
                suggestion = 'Start a food blog, YouTube channel, or offer cooking classes.';
            } else if (hobby.includes('Coding')) {
                suggestion = 'Create apps or websites for local businesses or freelance on platforms like Upwork.';
            } else {
                suggestion = 'Consider how you can share your passion with others and potentially earn from it.';
            }
            
            html += `<div class="resource-item">
                <h5>${hobby}</h5>
                <p>${suggestion}</p>
            </div>`;
        });

        html += `</div>`;

        skillRoadmapContent.innerHTML = html;
    }

    displayPersonalGrowthPlan(analysis) {
        const personalGrowthContent = document.getElementById('personal-growth-content');
        
        const softSkills = [
            {
                name: "Critical Thinking",
                description: "The ability to analyze and evaluate information objectively",
                development: "Engage with case studies related to your chosen field. Practice by analyzing news articles, research papers, or business scenarios. Ask yourself: What are the assumptions? What evidence supports this? What are alternative explanations?",
                icon: "fas fa-brain"
            },
            {
                name: "Emotional Intelligence",
                description: "Understanding and managing your own emotions and those of others",
                development: "Practice active listening, learn to recognize emotional triggers, and develop empathy. Manage stress through mindfulness, exercise, or creative outlets. Build effective relationships by being genuine and supportive.",
                icon: "fas fa-heart"
            },
            {
                name: "Public Speaking & Professional Communication",
                description: "Express ideas clearly and confidently in professional settings",
                development: "Practice email writing with clear, concise language. Prepare and deliver presentations on topics you're passionate about. Join Toastmasters or similar groups to build confidence.",
                icon: "fas fa-microphone"
            }
        ];

        let html = '';

        softSkills.forEach(skill => {
            html += `<div class="personal-growth-item">
                <h4><i class="${skill.icon}"></i> ${skill.name}</h4>
                <p><strong>What it is:</strong> ${skill.description}</p>
                <p><strong>How to develop:</strong> ${skill.development}</p>
            </div>`;
        });

        // Add analogy for emotional intelligence
        html += `<div class="analogy-box">
            <strong>💡 Think of it this way:</strong> Healthy competition is like playing a sport - you both want to win, but you respect each other and help each other improve. True friendship is like being on the same team - you support each other's success and celebrate together, even when one person achieves more than the other.
        </div>`;

        personalGrowthContent.innerHTML = html;
    }

    displayGraduationResults(analysis) {
        this.displayDegreeAnalysis(analysis);
        this.displayCareerOpportunities(analysis);
        this.displayGraduationSkills(analysis);
        this.displayIndustryInsights(analysis);
    }

    displayDegreeAnalysis(analysis) {
        const degreeAnalysisContent = document.getElementById('degree-analysis-content');
        const degreeData = this.initializeGraduationData()[analysis.degreeBackground];
        
        let html = `<div class="career-field">
            <h4>Your Degree: ${analysis.degreeBackground}</h4>
            <p><strong>Specialization:</strong> ${analysis.specialization}</p>
            <p><strong>Experience Level:</strong> ${analysis.experience}</p>
        </div>`;

        if (degreeData) {
            html += `<div class="career-field">
                <h4>Career Paths Available</h4>`;
            
            degreeData.careerPaths.forEach(career => {
                html += `<div class="career-field">
                    <h5>${career.role}</h5>
                    <p>${career.description}</p>
                    <p><strong>Required Skills:</strong> ${career.skills.join(', ')}</p>
                    <p><strong>Salary Range:</strong> ${career.salary} | <strong>Growth:</strong> ${career.growth}</p>
                </div>`;
            });
            
            html += `</div>`;
        }

        degreeAnalysisContent.innerHTML = html;
    }

    displayCareerOpportunities(analysis) {
        const careerOpportunitiesContent = document.getElementById('career-opportunities-content');
        
        let html = '<h4>Career Opportunities Based on Your Profile</h4>';
        
        analysis.careerInterests.forEach(interest => {
            html += `<div class="career-field">
                <h5>${interest}</h5>
                <p>This career path aligns with your interests and degree background. Consider gaining relevant certifications and experience in this area.</p>
            </div>`;
        });

        careerOpportunitiesContent.innerHTML = html;
    }

    displayGraduationSkills(analysis) {
        const graduationSkillsContent = document.getElementById('graduation-skills-content');
        
        let html = '<h4>Skill Development Plan</h4>';
        
        // Technical Skills
        html += `<div class="skill-category">
            <h4><i class="fas fa-code"></i> Technical Skills</h4>`;
        
        const technicalSkills = [
            "Programming Languages (Python, Java, JavaScript)",
            "Database Management (SQL, NoSQL)",
            "Cloud Computing (AWS, Azure, GCP)",
            "Data Analysis & Visualization",
            "Project Management Tools"
        ];
        
        technicalSkills.forEach(skill => {
            html += `<div class="resource-item">
                <h5>${skill}</h5>
                <p>Essential for modern professional roles</p>
            </div>`;
        });
        
        html += `</div>`;

        // Soft Skills
        html += `<div class="skill-category">
            <h4><i class="fas fa-users"></i> Soft Skills</h4>`;
        
        const softSkills = [
            "Communication & Presentation",
            "Leadership & Team Management",
            "Problem Solving & Critical Thinking",
            "Time Management & Organization",
            "Networking & Relationship Building"
        ];
        
        softSkills.forEach(skill => {
            html += `<div class="resource-item">
                <h5>${skill}</h5>
                <p>Critical for career advancement and professional success</p>
            </div>`;
        });
        
        html += `</div>`;

        graduationSkillsContent.innerHTML = html;
    }

    displayIndustryInsights(analysis) {
        const industryInsightsContent = document.getElementById('industry-insights-content');
        const degreeData = this.initializeGraduationData()[analysis.degreeBackground];
        
        let html = '<h4>Industry Insights & Trends</h4>';
        
        if (degreeData && degreeData.industryInsights) {
            html += `<div class="career-field">
                <h5>Current Trends</h5>
                <ul>`;
            degreeData.industryInsights.trends.forEach(trend => {
                html += `<li>${trend}</li>`;
            });
            html += `</ul></div>`;

            html += `<div class="career-field">
                <h5>Challenges to Watch</h5>
                <ul>`;
            degreeData.industryInsights.challenges.forEach(challenge => {
                html += `<li>${challenge}</li>`;
            });
            html += `</ul></div>`;

            html += `<div class="career-field">
                <h5>Opportunities</h5>
                <ul>`;
            degreeData.industryInsights.opportunities.forEach(opportunity => {
                html += `<li>${opportunity}</li>`;
            });
            html += `</ul></div>`;
        }

        industryInsightsContent.innerHTML = html;
    }

    displayProfessionalResults(analysis) {
        this.displayProfessionAnalysis(analysis);
        this.displayRequiredSkills(analysis);
        this.displayIndustryTrends(analysis);
        this.displayProfessionalDevelopment(analysis);
    }

    displayProfessionAnalysis(analysis) {
        const professionAnalysisContent = document.getElementById('profession-analysis-content');
        
        let html = `<div class="career-field">
            <h4>Your Current Profession: ${analysis.profession}</h4>
            <p><strong>Experience Level:</strong> ${analysis.experience}</p>
            <p><strong>Learning Preference:</strong> ${analysis.learningPreference}</p>
        </div>`;

        html += `<div class="career-field">
            <h4>Your Career Goals</h4>`;
        
        analysis.careerGoals.forEach(goal => {
            html += `<div class="career-field">
                <h5>${goal}</h5>
                <p>This goal will help you advance in your professional journey</p>
            </div>`;
        });
        
        html += `</div>`;

        professionAnalysisContent.innerHTML = html;
    }

    displayRequiredSkills(analysis) {
        const requiredSkillsContent = document.getElementById('required-skills-content');
        const professionData = this.initializeProfessionalData()[analysis.profession];
        
        let html = '<h4>Required New Skills for Your Profession</h4>';
        
        if (professionData) {
            professionData.requiredSkills.forEach(skill => {
                const importanceClass = skill.importance === 'Critical' ? 'challenge-solution' : 'career-field';
                html += `<div class="${importanceClass}">
                    <h5>${skill.skill} (${skill.importance})</h5>
                    <p>${skill.description}</p>
                    <div class="resource-item">
                        <h6>Resources to Learn:</h6>
                        <ul>`;
                skill.resources.forEach(resource => {
                    html += `<li>${resource}</li>`;
                });
                html += `</ul></div></div>`;
            });
        }

        requiredSkillsContent.innerHTML = html;
    }

    displayIndustryTrends(analysis) {
        const industryTrendsContent = document.getElementById('industry-trends-content');
        const professionData = this.initializeProfessionalData()[analysis.profession];
        
        let html = '<h4>Industry Trends & Future Requirements</h4>';
        
        if (professionData) {
            html += `<div class="career-field">
                <h5>Emerging Trends in Your Field</h5>
                <ul>`;
            professionData.industryTrends.forEach(trend => {
                html += `<li>${trend}</li>`;
            });
            html += `</ul></div>`;
        }

        html += `<div class="career-field">
            <h5>General Industry Trends</h5>
            <ul>
                <li>Digital Transformation across all sectors</li>
                <li>Remote and hybrid work models</li>
                <li>AI and automation integration</li>
                <li>Sustainability and ESG focus</li>
                <li>Continuous learning and upskilling</li>
            </ul>
        </div>`;

        industryTrendsContent.innerHTML = html;
    }

    displayProfessionalDevelopment(analysis) {
        const professionalDevelopmentContent = document.getElementById('professional-development-content');
        
        let html = '<h4>Professional Development Plan</h4>';
        
        // Skill Gaps
        html += `<div class="skill-category">
            <h4><i class="fas fa-exclamation-triangle"></i> Identified Skill Gaps</h4>`;
        
        analysis.skillGaps.forEach(gap => {
            html += `<div class="resource-item">
                <h5>${gap}</h5>
                <p>Focus on developing this skill to advance your career</p>
            </div>`;
        });
        
        html += `</div>`;

        // Learning Recommendations
        html += `<div class="skill-category">
            <h4><i class="fas fa-graduation-cap"></i> Learning Recommendations</h4>
            <div class="resource-item">
                <h5>Based on your learning preference: ${analysis.learningPreference}</h5>
                <p>We recommend focusing on hands-on projects and practical applications to maximize your learning effectiveness.</p>
            </div>
        </div>`;

        // Action Plan
        html += `<div class="skill-category">
            <h4><i class="fas fa-tasks"></i> 30-60-90 Day Action Plan</h4>
            <div class="resource-item">
                <h5>First 30 Days</h5>
                <p>Identify 2-3 priority skills and start with online courses or tutorials</p>
            </div>
            <div class="resource-item">
                <h5>Next 30 Days (60 total)</h5>
                <p>Begin applying new skills in your current role or side projects</p>
            </div>
            <div class="resource-item">
                <h5>Final 30 Days (90 total)</h5>
                <p>Seek feedback, update your resume, and start networking with professionals in your field</p>
            </div>
        </div>`;

        professionalDevelopmentContent.innerHTML = html;
    }

    async callBackendAPI(endpoint, data) {
        const response = await fetch(`${this.backendUrl}/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    }

    async loadBranchQuestions(analysisType) {
        try {
            this.showLoadingState();
            const response = await fetch(`${this.backendUrl}/questions/${analysisType}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            this.questions = data.questions;
            this.hideLoadingState();
            this.showSection('questionnaire-section');
            this.updateProgress();
            this.displayQuestion();
        } catch (error) {
            console.error('Error loading branch questions:', error);
            this.hideLoadingState();
            
            // Fallback to local questions
            if (analysisType === 'junior') {
                this.questions = this.initializeQuestions();
            } else if (analysisType === 'senior') {
                this.questions = this.advancedQuestions;
            } else if (analysisType === 'graduation') {
                this.questions = this.initializeGraduationQuestions();
            } else if (analysisType === 'professional') {
                this.questions = this.initializeProfessionalQuestions();
            }
            
            this.showSection('questionnaire-section');
            this.updateProgress();
            this.displayQuestion();
        }
    }

    showLoadingState() {
        // Add loading indicator
        const loadingDiv = document.createElement('div');
        loadingDiv.id = 'loading-indicator';
        loadingDiv.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <div style="font-size: 1.2rem; color: #667eea; margin-bottom: 20px;">
                    <i class="fas fa-spinner fa-spin"></i> Analyzing your responses...
                </div>
                <div style="color: #718096;">
                    Our AI is generating your personalized career roadmap
                </div>
            </div>
        `;
        
        // Insert loading indicator
        const currentSection = document.querySelector('.section.active');
        if (currentSection) {
            currentSection.appendChild(loadingDiv);
        }
    }

    hideLoadingState() {
        const loadingIndicator = document.getElementById('loading-indicator');
        if (loadingIndicator) {
            loadingIndicator.remove();
        }
    }

    restartAnalysis() {
        this.currentQuestion = 0;
        this.answers = {};
        this.analysisType = null;
        this.questions = this.initializeQuestions();
        this.showSection('welcome-section');
        this.updateProgress();
        this.hideLoadingState();
    }

    async downloadReport() {
        try {
            await this.downloadPDFReport('junior');
        } catch (error) {
            console.error('Error downloading PDF report:', error);
            // Fallback to text report
            const report = this.generateTextReport();
            this.downloadTextFile(report, 'career-analysis-report.txt');
        }
    }

    async downloadAdvancedReport() {
        try {
            await this.downloadPDFReport('senior');
        } catch (error) {
            console.error('Error downloading PDF report:', error);
            // Fallback to text report
            const report = this.generateAdvancedTextReport();
            this.downloadTextFile(report, 'advanced-career-analysis-report.txt');
        }
    }

    async downloadGraduationReport() {
        try {
            await this.downloadPDFReport('graduation');
        } catch (error) {
            console.error('Error downloading PDF report:', error);
            // Fallback to text report
            const report = this.generateGraduationTextReport();
            this.downloadTextFile(report, 'graduation-career-analysis-report.txt');
        }
    }

    async downloadProfessionalReport() {
        try {
            await this.downloadPDFReport('professional');
        } catch (error) {
            console.error('Error downloading PDF report:', error);
            // Fallback to text report
            const report = this.generateProfessionalTextReport();
            this.downloadTextFile(report, 'professional-career-analysis-report.txt');
        }
    }

    async downloadPDFReport(analysisType) {
        const response = await fetch(`${this.backendUrl}/download-report/${analysisType}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                answers: this.answers
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `career-analysis-report-${analysisType}-${new Date().toISOString().slice(0,10)}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }

    async downloadRoadmapPDF(analysisType) {
        try {
            const response = await fetch(`${this.backendUrl}/download-roadmap/${analysisType}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    answers: this.answers
                })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `career-roadmap-${analysisType}-${new Date().toISOString().slice(0,10)}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading roadmap PDF:', error);
            alert('Error downloading roadmap PDF. Please try again.');
        }
    }

    downloadTextFile(content, filename) {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    generateTextReport() {
        const recommendations = this.analyzeAnswers();
        let report = "PERSONALIZED CAREER & SKILLS ANALYSIS REPORT\n";
        report += "=" .repeat(50) + "\n\n";
        
        report += "YOUR CAREER STREAMS\n";
        report += "-" .repeat(20) + "\n";
        recommendations.streams.forEach((streamName, index) => {
            const stream = this.streamRecommendations[streamName];
            report += `${index + 1}. ${streamName} Stream\n`;
            report += `   ${stream.description}\n`;
            report += `   Career Paths: ${stream.careers.join(', ')}\n\n`;
        });

        report += "YOUR SOFT SKILLS ROADMAP\n";
        report += "-" .repeat(25) + "\n";
        this.skillRecommendations.softSkills.forEach(skill => {
            report += `• ${skill.name}\n`;
            report += `  What it is: ${skill.description}\n`;
            report += `  How to develop: ${skill.tip}\n\n`;
        });

        report += "YOUR HARD SKILLS ROADMAP\n";
        report += "-" .repeat(25) + "\n";
        this.skillRecommendations.hardSkills.forEach(skill => {
            report += `• ${skill.name}\n`;
            report += `  What it is: ${skill.description}\n`;
            report += `  How to develop: ${skill.tip}\n\n`;
        });

        report += "Good luck with your career journey! 🌟\n";
        return report;
    }

    generateAdvancedTextReport() {
        const analysis = this.analyzeAdvancedAnswers();
        let report = "ADVANCED CAREER & FUTURE ANALYSIS REPORT\n";
        report += "=" .repeat(50) + "\n\n";
        
        report += "YOUR CAREER PATH\n";
        report += "-" .repeat(20) + "\n";
        report += `Stream: ${analysis.stream}\n`;
        report += `Domain Interest: ${analysis.domain}\n`;
        report += `Career Goal: ${analysis.careerGoal}\n`;
        report += `Work Style: ${analysis.workStyle}\n\n`;

        const domainData = this.advancedCareerData[analysis.domain];
        report += "RECOMMENDED CAREERS:\n";
        domainData.careers.forEach(career => {
            report += `• ${career}\n`;
        });

        report += "\nTHE LONG-TERM VIEW (CHALLENGES & SOLUTIONS)\n";
        report += "-" .repeat(40) + "\n";
        domainData.challenges.forEach(challenge => {
            report += `\n${challenge.challenge}:\n`;
            report += `${challenge.description}\n`;
            report += "Solutions:\n";
            challenge.solutions.forEach(solution => {
                report += `• ${solution}\n`;
            });
        });

        report += "\nYOUR SKILL DEVELOPMENT ROADMAP\n";
        report += "-" .repeat(35) + "\n";
        report += "Digital Skills:\n";
        domainData.digitalSkills.forEach(skill => {
            report += `\n${skill.skill}:\n`;
            report += "Courses: " + skill.resources.courses.join(", ") + "\n";
            report += "Books: " + skill.resources.books.join(", ") + "\n";
            report += "Tools: " + skill.resources.tools.join(", ") + "\n";
        });

        report += "\nYOUR PERSONAL GROWTH PLAN\n";
        report += "-" .repeat(30) + "\n";
        report += "• Critical Thinking: Analyze case studies and practice questioning assumptions\n";
        report += "• Emotional Intelligence: Practice active listening and stress management\n";
        report += "• Public Speaking: Join Toastmasters and practice presentations\n";

        report += "\nFinancial Guidance: Start a savings account and learn about mutual funds\n";
        report += "Hobby Monetization: Consider how to turn your passions into side income\n\n";

        report += "Remember: The future belongs to those who can adapt and grow! 🚀\n";
        return report;
    }

    generateGraduationTextReport() {
        const analysis = this.analyzeGraduationAnswers();
        let report = "GRADUATION-LEVEL CAREER ANALYSIS REPORT\n";
        report += "=" .repeat(50) + "\n\n";
        
        report += "YOUR DEGREE ANALYSIS\n";
        report += "-" .repeat(25) + "\n";
        report += `Degree Background: ${analysis.degreeBackground}\n`;
        report += `Specialization: ${analysis.specialization}\n`;
        report += `Experience Level: ${analysis.experience}\n\n`;

        report += "CAREER OPPORTUNITIES\n";
        report += "-" .repeat(20) + "\n";
        analysis.careerInterests.forEach(interest => {
            report += `• ${interest}\n`;
        });

        report += "\nSKILL DEVELOPMENT PLAN\n";
        report += "-" .repeat(25) + "\n";
        report += "Technical Skills:\n";
        report += "• Programming Languages (Python, Java, JavaScript)\n";
        report += "• Database Management (SQL, NoSQL)\n";
        report += "• Cloud Computing (AWS, Azure, GCP)\n";
        report += "• Data Analysis & Visualization\n";
        report += "• Project Management Tools\n\n";

        report += "Soft Skills:\n";
        report += "• Communication & Presentation\n";
        report += "• Leadership & Team Management\n";
        report += "• Problem Solving & Critical Thinking\n";
        report += "• Time Management & Organization\n";
        report += "• Networking & Relationship Building\n\n";

        report += "Good luck with your professional journey! 🌟\n";
        return report;
    }

    generateProfessionalTextReport() {
        const analysis = this.analyzeProfessionalAnswers();
        let report = "PROFESSIONAL CAREER ANALYSIS REPORT\n";
        report += "=" .repeat(50) + "\n\n";
        
        report += "YOUR PROFESSIONAL PROFILE\n";
        report += "-" .repeat(30) + "\n";
        report += `Current Profession: ${analysis.profession}\n`;
        report += `Experience Level: ${analysis.experience}\n`;
        report += `Learning Preference: ${analysis.learningPreference}\n\n`;

        report += "YOUR CAREER GOALS\n";
        report += "-" .repeat(20) + "\n";
        analysis.careerGoals.forEach(goal => {
            report += `• ${goal}\n`;
        });

        report += "\nIDENTIFIED SKILL GAPS\n";
        report += "-" .repeat(25) + "\n";
        analysis.skillGaps.forEach(gap => {
            report += `• ${gap}\n`;
        });

        report += "\nPROFESSIONAL DEVELOPMENT PLAN\n";
        report += "-" .repeat(35) + "\n";
        report += "30-60-90 Day Action Plan:\n";
        report += "• First 30 Days: Identify 2-3 priority skills and start learning\n";
        report += "• Next 30 Days: Apply new skills in current role or projects\n";
        report += "• Final 30 Days: Seek feedback and start networking\n\n";

        report += "INDUSTRY TRENDS TO WATCH\n";
        report += "-" .repeat(30) + "\n";
        report += "• Digital Transformation across all sectors\n";
        report += "• Remote and hybrid work models\n";
        report += "• AI and automation integration\n";
        report += "• Sustainability and ESG focus\n";
        report += "• Continuous learning and upskilling\n\n";

        report += "Keep evolving and stay ahead of the curve! 🚀\n";
        return report;
    }
}

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new CareerAdvisor();
});