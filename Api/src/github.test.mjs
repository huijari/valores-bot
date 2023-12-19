import test from 'ava'

import { filterRepos } from './github.mjs'

test('quantity 0 returns no entries', t => {
  const repos = filterRepos([
    { name: 'first' },
    { name: 'second' }
  ], 0)
  t.is(repos.length, 0)
})

test('returns unmodified list when quantity greater than length', t => {
  const repos = filterRepos([
    { name: 'first', description: 'd', owner: { avatar: 'url' } },
    { name: 'second', description: 'd', owner: { avatar: 'url' } }
  ], 5)
  t.is(repos.length, 2)
})

test('limit list when quantity is less than length', t => {
  const repos = filterRepos([
    { name: 'first', description: 'd', owner: { avatar: 'url' } },
    { name: 'second', description: 'd', owner: { avatar: 'url' } },
    { name: 'third', description: 'd', owner: { avatar: 'url' } }
  ], 2)
  t.is(repos.length, 2)
})

test('filters list when a language is provided', t => {
  const repos = filterRepos([
    { full_name: 'first', language: 'js', owner: { avatar: 'url' } },
    { full_name: 'second', language: 'cpp', owner: { avatar: 'url' } },
    { full_name: 'third', language: 'js', owner: { avatar: 'url' } }
  ], 5, 'js')
  t.is(repos.length, 2)
  t.is(repos[0].name, 'first')
  t.is(repos[1].name, 'third')
})
