#!/bin/bash

# Get project name from user
read -p "Enter new project name: " PROJECT_NAME

if [ -z "$PROJECT_NAME" ]; then
  echo "Error: Project name cannot be empty"
  exit 1
fi

# Check if directory already exists
if [ -d "$PROJECT_NAME" ]; then
  echo "Error: Directory $PROJECT_NAME already exists"
  exit 1
fi

echo "Creating project: $PROJECT_NAME"
echo "Downloading template from GitHub..."

# Use degit to download template (replace with your GitHub username)
npx degit leonwgc/ant-admin-template "$PROJECT_NAME"

if [ $? -ne 0 ]; then
  echo "Error: Failed to download template"
  exit 1
fi

# Navigate to project directory
cd "$PROJECT_NAME"

echo "Installing dependencies..."
pnpm install

if [ $? -ne 0 ]; then
  echo "Warning: Failed to install dependencies. Please run 'pnpm install' manually"
fi

echo ""
echo "✅ Project created successfully!"
echo ""
echo "To get started:"
echo "  cd $PROJECT_NAME"
echo "  pnpm dev"
echo ""
