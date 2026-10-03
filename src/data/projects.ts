import {
  Activity,
  BarChart3,
  Bot,
  BrainCircuit,
  Camera,
  Cpu,
  Database,
  FileText,
  GitBranch,
  Layers3,
  LineChart,
  Mail,
  MapPinned,
  Network,
  ServerCog,
  Sparkles,
  Truck,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import hrPulseImage from "@/assets/hr-pulse.png";
import nlpMlopsImage from "@/assets/nlp-mlops.png";
import parkVisionImage from "@/assets/parkvision-ai.png";
import ragAssistantImage from "@/assets/rag-assistant.png";
import smartLogiTrackImage from "@/assets/smart-logitrack.png";

export interface PipelineNode {
  label: string;
  icon: LucideIcon;
}

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  conceptBadge: string;
  visualBadge: string;
  shortDescription: string;
  githubUrl: string;
  image: string;
  alt: string;
  problemObjective: string;
  fullDescription: string;
  mainFeatures: string[];
  technologies: string[];
  pipeline: PipelineNode[];
  technicalDetails: string[];
}

export const projectsData: ProjectItem[] = [
  {
    id: "parkvision-ai",
    number: "01",
    title: "ParkVision AI",
    conceptBadge: "COMPUTER VISION · REAL-TIME",
    visualBadge: "LIVE OCCUPANCY DETECTOR",
    shortDescription: "Smart parking detection and availability using computer vision.",
    githubUrl: "https://github.com/ElbahiaBoudal/ParkVision_AI",
    image: parkVisionImage,
    alt: "ParkVision AI smart parking computer vision interface visual",
    problemObjective:
      "Urban parking congestion leads to wasted time, fuel, and traffic friction. ParkVision AI automatically processes live video camera feeds to detect available parking slots and stream real-time updates to drivers and operators.",
    fullDescription:
      "ParkVision AI is an intelligent smart-parking web platform merging Computer Vision with low-latency web architecture. Video feeds are ingested and processed using custom YOLO object detection and OpenCV frame manipulation to classify parking slot occupancy with 94.8% accuracy. The FastAPI backend broadcasts instant WebSocket updates to a responsive Next.js frontend with an interactive Leaflet geospatial map.",
    mainFeatures: [
      "Real-time video frame processing & parking slot detection via YOLO & OpenCV",
      "Sub-second WebSocket data streaming for immediate occupancy updates",
      "Interactive geospatial map interface powered by Next.js and Leaflet",
      "Secure JWT user authentication & session management",
      "Historical parking occupancy analytics & peak hours reporting",
    ],
    technologies: [
      "Python",
      "YOLO",
      "OpenCV",
      "FastAPI",
      "PostgreSQL",
      "Next.js",
      "WebSockets",
      "JWT",
      "Leaflet",
    ],
    pipeline: [
      { label: "Camera Feed", icon: Camera },
      { label: "YOLO Detection", icon: BrainCircuit },
      { label: "OpenCV Process", icon: Layers3 },
      { label: "FastAPI Backend", icon: ServerCog },
      { label: "WebSockets Stream", icon: Activity },
      { label: "Leaflet Map", icon: MapPinned },
    ],
    technicalDetails: [
      "Custom slot coordinate masking for video streams enabling polygon-based zone evaluation.",
      "Optimized YOLO inference latency to <45ms per frame using GPU batch inference.",
      "Low-latency WebSocket gateway ensuring multi-client UI state synchronization.",
    ],
  },
  {
    id: "hr-pulse",
    number: "02",
    title: "HR-Pulse",
    conceptBadge: "AI · NLP · AZURE CLOUD",
    visualBadge: "PREDICTIVE HR & SENTIMENT DASHBOARD",
    shortDescription:
      "AI-powered HR platform combining salary prediction, NLP and Azure services.",
    githubUrl: "https://github.com/ElbahiaBoudal/HR-Pulse-",
    image: hrPulseImage,
    alt: "HR-Pulse AI analytics and salary prediction dashboard visual",
    problemObjective:
      "HR departments frequently struggle to detect compensation equity gaps and quantify employee sentiment. HR-Pulse delivers data-driven predictive insights into compensation models and feedback analytics.",
    fullDescription:
      "HR-Pulse is an AI-powered HR platform combining machine learning regression models for salary estimation with Azure AI Language NLP services for employee survey analysis. Built with Python and FastAPI, it features dynamic analytics dashboards, Terraform infrastructure provisioning, Docker containerization, and OpenTelemetry distributed tracing.",
    mainFeatures: [
      "Machine Learning salary prediction based on performance, tenure, and role drivers",
      "NLP survey sentiment score radar analytics using Azure AI Language",
      "Departmental skills matrix tracking & talent gap visualization",
      "Automated Infrastructure as Code with Terraform and Docker containerization",
      "End-to-end telemetry and observability with OpenTelemetry and Jaeger",
    ],
    technologies: [
      "Python",
      "FastAPI",
      "Machine Learning",
      "Azure SQL",
      "Azure AI Language",
      "NLP",
      "Terraform",
      "Docker",
      "OpenTelemetry",
    ],
    pipeline: [
      { label: "Employee Data", icon: Database },
      { label: "Feature Eng", icon: BarChart3 },
      { label: "Salary Model", icon: BrainCircuit },
      { label: "Azure AI NLP", icon: Sparkles },
      { label: "FastAPI", icon: ServerCog },
      { label: "OpenTelemetry", icon: Activity },
    ],
    technicalDetails: [
      "Automated feature scaling and cross-validated regression models for fair salary estimation.",
      "Integration with Azure AI Language NER and sentiment APIs for raw text feedback extraction.",
      "Complete Terraform HCL scripts provisioning Azure SQL instances and container apps automatically.",
    ],
  },
  {
    id: "smart-logitrack",
    number: "03",
    title: "Smart LogiTrack",
    conceptBadge: "DATA PIPELINE · ETA PREDICTION",
    visualBadge: "URBAN TRANSIT MAP & ETA PIPELINE",
    shortDescription:
      "Predictive urban transport system for ETA prediction with an end-to-end data pipeline.",
    githubUrl: "https://github.com/ElbahiaBoudal/SmartLogiTrack",
    image: smartLogiTrackImage,
    alt: "Smart LogiTrack urban transit ETA map and data pipeline visual",
    problemObjective:
      "Transit delays disrupt city commuting and logistics planning. Smart LogiTrack streams vehicle telemetry through a distributed PySpark data pipeline to generate dynamic ETA predictions across urban transit networks.",
    fullDescription:
      "Smart LogiTrack is a predictive urban transport platform featuring a complete data engineering architecture. Apache Airflow orchestrates telemetry extraction DAGs, PySpark handles high-volume streaming transformations, and Scikit-learn regressors forecast precise Arrival Times (ETA). The API microservice is served via FastAPI and fully validated with Pytest.",
    mainFeatures: [
      "Automated data ingestion and pipeline orchestration with Apache Airflow DAGs",
      "High-throughput distributed data streaming & transformation using PySpark",
      "Predictive Machine Learning ETA regressor with Scikit-learn & Pandas",
      "Containerized microservice API built with FastAPI and Docker",
      "Automated unit and integration testing suite written with Pytest",
    ],
    technologies: [
      "Python",
      "PySpark",
      "Pandas",
      "PostgreSQL",
      "Airflow",
      "Scikit-learn",
      "FastAPI",
      "Docker",
      "Pytest",
    ],
    pipeline: [
      { label: "GPS Telemetry", icon: Truck },
      { label: "Apache Airflow", icon: Workflow },
      { label: "PySpark Stream", icon: Network },
      { label: "Scikit-Learn ETA", icon: LineChart },
      { label: "FastAPI Service", icon: ServerCog },
      { label: "Transit Map", icon: MapPinned },
    ],
    technicalDetails: [
      "PySpark streaming transformations processing vehicle telemetry with dynamic windowing.",
      "Airflow DAG workflow scheduling automated model retraining upon data drift thresholds.",
      "Pytest suite ensuring 90%+ code coverage across ETL data transformations and FastAPI endpoints.",
    ],
  },
  {
    id: "nlp-support-ticket-mlops",
    number: "04",
    title: "NLP Support Ticket Classification & MLOps",
    conceptBadge: "INDUSTRIAL NLP PIPELINE · MLOPS",
    visualBadge: "EMAILS → EMBEDDINGS → DRIFT MONITORING",
    shortDescription:
      "Industrial NLP pipeline for support ticket classification with embeddings, monitoring and deployment.",
    githubUrl: "https://github.com/ElbahiaBoudal/tickets_classification",
    image: nlpMlopsImage,
    alt: "NLP Support Ticket Classification MLOps pipeline and monitoring visual",
    problemObjective:
      "High-volume customer support operations suffer from slow manual ticket triaging. This project automates ticket classification while enforcing continuous MLOps monitoring for model performance drift in production.",
    fullDescription:
      "An industrial NLP pipeline for classifying support tickets into technical, billing, or access categories. It computes dense semantic embeddings using Hugging Face transformers, stores vectors in ChromaDB, and performs classification via Scikit-learn models. Evidently AI continuously monitors feature and concept drift, while Prometheus and Grafana track real-time Kubernetes cluster performance.",
    mainFeatures: [
      "Support ticket text preprocessing & Hugging Face transformer embedding generation",
      "Vector similarity store & fast retrieval powered by ChromaDB",
      "Real-time data & concept drift monitoring utilizing Evidently AI",
      "Production container orchestration with Docker and Kubernetes",
      "CI/CD via GitHub Actions with Prometheus latency & Grafana dashboard metrics",
    ],
    technologies: [
      "Python",
      "NLP",
      "Hugging Face",
      "Scikit-learn",
      "ChromaDB",
      "Evidently AI",
      "Docker",
      "Kubernetes",
      "GitHub Actions",
      "Prometheus",
      "Grafana",
    ],
    pipeline: [
      { label: "Email Ingestion", icon: Mail },
      { label: "Hugging Face Embed", icon: BrainCircuit },
      { label: "ChromaDB Store", icon: Database },
      { label: "Scikit Classifier", icon: Cpu },
      { label: "Evidently Drift", icon: Activity },
      { label: "Grafana Monitoring", icon: BarChart3 },
    ],
    technicalDetails: [
      "Dense text embedding generation using pre-trained BERT transformer models.",
      "Evidently AI statistical tests (KS-test, Jensen-Shannon distance) monitoring feature distribution drift.",
      "Kubernetes deployment manifests with Prometheus scrape metrics and Grafana alerts for latency spikes.",
    ],
  },
  {
    id: "rag-it-support-assistant",
    number: "05",
    title: "RAG IT Support Assistant",
    conceptBadge: "GENERATIVE AI · RAG · VECTOR SEARCH",
    visualBadge: "PDF → CHUNKS → CHROMADB → GEMINI LLM",
    shortDescription:
      "Intelligent IT support assistant using document retrieval, embeddings and an LLM.",
    githubUrl: "https://github.com/ElbahiaBoudal/-assistant_RAG",
    image: ragAssistantImage,
    alt: "RAG IT Support Assistant vector search and Gemini LLM visual",
    problemObjective:
      "IT help desks expend substantial time answering repetitive questions buried in lengthy technical PDFs. This assistant leverages Retrieval-Augmented Generation (RAG) to deliver instant, document-grounded answers.",
    fullDescription:
      "An intelligent RAG application that ingests internal IT documentation, software user manuals, and technical PDFs. Using LangChain and Hugging Face embeddings, text chunks are indexed in ChromaDB vector space. When users submit queries, relevant snippets are retrieved and synthesized into concise, accurate answers by Google Gemini LLM.",
    mainFeatures: [
      "Automated PDF document parsing, text chunking, and embedding generation",
      "Dense vector similarity retrieval with ChromaDB vector database",
      "Contextual response generation powered by LangChain and Google Gemini LLM",
      "Document clustering & topic modeling using KMeans algorithms",
      "Experiment tracking, model lifecycle management, and artifact logging with MLflow",
    ],
    technologies: [
      "Python",
      "LangChain",
      "Hugging Face",
      "ChromaDB",
      "Gemini",
      "FastAPI",
      "PostgreSQL",
      "KMeans",
      "MLflow",
      "Docker",
      "Kubernetes",
      "GitHub Actions",
    ],
    pipeline: [
      { label: "PDF Documents", icon: FileText },
      { label: "Text Chunking", icon: Layers3 },
      { label: "ChromaDB Vector", icon: Database },
      { label: "LangChain", icon: GitBranch },
      { label: "Gemini LLM", icon: Bot },
      { label: "AI Response", icon: Sparkles },
    ],
    technicalDetails: [
      "Semantic chunking with token overlap to preserve technical context boundaries across multi-page manuals.",
      "KMeans vector space clustering for document categorization and retrieval filtering.",
      "MLflow experiment tracking recording embedding model versions and retrieval relevance evaluation scores.",
    ],
  },
];
