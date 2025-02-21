#!/bin/bash

# Create directories if they don't exist
mkdir -p public/images/services

# Function to check and download missing image
check_and_download() {
  local id=$1
  local search_term=$2
  local file_path="public/images/services/${id}.jpg"
  
  if [ ! -f "$file_path" ] || [ ! -s "$file_path" ]; then
    echo "Downloading missing image for ${id}..."
    curl -L "https://source.unsplash.com/800x600/?${search_term}" > "$file_path"
    sleep 1
  fi
}

# Service categories
declare -A CATEGORIES=(
  ["graphic-design"]="graphic+design+studio"
  ["banners"]="banner+printing"
  ["business-cards"]="business+cards+print"
  ["flyers"]="flyer+printing"
  ["flags"]="advertising+flags"
  ["digital-printing"]="digital+printing+service"
  ["posters"]="poster+printing"
  ["lamination"]="document+lamination"
)

# Products
declare -A PRODUCTS=(
  ["logo-design"]="logo+design"
  ["branding"]="brand+identity+design"
  ["social-media"]="social+media+design"
  ["vinyl-banners"]="vinyl+banner+outdoor"
  ["mesh-banners"]="mesh+banner+construction"
  ["pull-up-banners"]="roll+up+banner+display"
  ["standard-cards"]="standard+business+cards"
  ["premium-cards"]="luxury+business+cards"
  ["square-cards"]="square+business+cards"
  ["standard-flyers"]="promotional+flyers"
  ["premium-flyers"]="premium+flyers+print"
  ["feather-flags"]="feather+flag+outdoor"
  ["teardrop-flags"]="teardrop+flag+display"
  ["document-printing"]="document+printing+service"
  ["photo-printing"]="photo+printing+service"
  ["large-format"]="large+format+printing"
  ["standard-posters"]="poster+printing+service"
  ["photo-posters"]="photo+poster+print"
  ["gloss-lamination"]="gloss+lamination"
  ["matte-lamination"]="matte+lamination"
)

# Check and download category images
echo "Verifying category images..."
for category in "${!CATEGORIES[@]}"; do
  check_and_download "$category" "${CATEGORIES[$category]}"
done

# Check and download product images
echo "Verifying product images..."
for product in "${!PRODUCTS[@]}"; do
  check_and_download "$product" "${PRODUCTS[$product]}"
done

# Ensure placeholder image exists
echo "Verifying placeholder image..."
if [ ! -f "public/images/services/placeholder.jpg" ] || [ ! -s "public/images/services/placeholder.jpg" ]; then
  curl "https://via.placeholder.com/800x600.png?text=Image+Not+Available" > "public/images/services/placeholder.jpg"
fi

echo "All images verified and downloaded if needed!" 