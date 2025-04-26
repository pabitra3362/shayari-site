import React from 'react'

const Page = async ({ params }) => {

    const { category } = await params;
    
  return (
    <div>shayari page of {category}</div>
  )
}

export default Page