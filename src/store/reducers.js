import { SET_USER_DATA, SET_USER_COINS, FIRST_GAME_OPEN, OPEN_CARD_PAGE } from './actionTypes'

// import {combineReducers} from 'redux'


const defaultState = {
    menu: true,
    coins: undefined,
    cards: [],
    checks: null,
    user: null,
    group_id: 206882085,
    link: 'https://vk.com/app7653048',
    repost: undefined,
    firstOpen: true,
    opencardPage: false
}

export const mainReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return { ...state, user: action.payload }
        case SET_USER_COINS:
            return { ...state, coins: action.payload.coins, cards: action.payload.cards, repost: action.payload.repost,checks: action.payload.checks, prizes: action.payload.prizes }
        case FIRST_GAME_OPEN:
            return { ...state, firstOpen: false }
        case OPEN_CARD_PAGE:
            return { ...state, opencardPage: action.payload }

    }

    return state
}
export const rootReducer = mainReducer

