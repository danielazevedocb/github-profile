import { GithubReposType } from '@/app/types/GithubReposType'
import styles from '../RepositoryCard/styles.module.scss'

interface IProps {
  repo: GithubReposType
}
export default function RepositoryCard({ repo }: IProps) {
  return (
    <div className={styles.container}>
      <h3>{repo.name}</h3>
      <p>{repo.description}</p>
    </div>
  )
}
