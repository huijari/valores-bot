import { NextResponse } from 'next/server'

import { getRepos, filterRepos } from '../../../src/github'

export async function GET (request, { params }) {
  const language = request.nextUrl.searchParams.get('lang')
  const quantity = parseInt(request.nextUrl.searchParams.get('quantity'))
  if (isNaN(quantity) || quantity < 0) {
    return NextResponse.json(
      { error: 'invalid quantity' },
      { status: 400 }
    )
  }

  const repos = await getRepos(params.org)
  if (repos.notFound) {
    return NextResponse.json(
      { error: 'organization repositories were not found' },
      { status: 404 }
    )
  }
  const filteredRepos = filterRepos(repos, quantity, language)

  // the list is returned as an object so we can use it in blip with @ notation
  return NextResponse.json(Object.assign({}, filteredRepos), { status: 200 })
}
