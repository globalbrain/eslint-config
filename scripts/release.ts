import colors from 'picocolors'
import prompts from 'prompts'
import semver from 'semver'
import {
  getPackageInfo,
  getVersionChoices,
  run,
  step,
  updateVersion
} from './releaseUtils'

async function main() {
  let targetVersion: string | undefined

  const { currentVersion, pkgPath } = getPackageInfo()

  const { release }: { release: string } = await prompts({
    type: 'select',
    name: 'release',
    message: 'Select release type',
    choices: getVersionChoices(currentVersion)
  })

  if (release === 'custom') {
    const res: { version: string } = await prompts({
      type: 'text',
      name: 'version',
      message: 'Input custom version',
      initial: currentVersion
    })
    targetVersion = res.version
  }
  else {
    targetVersion = release
  }

  if (!semver.valid(targetVersion)) {
    throw new Error(`Invalid target version: ${targetVersion}`)
  }

  const { yes }: { yes: boolean } = await prompts({
    type: 'confirm',
    name: 'yes',
    message: `Releasing ${colors.yellow(`v${targetVersion}`)} Confirm?`
  })

  if (!yes) {
    return
  }

  step('Updating package version...')
  updateVersion(pkgPath, targetVersion)

  step('Generating changelog...')
  await run('conventional-changelog', ['-p', 'angular', '-i', 'CHANGELOG.md', '-s'])

  const { changelog }: { changelog: string } = await prompts({
    type: 'confirm',
    name: 'changelog',
    message: 'Commit changelog?'
  })

  if (!changelog) {
    return
  }

  const { stdout } = await run('git', ['diff'], { stdio: 'pipe' })
  if (stdout) {
    step('Committing changes...')
    await run('git', ['add', '-A'])
    await run('git', ['commit', '-m', `release: v${targetVersion}`])
  }
  else {
    console.log('No changes to commit.')
    return
  }

  step('Pushing to GitHub...')
  await run('git', ['tag', `v${targetVersion}`])
  await run('git', ['push', 'origin', `refs/tags/v${targetVersion}`])
  await run('git', ['push'])

  step('Publishing package...')
  await run('pnpm', ['publish', '--access', 'public', '--no-git-checks'])

  console.log()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
