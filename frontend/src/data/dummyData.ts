import { UserProfile, UserPersonality } from '../types';

export const dummyUserProfile: UserProfile = {
  personalInfo: {
    fullName: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    professionalTitle: 'Senior Full Stack Developer',
    summary: 'Passionate full-stack developer with 6+ years of experience building scalable web applications. Expertise in React, Node.js, and cloud technologies. Led multiple cross-functional teams to deliver high-impact products that serve millions of users.',
    profilePicture: 'profile-placeholder.jpg',
    resume: 'alex-johnson-resume.pdf'
  },
  skills: [
    'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'AWS', 
    'Docker', 'PostgreSQL', 'MongoDB', 'GraphQL', 'REST APIs', 
    'Git', 'Agile', 'Team Leadership', 'System Design'
  ],
  experience: [
    {
      id: '1',
      company: 'TechCorp Solutions',
      position: 'Senior Full Stack Developer',
      startDate: '2021-03',
      endDate: '',
      current: true,
      description: 'Lead development of customer-facing web applications serving 2M+ users',
      achievements: [
        'Reduced page load times by 40% through performance optimization',
        'Led a team of 5 developers in migrating legacy systems to modern architecture',
        'Implemented CI/CD pipeline reducing deployment time by 60%'
      ]
    },
    {
      id: '2',
      company: 'StartupXYZ',
      position: 'Full Stack Developer',
      startDate: '2019-06',
      endDate: '2021-02',
      current: false,
      description: 'Built core platform features and APIs for B2B SaaS product',
      achievements: [
        'Developed real-time messaging system handling 10k+ concurrent users',
        'Created automated testing suite increasing code coverage to 95%',
        'Mentored 3 junior developers and established coding standards'
      ]
    },
    {
      id: '3',
      company: 'Digital Agency Pro',
      position: 'Frontend Developer',
      startDate: '2018-01',
      endDate: '2019-05',
      current: false,
      description: 'Developed responsive websites and web applications for various clients',
      achievements: [
        'Delivered 15+ client projects on time and within budget',
        'Improved client satisfaction scores by 25%',
        'Introduced modern development practices and tools'
      ]
    }
  ],
  education: [
    {
      id: '1',
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Computer Science',
      startDate: '2014-09',
      endDate: '2018-05',
      gpa: '3.8',
      achievements: [
        'Magna Cum Laude',
        'Dean\'s List for 6 semesters',
        'President of Computer Science Club'
      ]
    }
  ],
  projects: [
    {
      id: '1',
      name: 'EcoTracker',
      description: 'A mobile-first web application that helps users track their carbon footprint and suggests eco-friendly alternatives',
      technologies: ['React', 'Node.js', 'MongoDB', 'Chart.js', 'PWA'],
      liveUrl: 'https://ecotracker-demo.com',
      githubUrl: 'https://github.com/alexjohnson/ecotracker',
      achievements: [
        '10,000+ active users within first 3 months',
        'Featured in TechCrunch as "App of the Week"',
        'Winner of Green Tech Hackathon 2023'
      ]
    },
    {
      id: '2',
      name: 'TaskFlow Pro',
      description: 'A collaborative project management tool with real-time updates and advanced analytics',
      technologies: ['React', 'TypeScript', 'GraphQL', 'PostgreSQL', 'Redis'],
      liveUrl: 'https://taskflow-pro.com',
      githubUrl: 'https://github.com/alexjohnson/taskflow-pro',
      achievements: [
        'Handles 50,000+ tasks daily across 500+ teams',
        'Reduced project completion time by 30% for beta users',
        'Integrated with 15+ third-party tools'
      ]
    },
    {
      id: '3',
      name: 'AI Code Reviewer',
      description: 'An intelligent code review assistant that provides automated feedback and suggestions',
      technologies: ['Python', 'TensorFlow', 'FastAPI', 'Docker', 'GitHub API'],
      githubUrl: 'https://github.com/alexjohnson/ai-code-reviewer',
      achievements: [
        'Reduced code review time by 45%',
        'Detected 95% of common code issues automatically',
        'Open-sourced with 2,500+ GitHub stars'
      ]
    }
  ],
  socialLinks: {
    linkedin: 'https://linkedin.com/in/alexjohnson-dev',
    github: 'https://github.com/alexjohnson',
    website: 'https://alexjohnson.dev',
    twitter: 'https://twitter.com/alexjohnson_dev'
  },
  interests: [
    'Open Source Contribution', 'Machine Learning', 'Sustainable Technology',
    'Rock Climbing', 'Photography', 'Cooking', 'Travel', 'Mentoring'
  ],
  selectedTemplate: 'modern-minimalist',
  customizations: {
    colorPalette: 'navy-blue',
    fontSize: 'medium',
    layout: 'standard',
    accentColor: '#2196f3'
  }
};

export const dummyUserPersonality: UserPersonality = {
  answers: [
    {
      questionId: 'professional-drive',
      answer: 'I am driven by the opportunity to solve complex technical challenges while making a meaningful impact on users\' lives. The intersection of innovation and practical problem-solving energizes me most.',
      category: 'Professional Identity'
    },
    {
      questionId: 'leadership-style',
      answer: 'I believe in collaborative leadership where I guide the technical direction while empowering team members to contribute their expertise. I focus on creating an environment where everyone can do their best work.',
      category: 'Professional Identity'
    },
    {
      questionId: 'work-environment',
      answer: 'I thrive in dynamic environments that balance structure with flexibility. I prefer teams that value both innovation and execution, where we can move fast while maintaining high quality standards.',
      category: 'Professional Identity'
    },
    {
      questionId: 'problem-solving',
      answer: 'I take a systematic approach, breaking down complex problems into manageable components. I combine analytical thinking with creative solutions, always considering the broader impact and user experience.',
      category: 'Professional Identity'
    },
    {
      questionId: 'deadline-pressure',
      answer: 'I perform well under pressure by prioritizing ruthlessly and communicating early about potential roadblocks. I believe in setting realistic expectations while finding creative ways to deliver maximum value within constraints.',
      category: 'Work Philosophy'
    },
    {
      questionId: 'communication-style',
      answer: 'I prefer clear, direct communication with sufficient context. I believe in documenting decisions and using visual aids when explaining complex technical concepts to diverse audiences.',
      category: 'Work Philosophy'
    },
    {
      questionId: 'industry-trends',
      answer: 'I stay current through a combination of hands-on experimentation, following industry thought leaders, attending conferences, and participating in open-source projects. I believe in learning by doing.',
      category: 'Work Philosophy'
    },
    {
      questionId: 'feedback-approach',
      answer: 'I value honest, constructive feedback and try to provide the same. I believe feedback should be specific, actionable, and delivered with empathy. Regular check-ins work better than formal review cycles.',
      category: 'Work Philosophy'
    },
    {
      questionId: 'career-vision',
      answer: 'I see myself in a technical leadership role where I can influence product direction while mentoring the next generation of developers. I want to build systems that scale and teams that thrive.',
      category: 'Career Goals'
    },
    {
      questionId: 'exciting-projects',
      answer: 'I\'m most excited by projects that push technical boundaries while solving real user problems. I love working on systems that need to scale, especially when they involve emerging technologies like AI or real-time collaboration.',
      category: 'Career Goals'
    },
    {
      questionId: 'success-metrics',
      answer: 'I measure success by the impact my work has on users and the growth of my team members. Technical excellence, user satisfaction, and team development are my key indicators of meaningful achievement.',
      category: 'Career Goals'
    },
    {
      questionId: 'company-culture',
      answer: 'I thrive in cultures that value continuous learning, psychological safety, and technical excellence. I prefer environments where we can take calculated risks and learn from failures quickly.',
      category: 'Career Goals'
    },
    {
      questionId: 'collaboration-preference',
      answer: 'I prefer a mix of focused individual work and collaborative sessions. Regular sync meetings, pair programming for complex problems, and asynchronous communication for updates work best for me.',
      category: 'Collaboration'
    },
    {
      questionId: 'team-role',
      answer: 'I often take on the role of technical lead and mentor, helping to guide architectural decisions while ensuring team members have opportunities to grow and contribute meaningfully.',
      category: 'Collaboration'
    },
    {
      questionId: 'conflict-resolution',
      answer: 'I address conflicts through open dialogue, focusing on understanding different perspectives and finding solutions that align with our shared goals. I believe most conflicts stem from miscommunication or misaligned expectations.',
      category: 'Collaboration'
    },
    {
      questionId: 'extra-motivation',
      answer: 'I\'m motivated to go above and beyond when I see the direct impact of my work on users and when I can help my teammates grow. Challenging technical problems and learning opportunities also drive me to excel.',
      category: 'Collaboration'
    },
    {
      questionId: 'learning-approach',
      answer: 'I learn best through hands-on practice combined with understanding the underlying principles. I like to build small projects to test new concepts and then apply them to real-world scenarios.',
      category: 'Development'
    },
    {
      questionId: 'greatest-strength',
      answer: 'My greatest strength is the ability to bridge technical complexity with business needs, translating between different stakeholders while maintaining high technical standards and team morale.',
      category: 'Development'
    },
    {
      questionId: 'improvement-focus',
      answer: 'I\'m currently focused on improving my system design skills and learning more about AI/ML integration. I also want to get better at strategic planning and cross-functional collaboration.',
      category: 'Development'
    },
    {
      questionId: 'work-life-balance',
      answer: 'I believe in sustainable productivity with clear boundaries. I\'m fully engaged during work hours and protect my personal time for recharging, which ultimately makes me more effective professionally.',
      category: 'Development'
    }
  ],
  profileSummary: 'A collaborative technical leader who thrives on solving complex problems while building and mentoring high-performing teams.',
  workStyle: 'Systematic problem-solver with collaborative leadership approach',
  communicationStyle: 'Clear, direct communication with visual aids and documentation',
  leadershipStyle: 'Collaborative technical leadership focused on team empowerment',
  problemSolvingApproach: 'Analytical breakdown with creative solutions and user focus',
  careerGoals: 'Technical leadership role with product influence and team mentoring',
  values: ['Technical Excellence', 'Team Growth', 'User Impact', 'Continuous Learning', 'Sustainable Productivity']
};