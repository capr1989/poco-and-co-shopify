$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$lock = Get-Content -Raw (Join-Path $projectRoot 'docs/upstream-lock.json') | ConvertFrom-Json
foreach ($name in @('dawn', 'horizon')) {
  $source = $lock.themes.$name
  $target = Join-Path $projectRoot ('work/upstream/' + $name)
  if (-not (Test-Path -LiteralPath (Join-Path $target '.git'))) {
    New-Item -ItemType Directory -Force -Path $target | Out-Null
    git -C $target init --quiet
    if ($LASTEXITCODE -ne 0) { throw 'git init failed' }
    git -C $target remote add origin $source.repository
    if ($LASTEXITCODE -ne 0) { throw 'git remote add failed' }
    git -C $target fetch --depth 1 origin $source.commit
    if ($LASTEXITCODE -ne 0) { throw 'git fetch failed' }
    git -C $target checkout --detach FETCH_HEAD
    if ($LASTEXITCODE -ne 0) { throw 'git checkout failed' }
  }
  $actual = git -C $target rev-parse HEAD
  if ($actual -ne $source.commit) { throw ('Unexpected upstream revision: ' + $name) }
  Write-Output ($name + ': ' + $actual)
}
