import Images from './db_img.jsx';
import clothing from './db_clothing.jsx';

const clothingSets = {
    wrongSet:{
        id:'wrongSet',
        clothingOnTheBody:{body:'',chest:'',legs:'', hips:''},//в этом сете не указываем - он выбирается по умолчанию, если нет соответствий
        setOptions:[
            {img:Images.ico.orbRed, text:'Отсутствует сочетание одежды, я чувствую себя не комфортно ...'}
        ],//описание сета / бафы / дебафы - на основании этого массива строится общие характеристики баффа/дебафа
        setImages:[Images.character.wrongSet], // картинки в гардеробе
        setImagesForInteraction:{
            normal_1:Images.character.wrongInteractionImg,
            normal_2:Images.character.wrongInteractionImg,
            smile_1:Images.character.wrongInteractionImg,
            smile_2:Images.character.wrongInteractionImg,
            harasment_1:Images.character.wrongInteractionImg,
            harasment_2:Images.character.wrongInteractionImg
        } // картинки, отображаются во время взаимодействия - должен быть ассациативный массив с ключами
    },
    naked:{
        id:'naked',
        clothingOnTheBody:{
            body:'empty',
            chest:'empty',
            legs:'empty',
            hips:'empty'
        },
        setOptions:[
            {img:Images.ico.orbGreen, text:'Самые лучшие ощущения от слияния с природой без одежды.'},
            {img:Images.ico.orbYellow, text:'Я не могу показателься в общественном месте в таком виде!'}
        ],
        setImages:[Images.character.naked.naked_set00, Images.character.naked.naked_set01],
        setImagesForInteraction:{
            normal_1:Images.character.naked.naked_normal_1,
            normal_2:Images.character.naked.naked_normal_2,
            smile_1:Images.character.naked.naked_smile_1,
            smile_2:Images.character.naked.naked_smile_1,
            harasment_1:Images.character.naked.naked_harasment_1,
            harasment_2:Images.character.naked.naked_harasment_1
        }
    },
    blueSetFull:{
        id:'blueSetFull',
        clothingOnTheBody:{
            body:clothing.blueShirt,
            chest:'irrelevant',
            legs:clothing.blueJeans,
            hips:'irrelevant'
        },
        setOptions:[
            {img:Images.ico.orbBlue, text:'Самая обычная повседневная одежда'},
        ],
        setImages:[Images.character.blueSet.blue_set00, Images.character.blueSet.blue_set01],
        setImagesForInteraction:{
            normal_1:Images.character.blueSet.blue_normal_1,
            normal_2:Images.character.blueSet.blue_normal_1,
            smile_1:Images.character.blueSet.blue_smile_1,
            smile_2:Images.character.blueSet.blue_smile_2,
            harasment_1:Images.character.blueSet.blue_harasment_1,
            harasment_2:Images.character.blueSet.blue_harasment_1
        }
    },
    orangeSetFull:{
        id:'orangeSetFull',
        clothingOnTheBody:{
            body:clothing.orangeShirt,
            chest:'irrelevant',
            legs:clothing.blueSkirt,
            hips:'irrelevant'
        },
        setOptions:[
            {img:Images.ico.orbGreen, text:'Приятный яркий стиль.В таком можно и пошалить ...'},
        ],
        setImages:[Images.character.orangeSet.orangeSet_set00, Images.character.orangeSet.orangeSet_set01],
        setImagesForInteraction:{
            normal_1:Images.character.orangeSet.orangeSet_normal_1,
            normal_2:Images.character.orangeSet.orangeSet_normal_2,
            smile_1:Images.character.orangeSet.orangeSet_smile_1,
            smile_2:Images.character.orangeSet.orangeSet_smile_2,
            harasment_1:Images.character.orangeSet.orangeSet_harasment_1,
            harasment_2:Images.character.orangeSet.orangeSet_harasment_2
        }
    }
}

export default clothingSets;