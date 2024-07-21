import React, { useState } from 'react'
import Logo from '../assets/BookwiseLogo.png'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box
} from '@chakra-ui/react'

// Sample data
const data = {
  'Chapter 9': {
    'Flashcard 1': {
      shortDesc:
        'Clear introduces the Goldilocks Rule, which suggests that habits are most effective when they are in the optimal zone of difficulty—not too hard, not too easy.',
      longDesc:
        'James Clear presents the Goldilocks Rule, which states that habits are most effective when they strike a balance between being too easy and too difficult. When tasks are within this optimal zone of difficulty, they are more engaging and sustainable, promoting consistent progress and adherence. This principle helps in designing habits that are challenging yet achievable.'
    },
    'Flashcard 2': {
      shortDesc:
        'Maintaining motivation and progress relies on finding the right level of challenge that keeps tasks engaging and manageable.',
      longDesc:
        'Clear emphasizes that sustaining motivation and making progress depend on finding an appropriate level of challenge in tasks. By ensuring that tasks are neither too simple nor too complex, individuals can keep their efforts engaging and manageable, which enhances the likelihood of long-term habit formation and success.'
    },
    'Flashcard 3': {
      shortDesc:
        'The Goldilocks Rule helps individuals avoid boredom and frustration by ensuring that tasks are suitably challenging.',
      longDesc:
        'Clear explains that the Goldilocks Rule helps prevent boredom and frustration by maintaining an appropriate level of challenge in tasks. By avoiding tasks that are too easy or overly difficult, individuals can stay motivated and engaged, which is crucial for the successful development and maintenance of new habits.'
    },
    'Flashcard 4': {
      shortDesc:
        'Applying the Goldilocks Rule involves regularly adjusting the difficulty of tasks to keep them aligned with personal growth and progress.',
      longDesc:
        'Clear advises that applying the Goldilocks Rule involves periodically adjusting the difficulty of tasks to ensure they remain aligned with personal growth and progress. By making adjustments based on current capabilities and goals, individuals can maintain the optimal level of challenge, which supports continuous improvement and habit development.'
    }
  }
}

// Transform the data
const chapters = Object.keys(data).map(chapter => ({
  title: chapter,
  flashcards: Object.entries(data[chapter]).map(([key, flashcard]) => ({
    title: key,
    shortDesc: flashcard.shortDesc,
    longDesc: flashcard.longDesc
  }))
}))

const itemsPerPage = 1

const Taskeaways = () => {
  const [currentPage, setCurrentPage] = useState(1)

  // Calculate the indices of items to show on the current page
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = chapters.slice(indexOfFirstItem, indexOfLastItem)

  // Calculate total pages
  const totalPages = Math.ceil(chapters.length / itemsPerPage)

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <section className='bg-backgroundBlue overflow-y-auto h-screen'>
      {/* Header Section */}
      <div className='sticky top-0 mb-5 glass flex items-center justify-between'>
        <div className=' flex items-center my-2 ml-4 '>
          <img src={Logo} alt='Bookwise Logo' className='w-7 mr-2' />
          <h1 className='text-[#5AB2FF] text-2xl font-bold'>Bookwise</h1>
        </div>
        <div className='my-5 mr-4 mb-7'>
          <button className='relative px-4 py-3 m-1 overflow-hidden group bg-gradient-to-r from-[#FF7E5F] to-[#FF6B6B] rounded-lg shadow-lg cursor-pointer border-2 border-[#FF6B6B] text-white drop-shadow-2xl text-sm sm:text-base sm:px-6 sm:py-3'>
            <span className='absolute w-48 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-white top-1/2 group-hover:h-48 group-hover:-translate-y-32 ease sm:w-64 sm:h-0 sm:group-hover:h-64 sm:group-hover:-translate-y-32'></span>
            <span className='relative text-white transition duration-300 group-hover:text-[#FF6B6B] ease font-Debate'>
              Debate with AI
            </span>
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className='mx-5 md:mx-10'>
        <div className='mb-4'>
          {/* Chapter Name / index Name */}
          <h1 className='text-[1.5rem]'>
            {currentItems.length > 0 ? currentItems[0].title : 'Chapter'}
          </h1>
        </div>

        <Accordion
          defaultIndex={[0]}
          allowMultiple
          className='bg-white p-4 rounded-lg shadow'
        >
          {currentItems.map((chapter, index) => (
            <React.Fragment key={index}>
              {chapter.flashcards.map((flashcard, idx) => (
                <AccordionItem key={idx}>
                  <h2>
                    <AccordionButton>
                      <Box as='span' flex='1' textAlign='left'>
                        {flashcard.shortDesc}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} style={{ backgroundColor: '#FF69B4' }}>
                    <p>
                      <strong>FlashCard:</strong> {flashcard.longDesc}
                    </p>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </React.Fragment>
          ))}
        </Accordion>

        {/* Pagination Controls */}
        <div className='flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6 mt-4'>
          <button
            onClick={handlePrevPage}
            className={`cursor-pointer relative inline-flex items-center rounded-md border border-gray-300 bg-lightBlue hover:bg-darkBlue text-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${
              currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''
            }`}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <button
            onClick={handleNextPage}
            className={`cursor-pointer relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-lightBlue hover:bg-darkBlue text-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${
              currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''
            }`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  )
}

export default Taskeaways
