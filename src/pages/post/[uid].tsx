import { PrismicRichText } from '@prismicio/react';
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
    <div>
      
    </div>  
    
    </>
  )
}

export const getServerSideProps = async ({params, previewData }) => {
  const slug = params.uid
  const prismic = createClient({ previewData });
  const response = await prismic.getAllByType('postsblog', slug);

  const posts = response.map((post: any) => {
    return {
      slug,
      title: post.data.title,
      content: post.data.content,
      updatedAt: format(
        new Date(post.first_publication_date),
          "dd MMM YYY",
          {
            locale: ptBR,
          }
      ),
    }
  })

  console.log(posts)
   
  return {
    props: {
      posts,
    }
  }

   
};
