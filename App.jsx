import {useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
    const [movieList, setMovieList] = useState([]);
    const [searchInput, setSearchInput] = useState('');


    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (searchInput.length>3) {
    //     axios.get('http://www.omdbapi.com/', {
    //         params: {
    //             apikey: '4d639657',
    //             s: searchInput
    //         }
    //     })
    //         .then(res => {
    //             console.log(res.data);
    //             if (res.data && res.data.Response === "True") {
    //                 setMovieList(res.data.Search); 
    //             }
    //         })
    //         .catch(err => console.log(err));
    // }};

    const handleSubmit=(e)=>{
        e.preventDefault();
    }
    function fetchMovie(){
        if (searchInput.length>3) {
            axios.get('http://www.omdbapi.com/', {
                params: {
                    apikey: '4d639657',
                    s: searchInput
                }
            })
                .then(res => {
                    console.log(res.data);
                    if (res.data && res.data.Response === "True") {
                        setMovieList(res.data.Search); 
                    }
                })
                .catch(err => console.log(err));
        }
    }
    useEffect(() => {
     
        const timer=setTimeout(()=>{
            fetchMovie();
        },1000)
        return ()=>clearTimeout(timer);
        },[searchInput]);
    
    return (
    <div className='search-top'>
        <h1>Movies</h1>
            <form onSubmit={handleSubmit}>
                <div className='search'>
                    <label htmlFor="search">Search Movie</label>
                    <input type="text" placeholder="Enter Movie Name" value={searchInput}  onChange={e => setSearchInput(e.target.value)} />
                    <button type="submit">Search</button>
                </div>
            </form>

            <div className='search-result'>
                {movieList.map((movie, index) => (
                    <div key={index} className="card mt-3">
                        <div className="card-header">
                            <h4>Title:{movie.Title}</h4> 
                        </div>

                        <div className="card-body">
                            <h5>Year:{movie.Year}</h5>
                            <img src={movie.Poster} alt='Movie Poster' />
                        </div>

                    </div>
                ))}
            </div> 
        </div>
)
}

export default App
