import { Link, useNavigate} from "react-router-dom"
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import HomeIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Search  from "@material-ui/icons/Search";
import { useState } from "react";


const MyNavbar = () => {
    const useStyles = makeStyles({
        root: {
          width: "100%",
          position: "relative",
          top: 0,
          backgroundColor: "DarkGreen",
          zIndex: 100,
        },
      });
    const classes = useStyles();
    const [value, setValue] = useState(0)
    const navigate = useNavigate();

    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            showLabels
            className={classes.root}
            >
            <BottomNavigationAction style={{color:"white"}} value="home" onClick={()=>navigate('/')} label="Home" icon={<HomeIcon />} />
            <BottomNavigationAction style={{color:"white"}} value="favourite" onClick={()=> navigate('/favourite')} label="Favorites" icon={<FavoriteIcon />} />
            <BottomNavigationAction style={{color:"white"}} value="search" onClickCapture={()=>navigate('/search')} label="Search" icon={<Search />} />
        </BottomNavigation>
    )
}

export default MyNavbar;
