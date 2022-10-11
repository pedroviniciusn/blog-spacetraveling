import { PrismicRichText } from "@prismicio/react"
import { createClient } from '../../services/prismic';

import Head from 'next/head';

import { FiCalendar, FiUser } from "react-icons/fi";
import { BiTimeFive } from 'react-icons/bi'

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import styles from './post.module.scss';

interface PostProps {
  slug: string;
  title: string;
  author: string;
  banner: string;
  content: {
    map(arg0: (item: any, index: any) => JSX.Element): import("react").ReactNode;
    heading: string;
    body: HTMLElement;
  }
  updatedAt: string; 
}

interface Props {
  post: PostProps;
  timeContent: number;
}

export default function Post({post, timeContent}: Props) { 
  return ( 
    <>
      <Head>timeContentProps
        <title>{post.slug}</title>
      </Head>

      <section className={styles.container}>
        <img src={post.banner} alt='banner'/>
        <div className={styles.content}>
          <h1>{post.title}</h1>
          <div className={styles.textInfo}>
            <span>
              <FiCalendar/>
              {post.updatedAt}
            </span>
            <span>
              <FiUser/>
              {post.author}
            </span>
            <span>
              <BiTimeFive/>
              {timeContent == 1 ? `${timeContent} minuto` : `${timeContent} minutos`}
            </span>
          </div> 
          <main className={styles.main}>
            {
              post.content.map((item, index) => {
                return ( 
                  <div key={index} className={styles.paragraph}>   
                    <h2>{item.heading}</h2>
                    <PrismicRichText
                    field={item.body}
                    fallback={<p>No content</p>}
                    />     
                  </div>
                )
              })
            }     
          </main>
        </div>
      </section>
    </>
  )
}

  

export async function getServerSideProps({params, previewData}) {
  const slug = params.uid
  const client = createClient({ previewData });
  const page = await client.getByUID('postsblog', String(slug));
  
  const post = {
    slug,
    title: page.data.title,
    author: page.data.author,
    banner: page.data.banner.url,
    content: page.data.content.map((item) => {
      return item
    }),
    updatedAt: format(
      new Date(page.first_publication_date),
        "dd MMM YYY",
        {
          locale: ptBR,
        }
    ),   
  }

  const content = post.content.map(item => {
    return item.body
  })

  const allContent = Object.assign(content.map(item => JSON.stringify(item)))
  
  const contentArray = JSON.stringify(allContent).split(/[.\s]+/)
  
  const time = (contentArray.length*60) / 200
  
  const timeContent = Math.round((time%3600)/60)

  
  return {
    props: {
      post,
      timeContent,   
    }
  }
   
}; 
