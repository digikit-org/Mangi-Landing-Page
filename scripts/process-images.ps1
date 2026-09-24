param(
    [string]$SourceImage = 'C:\Users\chaud\.gemini\antigravity\brain\5ccc7e1b-5a3a-4e9c-a55b-27bc5b27d796\.user_uploaded\media_1790057744288.jpg',
    [string]$OutputDir = 'public\images'
)

Add-Type -AssemblyName System.Drawing

if (!(Test-Path $OutputDir)) {
    New-Item -ItemType Directory -Force -Path $OutputDir | Out-Null
}

$src = [System.Drawing.Bitmap]::FromFile($SourceImage)
$w = $src.Width
$h = $src.Height
Write-Output "Source Dimensions: $w x $h"

# 1. Copy the full image
$src.Save("$OutputDir\full_mockup.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)
Write-Output "Saved full mockup"

# Function to crop and save
function Crop-Image($bitmap, $rect, $outputPath) {
    $cropBmp = new-object System.Drawing.Bitmap $rect.Width, $rect.Height
    $grp = [System.Drawing.Graphics]::FromImage($cropBmp)
    $grp.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $grp.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $grp.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $destRect = new-object System.Drawing.Rectangle 0, 0, $rect.Width, $rect.Height
    $grp.DrawImage($bitmap, $destRect, $rect, [System.Drawing.GraphicsUnit]::Pixel)
    $grp.Dispose()
    $cropBmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $cropBmp.Dispose()
    Write-Output "Saved $outputPath"
}

# In an 819 x 1024 image:
# The hero background is approximately from Y=0 to Y=550
# The 4 cards are located approximately at Y=720 to Y=850
# Let's crop the hero background:
$heroRect = new-object System.Drawing.Rectangle 0, 0, $w, 560
Crop-Image $src $heroRect "$OutputDir\hero_bg.jpg"

# The 4 cards:
# Cards row is between Y=725 and Y=845, with roughly equal width across 4 columns
# 819 total width. Padding left ~25px, padding right ~25px -> usable ~769px.
# 4 cards with ~12px gap: 769 - 36 = 733 / 4 ≈ 180px each.
# Card 1: X≈25, Y≈725, W≈184, H≈116
# Card 2: X≈220, Y≈725, W≈184, H≈116
# Card 3: X≈415, Y≈725, W≈184, H≈116
# Card 4: X≈610, Y≈725, W≈184, H≈116

$card1Rect = new-object System.Drawing.Rectangle 25, 725, 185, 116
Crop-Image $src $card1Rect "$OutputDir\card_corporate.jpg"

$card2Rect = new-object System.Drawing.Rectangle 220, 725, 185, 116
Crop-Image $src $card2Rect "$OutputDir\card_meeting.jpg"

$card3Rect = new-object System.Drawing.Rectangle 413, 725, 185, 116
Crop-Image $src $card3Rect "$OutputDir\card_collaboration.jpg"

$card4Rect = new-object System.Drawing.Rectangle 609, 725, 185, 116
Crop-Image $src $card4Rect "$OutputDir\card_reception.jpg"

# Also extract the hero interior right half (the pure photo area)
$interiorHero = new-object System.Drawing.Rectangle 330, 60, 480, 480
Crop-Image $src $interiorHero "$OutputDir\hero_interior.jpg"

$src.Dispose()
Write-Output "Image processing complete."
