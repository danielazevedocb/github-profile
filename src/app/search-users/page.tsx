'use client'

import styles from '../../app/search-users/styles.module.scss'
import UserProfile from '../../components/UserProfile'
import RepositoryCard from '../../components/RepositoryCard/Index'
import NotFoundImage from '../../assets/not-found.svg'
import Image from 'next/image'
import { useState } from 'react'
import { GithubReposType } from '../types/GithubReposType'
import { GithubProfileType } from '../types/GithubProfileType'
import { profile } from 'console'
import LoadingComponent from '../../components/LoadingComponent '

export default function SearchUsers() {
  const [searchInput, setSearchInput] = useState('')
  const [user, setUser] = useState<GithubProfileType | null>(null)
  const [repos, setRepos] = useState<GithubReposType[]>([])
  const [loading, setLoading] = useState(false)

  async function handleSearchUser() {
    if (!searchInput) {
      setUser(null)
      return
    }

    try {
      setLoading(true)

      const response = await fetch(
        `https://api.github.com/users/${searchInput}`
      )

      const data: GithubProfileType = await response.json()

      setUser(data)

      const responseRepos = await fetch(
        `https://api.github.com/users/${data.login}/repos`
      )

      const dataRepos: GithubReposType[] = await responseRepos.json()

      setRepos(dataRepos)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles['main--search']}>
        <input
          type="text"
          placeholder="Nome de Usuário"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button className="btn--green" onClick={handleSearchUser}>
          Buscar
        </button>
      </div>
      <div className={styles['main--body']}>
        {loading ? (
          <LoadingComponent />
        ) : user?.name ? (
          <div>
            <UserProfile profile={user} />
            <div>
              <div className={styles['container-projects']}>
                {repos.slice(0, 6).map((repo) => (
                  <RepositoryCard repo={repo} key={repo.id} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="not-found">
            <Image
              src={NotFoundImage}
              alt="not found"
              width={400}
              height={439}
            />
            <h3>Nenhum usuário foi encontrado!</h3>
          </div>
        )}
      </div>
    </main>
  )
}
