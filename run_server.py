#!/usr/bin/env python3
"""
Career Skills Advisor Backend Server
Run this script to start the Flask backend server
"""

import os
import sys
import subprocess

def check_python_version():
    """Check if Python version is compatible"""
    if sys.version_info < (3, 7):
        print("Error: Python 3.7 or higher is required")
        sys.exit(1)

def install_requirements():
    """Install required packages"""
    try:
        print("Installing required packages...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("✅ Packages installed successfully!")
    except subprocess.CalledProcessError:
        print("❌ Failed to install packages. Please install manually:")
        print("pip install -r requirements.txt")
        sys.exit(1)

def start_server():
    """Start the Flask server"""
    print("🚀 Starting Career Skills Advisor Backend Server...")
    print("📡 Server will be available at: http://localhost:5000")
    print("🌐 Frontend will be available at: http://localhost:5000")
    print("⏹️  Press Ctrl+C to stop the server")
    print("-" * 50)
    
    try:
        from app import app
        app.run(debug=True, host='0.0.0.0', port=5000)
    except ImportError as e:
        print(f"❌ Error importing app: {e}")
        print("Make sure all files are in the same directory")
        sys.exit(1)
    except KeyboardInterrupt:
        print("\n👋 Server stopped. Goodbye!")
    except Exception as e:
        print(f"❌ Error starting server: {e}")
        sys.exit(1)

def main():
    """Main function"""
    print("🎓 Career Skills Advisor Backend Server")
    print("=" * 50)
    
    # Check Python version
    check_python_version()
    
    # Check if requirements.txt exists
    if not os.path.exists("requirements.txt"):
        print("❌ requirements.txt not found!")
        sys.exit(1)
    
    # Check if app.py exists
    if not os.path.exists("app.py"):
        print("❌ app.py not found!")
        sys.exit(1)
    
    # Install requirements
    install_requirements()
    
    # Start server
    start_server()

if __name__ == "__main__":
    main()
