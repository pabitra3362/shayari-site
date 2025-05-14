"use client"

import React from 'react'
import { useSelector } from 'react-redux'



const Page = () => {
  const {user} = useSelector(state => state.user)
  console.log(user);
  return (
    <div>submit shayari page</div>
  )
}

export default Page