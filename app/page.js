"use client"; // 클라이언트 컴포넌트로 지정
import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from './firebase';
import Link from 'next/link';

export default function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const q = query(collection(db, 'JarvisArticle'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const articlesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setArticles(articlesData);
    };

    fetchArticles();
  }, []);

  const extractPreviewText = (html) => {
    if (typeof document !== 'undefined') {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = html;
      const textContent = tempDiv.textContent || tempDiv.innerText || "";
      return textContent.substring(0, 200) + (textContent.length > 200 ? "..." : ""); // 첫 200자 표시
    }
    return "";
  };

  const extractFirstImage = (html) => {
    if (typeof document !== 'undefined') {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = html;
      const img = tempDiv.querySelector("img");
      return img ? img.src : null;
    }
    return null;
  };

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Home Page</h1>
      {articles.map(article => (
        <div key={article.id} className="border p-4 mb-4 flex">
          {extractFirstImage(article.content) && (
            <div className="w-1/4 mr-4">
              <img src={extractFirstImage(article.content)} alt={article.title} className="w-full h-auto" />
            </div>
          )}
          <div className="w-3/4">
            <h2 className="text-xl font-bold">{article.title}</h2>
            <p className="mb-4">{extractPreviewText(article.content)}</p>
            <Link href={`/article/${article.id}`} legacyBehavior>
              <a className="bg-blue-500 text-white p-2 rounded inline-block">Read More</a>
            </Link>
          </div>
        </div>
      ))}
    </main>
  );
}
