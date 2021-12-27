let boardSize;

const defaultState = {
    wolf: {
        name: "wolf",
        id: 1,
        count: boardSize / 2,
        position: []
    },
    home: {
        name: "home",
        id: 3,
        count: 1,
        position: []
    },
    rabbit: {
        name: "rabbit",
        id: 5,
        count: 1,
        position: []
    },
    fence: {
        name: "fence",
        id: 2,
        count: boardSize / 2,
        position: []
    },
    stone: {
        name: "stone",
        id: 2,
        count: boardSize / 2,
        position: []
    }
}
export const characterReducer = (state = defaultState, action) => {
    return {
        ...state,
    }
}