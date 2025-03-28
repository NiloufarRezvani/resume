/* eslint-disable react/prop-types */

import './layout.css'
function Layout({children,mode}) {

  return (
    <div className={`layout ${mode?`dark-mode dark-background`:``}`}> 
  {children}
    </div>
  )
}

export default Layout