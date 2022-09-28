import fs from 'node:fs'
import path from 'node:path'
import { Options as ExecaOptions, ExecaReturnValue, execa } from 'execa'
import colors from 'picocolors'
import semver, { ReleaseType } from 'semver'

export const versionIncrements: ReleaseType[] = [
  'patch',
  'minor',
  'major'
]

interface Pkg {
  name: string
  version: string
  private?: boolean
}
export function getPackageInfo(): {
  pkg: Pkg
  pkgPath: string
  currentVersion: string
} {
  const pkgPath = path.resolve(__dirname, '../package.json')
  const pkg: Pkg = require(pkgPath)

  if (pkg.private) {
    throw new Error('Package is private')
  }

  return {
    pkg,
    pkgPath,
    currentVersion: pkg.version
  }
}

export async function run(
  bin: string,
  args: string[],
  opts: ExecaOptions<string> = {}
): Promise<ExecaReturnValue<string>> {
  return execa(bin, args, { stdio: 'inherit', ...opts })
}

export function step(msg: string): void {
  return console.log(`\n${colors.cyan(msg)}`)
}

export function getVersionChoices(version: string, tag?: string): {
  title: string
  value: string
}[] {
  return versionIncrements.map((i) => {
    const value = semver.inc(version, i, tag)!

    return {
      title: `${i} (${value})`,
      value
    }
  })
}

export function updateVersion(pkgPath: string, version: string): void {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))

  pkg.version = version

  return fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`)
}
