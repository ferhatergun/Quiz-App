import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material';
import { sorular } from '../sorular';
import '../css/Home.css'
import Cevaplar from './Cevaplar';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import ReplayIcon from '@mui/icons-material/Replay';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

function Home() {
    const [rastgelesayidizisi, setrastgelesayidizisi] = useState([]);  // her seferinde farklı soru gelmesini sağlayan değişken
    const [sayi, setsayi] = useState(0); // ekrana gelen sorunun indisini tutar
    const [complated,setcomplated]=useState(false) // oyunun bittiğini kontrol eden değişken
    const [start,setstart]=useState(false) // oyunun başlayıp başlamadığını kontrol eden değişken
    const [sorunumarasi,setsorunumarasi]=useState(1) // kaçıncı soruda olduğunu gösterir
    const [cevapgoster,setcevapgoster]=useState(false) // cevapları gösteren değişken
    const [sorusayisi,setsorusayisi]=useState(0) // quizin kaç sorudan oluşacağını belirler
    const rastgelesayiolustur = () => { // üretilen sayı+1 soru idsini veriyor 5 ürerildi 6.soruyu gösteririz
        var rastgeleSayi;
        do{
            rastgeleSayi = Math.floor(Math.random() * sorular.length)
        }
        while (rastgelesayidizisi.includes(rastgeleSayi)); // rastegedizisinde o sayı varsa yeni sayı üretir yoksa aşşağı iner
        if(rastgelesayidizisi.length===sorusayisi) // 4 adet soru gösterip oyunu bitirir
        {
            setcomplated(true);
        }
        else
        {
            
            setsayi(rastgeleSayi); // güncel sayımızı değiştirir
            setrastgelesayidizisi([...rastgelesayidizisi,rastgeleSayi]); // üretilen sayilari dizide depolar
           
        }
        console.log(rastgelesayidizisi)
        
        
        
        
    }
    const [skor,setskor]=useState(null); // doğru sayısı
    const [yanlis,setyanlis]=useState(null) // yanlış sayısı
    useEffect(() => { // skor veya yanlıs sayısında değiklik olunca rastgele bir sayı üretir
      rastgelesayiolustur();
    }, [skor,yanlis]); 

    useEffect(() => { // skor veya yanlıs sayısında değiklik olunca rastgele bir sayı üretir
        rastgelesayiolustur();
      },[]); 
    const kontrol =(cevap,soru)=>{ // verilen cevabın doğru olup olmadığını kontrol eder
        if(cevap===sorular[sayi].cevap)
        {
            console.log("doğru cevap")
            soru.verilencevap=cevap
            setskor(skor+1)
            setsorunumarasi(sorunumarasi+1)
        }
        else
        {
            console.log("yanlış cevap")
            soru.verilencevap=cevap
            setyanlis(yanlis+1)
            setsorunumarasi(sorunumarasi+1)
        }
    }

    const newgame=()=>{ // oyundayki herşeyi sıfırlar ve en baştan başlar
        setskor(0)
        setyanlis(0)
        setcomplated(false)
        setrastgelesayidizisi([])
        setsorunumarasi(1)
        setcevapgoster(false)
    }
    const homepage=()=>{
        setstart(false)
    }
    const startgame=()=>{
        newgame()
        setstart(true)
        setskor(0)
        setyanlis(0)
    }
    const sorusayisibelirle=(e)=>{
        setsorusayisi(parseInt(e.target.value)) 
    }
    const Radiostyle ={
      color: '#A16AFE',
       '&.Mui-checked': {
        color: '#A16AFE',
      }, 
    }

  return (
    <div>
         <Box sx={{textAlign:'center',mt:3,fontSize:'30px',height:'70px'}}>
            Html Quizz
            
        </Box>

        <Box sx={{display:'flex',justifyContent:'center'}}>
           <Box >
           {
            !start ? <>
            <FormControl sx={{ml:3}}>
            <Typography sx={{color:'#2A2F4F'}}>Soru Sayısı</Typography>
            <RadioGroup
              row
              onChange={(e)=>sorusayisibelirle(e)} 
            >
              <FormControlLabel value="4" control={<Radio sx={Radiostyle}/>} label="4" />
              <FormControlLabel value="8" control={<Radio sx={Radiostyle}/>} label="8" />
              <FormControlLabel value="12" control={<Radio sx={Radiostyle}/>} label="12" />
            </RadioGroup>
          </FormControl> <br/>
            <button onClick={startgame} className='oyunu-baslat' style={{marginTop:'15px'}}>Oyunu Başlat </button> </>:
            !complated ? 
            <Box sx={{width:'350px'}}>  {/* sorular divi */}
               <Box sx={{textAlign:'center',fontSize:'20px'}} className='soru-baslik'>Soru {sorunumarasi}/{sorusayisi}</Box>
               <Box className='soru-alani'>{sorular[sayi]?.soru}</Box>
               <button variant='text' className='soru-secenekleri' onClick={()=>kontrol(sorular[sayi].ans1,sorular[sayi])}>{sorular[sayi].ans1}</button>
               <button variant='text' className='soru-secenekleri' onClick={()=>kontrol(sorular[sayi].ans2,sorular[sayi])}>{sorular[sayi].ans2}</button>
               <button variant='text' className='soru-secenekleri' onClick={()=>kontrol(sorular[sayi].ans3,sorular[sayi])}>{sorular[sayi].ans3}</button>
               <button variant='text' className='soru-secenekleri' onClick={()=>kontrol(sorular[sayi].ans4,sorular[sayi])}>{sorular[sayi].ans4}</button>
            </Box>
                  : <center><Typography variant='h6'>Sonuçlar</Typography> 
                  <Box sx={{display:'flex',justifyContent:'center',alignItems:'center'}}><CheckIcon color='success'sx={{fontSize:'30px',mr:0.5}} /> {skor}</Box>
                  <Box sx={{display:'flex',justifyContent:'center',alignItems:'center'}}><ClearIcon color='error' sx={{fontSize:'30px',mr:0.5}}/> {yanlis}</Box> <br/>
                  <button onClick={()=>newgame()} className='tekraroyna'>Tekrar Oyna <ReplayIcon/></button> <br/> <br/>
                  <button onClick={homepage} className='anasayfa'>Ana Sayfaya Dön <HomeOutlinedIcon fontSize='small'/></button> <br/> <br/> 
                  { // cevapgoster true ise göster butonu ekranda gözükmez false ise gözükür
                    cevapgoster ? null:<button onClick={()=>setcevapgoster(true)} className='cevapaç'>Cevapları Göster <KeyboardArrowDownOutlinedIcon/></button>
                  }
                  
                  { // cevapgöster true ise cavaplar gösterilir false ise gösterilmez
                    cevapgoster ?<Cevaplar rastgelesayidizisi={rastgelesayidizisi} /> :null
                  }
                  
                          
                  </center> }  
           </Box> 
        </Box>
    </div>
  )
}

export default Home