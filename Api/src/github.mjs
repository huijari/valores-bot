const baseURL = process.env.GITHUB_API

/**
 * Fetches repository list from github, sorted by creation date in ascending order
 *
 * @param org - The organization id
 */
export async function getRepos (org) {
  const searchParams = new URLSearchParams()
  searchParams.set('sort', 'created')
  searchParams.set('direction', 'asc')
  searchParams.set('per_page', 100)
  const response = await fetch(`${baseURL}/orgs/${org}/repos?${searchParams}`)
  const body = await response.json()
  if (response.status === 404) return { notFound: true }
  if (response.status !== 200) throw new Error(body.message)
  return body
}

/**
 * Filters a list of repositories by language and limits the number of entries
 *
 * @param repos - The list to be filtered
 * @param quantity - The maximum number of entries in the result
 * @param language - Optional language filter
 */
export function filterRepos (repos, quantity, language) {
  const result = []
  for (const repo of repos) {
    if (result.length === quantity) break
    if (repo.language === language || language == null) {
      result.push({
        name: repo.full_name,
        description: repo.description,
        avatar: repo.owner.avatar_url
      })
    }
  }
  return result
}
