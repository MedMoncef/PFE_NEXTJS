import { useState, useEffect } from 'react';
import styles from '@/styles/Home.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';
  
const API_URL = 'http://localhost:7000/sliders';
const ITEMS_PER_PAGE = 3;

function SliderIndex() {
const [currentImage, setCurrentImage] = useState(0);
const [sliders, setSliders] = useState([]);
const [totalPages, setTotalPages] = useState(1);
const router = useRouter();

interface Slider {
    ID_Slider: string,
    Image: string,
    Titre: string,
    Text: string,
    DateU: Date
  }

  const fetchData = async () => {
    const result = await axios(API_URL);
    setTotalPages(Math.ceil(result.data.length / ITEMS_PER_PAGE));
    setSliders(result.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  
  const handleRadioChange = (index) => {
    setCurrentImage(index);
  };


  return (
    <>
        <section className={styles.banner}>
          {sliders.map((slider: Slider, index) => (
            <div
              key={slider.ID_Slider}
              style={{
                height: '700px',
                backgroundImage: `url(https://res.cloudinary.com/dv5o7w2aw/image/upload/v1688153476/Background/${slider.Image})`,
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
    </>
  );
}

export default SliderIndex;