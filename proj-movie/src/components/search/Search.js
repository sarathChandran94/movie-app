import { Card, Col, Container, Row } from 'react-bootstrap';
import '../../App.css'
import '../body/Body.css'
import TextField from '@material-ui/core/TextField';
import { CircularProgress, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search'
import { useEffect, useState } from 'react';
import axios from 'axios';


const Search = () => {
    const [searchText, setSearchText] = useState('')
    const [searchData, setSearchData] = useState([])

    const getSearchData = () => {
        axios.get(`https://api.tmdb.org/3/search/movie/?api_key=17e786d5aa65a489c613aaca6427cd5e&adult=false&query=${searchText}`)
            .then(res => {
                console.log(res.data.results)
                setSearchData(res.data.results)
            })
            .catch(e => {
                console.log(e)
            })
    }
    useEffect(() => {
        getSearchData()
    },[searchText])

    return (
        <>
            <div className='bodyBg'>
                <div className='background'>

                </div>
                <div className='foreground'>
                <Container className="heading">
                    <h1>Search</h1>
                </Container>
                <div style={{ display: 'flex', margin: '15px 0px', justifyContent: 'center' }}>

                    <TextField
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{backgroundColor: 'whitesmoke', width: '300px' }}
                        id="outlined-basic"
                        label="Search Movies"
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon />
                              </InputAdornment>
                            ),
                          }}
                    />
                </div>
                <div>
                    {searchText === '' ? <h3 style={{color: 'grey'}}>Nothing Found</h3> :
                    <Row>
                            <Col className="p-3"  >
                                <Row xs={1} sm={2} md={5} >
                                    {
                                        searchData.map((v, i) => {
                                            return (
                                                <>
                                                    <Col>
                                                        <Card style={{height: '450px'}} className="movieCard m-3">
                                                            <Card.Img style={{height: '300px'}} variant="top" src={`https://image.tmdb.org/t/p/w300/${v.poster_path}`} />
                                                            <Row>
                                                                <Col>
                                                                    <Card.Text>{v.release_date }</Card.Text>
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
                                                </>
                                            )
                                        })
                                    }
                            </Row>
                        </Col>
                    </Row>

                    }
                </div>
                </div>

            </div>
        </>
     );
}

export default Search
