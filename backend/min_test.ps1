$baseUrl = "http://localhost:5000/api"
$testEmail = "test_" + (Get-Random) + "@test.com"
$testPass = "Pass123!"

try {
    Write-Host "Registering..."
    $r = Invoke-RestMethod -Uri "$baseUrl/auth/register" -Method Post -Body (@{name = "T"; email = $testEmail; password = $testPass } | ConvertTo-Json) -ContentType "application/json"
    $token = $r.token
    $h = @{ Authorization = "Bearer $token" }
    
    Write-Host "Testing AI Gen..."
    $g = Invoke-RestMethod -Uri "$baseUrl/ai/generate-ideas" -Method Post -Body (@{industry = "Tech"; problem = "X"; technology = "Y"; budget = "Z"; targetAudience = "A" } | ConvertTo-Json) -ContentType "application/json" -Headers $h
    Write-Host "Result: $($g.ideas.Count) ideas"
}
catch {
    Write-Host "Error: $_"
}
