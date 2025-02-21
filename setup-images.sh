#!/bin/bash

# Create main directories
mkdir -p public/images/{services,products,banners,backgrounds}

# Create service category directories
mkdir -p public/images/services/{graphic-design,digital-printing,banners,flags,posters,lamination}

# Create product directories
mkdir -p public/images/products/{business-cards,flyers,brochures,stickers,pull-up-banners,vinyl-banners}

# Create placeholder structure file
cat > public/images/README.md << 'EOF'
# Image Directory Structure

## Services Category Images (800x600px)
/images/services/
├── graphic-design.jpg     # Main graphic design category image
├── digital-printing.jpg   # Main digital printing category image
├── banners.jpg           # Main banners category image
├── flags.jpg             # Main flags category image
├── posters.jpg           # Main posters category image
└── lamination.jpg        # Main lamination category image

## Product Images (800x600px)
/images/products/
├── business-cards/       # Business card product images
│   ├── standard.jpg      # Standard business cards
│   ├── premium.jpg       # Premium business cards
│   └── luxury.jpg        # Luxury business cards
├── flyers/              # Flyer product images
│   ├── a4.jpg           # A4 flyers
│   ├── a5.jpg           # A5 flyers
│   └── dl.jpg           # DL flyers
├── brochures/           # Brochure product images
│   ├── bifold.jpg       # Bi-fold brochures
│   ├── trifold.jpg      # Tri-fold brochures
│   └── catalog.jpg      # Catalog brochures
├── stickers/            # Sticker product images
│   ├── vinyl.jpg        # Vinyl stickers
│   ├── paper.jpg        # Paper stickers
│   └── clear.jpg        # Clear stickers
├── pull-up-banners/     # Pull-up banner images
│   ├── economy.jpg      # Economy pull-up banners
│   ├── standard.jpg     # Standard pull-up banners
│   └── premium.jpg      # Premium pull-up banners
└── vinyl-banners/       # Vinyl banner images
    ├── indoor.jpg       # Indoor vinyl banners
    ├── outdoor.jpg      # Outdoor vinyl banners
    └── mesh.jpg         # Mesh vinyl banners

## Other Images
/images/banners/         # Website banner images (1920x400px)
└── hero-banner.jpg      # Homepage hero banner

/images/backgrounds/     # Background images (various sizes)
├── pattern.jpg         # Pattern background
└── texture.jpg         # Texture background

## Image Specifications
- Service category images: 800x600px, JPG format
- Product images: 800x600px, JPG format
- Banner images: 1920x400px, JPG format
- Background images: Various sizes as needed
- All images should be optimized for web (compressed)
EOF

# Create placeholder images with labels
create_placeholder() {
    local path=$1
    local text=$2
    local size=${3:-"800x600"}
    
    convert -size $size xc:lightgray -gravity center \
        -pointsize 30 -annotate 0 "$text" \
        -pointsize 20 -annotate +0+50 "${size}px" \
        "$path"
}

# Create service category placeholders
for category in graphic-design digital-printing banners flags posters lamination; do
    create_placeholder "public/images/services/${category}.jpg" "${category//-/ } Category"
done

# Create product placeholders
declare -A products=(
    ["business-cards"]="standard premium luxury"
    ["flyers"]="a4 a5 dl"
    ["brochures"]="bifold trifold catalog"
    ["stickers"]="vinyl paper clear"
    ["pull-up-banners"]="economy standard premium"
    ["vinyl-banners"]="indoor outdoor mesh"
)

for category in "${!products[@]}"; do
    for product in ${products[$category]}; do
        create_placeholder "public/images/products/${category}/${product}.jpg" "${category//-/ } - ${product//-/ }"
    done
done

# Create banner placeholders
create_placeholder "public/images/banners/hero-banner.jpg" "Hero Banner" "1920x400"

# Create background placeholders
create_placeholder "public/images/backgrounds/pattern.jpg" "Pattern Background"
create_placeholder "public/images/backgrounds/texture.jpg" "Texture Background"

echo "Image directory structure created successfully!"
echo "See public/images/README.md for the complete structure and specifications." 