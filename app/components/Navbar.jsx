import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { UserAuth } from '../context/AuthContext'; 
const Navbar = () => {
  const { user, googleSignIn, logOut } = UserAuth();
  const [loading, setLoading] = useState(true); 
  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  }; 
  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  }; 
  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]); 
  return (
    <div className="h-20 w-full border-b-2 flex items-center justify-between p-2">
      <ul className="flex">
        <li className="p-2 cursor-pointer">
          <Link href="/">홈</Link>
        </li> 
     
      </ul> 
      {loading ? null : !user ? (
        <ul className="flex">
          <li onClick={handleSignIn} className="p-2 cursor-pointer">
            로그인하기
          </li>
        </ul>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <li className="p-2 cursor-pointer">
          <Link href="/about">아티클 쓰기</Link>
        </li>

        {!user ? null : (
          <li className="p-2 cursor-pointer">
            <Link href="/profile">나의 프로필</Link>



          </li>
        )}
           <p className="cursor-pointer" onClick={handleSignOut}>
            로그아웃
          </p>
        </div>
      )}
    </div>
  );
}; 
export default Navbar;
