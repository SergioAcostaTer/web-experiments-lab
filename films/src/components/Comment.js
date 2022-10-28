import React from 'react'
import "../styles/comment.css"
 
const Comment = ({name,  username, avatar, date, content, rating}) => {

    avatar = avatar ? avatar.substring(1,) : ""

    if (avatar.length < 10){
        avatar = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E"

    }
    else if (avatar.length < 35){
        avatar = `https://image.tmdb.org/t/p/original/${avatar}`
    }
  
    console.log(avatar)

  return (
    <li className='comment-element'>
 
       <div className='comment-user'>
            <img src={avatar} alt={name}/>
            <p>{username}</p>
       </div>
       <div className='comment-content'>
            <p>{content}</p>
       </div>
 
    </li>
  )
}
 
export default Comment