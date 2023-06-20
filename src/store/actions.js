import {
    SET_USER_DATA,
    SET_USER_COINS,
    FIRST_GAME_OPEN,
    OPEN_CARD_PAGE
} from './actionTypes'
// import API from "../utils/API";



export const setUserData = (data) => ({
    type: SET_USER_DATA,
    payload: data
})


export const setCoins = (data) => ({
    type: SET_USER_COINS,
    payload: data
})

export const setFirstOpening = () => ({
    type: FIRST_GAME_OPEN
})

export const setOPenedCardPage = (bool) => ({
    type: OPEN_CARD_PAGE,
    payload: bool
})
