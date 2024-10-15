import React from 'react'

export default function About() {
  return (
    <div className='w-screen sm:flex mt-0'>
    <div className="w-full sm:w-[40%] h-1/2 sm:sticky sm:left-0 top-36 flex justify-center items-center p-3">
      <img src="about2.jpg" className='w-96 h-96 rounded-full' alt="plantImg" />
    </div>
    <div className=" w-full sm:w-[60%] px-5 py-10">
      <h1 className="text-2xl text-center font-medium my-4">About Plants</h1>
      <p className='leading-8 text-xl'>Welcome to AboutPlants.com. This is a website developed to help those interested in plants, trees and shrubs to find the right plants for their home, gardens and workplace. We are interested in botany and aim to provide facts about plants from basic school-level education through to more advanced science.
      </p>
      <p className='leading-8 text-xl mt-2'>
        Plants add colour and vibrancy to our environments as well as providing a habitat for many living things that work together to stabilise and optimise the ecosystem. Use the menu above to learn about specific plant varieties.
      </p>
      <h1 className="text-2xl text-center font-medium my-4">Types of Plants</h1>
      <p className='leading-8 text-xl mt-2'>There are many types of plants and trees. We aim to separate each into indoor and outdoor varieties as well as breaking down the list by genus and species. For example, bonsai trees are considered indoor plants as well as outdoor plants (depending on the specialist) and (and correctly) fall under the category of tree.</p>
      <h1 className="text-2xl text-center font-medium my-4">Facts About Plants</h1>
      <p className='leading-8 text-xl mt-2'>There is a section within the Education tab that is related to facts about plants. This section details everything from statistics through to historical uses for some very interesting species. There is also information that relates to the traditional and alternative medical uses for some plants.</p>
    </div>
    </div>
  )
}
