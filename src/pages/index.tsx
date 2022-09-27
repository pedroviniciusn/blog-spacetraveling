import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import {format} from 'date-fns'

import  {createClient}  from '../services/prismic'
import ptBR from 'date-fns/locale/pt-BR'

import { FiCalendar, FiUser } from "react-icons/fi";
import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';


interface Post {
  id?: string;
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({posts}) {

  return (
    <>
      <Head>
        <title>spacetraveling</title>
      </Head>

      <main className={styles.container}>
        {
          posts.map((post: Post) => {
            return (
              <div key={post.id} className={styles.containerContent}>
                <Link href={`/post/${post.uid}`}>
                  <h1>{post.data.title}</h1>
                </Link>
                <span>
                  {post.data.subtitle}
                </span>
                <div className={styles.textInfo}>
                    <span>
                      <FiCalendar/>
                          {
                            format(
                              new Date(post.first_publication_date),
                              "dd MMM YYY",
                              {
                                locale: ptBR,
                              }
                            )
                          }
                    </span>
                    <span>
                      <FiUser/>
                      {post.data.author}
                    </span>
                </div>
              </div>    
            )
          })
        }  
      </main>
    </>
  )
 }


export async function getStaticProps({ previewData }) {
  const client = createClient({ previewData })

  const posts = await client.getAllByType('postsblog')

  return {
    props: {posts},
    revalidate: 60 * 60 * 24 , // Will be passed to the page component as props
  }
}