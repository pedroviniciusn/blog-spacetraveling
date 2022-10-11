import { useEffect, useState } from 'react';
import { FiCalendar, FiUser } from "react-icons/fi";

import Head from 'next/head';
import Link from 'next/link';

import  {createClient}  from '../services/prismic'

import {format} from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

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

interface NextPageProps {
  nextPage: string | null;
}

export default function Home({posts}) {
  const [nextPage, setNextPage] = useState<NextPageProps>({nextPage: ''})   

  useEffect(() => {
    fetch(posts[0].href)
      .then(response => response.json())
      .then((data => setNextPage(data.next_page))) 
    },[])
      
  return (
    <>
      <Head>
        <title>spacetraveling</title>
      </Head>

      <main className={styles.container}>
        {posts.map((post: Post) => {
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
          })}  
          <button className={!nextPage === null ? styles.buttonActive : styles.buttonHidden}>
            <Link href={nextPage === null ? '' : posts[0].href}>
              Carregar mais posts
            </Link>
          </button>
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