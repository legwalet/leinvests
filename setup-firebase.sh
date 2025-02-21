#!/bin/bash

# Check if .env file exists
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cp .env.example .env
fi

# Prompt for Firebase configuration
echo "Please enter your Firebase configuration:"
read -p "API Key: " api_key
read -p "Auth Domain: " auth_domain
read -p "Project ID: " project_id
read -p "Storage Bucket: " storage_bucket
read -p "Messaging Sender ID: " messaging_sender_id
read -p "App ID: " app_id

# Update .env file
sed -i '' "s|VITE_FIREBASE_API_KEY=.*|VITE_FIREBASE_API_KEY=$api_key|" .env
sed -i '' "s|VITE_FIREBASE_AUTH_DOMAIN=.*|VITE_FIREBASE_AUTH_DOMAIN=$auth_domain|" .env
sed -i '' "s|VITE_FIREBASE_PROJECT_ID=.*|VITE_FIREBASE_PROJECT_ID=$project_id|" .env
sed -i '' "s|VITE_FIREBASE_STORAGE_BUCKET=.*|VITE_FIREBASE_STORAGE_BUCKET=$storage_bucket|" .env
sed -i '' "s|VITE_FIREBASE_MESSAGING_SENDER_ID=.*|VITE_FIREBASE_MESSAGING_SENDER_ID=$messaging_sender_id|" .env
sed -i '' "s|VITE_FIREBASE_APP_ID=.*|VITE_FIREBASE_APP_ID=$app_id|" .env

echo "Firebase configuration has been set up!" 