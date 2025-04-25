import React from 'react'

const Page = async ({ params }) => {

    const { category } = params;
    
  return (
    <div>shayari page of {category}</div>
  )
}

export default Page