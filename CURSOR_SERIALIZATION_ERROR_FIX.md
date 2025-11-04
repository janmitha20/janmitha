# Fix: Cursor Serialization Error in aiserver.v1

## Error
```
ConnectError: [internal] Serialization error in aiserver.v1.StreamUnifiedChatRequestWithTools
```

## Root Cause
This error occurs when Cursor's AI client cannot properly serialize requests to the AI server. Common causes:
- Corrupted cache or workspace state
- Very large context or file selections
- Invalid characters or malformed data in the workspace
- Cursor version/protocol mismatch

## Solutions (Try in order)

### 1. Clear Cursor Cache and Restart
```bash
# Linux
rm -rf ~/.cursor/User/globalStorage
rm -rf ~/.cursor/Cache
rm -rf ~/.cursor/CachedData

# Windows (PowerShell)
Remove-Item -Recurse -Force "$env:APPDATA\Cursor\User\globalStorage"
Remove-Item -Recurse -Force "$env:APPDATA\Cursor\Cache"
Remove-Item -Recurse -Force "$env:APPDATA\Cursor\CachedData"

# macOS
rm -rf ~/Library/Application\ Support/Cursor/User/globalStorage
rm -rf ~/Library/Application\ Support/Cursor/Cache
rm -rf ~/Library/Application\ Support/Cursor/CachedData
```

Then restart Cursor completely.

### 2. Clear Workspace State
```bash
# In your workspace directory
rm -rf .cursor
rm -rf .vscode
```

Restart Cursor and reopen the workspace.

### 3. Check for Problematic Files
Look for files with:
- Very large size (>10MB)
- Binary content being indexed
- Special/invalid characters in filenames or content

Create or update `.cursorignore`:
```
node_modules/
*.log
*.bin
*.exe
dist/
build/
.git/
*.sqlite
*.db
```

### 4. Reduce Context Size
If error occurs during chat:
- Clear chat history
- Deselect large files from context
- Use smaller code selections
- Disable auto-context features temporarily

### 5. Update/Reinstall Cursor
```bash
# Download latest version from https://cursor.sh
# Completely uninstall current version
# Install fresh copy
```

### 6. Check Network/Proxy Settings
If behind a corporate proxy:
```json
// settings.json
{
  "http.proxy": "http://proxy.company.com:8080",
  "http.proxyStrictSSL": false
}
```

### 7. Debug Mode Investigation
```bash
# Launch Cursor with logging
cursor --verbose --log debug

# Check logs at:
# Linux: ~/.cursor/logs
# Windows: %APPDATA%\Cursor\logs
# macOS: ~/Library/Logs/Cursor
```

## Quick Fix Script (Linux/macOS)

```bash
#!/bin/bash
echo "Fixing Cursor serialization error..."

# Backup current settings
cp -r ~/.cursor/User/settings.json ~/cursor_settings_backup.json 2>/dev/null

# Clear cache
rm -rf ~/.cursor/User/globalStorage
rm -rf ~/.cursor/Cache
rm -rf ~/.cursor/CachedData
rm -rf ~/.cursor/GPUCache

# Clear workspace state
rm -rf .cursor
rm -rf .vscode

echo "Cache cleared. Please restart Cursor."
echo "Settings backup saved to ~/cursor_settings_backup.json"
```

## Prevention

1. **Regular cleanup**: Clear cache weekly if using Cursor heavily
2. **Proper .cursorignore**: Exclude large/binary files
3. **Monitor context size**: Don't select too many large files
4. **Keep updated**: Use latest Cursor version
5. **Stable network**: Ensure reliable internet connection

## Still Not Working?

1. Check Cursor status: https://status.cursor.sh
2. Report to Cursor team with:
   - Error message
   - Cursor version (`Help > About`)
   - OS and version
   - Steps to reproduce
   - Log files from debug mode

## Related Issues
- Request timeout errors
- "Failed to fetch" errors
- AI completions not working
- Chat becoming unresponsive
