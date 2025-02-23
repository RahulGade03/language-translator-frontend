import React from 'react'
import { v4 as uuidv4 } from 'uuid';

const HistoryList = ({histList}) => {
  return (
    histList.map((obj) => {
        return (
            <li key={uuidv4()} className='bg-[#D8F3DC] text-black m-2 rounded-2xl p-2 w-[100%]'>{obj.searched} ({obj.date}) </li>
        )
    })
  )
}

export default HistoryList