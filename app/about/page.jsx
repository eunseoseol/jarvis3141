"use client"; // 클라이언트 컴포넌트로 지정

import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import React, { useState, useRef, useEffect } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db } from "../firebase";  // firebase.js 파일 경로에 맞게 수정
import { collection, addDoc } from 'firebase/firestore';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const Page = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const quillRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      quill.getModule('toolbar').addHandler('image', () => {
        imageHandler(quill);
      });

      quill.root.addEventListener('click', (e) => {
        if (e.target && e.target.tagName === 'IMG') {
          if (selectedImage) {
            selectedImage.classList.remove('selected-image');
          }
          e.target.classList.add('selected-image');
          setSelectedImage(e.target);
        } else if (selectedImage) {
          selectedImage.classList.remove('selected-image');
          setSelectedImage(null);
        }
      });

      document.addEventListener('keydown', (e) => {
        if (selectedImage && e.key === 'Escape') {
          selectedImage.classList.remove('selected-image');
          setSelectedImage(null);
        } else if (selectedImage && e.key === 'Delete') {
          quill.deleteText(quill.getSelection(), 1);
          setSelectedImage(null);
        }
      });
    }
  }, [selectedImage]);

  const imageHandler = (quill) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.setAttribute('multiple', true);
    input.click();

    input.onchange = async () => {
      const files = input.files;
      if (files.length > 4) {
        alert('You can only upload up to 4 images.');
        return;
      }

      const uploadPromises = [];
      for (const file of files) {
        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        const uploadPromise = new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            snapshot => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
            },
            error => {
              console.error(error);
              reject(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                resolve(downloadURL);
              });
            }
          );
        });

        uploadPromises.push(uploadPromise);
      }

      const downloadURLs = await Promise.all(uploadPromises);
      const range = quill.getSelection();
      let currentIndex = range ? range.index : 0;
      downloadURLs.forEach(url => {
        quill.insertEmbed(currentIndex, 'image', url, 'user');
        currentIndex += 1;  // 이미지 삽입 후 커서를 다음 위치로 이동
      });
    };
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await addDoc(collection(db, "JarvisArticle"), {
        title: title,
        content: content,
        createdAt: new Date()
      });
      alert("Article saved successfully!");
      setIsLoading(false);
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Error saving article.");
      setIsLoading(false);
    }
  };

  const modules = {
    toolbar: {
      container: [
        [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        [{ 'align': [] }],
        ['clean']
      ]
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">아티클을 써보세요.</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Title</label>
        <input
          type="text"
          className="border rounded w-full p-2"
          placeholder="Enter the title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Content</label>
        <div style={{ height: '800px' }}>
          <ReactQuill
            ref={quillRef}
            value={content}
            onChange={setContent}
            modules={modules}
            className="border rounded"
            style={{ height: '100%', maxHeight: '100%' }}  // 여기서 높이를 지정합니다.
          />
        </div>
      </div>
      <button
        type="button"
        className="bg-blue-500 text-white p-2 rounded"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? 'Uploading...' : 'Submit'}
      </button>
    </div>
  );
};

export default Page;
