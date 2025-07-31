"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  ExternalLink, 
  Menu, 
  X, 
  Download, 
  Code, 
  Database, 
  Server,
  ChevronUp,
  Moon,
  Sun,
  Filter,
  BarChart3,
  GitBranch,
  Trophy,
  TrendingUp
} from 'lucide-react';



const mockLeetcodeData = [
  { category: 'Easy', solved: 180 },
  { category: 'Medium', solved: 250 },
  { category: 'Hard', solved: 35 }
];

const techStackData = [
  { name: 'React.js', percentage: 75, color: '#61DAFB' },
  { name: 'Node.js', percentage: 78, color: '#339933' },
  { name: 'MongoDB', percentage: 82, color: '#47A248' },
  { name: 'JavaScript', percentage: 90, color: '#F7DF1E' },
  { name: 'Express.js', percentage: 85, color: '#000000' }
];

const projects = [
  {
    id: 1,
    title: "URL Shortener with Analytics",
    description: "A full-stack URL shortening service with comprehensive click analytics, JWT authentication, and URL expiry management.",
    techStack: ["Node.js", "MongoDB", "React", "JWT", "Express"],
    liveDemo: "https://urlshortenerbyutsav.netlify.app",
    github: "#",
    category: "Full Stack"
  },
  {
    id: 2,
    title: "Real-Time Chat App",
    description: "Interactive chat application with real-time communication, multiple chat rooms, and user authentication using Socket.IO.",
    techStack: ["React", "Node.js", "Socket.IO", "MongoDB"],
    liveDemo: "https://xchatappp.netlify.app",
    github: "#",
    category: "Full Stack"
  },
  // {
  //   id: 3,
  //   title: "E-commerce Dashboard",
  //   description: "Admin dashboard for e-commerce management with data visualization, inventory tracking, and sales analytics.",
  //   techStack: ["React", "Chart.js", "Material-UI", "Node.js"],
  //   liveDemo: "#",
  //   github: "#",
  //   category: "Frontend"
  // }
];

const skills = {
  languages: ["JavaScript", "Java", "C++", "Python"],
  frameworks: ["React.js", "Node.js", "Express.js", "Next.js"],
  databases: ["MongoDB", "MySQL", "PostgreSQL"],
  tools: ["Git", "Postman", "VS Code", "Docker"]
};

// Custom Button Component (ShadCN-style)
const Button = ({ children, variant = "default", size = "default", className = "", ...props }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
  
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90 bg-blue-600 hover:bg-blue-700 text-white",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800",
    ghost: "hover:bg-accent hover:text-accent-foreground hover:bg-gray-100 dark:hover:bg-gray-800"
  };
  
  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
    lg: "h-11 px-8 rounded-md"
  };
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Custom Card Component (ShadCN-style)
const CardComponent = ({ children, className = "", darkMode, ...props }) => (
  <div 
    className={`rounded-lg border shadow-sm ${className}`} 
    style={{
      backgroundColor: darkMode ? '#1f2937' : '#ffffff',
      borderColor: darkMode ? '#374151' : '#e5e7eb',
      color: darkMode ? '#ffffff' : '#111827'
    }}
    {...props}
  >
    {children}
  </div>
);

const CardHeader = ({ children, className = "", ...props }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className = "", ...props }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props}>
    {children}
  </h3>
);

const CardContent = ({ children, className = "", ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

// Custom Badge Component
const Badge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    secondary: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

const Portfolio = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Custom Card Component (ShadCN-style) - now inside component to access darkMode
  const Card = ({ children, className = "", ...props }) => (
    <div 
      className={`rounded-lg border shadow-sm ${className}`} 
      style={{
        backgroundColor: darkMode ? '#1f2937' : '#ffffff',
        borderColor: darkMode ? '#374151' : '#e5e7eb',
        color: darkMode ? '#ffffff' : '#111827'
      }}
      {...props}
    >
      {children}
    </div>
  );

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setHeaderVisible(currentScrollY < lastScrollY || currentScrollY < 10);
      setLastScrollY(currentScrollY);
      setShowScrollTop(currentScrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="min-h-screen"
           style={{
             backgroundColor: darkMode ? '#111827' : '#ffffff',
             color: darkMode ? '#ffffff' : '#111827'
           }}>
        
        {/* Header */}
        <motion.header 
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-transform duration-300"
          style={{
            backgroundColor: darkMode ? 'rgba(17, 24, 39, 0.8)' : 'rgba(255, 255, 255, 0.8)',
            borderColor: darkMode ? '#374151' : '#e5e7eb'
          }}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <motion.div 
                className="font-bold text-xl"
                style={{ color: darkMode ? '#60a5fa' : '#2563eb' }}
                whileHover={{ scale: 1.05 }}
              >
                Utsav Jha
              </motion.div>
              
              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-8">
                {['Home', 'Projects', 'Skills', 'Dashboard', 'Contact'].map((item) => (
                  <motion.button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="px-3 py-2 text-sm font-medium transition-colors relative"
                    style={{
                      color: activeSection === item.toLowerCase() 
                        ? (darkMode ? '#60a5fa' : '#2563eb')
                        : (darkMode ? '#d1d5db' : '#374151')
                    }}
                    whileHover={{ y: -2 }}
                  >
                    {item}
                    {activeSection === item.toLowerCase() && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5"
                        style={{ backgroundColor: darkMode ? '#60a5fa' : '#2563eb' }}
                        layoutId="activeTab"
                      />
                    )}
                  </motion.button>
                ))}
              </nav>

              {/* Right side icons */}
              <div className="flex items-center space-x-4">
                <motion.button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-md transition-colors"
                  style={{
                    backgroundColor: darkMode ? '#374151' : '#f3f4f6'
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </motion.button>
                
                <motion.a
                  href="https://github.com/gitsagee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                  whileHover={{ scale: 1.1 }}
                >
                  <Github size={20} />
                </motion.a>
                
                <motion.a
                  href="https://linkedin.com/in/utsav-jha11"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                  whileHover={{ scale: 1.1 }}
                >
                  <Linkedin size={20} />
                </motion.a>

                {/* Mobile menu button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
              >
                <div className="px-4 py-2 space-y-1">
                  {['Home', 'Projects', 'Skills', 'Dashboard', 'Contact'].map((item) => (
                    <button
                      key={item}
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="block w-full text-left px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>

        {/* Hero Section */}
        <section 
          id="home" 
          className="pt-16 min-h-screen flex items-center"
          style={{
            background: darkMode 
              ? 'linear-gradient(to bottom right, #111827, #1f2937)'
              : 'linear-gradient(to bottom right, #eff6ff, #e0e7ff)'
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.h1 
                  className="text-4xl sm:text-6xl font-bold mb-6"
                  style={{ color: darkMode ? '#ffffff' : '#111827' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  Hi, I'm <span style={{ color: darkMode ? '#60a5fa' : '#2563eb' }}>Utsav Jha</span>
                </motion.h1>
                
                <motion.h2 
                  className="text-xl sm:text-2xl text-gray-500 dark:text-gray-400 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  Full Stack Developer | Problem Solver
                </motion.h2>
                
                <motion.p 
                  className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  I build scalable full-stack applications with React, Node.js, and MongoDB. 
                  Passionate about creating efficient solutions and learning new technologies.
                </motion.p>
                
                <motion.div 
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                >
                  <Button 
                    onClick={() => scrollToSection('projects')}
                    size="lg"
                    className="group"
                  >
                    View Projects
                    <motion.div
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      →
                    </motion.div>
                  </Button>
                  
                  <Button variant="outline" size="lg">
                    <Download className="w-4 h-4 mr-2" />
                    Download Resume
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="lg"
                    onClick={() => scrollToSection('contact')}
                  >
                    Contact Me
                  </Button>
                </motion.div>
              </motion.div>
              
              <motion.div
                className="flex justify-center lg:justify-end"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <div className="relative">
                  <motion.div
                    className="w-80 h-80 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center"
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                      scale: { duration: 4, repeat: Infinity }
                    }}
                  >
                    <Code size={120} className="text-white" />
                  </motion.div>
                  
                  {/* Floating elements */}
                  <motion.div
                    className="absolute -top-4 -right-4 bg-yellow-400 rounded-full p-3"
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Server size={24} className="text-gray-800" />
                  </motion.div>
                  
                  <motion.div
                    className="absolute -bottom-4 -left-4 bg-green-400 rounded-full p-3"
                    animate={{ y: [10, -10, 10] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    <Database size={24} className="text-gray-800" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section 
          id="projects" 
          className="py-20"
          style={{ backgroundColor: darkMode ? '#111827' : '#ffffff' }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 
                className="text-3xl sm:text-4xl font-bold mb-4"
                style={{ color: darkMode ? '#ffffff' : '#111827' }}
              >
                Featured Projects
              </h2>
              <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                Here are some of my recent projects that showcase my full-stack development skills
              </p>
            </motion.div>

            {/* Project Filter */}
            <motion.div 
              className="flex justify-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  All Projects Displayed
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <AnimatePresence>
                {projects.map((project) => (
                  <motion.div
                    key={project.id}
                    variants={itemVariants}
                    layout
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="group"
                  >
                    <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                      <CardHeader>
                        <CardTitle className="text-xl">{project.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-500 dark:text-gray-400 mb-4">
                          {project.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.techStack.map((tech) => (
                            <Badge key={tech} variant="secondary">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex gap-3">
                          <Button size="sm" asChild>
                            <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Live Demo
                            </a>
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                              <Github className="w-4 h-4 mr-2" />
                              Code
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Technical Skills
              </h2>
              <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                Technologies and tools I use to build amazing applications
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {Object.entries(skills).map(([category, skillList]) => (
                <motion.div key={category} variants={itemVariants}>
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle className="text-lg capitalize flex items-center">
                        {category === 'languages' && <Code className="w-5 h-5 mr-2 text-blue-600" />}
                        {category === 'frameworks' && <Server className="w-5 h-5 mr-2 text-green-600" />}
                        {category === 'databases' && <Database className="w-5 h-5 mr-2 text-purple-600" />}
                        {category === 'tools' && <BarChart3 className="w-5 h-5 mr-2 text-orange-600" />}
                        {category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {skillList.map((skill) => (
                          <motion.div
                            key={skill}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Badge>{skill}</Badge>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Dashboard Section */}
        <section id="dashboard" className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Developer Dashboard
              </h2>
              <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                Interactive data visualization showcasing my coding activity and achievements
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
              {/* LeetCode Progress */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mx-auto max-w-2xl"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-center">
                      <Trophy className="w-5 h-5 mr-2 text-yellow-600" />
                      LeetCode Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-8">
                      <motion.div
                        className="text-6xl font-bold text-blue-600 dark:text-blue-400"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                      >
                        400+
                      </motion.div>
                      <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">Problems Solved</p>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-6">
                      {mockLeetcodeData.map((data, index) => (
                        <motion.div
                          key={data.category}
                          className="text-center"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                          <motion.div 
                            className="text-3xl font-bold mb-2"
                            style={{
                              color: data.category === 'Easy' ? '#22c55e' : 
                                     data.category === 'Medium' ? '#f59e0b' : '#ef4444'
                            }}
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
                          >
                            {data.solved}
                          </motion.div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {data.category}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Tech Stack Usage */}
              <motion.div
                className="lg:col-span-1 mt-8"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
                      Tech Stack Proficiency
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {techStackData.map((tech, index) => (
                        <motion.div
                          key={tech.name}
                          className="space-y-2"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                              {tech.name}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {tech.percentage}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <motion.div
                              className="h-2 rounded-full"
                              style={{ backgroundColor: tech.color }}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${tech.percentage}%` }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Get In Touch
              </h2>
              <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                I'm always open to discussing new opportunities and interesting projects
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-12">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <motion.div 
                      className="flex items-center space-x-4"
                      whileHover={{ x: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                        <Phone className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                        <p className="text-lg font-medium text-gray-900 dark:text-white">+91-9305940745</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center space-x-4"
                      whileHover={{ x: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                        <Mail className="w-6 h-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                        <p className="text-lg font-medium text-gray-900 dark:text-white">utsavjhaa2003@gmail.com</p>
                      </div>
                    </motion.div>

                    <div className="pt-6">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Connect with me</p>
                      <div className="flex space-x-4">
                        <motion.a
                          href="https://github.com/gitsagee"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 bg-gray-900 dark:bg-gray-700 rounded-lg flex items-center justify-center text-white hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Github className="w-6 h-6" />
                        </motion.a>
                        <motion.a
                          href="https://linkedin.com/in/utsav-jha11"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Linkedin className="w-6 h-6" />
                        </motion.a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-gray-600 dark:text-gray-300">
                © 2025 Utsav Jha. Built with React, ShadCN UI, and Framer Motion.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Designed and developed with ❤️ for showcasing modern web development
              </p>
            </motion.div>
          </div>
        </footer>

        {/* Scroll to Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg z-50 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronUp className="w-6 h-6" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Portfolio;