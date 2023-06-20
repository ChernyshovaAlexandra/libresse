import React from 'react';
import bg1 from '../../assets/images/rules/Illustration_1.jpg'
import bg2 from '../../assets/images/rules/Illustration_2.jpg'
import bg3 from '../../assets/images/rules/Illustration_3.jpg'



export const rulesList = [
    {
        mainBg: bg1,
        header: 'Открывай карточки с&#160;мифами',
        description: `Стоимость открытия карты&#160;- 2&#160;балла.
        За верный ответ ты получишь 1&#160;балл, за репост&#160;- 3&#160;балла, за регистрацию чека с 1&#160;продуктом&#160;- 4&#160;балла`,
        // additional: <span className='text-pink text-centred'>1 карта = 2 балла</span>,
        closeButColor: 'darkBlue',


    },
    {
        mainBg: bg2,
        header: 'Выигрывай призы',
        description: `За каждой карточкой тебя ждут призы - сертификат в Л’Этуаль номиналом 1000 рублей, скидки на продукцию Libresse в «Пятёрочке» 
        и гайды от блогеров-партнеров проекта`,
        closeButColor: 'pink',
    },
    {
        mainBg: bg3,
        header: 'Сделай репост и участвуй в&#160;розыгрыше главных призов',
        description: `Каждую неделю среди участников будут разыграны главные призы&#160;- сертификаты на шопинг номиналом 
        3&#160;000&#160;рублей`,
        closeButColor: 'darkBlue',
    }
]
