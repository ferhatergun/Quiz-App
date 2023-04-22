import React from 'react'
import { Box } from '@mui/material'
import { sorular } from '../sorular'

function Cevaplar({rastgelesayidizisi}) {
  return (
    <div>
             {
                rastgelesayidizisi.map((value,i)=>
             <Box sx={{width:'350px'}} key={i}>  {/* sorular divi */}
               <Box sx={{textAlign:'center',fontSize:'20px',mt:2}} className='soru-baslik'>Soru {i+1}</Box>
               <Box className='soru-alani'>{sorular[value].soru}</Box>
               {
                    sorular[value].ans1 === sorular[value].cevap ?
                    <div className='soru-cevaplari dogru' >{sorular[value].ans1}</div> :
                    sorular[value].ans1 === sorular[value].verilencevap ? 
                    <div className='soru-cevaplari yanlis' >{sorular[value].ans1}</div>: 
                    <div className='soru-cevaplari' >{sorular[value].ans1}</div>
               }
                {
                    sorular[value].ans2 === sorular[value].cevap ?
                    <div className='soru-cevaplari dogru' >{sorular[value].ans2}</div> :
                    sorular[value].ans2 === sorular[value].verilencevap ? 
                    <div className='soru-cevaplari yanlis' >{sorular[value].ans2}</div>: 
                    <div className='soru-cevaplari' >{sorular[value].ans2}</div>
               }
                {
                    sorular[value].ans3 === sorular[value].cevap ?
                    <div className='soru-cevaplari dogru' >{sorular[value].ans3}</div> :
                    sorular[value].ans3 === sorular[value].verilencevap ? 
                    <div className='soru-cevaplari yanlis' >{sorular[value].ans3}</div>: 
                    <div className='soru-cevaplari' >{sorular[value].ans3}</div>
               }
                {
                    sorular[value].ans4 === sorular[value].cevap ?
                    <div className='soru-cevaplari dogru' >{sorular[value].ans4}</div> :
                    sorular[value].ans4 === sorular[value].verilencevap ? 
                    <div className='soru-cevaplari yanlis' >{sorular[value].ans4}</div>: 
                    <div className='soru-cevaplari' >{sorular[value].ans4}</div>
               }
            
            </Box>
                        )
                  }
    </div>
  )
}

export default Cevaplar