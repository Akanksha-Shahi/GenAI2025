from flask import Flask, request, jsonify, send_from_directory, send_file
from flask_cors import CORS
import json
import os
from datetime import datetime
import uuid
from reportlab.lib.pagesizes import letter, A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
import io

app = Flask(__name__)
CORS(app)

# Career Analysis Engine
class CareerAnalysisEngine:
    def __init__(self):
        self.load_career_data()
    
    def load_career_data(self):
        """Load comprehensive career data from JSON files"""
        try:
            with open('career_data.json', 'r') as f:
                self.career_data = json.load(f)
        except FileNotFoundError:
            # Fallback to embedded data
            self.career_data = self.get_default_career_data()
    
    def get_branch_specific_questions(self):
        """Get branch-specific questions for each analysis type"""
        return {
            "junior": [
                {
                    "title": "Academic Strengths",
                    "question": "Which subjects do you excel in or enjoy the most?",
                    "type": "multiple",
                    "options": [
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
                    "title": "Learning Style",
                    "question": "How do you prefer to learn new concepts?",
                    "type": "single",
                    "options": [
                        "Through hands-on experiments and practical work",
                        "By reading textbooks and taking notes",
                        "Through group discussions and collaboration",
                        "By watching videos and visual demonstrations",
                        "Through problem-solving and puzzles"
                    ]
                },
                {
                    "title": "Future Interests",
                    "question": "What kind of work environment appeals to you?",
                    "type": "single",
                    "options": [
                        "Laboratory or research facility",
                        "Office with regular hours",
                        "Creative studio or workshop",
                        "Outdoor or field work",
                        "Working from home or flexible schedule"
                    ]
                },
                {
                    "title": "Problem Solving",
                    "question": "When faced with a challenging problem, you prefer to:",
                    "type": "single",
                    "options": [
                        "Analyze data and find logical solutions",
                        "Think creatively and brainstorm ideas",
                        "Work with others to solve it together",
                        "Research and learn more about the topic",
                        "Try different approaches until something works"
                    ]
                },
                {
                    "title": "Career Values",
                    "question": "What's most important to you in a future career?",
                    "type": "single",
                    "options": [
                        "High earning potential",
                        "Helping others and making a difference",
                        "Being creative and expressing yourself",
                        "Job security and stability",
                        "Learning new things and growing"
                    ]
                },
                {
                    "title": "Extracurricular Activities",
                    "question": "What activities do you enjoy outside of academics?",
                    "type": "multiple",
                    "options": [
                        "Sports and physical activities",
                        "Art, music, or creative pursuits",
                        "Debate or public speaking",
                        "Volunteering or community service",
                        "Building or fixing things",
                        "Reading books or writing",
                        "Playing video games",
                        "Cooking or baking",
                        "Learning new languages",
                        "Organizing events or activities"
                    ]
                }
            ],
            "senior": [
                {
                    "title": "Current Stream",
                    "question": "What is your current academic stream?",
                    "type": "single",
                    "options": [
                        "Science (PCM/PCB)",
                        "Commerce",
                        "Humanities/Arts"
                    ]
                },
                {
                    "title": "Domain Passion",
                    "question": "Which field excites you the most for your future career?",
                    "type": "single",
                    "options": [
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
                    "title": "Advanced Skills",
                    "question": "Which skills would you like to develop further?",
                    "type": "multiple",
                    "options": [
                        "Programming and coding",
                        "Data analysis and statistics",
                        "Leadership and management",
                        "Creative design and innovation",
                        "Research and critical thinking",
                        "Communication and presentation",
                        "Problem-solving and logic",
                        "Financial analysis",
                        "Digital marketing",
                        "Project management"
                    ]
                },
                {
                    "title": "Career Goals",
                    "question": "What type of impact do you want to make in your career?",
                    "type": "single",
                    "options": [
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
                    "title": "Work Preferences",
                    "question": "How do you prefer to work in a professional setting?",
                    "type": "single",
                    "options": [
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
                },
                {
                    "title": "Future Challenges",
                    "question": "What challenges are you most excited to tackle?",
                    "type": "multiple",
                    "options": [
                        "Complex technical problems",
                        "Social and humanitarian issues",
                        "Business and market challenges",
                        "Creative and design problems",
                        "Research and discovery",
                        "Leadership and team building",
                        "Environmental sustainability",
                        "Communication and media",
                        "Education and training",
                        "Innovation and entrepreneurship"
                    ]
                }
            ],
            "graduation": [
                {
                    "title": "Degree Background",
                    "question": "What is your educational background?",
                    "type": "single",
                    "options": [
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
                    "title": "Specialization Area",
                    "question": "What is your area of specialization or major?",
                    "type": "single",
                    "options": [
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
                    "title": "Experience Level",
                    "question": "What is your current professional experience level?",
                    "type": "single",
                    "options": [
                        "Fresh Graduate (0-1 years)",
                        "Early Career (1-3 years)",
                        "Mid-Level (3-7 years)",
                        "Senior Level (7+ years)",
                        "Currently pursuing higher studies",
                        "Career transition phase"
                    ]
                },
                {
                    "title": "Career Aspirations",
                    "question": "What type of career path interests you most?",
                    "type": "multiple",
                    "options": [
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
                    "title": "Current Skills",
                    "question": "Which skills do you currently possess?",
                    "type": "multiple",
                    "options": [
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
                },
                {
                    "title": "Skill Development Goals",
                    "question": "What skills would you like to develop or improve?",
                    "type": "multiple",
                    "options": [
                        "Advanced technical skills",
                        "Leadership and management",
                        "Business and financial acumen",
                        "Communication and presentation",
                        "Digital and technology skills",
                        "Industry-specific knowledge",
                        "Soft skills and emotional intelligence",
                        "Project management methodologies",
                        "Research and analytical skills",
                        "Entrepreneurial skills"
                    ]
                }
            ],
            "professional": [
                {
                    "title": "Current Profession",
                    "question": "What is your current profession?",
                    "type": "single",
                    "options": [
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
                    "title": "Industry Experience",
                    "question": "How many years of experience do you have in your current field?",
                    "type": "single",
                    "options": [
                        "0-2 years",
                        "3-5 years",
                        "6-10 years",
                        "11-15 years",
                        "16-20 years",
                        "20+ years"
                    ]
                },
                {
                    "title": "Career Advancement Goals",
                    "question": "What are your primary career goals?",
                    "type": "multiple",
                    "options": [
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
                    "title": "Skill Gap Analysis",
                    "question": "What skills do you feel you need to develop?",
                    "type": "multiple",
                    "options": [
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
                    "title": "Learning Preferences",
                    "question": "How do you prefer to learn new skills?",
                    "type": "single",
                    "options": [
                        "Online courses and tutorials",
                        "Formal education and certifications",
                        "On-the-job training and mentoring",
                        "Reading books and research papers",
                        "Attending workshops and conferences",
                        "Learning through projects and practice",
                        "Peer learning and collaboration"
                    ]
                },
                {
                    "title": "Industry Trends",
                    "question": "Which industry trends are you most interested in?",
                    "type": "multiple",
                    "options": [
                        "Artificial Intelligence and Machine Learning",
                        "Digital transformation",
                        "Remote and hybrid work",
                        "Sustainability and ESG",
                        "Cybersecurity",
                        "Cloud computing",
                        "Data analytics and business intelligence",
                        "Automation and robotics",
                        "Blockchain and cryptocurrency",
                        "Healthcare technology"
                    ]
                }
            ]
        }

    def get_default_career_data(self):
        """Default career data if JSON file is not found"""
        return {
            "streams": {
                "Science": {
                    "description": "Focus on Physics, Chemistry, Biology, and Mathematics. Perfect for students interested in research, medicine, engineering, or technology.",
                    "careers": ["Doctor", "Engineer", "Scientist", "Researcher", "Data Analyst", "Software Developer"],
                    "subjects": ["Physics", "Chemistry", "Biology", "Mathematics", "Computer Science"],
                    "skill_roadmap": {
                        "foundational": ["Mathematics", "Scientific Method", "Critical Thinking"],
                        "intermediate": ["Research Skills", "Data Analysis", "Problem Solving"],
                        "advanced": ["Specialized Knowledge", "Innovation", "Leadership"]
                    }
                },
                "Commerce": {
                    "description": "Focus on Business Studies, Economics, Accountancy, and Mathematics. Ideal for students interested in business, finance, or entrepreneurship.",
                    "careers": ["Business Analyst", "Accountant", "Banker", "Entrepreneur", "Financial Advisor", "Marketing Manager"],
                    "subjects": ["Business Studies", "Economics", "Accountancy", "Mathematics", "English"],
                    "skill_roadmap": {
                        "foundational": ["Basic Mathematics", "Communication", "Logical Thinking"],
                        "intermediate": ["Financial Literacy", "Business Analysis", "Market Research"],
                        "advanced": ["Strategic Planning", "Leadership", "Innovation"]
                    }
                },
                "Humanities": {
                    "description": "Focus on History, Geography, Political Science, Psychology, and Literature. Great for students interested in social sciences, arts, or public service.",
                    "careers": ["Journalist", "Lawyer", "Teacher", "Social Worker", "Psychologist", "Public Administrator"],
                    "subjects": ["History", "Geography", "Political Science", "Psychology", "Literature"],
                    "skill_roadmap": {
                        "foundational": ["Reading Comprehension", "Writing Skills", "Cultural Awareness"],
                        "intermediate": ["Research Methods", "Critical Analysis", "Communication"],
                        "advanced": ["Policy Analysis", "Leadership", "Social Impact"]
                    }
                }
            },
            "skills": {
                "soft_skills": [
                    {
                        "name": "Emotional Resilience",
                        "description": "The ability to handle stress and bounce back from setbacks",
                        "tip": "Keep a journal to track your feelings and progress. Practice mindfulness or meditation for 10 minutes daily.",
                        "icon": "fas fa-heart",
                        "development_stages": {
                            "beginner": "Practice self-awareness and basic stress management",
                            "intermediate": "Develop coping strategies and emotional regulation",
                            "advanced": "Mentor others and build resilience in teams"
                        }
                    },
                    {
                        "name": "Communication & Public Speaking",
                        "description": "Express your ideas clearly and confidently in front of others",
                        "tip": "Join a debate club, give presentations in class, or start a YouTube channel about topics you love.",
                        "icon": "fas fa-microphone",
                        "development_stages": {
                            "beginner": "Practice speaking in small groups",
                            "intermediate": "Deliver presentations and participate in debates",
                            "advanced": "Train others and speak at conferences"
                        }
                    },
                    {
                        "name": "Teamwork & Leadership",
                        "description": "Work effectively with others and take initiative when needed",
                        "tip": "Participate in group projects, organize a small school event, or volunteer for community service.",
                        "icon": "fas fa-users",
                        "development_stages": {
                            "beginner": "Participate actively in group activities",
                            "intermediate": "Lead small projects and mentor peers",
                            "advanced": "Manage teams and drive organizational change"
                        }
                    },
                    {
                        "name": "Time Management",
                        "description": "Organize your time effectively to balance studies and personal interests",
                        "tip": "Use a planner or app to organize your study schedule. Set specific goals for each day.",
                        "icon": "fas fa-clock",
                        "development_stages": {
                            "beginner": "Create daily schedules and prioritize tasks",
                            "intermediate": "Balance multiple projects and deadlines",
                            "advanced": "Optimize team productivity and resource allocation"
                        }
                    }
                ],
                "hard_skills": [
                    {
                        "name": "Foundational Coding",
                        "description": "Basic programming skills that are valuable in almost every field",
                        "tip": "Start with block-based coding like Scratch, then try introductory Python lessons. Make it fun by creating games or solving puzzles.",
                        "icon": "fas fa-code",
                        "development_stages": {
                            "beginner": "Learn basic syntax and simple programs",
                            "intermediate": "Build projects and solve algorithmic problems",
                            "advanced": "Develop complex applications and mentor others"
                        }
                    },
                    {
                        "name": "Digital Arts",
                        "description": "Creative skills using digital tools and software",
                        "tip": "Explore free tools like Canva for design, GIMP for image editing, or Blender for 3D modeling if you like art.",
                        "icon": "fas fa-palette",
                        "development_stages": {
                            "beginner": "Learn basic design principles and tools",
                            "intermediate": "Create professional-quality designs and artwork",
                            "advanced": "Develop unique styles and teach others"
                        }
                    },
                    {
                        "name": "Financial Literacy",
                        "description": "Understanding money management and basic economics",
                        "tip": "Start with a piggy bank or simple budget. Learn about savings, investments, and how money works in the real world.",
                        "icon": "fas fa-coins",
                        "development_stages": {
                            "beginner": "Understand basic budgeting and saving",
                            "intermediate": "Learn about investments and financial planning",
                            "advanced": "Manage complex portfolios and advise others"
                        }
                    },
                    {
                        "name": "Practical Knowledge",
                        "description": "Hands-on skills for building and fixing things",
                        "tip": "Try simple DIY projects like building a small circuit, making a birdhouse, or learning basic home repairs.",
                        "icon": "fas fa-tools",
                        "development_stages": {
                            "beginner": "Complete simple DIY projects",
                            "intermediate": "Troubleshoot and repair common issues",
                            "advanced": "Design and build complex systems"
                        }
                    }
                ]
            }
        }
    
    def analyze_junior_answers(self, answers):
        """Analyze answers for 9th/10th grade students"""
        scores = {"Science": 0, "Commerce": 0, "Humanities": 0}
        
        # Enhanced scoring based on branch-specific questions
        for question_idx, answer_array in answers.items():
            for answer in answer_array:
                # Academic Strengths (Question 0)
                if question_idx == "0":
                    if any(subject in answer for subject in ["Mathematics", "Science", "Computer Science"]):
                        scores["Science"] += 3
                    if any(subject in answer for subject in ["Economics", "Business"]):
                        scores["Commerce"] += 3
                    if any(subject in answer for subject in ["History", "Geography", "Literature", "Art"]):
                        scores["Humanities"] += 3
                
                # Learning Style (Question 1)
                elif question_idx == "1":
                    if "hands-on experiments" in answer or "problem-solving" in answer:
                        scores["Science"] += 2
                    if "group discussions" in answer or "collaboration" in answer:
                        scores["Humanities"] += 2
                
                # Future Interests (Question 2)
                elif question_idx == "2":
                    if "Laboratory" in answer or "research facility" in answer:
                        scores["Science"] += 2
                    if "Office" in answer:
                        scores["Commerce"] += 2
                    if "Creative studio" in answer:
                        scores["Humanities"] += 2
                
                # Problem Solving (Question 3)
                elif question_idx == "3":
                    if "logical solutions" in answer:
                        scores["Science"] += 2
                    if "brainstorm ideas" in answer:
                        scores["Humanities"] += 2
                
                # Career Values (Question 4)
                elif question_idx == "4":
                    if "High earning potential" in answer:
                        scores["Commerce"] += 2
                    if "Helping others" in answer:
                        scores["Humanities"] += 2
                    if "Learning new things" in answer:
                        scores["Science"] += 2
                
                # Extracurricular Activities (Question 5)
                elif question_idx == "5":
                    if any(activity in answer for activity in ["Building", "fixing things"]):
                        scores["Science"] += 1
                    if any(activity in answer for activity in ["Art", "music", "creative"]):
                        scores["Humanities"] += 1
                    if any(activity in answer for activity in ["Debate", "public speaking"]):
                        scores["Humanities"] += 1
                    if any(activity in answer for activity in ["Volunteering", "community service"]):
                        scores["Humanities"] += 1
        
        # Get top 3 streams
        sorted_streams = sorted(scores.items(), key=lambda x: x[1], reverse=True)[:3]
        
        return {
            "streams": [stream[0] for stream in sorted_streams],
            "scores": dict(sorted_streams),
            "analysis_type": "junior"
        }
    
    def analyze_senior_answers(self, answers):
        """Analyze answers for 11th/12th grade students"""
        stream = answers.get("0", ["Science (PCM/PCB)"])[0] if "0" in answers else "Science (PCM/PCB)"
        domain = answers.get("1", ["Technology & Programming"])[0] if "1" in answers else "Technology & Programming"
        advanced_skills = answers.get("2", []) if "2" in answers else []
        career_goal = answers.get("3", ["Solve complex technical problems"])[0] if "3" in answers else "Solve complex technical problems"
        work_style = answers.get("4", ["Independently with deep focus"])[0] if "4" in answers else "Independently with deep focus"
        future_challenges = answers.get("5", []) if "5" in answers else []
        
        return {
            "stream": stream,
            "domain": domain,
            "advanced_skills": advanced_skills,
            "career_goal": career_goal,
            "work_style": work_style,
            "future_challenges": future_challenges,
            "analysis_type": "senior"
        }
    
    def analyze_graduation_answers(self, answers):
        """Analyze answers for graduation level students"""
        degree_background = answers.get("0", ["Engineering (Computer Science/IT)"])[0] if "0" in answers else "Engineering (Computer Science/IT)"
        specialization = answers.get("1", ["Software Development & Programming"])[0] if "1" in answers else "Software Development & Programming"
        experience = answers.get("2", ["Fresh Graduate (0-1 years)"])[0] if "2" in answers else "Fresh Graduate (0-1 years)"
        career_aspirations = answers.get("3", []) if "3" in answers else []
        current_skills = answers.get("4", []) if "4" in answers else []
        skill_development_goals = answers.get("5", []) if "5" in answers else []
        
        return {
            "degree_background": degree_background,
            "specialization": specialization,
            "experience": experience,
            "career_aspirations": career_aspirations,
            "current_skills": current_skills,
            "skill_development_goals": skill_development_goals,
            "analysis_type": "graduation"
        }
    
    def analyze_professional_answers(self, answers):
        """Analyze answers for professional level"""
        profession = answers.get("0", ["Software Engineer/Developer"])[0] if "0" in answers else "Software Engineer/Developer"
        experience = answers.get("1", ["3-5 years"])[0] if "1" in answers else "3-5 years"
        career_advancement_goals = answers.get("2", []) if "2" in answers else []
        skill_gaps = answers.get("3", []) if "3" in answers else []
        learning_preference = answers.get("4", ["Online courses and tutorials"])[0] if "4" in answers else "Online courses and tutorials"
        industry_trends = answers.get("5", []) if "5" in answers else []
        
        return {
            "profession": profession,
            "experience": experience,
            "career_advancement_goals": career_advancement_goals,
            "skill_gaps": skill_gaps,
            "learning_preference": learning_preference,
            "industry_trends": industry_trends,
            "analysis_type": "professional"
        }
    
    def generate_roadmap(self, analysis_result):
        """Generate detailed roadmap based on analysis"""
        roadmap = {
            "timeline": "12-month development plan",
            "phases": [],
            "milestones": [],
            "resources": [],
            "success_metrics": []
        }
        
        if analysis_result["analysis_type"] == "junior":
            roadmap = self.generate_junior_roadmap(analysis_result)
        elif analysis_result["analysis_type"] == "senior":
            roadmap = self.generate_senior_roadmap(analysis_result)
        elif analysis_result["analysis_type"] == "graduation":
            roadmap = self.generate_graduation_roadmap(analysis_result)
        elif analysis_result["analysis_type"] == "professional":
            roadmap = self.generate_professional_roadmap(analysis_result)
        
        return roadmap
    
    def generate_junior_roadmap(self, analysis):
        """Generate roadmap for junior students"""
        roadmap = {
            "timeline": "12-month foundation building plan",
            "phases": [
                {
                    "phase": "Foundation Building (Months 1-4)",
                    "focus": "Core subject mastery and skill discovery",
                    "activities": [
                        "Strengthen weak subjects through targeted study",
                        "Explore extracurricular activities aligned with interests",
                        "Develop basic digital literacy skills",
                        "Start a personal project related to interests"
                    ]
                },
                {
                    "phase": "Skill Development (Months 5-8)",
                    "focus": "Practical skill building and exploration",
                    "activities": [
                        "Take online courses in areas of interest",
                        "Join clubs or societies related to career interests",
                        "Volunteer in fields of interest",
                        "Build a portfolio of projects"
                    ]
                },
                {
                    "phase": "Stream Preparation (Months 9-12)",
                    "focus": "Preparation for stream selection",
                    "activities": [
                        "Research career paths in chosen streams",
                        "Shadow professionals in fields of interest",
                        "Prepare for stream-specific entrance exams",
                        "Develop study habits for chosen stream"
                    ]
                }
            ],
            "milestones": [
                "Complete foundation skill assessment",
                "Finish first personal project",
                "Complete 3 online courses",
                "Finalize stream choice with confidence"
            ],
            "resources": [
                "Khan Academy for academic subjects",
                "Coursera/edX for skill development",
                "Local libraries for research materials",
                "School career counseling services"
            ],
            "success_metrics": [
                "Improved grades in core subjects",
                "Completed personal projects",
                "Clear understanding of career interests",
                "Confident stream selection"
            ]
        }
        return roadmap
    
    def generate_senior_roadmap(self, analysis):
        """Generate roadmap for senior students"""
        roadmap = {
            "timeline": "18-month advanced preparation plan",
            "phases": [
                {
                    "phase": "Academic Excellence (Months 1-6)",
                    "focus": "Achieve academic excellence in chosen stream",
                    "activities": [
                        "Master core subjects with advanced concepts",
                        "Prepare for competitive exams",
                        "Develop research and analytical skills",
                        "Build strong foundation for higher education"
                    ]
                },
                {
                    "phase": "Career Exploration (Months 7-12)",
                    "focus": "Deep dive into career options and requirements",
                    "activities": [
                        "Research universities and courses",
                        "Connect with professionals in target fields",
                        "Participate in internships or shadowing",
                        "Develop specialized skills in chosen domain"
                    ]
                },
                {
                    "phase": "Future Preparation (Months 13-18)",
                    "focus": "Prepare for next educational phase",
                    "activities": [
                        "Apply to universities and programs",
                        "Develop leadership and communication skills",
                        "Build a professional network",
                        "Create a comprehensive career plan"
                    ]
                }
            ],
            "milestones": [
                "Achieve target academic scores",
                "Complete career research project",
                "Secure university admission",
                "Develop professional network"
            ],
            "resources": [
                "University websites and admission guides",
                "Professional networking platforms (LinkedIn)",
                "Industry-specific online courses",
                "Mentorship programs"
            ],
            "success_metrics": [
                "Strong academic performance",
                "Clear career direction",
                "University admission secured",
                "Professional network established"
            ]
        }
        return roadmap
    
    def generate_graduation_roadmap(self, analysis):
        """Generate roadmap for graduation level students"""
        roadmap = {
            "timeline": "24-month professional development plan",
            "phases": [
                {
                    "phase": "Skill Enhancement (Months 1-8)",
                    "focus": "Develop industry-relevant skills",
                    "activities": [
                        "Complete professional certifications",
                        "Build portfolio of practical projects",
                        "Develop technical and soft skills",
                        "Gain hands-on experience through internships"
                    ]
                },
                {
                    "phase": "Career Launch (Months 9-16)",
                    "focus": "Enter professional workforce",
                    "activities": [
                        "Apply for entry-level positions",
                        "Develop professional brand and resume",
                        "Build industry connections",
                        "Start professional career journey"
                    ]
                },
                {
                    "phase": "Career Growth (Months 17-24)",
                    "focus": "Establish and grow in career",
                    "activities": [
                        "Excel in first professional role",
                        "Seek mentorship and guidance",
                        "Plan for career advancement",
                        "Develop leadership capabilities"
                    ]
                }
            ],
            "milestones": [
                "Complete professional certifications",
                "Secure first job offer",
                "Complete first year in role",
                "Develop career advancement plan"
            ],
            "resources": [
                "Professional certification programs",
                "Job search platforms and career services",
                "Industry conferences and networking events",
                "Professional development courses"
            ],
            "success_metrics": [
                "Industry certifications obtained",
                "Job offer secured",
                "Successful first year performance",
                "Clear advancement pathway"
            ]
        }
        return roadmap
    
    def generate_professional_roadmap(self, analysis):
        """Generate roadmap for professionals"""
        roadmap = {
            "timeline": "36-month career advancement plan",
            "phases": [
                {
                    "phase": "Skill Gap Analysis (Months 1-6)",
                    "focus": "Identify and address skill gaps",
                    "activities": [
                        "Complete comprehensive skill assessment",
                        "Identify critical skill gaps",
                        "Develop learning plan for gaps",
                        "Start targeted skill development"
                    ]
                },
                {
                    "phase": "Professional Development (Months 7-18)",
                    "focus": "Advanced skill development and specialization",
                    "activities": [
                        "Complete advanced certifications",
                        "Develop expertise in specialized areas",
                        "Build thought leadership",
                        "Expand professional network"
                    ]
                },
                {
                    "phase": "Career Advancement (Months 19-36)",
                    "focus": "Achieve career goals and leadership",
                    "activities": [
                        "Pursue leadership opportunities",
                        "Mentor junior professionals",
                        "Drive innovation and change",
                        "Achieve target career position"
                    ]
                }
            ],
            "milestones": [
                "Complete skill gap analysis",
                "Achieve advanced certifications",
                "Secure leadership role",
                "Achieve career advancement goals"
            ],
            "resources": [
                "Executive education programs",
                "Professional coaching services",
                "Industry leadership programs",
                "Advanced certification bodies"
            ],
            "success_metrics": [
                "Skill gaps addressed",
                "Advanced certifications obtained",
                "Leadership role achieved",
                "Career goals accomplished"
            ]
        }
        return roadmap
    
    def generate_pdf_report(self, analysis_result, roadmap, analysis_type):
        """Generate PDF report for the analysis"""
        buffer = io.BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=A4, rightMargin=72, leftMargin=72, topMargin=72, bottomMargin=18)
        
        # Get styles
        styles = getSampleStyleSheet()
        title_style = ParagraphStyle(
            'CustomTitle',
            parent=styles['Heading1'],
            fontSize=24,
            spaceAfter=30,
            alignment=TA_CENTER,
            textColor=colors.HexColor('#667eea')
        )
        
        heading_style = ParagraphStyle(
            'CustomHeading',
            parent=styles['Heading2'],
            fontSize=16,
            spaceAfter=12,
            textColor=colors.HexColor('#4a5568')
        )
        
        subheading_style = ParagraphStyle(
            'CustomSubHeading',
            parent=styles['Heading3'],
            fontSize=14,
            spaceAfter=8,
            textColor=colors.HexColor('#667eea')
        )
        
        normal_style = styles['Normal']
        
        # Build the story
        story = []
        
        # Title
        title_text = f"Career Analysis Report - {analysis_type.title()}"
        story.append(Paragraph(title_text, title_style))
        story.append(Spacer(1, 20))
        
        # Analysis Summary
        story.append(Paragraph("Analysis Summary", heading_style))
        story.append(Spacer(1, 12))
        
        if analysis_type == "junior":
            story.append(Paragraph(f"Recommended Streams: {', '.join(analysis_result['streams'])}", normal_style))
            story.append(Paragraph(f"Analysis Type: Junior Level (9th & 10th Grade)", normal_style))
        elif analysis_type == "senior":
            story.append(Paragraph(f"Stream: {analysis_result['stream']}", normal_style))
            story.append(Paragraph(f"Domain Interest: {analysis_result['domain']}", normal_style))
            story.append(Paragraph(f"Career Goal: {analysis_result['career_goal']}", normal_style))
        elif analysis_type == "graduation":
            story.append(Paragraph(f"Degree Background: {analysis_result['degree_background']}", normal_style))
            story.append(Paragraph(f"Specialization: {analysis_result['specialization']}", normal_style))
            story.append(Paragraph(f"Experience Level: {analysis_result['experience']}", normal_style))
        elif analysis_type == "professional":
            story.append(Paragraph(f"Current Profession: {analysis_result['profession']}", normal_style))
            story.append(Paragraph(f"Experience Level: {analysis_result['experience']}", normal_style))
            story.append(Paragraph(f"Learning Preference: {analysis_result['learning_preference']}", normal_style))
        
        story.append(Spacer(1, 20))
        
        # Roadmap Section
        story.append(Paragraph("Personalized Development Roadmap", heading_style))
        story.append(Spacer(1, 12))
        
        story.append(Paragraph(f"Timeline: {roadmap['timeline']}", subheading_style))
        story.append(Spacer(1, 8))
        
        # Phases
        story.append(Paragraph("Development Phases", subheading_style))
        for i, phase in enumerate(roadmap['phases'], 1):
            story.append(Paragraph(f"{i}. {phase['phase']}", normal_style))
            story.append(Paragraph(f"   Focus: {phase['focus']}", normal_style))
            story.append(Paragraph("   Activities:", normal_style))
            for activity in phase['activities']:
                story.append(Paragraph(f"   • {activity}", normal_style))
            story.append(Spacer(1, 8))
        
        # Milestones
        story.append(Paragraph("Key Milestones", subheading_style))
        for milestone in roadmap['milestones']:
            story.append(Paragraph(f"• {milestone}", normal_style))
        story.append(Spacer(1, 8))
        
        # Resources
        story.append(Paragraph("Recommended Resources", subheading_style))
        for resource in roadmap['resources']:
            story.append(Paragraph(f"• {resource}", normal_style))
        story.append(Spacer(1, 8))
        
        # Success Metrics
        story.append(Paragraph("Success Metrics", subheading_style))
        for metric in roadmap['success_metrics']:
            story.append(Paragraph(f"• {metric}", normal_style))
        
        story.append(Spacer(1, 20))
        
        # Footer
        story.append(Paragraph(f"Generated on: {datetime.now().strftime('%B %d, %Y at %I:%M %p')}", normal_style))
        story.append(Paragraph("Career Skills Advisor - Personalized Career Guidance", normal_style))
        
        # Build PDF
        doc.build(story)
        buffer.seek(0)
        return buffer
    
    def generate_roadmap_pdf(self, roadmap, analysis_type):
        """Generate PDF specifically for roadmap"""
        buffer = io.BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=A4, rightMargin=72, leftMargin=72, topMargin=72, bottomMargin=18)
        
        # Get styles
        styles = getSampleStyleSheet()
        title_style = ParagraphStyle(
            'CustomTitle',
            parent=styles['Heading1'],
            fontSize=24,
            spaceAfter=30,
            alignment=TA_CENTER,
            textColor=colors.HexColor('#667eea')
        )
        
        heading_style = ParagraphStyle(
            'CustomHeading',
            parent=styles['Heading2'],
            fontSize=16,
            spaceAfter=12,
            textColor=colors.HexColor('#4a5568')
        )
        
        subheading_style = ParagraphStyle(
            'CustomSubHeading',
            parent=styles['Heading3'],
            fontSize=14,
            spaceAfter=8,
            textColor=colors.HexColor('#667eea')
        )
        
        normal_style = styles['Normal']
        
        # Build the story
        story = []
        
        # Title
        title_text = f"Career Development Roadmap - {analysis_type.title()}"
        story.append(Paragraph(title_text, title_style))
        story.append(Spacer(1, 20))
        
        # Timeline
        story.append(Paragraph(f"📅 {roadmap['timeline']}", heading_style))
        story.append(Spacer(1, 20))
        
        # Phases
        story.append(Paragraph("🎯 Development Phases", heading_style))
        story.append(Spacer(1, 12))
        
        for i, phase in enumerate(roadmap['phases'], 1):
            story.append(Paragraph(f"{i}. {phase['phase']}", subheading_style))
            story.append(Paragraph(f"Focus: {phase['focus']}", normal_style))
            story.append(Paragraph("Activities:", normal_style))
            for activity in phase['activities']:
                story.append(Paragraph(f"• {activity}", normal_style))
            story.append(Spacer(1, 12))
        
        # Milestones
        story.append(Paragraph("🏆 Key Milestones", heading_style))
        story.append(Spacer(1, 8))
        for milestone in roadmap['milestones']:
            story.append(Paragraph(f"• {milestone}", normal_style))
        story.append(Spacer(1, 12))
        
        # Resources
        story.append(Paragraph("📚 Recommended Resources", heading_style))
        story.append(Spacer(1, 8))
        for resource in roadmap['resources']:
            story.append(Paragraph(f"• {resource}", normal_style))
        story.append(Spacer(1, 12))
        
        # Success Metrics
        story.append(Paragraph("📊 Success Metrics", heading_style))
        story.append(Spacer(1, 8))
        for metric in roadmap['success_metrics']:
            story.append(Paragraph(f"• {metric}", normal_style))
        
        story.append(Spacer(1, 20))
        
        # Footer
        story.append(Paragraph(f"Generated on: {datetime.now().strftime('%B %d, %Y at %I:%M %p')}", normal_style))
        story.append(Paragraph("Career Skills Advisor - Your Path to Success", normal_style))
        
        # Build PDF
        doc.build(story)
        buffer.seek(0)
        return buffer

# Initialize the analysis engine
analysis_engine = CareerAnalysisEngine()

@app.route('/')
def serve_index():
    """Serve the main HTML file"""
    return send_from_directory('.', 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    """Serve static files"""
    return send_from_directory('.', filename)

@app.route('/api/analyze', methods=['POST'])
def analyze_career():
    """Analyze career based on user answers"""
    try:
        data = request.get_json()
        analysis_type = data.get('analysis_type')
        answers = data.get('answers', {})
        
        if analysis_type == 'junior':
            result = analysis_engine.analyze_junior_answers(answers)
        elif analysis_type == 'senior':
            result = analysis_engine.analyze_senior_answers(answers)
        elif analysis_type == 'graduation':
            result = analysis_engine.analyze_graduation_answers(answers)
        elif analysis_type == 'professional':
            result = analysis_engine.analyze_professional_answers(answers)
        else:
            return jsonify({'error': 'Invalid analysis type'}), 400
        
        # Generate roadmap
        roadmap = analysis_engine.generate_roadmap(result)
        
        # Get career data for the analysis
        career_data = analysis_engine.career_data
        
        response = {
            'analysis': result,
            'roadmap': roadmap,
            'career_data': career_data,
            'timestamp': datetime.now().isoformat(),
            'session_id': str(uuid.uuid4())
        }
        
        return jsonify(response)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/roadmap/<analysis_type>', methods=['POST'])
def generate_roadmap(analysis_type):
    """Generate detailed roadmap for specific analysis type"""
    try:
        data = request.get_json()
        answers = data.get('answers', {})
        
        if analysis_type == 'junior':
            analysis = analysis_engine.analyze_junior_answers(answers)
        elif analysis_type == 'senior':
            analysis = analysis_engine.analyze_senior_answers(answers)
        elif analysis_type == 'graduation':
            analysis = analysis_engine.analyze_graduation_answers(answers)
        elif analysis_type == 'professional':
            analysis = analysis_engine.analyze_professional_answers(answers)
        else:
            return jsonify({'error': 'Invalid analysis type'}), 400
        
        roadmap = analysis_engine.generate_roadmap(analysis)
        
        return jsonify({
            'roadmap': roadmap,
            'analysis': analysis,
            'timestamp': datetime.now().isoformat()
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/career-data', methods=['GET'])
def get_career_data():
    """Get comprehensive career data"""
    try:
        return jsonify(analysis_engine.career_data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/questions/<analysis_type>', methods=['GET'])
def get_branch_questions(analysis_type):
    """Get branch-specific questions for analysis type"""
    try:
        questions = analysis_engine.get_branch_specific_questions()
        if analysis_type in questions:
            return jsonify({
                'questions': questions[analysis_type],
                'analysis_type': analysis_type,
                'total_questions': len(questions[analysis_type])
            })
        else:
            return jsonify({'error': 'Invalid analysis type'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/download-report/<analysis_type>', methods=['POST'])
def download_report_pdf(analysis_type):
    """Download PDF report for analysis"""
    try:
        data = request.get_json()
        answers = data.get('answers', {})
        
        # Perform analysis
        if analysis_type == 'junior':
            analysis = analysis_engine.analyze_junior_answers(answers)
        elif analysis_type == 'senior':
            analysis = analysis_engine.analyze_senior_answers(answers)
        elif analysis_type == 'graduation':
            analysis = analysis_engine.analyze_graduation_answers(answers)
        elif analysis_type == 'professional':
            analysis = analysis_engine.analyze_professional_answers(answers)
        else:
            return jsonify({'error': 'Invalid analysis type'}), 400
        
        # Generate roadmap
        roadmap = analysis_engine.generate_roadmap(analysis)
        
        # Generate PDF
        pdf_buffer = analysis_engine.generate_pdf_report(analysis, roadmap, analysis_type)
        
        # Return PDF file
        filename = f'career-analysis-report-{analysis_type}-{datetime.now().strftime("%Y%m%d-%H%M%S")}.pdf'
        return send_file(
            pdf_buffer,
            as_attachment=True,
            download_name=filename,
            mimetype='application/pdf'
        )
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/download-roadmap/<analysis_type>', methods=['POST'])
def download_roadmap_pdf(analysis_type):
    """Download PDF roadmap only"""
    try:
        data = request.get_json()
        answers = data.get('answers', {})
        
        # Perform analysis
        if analysis_type == 'junior':
            analysis = analysis_engine.analyze_junior_answers(answers)
        elif analysis_type == 'senior':
            analysis = analysis_engine.analyze_senior_answers(answers)
        elif analysis_type == 'graduation':
            analysis = analysis_engine.analyze_graduation_answers(answers)
        elif analysis_type == 'professional':
            analysis = analysis_engine.analyze_professional_answers(answers)
        else:
            return jsonify({'error': 'Invalid analysis type'}), 400
        
        # Generate roadmap
        roadmap = analysis_engine.generate_roadmap(analysis)
        
        # Generate PDF
        pdf_buffer = analysis_engine.generate_roadmap_pdf(roadmap, analysis_type)
        
        # Return PDF file
        filename = f'career-roadmap-{analysis_type}-{datetime.now().strftime("%Y%m%d-%H%M%S")}.pdf'
        return send_file(
            pdf_buffer,
            as_attachment=True,
            download_name=filename,
            mimetype='application/pdf'
        )
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'version': '1.0.0'
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('FLASK_ENV') == 'development'
    app.run(debug=debug, host='0.0.0.0', port=port)
