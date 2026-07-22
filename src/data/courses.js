export const coursesData = [
  {
    id: "fs-react-node",
    title: "Full Stack Web Development with React and Node.js",
    category: "Development",
    description: "Master modern web development from scratch. Build and deploy fully interactive, production-ready full stack apps.",
    longDescription: "Step into the world of professional web development with this comprehensive Masterclass. You will learn front-end engineering using React (hooks, state management, context) and back-end services with Node.js, Express, and databases. By the end of this course, you will build and deploy a fully functional web application and receive an official certification.",
    rating: 4.8,
    ratingCount: 12450,
    enrolledCount: 45200,
    duration: "24h 45m",
    level: "All Levels",
    price: 94.99,
    image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=600&auto=format&fit=crop&q=80",
    instructor: {
      name: "Dr. Sarah Jenkins",
      title: "Senior Software Engineer & Educator",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
    },
    curriculum: [
      {
        id: "mod1",
        title: "Module 1: Front-End Mastery with React",
        lectures: [
          {
            id: "lec1-1",
            title: "1.1 Introduction to React and Vite",
            duration: "12:45",
            type: "video",
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            readingContent: ""
          },
          {
            id: "lec1-2",
            title: "1.2 State Management and Hooks (useState, useEffect)",
            duration: "18:20",
            type: "video",
            videoUrl: "https://www.w3schools.com/html/movie.mp4",
            readingContent: ""
          },
          {
            id: "lec1-3",
            title: "1.3 Reading: Modern JSX Rules and Best Practices",
            duration: "5 min read",
            type: "reading",
            videoUrl: "",
            readingContent: "React components use JSX (JavaScript XML) to describe what the UI should look like. Some critical rules of JSX include:\n\n1. **Single Root Element**: A JSX expression must return a single root element. If you have adjacent elements, wrap them in a Fragment `<>` or a `<div>`.\n2. **Closing Tags**: All tags must be explicitly closed, e.g. `<img />` or `<br />`.\n3. **CamelCase Attributes**: HTML attributes are written in camelCase, e.g., `class` becomes `className` and `onclick` becomes `onClick`.\n4. **Embedding JS Expressions**: You can embed any JavaScript expression inside curly braces `{}`.\n\nFollowing these rules ensures React can compile your layout efficiently into standard virtual DOM nodes."
          }
        ]
      },
      {
        id: "mod2",
        title: "Module 2: Building Back-End Services with Express",
        lectures: [
          {
            id: "lec2-1",
            title: "2.1 Setting Up Node.js and Express",
            duration: "14:15",
            type: "video",
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            readingContent: ""
          },
          {
            id: "lec2-2",
            title: "2.2 Designing RESTful APIs",
            duration: "21:10",
            type: "video",
            videoUrl: "https://www.w3schools.com/html/movie.mp4",
            readingContent: ""
          }
        ]
      },
      {
        id: "mod3",
        title: "Module 3: Full Stack Assessment & Certification",
        lectures: [
          {
            id: "lec3-1",
            title: "3.1 Integration: Connecting React to Express Backend",
            duration: "15:30",
            type: "video",
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            readingContent: ""
          },
          {
            id: "lec3-2",
            title: "3.2 Final Assessment Quiz",
            duration: "10 Questions",
            type: "quiz",
            videoUrl: "",
            quizQuestions: [
              {
                question: "Which hook is used to perform side effects in React?",
                options: ["useState", "useContext", "useEffect", "useMemo"],
                correctAnswerIndex: 2,
                explanation: "The useEffect hook allows you to perform side effects (such as data fetching, subscriptions, or manual DOM mutations) in function components."
              },
              {
                question: "In Express, how do you define a route to handle POST requests?",
                options: ["app.get()", "app.post()", "app.send()", "app.request()"],
                correctAnswerIndex: 1,
                explanation: "You use app.post() to handle HTTP POST requests targeting a specific route path in an Express application."
              },
              {
                question: "What is the role of virtual DOM in React?",
                options: [
                  "To speed up browser network requests",
                  "To hold a lightweight copy of the UI in memory and sync it with the real DOM via reconciliation",
                  "To secure backend REST endpoints",
                  "To store application state in local storage"
                ],
                correctAnswerIndex: 1,
                explanation: "React maintains a virtual representation of the UI in memory, syncing it with the browser DOM through reconciliation to minimize direct, expensive updates to the real DOM."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "ai-ml-masterclass",
    title: "Artificial Intelligence & Machine Learning Masterclass",
    category: "AI & Data Science",
    description: "Learn Python, regression, classification, deep learning with TensorFlow, and neural networks from absolute scratch.",
    longDescription: "Artificial Intelligence is rewriting the rules of technology. This course will introduce you to mathematical foundations, data pre-processing, classical machine learning algorithms (linear regression, decision trees, SVMs), and jump straight into deep learning with TensorFlow. Build your own predictive models and neural networks.",
    rating: 4.9,
    ratingCount: 8930,
    enrolledCount: 32100,
    duration: "30h 15m",
    level: "Intermediate",
    price: 109.99,
    image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=600&auto=format&fit=crop&q=80",
    instructor: {
      name: "Marcus Aurelius Chen",
      title: "AI Research Scientist & Author",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    },
    curriculum: [
      {
        id: "aiml-mod1",
        title: "Module 1: Foundations of Machine Learning",
        lectures: [
          {
            id: "aiml-1-1",
            title: "1.1 Introduction to AI, Machine Learning, and Deep Learning",
            duration: "15:20",
            type: "video",
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            readingContent: ""
          },
          {
            id: "aiml-1-2",
            title: "1.2 Supervised vs Unsupervised Learning",
            duration: "10:45",
            type: "video",
            videoUrl: "https://www.w3schools.com/html/movie.mp4",
            readingContent: ""
          }
        ]
      },
      {
        id: "aiml-mod2",
        title: "Module 2: Neural Networks & Deep Learning",
        lectures: [
          {
            id: "aiml-2-1",
            title: "2.1 Understanding the Artificial Neuron (Perceptron)",
            duration: "18:40",
            type: "video",
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            readingContent: ""
          },
          {
            id: "aiml-2-2",
            title: "2.2 Reading: Activation Functions and Backpropagation",
            duration: "6 min read",
            type: "reading",
            videoUrl: "",
            readingContent: "Deep learning relies on activation functions to introduce non-linearity into a neural network. Without them, no matter how many layers a neural network has, it would behave like a simple single-layer linear model.\n\nCommon Activation Functions:\n- **Sigmoid**: Maps inputs to a value between 0 and 1. Good for binary classification output layers.\n- **ReLU (Rectified Linear Unit)**: Returns 0 for negative inputs, and x for positive inputs. It is the most widely used activation function in hidden layers because it mitigates the vanishing gradient problem.\n- **Softmax**: Maps outputs to a probability distribution, making it perfect for multi-class classification.\n\n**Backpropagation** is the core algorithm used to train neural networks. It calculates the gradient of the loss function with respect to the weights using the chain rule, enabling optimizers (like Gradient Descent or Adam) to update weights and reduce error."
          }
        ]
      },
      {
        id: "aiml-mod3",
        title: "Module 3: Neural Networks Assessment",
        lectures: [
          {
            id: "aiml-3-1",
            title: "3.1 Training a Model with TensorFlow and Keras",
            duration: "25:10",
            type: "video",
            videoUrl: "https://www.w3schools.com/html/movie.mp4",
            readingContent: ""
          },
          {
            id: "aiml-3-2",
            title: "3.2 AI & ML Final Certification Quiz",
            duration: "3 Questions",
            type: "quiz",
            videoUrl: "",
            quizQuestions: [
              {
                question: "Which activation function is most commonly used in the hidden layers of modern deep neural networks?",
                options: ["Sigmoid", "Tanh", "ReLU", "Linear"],
                correctAnswerIndex: 2,
                explanation: "ReLU is preferred in hidden layers because it avoids the vanishing gradient problem and allows models to learn faster during backpropagation."
              },
              {
                question: "What does backpropagation do?",
                options: [
                  "It generates random training images",
                  "It computes gradients of the loss function with respect to neural network weights to facilitate training",
                  "It deletes inactive neural nodes",
                  "It deploys the neural network into production servers"
                ],
                correctAnswerIndex: 1,
                explanation: "Backpropagation calculates the gradients of the error/loss function with respect to the network weights, moving backward through the layers, allowing optimizers to tweak the weights."
              },
              {
                question: "What type of learning is classification?",
                options: ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Semi-unsupervised Learning"],
                correctAnswerIndex: 0,
                explanation: "Classification is a type of Supervised Learning, where models are trained on pre-labeled datasets containing inputs mapped to defined categories."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "uiux-design-essentials",
    title: "UI/UX Design Essentials: Build Premium Interfaces",
    category: "Design",
    description: "Design stunning wireframes, learn typographic systems, master high-fidelity Figma prototyping, and run user research.",
    longDescription: "Learn to create user interfaces that are not only visual masterpieces but also provide seamless, intuitive user experiences. We will cover typography, grid systems, modern color psychology, and wireframing before diving into high-fidelity prototype design in Figma. Bring your ideas to life and design web products that convert and delight.",
    rating: 4.75,
    ratingCount: 6540,
    enrolledCount: 18300,
    duration: "18h 20m",
    level: "All Levels",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1561070791-26c113006238?w=600&auto=format&fit=crop&q=80",
    instructor: {
      name: "Elena Rostova",
      title: "Product Design Lead",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    curriculum: [
      {
        id: "uiux-mod1",
        title: "Module 1: Principles of User Experience (UX)",
        lectures: [
          {
            id: "uiux-1-1",
            title: "1.1 Introduction to UX Laws: Fitts's Law, Hick's Law",
            duration: "14:50",
            type: "video",
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            readingContent: ""
          },
          {
            id: "uiux-1-2",
            title: "1.2 Designing User Journeys and Wireframes",
            duration: "19:15",
            type: "video",
            videoUrl: "https://www.w3schools.com/html/movie.mp4",
            readingContent: ""
          }
        ]
      },
      {
        id: "uiux-mod2",
        title: "Module 2: Visual Interface Design (UI)",
        lectures: [
          {
            id: "uiux-2-1",
            title: "2.1 Grid Systems and Responsive Layouts",
            duration: "16:10",
            type: "video",
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            readingContent: ""
          },
          {
            id: "uiux-2-2",
            title: "2.2 Reading: Color Systems, Contrast, and Accessibility",
            duration: "4 min read",
            type: "reading",
            videoUrl: "",
            readingContent: "Color is one of the most powerful tools in a designer's arsenal. It guides attention, communicates brand identity, and affects emotional response. However, it must be used with accessible practices:\n\n1. **Contrast Ratios**: The WCAG 2.1 AA guidelines require a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text.\n2. **Avoid Color-Only Cues**: Never use color as the sole indicator of an action or information. Provide text labels or distinct icons for color-blind users (e.g. adding error icons beside red error messages).\n3. **Consistent Accents**: Designate specific colors for active states (e.g. primary actions in high-contrast indigo) to create visual hierarchy."
          }
        ]
      },
      {
        id: "uiux-mod3",
        title: "Module 3: Prototyping & Assessment",
        lectures: [
          {
            id: "uiux-3-1",
            title: "3.1 Creating High-Fidelity Prototypes in Figma",
            duration: "24:35",
            type: "video",
            videoUrl: "https://www.w3schools.com/html/movie.mp4",
            readingContent: ""
          },
          {
            id: "uiux-3-2",
            title: "3.2 UI/UX Design Final Quiz",
            duration: "3 Questions",
            type: "quiz",
            videoUrl: "",
            quizQuestions: [
              {
                question: "What does Hick's Law state?",
                options: [
                  "The time to acquire a target is a function of the distance to and size of the target.",
                  "The time it takes to make a decision increases with the number and complexity of choices.",
                  "People will judge a product based on its visual aesthetics.",
                  "User retention is directly linked to page speed."
                ],
                correctAnswerIndex: 1,
                explanation: "Hick's Law states that the more options you present to a user, the longer it will take them to make a decision. Minimizing choices reduces cognitive load."
              },
              {
                question: "What is the minimum WCAG AA contrast ratio requirement for normal body text?",
                options: ["2:1", "3:1", "4.5:1", "7:1"],
                correctAnswerIndex: 2,
                explanation: "Under WCAG AA guidelines, the minimum contrast ratio required for standard-sized body text is 4.5:1."
              },
              {
                question: "Which of the following describes wireframing?",
                options: [
                  "Styling layout with absolute pixel perfection",
                  "A low-fidelity structural blueprint of a web page showing information hierarchy",
                  "Writing backend logic for a user form",
                  "Optimizing images for SEO indexation"
                ],
                correctAnswerIndex: 1,
                explanation: "Wireframing is the process of creating a simple, low-fidelity diagram of your app structure, helping map the layout, user flows, and general structure without visual style details."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "cloud-devops-mastery",
    title: "Cloud Architecture & DevOps: AWS & Kubernetes",
    category: "Cloud & DevOps",
    description: "Learn to design highly available cloud infrastructure, manage CI/CD pipelines, and master Docker & Kubernetes.",
    longDescription: "Deploy applications like a pro. This course covers everything from standard AWS architecture (EC2, VPC, RDS, S3) to modern containerization with Docker and container orchestration with Kubernetes. Automate deployment with Jenkins and GitHub Actions.",
    rating: 4.85,
    ratingCount: 5120,
    enrolledCount: 14100,
    duration: "21h 10m",
    level: "Advanced",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80",
    instructor: {
      name: "Vikram Malhotra",
      title: "Lead Cloud Architect & Consultant",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80"
    },
    curriculum: [
      {
        id: "devops-mod1",
        title: "Module 1: Infrastructure on AWS",
        lectures: [
          {
            id: "devops-1-1",
            title: "1.1 Introduction to Cloud Computing & AWS Services",
            duration: "13:40",
            type: "video",
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            readingContent: ""
          },
          {
            id: "devops-1-2",
            title: "1.2 Designing Virtual Private Clouds (VPCs) and Subnets",
            duration: "17:15",
            type: "video",
            videoUrl: "https://www.w3schools.com/html/movie.mp4",
            readingContent: ""
          }
        ]
      },
      {
        id: "devops-mod2",
        title: "Module 2: Containers & Orchestration",
        lectures: [
          {
            id: "devops-2-1",
            title: "2.1 Dockerizing Your React and Node.js Web App",
            duration: "19:50",
            type: "video",
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            readingContent: ""
          },
          {
            id: "devops-2-2",
            title: "2.2 Reading: Kubernetes Architecture & Core Resources",
            duration: "5 min read",
            type: "reading",
            videoUrl: "",
            readingContent: "Kubernetes (K8s) is an open-source container orchestration system for automating application deployment, scaling, and management.\n\nCore Architecture Components:\n- **Control Plane**: The nervous system of K8s, containing the api-server, etcd (key-value store of cluster data), controller manager, and scheduler.\n- **Nodes**: Physical or virtual machine workers running the containers.\n\nKey K8s Resources:\n1. **Pod**: The smallest deployable unit. It represents a single running process and contains one or more containers sharing network and storage resources.\n2. **Service**: An abstract way to expose an application running on a set of Pods as a network service with a stable IP address.\n3. **Deployment**: Manages declarative updates for Pods. It ensures the specified number of Pod replicas are running and handles rolling updates automatically."
          }
        ]
      },
      {
        id: "devops-mod3",
        title: "Module 3: CI/CD & Final Assessment",
        lectures: [
          {
            id: "devops-3-1",
            title: "3.1 Continuous Integration with GitHub Actions",
            duration: "21:30",
            type: "video",
            videoUrl: "https://www.w3schools.com/html/movie.mp4",
            readingContent: ""
          },
          {
            id: "devops-3-2",
            title: "3.2 Cloud & DevOps Final Quiz",
            duration: "3 Questions",
            type: "quiz",
            videoUrl: "",
            quizQuestions: [
              {
                question: "What is the smallest deployable object in Kubernetes?",
                options: ["Container", "Service", "Pod", "Node"],
                correctAnswerIndex: 2,
                explanation: "A Pod is the smallest deployable unit in Kubernetes, containing one or more containers that share resources."
              },
              {
                question: "Which AWS service is designed to deliver static content (like images, CSS, JS) with low latency?",
                options: ["EC2", "RDS", "CloudFront", "Route 53"],
                correctAnswerIndex: 2,
                explanation: "AWS CloudFront is a fast content delivery network (CDN) service that securely delivers data, videos, applications, and APIs globally with low latency."
              },
              {
                question: "What does CI/CD stand for?",
                options: [
                  "Control Infrastructure / Computer Distribution",
                  "Continuous Integration / Continuous Deployment",
                  "Code Interface / Class Development",
                  "Computing Isolation / Console Delivery"
                ],
                correctAnswerIndex: 1,
                explanation: "CI/CD stands for Continuous Integration and Continuous Deployment (or Delivery), which automates code building, testing, and release cycles."
              }
            ]
          }
        ]
      }
    ]
  }
];
