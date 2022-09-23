import { GetStaticProps } from 'next';
import  {createClient}  from '../services/prismic'

import Head from 'next/head';

import { FiCalendar, FiUser } from "react-icons/fi";

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import Link from 'next/link';


interface Post {
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

export default function Home({page}) {

  return (
    <>
      <Head>
        <title>spacetraveling</title>
      </Head>


      <main className={styles.container}>
        {
          page.map((post) => {
            return (
              <div key={post.id} className={styles.containerContent}>
                <Link href={`/posts/${post.slug}`}>
                  <h1>{post.data.title}</h1>
                </Link>
                <span>
                  Pensando em sincronização em vez de ciclos de vida.
                </span>
                <div className={styles.textInfo}>
                    <span><FiCalendar/> 19 Abr 2021</span>
                    <span><FiUser/>{post.data.author}</span>
                </div>
              </div>    
            )
          })
        }  
      </main>
    </>
  )
 }


export async function getStaticProps({ params, previewData }) {
  const slug = params
  const client = createClient({ previewData })

  const page = await client.getAllByType('postsblog')

  const post = {
    slug,
   //title: page.data.title.find((title: any) => title.type === 'heading1')?.text,

  }

  return {
    props: { page },
    revalidate: 60 * 60 * 24 , // Will be passed to the page component as props
  }
}