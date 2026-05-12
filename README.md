# CAT Offline Calculator

An offline, floating desktop calculator for CAT exam practice. The app recreates the compact CAT-style on-screen calculator experience in a small always-on-top Windows window, so you can keep it beside mock tests, PDFs, and practice questions.

> This is an independent practice tool. It is not affiliated with, endorsed by, or distributed by IIMs or the official CAT exam authorities.

## Highlights

- CAT-style calculator layout for familiar mock-test practice
- Small floating desktop window
- Always-on-top behavior
- Works offline after setup
- Simple double-click launcher for Windows users
- Portable `.exe` and installer build support
- Built with Electron, Vite, TypeScript, and plain JavaScript calculator logic

## Quick Start

Download or open the portable app:

```text
release\CAT On-Screen Calculator 2026 1.0.0.exe
```

No installation is needed for this file.

If you are working from the source project, you can also double-click:

```text
Run Floating Calculator.bat
```

The launcher will:

1. Open the built calculator immediately if it already exists.
2. Install dependencies if `node_modules` is missing.
3. Build the desktop app if the `.exe` is missing.
4. Launch the floating calculator.

## Run A Built Release

The repo includes the portable Windows `.exe`:

```text
release\CAT On-Screen Calculator 2026 1.0.0.exe
```

The installer is not committed to the repo. You can generate it locally with `npm run dist`.

## Developer Setup

Install dependencies:

```bash
npm install
```

Run the app in development mode:

```bash
npm run dev
```

Type-check the project:

```bash
npm run typecheck
```

Build the web and Electron output:

```bash
npm run build
```

Create the Windows installer and portable app:

```bash
npm run dist
```

The generated installer and unpacked build stay ignored by Git. Only the portable `.exe` is tracked for easy downloading.

## Project Structure

```text
electron/                  Electron main process and preload code
src/                       Calculator UI, styles, and calculator logic
build/icon.ico             Desktop app icon
Run Floating Calculator.bat Windows double-click launcher
Run-Floating-Calculator.ps1 Setup/build/run helper script
```

## Launcher Files

`Run Floating Calculator.bat` is the recommended file for normal use. It checks for an existing built app first, then falls back to the PowerShell setup helper when needed.

`Run-Floating-Calculator.ps1` contains the setup logic: it checks for `npm`, installs dependencies when missing, builds the release if needed, and opens the calculator.

## Author

Created by Devang Joshi.

- LinkedIn: https://www.linkedin.com/in/devang-joshi-/
- GitHub: https://github.com/coderdevang

## License

MIT License. See [LICENSE](LICENSE) for details.
