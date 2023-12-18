"use client";


import React, { useState, useEffect } from "react";

export default function Page() {
  const [isMobile, setIsMobile] = useState(false);

  const hoverStyle = {
    maxWidth: '150px',
    marginBottom: '20px',
  };
  const mobilehoverStyle = {
    maxWidth: '80px',
    marginBottom: '10px',
  };
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // 768px 미만을 모바일로 간주합니다.
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

 

  // 이곳에 다른 useEffect 훅들 및 로직 추가...

  if (isMobile) {
    return (
      <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
  
      <video autoPlay loop muted playsInline style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', objectFit: 'cover', zIndex: -1 }}>
  
      <source src="/background.mp4" type="video/mp4" />
    </video>
  
  <div style={{ position: 'relative', zIndex: 1, width: '100%', paddingTop: '20px', paddingBottom: '100px', height: 'calc(100vh - 20px)',  display: 'flex', flexDirection: 'column', alignItems: 'flex-start', alignItems: 'center' }}>
  
      
            <main className="p-4" style={{ height: '100vh' }}>
  
          {/* 사용자가 로그인되어 있으면 Welcome 메시지를 표시하고, 그렇지 않으면 Home Page를 표시합니다. */}
          <div style={{ position: 'relative', zIndex: 1, paddingBottom: '40px', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',marginTop: '-50px' // Move the whole block up by 50px
  }}>
  
  <a   href="https://apps.apple.com/th/app/jarvis-time-assistant/id1672236359"
            >
              <img src="/book.png" alt="Book" style={mobilehoverStyle} />
            </a>
  
            <h1 style={{ fontSize: '16px', fontWeight: 'bold', color: 'white' }}>
             J.A.R.V.I.S
            </h1>
            <h1 style={{ fontSize: '16px', fontWeight: 'bold', color: 'white' }}>
          Just A Rather Very Intelligent System.

            </h1>
           
          {/* book1.png on the left */}
         
        
           
  
          
  
          
  
        </div>
       
        </main>
       
      </div>
  
      </div>
  
    );
  }

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>

    <video autoPlay loop muted playsInline style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', objectFit: 'cover', zIndex: -1 }}>

    <source src="/background.mp4" type="video/mp4" />
  </video>

<div style={{ position: 'relative', zIndex: 1, width: '100%', paddingTop: '20px', paddingBottom: '100px', height: 'calc(100vh - 20px)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', alignItems: 'center' }}>

    
          <main className="p-4" style={{ height: '100vh' }}>

        {/* 사용자가 로그인되어 있으면 Welcome 메시지를 표시하고, 그렇지 않으면 Home Page를 표시합니다. */}
        <div style={{ position: 'relative', zIndex: 1, paddingBottom: '40px', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',marginTop: '-50px' // Move the whole block up by 50px
}}>

<a   href="https://apps.apple.com/th/app/jarvis-time-assistant/id1672236359"
          >
            <img src="/book.png" alt="Book" style={hoverStyle} />
          </a>

          <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: 'white' }}>
           J.A.R.V.I.S
          </h1>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: 'white' }}>
        Just A Rather Very Intelligent System.
        
          </h1>
          <div style={{ paddingBottom: '40px' }}>
      

          </div>

        

        

      </div>
     
      </main>
     
    </div>

    </div>

  );
}

