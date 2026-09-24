param(
    [string]$SourceImage = 'C:\Users\chaud\.gemini\antigravity\brain\5ccc7e1b-5a3a-4e9c-a55b-27bc5b27d796\.user_uploaded\media_1790057744288.jpg',
    [string]$OutputDir = 'public\images'
)

Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Bitmap]::FromFile($SourceImage)
$w = $src.Width
$h = $src.Height

# We want a clean interior photo without the left-side text.
# The right part from X=340 to 819, Y=40 to 560 is the pure interior photo.
$cleanRect = new-object System.Drawing.Rectangle 330, 40, ($w - 330), 520
$cropBmp = new-object System.Drawing.Bitmap $cleanRect.Width, $cleanRect.Height
$grp = [System.Drawing.Graphics]::FromImage($cropBmp)
$grp.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$grp.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$grp.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$destRect = new-object System.Drawing.Rectangle 0, 0, $cleanRect.Width, $cleanRect.Height
$grp.DrawImage($src, $destRect, $cleanRect, [System.Drawing.GraphicsUnit]::Pixel)
$grp.Dispose()
$cropBmp.Save("$OutputDir\hero_clean_interior.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)
$cropBmp.Dispose()

# Now let's create a wide composited hero background (1600 x 800)
# Left side is clean warm cream #faf8f5 with no text whatsoever.
# Right side has the beautiful interior photo, smoothly blended with a feathering gradient.
$canvasW = 1600
$canvasH = 800
$heroCanvas = new-object System.Drawing.Bitmap $canvasW, $canvasH
$canvGrp = [System.Drawing.Graphics]::FromImage($heroCanvas)
$canvGrp.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$canvGrp.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality

# Fill background with clean #faf8f5
$bgBrush = new-object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml('#faf8f5'))
$canvGrp.FillRectangle($bgBrush, 0, 0, $canvasW, $canvasH)
$bgBrush.Dispose()

# Draw the interior photo on the right: from X=650 to 1600 (width 950)
$photoDest = new-object System.Drawing.Rectangle 620, 0, 980, $canvasH
$photoSrc = new-object System.Drawing.Rectangle 330, 40, ($w - 330), 520
$canvGrp.DrawImage($src, $photoDest, $photoSrc, [System.Drawing.GraphicsUnit]::Pixel)

# Create a smooth soft gradient brush from #faf8f5 on the left to transparent to blend the seam
$blendRect = new-object System.Drawing.Rectangle 580, 0, 320, $canvasH
$colLeft = [System.Drawing.ColorTranslator]::FromHtml('#faf8f5')
$colRight = [System.Drawing.Color]::FromArgb(0, 250, 248, 245)
$linearMode = [System.Drawing.Drawing2D.LinearGradientMode]::Horizontal
$gradBrush = [System.Drawing.Drawing2D.LinearGradientBrush]::new($blendRect, $colLeft, $colRight, $linearMode)
$canvGrp.FillRectangle($gradBrush, $blendRect)
$gradBrush.Dispose()

$canvGrp.Dispose()
$heroCanvas.Save("$OutputDir\hero_bg_clean.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)
$heroCanvas.Dispose()

$src.Dispose()
Write-Output "Clean hero assets generated successfully."
