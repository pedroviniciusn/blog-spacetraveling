import { RichText } from 'prismic-dom';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { GetServerSideProps } from 'next';

import { createClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({posts}) { 
  return ( 
    <>
      <img src={posts.banner}/>
      <div className={styles.postContent} dangerouslySetInnerHTML={{__html: posts.content}}/>
    </>
  )
}
  

export const getServerSideProps = async ({params, previewData }) => {
  const slug = params.uid
  const client = createClient({ previewData });
  const page = await client.getByUID('postsblog', slug);
  
  const posts = {
    slug,
    title: page.data.title,
    banner: page.data.banner.url,
    content: RichText.asHtml(page.data.content[0].body),
    updatedAt: format(
      new Date(page.first_publication_date),
        "dd MMM YYY",
        {
          locale: ptBR,
        }
    ),
  }
  
   
  return {
    props: {
      posts
    }
  }

   
};
