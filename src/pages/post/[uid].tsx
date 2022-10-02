import { RichText } from 'prismic-dom';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { GetServerSideProps } from 'next';

import { FiCalendar, FiUser } from "react-icons/fi";
import { BiTimeFive } from 'react-icons/bi'

import { createClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import Head from 'next/head';



export default function Post({post, timeContent}) { 
  return ( 
    <>
      <Head>
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
              {timeContent} {timeContent === 1 ? 'minuto' : 'minutos'}
            </span>
          </div> 
          <main className={styles.main}>
            <h2>{post.heading}</h2>
            <div className={styles.postContent} dangerouslySetInnerHTML={{__html: post.content}}/>
          </main>
        </div>

      </section>
    </>
  )
}
  

export const getServerSideProps: GetServerSideProps = async ({params, previewData }) => {
  const slug = params.uid
  const client = createClient({ previewData });
  const page =await client.getByUID('postsblog', String(slug));

  
  const post = {
    slug,
    title: page.data.title,
    author: page.data.author,
    banner: page.data.banner.url,
    heading: page.data.content[0].heading,
    content: RichText.asHtml(page.data.content[0].body),
    updatedAt: format(
      new Date(page.first_publication_date),
        "dd MMM YYY",
        {
          locale: ptBR,
        }
    ),
    timeContent: page.data.content.reduce(function(numberOfWords, word) {
      for(word in numberOfWords) {
        numberOfWords[word]
      }
      
      return numberOfWords 
    }),    
  }

  const content = RichText.asHtml(post.timeContent.body).split(' ')

  const time = content.length / 200*60

  const timeContent = Math.round((time%3600)/60)
  
  return {
    props: {
      post,
      timeContent
    }
  }

   
};