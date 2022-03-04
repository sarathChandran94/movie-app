import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { CircularProgress, Tooltip } from "@mui/material";
import Categories from "../categorieList/Categories";
import SingleMoviePage from "../singleMovie/SingleMovie";
import { DataContext } from '../../context/Context';
import './Body.css'

const Body = () => {

    const { addFavorite } = useContext(DataContext)

    const [movie, setMovie] = useState([])
    const [category, setCategory] = useState([])
    const [categorySelect, setCategorySelect] = useState('Trending')
    // const [favorite, setFavorite] = useState([])
    const [isMovieClicked, setIsMovieClicked] = useState(true)
    const [singleMovie, setSingleMovie] = useState(true)
    // const [favoriteSelected, setFavoriteSelected] = useState('Add to favourites')
    // const [favBtnClr, setFavBtnClr] = useState('warning')


    const getMovies = () => {
        // axios.get("https://imdb-api.com/en/API/MostPopularMovies/k_eomu4lvb").then(res => {
        axios.get("https://api.themoviedb.org/3/trending/movie/day?api_key=17e786d5aa65a489c613aaca6427cd5e&type=movies")
            .then(res => {
                // console.log(res.data.results)
                setMovie(res.data.results)
            })
            .catch(e => console.log(e))
    }



    const getCategories = () => {
        // axios.get("https://imdb-api.com/en/API/MostPopularMovies/k_eomu4lvb").then(res => {
        axios.get("https://api.themoviedb.org/3/genre/movie/list?api_key=17e786d5aa65a489c613aaca6427cd5e")
            .then(res => {
                // console.log(res.data)
                setCategory(res.data.genres)
            })
            .catch(e => console.log(e))
    }


    const movieClicked = (item) => {
        setSingleMovie(item)
        setIsMovieClicked(false)
    }

    useEffect(() => {
        getMovies()
        getCategories()
    },[])

    return (
        <>
            <div>
                {/* <div className='background'>
                </div> */}
                <div className='foregorund'>

                <Container className="heading" fluid>
                    <h1>{ categorySelect }</h1>
                </Container>
                <Row className="backdrop">
                    {isMovieClicked ?
                        <>
                            <Col className="p-3" sm={3} >
                                <Categories cat={category} setCat={setCategory} mov={movie} setMov={setMovie} setCatSel={setCategorySelect} />
                            </Col>
                            <Col className="p-3" sm={9} >
                                <Row xs={1} sm={2} md={4} >
                                    {
                                        movie.map((v, i) => {
                                            return (
                                                <Col key={i}>
                                                    <Card key={i} style={{height: '450px'}} className="movieCard m-3">
                                                        <Card.Img onClick={() => movieClicked(v.id)} style={{height: '300px'}} variant="top" src={`https://image.tmdb.org/t/p/w300/${v.poster_path}`} />
                                                        <Row>
                                                            <Col className='m-2'>
                                                                <Tooltip title='Add to favorites' placement="top">
                                                                <Button variant='warning' size="sm" onClick={(e) => addFavorite(e,v)} >Add to favorite</Button>
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
                        :   <SingleMoviePage value={singleMovie} />
                    }
                </Row>
                </div>
            </div>
        </>
    );
}

export default Body;
