$baseUrl = "https://ai-startup-idea-evaluator-and-generator-1.onrender.com/api"
$testEmail = "test_analyst_" + (Get-Random) + "@genesis.ai"
$testPass = "VentureLab2026!"

function RunTest {
    param($method, $endpoint, $body = $null)
    $uri = "$baseUrl$endpoint"
    $params = @{
        Uri         = $uri
        Method      = $method
        ContentType = "application/json"
    }
    if ($null -ne $body) { $params.Body = $body }
    if ($null -ne $token) { $params.Headers = @{ Authorization = "Bearer $token" } }
    
    return Invoke-RestMethod @params
}

Write-Host "🚀 GenesisAI API Testing..." -ForegroundColor Cyan

# 1. Register
$regBody = @{name = "Test Analyst"; email = $testEmail; password = $testPass } | ConvertTo-Json
try {
    $regRes = RunTest "Post" "/auth/register" $regBody
    $token = $regRes.token
    Write-Host "✅ User Registered." -ForegroundColor Green
}
catch {
    Write-Host "❌ Auth Failed: $_"
    try {
        $errObj = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($errObj)
        $res = $reader.ReadToEnd()
        Write-Host "Server Response: $res" -ForegroundColor Yellow
    }
    catch {}
    exit
}

# 2. Idea Gen
$genBody = @{ industry = "BioTech"; problem = "Health"; technology = "ML"; budget = "High"; targetAudience = "Global" } | ConvertTo-Json
try {
    $genRes = RunTest "Post" "/ai/generate-ideas" $genBody
    Write-Host "✅ Ideas Generated: $($genRes.ideas.Count)" -ForegroundColor Green
    $idea = $genRes.ideas[0]
}
catch {
    Write-Host "❌ Idea Gen Failed: $_"
}

# 3. Evaluation
if ($null -ne $idea) {
    $evalBody = @{ title = $idea.title; industry = "BioTech"; problem = "Health"; solution = $idea.description; targetAudience = "Global" } | ConvertTo-Json
    try {
        $evalRes = RunTest "Post" "/ai/evaluate-idea" $evalBody
        Write-Host "✅ Eval Score: $($evalRes.startupScore)% ($($evalRes.riskLevel) Risk)" -ForegroundColor Green
    }
    catch {
        Write-Host "❌ Evaluation Failed: $_"
    }
}

# 4. Discovery
try {
    Write-Host "🤖 Running Discovery Pipeline..."
    $discoRes = RunTest "Post" "/discovery/run-discovery"
    Write-Host "✅ Discovery Engine OK. Opps: $($discoRes.opportunities.Count)" -ForegroundColor Green
}
catch {
    Write-Host "❌ Discovery Agent Failed: $_"
}

Write-Host "🏁 Testing Finished." -ForegroundColor Cyan
