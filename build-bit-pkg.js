const { execSync } = require('child_process')

// Get the last argument from process.argv
const args = process.argv.slice(2)
const packageName = args[args.length - 1]

if (!packageName) {
  console.error('Please specify a package name.')
  process.exit(1)
}

// Run the build command with the specified package name
const buildCommand = `cd ./packages/${packageName} && pnpm run build && cp -r ./dist/* ../../../assets`
execSync(buildCommand, { stdio: 'inherit' })
