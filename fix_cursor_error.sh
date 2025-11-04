#!/bin/bash

# Quick Fix Script for Cursor Serialization Error
# Run with: bash fix_cursor_error.sh

set -e

echo "=================================================="
echo "Cursor Serialization Error Fix Script"
echo "=================================================="
echo ""

# Detect OS
OS="$(uname -s)"
case "${OS}" in
    Linux*)     MACHINE=Linux;;
    Darwin*)    MACHINE=Mac;;
    *)          MACHINE="UNKNOWN:${OS}"
esac

echo "Detected OS: ${MACHINE}"
echo ""

# Function to fix Linux
fix_linux() {
    echo "Clearing Cursor cache and data..."
    
    # Backup settings
    if [ -f ~/.cursor/User/settings.json ]; then
        cp ~/.cursor/User/settings.json ~/cursor_settings_backup.json
        echo "✓ Settings backed up to ~/cursor_settings_backup.json"
    fi
    
    # Clear cache directories
    rm -rf ~/.cursor/User/globalStorage
    rm -rf ~/.cursor/Cache
    rm -rf ~/.cursor/CachedData
    rm -rf ~/.cursor/GPUCache
    rm -rf ~/.cursor/Code\ Cache
    
    echo "✓ Cursor cache cleared"
    
    # Clear workspace state
    if [ -d .cursor ]; then
        rm -rf .cursor
        echo "✓ Workspace .cursor folder cleared"
    fi
    
    if [ -d .vscode ]; then
        rm -rf .vscode
        echo "✓ Workspace .vscode folder cleared"
    fi
}

# Function to fix Mac
fix_mac() {
    echo "Clearing Cursor cache and data..."
    
    # Backup settings
    if [ -f ~/Library/Application\ Support/Cursor/User/settings.json ]; then
        cp ~/Library/Application\ Support/Cursor/User/settings.json ~/cursor_settings_backup.json
        echo "✓ Settings backed up to ~/cursor_settings_backup.json"
    fi
    
    # Clear cache directories
    rm -rf ~/Library/Application\ Support/Cursor/User/globalStorage
    rm -rf ~/Library/Application\ Support/Cursor/Cache
    rm -rf ~/Library/Application\ Support/Cursor/CachedData
    rm -rf ~/Library/Application\ Support/Cursor/GPUCache
    rm -rf ~/Library/Caches/Cursor
    
    echo "✓ Cursor cache cleared"
    
    # Clear workspace state
    if [ -d .cursor ]; then
        rm -rf .cursor
        echo "✓ Workspace .cursor folder cleared"
    fi
    
    if [ -d .vscode ]; then
        rm -rf .vscode
        echo "✓ Workspace .vscode folder cleared"
    fi
}

# Execute based on OS
case "${MACHINE}" in
    Linux)
        fix_linux
        ;;
    Mac)
        fix_mac
        ;;
    *)
        echo "Error: Unsupported OS. Please run manually based on your system."
        echo "See CURSOR_SERIALIZATION_ERROR_FIX.md for instructions."
        exit 1
        ;;
esac

echo ""
echo "=================================================="
echo "✓ Fix completed successfully!"
echo "=================================================="
echo ""
echo "Next steps:"
echo "1. Close Cursor completely (make sure it's not running)"
echo "2. Restart Cursor"
echo "3. Reopen your workspace"
echo ""
echo "If the issue persists:"
echo "- Check CURSOR_SERIALIZATION_ERROR_FIX.md for more solutions"
echo "- Ensure you're using the latest Cursor version"
echo "- Check your internet connection"
echo ""
