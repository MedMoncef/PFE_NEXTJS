import Head from 'next/head';
import { useState, useEffect } from 'react';
import styles from '@/styles/Home.module.css';
import { FormControl, FormLabel, Input, Select, Typography, Stack, Card, CardContent, Grid, createTheme, ThemeProvider, CardMedia, Button, Container, Box, CssBaseline, CardActions } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import SpaIcon from '@mui/icons-material/Spa';
import KingBedIcon from '@mui/icons-material/KingBed';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import Carousel from 'react-material-ui-carousel';
import { useRouter } from 'next/router';

const API_URL = 'http://localhost:7000/sliders';
const API_URL1 = 'http://localhost:7000/menus';
const API_URL2 = 'http://localhost:7000/testimony';
const API_URL3 = 'http://localhost:7000/rooms';
const API_URL4 = 'http://localhost:7000/blogs';
const API_URL5 = 'http://localhost:7000/roomTypes';
const ITEMS_PER_PAGE = 3;

// Custom theme with water-themed colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#1565c0', // Blue color for primary elements
    },
    secondary: {
      main: '#4dd0e1', // Teal color for secondary elements
    },
  },
});

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0);
  const [sliders, setSliders] = useState([]);
  const [currentImage2, setCurrentImage2] = useState(0);
  const [testimonies, setTestimonies] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedView, setSelectedView] = useState('');
  const [menus, setMenus] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const router = useRouter();
  const [roomTypes, setRoomTypes] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState('');
  const [chambres, setChambres] = useState([]);

  interface Testimony {
    IdTestimony: string,
    comment: string,
    name: string,
    image: string,
    title: string
  }

  interface Slider {
    ID_Slider: string,
    Image: string,
    Titre: string,
    Text: string,
    DateU: Date
  }
  
  interface Room {
    _id: String;
    ID_Rooms: string;
    Room_Number: string;
    Floor_Number: string;
    Name: string;
    Image: string;
    Description: string;
    Max: number;
    View: string;
    Size: string;
    Bed_Number: string;
    Type: string;
    Rating: number;
    Price: number;
  }

  interface Menu {
    ID_Menu: string,
    Image: string,
    Nom: string,
    Description: string,
    Prix: Number,
    Type: string
  }

  interface Blog {
    ID_Blog: string,
    Image: string,
    Titre: string,
    Content: string,
    DateU: Date
  }

  interface RoomType {
    ID_RoomType: string;
    Name: string;
  }

  const fetchData = async () => {
    const result = await axios(API_URL);
    const result1 = await axios(API_URL1);
    const result2 = await axios(API_URL2);
    const result3 = await axios(API_URL3);
    const result4 = await axios(API_URL4);
    const result5 = await axios(API_URL5);
    setTotalPages(Math.ceil(result.data.length / ITEMS_PER_PAGE));
    setSliders(result.data);
    setMenus(result1.data);
    setTestimonies(result2.data);
    setRooms(result3.data);
    setBlogs(result4.data);
    setRoomTypes(result5.data);
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % sliders.length);
      setCurrentImage((prevImage) => (prevImage + 1) % testimonies.length);
    }, 4000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [sliders, testimonies]);

  const handleRadioChange = (index) => {
    setCurrentImage(index);
  };

  useEffect(() => {
    filterRooms();
  }, [rooms, searchValue, selectedPrice, selectedRoomType, selectedView]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };


  const filterRooms = () => {
    let filtered = rooms;

    setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
    setFilteredRooms(filtered);
    setCurrentPage(1);
  };

  const getDisplayedRooms = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return rooms.slice(startIndex, endIndex);
  };

  const blogSets = [];
  for (let i = 0; i < blogs.length; i += 3) {
    blogSets.push(blogs.slice(i, i + 3));
  }

  const menuSets = [];
  for (let i = 0; i < menus.length; i += 3) {
    menuSets.push(menus.slice(i, i + 3));
  }

  const handleRoomTypeChange = (event) => {
    setSelectedRoomType(event.target.value);
    const filteredChambres = rooms.filter((room) => room.Type === event.target.value);
    setChambres(filteredChambres);
  };

  return (
    <>
      <Head>
        <title>Harbor Hotel</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.jpg" />
      </Head>

      <div>
        <section className={styles.banner}>
          {sliders.map((slider: Slider, index) => (
            <div
              key={slider.ID_Slider}
              style={{
                height: '700px',
                backgroundImage: `url(/images/${slider.Image})`,
                display: index === currentImage ? 'block' : 'none',
              }}
            >
              <div className={styles.bannerContent}>
                <h2>{slider.Titre}</h2>
                <h1>{slider.Text}</h1>
              </div>
            </div>
          ))}
          <div className={styles.radioButtons}>
            {sliders.map((slider: Slider, index) => (
              <input
                key={slider.ID_Slider}
                type="radio"
                name="slider-radio"
                checked={currentImage === index}
                onChange={() => handleRadioChange(index)}
              />
            ))}
          </div>
        </section>

  			{/* ========================================================== */}

{/*         <section
          style={{
            padding: '40px',
            backgroundColor: '#f9f9f9',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              margin: '0 20px',
              gap: '25px',
            }}
          >
            <FormControl fullWidth>
              <FormLabel htmlFor="checkin_date">Check-in Date</FormLabel>
              <Input
                id="checkin_date"
                type="date"
                placeholder="Check-in date"
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel htmlFor="checkout_date">Check-out Date</FormLabel>
              <Input
                id="checkout_date"
                type="date"
                placeholder="Check-out date"
              />
            </FormControl>

            <FormControl fullWidth>
            <FormLabel htmlFor="room">Type de Chambres</FormLabel>
            <Select
              native
              id="room"
              value={selectedRoomType}
              onChange={handleRoomTypeChange}
            >
              <option value="">Any</option>
              {roomTypes.map((roomType: RoomType) => (
                <option key={roomType.ID_RoomType} value={roomType.Name}>
                  {roomType.Name}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <FormLabel htmlFor="Chambres">Chambre</FormLabel>
            <Select native id="Chambres">
              <option value="">Choisissez un type</option>
              {chambres.map((chambre) => (
                <option key={chambre._id} value={chambre.Name}>
                  {chambre.Name}
                </option>
              ))}
            </Select>
        </FormControl>

            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                flex: '1 0 auto',
                fontSize: '16px',
                fontFamily: 'Nunito Sans, Arial, sans-serif',
                position: 'relative',
                letterSpacing: '4px',
                color: '#f5e4c3',
                textTransform: 'uppercase',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: 'bold', fontSize: '16px' }}>
                  Check Availability
                </span>
                <span style={{ fontSize: '12px', marginLeft: '5px' }}>
                  Best Price Guaranteed!
                </span>
              </div>
            </Button>
          </div>
        </section>
 */}
				{/* ========================================================== */}

        <div style={{backgroundColor: '#f8f9fa', padding: '3% 0'}}>
        		
        <div className={styles.about}>
          <h2>WELCOME TO HARBOR LIGHTS HOTEL</h2>
          <h1>You'll Never Want To Leave</h1>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
              <Grid container spacing={2} style={{ justifyContent: 'center' }}>
                <Grid item xs={6} sm={4} md={2}>
                  <Card>
                    <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <NotificationsIcon color="primary" fontSize="large" style={{ marginBottom: '10px' }} />
                      <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                        Friendly Service
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                  <Card>
                    <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <LocalDiningIcon color="primary" fontSize="large" style={{ marginBottom: '10px' }} />
                      <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                        Get Breakfast
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                  <Card>
                    <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <AirportShuttleIcon color="primary" fontSize="large" style={{ marginBottom: '10px' }} />
                      <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                        Transfer Services
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                  <Card>
                    <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <SpaIcon color="primary" fontSize="large" style={{ marginBottom: '10px' }} />
                      <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                        Suits & SPA
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                  <Card>
                    <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <KingBedIcon color="primary" fontSize="large" style={{ marginBottom: '10px' }} />
                      <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                        Cozy Rooms
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </div>

            
            <ThemeProvider theme={theme}>
          <section style={{ padding: '50px' }}>
            <Grid container spacing={2}>

              <CssBaseline />
              <Container maxWidth="sm" style={{ marginBottom: '40px' }}>
                <div className={styles.about}>
                  <Typography variant="h2" style={{ textAlign: 'left' }}>
                    ABOUT HARBOR LIGHTS HOTEL
                  </Typography>
                  <Typography variant="h4" style={{ textAlign: 'left', marginTop: '20px' }}>
                    Harbor Lights Hotel the Most Recommended Hotel All Over the World
                  </Typography>
                  <p style={{ textAlign: 'left', marginTop: '50px' }}>
                    Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.
                  </p>
                  <div style={{ textAlign: 'left', marginTop: '50px' }}>
                    <Button variant="contained" color="secondary" onClick={() => router.push(`/Client/Room/rooms`)}>
                      Reserve Your Room Now
                    </Button>
                  </div>
                </div>
              </Container>
              <Container maxWidth="sm">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <img src="/images/About/about-1.jpg" alt="Image 1" style={{ width: '50%', height: 'auto' }} />
                  <img src="/images/About/about-2.jpg" alt="Image 2" style={{ width: '50%', height: 'auto' }} />
                </div>
              </Container>


              <CssBaseline />
              <Container maxWidth="sm" style={{ marginTop: '40px', marginBottom: '40px' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', backgroundColor: '#2f89fc' }}>
                  <img src="/images/About/testimony-img.jpg" alt="Image 3" style={{ width: '70%', height: 'auto' }} />
                </div>
              </Container>
              <Container maxWidth="sm" style={{}}>
                <div className={styles.about}>
                  <Typography variant="h2" style={{ textAlign: 'left' }}>
                    TESTIMONY
                  </Typography>
                  <Typography variant="h4" style={{ textAlign: 'left', marginTop: '20px' }}>
                    Happy Customer
                  </Typography>

                  {testimonies.map((testimony: Testimony, index) => (
                    <div key={testimony.IdTestimony} style={{display: index === currentImage ? 'block' : 'none',}}>
                          <Card sx={{ display: 'flex', marginBottom: '5%', marginTop: '20%' }}>
                            <CardMedia
                              component="img"
                              sx={{ width: 151 }}
                              image={`/images/Users/${testimony.image}`}
                              alt="Live from space album cover"
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                              <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h5">
                                  {testimony.name}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                 {testimony.title}
                                </Typography>
                              </CardContent>
                            </Box>
                          </Card>

                            <p style={{ textAlign: 'left', marginTop: '50px' }}>
                                &quot;{testimony.comment}&quot;
                            </p>
                    </div>
                  ))}
                </div>
              </Container>

            </Grid>
          </section>
        </ThemeProvider>
        </div>

				{/* ========================================================== */}

        <div style={{marginBottom: '5%'}}>
        <div className={styles.about}>
          <h2>HARBOR LIGHTS ROOMS</h2>
          <h1>Hotel Master's Rooms</h1>
                  <div style={{ textAlign: 'center', marginTop: '3%' }}>
                    <Button variant="contained" color="secondary" onClick={() => router.push(`/Client/Room/rooms`)}>
                      View more
                    </Button>
                  </div>
        </div>

        <Grid container spacing={2} style={{ margin: '2% 0', display: 'flex', justifyContent: 'center' }}>
          {getDisplayedRooms().map((room: Room, index) => (
            <Card sx={{ maxWidth: 350, margin: '2% 2%' }} key={room.ID_Rooms} style={{ alignSelf: 'flex' }}>
              <CardMedia
                sx={{ height: 250 }}
                image={`/images/Rooms/${room.Image}`}
                title="Room image"
              />
              <CardContent>
                <div className={styles.rooms}>
                  <h1>{room.Name}</h1>
                  <h2>{room.Price}$ per night</h2>
                </div>
                <Typography variant="body2" color="text.secondary">
                  {room.Description}
                </Typography>
              </CardContent>
              <CardActions>
              <Button size="small" onClick={() => router.push(`/Client/${room._id}`)}>Reserver</Button>
            </CardActions>
            </Card>
          ))}
        </Grid>

        <Box display="flex" justifyContent="center" marginBottom={5}>
          <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
        </Box>

      </div>


      <div style={{backgroundColor: '#f8f9fa', padding: '3% 0'}}>
          <div className={styles.about}>
            <h2>HARBORLIGHTS RESTAURANT MENU</h2>
            <h1>Today's Specialties</h1>
            <div style={{ textAlign: 'center', marginTop: '3%' }}>
                    <Button variant="contained" color="primary" onClick={() => router.push(`/Client/restaurant`)}>
                      View more
                    </Button>
                  </div>
          </div>


          <Carousel sx={{ marginTop: '2%' }}>
        {menuSets.map((menuSet, index) => (
        <Grid container key={index} spacing={2} style={{ margin: '0 0', display: 'flex', justifyContent: 'center' }}>
          {menuSet.map((menu: Menu) => (
            <Card sx={{ maxWidth: 350, margin: '0 2%' }} key={menu.ID_Menu} style={{ alignSelf: 'flex' }}>
              <CardMedia
                  component="img"
                  sx={{ height: 200 }}
                  image={`/images/Menu/${menu.Image}`}
                  alt="Menu Item"
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                      {menu.Nom}
                      <div style={{ display: 'flex', width: '80px', color: '#2f89fc', textAlign: 'right', fontSize: '20px', fontWeight: '600' }}>
                        $ {menu.Prix}
                      </div>
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                      {menu.Description}
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
            ))}
          </Grid>
          ))}
          </Carousel>  
        </div>


        <div style={{ padding: '3% 0'}}>
          <div className={styles.about}>
            <h2>HARBORLIGHTS BLOGS</h2>
            <h1>Recent Blog</h1>
            <div style={{ textAlign: 'center', marginTop: '3%' }}>
                    <Button variant="outlined" color="primary" onClick={() => router.push(`/Client/blog`)}>
                      View more
                    </Button>
                  </div>
          </div>

          <Carousel sx={{ margin: '3% 2%' }}>
            {blogSets.map((blogSet, index) => (
            <Grid container key={index} spacing={2} style={{ margin: '0 0', display: 'flex', justifyContent: 'center' }}>
              {blogSet.map((blog: Blog) => (
                <Card sx={{ maxWidth: 350, margin: '0 2%' }} key={blog.ID_Blog} style={{ alignSelf: 'flex' }}>
                    <CardMedia
                        component="img"
                        sx={{ height: 200 }}
                        image={`/images/Images/${blog.Image}`}
                        alt="Blog Image"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {blog.Titre}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {blog.Content}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small">Learn More</Button>
                      </CardActions>
                    </Card>
                ))}
              </Grid>
            ))}
          </Carousel>        
          </div>



          <div>
              <div className={styles.about}>
                  <h2>HARBORLIGHTS PHOTOS</h2>
                  <h1>Instagram</h1>
              </div>

            <Stack direction="row" spacing={0}>
              <CardMedia
                component="img"
                sx={{ height: 200 }}
                image={`/images/Insta/insta-1.jpg`}
                alt="Insta Image 1"
              />
              <CardMedia
                component="img"
                sx={{ height: 200 }}
                image={`/images/Insta/insta-2.jpg`}
                alt="Insta Image 2"
              />
              <CardMedia
                component="img"
                sx={{ height: 200 }}
                image={`/images/Insta/insta-3.jpg`}
                alt="Insta Image 3"
              />
              <CardMedia
                component="img"
                sx={{ height: 200 }}
                image={`/images/Insta/insta-4.jpg`}
                alt="Insta Image 4"
              />
              <CardMedia
                component="img"
                sx={{ height: 200 }}
                image={`/images/Insta/insta-5.jpg`}
                alt="Insta Image 5"
              />
            </Stack>
          </div>
      </div>
    </>
  );
}