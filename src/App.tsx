import './index.css'

function App() {
  return (
    <div className="relative min-h-screen bg-background selection:bg-white/20">
      {/* Fixed Background Video */}
      <div className="fixed inset-0 z-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="relative z-10">
        <nav className="flex flex-row justify-between items-center px-8 py-6 max-w-7xl mx-auto">
          <div className="font-display text-2xl tracking-tight text-foreground">
            Tousif
          </div>
          <div className="hidden md:flex gap-8">
            <a href="#" className="text-sm text-foreground">
              Home
            </a>
            <a href="#experience" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Experience
            </a>
            <a href="#projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Projects
            </a>
            <a href="#skills" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Skills
            </a>
          </div>
          <a href="https://mohammed-tousif.vercel.app/" target="_blank" rel="noopener noreferrer" className="liquid-glass rounded-full px-6 py-2.5 text-sm text-foreground hover:scale-[1.03] transition-transform flex items-center justify-center">
            Portfolio
          </a>
        </nav>

        <header className="min-h-[85vh] flex flex-col items-center justify-center text-center px-6">
          <h1 className="animate-fade-rise text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal font-display">
            Mohammed <em className="not-italic text-muted-foreground">Tousif</em>
          </h1>
          <p className="animate-fade-rise-delay text-muted-foreground text-base sm:text-lg max-w-2xl mt-8 leading-relaxed">
            Full Stack Developer crafting scalable applications with React, Node.js, and modern web technologies. Bringing calm focus to complex problems.
          </p>
          
          <div className="animate-fade-rise-delay-2 flex flex-col items-center justify-center mt-12 gap-8">
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm md:text-base text-foreground/90 bg-black/30 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=tousif.cse.rymec@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">tousif.cse.rymec@gmail.com</a>
              <span className="text-white/30">|</span>
              <a href="https://www.linkedin.com/in/mohammed-tousif-342306171/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
              <span className="text-white/30">|</span>
              <a href="https://x.com/tousif" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">X</a>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <a href="/resume.pdf" download="Mohammed_Tousif_Resume.pdf" className="liquid-glass rounded-full px-8 py-3.5 text-sm sm:text-base text-foreground hover:scale-[1.03] cursor-pointer transition-transform flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                Download Resume
              </a>
              <a href="#projects" className="liquid-glass rounded-full px-8 py-3.5 text-sm sm:text-base text-foreground hover:scale-[1.03] cursor-pointer transition-transform">
                View Work
              </a>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-6 py-24 flex flex-col gap-32 pb-40">
          
          {/* Experience Section */}
          <section id="experience" className="flex flex-col gap-12">
            <h2 className="font-display text-4xl sm:text-5xl text-foreground text-center">Professional <em className="not-italic text-muted-foreground">Experience</em></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="liquid-glass rounded-3xl p-8 sm:p-10 hover:bg-white/[0.02] transition-colors group">
                <div className="flex justify-between items-start mb-6 flex-col sm:flex-row gap-2">
                  <div>
                    <h3 className="text-xl font-medium text-foreground">ZYPTR</h3>
                    <p className="text-sm text-muted-foreground">Full Stack Developer</p>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-muted-foreground group-hover:text-foreground transition-colors border border-white/5">Sep 2025 – Present</span>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground">Infakt LMS</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">Developed scalable learning management modules with Role-Based Access Control (RBAC) using React, Node.js, and PostgreSQL. Delivered 80% of the Teacher Module.</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground">Microfinance Management System</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">Engineered a full-stack application featuring secure loan processing, customer management, and transaction tracking utilizing Node.js, Express, and MySQL.</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground">Modernspaces</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">Built an SEO-friendly property listing platform using Next.js and integrated REST APIs to enhance search visibility and performance.</p>
                  </div>
                </div>
              </div>

              <div className="liquid-glass rounded-3xl p-8 sm:p-10 hover:bg-white/[0.02] transition-colors group">
                <div className="flex justify-between items-start mb-6 flex-col sm:flex-row gap-2">
                  <div>
                    <h3 className="text-xl font-medium text-foreground">Kodemapa</h3>
                    <p className="text-sm text-muted-foreground">Full Stack Developer Intern</p>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-muted-foreground group-hover:text-foreground transition-colors border border-white/5">Oct 2024 – Mar 2025</span>
                </div>
                <ul className="text-sm text-muted-foreground leading-relaxed space-y-3 list-disc list-inside">
                  <li>Architected front-end of a high-traffic web platform using React.js.</li>
                  <li>Achieved a 35% reduction in page load time through performance optimization.</li>
                  <li>Developed reusable and modular UI components, cutting development effort by 30%.</li>
                  <li>Collaborated in Agile sprints to integrate RESTful APIs and ensure seamless cross-device responsiveness.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="flex flex-col gap-12">
            <h2 className="font-display text-4xl sm:text-5xl text-foreground text-center">Selected <em className="not-italic text-muted-foreground">Projects</em></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="liquid-glass rounded-3xl p-8 sm:p-10 hover:bg-white/[0.02] transition-colors group">
                <h3 className="text-xl font-medium text-foreground mb-2">Devsync AI</h3>
                <p className="text-sm text-muted-foreground mb-6">AI-Powered Developer Workflow Platform</p>
                <ul className="text-sm text-muted-foreground leading-relaxed space-y-3 list-disc list-inside mb-8">
                  <li>SaaS platform connecting to GitHub via OAuth 2.0 & Webhooks.</li>
                  <li>Integrated Gemini AI to auto-generate platform-optimized posts.</li>
                  <li>Developed a real-time analytics dashboard & review workflow.</li>
                </ul>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {['React', 'Node.js', 'Gemini AI', 'OAuth'].map(tag => (
                    <span key={tag} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-muted-foreground">{tag}</span>
                  ))}
                </div>
              </div>

              <div className="liquid-glass rounded-3xl p-8 sm:p-10 hover:bg-white/[0.02] transition-colors group">
                <h3 className="text-xl font-medium text-foreground mb-2">Clynicare</h3>
                <p className="text-sm text-muted-foreground mb-6">Digital Healthcare Platform</p>
                <ul className="text-sm text-muted-foreground leading-relaxed space-y-3 list-disc list-inside mb-8">
                  <li>Contributed to home medical consultations platform using Next.js & Node.js.</li>
                  <li>Implemented RBAC to ensure secure access for all stakeholders.</li>
                  <li>Integrated RESTful APIs for real-time doctor-patient communication.</li>
                </ul>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {['Next.js', 'Node.js', 'MongoDB', 'RBAC'].map(tag => (
                    <span key={tag} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-muted-foreground">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section id="skills" className="flex flex-col gap-12">
            <h2 className="font-display text-4xl sm:text-5xl text-foreground text-center">Technical <em className="not-italic text-muted-foreground">Skills</em></h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Languages', skills: ['JavaScript (ES6+)', 'TypeScript', 'Python'] },
                { title: 'Frontend', skills: ['React.js', 'Next.js', 'Tailwind CSS', 'Redux', 'Context API'] },
                { title: 'Backend & DB', skills: ['Node.js', 'Express.js', 'PostgreSQL', 'MySQL', 'MongoDB', 'FastAPI'] },
                { title: 'Tools & Cloud', skills: ['Git', 'AWS', 'Lambda', 'ECS', 'S3', 'Firebase', 'Vercel'] }
              ].map((category) => (
                <div key={category.title} className="liquid-glass rounded-3xl p-6 sm:p-8 hover:bg-white/[0.02] transition-colors">
                  <h3 className="text-base font-medium text-foreground mb-6">{category.title}</h3>
                  <div className="flex flex-col gap-3">
                    {category.skills.map((skill) => (
                      <div key={skill} className="text-sm text-muted-foreground flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-white/30"></div>
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education & Achievements Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="liquid-glass rounded-3xl p-8 sm:p-10 hover:bg-white/[0.02] transition-colors">
              <h3 className="font-display text-3xl text-foreground mb-8">Education</h3>
              <div className="space-y-8">
                <div>
                  <h4 className="text-base font-medium text-foreground">Bachelor's in Computer Science</h4>
                  <p className="text-sm text-muted-foreground mb-1">Rao Bahadur Y Mahabaleshwarappa Engineering College</p>
                  <p className="text-xs text-muted-foreground opacity-70">Jan 2023 - Jul 2025 • 77.07%</p>
                </div>
                <div>
                  <h4 className="text-base font-medium text-foreground">Diploma in ECE</h4>
                  <p className="text-sm text-muted-foreground mb-1">Government Polytechnic College Ballari</p>
                  <p className="text-xs text-muted-foreground opacity-70">Jul 2018 - May 2021 • 72.08%</p>
                </div>
              </div>
            </div>

            <div className="liquid-glass rounded-3xl p-8 sm:p-10 hover:bg-white/[0.02] transition-colors">
              <h3 className="font-display text-3xl text-foreground mb-8">Achievements</h3>
              <ul className="space-y-4">
                {[
                  'Smart India Hackathon 2023 – Grand Finalist',
                  'State-Level Hackathon (Mandya) – Finalist',
                  'RYMEC Hackathon – Winner',
                  'Innovation, Development & Entrepreneurship Competitions – Active Participant'
                ].map((achievement, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/50 mt-1.5 flex-shrink-0"></div>
                    <span className="leading-relaxed">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

        </main>
        
        {/* Footer */}
        <footer className="w-full text-center py-8 mt-12 bg-black/40 backdrop-blur-md border-t border-white/10 text-sm text-foreground/90">
          © {new Date().getFullYear()} Mohammed Tousif. Designed for calm focus.
        </footer>
      </div>
    </div>
  )
}

export default App
