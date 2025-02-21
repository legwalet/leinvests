#!/bin/bash

# Create the images directory if it doesn't exist
mkdir -p public/images/services

# List of services that need images
SERVICES=(
  "logo-design"
  "branding"
  "vinyl-banners"
  "business-cards"
  "flyers"
)

# Download placeholder images
for service in "${SERVICES[@]}"
do
  curl "https://source.unsplash.com/800x600/?${service}" > "public/images/services/${service}.jpg"
done

echo "Images downloaded successfully!" 