import React, {useEffect,useState} from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow/MovieRow.js';
import FeaturedMovie from './components/MovieFeatured';
import Header from './components/Header';
import Footer from './components/Footer';

export default function App()  {

  const[movieList, setMovieList]= useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [backHeader, setBlackHeader]=useState(false);

  useEffect(()=>{
    const loadAll= async() =>{
      //Pegando a lista TOTAL
      let list= await Tmdb.getHomeList();
      setMovieList(list);

      //pegando o featured
      let originals= list.filter(i=>i.slug==='originals');
      let randomChosen = Math.floor(Math.random()* (originals[0].items.results.length - 1)); // -1 porque começa a contar do 0
      let chosen= originals[0].items.results[randomChosen];
      let chosenInfo=await Tmdb.getMovieInfo(chosen.id,'tv');
      setFeaturedData(chosenInfo);
    }
    loadAll();
  },[]);

  useEffect(()=>{
    const scrollListener= () =>{ //monitorar o scroll da tela
      if(window.scrollY > 10){
        setBlackHeader(true);
      } else{
        setBlackHeader(false);
      }
    }
    window.addEventListener('scroll', scrollListener);

    return()=>{
      window.removeEventListener('scroll',scrollListener);
    }
  }, [])

  return(
    <div className="page">

      <Header black={backHeader} />

      {featuredData &&
      <FeaturedMovie item={featuredData} />
      }

       <section className="lists">
         {movieList.map((item,key)=>(
           <MovieRow key={key} title={item.title} items={item.items} /> // só passa o valor key se for loop
         ))}
       </section>
       <Footer/>
      
       {movieList.length<=0&&
       <div className="loading">
       <img src="https://media.wired.com/photos/592744d3f3e2356fd800bf00/master/w_2560%2Cc_limit/Netflix_LoadTime.gif" alt="Loading"/>
     </div>
       }
       

    </div>
  );
}