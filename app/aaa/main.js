import React, { useEffect, useState } from 'react';

export function Main() {
  return <div className='main-container'>
    <Menu>dffddf</Menu>
    <div>
      <div className='box'></div>
      <div className='box'></div>
      <div className='box'></div>
      <div className='box'></div>
      <div className='box'></div>
    </div>
  </div>
}

export function Menu({ children }) {
  return GetResponsiveComponent(<MenuPC>{children}</MenuPC>, <MenuMobile>{children}</MenuMobile>)
}

// export function GetResponsiveComponent( desktop=<></>, mobile=<></>) {
//   console.log(mobile)
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//   useEffect(() => {
//     function handleResize() {
//       setIsMobile(window.innerWidth < 768);
//     }
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);
//   console.log(isMobile)
//   return isMobile ? mobile : desktop;
// }
export function GetResponsiveComponent(desktop=<></>, mobile=<></>) {
  const isBrowser = typeof window !== "undefined";

  // Use a useState hook to set the initial state based on the window object if available
  const [isMobile, setIsMobile] = useState(isBrowser ? window.innerWidth < 768 : false);

  useEffect(() => {
    // Ensure window object is available before attaching event listener
    if (isBrowser) {
      function handleResize() {
        setIsMobile(window.innerWidth < 768);
      }

      window.addEventListener('resize', handleResize);
      // Cleanup the event listener on component unmount
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [isBrowser]); // Add isBrowser as a dependency to re-run the effect if it changes

  return isMobile ? mobile : desktop;
}

function MenuPC({ children }) {
  console.log('intiPC')
  return <>{ children }</>
}

function MenuMobile({ children }) {
  console.log('intiMob')
  return <SideWidget>{ children }</SideWidget>
}

export function SideWidget({ children }) {
  // const [isExpanded, setIsExpanded] = useState(false);
  // const toggleWidget = () => {
  //   setIsExpanded(!isExpanded);
  // };
  // return <div className={`side-widget`} onClick={toggleWidget}>
  //   <div className="side-widget-toggle-tab">☰</div>
  //   {isExpanded && <div className="side-widget-content">{children}</div>}
  // </div>
}