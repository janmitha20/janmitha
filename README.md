# Cursor Serialization Error Fix

## Problem
You're experiencing this error:
```
ConnectError: [internal] Serialization error in aiserver.v1.StreamUnifiedChatRequestWithTools
```

## Quick Fix

### Option 1: Run the automated fix script
```bash
bash fix_cursor_error.sh
```

### Option 2: Manual fix (Linux)
```bash
# Clear Cursor cache
rm -rf ~/.cursor/User/globalStorage
rm -rf ~/.cursor/Cache
rm -rf ~/.cursor/CachedData

# Clear workspace state
rm -rf .cursor .vscode

# Restart Cursor
```

### Option 3: Manual fix (Windows - PowerShell)
```powershell
# Clear Cursor cache
Remove-Item -Recurse -Force "$env:APPDATA\Cursor\User\globalStorage"
Remove-Item -Recurse -Force "$env:APPDATA\Cursor\Cache"
Remove-Item -Recurse -Force "$env:APPDATA\Cursor\CachedData"

# Clear workspace state
Remove-Item -Recurse -Force .cursor
Remove-Item -Recurse -Force .vscode

# Restart Cursor
```

## Files in this repository

- **CURSOR_SERIALIZATION_ERROR_FIX.md** - Comprehensive troubleshooting guide
- **fix_cursor_error.sh** - Automated fix script for Linux/macOS
- **.cursorignore** - Prevents indexing problematic files

## After fixing

1. Close Cursor completely
2. Restart Cursor
3. Reopen your workspace
4. The error should be resolved

If the issue persists, see `CURSOR_SERIALIZATION_ERROR_FIX.md` for additional solutions.