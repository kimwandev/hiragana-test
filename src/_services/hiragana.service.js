import hiraganaData from '../_repo/hiragana.data.js';
import _ from 'lodash';

function getRandomNumber(min, max){
    return Math.floor((Math.random() * max) + min);
}

export function getHiraganaById(id){
    return _.find(hiraganaData, {id:id});
}

export function getRandomHiraganaItem(){
    const minHiraganaId = 1;
    const maxHiraganaId = 68;

    const randomHiraganaId = getRandomNumber(minHiraganaId, maxHiraganaId);

    return getHiraganaById(randomHiraganaId);
}