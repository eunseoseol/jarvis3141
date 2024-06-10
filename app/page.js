"use client"; // 클라이언트 컴포넌트로 지정
import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

export default function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const q = query(collection(db, 'JarvisArticle'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const articlesData = await Promise.all(querySnapshot.docs.map(async (docSnapshot) => {
        const data = docSnapshot.data();
        const userDocRef = doc(db, 'users', data.author);
        const userDocSnapshot = await getDoc(userDocRef);
        const userData = userDocSnapshot.exists() ? userDocSnapshot.data() : { profile: { name: 'Unknown' } };
        return {
          id: docSnapshot.id,
          ...data,
          authorName: userData.profile.name,
        };
      }));
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
       <div className="content-container">
        {articles.map(article => (
          <div key={article.id} className="border p-4 mb-4 flex">
            {extractFirstImage(article.content) && (
              <div className="w-1/4 mr-4">
                <img src={extractFirstImage(article.content)} alt={article.title} className="w-full h-auto" />
              </div>
            )}
            <div className="w-3/4">
              <h2 className="text-xl font-bold">{article.title}</h2>
              <p className="text-sm text-gray-500 mb-2">
                작성자: {article.authorName} • {formatDistanceToNow(new Date(article.createdAt.toDate()))} 전
              </p>
              <p className="mb-4">{extractPreviewText(article.content)}</p>
              <Link href={`/article/${article.id}`} legacyBehavior>
                <a className="bg-blue-500 text-white p-2 rounded inline-block">더 읽기</a>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
