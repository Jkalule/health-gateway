# Create necessary directories if they don't exist
$directories = @(
    "client/public/images/diseases",
    "client/public/images/topics",
    "client/public/images/events",
    "client/public/images/resources"
)

foreach ($dir in $directories) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force
    }
}

# Image URLs and their corresponding local paths
$imageMap = @{
    # Disease images
    "https://www.who.int/images/default-source/health-topics/coronavirus/corona-virus-getty.tmb-1920v.jpg" = "client/public/images/diseases/covid-variant.jpg"
    "https://www.who.int/images/default-source/health-topics/marburg/marburg-virus.tmb-1920v.jpg" = "client/public/images/diseases/marburg.jpg"
    "https://www.who.int/images/default-source/health-topics/rift-valley-fever/rvf.tmb-1920v.jpg" = "client/public/images/diseases/rvf.jpg"
    "https://www.who.int/images/default-source/health-topics/cholera/cholera.tmb-1920v.jpg" = "client/public/images/diseases/cholera.jpg"
    "https://www.who.int/images/default-source/health-topics/ebola/ebola.tmb-1920v.jpg" = "client/public/images/diseases/ebola.jpg"

    # Topic images
    "https://www.who.int/images/default-source/health-topics/tuberculosis/tb.tmb-1920v.jpg" = "client/public/images/topics/tuberculosis.jpg"
    "https://www.who.int/images/default-source/health-topics/air-pollution/air-pollution.tmb-1920v.jpg" = "client/public/images/topics/air-quality.jpg"
    "https://www.who.int/images/default-source/urban-health/urban-health.tmb-1920v.jpg" = "client/public/images/topics/urban-health.jpg"
    "https://www.who.int/images/default-source/health-topics/malaria/malaria.tmb-1920v.jpg" = "client/public/images/topics/malaria.jpg"
    "https://www.who.int/images/default-source/mental-health/mental-health.tmb-1920v.jpg" = "client/public/images/topics/mental-health.jpg"
    "https://www.who.int/images/default-source/maternal-health/maternal-health.tmb-1920v.jpg" = "client/public/images/topics/maternal-health.jpg"

    # Event images
    "https://www.who.int/images/default-source/immunization/immunization.tmb-1920v.jpg" = "client/public/images/events/immunization-week.jpg"
    "https://www.who.int/images/default-source/mental-health/mental-health-awareness.tmb-1920v.jpg" = "client/public/images/events/mental-health-webinar.jpg"
    "https://www.who.int/images/default-source/health-workforce/health-workers.tmb-1920v.jpg" = "client/public/images/events/chw-training.jpg"
    "https://www.who.int/images/default-source/conferences/conference.tmb-1920v.jpg" = "client/public/images/events/health-summit.jpg"
    "https://www.who.int/images/default-source/health-topics/coronavirus/training.tmb-1920v.jpg" = "client/public/images/events/pandemic-workshop.jpg"

    # Resource images
    "https://www.who.int/images/default-source/health-topics/coronavirus/guidelines.tmb-1920v.jpg" = "client/public/images/resources/covid-guidelines.jpg"
    "https://www.who.int/images/default-source/countries/uganda/uganda-report.tmb-1920v.jpg" = "client/public/images/resources/health-report.jpg"
    "https://www.who.int/images/default-source/immunization/vaccination-study.tmb-1920v.jpg" = "client/public/images/resources/vaccination-study.jpg"
    "https://www.who.int/images/default-source/emergencies/preparedness.tmb-1920v.jpg" = "client/public/images/resources/preparedness-plan.jpg"
    "https://www.who.int/images/default-source/surveillance/surveillance.tmb-1920v.jpg" = "client/public/images/resources/surveillance-report.jpg"
}

# Download images
foreach ($url in $imageMap.Keys) {
    $destination = $imageMap[$url]
    Write-Host "Downloading $url to $destination"
    try {
        Invoke-WebRequest -Uri $url -OutFile $destination
        Write-Host "Successfully downloaded to $destination"
    }
    catch {
        Write-Host "Failed to download $url : $_"
    }
}
