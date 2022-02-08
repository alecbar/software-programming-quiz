# Software Programming Quiz Project

## Deployment 
Production version is live at: [Software Programming Quiz](https://software-programming-quiz.vercel.app)

## Local Development
Make sure you have your `.env.local` file at `/next-app/.env` setup correctly. 

Copy `.env.example` and rename it `.env.local` with the appropiate values.  

## Project Overview

### .github/workflows
Two GitHub Workflow Actions:
- Deploy AWS Resources defined in cloudformation/resources.yaml
- Update AWS Lambda functions defined in lambdas 

### cloudformation
Defines resource stack to be deployed to AWS for all services utilzied for this project. 

### database
Example queries for project database. 

### lambdas
Folders each Lambda function used for the project. These are called by some of the /api routes in next-app

### next-app
Next.js and React App hosted on Vercel. This is both the frontent + backend /api functions. 