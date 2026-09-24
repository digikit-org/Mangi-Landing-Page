param(
    [string]$SourceImage = 'C:\Users\chaud\.gemini\antigravity\brain\5ccc7e1b-5a3a-4e9c-a55b-27bc5b27d796\.user_uploaded\media_1790057744288.jpg',
    [string]$OutputDir = 'public\images'
)

Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Bitmap]::FromFile($SourceImage)
$w = $src.Width   # 819
$h = $src.Height  # 1024

# Create a full clean hero bitmap of the upper photo region (from Y=0 to Y=560)
$heroRect = [System.Drawing.Rectangle]::new(0, 0, $w, 560)
$cleanHero = [System.Drawing.Bitmap]::new($w, 560)
$g = [System.Drawing.Graphics]::FromImage($cleanHero)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.DrawImage($src, 0, 0, $heroRect, [System.Drawing.GraphicsUnit]::Pixel)

# 1. Paint over the top-right text "DESIGN . BUILD . INSPIRE" (approx X=450 to 819, Y=0 to 50)
# The ceiling right there is off-white (#FAF8F5 to #F4EFEB).
# We can clone from a clean band of the ceiling (e.g. Y=52 to Y=70, X=450 to 819) or fill with the ceiling color.
$ceilingSample = $src.GetPixel(600, 15)
$ceilingBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(250, 248, 245))
$g.FillRectangle($ceilingBrush, [System.Drawing.Rectangle]::new(450, 0, 369, 52))
$ceilingBrush.Dispose()

# 2. On the left side (X: 0 to 365, Y: 0 to 560), the flyer had big text:
# "Commercial Spaces Designed to Perform."
# Let's cleanly paint the entire left area with the warm luxury cream background (#FAF8F5),
# and smoothly blend it into the photo between X=340 and X=480 so the photo starts cleanly with the glass meeting room!
$leftBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(250, 248, 245))
$g.FillRectangle($leftBrush, [System.Drawing.Rectangle]::new(0, 0, 350, 560))
$leftBrush.Dispose()

# Smooth feather gradient between X=330 and X=460
$blendRect = [System.Drawing.Rectangle]::new(330, 0, 140, 560)
$colLeft = [System.Drawing.Color]::FromArgb(255, 250, 248, 245)
$colRight = [System.Drawing.Color]::FromArgb(0, 250, 248, 245)
$gradBrush = [System.Drawing.Drawing2D.LinearGradientBrush]::new($blendRect, $colLeft, $colRight, [System.Drawing.Drawing2D.LinearGradientMode]::Horizontal)
$g.FillRectangle($gradBrush, $blendRect)
$gradBrush.Dispose()

$g.Dispose()

# Save as public\images\hero_full_clean.jpg
$cleanHero.Save("$OutputDir\hero_full_clean.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)
$cleanHero.Save("dist\images\hero_full_clean.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)
$cleanHero.Dispose()

# Also create an ultra-wide (1920x950) version for widescreen monitors where the photo is on the right,
# perfectly feathered, and left is 100% clean cream.
$wideHero = [System.Drawing.Bitmap]::new(1920, 950)
$gw = [System.Drawing.Graphics]::FromImage($wideHero)
$gw.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$gw.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality

$creamBg = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(250, 248, 245))
$gw.FillRectangle($creamBg, [System.Drawing.Rectangle]::new(0, 0, 1920, 950))
$creamBg.Dispose()

# Draw the clean photo on the right: from X=750 to 1920 (width 1170, height 950)
# Source is from X=365, Y=45 to X=819, Y=560 in $src
$srcPhotoRect = [System.Drawing.Rectangle]::new(360, 48, (819 - 360), (560 - 48))
$destPhotoRect = [System.Drawing.Rectangle]::new(720, 0, 1200, 950)
$gw.DrawImage($src, $destPhotoRect, $srcPhotoRect, [System.Drawing.GraphicsUnit]::Pixel)

# Smooth gradient blend over the transition
$wideBlend = [System.Drawing.Rectangle]::new(680, 0, 300, 950)
$gradBrushWide = [System.Drawing.Drawing2D.LinearGradientBrush]::new($wideBlend, $colLeft, $colRight, [System.Drawing.Drawing2D.LinearGradientMode]::Horizontal)
$gw.FillRectangle($gradBrushWide, $wideBlend)
$gradBrushWide.Dispose()

$gw.Dispose()
$wideHero.Save("$OutputDir\hero_widescreen_clean.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)
$wideHero.Save("dist\images\hero_widescreen_clean.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)
$wideHero.Dispose()

$src.Dispose()
Write-Output "Generated clean hero_full_clean.jpg and hero_widescreen_clean.jpg with NO text!"
