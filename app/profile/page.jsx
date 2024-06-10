"use client";
import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { collection, getDocs, query, where, doc, deleteDoc } from "firebase/firestore";
import { db } from './../firebase';
import Spinner from "../components/Spinner";
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns'; 

const Page = () => {
  const { user } = UserAuth();
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      if (user) {
        const q = query(collection(db, 'JarvisArticle'), where('author', '==', user.email));
        const querySnapshot = await getDocs(q);
        const articlesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setArticles(articlesData);
      }
      setLoading(false);
    };
    fetchArticles();
  }, [user]);

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

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this article?")) {
      try {
        await deleteDoc(doc(db, 'JarvisArticle', id));
        setArticles(articles.filter(article => article.id !== id));
        alert("Article deleted successfully.");
      } catch (error) {
        console.error("Error deleting article: ", error);
        alert("Error deleting article.");
      }
    }
  };

  return (
    <div className="p-4">
      {loading ? (
        <Spinner />
      ) : user ? (
        <div>
          <p>
            Welcome, {user.displayName} - you are logged in to the profile page - a protected route.
          </p>
          <h2 className="text-2xl font-bold mb-4">Your Articles</h2>
          <div className="content-container">
            {articles.map(article => (
              <Link key={article.id} href={`/article/${article.id}`} legacyBehavior>
                <a className="border p-4 mb-4 flex hover:bg-gray-100 transition-colors duration-200">
                  {extractFirstImage(article.content) && (
                    <div className="w-1/4 mr-4">
                      <img src={extractFirstImage(article.content)} alt={article.title} className="w-full h-auto" />
                    </div>
                  )}
                  <div className="w-3/4">
                    <h2 className="text-xl font-bold">{article.title}</h2>
                    <p className="text-sm text-gray-500 mb-2">
                      작성자: {user.displayName} • {formatDistanceToNow(new Date(article.createdAt.toDate()))} 전
                    </p>
                    <p className="mb-4">{extractPreviewText(article.content)}</p>
                    <div className="flex space-x-2">
                      <Link href={`/edit/${article.id}`} legacyBehavior>
                        <a
                          onClick={(e) => e.stopPropagation()}
                          className="bg-green-500 text-white p-2 rounded"
                        >
                          편집하기
                        </a>
                      </Link>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handleDelete(article.id);
                        }}
                        className="bg-red-500 text-white p-2 rounded"
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <p>You must be logged in to view this page - protected route.</p>
      )}
    </div>
  );
};

export default Page;

