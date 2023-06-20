import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { winnersMass } from './constants/winnersMass';
import SwiperCore, {
    Pagination
} from 'swiper';

SwiperCore.use([Pagination]);


export default function Winners() {
    return (
        <div className='winners'>
            <Swiper
                spaceBetween={50}
                slidesPerView={1}
                pagination={
                    true
                }
            >

                {winnersMass.map(
                    (item, id) => (
                        <SwiperSlide key={id}

                        >
                            <h2 className="text text-white text-big text-centred">Победители {item.week} недели:</h2>
                            <div className="block-winners text text-pt text-bold text-black modellica">
                                <ol>
                                    {item.win.map(
                                        (itm, ind) => (
                                            <li data-index={ind + 1 + '. '} className='flex flex-j-b'>
                                                <a href={itm.url} className="name">{itm.name}</a>
                                                <span>сертификат на шоппинг номиналом 3000 рублей</span>
                                            </li>
                                        )
                                    )}
                                </ol>
                            </div>
                        </SwiperSlide>
                    )
                )}


            </Swiper>
        </div>
    )
}