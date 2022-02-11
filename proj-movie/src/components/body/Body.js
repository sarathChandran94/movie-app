import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Categories from "../categorieList/Categories";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { CircularProgress, Tooltip } from "@mui/material";
import SingleMoviePage from "../singleMovie/SingleMovie";
import './Body.css'


export const Context = createContext()

const Body = () => {

    const [mov, setMov] = useState([])
    const [cat, setCat] = useState([])
    const [catSel, setCatSel] = useState('Trending')
    const [fav, setFav] = useState([])
    const [isMovieClicked, setIsMovieClicked] = useState(true)
    const [smd, setSmd] = useState(true)
    const [favSelected, setFavSelected] = useState('Add to favourites')

    useEffect(() => {
        console.log('rendered');
        const getMov = () => {
            // axios.get("https://imdb-api.com/en/API/MostPopularMovies/k_eomu4lvb").then(res => {
            axios.get("https://api.themoviedb.org/3/trending/all/day?api_key=17e786d5aa65a489c613aaca6427cd5e")
                .then(res => {
                    console.log(res.data.results)
                    setMov(res.data.results)
                })
                .catch(e => console.log(e))
        }

        const getCat = () => {
            // axios.get("https://imdb-api.com/en/API/MostPopularMovies/k_eomu4lvb").then(res => {
            axios.get("https://api.themoviedb.org/3/genre/movie/list?api_key=17e786d5aa65a489c613aaca6427cd5e")
                .then(res => {
                    // console.log(res.data)
                    setCat(res.data.genres)
                })
                .catch(e => console.log(e))
        }
        getMov()
        getCat()
    }, []);


    const handleClick = (item) => {
        // console.log(item)
        setFav([...fav, item])
        // console.log(fav)
        localStorage.setItem('fMov', JSON.stringify(fav))
    }



    const movieClicked = (item) => {
        setSmd(item)
        setFavSelected('Added!')
        setIsMovieClicked(false)
    }
    return (
        <Context.Provider value={{Data:[fav,setFav]}}>
            <div>
                {/* <div className='background'>
                </div> */}
                <div className='foregorund'>

                <Container className="heading" fluid>
                    <h1>{ catSel }</h1>
                </Container>
                <Row className="backdrop">
                    {isMovieClicked ?
                        <>
                            <Col className="p-3" sm={3} >
                                <Categories cat={cat} setCat={setCat} mov={mov} setMov={setMov} setCatSel={setCatSel} />
                            </Col>
                            <Col className="p-3" sm={9} >
                                <Row xs={1} sm={2} md={4} >
                                    {
                                        mov.map((v, i) => {
                                            return (
                                                <Col key={v.id} >
                                                    <Card style={{height: '450px'}} className="movieCard m-3">
                                                        <Card.Img onClick={() => movieClicked(v.id)} style={{height: '300px'}} variant="top" src={`https://image.tmdb.org/t/p/w300/${v.poster_path}`} />
                                                        <Row>
                                                            <Col className='m-2'>
                                                                <Tooltip title={ favSelected } placement="top">
                                                                <Card.Text><ThumbUpIcon  onClick={() => handleClick([v])} /></Card.Text>
                                                            </Tooltip>
                                                            </Col>
                                                            <Col className='m-2'>
                                                                <CircularProgress variant="determinate" value={v.vote_average * 10} />
                                                                <Card.Text>{v.vote_average}</Card.Text>
                                                            </Col>
                                                        </Row>
                                                        <Card.Body>
                                                            <Card.Title>{v.title || v.name}</Card.Title>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            )
                                        })
                                    }
                                </Row>
                            </Col>
                        </>
                        :   <SingleMoviePage value={smd} />
                    }
                </Row>
                </div>
            </div>
        </Context.Provider>
    );
}

export default Body;
