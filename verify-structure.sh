#!/bin/bash

# Make script executable
chmod +x verify-structure.sh

# Create necessary directories
mkdir -p src/pages/admin
mkdir -p src/config
mkdir -p src/components/auth
mkdir -p src/components/common
mkdir -p src/contexts

# Verify files exist
files=(
  "src/pages/admin/Dashboard.tsx"
  "src/pages/admin/Login.tsx"
  "src/config/firebase.ts"
  "src/components/auth/ProtectedRoute.tsx"
  "src/components/common/LoadingSpinner.tsx"
  "src/contexts/AuthContext.tsx"
)

for file in "${files[@]}"; do
  if [ ! -f "$file" ]; then
    echo "Missing file: $file"
  else
    echo "Found file: $file"
  fi
done 