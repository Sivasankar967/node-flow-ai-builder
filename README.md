# VectorShift Pipeline Builder

A modern, node-based pipeline builder built with **React (ReactFlow)** and **FastAPI**. This project was developed as part of the VectorShift Frontend Technical Assessment.

## 🚀 Features

### 1. Advanced Node Abstraction
- **BaseNode Component**: A highly reusable abstraction for creating new nodes in seconds.
- **9 Node Types**: 
    - **Core**: Input, Output, LLM, Text.
    - **Custom Utilities**: Filter, Merge, Transform, API Call, Note.

### 2. Premium Design System
- Dark-themed UI with a glassmorphism aesthetic.
- Gradient-coded node headers for high visual clarity.
- Responsive sidebar for easy drag-and-drop node creation.
- Custom styled ReactFlow controls and minimap.

### 3. Dynamic Text Node Logic
- **Auto-resize**: Text area expands dynamically as you type.
- **Variable Handles**: Automatically detects valid JS variables inside `{{double_curly_brackets}}` and generates corresponding input handles on the fly.

### 4. Backend Validation
- **DAG Detection**: Real-time validation of the pipeline graph to ensure it is a Directed Acyclic Graph (cycle detection).
- **Pipeline Analysis**: Returns node count, edge count, and graph validity.

---

## 🛠️ Setup & Installation

### Prerequisites
- Node.js (v16+)
- Python (v3.9+)

### 1. Frontend Setup
```bash
cd frontend
npm install
npm start
```
The app will be available at `http://localhost:3000`.

### 2. Backend Setup
```bash
cd backend
# Recommended: Use a virtual environment
python -m venv .venv
source .venv/bin/activate  # Or .venv\Scripts\activate on Windows
pip install fastapi uvicorn
uvicorn main:app --reload
```
The API serves at `http://localhost:8000`.

---

## 📖 Usage
1. Drag nodes from the left **sidebar** onto the canvas.
2. Connect nodes by dragging between handles.
3. In the **Text** node, try typing `Hello {{name}}` to see a new handle appear.
4. Click **Submit Pipeline** at the bottom to analyze your graph structure.

---

## 📝 Technologies Used
- **Frontend**: React, ReactFlow, Zustand, Vanilla CSS.
- **Backend**: Python, FastAPI, Pydantic.
