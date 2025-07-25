// src/data/projects.js

export const CATEGORIES = {
  'Software & Development': [
    'Java',
    'React',
    'Node.js',
    'MySQL',
    'Python',
    'C++',
    'Machine Learning',
  ],
  'Hardware & Systems': [
  ],
  'Creative & Visual': [
    'Blender',
  ]
};

const projects = [
  {
  id: 1,
  name: 'The Perfect Fit',
  image: '/project_images/theperfectfit.png',
  // A femtech startup that helps women discover the perfect bra across brands
  description: [
    'Startup idea: In active development, team of 3, serving as the sole developer responsible for the entire tech stack',
    'Developing a Femtech platform dedicated to solving womens\' issue of bra‑fit frustrations through data and personalization.',
    'Interactive questionnaire captures body measurements, shape profiles, and fit preferences.',
    'Automated web‑scraping engine (Selenium) aggregates up‑to‑date product details (sizes, styles, reviews) from multiple retailers.',
    'Privacy‑first architecture and seamless user journey—no more guessing your bra size!',
  ],
  techStack: [
    'Frontend: React.js (deployed on Cloudflare)',
    'Backend: Node.js & Express.js (hosted on Render)',
    'Database: MySQL (hosted on Aiven)',
    'Web Scraping: Selenium',
  ],
  website: 'https://theperfectfit.app',
  category: ['Software & Development'],
  subCategories: [
      'React',
      'Node.js',
      'MySQL',
  ]
  },
  {
      id: 2,
      name: 'Tranquilio',
      image: '/project_images/tranquilio.png',
      description: [
        'Startup: Discontinued despite initial pilot success, worked in a team of 6 students, lead backend developer',
        'Contributed to the development of Tranquilio, a mental-wellness platform for Singapore workplaces to identify workplace stressors and deliver personalized preventative interventions.',
        'Secured S$10,000 NUS Venture Initiation Programme (VIP) grant to build the MVP',
        'Built the backend using Node.js and Express, and deployed serverless APIs via AWS Lambda.',
        'Implemented secure user authentication using JWT.',
      ],
      techStack: [
        'MERN STACK',
        'React.js',
        'Node.js & Express.js',
        'MongoDB',
        'Tailwind CSS',
        'AWS Lambda & API Gateway'
      ],
      github: 'https://github.com/Tranquilio',
      category: ['Software & Development'],
      subCategories: ['React', 'Node.js', 'Tailwind CSS']
    },
    // In src/data/projects.js, update (or add) the Project Connecto entry to your projects array:
    {
      id: 3,
      name: 'Project Connecto',
      image: '/project_images/connecto.png',
      description: [
        'Started Project Connecto as a Project Director at NUS MedTech in collaboration with Microtube Technologies, a healthcare tech startup.',
        'Led an interdisciplinary team of students working together to develop a smart IoT home system for patients with Muscular Dystrophy.',
        'Designed and built an ambidextrous assistive mouse prototype, incorporating force-sensitive resistors and a joystick for intuitive control',
        'Conducted clinical observations at NUHS to gather insights and refine design based on patient feedback',
        'Developed a Flutter-based application to allow patients to control household devices, such as lights and fans, with ease',
      ],
      techStack: [
        'Flutter',
        'Supabase',
        'Telegram',
        'Arduino Nano ESP32',
      ],
      github: 'https://github.com/Connecto-NUS-MedTech',
      category: ['Software & Development','Hardware & Systems'],
      subCategories: [],      // ← present, even if no subs
    },
    {
    id: 4,
    name: 'ALEX to the Rescue',
    image: '/project_images/CG1112.png',
    description: [
      'Final Team Project for CG1112: Engineering Principles and Practices II',
      '🎯 Designed a search-and-rescue robot using Raspberry Pi 3B+ (ROS/Hector SLAM) and Arduino Uno interfacing with ultrasonic, IR, and colour sensors.',
      '🔧 Dual-microcontroller architecture: RPi handles environment mapping via RPLIDAR & ROS; Uno manages real-time sensor reading and motor control.',
      '🤖 Intuitive Xbox One controller integration for joystick-based movement, with protocols for forward/reverse, turns, “road hump” navigation, and victim-identification routines.',
      '🔒 Secure command packets (0xFCFDFEFF magic number + checksum) with error-handling; firmware implements deserialization, command validation, and status reporting.',
      '🔋 Battery-powered design (5V power bank + motor battery) and compact form factor (30×13 cm) for navigating narrow, hazardous rubble during the critical 72‐hour window.'
    ],
    techStack: [
      'Raspberry Pi 3B+ & ROS (Hector SLAM)',
      'Arduino Uno (ATmega328P)',
      'RPLIDAR & Ultrasonic/IR/Colour Sensors',
      'C++ & Python (ROS nodes)',
      'MQTT/VNC over Wi-Fi',
      'Xbox One Controller Integration'
    ],
    github: 'https://github.com/VishalJeyaram/CG1112-Alex-Robot',
    category: ['Software & Development','Hardware & Systems'],
    subCategories: ['C++'],      // ← present, even if no subs
  },
  {
    id: 5,
    name: 'Autonomous Maze Runner',
    image: '/project_images/eg2310.png',
    description: [
      'Final Team Project for EG2310: Fundamentals of Systems Design',
      '🗺️ Built an autonomous TurtleBot3 Burger to SLAM-map a 5 m×5 m maze and navigate to an NFC-marked loading zone via wall-following algorithm.',
      '🏗️ Designed and integrated a ping-pong–ball loading & firing mechanism using JF-0530B solenoids and DYNAMIXEL actuators.',
      '🌡️ Fused AMG8833 thermal sensing and RPLIDAR for target detection & discrimination, then calculated range to aim accurately.',
      '🔌 Developed on Ubuntu + ROS2 with MQTT/Wi-Fi comms, Raspberry Pi 3B+, OpenCR 1.0 (Arduino), and NFC/RFID (PN532).',
      '🔧 Passed comprehensive factory acceptance tests (mechanical, electrical, software) before mission deployment.'
    ],
    techStack: [
      'ROS2 on Ubuntu',
      'Raspberry Pi 3B+ & OpenCR 1.0 (Arduino Uno)',
      'RPLIDAR LDS-01 & AMG8833 Thermal Sensor',
      'PN532 NFC/RFID Reader',
      'JF-0530B Solenoid & DYNAMIXEL XL430-W250-T',
      'MQTT over Wi-Fi & WebSockets',
      'Python & C++ (ROS nodes)'
    ],
    github: 'https://github.com/VishalJeyaram/EG2310-TurtleBot',
    category: ['Software & Development','Hardware & Systems'],
    subCategories: ['Python']
  },
  // In src/data/projects.js, add this to your projects array:

{
  id: 6,
  name: 'CLI.ckFit',
  image: '/project_images/clickfit.png',
  description: [
    'Final Team Project for CS2113T: Software Engineering & Object-Oriented Programming',
    '💻 Desktop‐based fitness tracker with a pure Command-Line Interface (CLI).',
    '🍎 Track meals, fluids, workouts, weight, and persist data to text files for later retrieval.',
    '📊 Built-in BMI & recommended-calorie calculators using user inputs (sex, age, height, weight, activity level).',
    '🔄 “memoryStartup” allows loading or clearing previous sessions on launch for flexible data management.',
    '🛠️ Modular design with Tracker classes (Meal, Fluid, Weight, Schedule), custom exceptions, and UML-driven architecture.'
  ],
  techStack: [
    'Java 11+',
    'Plain‐text file storage',
    'JUnit (unit testing)',
    'PlantUML (diagrams)'
  ],
  github: 'https://github.com/VishalJeyaram/CS2113T-Team-Project',
  category: ['Software & Development'],
  subCategories: ['Java']
},
{
  id: 7,
  name: 'Smart IoT Mirror',
  image: '/project_images/smartmirror.png',
  description: [
    'Final Team Project for LH30065: The Internet of Things at The University of Birmingham (exchange semester)',
    '📅🕒 Displays date & time, current weather conditions, and integrates Spotify playback controls.',
    '✅ Offers a  todo list manager and an interactive map widget for navigation.',
    '⚙️ Three‐component architecture: React front-end (yarn start), Flask API backend (venv && flask run), and Node.js server (npm run devStart).'
  ],
  techStack: [
    'React.js',
    'Flask & Python',
    'Node.js & Express',
    'Spotify Web API',
    'OpenWeatherMap API',
  ],
  // no live site yet
  github: 'https://github.com/VishalJeyaram/LH30065-IoTSmartMirror',
  category: ['Software & Development'],
  subCategories: ['React', 'Node.js', 'Python']
},
// Add to src/data/projects.js

{
  id: 8,
  name: 'C3PO Task Tracker',
  image: '/project_images/c3po.png',
  description: [
    'Final Solo Project for CS2113T: Software Engineering & Object-Oriented Programming',
    '🤖 Star Wars–themed CLI application featuring ASCII art of C3PO for a playful UX.',
    '📝 Manage to-dos, deadlines, and events via intuitive commands and interactive prompts.',
    '⚙️ Developed in Java 11 with OOP principles: modular Tracker classes, custom exceptions, and clear separation of concerns.',
    '💾 Persists your tasks to plain-text files between sessions; supports task CRUD and summary listings.'
  ],
  techStack: [
    'Java 11',
    'IntelliJ IDEA',
    'JUnit (unit testing)',
    'PlantUML (design diagrams)'
  ],
  github: 'https://github.com/VishalJeyaram/CS2113T-Individual-Project',
  category: ['Software & Development'],
  subCategories: ['Java']
},
// Add this to src/data/projects.js

{
  id: 9,
  name: 'mBot Maze Navigator',
  image: '/project_images/CG1111.png',
  description: [
    'Final Team Project for CG1111: Engineering Principles & Practices I',
    '📏 Fully autonomous mBot maze runner that Uses dual IR side‐sensors for wall‐parallel autopilot, an LDR with RGB balancing to detect colored markers, and an ultrasonic sensor for obstacle awareness.',
    '🔄 Implements precise on-the-spot 90° & 180° turns based on color codes, plus a victory tune (“Avengers Portals” theme) via buzzer upon maze completion.',
    '⚙️ Calibrated motor speeds, sensor thresholds, and lighting conditions; developed in Arduino C++ with the MeMCore library.'
  ],
  techStack: [
    'Arduino C++',
    'MeMCore library',
    'Infrared Sensors',
    'RGB Light Sensor (LDR)',
    'Ultrasonic Sensor',
    'Line Follower Module'
  ],
  github: 'https://github.com/VishalJeyaram/CG1111-mbot',
  category: ['Hardware & Systems', 'Software & Development'],
  subCategories: ['C++']
},
{
  id: 10,
  name: 'Encoder/Decoder',
  image: '/project_images/encoder.png',
  description: [
    '🔐 Java-based text obfuscation tool implementing a shift cipher over a custom reference table (A–Z, 0–9, and symbols ()*+,-./).',
    '▶️ Encodes plaintext into an offset-prefixed, obfuscated string and decodes back using the same dynamic offset character.',
    '🛠️ Preserves any character not in the reference table; easy to extend by adding new symbols to the table.',
    '💡 Clean OOP design with encode() and decode() methods, making it highly testable and maintainable.'
  ],
  techStack: [
    'Java 8+',
    'Custom Cipher Algorithm'
  ],
  github: 'https://github.com/VishalJeyaram/encoder',
  category: ['Software & Development'],
  subCategories: ['Java']
},
{
  id: 11,
  name: '3D Basketball',
  image: '/project_images/basketball.png',
  description: [
    'High-fidelity 3D model of a basketball crafted entirely in Blender with realistic texturing.',
  ],
  techStack: [
    'Blender',
  ],
  github: 'https://github.com/VishalJeyaram/3D_Basketball',
  categories: ['Creative & Visual'],
  subCategories: ['Blender']
},
{
  id: 12,
  name: '3D Fluid Simulation',
  image: '/project_images/fluid.png',
  description: [
    'Real-time 3D fluid animation.',
  ],
  techStack: [
    'Blender',
  ],
  github: 'https://github.com/VishalJeyaram/3D_Fluid_Simulation',
  categories: ['Creative & Visual'],
  subCategories: ['Blender']
},
{
  id: 13,
  name: '3D Pillow Model',
  image: '/project_images/pillow.png',
  description: [
    'Pillow made in Blender.',
  ],
  techStack: [
    'Blender',
  ],
  github: 'https://github.com/VishalJeyaram/3D_Pillow',
  categories: ['Creative & Visual'],
  subCategories: ['Blender']
},
{
  id: 14,
  name: '3D Dice Model',
  image: '/project_images/dice.png',
  description: [
    'Low-poly six-sided dice modeled in Blender.',
  ],
  techStack: [
    'Blender',
  ],
  github: 'https://github.com/VishalJeyaram/3D_Dice',
  categories: ['Creative & Visual'],
  subCategories: ['Blender']
},
  {
  id: 15,
  name: 'N-Back Memory Game',
  image: '/project_images/nback.png',
  description: [
    'Built with React, this cursed memory game challenges your brain with arithmetic operations and n-back recall.',
    'Select an n level (0–9) and choose Timed (1 min, 5 min, 10 min) or Untimed (15, 30, 45 questions) modes.',
    'Practice addition, subtraction, multiplication, and division with immediate.',
    'Memorize the first n prompts (3 s each), then recall and answer the question shown n steps ago.',
    'Automatic timing begins after the first n prompts, all wrapped in a clean, responsive UI.'
  ],
  techStack: [
    'React.js',
  ],
  website: 'https://n-back-memory-game.netlify.app/',
  github: 'https://github.com/VishalJeyaram/n-back.git',
  category: ['Software & Development'],
  subCategories: ['React']
},
{
  id: 16,
  name: 'Binary Builders',
  image: '/project_images/binarybuilders.png',
  description: [
    'Summer Pair Project for CP2106: Orbital',
    'Full-stack marketplace for buying/selling PC parts, managing custom builds, and calculating total costs.',
    'Integrated a component build guide to educate users about individual PC parts and best practices.',
    'Built a community forum and real-time chat feature for buyers and sellers to discuss builds and trades.',
  ],
  techStack: [
    'React Native',
    'Firebase',
  ],
  github: 'https://github.com/VishalJeyaram/Binary_Builders',
  categories: ['Software & Development'],
  subCategories: ['React']
},
{
  id: 17,
  name: 'Synthetic Data for Workplace Safety',
  image: '/project_images/fyp.png',
  description: [
    'Final‐year Project in collaboration with Invigilo Technologies (startup) .',
    'Exploring synthetic data generation (mocap, GAN, game engines) for detecting workplace slips, trips & falls.',
    'Built a pipeline using Plask AI & Blender to capture, clean and render 58 distinct STF motions, then auto-generate 4,640+ video clips via scripted camera angles & zooms.',
    'Augmented with DCGAN experiments, YOLOv8 pose extraction and LSTM sequence classification to evaluate real-time hazard detection models.',
    'Achieved up to 100% accuracy on binary Normal vs. Abnormal tests; proposed multi‐subject extensions and graph-based action recognition for future work.'
  ],
  techStack: [
    'Python (Blender API)',
    'Plask AI',
    'DCGAN, YOLOv8 & LSTM',
  ],
  website: 'https://drive.google.com/file/d/1i45hcwM77QGG5oUFioszxmff3IjxMyvA/view?usp=drive_link',
  category: ['Software & Development', 'Creative & Visual'],
  subCategories: ['Python', 'Blender', 'Machine Learning']
},
{
  id: 18,
  name: 'Interactive 3D Portfolio',
  image: '/project_images/profile.png',
  description: [
    'THIS WEBSITE!',
    'Personal portfolio website showcasing interactive 3D scenes powered by React Three Fiber.',
    'Features include filterable project spheres, immersive camera controls, and modal popups.',
    'Global music toggle with background themes and an informational overlay about the app.',
  ],
  techStack: [
    'React.js',
    'React Three Fiber & Drei',
    'Three.js',
    'React Router',
    'HTML5 Audio API',
    'CSS Modules'
  ],
  website: 'https://your-portfolio-url.com',
  github: 'https://github.com/yourusername/portfolio',
  categories: ['Software & Development', 'Creative & Visual'],
  subCategories: ['React']
},


]

export default projects;
