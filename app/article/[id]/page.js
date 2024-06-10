"use client"; // 클라이언트 컴포넌트로 지정
import { doc, getDoc } from 'firebase/firestore';
import { db } from './../../firebase';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const Article = ({ params }) => {
  const { id } = params;
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (id) {
        const docRef = doc(db, 'JarvisArticle', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setArticle(docSnap.data());
        } else {
          console.log('No such document!');
        }
      }
    };

    fetchArticle();
  }, [id]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold">{article.title}</h1>
      <div className="mt-4" dangerouslySetInnerHTML={{ __html: article.content }}></div>
      <Link href="/">
        <button className="bg-blue-500 text-white p-2 rounded mt-4 inline-block">
          Back to Articles
        </button>
      </Link>
    </main>
  );
};

export default Article;
