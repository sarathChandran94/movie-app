// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Modal from '@material-ui/core/Modal';
// import Backdrop from '@material-ui/core/Backdrop';
// import Fade from '@material-ui/core/Fade';

import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate} from 'react-router-dom'
import { Button, Col, Container, Row } from "react-bootstrap";



// const useStyles = makeStyles((theme) => ({
//   modal: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   paper: {
//     backgroundColor: theme.palette.background.paper,
//     border: '2px solid #000',
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(2, 4, 3),
//   },
// }));

// export default function SingleMovieModal() {
//   const classes = useStyles();
//   const [open, setOpen] = React.useState(false);

//   const handleOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div>
//       <button type="button" onClick={handleOpen}>
//         react-transition-group
//       </button>
//       <Modal
//         aria-labelledby="transition-modal-title"
//         aria-describedby="transition-modal-description"
//         className={classes.modal}
//         open={open}
//         onClose={handleClose}
//         closeAfterTransition
//         BackdropComponent={Backdrop}
//         BackdropProps={{
//           timeout: 500,
//         }}
//       >
//         <Fade in={open}>
//           <div className={classes.paper}>
//             <h2 id="transition-modal-title">Transition modal</h2>
//             <p id="transition-modal-description">react-transition-group animates me.</p>
//           </div>
//         </Fade>
//       </Modal>
//     </div>
//   );
// }


const SingleMoviePage = (props) => {
    const [smd, setSmd] = useState([])

    const navigate = useNavigate()

    const getSmd = () => {
        axios.get(`https://api.themoviedb.org/3/movie/${props.value}?api_key=17e786d5aa65a489c613aaca6427cd5e&language=en-US`).then(res => {
            console.log(res)
            setSmd(res.data)
        })
    }
    useEffect(() => {
        getSmd();
    },[])

    return (
        <>
            <Container className='p-5'>
                <Button onClick={() => {navigate(0)}} variant='secondary'>Go Back</Button>
                <Row >
                    <Col className='border' sm={4}>
                        <img src={`https://image.tmdb.org/t/p/w300/${smd.poster_path}`} alt={smd.title}></img>
                    </Col>
                    <Col className='border' sm={8}>
                        content block
                        <Row className='border'>
                            <h1>{ smd.title }</h1>
                        </Row>
                        <Row>
                            <Col className='border'>
                                <h5>{ smd.vote_average }</h5>
                                <CircularProgress variant="determinate" value={smd.vote_average * 10} />
                            </Col>
                            <Col className='border'>
                                <h5>{ smd.runtime } mins</h5>
                            </Col>
                            <Col className='border'>
                                <h5>Released on: { smd.release_date }</h5>
                            </Col>
                        </Row>
                        <Row className='border'>
                             <h3><span style={{color:'orangered'}}>Plot: </span>{ smd.overview }</h3>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
     );
}

export default SingleMoviePage;
